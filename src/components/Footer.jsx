import React, { useEffect, useState } from "react";
import "../styles/footer.css";
import { useLanguage } from '../context/LanguageContext';
const Footer = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Créer un élément spacer après le préfooter s'il n'existe pas déjà
    const preFooter = document.querySelector(".pre-footer");
    let spacer = document.querySelector(".footer-spacer");
    
    if (!spacer && preFooter) {
      spacer = document.createElement("div");
      spacer.className = "footer-spacer";
      preFooter.parentNode.insertBefore(spacer, preFooter.nextSibling);
    }
    
    const handleScroll = () => {
      if (preFooter) {
        const preFooterPos = preFooter.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const footer = document.querySelector(".footer");
        
        // Si le préfooter est visible et presque en bas de l'écran
        if (preFooterPos.bottom <= windowHeight + 100) {
          setIsVisible(true);
          if (spacer) spacer.classList.add("active");
        } else {
          setIsVisible(false);
          if (spacer) spacer.classList.remove("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Vérifier l'état initial
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Supprimer toutes les animations et transitions
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.classList.add('visible');
      footer.style.transform = 'none';
      footer.style.transition = 'none';
      footer.style.opacity = '1';
    }
    
    // Supprimer le spacer
    const spacer = document.querySelector('.footer-spacer');
    if (spacer) {
      spacer.style.display = 'none';
      spacer.style.height = '0';
    }
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>ABX Trading</h2>
        </div>
        
        <div className="footer-links">
          <a href="/">Accueil</a>
          <a href="/produit">Produit</a>
          <a href="/contact">Contact</a>
        </div>
        
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} ABX Trading. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
