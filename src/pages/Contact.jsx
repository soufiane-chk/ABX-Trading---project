import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import "../styles/Contact.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { translations } from "../translations/translations";
import { useLanguage } from '../context/LanguageContext';
import PreFooter from '../components/PreFooter';

const Contact = () => {
  // Récupérer la langue depuis le hook
  const { language = "FR" } = useLanguage() || {}; // Protection contre undefined
  
  // Initialiser l'état des traductions avec une valeur par défaut sûre
  const [t, setT] = useState(() => {
    const langKey = language?.toUpperCase() || "FR";
    return translations[langKey]?.contact || translations["FR"].contact;
  });

  // Mettre à jour les traductions quand la langue change
  useEffect(() => {
    const langKey = language?.toUpperCase() || "FR";
    setT(translations[langKey]?.contact || translations["FR"].contact);
  }, [language]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Créer un iframe caché pour la soumission
    const iframeName = 'hidden-contact-iframe';
    let iframe = document.getElementById(iframeName);
    
    // Créer l'iframe s'il n'existe pas déjà
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('id', iframeName);
      iframe.setAttribute('name', iframeName);
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
  
    // Créer un élément de formulaire
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://formsubmit.co/chakirsoufiane458@gmail.com`; // Remplacez par l'email de la société
    form.target = iframeName; // Cibler l'iframe au lieu de la page entière
    form.style.display = 'none';
  
    // Ajouter les champs du formulaire
    const fields = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      '_subject': `Message de contact: ${formData.subject}`,
      '_captcha': 'false',
      '_template': 'table',
      // Ne pas rediriger car nous utilisons un iframe
      '_next': 'https://formsubmit.co/ajax/chakirsoufiane458@gmail.com'
    };
  
    // Ajouter chaque champ au formulaire
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = name === 'message' ? 'textarea' : 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
  
    // Ajouter le formulaire au document et le soumettre
    document.body.appendChild(form);
    form.submit();
    
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Afficher un message de succès (option facultative)
    const messageElement = document.createElement('div');
    messageElement.className = 'success-message';
    messageElement.innerText = t.messageSent || 'Message envoyé avec succès!';
    
    const formElement = document.querySelector('.contact-form');
    formElement.appendChild(messageElement);
    
    // Retirer le message après 3 secondes
    setTimeout(() => {
      if (formElement.contains(messageElement)) {
        formElement.removeChild(messageElement);
      }
    }, 3000);
    
    // Nettoyer - supprimer le formulaire du DOM
    setTimeout(() => {
      document.body.removeChild(form);
    }, 500);
  };

  return (
    <div className="contact-page">
      <Header />
      
      <div className="contact-hero">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <div className="info-card">
            <div className="info-icon">
              <FaPhone />
            </div>
            <h3>{t.phone}</h3>
            <p>+212 524651641</p>
            <p>+212 671420274</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FaEnvelope />
            </div>
            <h3>{t.email}</h3>
            <p>rikali.yassine@gmail.com</p>
            <p>ste.abxtrading@gmail.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>{t.address}</h3>
            <p>LOT 28 31 ROUTE JERF LIHOUDI ZONE INDUSTRIEL</p>
            <p>Safi, Maroc</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FaClock />
            </div>
            <h3>{t.hours}</h3>
            <p>{t.openingHours.weekdays}</p>
            <p>{t.openingHours.saturday}</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>{t.sendMessage}</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t.name}</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t.phonePlaceholder}</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t.emailPlaceholder}</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">{t.subject}</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t.message}</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="submit-button">{t.send}</button>
          </form>
        </div>

        <div className="map-section">
          <h2>{t.location}</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108170.53917339125!2d-9.33397763027105!3d32.31921229054736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdac212049843597%3A0x6b618c47dfd85d40!2sSafi%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1709916852599!5m2!1sfr!2sma"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="map-address">
            <p><strong>{t.mapAddress}</strong></p>
          </div>
        </div>
      </div>

      <PreFooter />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
