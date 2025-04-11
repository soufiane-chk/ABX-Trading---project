import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [globalSuccessMessage, setGlobalSuccessMessage] = useState("");

  // Fonction pour effacer les erreurs
  const clearError = () => {
    setError(null);
  };

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Configuration avec le token d'authentification
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          
          // Vérifier le token avec le backend
          const res = await axios.get('http://localhost:5000/api/auth/profile', config);
          setUser(res.data.user);
          setIsAuthenticated(true);
        } catch (err) {
          console.log("Token expiré ou invalide:", err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };
    
    checkAuth();
  }, []);

  // Inscription d'un utilisateur
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Tentative d'inscription:", { name, email });
      
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });
      
      console.log("Réponse du serveur:", res.data);
      
      // Définir un message de succès global
      setGlobalSuccessMessage("✅ Votre compte a été créé avec succès!");
      
      // Effacer le message après un délai
      setTimeout(() => {
        setGlobalSuccessMessage("");
      }, 5000);
      
      // IMPORTANT: Retourner true pour indiquer le succès à AuthModal
      return true;
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      setError(err.response?.data?.message || "Erreur lors de l'inscription. Veuillez réessayer.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Connexion d'un utilisateur
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Tentative de connexion:", { email });
      
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      
      console.log("Réponse de connexion:", res.data);
      
      if (!res.data || !res.data.token || !res.data.user) {
        throw new Error("Données d'authentification incomplètes");
      }
      
      // Stocker les données d'authentification
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // Mettre à jour l'état
      setIsAuthenticated(true);
      setUser(res.data.user);
      setIsAuthModalOpen(false);
      
      // Définir le message de succès global
      setGlobalSuccessMessage("✅ Connexion réussie ! Bienvenue " + res.data.user.name);
      
      // Effacer le message après 5 secondes
      setTimeout(() => {
        setGlobalSuccessMessage("");
      }, 5000);
      
      return true;
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError(err.response?.data?.message || "Identifiants incorrects. Veuillez réessayer.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion d'un utilisateur et nettoyage de la session
  const logout = () => {
    // Supprimer les données d'authentification
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Vider le panier lors de la déconnexion
    localStorage.removeItem('cart');
    
    // Mettre à jour l'état
    setIsAuthenticated(false);
    setUser(null);
    
    // Publier un événement pour notifier les autres composants
    window.dispatchEvent(new Event('userLogout'));
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    clearError();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        clearError,
        globalSuccessMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};