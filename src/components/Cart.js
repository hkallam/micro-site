import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaTrash } from 'react-icons/fa';

function Cart({ items, removeFromCart, clearCart }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const isDateValid = (selectedDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(selectedDate) > today;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (isDateValid(selectedDate)) {
      setDate(selectedDate);
    } else {
      alert('Please select a future date.');
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setPhone(input);
  };
  const handleCheckout = (e) => {
    e.preventDefault();
    if (email && name && address && phone && date && items.length > 0) {

      if (phone.length < 10) {
        alert('Please enter a valid phone number.');
        return;
      }

      const emailContent = items.map(item => `${item.name}: $${item.price.toFixed(2)}`).join('\n');
      const templateParams = {
        to_email: email,
        to_name: name,
        to_address: address,
        to_phone: phone,
        order_date: date,
        cart_items: emailContent,
        total: total.toFixed(2)
      };
      console.log('Template Params:', templateParams); // Add this line

      // Send email using EmailJS
      emailjs.send(
        'service_n854jzn', // Replace with your EmailJS service ID
        'template_0q668xp', // Replace with your EmailJS template ID
        templateParams // Replace with your EmailJS user ID
      ).then((result) => {
        console.log('Email sent successfully:', result.text);
        alert('Order placed! Check your email for confirmation.');
        clearCart();
        setEmail('');
        setName('');
        setAddress('');
        setPhone('');
        setDate('');
      }, (error) => {
        console.log('Failed to send email:', error.text);
        alert('Failed to place order. Please try again.');
      });
    } else {
      alert('Please enter your email and add items to the cart before checking out.');
    }
  };
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
           <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.name} - ${item.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className="remove-item">
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <p>Total: ${total.toFixed(2)}</p>
          <form onSubmit={handleCheckout}>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={handlePhoneChange}
              pattern="[0-9]{10}"
              title="Phone number should be 10 digits"
              required
            />
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              min={today}
              required
            />
            <button type="submit">Proceed to Checkout</button>
          </form>
        </>
      )}
    </div>

  );
}

export default Cart;