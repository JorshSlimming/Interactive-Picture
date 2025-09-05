import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateApiKey } from '../Api';  // Función que valida la API Key
import { useTranslation } from 'react-i18next';  // Para manejar la traducción de la interfaz
import './Home.css';  

// Cargar imágenes desde la carpeta de recursos
const images = require.context('../assets/pictures', false, /\.(jpg|jpeg|png)$/);

const Home = () => {
  // Definir estados para manejar la imagen seleccionada, la API Key y su validez
  const [selectedImage, setSelectedImage] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [isValid, setIsValid] = useState(null);  
  const [showImageWarning, setShowImageWarning] = useState(false);
  const navigate = useNavigate(); // Navegación a otras rutas

  // Acceder a las funciones de traducción
  const { t, i18n } = useTranslation();

  // Lógica para manejar la selección de imágenes
  const handleImageSelect = (image) => {
    setSelectedImage(selectedImage === image ? null : image);  // Cambiar la imagen seleccionada
  };

  // Validación de la API Key
  const handleApiKeyValidation = async () => {
    const isApiKeyValid = await validateApiKey(apiKey); 
    setIsValid(isApiKeyValid);  // Actualizar el estado de la validez de la API Key
  };

  // Navegar a la página de visualización solo si la imagen está seleccionada y la API Key es válida
  const handleVisualize = () => {
    if (!selectedImage) {
      setShowImageWarning(true);
      return;
    }
    if (selectedImage && isValid) {
      navigate('/picture', { state: { image: selectedImage, apiKey } });  // Redirigir con los datos seleccionados
    }
  };

  // Cambiar el idioma de la aplicación
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);  // Cambiar el idioma usando i18n
  };

  return (
    <div className="home-page">
      <h1>{t('home.title')}</h1> 

      <div className="language-buttons">
        <button 
          onClick={() => handleLanguageChange('es')} 
          className={i18n.language === 'es' ? 'selected' : ''}  
        >
          Español
        </button>
        <button 
          onClick={() => handleLanguageChange('en')} 
          className={i18n.language === 'en' ? 'selected' : ''}  
        >
          English
        </button>
      </div>

      {/* Mensaje de advertencia si no hay imagen seleccionada */}
      {!selectedImage && (
        <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
          {t('home.selectImageWarning')}
        </p>
      )}

      <div className="home-page__imageSelection">
        {images.keys().map((image, index) => {
          const imageName = image.replace('./', '');
          const isSelected = selectedImage === imageName;
          return (
            <div
              key={index}
              className={`home-page__imageWrapper ${isSelected ? 'selected' : ''}`}
              onClick={() => handleImageSelect(imageName)}
              style={{ position: 'relative' }}
            >
              {isSelected && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'green',
                    fontWeight: 'bold',
                    background: 'white',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  {t('home.selected')}
                </span>
              )}
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
      <p style={{ marginBottom: '0px' }}>{t('home.apiKeyInfo')}</p>
        <div className="home-page__apiKeyInput">
            <input
              type="text"
              placeholder={t('home.apiKeyPlaceholder')} 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="home-page__input"
            />
            <button onClick={handleApiKeyValidation} className="home-page__button">{t('home.validateButton')}</button> 
        </div>  
        <div className="api-key-info">
          {isValid !== null && (
            <p className={isValid ? 'home-page__success' : 'home-page__error'}>
              {isValid ? t('home.apiKeyValid') : t('home.apiKeyInvalid')} 
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
        {t('home.visualizeButton')} 
      </button>
    </div>
  );
};

export default Home;
