import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from '../context/LanguageContext';
import "../styles/header.css";

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

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  const location = useLocation();
  const selectedLang = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        document.querySelector(".search-input")?.focus();
      }, 100);
    }
  };

  const handleChangeLang = (lang) => {
    setLanguage(lang.code);
    setShowLangMenu(false);
  };

  const handleNavClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className={`header ${visible ? "visible" : "hidden"}`}>
      <div className="container">
        <h2 className="logo">ABX Fish</h2>
        <nav className="nav">
          <ul>
            <li>
              <Link 
                to="/" 
                className={location.pathname === "/" ? "active" : ""} 
                onClick={handleNavClick}
              >
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={location.pathname === "/products" ? "active" : ""} 
                onClick={handleNavClick}
              >
                {t.nav.products}
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={location.pathname === "/contact" ? "active" : ""} 
                onClick={handleNavClick}
              >
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-right">
          <div className={`search-container ${showSearch ? "expanded" : ""}`}>
            <button className="search-icon" onClick={handleToggleSearch} aria-label="Toggle search">
              <i className="fa fa-search"></i>
            </button>
            {showSearch && (
              <div className="search-box">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder={t.nav.search} 
                />
              </div>
            )}
          </div>

          <div className="language-selector">
            <button onClick={() => setShowLangMenu(!showLangMenu)} className="lang-button">
              <img src={selectedLang.flag} alt={selectedLang.code} className="lang-flag" />
              {selectedLang.code}
              <i className="fa fa-chevron-down"></i>
            </button>

            {showLangMenu && (
              <ul className="language-menu">
                {languages.map((lang) => (
                  <li 
                    key={lang.code} 
                    onClick={() => handleChangeLang(lang)}
                    className={lang.code === language ? 'active' : ''}
                  >
                    <img src={lang.flag} alt={lang.name} className="lang-flag" />
                    {lang.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
