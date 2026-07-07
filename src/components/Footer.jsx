import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { MapPin, Mail, Phone } from 'lucide-react';

const FORM_DECOR_1 = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/ft-decor3.png';
const FORM_DECOR_2 = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/ft-decor2.png';


const footerMenu = [
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Dự án', href: '/du-an-noi-bat' },
  { label: 'Truyền thông', href: '/tin-du-an' },
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
        style={{ backgroundColor: '#62813b' }}
      >
        <div className="footer-content">
          <div className="footer-left">
            <Link to="/" className="footer-logo">
              <img src='Logo1.png' alt="Logo" />
            </Link>
          </div>

          <div className="footer-center">
            <div className="footer-column">
              <h3 className="footer-title">Về VTGROUP</h3>

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
                <Phone />
                {/* <a href="tel:02433662288">024 3366 2288</a> */}
              </p>

              <p>
                <Mail />
                <a href="mailto:cskh@dojiland.vn">vithacobg@gmail.com</a>
              </p>

              <p>
                <MapPin />
                <span>
                  Tòa nhà đa năng Việt Thắng, đường Hoàng Văn Thụ, phường Bắc Giang, tỉnh Bắc Ninh.
                </span>
              </p>
            </div>
          </div>

          <div className="footer-right">
            <p className="footer-notice">
              Đăng ký nhận thông tin mới nhất từ VTGROUP
            </p>

            <form className="footer-form" onSubmit={handleSubmit}>
              <img className="footer-form-decor-1" src={FORM_DECOR_2} alt="" />
              <img className="footer-form-decor-2" src={FORM_DECOR_1} alt="" />

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
              Copyright © VTGROUP . All rights reserved
            </p>
          </div>

          <p className="footer-copyright footer-copyright-mobile">
            Copyright © VTGROUP . All rights reserved
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;