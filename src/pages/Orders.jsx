import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Orders.css';

const Orders = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
        setError("Impossible de charger vos commandes. Veuillez réessayer plus tard.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="orders-container">
        <h2>Mes commandes</h2>
        <p>Veuillez vous connecter pour voir vos commandes.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-container">
        <h2>Mes commandes</h2>
        <div className="loading">Chargement des commandes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <h2>Mes commandes</h2>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>Mes commandes</h2>
      
      {orders.length === 0 ? (
        <p>Vous n'avez pas encore effectué de commande.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Commande #{order._id.substring(0, 8)}</h3>
                <span className={`order-status ${order.isPaid ? 'paid' : 'pending'}`}>
                  {order.isPaid ? 'Payée' : 'En attente de paiement'}
                </span>
              </div>
              
              <div className="order-date">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </div>
              
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">{item.quantity} kg</span>
                    <span className="item-price">{item.price.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
              
              <div className="order-total">
                Total: <strong>{order.totalPrice.toFixed(2)} €</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;