import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
  FR: {
    nav: { home: "Accueil", products: "Produits", contact: "Contact" },
    hero: { title: "ABXTRADING", description: "ABXTRADING est un groupe marocain de premier plan..." },
    process: { title: "Notre Processus de Production" },
    products: { title: "Nos Produits" },
    contact: { title: "Contactez-Nous" }
  },
  EN: {
    nav: { home: "Home", products: "Products", contact: "Contact" },
    hero: { title: "ABXTRADING", description: "ABXTRADING is a leading Moroccan group..." },
    process: { title: "Our Production Process" },
    products: { title: "Our Products" },
    contact: { title: "Contact Us" }
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('FR');

  const value = {
    currentLang,
    setLanguage: setCurrentLang,
    translations: translations[currentLang]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  FR: {
    nav: {
      home: "Accueil",
      products: "Produits",
      contact: "Contact"
    },
    hero: {
      title: "ABXTRADING",
      subtitle: "Leader dans l'exportation de produits de la mer"
    }
  },
  EN: {
    nav: {
      home: "Home",
      products: "Products",
      contact: "Contact"
    },
    hero: {
      title: "ABXTRADING",
      subtitle: "Leader in seafood export"
    }
  }
};

export const useTranslation = () => {
  const [currentLang, setCurrentLang] = useState('FR');
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return {
    t,
    currentLang,
    setCurrentLang
  };
};