const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// Créer une nouvelle commande (utilisateur authentifié)
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, totalPrice, paymentMethod } = req.body;

    // Validation des données
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Pas d\'articles dans la commande' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Adresse de livraison manquante' });
    }

    // Création de la commande
    const order = new Order({
      user: req.user.id, // ID utilisateur récupéré du middleware protect
      items,
      shippingAddress,
      totalPrice,
      paymentMethod: paymentMethod || 'Card'
    });

    const createdOrder = await order.save();
    console.log('Commande créée:', createdOrder);
    res.status(201).json(createdOrder);
  } catch (err) {
    console.error('Erreur lors de la création de la commande:', err);
    res.status(500).json({ message: err.message });
  }
});

// Récupérer les commandes de l'utilisateur connecté
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Erreur lors de la récupération des commandes:', err);
    res.status(500).json({ message: err.message });
  }
});

// Obtenir une commande par ID
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    // Vérifier si l'utilisateur est autorisé à voir cette commande
    if (!order || order.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mettre à jour le statut de paiement d'une commande
router.put('/:id/pay', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    
    // Vérifier si l'utilisateur est autorisé à mettre à jour cette commande
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    };
    
    const updatedOrder = await order.save();
    console.log('Commande payée:', updatedOrder);
    res.json(updatedOrder);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du paiement:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;