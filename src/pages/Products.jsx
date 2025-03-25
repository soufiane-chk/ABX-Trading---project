import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { useLanguage } from '../context/LanguageContext';
import "../styles/Products.css";
import PreFooter from '../components/PreFooter';

// Import des images
import sardineImg from "../assets/sardine.jpg";
import maquereauImg from "../assets/maquereau.jpg";
import sabreImg from "../assets/sabre1.jpg";
import poulpeImg from "../assets/poulpe.jpg";
import calamarImg from "../assets/calamar1.jpg";
import seicheImg from "../assets/seiche1.jpg";
import almendritaImg from "../assets/almendrita2.jpg";
import puntillaImg from "../assets/puntilla1.jpeg";

const images = {
  poulpe: poulpeImg,
  calamar: calamarImg,
  seiche: seicheImg,
  mongo: "https://seafood.vasep.com.vn/DATA/ARTICLES/13253/article_13253.jpg", // Image placeholder temporaire
  almendrita: almendritaImg,
  puntilla: puntillaImg,
  sardine: sardineImg,
  maquereau: maquereauImg,
  sabre: sabreImg,
};

const getProductDescription = (imageKey) => {
  switch (imageKey) {
    case 'poulpe':
      return "Le poulpe marocain est reconnu mondialement pour sa qualité exceptionnelle. Sa chair tendre et son goût délicat en font un produit très recherché dans la gastronomie méditerranéenne et internationale. Pêché selon des méthodes traditionnelles respectueuses de l'environnement, notre poulpe est minutieusement sélectionné pour garantir une qualité optimale.";
    case 'calamar':
      return "Notre calamar est pêché dans les eaux froides et propres de l'Atlantique marocain. Sa chair ferme et sa saveur subtile en font un ingrédient de choix pour de nombreuses préparations culinaires. Riche en protéines et pauvre en graisses, il constitue un produit de la mer exceptionnel, prisé des chefs et des amateurs de fruits de mer.";
    case 'seiche':
      return "La seiche que nous proposons est réputée pour sa fraîcheur exceptionnelle et sa texture parfaite. Ce céphalopode délicat offre une chair blanche et tendre, idéale pour une multitude de recettes. Sélectionnée avec soin, notre seiche est traitée selon les normes les plus strictes pour préserver toutes ses qualités gustatives.";
    case 'sardine':
      return "La sardine marocaine est un trésor nutritionnel de l'Atlantique. Reconnue pour sa richesse en Oméga-3 et en vitamines, elle est pêchée selon des méthodes respectueuses de l'environnement. Sa chair savoureuse et sa fraîcheur exceptionnelle en font un produit très apprécié dans le monde entier pour ses qualités gustatives et ses bienfaits pour la santé.";
    case 'maquereau':
      return "Notre maquereau est pêché dans les eaux riches de l'Atlantique marocain. Ce poisson bleu, à la chair ferme et savoureuse, est particulièrement apprécié pour sa richesse en acides gras Oméga-3. Son goût caractéristique en fait un produit de choix pour diverses préparations culinaires, du simple grillé aux marinades sophistiquées.";
    case 'sabre':
      return "Le sabre est un poisson à la chair blanche et délicate qui se distingue par sa forme allongée caractéristique. Pêché dans les profondeurs de l'océan Atlantique, il offre une texture fine et un goût subtil qui séduisent les connaisseurs. Sa polyvalence en cuisine en fait un produit très recherché par les chefs du monde entier.";
    case 'almendrita':
      return "L'Almendrita est un petit poisson pélagique typique des côtes marocaines. Apprécié pour sa chair tendre et sa saveur délicate, il constitue un ingrédient essentiel de nombreuses recettes méditerranéennes. Riche en nutriments essentiels, ce poisson offre un excellent rapport qualité-prix et une grande versatilité en cuisine.";
    case 'puntilla':
      return "La Puntilla est un petit céphalopode très prisé pour sa tendreté et sa saveur délicate. Ce produit gourmet, soigneusement sélectionné dans les eaux marocaines, offre une expérience gustative unique. Sa chair fine et son goût subtil en font un ingrédient de choix pour les préparations raffinées de la cuisine méditerranéenne.";
    default:
      return "Ce produit de la mer est sélectionné avec le plus grand soin pour garantir une qualité optimale. Issu des eaux riches de l'Atlantique marocain, il est traité selon des méthodes respectueuses de l'environnement et des normes de qualité les plus strictes. Sa fraîcheur et ses qualités gustatives en font un produit d'exception.";
  }
};

const Products = () => {
  const { t, language } = useLanguage(); // Ajoutez language
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    quantity: '',
    name: '',
    email: '',
    phone: '',
  });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);

  const categories = t.products.categories;

  useEffect(() => {
    setSelectedCategory(t.products.categories[0]);
  }, [t.products.categories]);

  const filteredProducts = t.products.items.filter(produit => {
    const isAllCategory = categories.indexOf(selectedCategory) === 0;

    // Logique améliorée pour les produits pélagiques avec normalisation des catégories
    const normalizeCategory = (category) => {
      return category ? category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
    };

    const matchesCategory = 
      isAllCategory || 
      (language === 'PT' && 
        (normalizeCategory(selectedCategory) === normalizeCategory('Peixes Pelágicos') && 
          normalizeCategory(produit.category) === normalizeCategory('Poissons Pélagiques'))) ||
      (language === 'ES' && 
        (normalizeCategory(selectedCategory) === normalizeCategory('Pescados Pelágicos') && 
          normalizeCategory(produit.category) === normalizeCategory('Poissons Pélagiques'))) ||
      normalizeCategory(produit.category) === normalizeCategory(selectedCategory);
    
    const matchesSearch = produit.nom ? produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    return matchesCategory && matchesSearch;
  });

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setShowOrderForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Créer un iframe caché pour la soumission
    const iframeName = 'hidden-form-iframe';
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
    form.action = `https://formsubmit.co/chakirsoufiane458@gmail.com`;
    form.target = iframeName; // Cibler l'iframe au lieu de la page entière
    form.style.display = 'none';
  
    // Ajouter les champs du formulaire
    const fields = {
      product: selectedProduct.nom,
      quantity: `${orderDetails.quantity} kg`,
      name: orderDetails.name,
      email: orderDetails.email,
      phone: orderDetails.phone,
      '_subject': `Nouvelle commande pour ${selectedProduct.nom}`,
      '_captcha': 'false',
      '_template': 'table',
      // Ne pas rediriger car nous utilisons un iframe
      '_next': 'https://formsubmit.co/ajax/chakirsoufiane458@gmail.com'
    };
  
    // Ajouter chaque champ au formulaire
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
  
    // Ajouter le formulaire au document et le soumettre
    document.body.appendChild(form);
    form.submit();
    
    // Fermer le formulaire (sans alerte)
    setShowOrderForm(false);
    
    // Nettoyer - supprimer le formulaire du DOM
    setTimeout(() => {
      document.body.removeChild(form);
    }, 500);
  };

  const handleDetailClick = (product) => {
    setDetailProduct(product);
    setShowDetailModal(true);
    document.body.style.overflow = 'hidden'; // Empêche le défilement de la page
  };

  return (
    <div className="products-page">
      <Header />
      
      <div className="products-hero">
        <h1>{t.products.title}</h1>
        <p>{t.products.description}</p>
      </div>

      <div className="products-container">
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder={t.products.searchPlaceholder}
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
                <img src={images[produit.imageKey]} alt={produit.nom} />
                <div className="product-overlay">
                  <button 
                    className="detail-btn" 
                    onClick={() => handleDetailClick(produit)}
                  >
                    {t.products.detailsButton}
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3>{produit.nom}</h3>
                <p className="category">{produit.category}</p>
                <button className="order-button" onClick={() => handleOrderClick(produit)}>
                  {t.products.orderButton}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showOrderForm && (
        <div className="order-form-overlay">
          <div className="order-form-container">
            <h2>{t.orderForm.title}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{t.orderForm.quantityLabel}</label>
                <input
                  type="number"
                  name="quantity"
                  value={orderDetails.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t.orderForm.nameLabel}</label>
                <input
                  type="text"
                  name="name"
                  value={orderDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t.orderForm.emailLabel}</label>
                <input
                  type="email"
                  name="email"
                  value={orderDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t.orderForm.phoneLabel}</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">{t.orderForm.submitButton}</button>
              <button type="button" className="cancel-btn" onClick={() => setShowOrderForm(false)}>
                {t.orderForm.cancelButton}
              </button>
            </form>
          </div>
        </div>
      )}

      {showDetailModal && detailProduct && (
        <div className="product-detail-modal-overlay" onClick={() => {
          setShowDetailModal(false);
          document.body.style.overflow = 'auto';
        }}>
          <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-modal" 
              onClick={() => {
                setShowDetailModal(false);
                document.body.style.overflow = 'auto';
              }}
            >
              &times;
            </button>
            
            <div className="product-detail-content">
              <div className="product-detail-left">
                <div className="product-detail-image-container">
                  <img src={images[detailProduct.imageKey]} alt={detailProduct.nom} className="product-detail-image" />
                  <div className="product-detail-overlay"></div>
                  <span className="product-category-badge">{detailProduct.category}</span>
                </div>
                
                <div className="product-characteristics">
                  <h3>Caractéristiques</h3>
                  <ul className="characteristics-list">
                    <li>
                      <span className="characteristic-icon">🏢</span>
                      <span>Société: <strong>ABXTRADING Safi, Maroc</strong></span>
                    </li>
                    <li>
                      <span className="characteristic-icon">📍</span>
                      <span>Zone de pêche: <strong>Côtes de Safi - Atlantique Marocain</strong></span>
                    </li>
                    <li>
                      <span className="characteristic-icon">🚢</span>
                      <span>Port d'expédition: <strong>Safi</strong></span>
                    </li>
                    <li>
                      <span className="characteristic-icon">🏆</span>
                      <span>Qualité: <strong>Premium Export</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="product-detail-right">
                <h2 className="product-detail-title">{detailProduct.nom}</h2>
                
                <div className="product-detail-description">
                  <p>{getProductDescription(detailProduct.imageKey)}</p>
                </div>
                
                
                <div className="product-quality-badge">
                  <div className="quality-icon">✓</div>
                  <div className="quality-text">
                    <strong>Qualité garantie</strong>
                    <p>Produit sélectionné avec soin selon nos standards d'excellence</p>
                  </div>
                </div>
                
                <div className="product-certifications">
                  <h3>Certifications et Conformité</h3>
                  <div className="certifications-container">
                    {/* HACCP Icon */}
                    <div className="certification-item">
                      <div className="certification-icon">
                        <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="25" cy="25" r="23" fill="#00669b" />
                          <path d="M12 24h6v-10h4v10h6v4h-6v10h-4v-10h-6z" fill="white" />
                          <path d="M38 24h-6v-10h-4v10h-6v4h6v10h4v-10h6z" fill="white" />
                          <circle cx="25" cy="25" r="21" fill="none" stroke="white" strokeWidth="1.5" />
                          <text x="25" y="44" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">HACCP</text>
                        </svg>
                      </div>
                      <div className="certification-text">
                        <h4>HACCP</h4>
                        <p>Système de contrôle pour la sécurité alimentaire</p>
                      </div>
                    </div>

                    {/* ISO 22000 Icon */}
                    <div className="certification-item">
                      <div className="certification-icon">
                        <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="25" cy="25" r="23" fill="#00669b" />
                          <circle cx="25" cy="25" r="21" fill="none" stroke="white" strokeWidth="1" />
                          <text x="25" y="22" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ISO</text>
                          <text x="25" y="32" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">22000</text>
                          <path d="M15 38 L35 38" stroke="white" strokeWidth="1" />
                          <path d="M15 12 L35 12" stroke="white" strokeWidth="1" />
                        </svg>
                      </div>
                      <div className="certification-text">
                        <h4>ISO 22000</h4>
                        <p>Norme internationale pour la sécurité alimentaire</p>
                      </div>
                    </div>

                    {/* Certification Sanitaire Icon */}
                    <div className="certification-item">
                      <div className="certification-icon">
                        <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="25" cy="25" r="23" fill="#00669b" />
                          <path d="M25 10 L37 16 V30 L25 40 L13 30 V16 L25 10z" fill="none" stroke="white" strokeWidth="2" />
                          <path d="M20 25 L23 28 L30 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <text x="25" y="44" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">SANITAIRE</text>
                        </svg>
                      </div>
                      <div className="certification-text">
                        <h4>Certification Sanitaire</h4>
                        <p>Conforme aux exigences sanitaires internationales</p>
                      </div>
                    </div>

                    {/* Traçabilité Icon */}
                    <div className="certification-item">
                      <div className="certification-icon">
                        <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="25" cy="25" r="23" fill="#00669b" />
                          <path d="M15 15 L35 15 L35 35 L15 35 Z" fill="none" stroke="white" strokeWidth="1.5" />
                          <path d="M15 20 L35 20" stroke="white" strokeWidth="1" />
                          <path d="M15 25 L35 25" stroke="white" strokeWidth="1" />
                          <path d="M15 30 L35 30" stroke="white" strokeWidth="1" />
                          <path d="M20 15 L20 35" stroke="white" strokeWidth="1" />
                          <path d="M25 15 L25 35" stroke="white" strokeWidth="1" />
                          <path d="M30 15 L30 35" stroke="white" strokeWidth="1" />
                          <path d="M13 13 L16 10 L39 10 L39 37 L36 40" stroke="white" strokeWidth="1.5" fill="none" />
                          <text x="25" y="44" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">TRAÇABILITÉ</text>
                        </svg>
                      </div>
                      <div className="certification-text">
                        <h4>Traçabilité</h4>
                        <p>Suivi complet de la pêche à l'exportation</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="product-detail-actions">
                  <button className="detail-order-button" onClick={() => {
                    setShowDetailModal(false);
                    document.body.style.overflow = 'auto';
                    handleOrderClick(detailProduct);
                  }}>
                    {t.products.orderButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <PreFooter />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Products;