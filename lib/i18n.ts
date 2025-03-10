// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation JSON files
import common_en from '../public/locales/en/common.json';
import common_es from '../public/locales/es/common.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en', // default language
  resources: {
    en: { common: common_en },
    es: { common: common_es },
  },
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
  react: { useSuspense: false }, // optional: disable suspense if not using it
});

export default i18n;