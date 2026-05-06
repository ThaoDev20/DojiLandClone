import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const LOGO_FOOTER = '';
const FOOTER_BG = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/ft-bg.jpg';
const FOOTER_DECOR_BOTTOM = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/ft-decor1.png';
const FORM_DECOR_1 = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/ft-decor3.png';
const FORM_DECOR_2 = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/ft-decor2.png';

const PHONE_ICON = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/phone.svg';
const EMAIL_ICON = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/email.svg';
const LOCATION_ICON = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/location.svg';

const footerMenu = [
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Dự án', href: '/project_category/bat-dong-san-nha-o' },
  { label: 'Truyền thông', href: '/tin-noi-bat' },
  { label: 'Tuyển dụng', href: '/tuyen-dung' },
  { label: 'Liên hệ', href: '/lien-he' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailValue = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (!emailValue) {
      setMessage('Vui lòng nhập email.');
      return;
    }

    if (!isValidEmail) {
      setMessage('Email không hợp lệ.');
      return;
    }

    setMessage('Đăng ký thông tin thành công.');
    setEmail('');
  };

  return (
    <footer id="colophon" className="site-footer">
      <div
        className="footer-main"
        style={{ backgroundImage: `url(${FOOTER_BG})` }}
      >
        <div className="footer-content">
          <div className="footer-left">
            <Link to="/" className="footer-logo">
              <img src={LOGO_FOOTER} alt="Logo" />
            </Link>
          </div>

          <div className="footer-center">
            <div className="footer-column">
              <h3 className="footer-title">Về Dojiland</h3>

              <ul className="footer-menu">
                {footerMenu.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column footer-contact">
              <h3 className="footer-title">Liên hệ</h3>

              <p>
                <img src={PHONE_ICON} alt="" />
                <a href="tel:02433662288">024 3366 2288</a>
              </p>

              <p>
                <img src={EMAIL_ICON} alt="" />
                <a href="mailto:cskh@dojiland.vn">cskh@dojiland.vn</a>
              </p>

              <p>
                <img src={LOCATION_ICON} alt="" />
                <span>
                  Tầng 9, Tòa nhà DOJI TOWER, Số 5 Lê Duẩn, Ba Đình, Hà Nội.
                </span>
              </p>
            </div>
          </div>

          <div className="footer-right">
            <p className="footer-notice">
              Đăng ký nhận thông tin mới nhất từ DOJILAND
            </p>

            <form className="footer-form" onSubmit={handleSubmit}>
              <img className="footer-form-decor-1" src={FORM_DECOR_2} alt="" />
              <img className="footer-form-decor-2" src={FORM_DECOR_1}  alt="" />

              <input
                type="email"
                name="res_email"
                placeholder="Nhập email tại đây"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <button type="submit">
                Gửi đi
              </button>
            </form>

            {message && (
              <p className="footer-message">
                {message}
              </p>
            )}

            <p className="footer-copyright footer-copyright-desktop">
              Copyright © DOJILAND 2023. All rights reserved
            </p>
          </div>

          <p className="footer-copyright footer-copyright-mobile">
            Copyright © DOJILAND 2023. All rights reserved
          </p>
        </div>

        <img className="footer-decor-bottom" src={FOOTER_DECOR_BOTTOM} alt="" />
      </div>
    </footer>
  );
};

export default Footer;