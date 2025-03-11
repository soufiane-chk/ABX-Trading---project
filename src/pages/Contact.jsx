import React, { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import "../styles/Contact.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
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
    console.log('Form submitted:', formData);
    // Ajoutez ici votre logique d'envoi de formulaire
  };

  return (
    <div className="contact-page">
      <Header />
      
      <div className="contact-hero">
        <h1>Contactez-Nous</h1>
        <p>Notre équipe est là pour répondre à toutes vos questions</p>
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <div className="info-card">
            <div className="info-icon">
              <FaPhone />
            </div>
            <h3>Téléphone</h3>
            <p>+212 524651641 </p>
            <p>+212 671420274 </p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FaEnvelope />
            </div>
            <h3>Email</h3>
            <p> rikali.yassine@gmail.com </p>
            <p> ste.abxtrading@gmail.com </p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Adresse</h3>
            <p>LOT 28 31 ROUTE JERF LIHOUDI ZONE INDUSTRIEL</p>
            <p>Safi, Maroc</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FaClock />
            </div>
            <h3>Heures d'ouverture</h3>
            <p>Lun - Ven: 9h - 18h</p>
            <p>Sam: 9h - 13h</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Envoyez-nous un message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Votre nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Votre Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Votre e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Objet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Votre message (facultatif)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Envoyer</button>
          </form>
        </div>

        <div className="map-section">
          <h2>Notre Localisation</h2>
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
            <p><strong>Adresse:</strong> LOT 28 31 ROUTE JERF LIHOUDI ZONE INDUSTRIEL - SAFI 
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;