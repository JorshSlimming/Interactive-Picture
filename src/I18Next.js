// Importamos i18next, el inicializador para React, y el detector de idioma para la configuración de i18n
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; // Necesario para integrar i18next con React
import LanguageDetector from 'i18next-browser-languagedetector'; // Detecta el idioma del navegador del usuario

// Importamos los archivos de traducción en español e inglés
import translationES from './assets/language/Es.json'; // Traducción en español
import translationEN from './assets/language/En.json'; // Traducción en inglés

i18n
  // Usamos el detector de idioma para detectar el idioma preferido del usuario
  .use(LanguageDetector) 
  // Inicializamos i18next con la configuración para React
  .use(initReactI18next) 
  .init({
    // Definimos las fuentes de traducción disponibles para cada idioma
    resources: {
      en: {
        translation: translationEN, // Traducciones en inglés
      },
      es: {
        translation: translationES, // Traducciones en español
      },
    },
    // Idioma por defecto en caso de que no se detecte uno preferido
    fallbackLng: 'es', 
    // Configuración de interpolación, desactivamos el escape para evitar que se escape HTML
    interpolation: {
      escapeValue: false, 
    },
  });

// Exportamos la configuración de i18n para que sea accesible en toda la aplicación
export default i18n;
