import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import PreFooter from '../components/PreFooter';
import { useLanguage } from '../context/LanguageContext';
import { translations } from "../translations/translations";
import "../styles/Products.css";
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FaCartPlus, FaTimes } from 'react-icons/fa';

/* Images des produits */
import sardineImg from "../assets/sardine.jpg";
import maquereauImg from "../assets/maquereau.jpg";
import sabreImg from "../assets/sabre1.jpg";
import poulpeImg from "../assets/poulpe.jpg";
import calamarImg from "../assets/calamar1.jpg";
import seicheImg from "../assets/seiche1.jpg";
import almendritaImg from "../assets/almendrita2.jpg";
import puntillaImg from "../assets/puntilla1.jpeg";
import muletImg from "../assets/imgmulet.jpg";
import imgcongImg from "../assets/imgcong.jpg";

// Mappage des images importées
const images = {
  poulpe: poulpeImg,
  calamar: calamarImg,
  calamar1: calamarImg,
  seiche: seicheImg,
  seiche1: seicheImg,
  mulet: muletImg,
  imgmulet: muletImg,
  almendrita: almendritaImg,
  almendrita2: almendritaImg,
  puntilla: puntillaImg,
  puntilla1: puntillaImg,
  sardine: sardineImg,
  maquereau: maquereauImg,
  sabre: sabreImg,
  sabre1: sabreImg,
  imgcong: imgcongImg
};

// Produits statiques par défaut
const DEFAULT_PRODUCTS = [
  { _id: '1', name: 'Sardine', category: 'Poissons Pélagiques', price: 2.50, image: 'sardine.jpg', imageKey: 'sardine' },
  { _id: '2', name: 'Poulpe', category: 'Mollusques Céphalopodes', price: 6.99, image: 'poulpe.jpg', imageKey: 'poulpe' },
  { _id: '3', name: 'Calamar', category: 'Mollusques Céphalopodes', price: 5.99, image: 'calamar.jpg', imageKey: 'calamar1' },
  { _id: '4', name: 'Seiche', category: 'Mollusques Céphalopodes', price: 5.50, image: 'seiche.jpg', imageKey: 'seiche1' },
  { _id: '5', name: 'Maquereau', category: 'Poissons Pélagiques', price: 3.50, image: 'maquereau.jpg', imageKey: 'maquereau' },
  { _id: '6', name: 'Sabre', category: 'Poissons Pélagiques', price: 4.25, image: 'sabre.jpg', imageKey: 'sabre1' },
  { _id: '7', name: 'Mulet', category: 'Poissons Pélagiques', price: 3.75, image: 'mulet.jpg', imageKey: 'imgmulet' },
  { _id: '8', name: 'Almendrita', category: 'Poissons Pélagiques', price: 2.99, image: 'almendrita.jpg', imageKey: 'almendrita2' }
];

const Products = () => {
  const { t, language } = useLanguage();
  const { convertToMAD, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(null);
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
  const [products, setProducts] = useState(DEFAULT_PRODUCTS); // Initialiser avec les produits par défaut
  const [isLoading, setIsLoading] = useState(false);

  const categories = t.products.categories;

  const getProductDescription = (imageKey) => {
    return t.products.descriptions[imageKey] || t.products.descriptions.default;
  };

  useEffect(() => {
    setSelectedCategory(t.products.categories[0]);
  }, [t.products.categories]);

  // Effet pour charger les produits depuis l'API après l'affichage initial
  useEffect(() => {
    const fetchProductsFromAPI = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        
        if (response.data && response.data.length > 0) {
          // Enrichir les données de l'API avec des imageKey pour assurer l'affichage des images
          const productsWithImages = response.data.map(product => {
            // Essayer de trouver une imageKey basée sur le nom de l'image ou d'autres propriétés
            let imageKey = product.image?.replace('.jpg', '') || '';
            
            // Si on ne trouve pas l'image, utiliser une correspondance par nom
            if (!images[imageKey]) {
              // Convertir le nom en minuscule et supprimer les espaces pour la recherche
              const normalizedName = product.name.toLowerCase().replace(/\s+/g, '');
              
              // Rechercher une correspondance approximative dans nos images
              const possibleMatch = Object.keys(images).find(key => 
                normalizedName.includes(key) || key.includes(normalizedName)
              );
              
              if (possibleMatch) {
                imageKey = possibleMatch;
              }
            }
            
            return {
              ...product,
              imageKey: imageKey || 'calamar1' // Utiliser calamar1 comme fallback
            };
          });
          
          setProducts(productsWithImages);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsFromAPI();
  }, []);

  /* Filtrage des produits */
  const filteredProducts = products.filter((produit) => {
    if (!produit.name || !produit.category) return false; // Exclure les produits sans "name" ou "category"

    const isAllCategory = selectedCategory === categories[0];
    if (isAllCategory) return true;

    const categoryMap = {
      'Poissons Pélagiques': 'Poissons Pélagiques',
      'Céphalopodes': 'Mollusques Céphalopodes',
      'Pelagic Fish': 'Poissons Pélagiques',
      'Cephalopods': 'Mollusques Céphalopodes',
      'Peces Pelágicos': 'Poissons Pélagiques',
      'Cefalópodos': 'Mollusques Céphalopodes',
      'Peixes Pelágicos': 'Poissons Pélagiques',
      'Cefalópodes': 'Mollusques Céphalopodes'
    };

    const frenchCategory = categoryMap[selectedCategory] || selectedCategory;
    return produit.category === frenchCategory || produit.category.includes(frenchCategory);
  });

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setShowOrderForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({...orderDetails, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const iframeName = 'hidden-form-iframe';
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
      product: selectedProduct.nom,
      quantity: `${orderDetails.quantity} kg`,
      name: orderDetails.name,
      email: orderDetails.email,
      phone: orderDetails.phone,
      '_subject': `Nouvelle commande pour ${selectedProduct.nom}`,
      '_captcha': 'false',
      '_template': 'table',
      '_next': 'https://formsubmit.co/ajax/chakirsoufiane458@gmail.com'
    };
  
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });
  
    document.body.appendChild(form);
    form.submit();
    setShowOrderForm(false);
    
    setTimeout(() => {
      document.body.removeChild(form);
    }, 500);
  };

  const handleDetailClick = (product) => {
    setDetailProduct(product);
    setShowDetailModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    
    // Assurez-vous que le produit a un prix avant de l'ajouter
    const productWithPrice = {
      ...product,
      price: product.price || 15.99, // Prix par défaut si non défini
      imageUrl: images[product.image?.replace('.jpg', '')] || 'default.jpg' // Pour l'image dans le panier
    };
    
    addToCart(productWithPrice);
  };

  return (
    <div className="products-page">
      <Header />
      
      {/* Hero */}
      <div className="products-hero">
        <h1>{t.products.title}</h1>
        <p>{t.products.description}</p>
      </div>

      <div className="products-container">
        {/* Filtres - uniquement catégories, sans recherche */}
        <div className="filters-section">
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

        {/* Grille de produits */}
        <div className="products-grid">
          {filteredProducts
            .filter(produit => produit.name)
            .map((produit) => (
              <div key={produit._id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={images[produit.image?.replace('.jpg', '')] || images['sardine']} 
                    alt={produit.name || 'Produit'} 
                  />
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
                  <h3>{produit.name}</h3>
                  <p className="category">{produit.category}</p>
                  
                  {/* Affichage du prix et boutons */}
                  <div className="product-price-action">
                    <span className="product-price">
                      {produit.price ? 
                        `${(produit.price * 10.93).toFixed(2)} MAD/kg` : 
                        `${(15.99 * 10.93).toFixed(2)} MAD/kg`}
                    </span>
                    <div className="product-actions">
                      <button
                        className="add-to-cart-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            ...produit,
                            imageUrl: images[produit.image?.replace('.jpg', '')] || images['sardine']
                          });
                        }}
                      >
                        <FaCartPlus /> Ajouter
                      </button>
                      <button
                        className="order-button"
                        onClick={() => handleOrderClick(produit)}
                      >
                        {t.products.orderButton}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Formulaire de commande */}
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

      {/* Modal de détails */}
      {showDetailModal && detailProduct && (
        <div className="product-detail-modal-overlay" onClick={() => {
          setShowDetailModal(false);
          document.body.style.overflow = 'auto';
        }}>
          <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-detail-modal" 
              onClick={() => {
                setShowDetailModal(false);
                document.body.style.overflow = 'auto';
              }}
            >
              <FaTimes />
            </button>
            
            <div className="product-detail-content">
              <div className="product-detail-left">
                <div className="product-detail-image-container">
                  <img 
                    src={typeof images[detailProduct.imageKey] !== 'undefined' ? images[detailProduct.imageKey] : '/assets/calamar1.jpg'} 
                    alt={detailProduct.nom} 
                    className="product-detail-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/calamar1.jpg';
                    }}
                  />
                  <div className="product-detail-overlay"></div>
                  <span className="product-category-badge">{detailProduct.category}</span>
                </div>
                
                <div className="product-characteristics">
                  <h3>{t.products.details.characteristics}</h3>
                  <ul className="characteristics-list">
                    <li>
                      <span className="characteristic-icon">🏢</span>
                      <span>{t.products.details.company}: <strong>{t.products.details.companyValue}</strong></span>
                    </li>
                    <li>
                      <span className="characteristic-icon">📍</span>
                      <span>{t.products.details.fishingArea}: <strong>{t.products.details.fishingAreaValue}</strong></span>
                    </li>
                    <li>
                      <span className="characteristic-icon">🚢</span>
                      <span>{t.products.details.shippingPort}: <strong>{t.products.details.shippingPortValue}</strong></span>
                    </li>
                    <li>
                      <span className="characteristic-icon">🏆</span>
                      <span>{t.products.details.quality}: <strong>{t.products.details.qualityValue}</strong></span>
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
                    <strong>{t.products.details.guaranteed}</strong>
                    <p>{t.products.details.selectedWith}</p>
                  </div>
                </div>
                
                {/* Certifications */}
                <div className="product-certifications">
                  <h3>{t.products.details.certifications}</h3>
                  <div className="certifications-container">
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
                        <h4>{t.products.details.haccp}</h4>
                        <p>{t.products.details.haccpDesc}</p>
                      </div>
                    </div>

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
                        <h4>{t.products.details.iso}</h4>
                        <p>{t.products.details.isoDesc}</p>
                      </div>
                    </div>

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
                        <h4>{t.products.details.sanitary}</h4>
                        <p>{t.products.details.sanitaryDesc}</p>
                      </div>
                    </div>

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
                        <h4>{t.products.details.traceability}</h4>
                        <p>{t.products.details.traceabilityDesc}</p>
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