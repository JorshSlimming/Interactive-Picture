import React, { useState, useEffect } from 'react';
import influentialPicture from '../assets/InfluentialPicture.jpg';
import areasData from '../assets/areas.json';
import CharacterDetail from '../components/CharacterDetail';
import FloatName from '../components/FloatName'; 

const Principal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', link: '' });
    const [floatName, setFloatName] = useState({ visible: false, title: '', x: 0, y: 0 });

    const originalWidth = 2600;
    const originalHeight = 1105;

    let currentAspectX = 1;
    let currentAspectY = 1;

    const adjustCoords = (scaleX, scaleY, isAdjusting = true) => {
        const areas = document.querySelectorAll("area");
        
        areas.forEach(area => {
            let coords = area.getAttribute("coords").split(",").map(Number);
            coords = coords.map((coord, index) => 
                index % 2 === 0 ? Math.round(isAdjusting ? coord * scaleX : coord / scaleX) : Math.round(isAdjusting ? coord * scaleY : coord / scaleY)
            );
            area.setAttribute("coords", coords.join(","));
        });
    };

    const adjustImageAndCoords = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const image = document.getElementById("image");
        image.style.width = `${windowWidth}px`;
        image.style.height = `${windowHeight}px`;

        const scaleX = windowWidth / originalWidth;
        const scaleY = windowHeight / originalHeight;

        adjustCoords(currentAspectX, currentAspectY, false);
        adjustCoords(scaleX, scaleY);

        currentAspectX = scaleX;
        currentAspectY = scaleY;
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
            y: y - 5 // Ajuste de la posición del floatName hacia arriba
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
        adjustImageAndCoords();
        window.addEventListener("resize", adjustImageAndCoords);
        
        return () => {
            window.removeEventListener("resize", adjustImageAndCoords);
        };
    }, []);

    return (
        <div>
            <img
                id="image"
                alt="Influential Picture"
                src={influentialPicture}
                useMap="#Map"
            />
            <map name="Map">
                {areasData.map((area, index) => (
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
            <FloatName 
                visible={floatName.visible} 
                title={floatName.title} 
                x={floatName.x} 
                y={floatName.y} 
            />

            {/* Modal */}
            {modalVisible && (
                <CharacterDetail 
                    title={modalContent.title}
                    link={modalContent.link}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Principal;
