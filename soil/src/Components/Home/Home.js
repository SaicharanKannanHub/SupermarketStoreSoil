import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Import images
import p1 from './pictures/p1.png';
import p2 from './pictures/p2.png';
import p3 from './pictures/p3.png';
import p4 from './pictures/p4.png';
import p5 from './pictures/p5.png';
import p6 from './pictures/p6.png';

import jane from './pictures/jane.jpg';
import alice from './pictures/alice.jpg';
import john from './pictures/john.jpg';

function Home(props) {
  const navigate = useNavigate();


  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  // Sample organic products data
  const products = [
    {
      id: 1,
      name: 'Organic Apples',
      description: 'Fresh and juicy apples grown organically without any pesticides.',
      image: p1
    },
    {
      id: 2,
      name: 'Organic Lemons',
      description: 'Zesty, pesticide-free lemons bursting with natural flavor and rich in vitamin C, perfect for a healthy lifestyle.',
      image: p2
    },
    {
      id: 3,
      name: 'Organic Honey',
      description: 'Pure, golden honey harvested from wildflowers in pristine natural environments. Sustainably collected to preserve bee colonies and ensure the highest quality.',
      image: p3
    },
    {
      id: 4,
      name: 'Organic Fresh Produce',
      description: 'Explore a bounty of freshly picked organic fruits and vegetables, cultivated with care for your well-being.',
      image: p4
    },
    {
      id: 5,
      name: 'Fresh Avocados',
      description: 'Indulge in the creamy goodness of naturally grown avocados, handpicked for their freshness and flavor.',
      image: p5
    },
    {
      id: 6,
      name: 'Fresh Coconuts',
      description: 'Enjoy the tropical delight of freshly harvested coconuts, brimming with refreshing water and tender meat.',
      image: p6
    },
  ];

  const testimonials = [
    {
      image: jane,
      name: 'Jane Smith',
      comment: 'The products here are amazing! I love the quality and freshness of everything I buy.'
    },
    {
      image: alice,
      name: 'Alice Doe',
      comment: 'Soil Organics has made my life so much easier. I can trust that what I\'m getting is healthy and natural.'
    },
    {
      image: john,
      name: 'John Johnson',
      comment: 'I highly recommend Soil Organics to anyone looking for high-quality organic products. Their selection is unbeatable.'
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prevActiveSlide => (prevActiveSlide === testimonials.length - 1 ? 0 : prevActiveSlide + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? products.length - 1 : currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === products.length - 1 ? 0 : currentSlide + 1);
  };








  
  return (
    // <div className="text-center">
    //     <h1 className="display-4">Home</h1>
    //   {props.email !== null && <h4><strong>Hello {props.email}!</strong></h4>}
    // </div>

    <div>
    <div className="text-center">
      <h1 className="display-4 title">SOIL Organics</h1>
      <div className="carousel-container">
        <div className="carousel" ref={carouselRef}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={product.image} alt={product.name} className="carousel-image" />
              <div className="carousel-caption">
                <h3 className="product-title">{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
          <button className="carousel-prev" onClick={handlePrevSlide}>&#10094;</button>
          <button className="carousel-next" onClick={handleNextSlide}>&#10095;</button>
        </div>
      </div>
    </div>
    {/* Who Are We Section */}
    <div className="who-are-we-container">
      <h2 className="who-are-we-heading">Who Are We?</h2>
      <p>We are a team passionate about organic farming and sustainable agriculture. Our mission is to provide high-quality organic products to promote a healthy lifestyle and a greener planet.</p>
      <p>With years of experience in organic farming, we believe in the importance of responsible agriculture practices that prioritize environmental conservation and community well-being. Our dedication to organic farming extends beyond just producing crops; we are committed to educating and empowering farmers to adopt sustainable practices and contribute to the preservation of our natural resources.</p>
    </div>
    <div className="explore-specials-container">
      <h2 className="explore-specials-heading">Explore Our Specials!</h2>
      <button className="explore-specials-button" onClick={() => navigate('/specials')}>
        Go to Specials
      </button>
    </div>
    <div className="what-customer-say-container">
      <h2 className="what-customer-say-heading">What our customers are saying?</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial ${index === activeSlide ? 'active' : ''}`}
          >
            <img src={testimonial.image} alt={testimonial.name} />
            <p>{testimonial.comment}</p>
            <p className="customer-name">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="contact-us-container">
      <h2 className="contact-us-heading">Contact Us</h2>
      <p>If you have any questions, feedback, or inquiries, feel free to reach out to us!</p>
      <p>Email: info@soilorganics.com</p>
      <p>Phone: 123-456-7890</p>
    </div>
    <footer className="footer">
      <p>&copy; 2024 SOIL Organics. All rights reserved.</p>
    </footer>
    </div>





  



  )
}

export default Home;
