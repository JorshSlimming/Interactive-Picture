import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './pages/Principal.js';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Principal />} />
            </Routes>
        </Router>

  );
}

export default App;
