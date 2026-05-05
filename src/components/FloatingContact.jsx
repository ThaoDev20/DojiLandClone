import React from 'react';
import { Phone, MessageCircle, Facebook } from 'lucide-react';
import './FloatingContact.css';

const FloatingContact = () => {
    return (
        <div className="floating-contact">
            {/* Zalo */}
            <a
                href="https://zalo.me/0845668386"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn zalo-btn"
                title="Chat Zalo"
            >
                <span className="btn-icon">
                    <img
                        src="/icons/zalo.png"
                        alt="Zalo"
                        width="30"
                        height="30"
                    />
                </span>
                 <span className="btn-label">Tư vấn Zalo</span>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/tamthanhland.vn" target="_blank" rel="noopener noreferrer" className="contact-btn messenger-btn" title="Chat Facebook">
                <Facebook size={24} />
                <span className="btn-label">Messenger</span>
            </a>

            {/* Phone */}
            <a href="tel:0845668386" className="contact-btn phone-btn" title="Gọi ngay">
                <div className="phone-animation">
                    <Phone size={24} />
                </div>
                <span className="btn-label">0845.668.386</span>
            </a>
        </div>
    );
};

export default FloatingContact;
