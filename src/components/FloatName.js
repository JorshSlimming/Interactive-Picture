import React from 'react';

// Componente que muestra un texto flotante con el nombre, visible en una posición determinada
const FloatName = ({ visible, title, x, y }) => {
    // Si 'visible' es falso, no renderiza nada
    if (!visible) return null; 

    return (
        <div
            style={{
                position: 'absolute', 
                top: `${y - 20}px`, 
                left: `${x}px`, 
                backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                color: 'white', 
                padding: '5px 10px', 
                borderRadius: '5px', 
                fontSize: '12px', 
                pointerEvents: 'none', 
                transform: 'translateX(-50%)', 
            }}
        >
            {title} 
        </div>
    );
};

export default FloatName;  // Exporta el componente
