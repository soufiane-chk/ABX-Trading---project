import React, { useState, useContext } from 'react';
import { FaCreditCard, FaLock, FaMapMarkerAlt, FaCalendarAlt, FaShieldAlt } from 'react-icons/fa';
import '../styles/PaymentModal.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const PaymentModal = ({ onClose, onSuccess, total, cartItems }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { clearCart, EUR_TO_MAD_RATE } = useCart();
  
  const [formData, setFormData] = useState({
    cardName: user?.name || '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Maroc'
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardName.trim()) newErrors.cardName = 'Nom requis';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Numéro requis';
    if (!formData.expiry.trim()) newErrors.expiry = 'Date requise';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV requis';
    if (!formData.address.trim()) newErrors.address = 'Adresse requise';
    if (!formData.city.trim()) newErrors.city = 'Ville requise';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Code postal requis';
    if (!formData.country.trim()) newErrors.country = 'Pays requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Vérification de l'authentification
      if (!isAuthenticated || !user) {
        setErrors({
          submit: "Vous devez être connecté pour effectuer un achat."
        });
        setLoading(false);
        return;
      }
      
      // Récupération du token d'authentification
      const token = localStorage.getItem('token');
      
      if (!token) {
        setErrors({
          submit: "Erreur d'authentification. Veuillez vous reconnecter."
        });
        setLoading(false);
        return;
      }
      
      // Prix en EUR pour la base de données
      const totalInEUR = total / EUR_TO_MAD_RATE;
      
      // Normalisation des données des articles
      const normalizedItems = cartItems.map(item => {
        return {
          product: item._id || item.id,
          name: item.name || item.nom,
          price: item.price,
          quantity: item.quantity
        };
      });
      
      // Préparation des données de commande
      const orderData = {
        items: normalizedItems,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.zipCode,
          country: formData.country
        },
        totalPrice: totalInEUR,
        paymentMethod: 'Card'
      };
      
      // Envoi de la commande à l'API avec le token correct
      const orderResponse = await axios.post(
        'http://localhost:5000/api/orders',
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Si la commande est créée avec succès, marquer comme payée
      if (orderResponse.data && orderResponse.data._id) {
        // Simuler le traitement du paiement pendant 2 secondes
        setTimeout(async () => {
          try {
            // Mettre à jour l'état de paiement de la commande
            const paymentData = {
              id: `pay_${Date.now()}`,
              status: 'COMPLETED',
              update_time: new Date().toISOString(),
              email_address: user.email
            };
            
            await axios.put(
              `http://localhost:5000/api/orders/${orderResponse.data._id}/pay`,
              paymentData,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
              }
            );
            
            // Vider le panier après une commande réussie
            clearCart();
            
            setLoading(false);
            
            // Fermer le modal et notifier le succès
            if (onSuccess) onSuccess();
            
          } catch (error) {
            console.error("Erreur lors du paiement:", error);
            setLoading(false);
            setErrors({
              submit: "Erreur lors du paiement. Veuillez réessayer."
            });
          }
        }, 2000);
      } else {
        throw new Error("La commande n'a pas été créée correctement");
      }
      
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      setLoading(false);
      setErrors({
        submit: "Erreur lors de la création de la commande. Veuillez réessayer."
      });
    }
  };
  
  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-header">
          <h2><FaCreditCard /> Paiement</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="payment-body">
          <div className="secure-payment-notice">
            <FaLock />
            <span>Paiement sécurisé - Vos données sont cryptées</span>
          </div>
          
          <div className="payment-summary">
            <h3>Récapitulatif de la commande</h3>
            <div className="cart-items-summary">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item-summary">
                  <span className="item-name">{item.name || item.nom}</span>
                  <span className="item-quantity">{item.quantity} kg</span>
                  <span className="item-price">{(item.price * item.quantity * EUR_TO_MAD_RATE).toFixed(2)} MAD</span>
                </div>
              ))}
            </div>
            <div className="payment-total">
              <span>Total à payer:</span>
              <span className="total-amount">{total.toFixed(2)} MAD</span>
            </div>
          </div>
          
          {errors.submit && (
            <div className="error-message global-error">{errors.submit}</div>
          )}
          
          <form onSubmit={handleSubmit} className="payment-form">
            {/* Formulaire de paiement (carte) */}
            <div className="form-section">
              <h4><FaCreditCard /> Informations de paiement</h4>
              <div className="form-group">
                <label>Nom sur la carte</label>
                <input 
                  type="text" 
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className={errors.cardName ? 'invalid' : ''}
                  placeholder="Nom du titulaire de la carte"
                />
                {errors.cardName && <div className="error-message">{errors.cardName}</div>}
              </div>
              
              <div className="form-group">
                <label>Numéro de carte</label>
                <div className="card-input-container">
                  <input 
                    type="text" 
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={errors.cardNumber ? 'invalid' : ''}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>
                {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date d'expiration</label>
                  <div className="card-input-container">
                    <input 
                      type="text" 
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      className={errors.expiry ? 'invalid' : ''}
                      placeholder="MM/AA"
                      maxLength="5"
                    />
                    <FaCalendarAlt className="card-icon" />
                  </div>
                  {errors.expiry && <div className="error-message">{errors.expiry}</div>}
                </div>
                
                <div className="form-group">
                  <label>CVV</label>
                  <div className="card-input-container">
                    <input 
                      type="text" 
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className={errors.cvv ? 'invalid' : ''}
                      placeholder="123"
                      maxLength="4"
                    />
                    <FaShieldAlt className="card-icon" />
                  </div>
                  {errors.cvv && <div className="error-message">{errors.cvv}</div>}
                </div>
              </div>
            </div>
            
            {/* Formulaire d'adresse */}
            <div className="form-section">
              <h4><FaMapMarkerAlt /> Adresse de livraison</h4>
              <div className="form-group">
                <label>Adresse</label>
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? 'invalid' : ''}
                  placeholder="Numéro et nom de rue"
                />
                {errors.address && <div className="error-message">{errors.address}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Ville</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'invalid' : ''}
                    placeholder="Ville"
                  />
                  {errors.city && <div className="error-message">{errors.city}</div>}
                </div>
                
                <div className="form-group">
                  <label>Code postal</label>
                  <input 
                    type="text" 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={errors.zipCode ? 'invalid' : ''}
                    placeholder="Code postal"
                  />
                  {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
                </div>
              </div>
              
              <div className="form-group">
                <label>Pays</label>
                <select 
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={errors.country ? 'invalid' : ''}
                >
                  <option value="">Sélectionner un pays</option>
                  <option value="Maroc">Maroc</option>
                  <option value="France">France</option>
                  <option value="Espagne">Espagne</option>
                  <option value="Portugal">Portugal</option>
                </select>
                {errors.country && <div className="error-message">{errors.country}</div>}
              </div>
            </div>
            
            <div className="payment-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" className="pay-btn" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  `Payer ${total.toFixed(2)} MAD`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;