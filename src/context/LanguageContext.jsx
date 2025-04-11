import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'FR'; // Langue par défaut
  });

  // Sauvegarde de la préférence de langue
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Obtention des traductions pour la langue actuelle
  const t = translations[language] || translations.FR;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage doit être utilisé à l\'intérieur d\'un LanguageProvider');
  }
  return context;
};