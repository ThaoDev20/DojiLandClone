import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="contact-page" style={{marginTop:'100px' }}>
            <div className="container section">
                <h1 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Liên hệ với chúng tôi</h1>

                <div className="contact-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem', textAlign: 'center' }}>
                    <div className="info-box">
                        <Phone size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                        <h3>Hotline</h3>
                        <p className="text-large" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>0845.668.386</p>
                    </div>
                    <div className="info-box">
                        <Mail size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                        <h3>Email</h3>
                        <p>tamthanhlandvn@gmail.com</p>
                    </div>
                    <div className="info-box">
                        <MapPin size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                        <h3>Văn phòng</h3>
                        <p>Số 59 đường Lê Hồng Phong, Phường Bắc Giang, Tỉnh Bắc Ninh</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
