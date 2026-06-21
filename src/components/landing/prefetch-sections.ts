import type { SectionId } from "./data";
import { sectionById, sectionCatalog } from "./catalog";

type QueueItem = {
  id: SectionId;
  loader: () => Promise<unknown>;
};

const loaded = new Set<SectionId>();
const inflight = new Map<SectionId, Promise<unknown>>();
const boostListeners = new Set<(id: SectionId) => void>();

let queue: QueueItem[] = [];
let idleHandle: number | null = null;
let started = false;

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
  boostListeners.forEach((listener) => listener(id));
}

export function subscribeSectionBoost(listener: (id: SectionId) => void) {
  boostListeners.add(listener);
  return () => boostListeners.delete(listener);
}

export function boostSection(id: SectionId) {
  const entry = sectionById[id];
  if (!entry) return;

  queue = queue.filter((item) => item.id !== id);
  notifyBoost(id);
  void prefetchChunk(id, entry.loader);
}

function scheduleIdle(fn: () => void) {
  if (typeof requestIdleCallback !== "undefined") {
    idleHandle = requestIdleCallback(fn, { timeout: 2000 });
  } else {
    idleHandle = window.setTimeout(fn, 120);
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

  const next = queue.shift();
  if (!next) return;

  void prefetchChunk(next.id, next.loader).finally(() => {
    scheduleIdle(drainQueue);
  });
}

export function startBackgroundPrefetch() {
  if (started || typeof window === "undefined") return;
  started = true;

  const high = sectionCatalog.filter((s) => s.priority === "high");
  const normal = sectionCatalog.filter((s) => s.priority === "normal");

  window.setTimeout(() => {
    high.forEach((entry) => {
      void prefetchChunk(entry.id, entry.loader);
    });
  }, 100);

  queue = normal.map((entry) => ({ id: entry.id, loader: entry.loader }));
  scheduleIdle(drainQueue);
}

export function prioritizeSection(id: SectionId) {
  cancelIdle();
  boostSection(id);

  const entry = sectionById[id];
  if (!entry) return;

  const rest = sectionCatalog
    .filter((s) => s.id !== id && !loaded.has(s.id))
    .map((s) => ({ id: s.id, loader: s.loader }));

  queue = rest;
  scheduleIdle(drainQueue);
}

export function isSectionPrefetched(id: SectionId) {
  return loaded.has(id) || inflight.has(id);
}
