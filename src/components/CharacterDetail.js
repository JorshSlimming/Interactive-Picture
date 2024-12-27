import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useNavigate } from 'react-router-dom';  // Si estás usando React Router

// Componente de detalle de personaje
const CharacterDetail = ({ title, link, onClose }) => {
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [hasFetched, setHasFetched] = useState(false); // Controla si la solicitud ya se realizó

  // Usamos useMemo para crear la instancia de GoogleGenerativeAI solo una vez
  const genAI = useMemo(() => new GoogleGenerativeAI('AIzaSyAZEoiI7HlvP1CniONS1q1uQwwFQrgELgg'), []);
  const model = useMemo(() => genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }), [genAI]);

  // Realizar la solicitud a la API cuando el modal se abre por primera vez
  useEffect(() => {
    if (!title || hasFetched) return; // No hacer nada si no hay título o si ya se hizo la solicitud
    console.log('Solicitando datos de:', title);

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
        setHasFetched(true); // Marcar que ya se hizo la solicitud
      } catch (err) {
        setError(`Error: ${err.message}`); // En caso de error, mostramos el mensaje
        setCharacterData(null); // Limpiamos los datos previos
      } finally {
        setIsLoading(false); // Terminamos de cargar
      }
    };

    fetchCharacterData(); // Llamada a la API
  }, [title, model, hasFetched]); // La dependencia de `hasFetched` asegura que no se haga la solicitud más de una vez

  // Usamos `useNavigate` para redirigir a la página principal
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');  // Redirige a la página principal (puedes cambiar '/' por la ruta de tu home)
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2 style={modalTitleStyle}>{title}</h2>

        {error && <div style={errorStyle}>{error}</div>}

        {isLoading ? (
          <p style={loadingStyle}>Cargando...</p> // Mostrar el estado de carga
        ) : (
          characterData && (
            <>
              <p style={descriptionStyle}>{characterData.description}</p> {/* Mostrar la descripción narrativa */}
            </>
          )
        )}

        <div style={buttonContainerStyle}>
          <button onClick={onClose} style={buttonStyle}>Cerrar</button>
          <button onClick={handleHomeClick} style={buttonStyle}>Home</button>
        </div>
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
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro con mayor opacidad
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '1000',
};

const modalContentStyle = {
  backgroundColor: '#1E1E1E', // Fondo oscuro del modal
  color: '#E0E0E0', // Texto claro
  padding: '30px',
  borderRadius: '12px',
  width: '80%',
  maxWidth: '500px',  // Un ancho máximo para que no se vea demasiado grande
  textAlign: 'left',
  overflowY: 'auto',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)', // Sombra para destacar el modal
};

const modalTitleStyle = {
  color: '#FFFFFF', // Título blanco
  fontSize: '1.8rem',
  marginBottom: '15px',
};

const descriptionStyle = {
  color: '#B0B0B0',  // Descripción en gris claro
  fontSize: '1rem',
  lineHeight: '1.5',
};

const errorStyle = {
  color: '#FF6347', // Rojo para los errores
  fontSize: '1rem',
  marginTop: '15px',
};

const loadingStyle = {
  color: '#B0B0B0',
  fontSize: '1rem',
  marginTop: '15px',
};

const linkStyle = {
  color: '#4A90E2', // Azul para los links
  textDecoration: 'none',
  marginTop: '10px',
  display: 'block',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4A90E2',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
};



export default CharacterDetail;
