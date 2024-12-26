import React from 'react';

const FloatName = ({ visible, title, x, y }) => {
    if (!visible) return null; // Si no está visible, no renderizar nada

    return (
        <div 
            style={{
                position: 'absolute',
                top: `${y}px`,
                left: `${x}px`,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '12px',
                pointerEvents: 'none', // Para que no interfiera con el mouse
                transform: 'translate(-50%, -100%)', // Centrar el floatName
            }}
        >
            {title}
        </div>
    );
};

export default FloatName;
