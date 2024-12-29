import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateApiKey } from '../Api';  // Ya incluye la función para validar la API Key
import { useTranslation } from 'react-i18next'; // Importamos el hook de i18next
import './Home.css';  

const images = require.context('../assets/pictures', false, /\.(jpg|jpeg|png)$/);

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [isValid, setIsValid] = useState(null);  
  const navigate = useNavigate();

  // Usamos el hook useTranslation para acceder a las traducciones
  const { t, i18n } = useTranslation();

  const handleImageSelect = (image) => {
    if (selectedImage === image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  };

  const handleApiKeyValidation = async () => {
    const isApiKeyValid = await validateApiKey(apiKey); 

    if (isApiKeyValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleVisualize = () => {
    if (selectedImage && isValid) {
      navigate('/picture', { state: { image: selectedImage, apiKey } });
    }
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);  // Cambia el idioma con i18n
  };

  return (
    <div className="home-page">
      <h1>{t('home.title')}</h1> {/* Usamos la traducción para el título */}

      {/* Botones para cambiar el idioma */}
      <div className="language-buttons">
        <button 
          onClick={() => handleLanguageChange('es')} 
          className={i18n.language === 'es' ? 'selected' : ''}  // Clase 'selected' si el idioma es español
        >
          Español
        </button>
        <button 
          onClick={() => handleLanguageChange('en')} 
          className={i18n.language === 'en' ? 'selected' : ''}  // Clase 'selected' si el idioma es inglés
        >
          English
        </button>
      </div>


      <div className="home-page__imageSelection">
        {images.keys().map((image, index) => {
          const imageName = image.replace('./', '');
          return (
            <div
              key={index}
              className={`home-page__imageWrapper ${selectedImage === imageName ? 'selected' : ''}`}
              onClick={() => handleImageSelect(imageName)}
            >
              <img
                src={images(image)}
                alt={`Image ${index + 1}`}
                className="home-page__image"
              />
            </div>
          );
        })}
      </div>

      <div className='home-page__apiKeySection' >
        <div className="home-page__apiKeyInput">
            <input
              type="text"
              placeholder={t('home.apiKeyPlaceholder')} // Traducción para el placeholder
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="home-page__input"
            />
            <button onClick={handleApiKeyValidation} className="home-page__button">{t('home.validateButton')}</button> {/* Traducción para el botón "Validar" */}
        </div>  
        <div className="api-key-info">
          {isValid !== null && (
            <p className={isValid ? 'home-page__success' : 'home-page__error'}>
              {isValid ? t('home.apiKeyValid') : t('home.apiKeyInvalid')} {/* Mensajes de validación de la API Key */}
            </p>
          )}  
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="api-key-link"
          >
            {t('home.getApiKeyLink')}
          </a>
        </div>    
      </div>

      

      <button 
        onClick={handleVisualize} 
        className={`home-page__button ${selectedImage && isValid ? 'active' : ''}`}
        disabled={!selectedImage || !isValid} 
      >
        {t('home.visualizeButton')} {/* Traducción para el botón "Visualizar" */}
      </button>
    </div>
  );
};

export default Home;
