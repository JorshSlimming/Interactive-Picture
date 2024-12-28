import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { initializeAPI, fetchCharacterDescription } from '../Api'; 
import { useTranslation } from 'react-i18next';  // Importamos useTranslation para las traducciones
import './CharacterDetail.css';  

const CharacterDetail = ({ title, link, onClose }) => {
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const location = useLocation();
  const { apiKey } = location.state || {}; 

  const { model } = useMemo(() => initializeAPI(apiKey), [apiKey]); 

  // Usamos el hook useTranslation para obtener las traducciones
  const { t, i18n } = useTranslation();
  const lang = i18n.language; // Obtenemos el idioma actual

  useEffect(() => {
    if (!title || hasFetched) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        // Ahora pasamos el idioma al obtener la descripción
        const description = await fetchCharacterDescription(title, model, lang);
        setCharacterData({ description });
        setError(null);
        setHasFetched(true);
      } catch (err) {
        setError(`Error: ${err.message}`);
        setCharacterData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [title, model, hasFetched, lang]); // Aseguramos que se actualice cuando cambie el idioma

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="character-detail__overlay">
      <div className="character-detail__content">
        <h2 className="character-detail__title">{title}</h2>

        {error && <div className="character-detail__error">{error}</div>}

        {isLoading ? (
          <p className="character-detail__loading">{t('characterDetail.loading')}</p> 
        ) : (
          characterData && (
            <>
              <p className="character-detail__description">{characterData.description}</p>
            </>
          )
        )}

        <div className="character-detail__button-container">
          <button onClick={onClose} className="character-detail__button">
            {t('characterDetail.closeButton')}
          </button>  {/* Traducción para "Cerrar" */}
          <button onClick={handleHomeClick} className="character-detail__button">
            {t('characterDetail.homeButton')}
          </button>  {/* Traducción para "Home" */}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
