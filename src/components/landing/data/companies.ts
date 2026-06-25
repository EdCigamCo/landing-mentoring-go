import { companyLogos } from "./images/companies";



export type Company = {

  name?: string;

  logo?: string;

};



export const companies: Company[] = [

  { name: "Yandex", logo: companyLogos.yandex },

  { name: "Avito", logo: companyLogos.avito },

  { name: "Ozon", logo: companyLogos.ozon },

  { name: "VK", logo: companyLogos.vk },

  { name: "Tinkoff", logo: companyLogos.tinkoff },

  { name: "Sber", logo: companyLogos.sber },

  { name: "Wildberries", logo: companyLogos.wildberries },

  { logo: companyLogos.x5tech },

  { name: "Mail.ru", logo: companyLogos.mailru },

  { name: "Kaspersky", logo: companyLogos.kaspersky },

  { name: "Lamoda", logo: companyLogos.lamoda },

  { name: "Циан", logo: companyLogos.cian },

  { name: "МТС", logo: companyLogos.mts },

  { name: "Alfa · Bank", logo: companyLogos.alfabank },

];


