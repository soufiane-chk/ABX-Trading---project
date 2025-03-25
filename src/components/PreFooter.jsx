import React from 'react';
import { Link } from 'react-router-dom';
import { FaAnchor, FaGlobe, FaShip, FaPhoneAlt } from 'react-icons/fa';
import '../styles/PreFooter.css';
import { useLanguage } from '../context/LanguageContext';

const PreFooter = () => {
  const { t } = useLanguage();

  return (
    <div className="pre-footer">
      <div className="pre-footer-container">
        <div className="pre-footer-content">
          <div className="pre-footer-info">
            <h2>{t?.preFooter?.title || "Leader en exportation de produits marins"}</h2>
            <p>{t?.preFooter?.description || "Avec plus de 20 ans d'expérience, nous sommes votre partenaire de confiance pour l'exportation de produits marins de haute qualité depuis Safi, Maroc."}</p>
            <div className="pre-footer-badges">
              <div className="badge">
                <FaAnchor />
                <span>{t?.preFooter?.experience || "20+ ans d'expérience"}</span>
              </div>
              <div className="badge">
                <FaGlobe />
                <span>{t?.preFooter?.markets || "Marchés internationaux"}</span>
              </div>
              <div className="badge">
                <FaShip />
                <span>{t?.preFooter?.export || "Export premium"}</span>
              </div>
            </div>
          </div>
          
          <div className="pre-footer-contact">
            <h3>{t?.preFooter?.contactTitle || "Contactez-nous dès aujourd'hui"}</h3>
            <p>{t?.preFooter?.contactText || "Besoin d'informations sur nos produits ou services ? Notre équipe est à votre disposition."}</p>
            <div className="contact-buttons">
              <Link to="/contact" className="contact-btn primary">
                {t?.preFooter?.contactButton || "Nous contacter"}
              </Link>
              <a href="tel:+212612345678" className="contact-btn secondary">
                <FaPhoneAlt />
                <span>+212 612 345 678</span>
              </a>
            </div>
          </div>
        </div>

        <div className="certifications">
          <div className="certification">
            <div className="certification-icon haccp">HACCP</div>
            <span>HACCP</span>
          </div>
          <div className="certification">
            <div className="certification-icon iso">ISO</div>
            <span>22000</span>
          </div>
          <div className="certification">
            <div className="certification-icon">FDA</div>
            <span>Approved</span>
          </div>
          <div className="certification">
            <div className="certification-icon">EU</div>
            <span>Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;