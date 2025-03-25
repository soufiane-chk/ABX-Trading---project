import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Cart = ({ cart }) => {
  const { t } = useLanguage();

  return (
    <div className="cart-page">
      <h1>{t.cart.title}</h1>
      <div className="cart-items">
        {cart.map((product, index) => (
          <div key={index} className="cart-item">
            <img src={product.image} alt={product.nom} />
            <div className="cart-item-info">
              <h3>{product.nom}</h3>
              <p>{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;