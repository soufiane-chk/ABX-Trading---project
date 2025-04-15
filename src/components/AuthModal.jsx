import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthModal.css';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login, register, error, loading, clearError } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('register'); // Onglet actif
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAuthModalOpen]);

  useEffect(() => {
    clearError();
    setFormData({
      name: '',
      email: '',
      password: '',
    });
    setValidationErrors({});
    setSuccessMessage('');
  }, [activeTab, clearError]);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    clearError();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      errors.email = "Format d'email invalide";
    }
    
    if (!formData.password) {
      errors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    if (activeTab === 'register' && !formData.name.trim()) {
      errors.name = "Le nom est requis";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (activeTab === 'login') {
        const loginSuccess = await login(formData.email, formData.password);
        if (loginSuccess) {
          setSuccessMessage("✅ Connexion réussie ! Redirection en cours...");
          setTimeout(() => {
            closeAuthModal();
          }, 2000);
        }
      } else {
        const registerSuccess = await register(formData.name, formData.email, formData.password);
        if (registerSuccess) {
          setSuccessMessage("✅ Compte créé avec succès ! Vous pouvez maintenant vous connecter");
          
          setTimeout(() => {
            setActiveTab('login');
            setFormData({
              ...formData,
              password: '',
            });
          }, 3000);
        }
      }
    } catch (err) {
      console.error("Erreur dans le composant Auth:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Inscription réussie ! Votre compte a été créé.');
        setTimeout(() => {
          setActiveTab('login'); // Passe à l'onglet connexion
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erreur lors de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={closeAuthModal}>
      <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-content">
          <div className="auth-modal-left">
            <div className="auth-modal-image">
              <div className="auth-modal-logo">
                <span className="logo-text">ABX TRADING</span>
              </div>

              <h2>Bienvenue sur notre plateforme</h2>
              <p>Connectez-vous pour accéder à notre catalogue et passer des commandes.</p>

              <div className="auth-features">
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">Produits de la mer de qualité</div>
                </div>
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">Livraison rapide et sécurisée</div>
                </div>
                <div className="feature">
                  <div className="feature-icon">✓</div>
                  <div className="feature-text">Service client dédié</div>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-modal-right">
            <button className="close-auth-btn" onClick={closeAuthModal}>
              ×
            </button>
            
            <div className="auth-tabs">
              <button
                className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('login');
                  clearError();
                  setSuccessMessage('');
                }}
              >
                Connexion
              </button>
              <button
                className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('register');
                  clearError();
                  setSuccessMessage('');
                }}
              >
                Inscription
              </button>
            </div>

            {successMessage && (
              <div className="auth-success">
                <FaCheck style={{ marginRight: '8px', color: '#38a169' }} /> {successMessage}
              </div>
            )}

            {error && (
              <div className="auth-error">
                <FaExclamationCircle style={{ marginRight: '8px' }} /> {error}
              </div>
            )}

            <div className="form-header">
              <h3>{activeTab === 'login' ? 'Connexion à votre compte' : 'Créer un compte'}</h3>
              <p>{activeTab === 'login' ? 'Entrez vos identifiants pour vous connecter' : 'Remplissez le formulaire pour vous inscrire'}</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {activeTab === 'register' && (
                <div className="form-group">
                  <div className="input-icon-outside">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="name"
                    className={`auth-input ${validationErrors.name ? 'input-error' : ''}`}
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {validationErrors.name && (
                    <div className="validation-error">
                      <FaExclamationCircle style={{ marginRight: '8px' }} /> {validationErrors.name}
                    </div>
                  )}
                </div>
              )}

              <div className="form-group">
                <div className="input-icon-outside">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  className={`auth-input ${validationErrors.email ? 'input-error' : ''}`}
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {validationErrors.email && (
                  <div className="validation-error">
                    <FaExclamationCircle style={{ marginRight: '8px' }} /> {validationErrors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <div className="input-icon-outside">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`auth-input ${validationErrors.password ? 'input-error' : ''}`}
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {validationErrors.password && (
                  <div className="validation-error">
                    <FaExclamationCircle style={{ marginRight: '8px' }} /> {validationErrors.password}
                  </div>
                )}
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading || isSubmitting}>
                {loading || isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  activeTab === 'login' ? 'Connexion' : 'Inscription'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;