import React, { useState } from "react";
import { FaWhatsapp, FaTimes, FaPaperPlane } from "react-icons/fa";
import "../styles/Home.css"; // Assure-toi que ce fichier contient les styles

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              href="https://wa.me/212600000000" 
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
