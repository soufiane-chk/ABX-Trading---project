import React, { useEffect, useState } from "react";
import "../styles/footer.css";
import { useLanguage } from '../context/LanguageContext';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

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

  return (
    <footer className={`footer ${isVisible ? 'visible' : ''}`}>
      <div className="footer-container">
        <p className="para">&copy; 2025 ABX FISH. {t?.footer?.rights || "Tous droits réservés."}</p>
        
        <div className="footer-links">
          <div className="footer-social">
            <a href="https://facebook.com" className="social-link" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="social-link" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" className="social-link" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
