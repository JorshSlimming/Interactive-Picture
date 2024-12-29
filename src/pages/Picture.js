import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CharacterDetail from '../components/CharacterDetail';  // Componente para mostrar los detalles del personaje
import FloatName from '../components/FloatName';  // Componente para mostrar un nombre flotante

// Cargar todos los archivos JSON en la carpeta de imágenes
const areasContext = require.context('../assets/pictures', false, /\.json$/);

const Picture = () => {
  // Estado para mostrar/ocultar el modal con los detalles
  const [modalVisible, setModalVisible] = useState(false);
  // Estado para almacenar los datos del modal (título y enlace)
  const [modalContent, setModalContent] = useState({ title: '', link: '' });
  // Estado para controlar la visibilidad del nombre flotante
  const [floatName, setFloatName] = useState({ visible: false, title: '', x: 0, y: 0 });
  // Estado para almacenar las dimensiones de la imagen
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  // Estado para manejar la carga de la imagen
  const [imageLoaded, setImageLoaded] = useState(false);
  // Estado para almacenar los datos de las áreas (JSON)
  const [areasData, setAreasData] = useState([]); 
  // Estado para manejar la fuente de la imagen
  const [imageSrc, setImageSrc] = useState(null);

  // Obtener el estado de la imagen seleccionada desde la ruta
  const location = useLocation();
  const { image } = location.state || {}; 

  // Variables para ajustar las coordenadas de la imagen
  let currentAspectX = 1;
  let currentAspectY = 1;

  // Función para cargar los datos del archivo JSON correspondiente a la imagen
  const loadAreasData = (imageName) => {
    try {
      // Convertir el nombre de la imagen a su archivo JSON correspondiente
      const jsonFileName = imageName.replace(/\.[^/.]+$/, '') + '.json'; 
      const areas = areasContext(`./${jsonFileName}`);  // Cargar el JSON usando require.context
      setAreasData(areas);  // Actualizar los datos de las áreas
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
      setAreasData([]);  // Si hay un error, establecer las áreas como vacías
    }
  };

  // Función para ajustar las coordenadas de las áreas según las proporciones de la imagen
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

  // Función que ajusta tanto la imagen como las coordenadas de las áreas cuando cambia el tamaño de la ventana
  const adjustImageAndCoords = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const image = document.getElementById('image');
    image.style.width = `${windowWidth}px`;
    image.style.height = `${windowHeight}px`;

    const scaleX = windowWidth / imageDimensions.width;
    const scaleY = windowHeight / imageDimensions.height;

    // Ajustar las coordenadas de las áreas con las nuevas proporciones
    adjustCoords(currentAspectX, currentAspectY, false);
    adjustCoords(scaleX, scaleY);

    // Actualizar las proporciones actuales
    currentAspectX = scaleX;
    currentAspectY = scaleY;
  };

  // Función que maneja la carga de la imagen y guarda sus dimensiones
  const handleImageLoad = (e) => {
    const { width, height } = e.target;
    setImageDimensions({ width, height });  // Guardar las dimensiones de la imagen
    setImageLoaded(true);  // Marcar la imagen como cargada
  };

  // Función para mostrar el nombre flotante cuando el mouse entra en una área
  const handleMouseEnter = (e, title) => {
    const area = e.target;
    const coords = area.getAttribute('coords').split(',').map(Number);
    const x = coords[0] * currentAspectX;
    const y = coords[1] * currentAspectY;

    setFloatName({
      visible: true,
      title: title,
      x: x,
      y: y - 20,  // Ajustar la posición para que el nombre flote sobre el área
    });
  };

  // Función para ocultar el nombre flotante cuando el mouse sale de una área
  const handleMouseLeave = () => {
    setFloatName({ ...floatName, visible: false });
  };

  // Función para manejar el clic en un área y mostrar el modal con los detalles
  const handleAreaClick = (e, title, href) => {
    setModalContent({ title, link: href });
    setModalVisible(true);  // Mostrar el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);  // Ocultar el modal
  };

  // Cargar la imagen y sus áreas cuando cambia la imagen seleccionada
  useEffect(() => {
    if (image) {
      setImageSrc(image);  // Establecer la imagen seleccionada
      loadAreasData(image);  // Cargar los datos de las áreas
    }
  }, [image]);

  // Ajustar la imagen y las coordenadas cuando la imagen se carga completamente
  useEffect(() => {
    if (imageLoaded) {
      adjustImageAndCoords();  // Ajustar la imagen y las áreas al tamaño de la ventana
      window.addEventListener('resize', adjustImageAndCoords);  // Agregar evento de cambio de tamaño de la ventana

      // Limpiar el evento cuando el componente se desmonte
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
          src={require(`../assets/pictures/${imageSrc}`)}  // Cargar la imagen seleccionada
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

      <FloatName visible={floatName.visible} title={floatName.title} x={floatName.x} y={floatName.y} />

      {modalVisible && (
        <CharacterDetail title={modalContent.title} link={modalContent.link} onClose={closeModal} />
      )}
    </div>
  );
};

export default Picture;
