import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  
  // Taux de conversion EUR vers MAD
  const EUR_TO_MAD_RATE = 10.87;
  
  // Charger le panier au montage du composant ou quand l'utilisateur change
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error);
        setCartItems([]);
      }
    };

    loadCart();
    
    // Écouter l'événement de déconnexion
    const handleLogout = () => {
      setCartItems([]);
      setShowCartModal(false);
    };
    
    window.addEventListener('userLogout', handleLogout);
    
    return () => {
      window.removeEventListener('userLogout', handleLogout);
    };
  }, [isAuthenticated, user]);
  
  // Sauvegarder le panier à chaque modification
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Ajouter un produit au panier
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Vérifier si le produit existe déjà dans le panier
      const existingItem = prevItems.find(item => item._id === product._id);
      
      if (existingItem) {
        // Mettre à jour la quantité si le produit existe déjà
        return prevItems.map(item => 
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Ajouter le nouveau produit avec une quantité de 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // Afficher une notification au lieu d'ouvrir le panier
    setLastAddedItem(product);
    setShowAddNotification(true);
    
    // Masquer la notification après 3 secondes
    setTimeout(() => {
      setShowAddNotification(false);
    }, 3000);
  };
  
  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };
  
  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  // Vider le panier
  const clearCart = () => {
    setCartItems([]);
  };
  
  // Calculer le total du panier
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Obtenir le nombre total d'articles dans le panier
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  // IMPORTANT: Cette fonction est appelée dans le header.jsx
  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  // Convertir les prix en MAD
  const convertToMAD = (euroPrice) => {
    return euroPrice * EUR_TO_MAD_RATE;
  };
  
  // Ouvrir/fermer le modal du panier
  const openCartModal = () => {
    setShowCartModal(true);
  };
  
  const closeCartModal = () => {
    setShowCartModal(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getCartItemsCount, // Ajouté ici la fonction manquante
        showCartModal,
        openCartModal,
        closeCartModal,
        convertToMAD,
        EUR_TO_MAD_RATE,
        showAddNotification,
        lastAddedItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte du panier
export const useCart = () => {
  return useContext(CartContext);
};