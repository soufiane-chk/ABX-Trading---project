import React, { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import PreFooter from '../components/PreFooter';
import "../styles/Contact.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));

    // Utilisez fetch ou axios pour envoyer le formulaire sans redirection
    fetch('https://formsubmit.co/ajax/chakirsoufiane458@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Non spécifié',
        subject: `ABX TRADING - ${formData.subject || 'Nouveau message de contact'}`,
        message: formData.message,
        _captcha: false,
        _template: 'table',
        _subject: `ABX TRADING - ${formData.subject || 'Nouveau message de contact'}`
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Afficher le message de succès
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: 'Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.' }
      });
      
      // Ajouter un petit délai pour que le message de succès soit rendu avant de défiler
      setTimeout(() => {
        // Sélectionner le message de succès et défiler vers lui
        const successMessage = document.querySelector('.status-message.success');
        if (successMessage) {
          successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center'
          });
        }
      }, 100);

      // Effacer le message de succès après 5 secondes
      setTimeout(() => {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: false, msg: null }
        });
      }, 5000);
    })
    .catch(error => {
      console.error('Error:', error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer." }
      });
    });
  };

  return (
    <div className="contact-page">
      <Header />

      <div className="contact-hero">
        <h1>{t.contact?.title || 'Contactez-nous'}</h1>
        <p>{t.contact?.subtitle || 'Nous sommes à votre écoute pour toute question ou demande.'}</p>
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <div className="info-card">
            <div className="info-icon"><FaPhone /></div>
            <h3>{t.contact?.phone || 'Téléphone'}</h3>
            <p>+212 524651641</p>
            <p>+212 671420274</p>
          </div>

          <div className="info-card">
            <div className="info-icon"><FaEnvelope /></div>
            <h3>{t.contact?.email || 'Email'}</h3>
            <p>rikali.yassine@gmail.com</p>
            <p>ste.abxtrading@gmail.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon"><FaMapMarkerAlt /></div>
            <h3>{t.contact?.address || 'Adresse'}</h3>
            <p>LOT 28 31 ROUTE JERF LIHOUDI ZONE INDUSTRIEL</p>
            <p>Safi, Maroc</p>
          </div>

          <div className="info-card">
            <div className="info-icon"><FaClock /></div>
            <h3>{t.contact?.hours || 'Horaires'}</h3>
            <p>{t.contact?.openingHours?.weekdays || 'Lundi - Vendredi: 9h - 18h'}</p>
            <p>{t.contact?.openingHours?.saturday || 'Samedi: 9h - 13h'}</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>{t.contact?.form?.title || 'Envoyez-nous un message'}</h2>

          {status.info.msg && (
            <div className={`status-message ${status.info.error ? 'error' : 'success'}`}>
              <span>{status.info.msg}</span>
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t.contact?.form?.name || 'Nom'}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t.contact?.form?.email || 'Email'}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre adresse email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">{t.contact?.form?.phone || 'Téléphone'} (optionnel)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Votre numéro de téléphone"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">{t.contact?.form?.subject || 'Sujet'}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Sujet de votre message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t.contact?.form?.message || 'Message'}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message..."
                rows="6"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={status.submitting}
            >
              {status.submitting
                ? (t.contact?.form?.sending || 'Envoi en cours...')
                : (t.contact?.form?.submit || 'Envoyer le message')}
            </button>
          </form>
        </div>

        <div className="map-section">
          <h2>{t.contact?.location || 'Localisation'}</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108170.53917339125!2d-9.33397763027105!3d32.31921229054736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdac212049843597%3A0x6b618c47dfd85d40!2sSafi%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1709916852599!5m2!1sfr!2sma"
              width="100%" height="400" style={{ border: 0 }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="map-address">
            <p><strong>{t.contact?.mapAddress || 'Adresse sur la carte'}</strong></p>
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
