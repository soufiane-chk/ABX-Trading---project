const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Log pour débogage
    console.log('Données reçues:', { name, email, phone, subject, message });
    
    // Vérification des champs obligatoires
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez remplir tous les champs obligatoires'
      });
    }

    // Création du transporteur SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'chakirsoufiane458@gmail.com', // Votre adresse Gmail
        pass: 'votre_mot_de_passe_application' // Mot de passe d'application Gmail
      }
    });

    // Options de l'email
    const mailOptions = {
      from: email,
      to: 'chakirsoufiane458@gmail.com', // Destinataire (votre Gmail)
      subject: subject || 'Nouveau message de contact ABX Trading',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #0070c9; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone || 'Non spécifié'}</p>
          <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p style="color: #555;"><strong>Message:</strong></p>
            <p style="white-space: pre-line;">${message}</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
            Ce message a été envoyé depuis le formulaire de contact du site ABX Trading.
          </p>
        </div>
      `
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');

    res.status(200).json({
      success: true,
      message: 'Votre message a été envoyé avec succès! Nous vous répondrons dans les plus brefs délais.'
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.'
    });
  }
});

module.exports = router;