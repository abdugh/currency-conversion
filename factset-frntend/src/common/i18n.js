import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const translation_en = require('./i18n/en/translation.js');
const translation_de = require('./i18n/de/translation.js');

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    ...translation_en
  },
  de: {
    ...translation_de
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;