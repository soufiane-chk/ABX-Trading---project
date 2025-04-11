const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const passport = require('passport');
require('../config/passport');
const crypto = require('crypto');

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Log pour déboguer
    console.log('Inscription - Données reçues:', { name, email });

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Inscription - Email déjà utilisé:', email);
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer un nouvel utilisateur
    const user = new User({ name, email, password });
    await user.save();
    console.log('Inscription - Utilisateur créé:', user._id);

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Répondre avec les données d'utilisateur
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      },
      message: 'Inscription réussie'
    });
  } catch (err) {
    console.error('Inscription - Erreur:', err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Déconnexion
router.get('/logout', (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: 'Déconnexion réussie' });
});

// Route protégée nécessitant une authentification
router.get('/profile', protect, (req, res) => {
  res.json({ user: req.user });
});

// Route nécessitant un rôle spécifique (admin)
router.post('/admin', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Action administrateur autorisée' });
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retourner un script pour fermer la popup et transmettre le token
    res.send(`
      <script>
        window.opener.postMessage({ token: '${token}', user: ${JSON.stringify(req.user)} }, '*');
        window.close();
      </script>
    `);
  }
);

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook OAuth Callback
router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retourner un script pour fermer la popup et transmettre le token
    res.send(`
      <script>
        window.opener.postMessage({ token: '${token}', user: ${JSON.stringify(req.user)} }, '*');
        window.close();
      </script>
    `);
  }
);

// Route pour demander une réinitialisation de mot de passe
router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cet email' });
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // En production, envoyez un email avec le lien de réinitialisation
    res.status(200).json({ success: true, resetToken }); // À supprimer en production
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Route pour réinitialiser le mot de passe
router.put('/reset-password/:resetToken', async (req, res) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token invalide ou expiré' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Mot de passe réinitialisé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Route pour envoyer un email de vérification
router.post('/send-verification', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.verified) {
      return res.status(400).json({ message: 'Compte déjà vérifié' });
    }

    const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, verificationToken }); // À remplacer par un email en production
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Route pour vérifier l'email
router.get('/verify-email/:token', async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.id, { verified: true });
    res.status(200).json({ success: true, message: 'Email vérifié avec succès' });
  } catch (err) {
    res.status(400).json({ message: 'Lien de vérification invalide ou expiré' });
  }
});

module.exports = router;