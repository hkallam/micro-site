import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Folsom Microgreens is a local business dedicated to providing fresh,
            nutritious microgreens to the community. Enjoy fresh greens delivered
            right to your doorstep!
          </p>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: contact@folsommicrogreens.com</p>
          <p>Phone: 279-842-7951</p>
          <p>Location: Folsom, CA</p>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <p>
          <a href="https://instagram.com/folsommicrogreens" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          </p>
          <p>
          <a href="https://wa.me/12798427951" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Folsom Microgreens. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
