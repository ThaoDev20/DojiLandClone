import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './IntroSection.css';

const IntroSection = () => {

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <section
      ref={sectionRef}
      className={`intro-section ${isVisible ? 'is-visible' : ''}`}
    >
      <img
        className="intro-decor-bg"
        src="https://dojiland.vn/wp-content/themes/main/assets/images/common/s2-decor1.png"
        alt=""
      />

      <img
        className="intro-decor-bg-mobile"
        src="https://dojiland.vn/wp-content/themes/main/assets/images/common/s2-decor1-mobi.png"
        alt=""
      />

      <div className="intro-container">
        <h2 className="intro-title intro-title-mobile">
          Giới thiệu về Việt Thắng
        </h2>

        <div className="intro-left intro-animate-left">
          <div className="intro-member-badge">
            <img
              className="intro-member-bg"
              src="https://dojiland.vn/wp-content/themes/main/assets/images/common/s2_decor2.png"
              alt=""
            />

            <a href="/" target="_blank" rel="noreferrer">
              <span>Công ty TNHH Việt Thắng</span>
              {/* <img
                src="https://dojiland.vn/wp-content/themes/main/assets/images/common/logo.png"
                alt="DOJI"
              /> */}
            </a>
          </div>

          <div className="intro-thumbnail">
            <img
              className="intro-frame"
              src="https://drive.google.com/thumbnail?id=1GG7S2pJz92mjji_Jb4GMCGVCogx-Qmvq&sz=w1000"
              alt=""
            />

            <img
              className="intro-image"
              src="https://dojiland.vn/wp-content/uploads/2023/06/Toa-nha-Doji.jpg"
              alt="Tòa nhà DOJI"
            />
          </div>
        </div>

        <div className="intro-right intro-animate-right">
          <h2 className="intro-title">
            Giới thiệu về Việt Thắng
          </h2>



          <div className="intro-text">
            <p className="intro-lead">
              Tiên phong phát triển dòng sản phẩm Bất động sản
            </p>

            <p>
              Giới thiệu về Việt Thắng
            </p>
          </div>

          <Link to="/gioi-thieu" className="intro-detail-btn">
            <img
              src="https://dojiland.vn/wp-content/themes/main/assets/images/common/img-btn-small.png"
              alt=""
            />
            <span>Xem chi tiết</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;