import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import "../styles/header.css";
import logoSvg from "../assets/logosite.svg";
import { FaUser, FaUserCircle, FaSignOutAlt, FaChevronDown, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';

import frFlag from "../assets/france.png";
import enFlag from "../assets/english.png";
import esFlag from "../assets/spain.png";
import ptFlag from "../assets/portugal.png";

const languages = [
  { code: "FR", name: "Français", flag: frFlag },
  { code: "EN", name: "English", flag: enFlag },
  { code: "ES", name: "Español", flag: esFlag },
  { code: "PT", name: "Português", flag: ptFlag },
];

const defaultTranslations = {
  header: {
    home: "Accueil",
    products: "Produits",
    contact: "Contact",
    orders: "Commandes",
    login: "Connexion"
  }
};

const Header = () => {
  const { language, setLanguage, t = {} } = useLanguage();
  const { user, logout, openAuthModal, globalSuccessMessage } = useContext(AuthContext);
  const { getCartItemsCount, openCartModal } = useCart();
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);
  const langButtonRef = useRef(null);
  const location = useLocation();
  
  const translations = t && t.header ? t : defaultTranslations;
  
  const selectedLang = languages.find(lang => lang.code === language) || languages[0];
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        langMenuOpen &&
        langMenuRef.current && 
        !langMenuRef.current.contains(event.target) &&
        langButtonRef.current &&
        !langButtonRef.current.contains(event.target)
      ) {
        setLangMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuOpen]);

  const handleLanguageSelect = (langCode) => {
    const selectedLang = languages.find(lang => lang.code === langCode);
    if (selectedLang) {
      setLanguage(langCode);
    }
    setLangMenuOpen(false);
  };
  
  return (
    <header className={`header ${visible ? "visible" : "hidden"}`}>
      <div className="container">
        <Link to="/" className="logo">
          <img src={logoSvg} alt="ABX Trading" className="logo-img" />
        </Link>
        
        <nav className="nav">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                {translations.header.home}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
                {translations.header.products}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                {translations.header.contact}
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="header-right">
          <div className="language-selector">
            <div 
              ref={langButtonRef}
              className="lang-button" 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
            >
              <img src={selectedLang.flag} alt={selectedLang.name} className="lang-flag" />
              <span>{selectedLang.code}</span>
              <FaChevronDown className={`lang-arrow ${langMenuOpen ? 'rotated' : ''}`} />
            </div>

            {langMenuOpen && (
              <ul ref={langMenuRef} className="language-menu">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={language === lang.code ? "active" : ""}
                  >
                    <img src={lang.flag} alt={lang.name} className="lang-flag" />
                    <span>{lang.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="cart-wrapper">
            <button className="cart-button-simple" onClick={openCartModal}>
              <BsCart3 className="cart-icon-simple" />
              {getCartItemsCount() > 0 && (
                <span className="cart-count">{getCartItemsCount()}</span>
              )}
            </button>
          </div>
          
          {user ? (
            <div className="user-profile-hover">
              <div className="profile-main">
                <FaUserCircle className="profile-icon-small" />
                <span className="user-name-display">{user.name ? user.name.split(' ')[0] : 'Utilisateur'}</span>
              </div>
              <div className="profile-dropdown">
                <Link to="/orders" className="profile-dropdown-item">
                  <span className="dropdown-icon">📋</span>
                  Mes commandes
                </Link>
                <button onClick={logout} className="profile-dropdown-item logout-item">
                  <FaSignOutAlt className="dropdown-icon" />
                  Déconnexion
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-section">
              <button className="auth-button" onClick={openAuthModal}>
                <FaUser className="auth-icon" />
                <span className="auth-text">Connexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {globalSuccessMessage && (
        <div className="global-success-toast">
          <FaCheck className="success-icon" /> {globalSuccessMessage}
        </div>
      )}
    </header>
  );
};

export default Header;