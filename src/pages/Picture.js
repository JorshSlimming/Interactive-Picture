import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CharacterDetail from '../components/CharacterDetail';
import FloatName from '../components/FloatName';

// Cargar todas las áreas (JSON) de la carpeta "assets" de manera dinámica
const areasContext = require.context('../assets', false, /\.json$/);

const Picture = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', link: '' });
  const [floatName, setFloatName] = useState({ visible: false, title: '', x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [areasData, setAreasData] = useState([]); // Nuevo estado para áreas de la imagen
  const [imageSrc, setImageSrc] = useState(null); // Estado para la ruta de la imagen

  // Cargar la imagen desde el estado pasado por la navegación
  const location = useLocation();
  const { image } = location.state || {}; // Recuperamos la ruta de la imagen desde el estado

  let currentAspectX = 1;
  let currentAspectY = 1;

  // Función para cargar dinámicamente el archivo JSON correspondiente
  const loadAreasData = (imageName) => {
    try {
      const jsonFileName = imageName.replace(/\.[^/.]+$/, '') + '.json'; // Generar el nombre del archivo JSON
      const areas = areasContext(`./${jsonFileName}`); // Cargar el archivo JSON dinámicamente
      setAreasData(areas); // Guardar las áreas en el estado
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
      setAreasData([]); // En caso de error, aseguramos que áreasData quede vacío
    }
  };

  // Ajustar las coordenadas del mapa
  const adjustCoords = (scaleX, scaleY, isAdjusting = true) => {
    const areas = document.querySelectorAll('area');
    areas.forEach((area) => {
      let coords = area.getAttribute('coords').split(',').map(Number);
      coords = coords.map((coord, index) =>
        index % 2 === 0
          ? Math.round(isAdjusting ? coord * scaleX : coord / scaleX)
          : Math.round(isAdjusting ? coord * scaleY : coord / scaleY)
      );
      area.setAttribute('coords', coords.join(','));
    });
  };

  const adjustImageAndCoords = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const image = document.getElementById('image');
    image.style.width = `${windowWidth}px`;
    image.style.height = `${windowHeight}px`;

    const scaleX = windowWidth / imageDimensions.width;
    const scaleY = windowHeight / imageDimensions.height;

    adjustCoords(currentAspectX, currentAspectY, false);
    adjustCoords(scaleX, scaleY);

    currentAspectX = scaleX;
    currentAspectY = scaleY;
  };

  const handleImageLoad = (e) => {
    const { width, height } = e.target;
    setImageDimensions({ width, height });
    setImageLoaded(true);
  };

  const handleMouseEnter = (e, title) => {
    const area = e.target;
    const coords = area.getAttribute('coords').split(',').map(Number);
    const x = coords[0] * currentAspectX;
    const y = coords[1] * currentAspectY;

    setFloatName({
      visible: true,
      title: title,
      x: x,
      y: y - 20,
    });
  };

  const handleMouseLeave = () => {
    setFloatName({ ...floatName, visible: false });
  };

  const handleAreaClick = (e, title, href) => {
    setModalContent({ title, link: href });
    setModalVisible(true); // Mostrar el modal
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (image) {
      setImageSrc(image); // Asignamos la imagen pasada a la página
      loadAreasData(image); // Cargar las áreas de la imagen seleccionada
    }
  }, [image]);

  useEffect(() => {
    if (imageLoaded) {
      adjustImageAndCoords();
      window.addEventListener('resize', adjustImageAndCoords);

      return () => {
        window.removeEventListener('resize', adjustImageAndCoords);
      };
    }
  }, [imageLoaded, imageDimensions]);

  return (
    <div>
      {imageSrc && (
        <img
          id="image"
          src={require(`../assets/${imageSrc}`)} // Cargar la imagen seleccionada
          useMap="#Map"
          onLoad={handleImageLoad}
        />
      )}
      <map name="Map">
        {areasData.length > 0 &&
          areasData.map((area, index) => (
            <area
              key={index}
              alt={area.alt}
              coords={area.coords}
              shape={area.shape}
              onMouseEnter={(e) => handleMouseEnter(e, area.title)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleAreaClick(e, area.title, area.href)}
              style={{ cursor: 'pointer' }}
            />
          ))}
      </map>

      {/* Usando el componente FloatName */}
      <FloatName visible={floatName.visible} title={floatName.title} x={floatName.x} y={floatName.y} />

      {/* Modal */}
      {modalVisible && (
        <CharacterDetail title={modalContent.title} link={modalContent.link} onClose={closeModal} />
      )}
    </div>
  );
};

export default Picture;
