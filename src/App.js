import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Picture from './pages/Picture.js';
import Home from './pages/Home.js';
import './I18Next.js';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Picture" element={<Picture />} />
            </Routes>
        </Router>

  );
}

export default App;
