import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import './ContactPage.css';

const CONTACT_HERO_IMAGE =
  'https://ecopark.com.vn/images/slideshow/2020/09/10/original/group-353_1599751552.jpg';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', form);
  };

  return (
    <main className="contact-page">
      <section
        className="contact-hero"
        style={{ backgroundImage: `url(${CONTACT_HERO_IMAGE})` }}
      >
        <h1>
          Thông tin
          <strong>Liên hệ</strong>
        </h1>
      </section>

      <section className="contact-section">
        <div className="contact-bg-left" />
        <div className="contact-bg-right" />

        <div className="contact-wrapper">
          <div className="contact-info">
            <h2 className="contact-title">
              CÔNG TY CP VTGROUP
            </h2>

            <div className="contact-list">
              <div className="contact-item">
                <Phone className="contact-icon" size={22} strokeWidth={1.8} />
                <div className="contact-label">Điện thoại:</div>
                <div className="contact-value">024 3366 2288</div>
              </div>

              <div className="contact-item">
                <Mail className="contact-icon" size={22} strokeWidth={1.8} />
                <div className="contact-label">Email:</div>
                <div className="contact-value">vithacobg@gmail.com</div>
              </div>

              <div className="contact-item contact-address">
                <MapPin className="contact-icon" size={22} strokeWidth={1.8} />
                <div className="contact-label">Địa chỉ:</div>
                <div className="contact-value">
                  Tòa nhà đa năng Việt Thắng, đường Hoàng Văn Thụ, phường Bắc Giang,
                  tỉnh Bắc Ninh.
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-box">
            <p className="contact-desc">
              Để biết thêm nhiều thông tin hữu ích, Quý khách hàng vui lòng liên hệ
              với VTGROUP qua điện thoại, email hoặc điền vào mẫu thông tin bên dưới.
              <br />
              Trân trọng cảm ơn!
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên*"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại*"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />

              <textarea
                name="content"
                placeholder="Nội dung"
                value={form.content}
                onChange={handleChange}
                rows={5}
              />

              <button type="submit" className="contact-submit">
                GỬI THÔNG TIN
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;