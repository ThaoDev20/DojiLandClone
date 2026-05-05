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
          Giới thiệu về DOJILAND
        </h2>

        <div className="intro-left intro-animate-left">
          <div className="intro-member-badge">
            <img
              className="intro-member-bg"
              src="https://dojiland.vn/wp-content/themes/main/assets/images/common/s2_decor2.png"
              alt=""
            />

            <a href="https://doji.vn/" target="_blank" rel="noreferrer">
              <span>Thành viên của Tập Đoàn</span>
              <img
                src="https://dojiland.vn/wp-content/themes/main/assets/images/common/logo.png"
                alt="DOJI"
              />
            </a>
          </div>

          <div className="intro-thumbnail">
            <img
              className="intro-frame"
              src="https://dojiland.vn/wp-content/themes/main/assets/images/common/s2_decor4.png"
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
            Giới thiệu về DOJILAND
          </h2>

          <div className="intro-text">
            <p className="intro-lead">
              Tiên phong phát triển dòng sản phẩm KIM ĐỊA ỐC – Bất động sản nghệ thuật kim hoàn
            </p>

            <p>
              Thành lập vào năm 2014, DOJILAND là thành viên của Tập đoàn Vàng
              bạc đá quý DOJI – Tập đoàn kinh doanh đa ngành, Top 3 Doanh
              nghiệp tư nhân lớn nhất Việt Nam, với lĩnh vực then chốt là Vàng
              bạc đá quý, Tài chính và Bất động sản. Thừa hưởng từ DOJI Uy tín
              sản phẩm, thương hiệu đẳng cấp, Tiềm lực tài chính hùng mạnh,
              Năng lực quản trị vượt trội, DOJILAND đã và đang khẳng định được
              sức mạnh trong các dự án đầu tư cũng như vị thế dẫn đầu trên thị
              trường bất động sản.
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