import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Componente de detalle de personaje
const CharacterDetail = ({ title, link, onClose }) => {
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [hasFetched, setHasFetched] = useState(false);

  // Usamos useMemo para crear la instancia de GoogleGenerativeAI solo una vez
  const genAI = useMemo(() => new GoogleGenerativeAI('AIzaSyAZEoiI7HlvP1CniONS1q1uQwwFQrgELgg'), []);
  const model = useMemo(() => genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }), [genAI]);

  // Realizar la solicitud a la API cuando el modal se abra y el 'title' cambie
  useEffect(() => {
    if (hasFetched) return;

    const fetchCharacterData = async () => {
      setIsLoading(true); // Empezamos a cargar los datos

      // Prompt para obtener una descripción narrativa del personaje
      const prompt = `Proporciona una breve descripción de ${title} de manera clara, detallada y narrativa. Incluye los siguientes aspectos:
      - Su fecha de nacimiento y muerte (si aplica). 
      - Su ocupación principal y los logros más importantes en su carrera.
      - El contexto histórico en el que vivió y cómo influyó en él.
      - Las razones por las cuales es reconocido y su impacto en la historia.

      Si es un objeto no uses términos como "nacido en" o "su ocupación fue".
      La respuesta debe ser fluida y bien estructurada, como si fuera un breve párrafo o biografía. 
      No debes poner el nombre en la descripcion, ni tampoco destacar en negrita, cursiva o caracteres especiales.
      Por favor, limita la respuesta a no más de 200 palabras.`;

      try {
        // Solicitar contenido al modelo de Gemini
        const result = await model.generateContent(prompt);

        // Limpiar la respuesta para quitar posibles marcas de formato no deseadas
        let responseText = result.response.text();

        console.log("Respuesta cruda de la API:", responseText);

        // Verificar si la respuesta tiene sentido
        if (!responseText) {
          throw new Error("Respuesta vacía o inválida.");
        }

        // Guardar la descripción narrativa en el estado
        setCharacterData({ description: responseText });
        setError(null); // Limpiar cualquier error previo
        setHasFetched(true);
      } catch (err) {
        setError(`Error: ${err.message}`); // En caso de error, mostramos el mensaje
        setCharacterData(null); // Limpiamos los datos previos
      } finally {
        setIsLoading(false); // Terminamos de cargar
      }
    };
    fetchCharacterData(); // Llamada a la API

  }, [hasFetched]); 

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2>{title}</h2>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        {isLoading ? (
          <p>Cargando...</p> // Mostrar el estado de carga
        ) : (
          characterData && (
            <>
              <p>{characterData.description}</p> {/* Mostrar la descripción narrativa */}

              <p>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Más información
                </a>
              </p>
            </>
          )
        )}

        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

// Estilos para el modal
const modalOverlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '1000',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
  textAlign: 'left',
  overflowY: 'auto',
  maxHeight: '80vh',
};

export default CharacterDetail;
