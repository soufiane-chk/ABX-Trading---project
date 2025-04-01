import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';

const App = () => {
  return (
    <LanguageProvider>
      <Routes>
        {/* Autres routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        {/* Autres routes */}
      </Routes>
    </LanguageProvider>
  );
};

export default App;