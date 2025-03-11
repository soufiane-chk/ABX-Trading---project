import React, { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import "../styles/Products.css";

// Import des images
import sardineImg from "../assets/sardine.jpg";
import maquereauImg from "../assets/maquereau.jpg";
import sabreImg from "../assets/sabre1.jpg";
import poulpeImg from "../assets/poulpe.jpg";
import calamarImg from "../assets/calamar1.jpg";
import seicheImg from "../assets/seiche1.jpg";
import almendritaImg from "../assets/almendrita2.jpg";
import puntillaImg from "../assets/puntilla1.jpeg";

const produits = [
  { id: 1, nom: "Poulpe", image: poulpeImg, prix: "100 DH/kg", category: "Céphalopodes" },
  { id: 2, nom: "Calamar", image: calamarImg, prix: "120 DH/kg", category: "Céphalopodes" },
  { id: 3, nom: "Seiche", image: seicheImg, prix: "110 DH/kg", category: "Céphalopodes" },
  { id: 4, nom: "Mongo", image: "", prix: "130 DH/kg", category: "Céphalopodes" },
  { id: 5, nom: "Almendrita", image: almendritaImg, prix: "140 DH/kg", category: "Poissons" },
  { id: 6, nom: "Puntilla", image: puntillaImg, prix: "150 DH/kg", category: "Céphalopodes" },
  { id: 7, nom: "Sardine", image: sardineImg, prix: "50 DH/kg", category: "Poissons Pélagiques" },
  { id: 8, nom: "Maquereau", image: maquereauImg, prix: "70 DH/kg", category: "Poissons Pélagiques" },
  { id: 9, nom: "Sabre", image: sabreImg, prix: "80 DH/kg", category: "Poissons" },
];


const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Tous', 'Poissons Pélagiques', 'Poissons Nobles', 'Poissons Plats', 'Poissons Blancs', 'Céphalopodes'];

  const filteredProducts = produits.filter(produit => {
    const matchesCategory = selectedCategory === 'Tous' || produit.category === selectedCategory;
    const matchesSearch = produit.nom.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page">
      <Header />
      
      <div className="products-hero">
        <h1>Nos Produits</h1>
        <p>Découvrez notre sélection de produits de la mer de première qualité</p>
      </div>

      <div className="products-container">
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="categories-filter">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((produit) => (
            <div key={produit.id} className="product-card">
              <div className="product-image-container">
                <img src={produit.image} alt={produit.nom} />
                <div className="product-overlay">
                  <button className="detail-btn">Voir détails</button>
                </div>
              </div>
              <div className="product-info">
                <h3>{produit.nom}</h3>
                <p className="category">{produit.category}</p>
                <p className="price">{produit.prix}</p>
                <button className="add-to-cart">Commander</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Products;