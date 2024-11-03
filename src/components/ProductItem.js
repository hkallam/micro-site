// src/components/ProductItem.js
import React from 'react';

function ProductItem({ product, addToCart }) {
  return (
    <div className="product-item">
      <img src={`images/${product.image}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;