import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';  // Importar el archivo CSS

const images = require.context('../assets', false, /\.(jpg|jpeg|png)$/);

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [isValid, setIsValid] = useState(null);
  const navigate = useNavigate();

  const handleImageSelect = (image) => {
    if (selectedImage === image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  };

  const validateApiKey = () => {
    setIsValid(!!apiKey);
  };

  const handleVisualize = () => {
    if (selectedImage) {
      navigate('/picture', { state: { image: selectedImage } });
    }
  };

  return (
    <div className="home-page">
      <h1>Selecciona una imagen</h1>

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

      <div className="home-page__apiKeySection">
        <input
          type="text"
          placeholder="Pega tu API Key aquí"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="home-page__input"
        />
        <button onClick={validateApiKey} className="home-page__button">Validar</button>
      </div>

      {isValid !== null && (
          <p className={isValid ? 'home-page__success' : 'home-page__error'}>
            {isValid ? 'API Key válida' : 'API Key inválida'}
          </p>
        )}

      {/* Botón Visualizar, siempre visible debajo del formulario de API Key */}
      <button 
        onClick={handleVisualize} 
        className={`home-page__button ${selectedImage ? 'active' : ''}`}
        disabled={!selectedImage} // El botón se desactiva si no hay imagen seleccionada
      >
        Visualizar
      </button>
    </div>
  );
};

export default Home;
