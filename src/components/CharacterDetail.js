import React, { useState, useEffect, useMemo } from 'react';  // Importar hooks de React
import { useNavigate, useLocation } from 'react-router-dom';  // Importar hooks de navegación
import { initializeAPI, fetchCharacterDescription } from '../Api';  // Funciones para interactuar con la API
import { useTranslation } from 'react-i18next';  // Hook para manejar la traducción
import './CharacterDetail.css';  // Estilos específicos del componente

// Componente que muestra los detalles de un personaje
const CharacterDetail = ({ title, link, onClose }) => {
  // Estados para manejar los datos, el estado de carga y errores
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // Obtención de parámetros de la ubicación y configuración del modelo
  const location = useLocation();
  const { apiKey } = location.state || {}; 

  // Inicialización del API y el modelo
  const { model } = useMemo(() => initializeAPI(apiKey), [apiKey]);  

  // Traducciones para internacionalización
  const { t, i18n } = useTranslation();
  const lang = i18n.language;  

  // Efecto para obtener la descripción del personaje cuando se monta el componente
  useEffect(() => {
    if (!title || hasFetched) return;  // Evita realizar la misma solicitud si ya se obtuvo la información

    const fetchData = async () => {
      setIsLoading(true);  // Marca como cargando

      try {
        // Llama a la API para obtener la descripción
        const description = await fetchCharacterDescription(title, model, lang);
        setCharacterData({ description });
        setError(null);  // Resetea el error
        setHasFetched(true);  // Marca que los datos fueron obtenidos
      } catch (err) {
        setError(`Error: ${err.message}`);  // Maneja errores
        setCharacterData(null);  // Resetea los datos
      } finally {
        setIsLoading(false);  // Termina la carga
      }
    };

    fetchData();  // Ejecuta la función de obtención de datos
  }, [title, model, hasFetched, lang]);  // Re-ejecuta cuando cambian las dependencias

  const navigate = useNavigate();  // Hook de navegación

  // Función para regresar al home
  const handleHomeClick = () => {
    navigate('/');  
  };

  return (
    <div className="character-detail__overlay">
      <div className="character-detail__content">
        <h2 className="character-detail__title">{title}</h2>  {/* Muestra el título del personaje */}

        {error && <div className="character-detail__error">{error}</div>}  {/* Muestra el error si existe */}

        {/* Muestra carga o la descripción del personaje */}
        {isLoading ? (
          <p className="character-detail__loading">{t('characterDetail.loading')}</p>
        ) : (
          characterData && (
            <>
              <p className="character-detail__description">{characterData.description}</p>
            </>
          )
        )}

        {/* Contenedor de botones de acción */}
        <div className="character-detail__button-container">
          <button onClick={onClose} className="character-detail__button">
            {t('characterDetail.closeButton')}  {/* Cerrar el detalle del personaje */}
          </button>  
          <button onClick={handleHomeClick} className="character-detail__button">
            {t('characterDetail.homeButton')}  {/* Regresar al home */}
          </button> 
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;  // Exporta el componente
