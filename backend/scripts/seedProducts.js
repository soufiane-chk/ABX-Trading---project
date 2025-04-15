const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

const products = [
  { 
    name: 'Sardine', 
    description: 'Sardine fraîche pêchée sur les côtes marocaines. Riche en oméga-3 et en protéines.',
    category: 'Poissons Pélagiques', 
    price: 2.50,
    image: 'sardine.jpg',
    stock: 100
  },
  { 
    name: 'Poulpe', 
    description: 'Poulpe frais de haute qualité, capturé dans les eaux profondes.',
    category: 'Mollusques Céphalopodes', 
    price: 6.99,
    image: 'poulpe.jpg',
    stock: 50
  },
  { 
    name: 'Calamar', 
    description: 'Calamar frais aux tentacules tendres et au corps charnu.',
    category: 'Mollusques Céphalopodes', 
    price: 5.99,
    image: 'calamar.jpg',
    stock: 75
  },
  { 
    name: 'Seiche', 
    description: 'Seiche fraîche à la chair ferme et savoureuse.',
    category: 'Mollusques Céphalopodes', 
    price: 5.50,
    image: 'seiche.jpg',
    stock: 60
  },
  { 
    name: 'Maquereau', 
    description: 'Maquereau frais au goût prononcé et à la chair grasse.',
    category: 'Poissons Pélagiques', 
    price: 3.50,
    image: 'maquereau.jpg',
    stock: 90
  },
  { 
    name: 'Sabre', 
    description: 'Poisson sabre à la chair blanche et ferme.',
    category: 'Poissons Pélagiques', 
    price: 4.25,
    image: 'sabre.jpg',
    stock: 45
  },
  { 
    name: 'Mulet', 
    description: 'Mulet frais à la chair fine et délicate.',
    category: 'Poissons Pélagiques', 
    price: 3.75,
    image: 'mulet.jpg',
    stock: 80
  },
  { 
    name: 'Almendrita', 
    description: 'Almendrita fraîche, un petit poisson savoureux.',
    category: 'Poissons Pélagiques', 
    price: 2.99,
    image: 'almendrita.jpg',
    stock: 110
  }
];

const seedDB = async () => {
  try {
    await Product.deleteMany({}); // Supprimer tous les produits existants
    await Product.insertMany(products);
    console.log('Base de données alimentée avec succès!');
  } catch (error) {
    console.error('Erreur lors de l\'alimentation de la base de données:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();