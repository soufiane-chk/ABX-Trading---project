import React, { useState, useEffect, useRef } from 'react';
import '../styles/CartModal.css';
import { useCart } from '../context/CartContext';
import PaymentModal from './PaymentModal';

import calamar1 from '../assets/calamar1.jpg';
import imgcong from '../assets/imgcong.jpg';
import poulpe from '../assets/poulpe.jpg';
import seiche1 from '../assets/seiche1.jpg';
import sardine from '../assets/sardine.jpg';
import maquereau from '../assets/maquereau.jpg';
import sabre1 from '../assets/sabre1.jpg';
import imgmulet from '../assets/imgmulet.jpg';
import almendrita2 from '../assets/almendrita2.jpg';
import puntilla1 from '../assets/puntilla1.jpeg';

const images = {
  calamar1,
  imgcong,
  poulpe,
  seiche1,
  sardine,
  maquereau,
  sabre1,
  imgmulet,
  almendrita2,
  puntilla1
};

const CartModal = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart,
    showCartModal,
    closeCartModal,
    convertToMAD,
    EUR_TO_MAD_RATE
  } = useCart();
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeCartModal();
      }
    };

    if (showCartModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCartModal, closeCartModal]);

  if (!showCartModal) return null;

  const handleCheckout = () => {
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };
  
  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setPaymentSuccess(true);
    
    setTimeout(() => {
      clearCart();
      closeCartModal();
    }, 3000);
  };

  const getProductImage = (item) => {
    try {
      const specificImages = {
        'seiche': seiche1,
        'seiche1': seiche1,
        'calamar': calamar1,
        'calamar1': calamar1,
        'poulpe': poulpe,
        'almendrita': almendrita2,
        'almendrita2': almendrita2,
        'mulet': imgmulet,
        'imgmulet': imgmulet,
        'sabre': sabre1,
        'sabre1': sabre1,
        'sardine': sardine,
        'maquereau': maquereau,
        'puntilla': puntilla1,
        'puntilla1': puntilla1,
        'imgcong': imgcong
      };
      
      if (item.imageKey && specificImages[item.imageKey]) {
        return specificImages[item.imageKey];
      }
      
      if (item.name) {
        const normalizedName = item.name.toLowerCase().trim();
        const matchingKey = Object.keys(specificImages).find(key => 
          normalizedName.includes(key) || key.includes(normalizedName)
        );
        
        if (matchingKey) {
          return specificImages[matchingKey];
        }
      }
      
      if (item.image) {
        const imageName = item.image.replace('.jpg', '').replace('.jpeg', '');
        if (specificImages[imageName]) {
          return specificImages[imageName];
        }
      }
      
      return calamar1;
    } catch (err) {
      console.error("Erreur lors du chargement de l'image:", err);
      return calamar1;
    }
  };
  
  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal" ref={modalRef}>
        <div className="cart-header">
          <h2>
            <span className="cart-icon">🛒</span> Votre Panier
          </h2>
          <button className="close-modal-btn" onClick={closeCartModal}>
            <span className="close-icon">×</span>
          </button>
        </div>
        
        {paymentSuccess && (
          <div className="payment-success-message">
            <span className="success-icon">✓</span> Paiement réussi ! Votre commande a été enregistrée.
          </div>
        )}
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Votre panier est vide</p>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div className="cart-item" key={item._id || Math.random().toString()}>
                  <div className="item-image">
                    <img 
                      src={getProductImage(item)}
                      alt={item.name || item.nom || "Produit"}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = calamar1;
                      }}
                    />
                  </div>
                  
                  <div className="item-info">
                    <div className="item-details">
                      <h3>{item.name || item.nom}</h3>
                      <p className="item-price">{(item.price * EUR_TO_MAD_RATE).toFixed(2)} MAD/kg</p>
                    </div>
                    
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="quantity-btn minus-btn"
                        >
                          <span className="control-icon">−</span>
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="quantity-btn plus-btn"
                        >
                          <span className="control-icon">+</span>
                        </button>
                      </div>
                      
                      <div className="item-total">
                        {(item.price * item.quantity * EUR_TO_MAD_RATE).toFixed(2)} MAD
                      </div>
                      
                      <button 
                        className="remove-item" 
                        onClick={() => removeFromCart(item._id)}
                      >
                        <span className="trash-icon">×</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="cart-summary">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>{convertToMAD(getCartTotal()).toFixed(2)} MAD</span>
                </div>
                <div className="cart-actions">
                  <button className="clear-cart" onClick={clearCart}>
                    Vider le panier
                  </button>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    <span className="card-icon">💳</span> Procéder au paiement
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        
        {showPaymentModal && (
          <PaymentModal 
            onClose={closePaymentModal}
            onSuccess={handlePaymentSuccess}
            total={convertToMAD(getCartTotal())}
            cartItems={cartItems}
          />
        )}
      </div>
    </div>
  );
};

export default CartModal;