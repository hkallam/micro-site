// src/components/ProductList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';
import { products } from '../data/products';

function ProductList({ addToCart }) {
  const [showCartLink, setShowCartLink] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowCartLink(true);
    // Optionally, hide the link after a few seconds
    setTimeout(() => setShowCartLink(false), 5000);
  };

  return (
    <div className="product-list">
      {showCartLink && (
        <div className="cart-link">
          Item added to cart! <Link to="/cart">View Cart</Link>
        </div>
      )}
      {products.map(product => (
        <ProductItem 
          key={product.id} 
          product={product} 
          addToCart={() => handleAddToCart(product)} 
        />
      ))}
    </div>
  );
}

export default ProductList;