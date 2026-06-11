import React, { useEffect, useState } from 'react';
import './HeroSection.css';

const slides = [
  {
    image: 'https://drive.google.com/thumbnail?id=1GG7S2pJz92mjji_Jb4GMCGVCogx-Qmvq&sz=w1000',
    alt: 'Việt Thắng Banner 1',
  },
  {
    image: 'https://i1-vnexpress.vnecdn.net/2026/05/07/A3-DN-1778120356-5188-1778120411.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=upHpQC54p0SwH2PLUDup7Q',
    alt: 'Việt Thắng Banner 2',
  },
  {
    image: 'https://i1-vnexpress.vnecdn.net/2026/05/07/TPCT-1778119312-8368-1778119407.png?w=680&h=0&q=100&dpr=1&fit=crop&s=NjjMBz92kjjZ_7m117GUbg',
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
      <div
        className="hero-track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="hero-slide" key={index}>
            <img
              src={slide.image}
              alt={slide.alt}
              className="hero-slide-img"
            />
          </div>
        ))}
      </div>

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