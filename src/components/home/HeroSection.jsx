import React, { useEffect, useState } from 'react';
import './HeroSection.css';

const slides = [
  {
    image: 'https://drive.google.com/thumbnail?id=1GG7S2pJz92mjji_Jb4GMCGVCogx-Qmvq&sz=w1000',
    alt: 'Việt Thắng Banner 1',
  },
  {
    image: 'https://dojiland.vn/wp-content/uploads/2024/02/Banner-website.jpg',
    alt: 'Việt Thắng Banner 2',
  },
  {
    image: 'https://dojiland.vn/wp-content/uploads/2023/07/Group-4104.jpg',
    alt: 'Việt Thắng Banner 3',
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === activeIndex ? 'active' : ''}`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="hero-slide-img"
          />
        </div>
      ))}

      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`hero-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Chuyển đến slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;