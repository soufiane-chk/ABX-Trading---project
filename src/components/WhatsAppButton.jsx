import React, { useState } from "react";
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa";
import "../styles/Home.css"; // Assure-toi que ce fichier contient les styles

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Numéro de téléphone sans caractères spéciaux (format international)
  const phoneNumber = '212600000000'; // Remplacez par votre numéro réel
  
  // Message pré-rempli (optionnel)
  const message = encodeURIComponent('Bonjour, je vous contacte depuis votre site web.');
  
  // URL de redirection WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="whatsapp-container">
      {/* Bouton flottant WhatsApp */}
      <div className="whatsapp-button" onClick={() => setIsOpen(!isOpen)}>
        <FaWhatsapp size={30} />
      </div>

      {/* Boîte de chat WhatsApp */}
      {isOpen && (
        <div className="whatsapp-chatbox">
          <div className="chatbox-header">
            WhatsApp
            <FaTimes className="close-icon" onClick={() => setIsOpen(false)} />
          </div>
          <div className="chatbox-body">
            <p>Bienvenue chez ABX Fish, comment pouvons-nous vous aider ?</p>
          </div>
          <div className="chatbox-footer">
            <a
              href={whatsappUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="open-whatsapp"
            >
              Ouvrir WhatsApp <FaPaperPlane />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppButton;
