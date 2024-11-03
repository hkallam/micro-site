import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaLeaf, FaShoppingCart, FaBars, FaCalendar, FaInfo, FaInstagram, FaWhatsapp } from 'react-icons/fa';

function Header({ cartItemsCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="header-content">
        <h1> Folsom Microgreens</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          <FaBars />
        </button>
        <div className="social-icons">
      <a href="https://instagram.com/folsommicrogreens" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      <a href="https://wa.me/12798427951" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
    </div>
      </div>
      <nav className={menuOpen ? 'open' : ''}>
        <ul>
          <li><Link to="/"><FaHome /> Home</Link></li>
          
          <li><Link to="/about"><FaInfo />About</Link></li>
          <li><Link to="/microgreens"><FaLeaf /> Microgreens</Link></li>
          <li><Link to="/schedule"><FaCalendar /> Crop Plan</Link></li>
          <li><Link to="/cart"><FaShoppingCart /> Cart ({cartItemsCount})</Link></li>
        </ul>
      </nav>
      
    </header>
  );
}

export default Header;