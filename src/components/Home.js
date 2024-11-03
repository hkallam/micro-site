// src/components/Home.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css'

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="home">
      <h1>Locally Grown Microgreens</h1>
      <p>We are a small, local business dedicated to growing fresh and organic microgreens. Our mission is to provide nutritious, high-quality greens to our community, delivered directly to your doorstep.</p>
      <Slider {...settings}>
        <div>
          <img src="images/broccoli.jpg" alt="First slide" />
        </div>
        <div>
          <img src="images/radish.jpg" alt="Second slide" />
        </div>
        <div>
          <img src="images/sunflower.jpg" alt="Third slide" />
        </div>
      </Slider>
    </div>
  );
}

export default Home;