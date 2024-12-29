// Importamos las dependencias necesarias de React y React Router
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Usamos HashRouter en lugar de BrowserRouter
import Picture from './pages/Picture.js'; // Importamos el componente Picture para la ruta '/Picture'
import Home from './pages/Home.js'; // Importamos el componente Home para la ruta '/'
import './I18Next.js'; // Importamos la configuración de i18next para la internacionalización (i18n)

function App() {
  return (
    // Usamos HashRouter para envolver las rutas de la aplicación
    <Router>
      <Routes>
        {/* Definimos las rutas dentro del componente Routes */}
        
        {/* Ruta principal, cuando el usuario accede a '/', renderiza el componente Home */}
        <Route path="/" element={<Home />} />

        {/* Ruta para '/Picture', cuando el usuario accede a '/Picture', renderiza el componente Picture */}
        <Route path="/Picture" element={<Picture />} />
      </Routes>
    </Router>
  );
}

export default App; // Exportamos el componente App para que pueda ser utilizado en otras partes de la aplicación
