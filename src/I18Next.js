// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationES from './assets/language/Es.json'; // Traducción en Español
import translationEN from './assets/language/En.json'; // Traducción en Inglés

// Inicializar i18next
i18n
  .use(LanguageDetector) // Detectar el idioma automáticamente
  .use(initReactI18next) // Integración con React
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      es: {
        translation: translationES,
      },
    },
    fallbackLng: 'es', // Idioma por defecto si no se detecta
    interpolation: {
      escapeValue: false, // React ya maneja la seguridad contra XSS
    },
  });

export default i18n;
