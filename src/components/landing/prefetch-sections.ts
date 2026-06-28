import { sectionById, visibleSections } from "./catalog";
import { navLinks } from "./data/nav";
import type { SectionId } from "./data/section-id";

type QueueItem = {
  id: SectionId;
  loader: () => Promise<unknown>;
};

const loaded = new Set<SectionId>();
const inflight = new Map<SectionId, Promise<unknown>>();
const boostedSections = new Set<SectionId>();
const boostListeners = new Set<(id: SectionId) => void>();
const mountListeners = new Set<(id: SectionId) => void>();
const mountedSections = new Set<SectionId>();
const mountWaiters = new Map<SectionId, Set<() => void>>();

const HEIGHT_STABLE_DELAY_MS = 150;
const HEIGHT_STABLE_TIMEOUT_MS = 2000;
const SCROLL_SETTLE_POLL_MS = 20;
const SCROLL_SETTLE_STABLE_TICKS = 3;
const SCROLL_CORRECTION_TIMEOUT_MS = 2000;

/** Секции с отложенным layout (shell → carousel по inView). */
const SECTIONS_WITH_DEFERRED_LAYOUT = new Set<SectionId>(["services", "reviews"]);
const deferredLayoutReady = new Set<SectionId>();
const IDLE_PREFETCH_BATCH_SIZE = 3;
const NAV_PROGRESS_SHOW_DELAY_MS = 80;
const NAV_PROGRESS_HIDE_DELAY_MS = 200;

export type NavigationProgress = {
  visible: boolean;
  progress: number;
  targetId: SectionId | null;
};

let queue: QueueItem[] = [];
let idleHandle: number | null = null;
let started = false;

let navigationGeneration = 0;
let navigationProgress: NavigationProgress = { visible: false, progress: 0, targetId: null };
const navigationProgressListeners = new Set<(state: NavigationProgress) => void>();
let navProgressShowTimer: number | null = null;
let navProgressHideTimer: number | null = null;
let navProgressShowFired = false;

function emitNavigationProgress(partial: Partial<NavigationProgress>) {
  navigationProgress = { ...navigationProgress, ...partial };
  navigationProgressListeners.forEach((listener) => listener(navigationProgress));
}

function clearNavigationProgressTimers() {
  if (navProgressShowTimer !== null) {
    window.clearTimeout(navProgressShowTimer);
    navProgressShowTimer = null;
  }
  if (navProgressHideTimer !== null) {
    window.clearTimeout(navProgressHideTimer);
    navProgressHideTimer = null;
  }
}

function beginNavigationProgress(targetId: SectionId): number {
  clearNavigationProgressTimers();
  const generation = ++navigationGeneration;
  navProgressShowFired = false;

  emitNavigationProgress({ progress: 5, targetId, visible: false });

  navProgressShowTimer = window.setTimeout(() => {
    if (generation !== navigationGeneration) return;
    navProgressShowFired = true;
    emitNavigationProgress({ visible: true });
  }, NAV_PROGRESS_SHOW_DELAY_MS);

  return generation;
}

function updateNavigationProgress(generation: number, progress: number) {
  if (generation !== navigationGeneration) return;
  emitNavigationProgress({ progress: Math.min(progress, 95) });
}

function completeNavigationProgress(generation: number) {
  if (generation !== navigationGeneration) return;
  clearNavigationProgressTimers();

  if (!navProgressShowFired) {
    emitNavigationProgress({ visible: false, progress: 0, targetId: null });
    return;
  }

  emitNavigationProgress({ progress: 100, visible: true });

  navProgressHideTimer = window.setTimeout(() => {
    if (generation !== navigationGeneration) return;
    emitNavigationProgress({ visible: false, progress: 0, targetId: null });
  }, NAV_PROGRESS_HIDE_DELAY_MS);
}

export function subscribeNavigationProgress(listener: (state: NavigationProgress) => void) {
  navigationProgressListeners.add(listener);
  listener(navigationProgress);
  return () => navigationProgressListeners.delete(listener);
}

function prefetchChunk(id: SectionId, loader: () => Promise<unknown>): Promise<unknown> {
  if (loaded.has(id)) return Promise.resolve();
  const existing = inflight.get(id);
  if (existing) return existing;

  const promise = loader().then(() => {
    loaded.add(id);
    inflight.delete(id);
  });

  inflight.set(id, promise);
  return promise;
}

function notifyBoost(id: SectionId) {
  boostedSections.add(id);
  boostListeners.forEach((listener) => listener(id));
}

function resolveMountWaiters(id: SectionId) {
  const waiters = mountWaiters.get(id);
  if (!waiters) return;
  waiters.forEach((resolve) => resolve());
  mountWaiters.delete(id);
}

export function subscribeSectionBoost(listener: (id: SectionId) => void) {
  boostListeners.add(listener);
  boostedSections.forEach((id) => listener(id));
  return () => boostListeners.delete(listener);
}

export function subscribeSectionMounted(listener: (id: SectionId) => void) {
  mountListeners.add(listener);
  return () => mountListeners.delete(listener);
}

export function notifySectionMounted(id: SectionId) {
  mountedSections.add(id);
  resolveMountWaiters(id);
  mountListeners.forEach((listener) => listener(id));
}

export function waitForSectionMount(id: SectionId): Promise<void> {
  if (mountedSections.has(id)) return Promise.resolve();

  return new Promise((resolve) => {
    const waiters = mountWaiters.get(id) ?? new Set();
    waiters.add(resolve);
    mountWaiters.set(id, waiters);
  });
}

function waitForLayoutStable(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function getScrollPathIds(targetId: SectionId): SectionId[] {
  const targetIndex = visibleSections.findIndex((entry) => entry.id === targetId);
  if (targetIndex === -1) return [];
  return visibleSections.slice(0, targetIndex + 1).map((entry) => entry.id);
}

function isScrollPathMounted(pathIds: SectionId[]): boolean {
  return pathIds.length > 0 && pathIds.every((id) => mountedSections.has(id));
}

function getPathElements(pathIds: SectionId[]): HTMLElement[] {
  return pathIds
    .map((id) => document.getElementById(id))
    .filter((node): node is HTMLElement => node instanceof HTMLElement);
}

function deferredLayoutPendingOnPath(pathIds: SectionId[]): boolean {
  return pathIds.some((id) => SECTIONS_WITH_DEFERRED_LAYOUT.has(id) && !deferredLayoutReady.has(id));
}

function shouldWaitForPathHeightStable(pathIds: SectionId[], pathFullyMounted: boolean): boolean {
  if (!pathFullyMounted) return true;
  return deferredLayoutPendingOnPath(pathIds);
}

/** Карусель/shell → финальный layout (inView или navigation boost). */
export function notifyDeferredLayoutReady(id: SectionId) {
  if (!SECTIONS_WITH_DEFERRED_LAYOUT.has(id)) return;
  deferredLayoutReady.add(id);
}

/** Chunk-only: качает JS без mount — безопасно для hover/focus/idle. */
export function prefetchScrollPathChunks(targetId: SectionId): void {
  for (const id of getScrollPathIds(targetId)) {
    const entry = sectionById[id];
    if (!entry) continue;
    void prefetchChunk(id, entry.loader);
  }
}

/** Prefetch всех секций, доступных из навигации (для mobile menu). */
export function prefetchNavSectionChunks(): void {
  const ids = new Set<SectionId>();

  for (const link of navLinks) {
    for (const id of getScrollPathIds(link.sectionId)) {
      ids.add(id);
    }
  }

  for (const id of getScrollPathIds("cta")) {
    ids.add(id);
  }

  for (const id of ids) {
    const entry = sectionById[id];
    if (!entry) continue;
    void prefetchChunk(id, entry.loader);
  }
}

/** Нет resize на элементах пути в течение delayMs (с верхним пределом ожидания). */
function waitForElementsHeightStable(
  elements: HTMLElement[],
  stableDelayMs = HEIGHT_STABLE_DELAY_MS,
): Promise<void> {
  if (!elements.length) return Promise.resolve();

  return new Promise((resolve) => {
    let stableTimer: number | null = null;
    let maxTimer: number | null = null;

    const finish = () => {
      observer.disconnect();
      if (stableTimer !== null) window.clearTimeout(stableTimer);
      if (maxTimer !== null) window.clearTimeout(maxTimer);
      resolve();
    };

    const scheduleStable = () => {
      if (stableTimer !== null) window.clearTimeout(stableTimer);
      stableTimer = window.setTimeout(finish, stableDelayMs);
    };

    const observer = new ResizeObserver(() => {
      scheduleStable();
    });

    elements.forEach((element) => observer.observe(element));
    scheduleStable();
    maxTimer = window.setTimeout(finish, HEIGHT_STABLE_TIMEOUT_MS);
  });
}

function scrollSectionIntoView(id: SectionId, behavior: ScrollBehavior) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior, block: "start" });
}

/** Smooth для nav-кликов; auto при prefers-reduced-motion или явном override. */
function defaultNavScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

const SMOOTH_SCROLL_END_FALLBACK_MS = 2000;

/** Не запускать layout-коррекции, пока идёт smooth scroll — иначе auto rescroll обрывает анимацию. */
function afterNavScroll(behavior: ScrollBehavior, callback: () => void): void {
  if (behavior !== "smooth") {
    callback();
    return;
  }

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    window.clearTimeout(fallbackTimer);
    document.removeEventListener("scrollend", onScrollEnd);
    callback();
  };

  const onScrollEnd = () => finish();
  const fallbackTimer = window.setTimeout(finish, SMOOTH_SCROLL_END_FALLBACK_MS);

  if ("onscrollend" in document) {
    document.addEventListener("scrollend", onScrollEnd, { once: true, passive: true });
  }
}

function getScrollCorrectionElements(pathIds: SectionId[]): HTMLElement[] {
  const elements = getPathElements(pathIds);
  const header = document.querySelector<HTMLElement>(".landing-header");
  if (header) elements.push(header);
  return elements;
}

/** Повторный scroll при поздних сдвигах layout на пути к якорю. */
function watchScrollCorrections(targetId: SectionId, generation: number): void {
  const pathIds = getScrollPathIds(targetId);
  const elements = getScrollCorrectionElements(pathIds);
  if (!elements.length) return;

  let rafId: number | null = null;
  let pollTimer: number | null = null;
  let maxTimer: number | null = null;
  let stableTicks = 0;
  let prevScrollY = window.scrollY;

  const isActive = () => generation === navigationGeneration;

  const cleanup = () => {
    observer.disconnect();
    if (rafId !== null) cancelAnimationFrame(rafId);
    if (pollTimer !== null) window.clearTimeout(pollTimer);
    if (maxTimer !== null) window.clearTimeout(maxTimer);
  };

  const rescroll = () => {
    if (!isActive()) return;
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      rafId = null;
      if (!isActive()) return;
      scrollSectionIntoView(targetId, "auto");
      stableTicks = 0;
      prevScrollY = window.scrollY;
      scheduleSettlePoll();
    });
  };

  const scheduleSettlePoll = () => {
    if (!isActive()) return;
    if (pollTimer !== null) window.clearTimeout(pollTimer);
    pollTimer = window.setTimeout(() => {
      pollTimer = null;
      if (!isActive()) return;

      const currentScrollY = window.scrollY;
      if (currentScrollY === prevScrollY) {
        stableTicks += 1;
        if (stableTicks >= SCROLL_SETTLE_STABLE_TICKS) {
          scrollSectionIntoView(targetId, "auto");
          cleanup();
          return;
        }
      } else {
        stableTicks = 0;
        prevScrollY = currentScrollY;
      }

      scheduleSettlePoll();
    }, SCROLL_SETTLE_POLL_MS);
  };

  const observer = new ResizeObserver(rescroll);
  elements.forEach((element) => observer.observe(element));

  scheduleSettlePoll();
  maxTimer = window.setTimeout(() => {
    if (!isActive()) return;
    scrollSectionIntoView(targetId, "auto");
    cleanup();
  }, SCROLL_CORRECTION_TIMEOUT_MS);
}

export function boostSection(id: SectionId) {
  const entry = sectionById[id];
  if (!entry) return;

  queue = queue.filter((item) => item.id !== id);
  notifyBoost(id);
  void prefetchChunk(id, entry.loader);
}

export async function ensureSectionReady(id: SectionId): Promise<void> {
  const entry = sectionById[id];
  if (!entry) return;

  boostSection(id);
  await Promise.all([prefetchChunk(id, entry.loader), waitForSectionMount(id)]);
  await waitForLayoutStable();
}

/** Загружает и монтирует все lazy-секции от начала каталога до target включительно. */
export async function ensureScrollPathReady(
  targetId: SectionId,
  onProgress?: (progress: number) => void,
): Promise<{ pathFullyMounted: boolean }> {
  const pathIds = getScrollPathIds(targetId);
  if (!pathIds.length) return { pathFullyMounted: false };

  const pathFullyMounted = isScrollPathMounted(pathIds);
  const pathLength = pathIds.length;

  for (const id of pathIds) {
    boostSection(id);
  }

  let sectionsReady = 0;
  const reportSectionsProgress = () => {
    onProgress?.(5 + (sectionsReady / pathLength) * 80);
  };

  reportSectionsProgress();

  await Promise.all(
    pathIds.map(async (id) => {
      const entry = sectionById[id];
      if (!entry) return;
      await Promise.all([prefetchChunk(id, entry.loader), waitForSectionMount(id)]);
      sectionsReady += 1;
      reportSectionsProgress();
    }),
  );

  onProgress?.(88);
  await waitForLayoutStable();

  if (shouldWaitForPathHeightStable(pathIds, pathFullyMounted)) {
    onProgress?.(92);
    await waitForElementsHeightStable(getPathElements(pathIds));
  }

  return { pathFullyMounted };
}

export async function navigateToSection(
  id: SectionId,
  options: { behavior?: ScrollBehavior } = {},
): Promise<void> {
  if (typeof window === "undefined") return;

  const generation = beginNavigationProgress(id);

  try {
    await ensureScrollPathReady(id, (progress) => {
      updateNavigationProgress(generation, progress);
    });

    updateNavigationProgress(generation, 98);

    const behavior = options.behavior ?? defaultNavScrollBehavior();
    scrollSectionIntoView(id, behavior);
    afterNavScroll(behavior, () => watchScrollCorrections(id, generation));
  } finally {
    completeNavigationProgress(generation);
  }
}

function scheduleIdle(fn: () => void) {
  if (typeof requestIdleCallback !== "undefined") {
    idleHandle = requestIdleCallback(fn, { timeout: 5000 });
  } else {
    idleHandle = window.setTimeout(fn, 5000);
  }
}

function cancelIdle() {
  if (idleHandle === null) return;
  if (typeof cancelIdleCallback !== "undefined") {
    cancelIdleCallback(idleHandle);
  } else {
    clearTimeout(idleHandle);
  }
  idleHandle = null;
}

function drainQueue() {
  if (!queue.length) {
    idleHandle = null;
    return;
  }

  const batch = queue.splice(0, IDLE_PREFETCH_BATCH_SIZE);

  void Promise.all(batch.map((item) => prefetchChunk(item.id, item.loader))).finally(() => {
    scheduleIdle(drainQueue);
  });
}

export function startBackgroundPrefetch() {
  if (started || typeof window === "undefined") return;
  started = true;

  queue = visibleSections
    .filter((entry) => entry.priority === "normal" && !loaded.has(entry.id))
    .map((entry) => ({ id: entry.id, loader: entry.loader }));

  scheduleIdle(drainQueue);
}

/** Hover/focus: prefetch всего пути до секции (chunk-only, без mount). */
export function prioritizeSection(id: SectionId) {
  cancelIdle();

  const pathIds = new Set(getScrollPathIds(id));
  prefetchScrollPathChunks(id);

  queue = queue.filter((item) => !pathIds.has(item.id));
  scheduleIdle(drainQueue);
}

export function isSectionPrefetched(id: SectionId) {
  return loaded.has(id) || inflight.has(id);
}
