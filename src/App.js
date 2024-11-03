
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Schedule from './components/Schedule';
import Footer from './components/Footer';
import About from './components/About';
import Home from './components/Home';
import './App.css';

import emailjs from '@emailjs/browser';

document.title = "Folsom Microgreens"

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    emailjs.init("PfL3QsTk4pTUONQvR"); // Replace with your EmailJS user ID
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product, id: Date.now() }]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router >
    <div className="App">
      <Header cartItemsCount={cartItems.length} />

      <main>
        
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/microgreens" element={<ProductList addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart items={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
  );
}

export default App;