import React from "react";
import "../styles/footer.css";
import { useLanguage } from '../context/LanguageContext';
import logoSvg from "../assets/logosite.svg"; 

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo */}
        <div className="footer-logo">
          <img src={logoSvg} alt="ABX Trading Logo" className="footer-logo-img" />
        </div>

        {/* Liens */}
        <div className="footer-links">
          <a href="/">{t?.navigation?.home || "Accueil"}</a>
          <a href="/products">{t?.navigation?.productsLink || "Nos Produits"}</a>
          <a href="/contact">{t?.navigation?.contact || "Contact"}</a>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} {t?.footer?.company || "ABX Trading"}. {t?.footer?.allRightsReserved || "Tous droits réservés."}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
