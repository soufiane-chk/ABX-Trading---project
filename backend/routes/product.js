const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/auth');

// Route pour ajouter plusieurs produits
router.post('/add-many', async (req, res) => {
  try {
    const products = req.body; // Les produits seront envoyés dans le corps de la requête
    await Product.insertMany(products);
    res.status(201).json({ message: 'Produits ajoutés avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtenir tous les produits
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtenir un produit par ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ajouter un nouveau produit (admin seulement)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      stock: req.body.stock
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour un produit (admin seulement)
router.patch('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    if (req.body.name) product.name = req.body.name;
    if (req.body.description) product.description = req.body.description;
    if (req.body.price) product.price = req.body.price;
    if (req.body.category) product.category = req.body.category;
    if (req.body.image) product.image = req.body.image;
    if (req.body.stock !== undefined) product.stock = req.body.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un produit (admin seulement)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;