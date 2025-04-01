import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import PreFooter from '../components/PreFooter';
import "../styles/Contact.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { translations } from "../translations/translations";
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';

const Contact = () => {
  /* États */
  const location = useLocation();
  const { language = "FR" } = useLanguage() || {};
  const [t, setT] = useState(() => {
    const langKey = language?.toUpperCase() || "FR";
    return translations[langKey]?.contact || translations["FR"].contact;
  });
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', subject: '', message: ''
  });
  const [errors, setErrors] = useState({
    name: '', phone: '', email: '', subject: '', message: ''
  });

  /* Effets */
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);
  
  useEffect(() => {
    const langKey = language?.toUpperCase() || "FR";
    setT(translations[langKey]?.contact || translations["FR"].contact);
  }, [language]);

  /* Validation */
  const validateForm = () => {
    let tempErrors = { name: '', phone: '', email: '', subject: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Le nom est requis";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Le numéro de téléphone est requis";
      isValid = false;
    } else if (!/^[0-9+\s]{8,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = "Format de téléphone invalide";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      tempErrors.email = "Format d'email invalide";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Le sujet est requis";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Le message est requis";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  /* Gestionnaires d'événements */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    
    let fieldError = '';
    if (value.trim() === '') {
      fieldError = `${t[name + 'Placeholder'] || name} est requis`;
    } else if (name === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      fieldError = "Format d'email invalide";
    } else if (name === 'phone' && !/^[0-9+\s]{8,15}$/.test(value)) {
      fieldError = "Format de téléphone invalide";
    }
    
    setErrors({...errors, [name]: fieldError});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const iframeName = 'hidden-contact-iframe';
    let iframe = document.getElementById(iframeName);
    
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('id', iframeName);
      iframe.setAttribute('name', iframeName);
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
  
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://formsubmit.co/chakirsoufiane458@gmail.com`;
    form.target = iframeName;
    form.style.display = 'none';
  
    const fields = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      '_subject': `Message de contact: ${formData.subject}`,
      '_captcha': 'false',
      '_template': 'table',
      '_next': 'https://formsubmit.co/ajax/chakirsoufiane458@gmail.com'
    };
  
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = name === 'message' ? 'textarea' : 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
  
    document.body.appendChild(form);
    form.submit();
    
    setFormData({name: '', phone: '', email: '', subject: '', message: ''});
    
    const messageElement = document.createElement('div');
    messageElement.className = 'success-message';
    messageElement.innerText = t.messageSent || 'Message envoyé avec succès!';
    
    const formElement = document.querySelector('.contact-form');
    formElement.appendChild(messageElement);
    
    setTimeout(() => {
      if (formElement.contains(messageElement)) {
        formElement.removeChild(messageElement);
      }
    }, 3000);
    
    setTimeout(() => {
      document.body.removeChild(form);
    }, 500);
  };

  /* Rendu */
  return (
    <div className="contact-page">
      <Header />
      
      {/* En-tête */}
      <div className="contact-hero">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="contact-container">
        {/* Informations de contact */}
        <div className="contact-info-section">
          <div className="info-card">
            <div className="info-icon"><FaPhone /></div>
            <h3>{t.phone}</h3>
            <p>+212 524651641</p>
            <p>+212 671420274</p>
          </div>

          <div className="info-card">
            <div className="info-icon"><FaEnvelope /></div>
            <h3>{t.email}</h3>
            <p>rikali.yassine@gmail.com</p>
            <p>ste.abxtrading@gmail.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon"><FaMapMarkerAlt /></div>
            <h3>{t.address}</h3>
            <p>LOT 28 31 ROUTE JERF LIHOUDI ZONE INDUSTRIEL</p>
            <p>Safi, Maroc</p>
          </div>

          <div className="info-card">
            <div className="info-icon"><FaClock /></div>
            <h3>{t.hours}</h3>
            <p>{t.openingHours.weekdays}</p>
            <p>{t.openingHours.saturday}</p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="contact-form-section">
          <h2 id="contact-form-title">{t.sendMessage}</h2>
          <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
            <div className={`form-group ${errors.name ? 'has-error' : formData.name ? 'has-success' : ''}`}>
              <label htmlFor="name">{t.name}</label>
              <input 
                type="text" id="name" name="name" 
                value={formData.name} onChange={handleChange}
                className={errors.name ? 'invalid' : formData.name ? 'valid' : ''} 
                required 
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            
            <div className={`form-group ${errors.phone ? 'has-error' : formData.phone ? 'has-success' : ''}`}>
              <label htmlFor="phone">{t.phonePlaceholder}</label>
              <input 
                type="tel" id="phone" name="phone" 
                value={formData.phone} onChange={handleChange}
                className={errors.phone ? 'invalid' : formData.phone ? 'valid' : ''} 
                required 
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
            
            <div className={`form-group ${errors.email ? 'has-error' : formData.email ? 'has-success' : ''}`}>
              <label htmlFor="email">{t.emailPlaceholder}</label>
              <input 
                type="email" id="email" name="email" 
                value={formData.email} onChange={handleChange}
                className={errors.email ? 'invalid' : formData.email ? 'valid' : ''} 
                required 
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className={`form-group ${errors.subject ? 'has-error' : formData.subject ? 'has-success' : ''}`}>
              <label htmlFor="subject">{t.subject}</label>
              <input 
                type="text" id="subject" name="subject" 
                value={formData.subject} onChange={handleChange}
                className={errors.subject ? 'invalid' : formData.subject ? 'valid' : ''} 
                required 
              />
              {errors.subject && <div className="error-message">{errors.subject}</div>}
            </div>
            
            <div className={`form-group ${errors.message ? 'has-error' : formData.message ? 'has-success' : ''}`}>
              <label htmlFor="message">{t.message}</label>
              <textarea 
                id="message" name="message" 
                value={formData.message} onChange={handleChange}
                className={errors.message ? 'invalid' : formData.message ? 'valid' : ''}
              ></textarea>
              {errors.message && <div className="error-message">{errors.message}</div>}
            </div>
            
            <button type="submit" className="submit-button">{t.send}</button>
          </form>
        </div>

        {/* Carte */}
        <div className="map-section">
          <h2>{t.location}</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108170.53917339125!2d-9.33397763027105!3d32.31921229054736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdac212049843597%3A0x6b618c47dfd85d40!2sSafi%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1709916852599!5m2!1sfr!2sma"
              width="100%" height="400" style={{ border: 0 }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
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
