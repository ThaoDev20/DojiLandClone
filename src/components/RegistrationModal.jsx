import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { submitRegistration } from '../services/formSubmission';
import Button from './Button';
import './RegistrationModal.css';
import { useData } from '../context/DataContext';

const RegistrationModal = () => {
    const { isModalOpen, modalContent, closeModal } = useModal();
    const [showSuccess, setShowSuccess] = useState(false);
    const { provinces } = useData();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        province: '',
        demand: 'buy_live',
        notes: ''
    });

    useEffect(() => {
        if (isModalOpen && modalContent?.project) {
            const project = modalContent.project;
            setFormData(prev => {
                if (prev.province === project.province && prev.notes.includes(project.name)) {
                    return prev;
                }
                return {
                    ...prev,
                    province: project.province,
                    notes: `Quan tâm dự án: ${project.name}`
                };
            });
        }
        // Reset states when modal opens
        setShowSuccess(false);
        setError(null);
    }, [isModalOpen, modalContent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await submitRegistration(formData);
            setShowSuccess(true);

            // Auto close after 3 seconds
            setTimeout(() => {
                closeModal();
                setFormData({ name: '', phone: '', province: '', demand: 'buy_live', notes: '' });
                setShowSuccess(false);
            }, 7000);
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        closeModal();
        setShowSuccess(false);
    };

    if (!isModalOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={handleClose} aria-label="Đóng">
                    <X size={24} />
                </button>

                {!showSuccess ? (
                    <>
                        <div className="modal-header">
                            <div className="modal-icon">
                                <User size={32} />
                            </div>
                            <h2>Đăng ký nhận thông tin</h2>
                            {modalContent?.project && (
                                <p className="modal-subtitle">
                                    Dự án: <strong>{modalContent.project.name}</strong>
                                </p>
                            )}
                            <p className="modal-description">
                                Để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí
                            </p>
                        </div>

                        <form className="modal-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">
                                    <User size={18} />
                                    Họ và tên <span className="required">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nguyễn Văn A"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">
                                    <Phone size={18} />
                                    Số điện thoại <span className="required">*</span>
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    pattern="[0-9]{10}"
                                    placeholder="0912345678"
                                />
                            </div>

                            {!modalContent?.project && (
                                <div className="form-group">
                                    <label htmlFor="province">
                                        <MapPin size={18} />
                                        Tỉnh thành quan tâm
                                    </label>
                                    <select id="province" name="province" value={formData.province} onChange={handleChange}>
                                        <option value="">-- Chọn tỉnh --</option>
                                        {provinces.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="notes">
                                    <MessageSquare size={18} />
                                    Ghi chú
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Nhu cầu cụ thể, thời gian mong muốn..."
                                ></textarea>
                            </div>

                            {error && (
                                <div className="form-error" style={{
                                    padding: '12px',
                                    backgroundColor: '#fee',
                                    border: '1px solid #fcc',
                                    borderRadius: '8px',
                                    marginTop: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: '#c00'
                                }}>
                                    <AlertCircle size={20} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="modal-actions">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="modal-submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
                                </Button>
                                <p className="modal-note">
                                    Thông tin của bạn được bảo mật tuyệt đối
                                </p>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="modal-success">
                        <div className="success-icon">
                            <CheckCircle size={64} />
                        </div>
                        <h2>Đăng ký thành công!</h2>
                        <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                        <p className="success-subtext">Cảm ơn bạn đã quan tâm đến dự án của chúng tôi.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationModal;
