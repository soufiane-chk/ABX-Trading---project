import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import AuthModal from './components/AuthModal';
import CartModal from './components/CartModal';
import Header from './components/header';

const App = () => (
  <LanguageProvider>
    <AuthProvider>
      <CartProvider>
        <div className="app-container">
          <Header />
          <AuthModal />
          <CartModal />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  </LanguageProvider>
);

export default App;