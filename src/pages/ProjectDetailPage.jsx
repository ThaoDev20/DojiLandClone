import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';
import { MapPin, Building, Ruler, Calendar, CheckSquare, Phone } from 'lucide-react';
import Button from '../components/Button';
import InterestForm from '../components/home/InterestForm';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
    const { slug } = useParams();
    const { projects, isLoading } = useData();
    const { openModal } = useModal();

    // Normalize slug to handle encoding issues
    const normalizedSlug = slug?.toLowerCase().trim();

    // Find project by slug with normalization
    const project = projects.find(p => p.slug?.toLowerCase().trim() === normalizedSlug);

    // Debug logging (remove in production)
    React.useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
        
        if (!project && !isLoading) {
            console.warn('Project not found for slug:', normalizedSlug);
            console.log('Available slugs:', projects.map(p => p.slug));
            console.log('Total projects:', projects.length);
        } else if (project) {
            console.log('Project loaded:', project.name);
        }
    }, [project, normalizedSlug, projects, isLoading]);

    // Show loading state while data is being fetched
    if (isLoading) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', color: '#666' }}>Đang tải dữ liệu dự án...</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container not-found" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>Không tìm thấy dự án</h2>
                <p style={{ margin: '20px 0', color: '#666' }}>Slug: {slug}</p>
                <Button to="/" variant="primary" style={{ marginRight: '10px' }}>Quay lại trang chủ</Button>
                <Button to="/danh-sach-du-an" variant="secondary">Xem danh sách dự án</Button>
            </div>
        );
    }

    const handleRegister = () => {
        openModal('register', { project });
    };

    return (
        <div className="project-detail-page">
            {/* 1. Header Info */}
            <section className="project-header">
                <div className="container">
                    <div className="header-grid">
                        <div className="header-image">
                            <img 
                                src={project.image} 
                                alt={project.name} 
                                loading="eager"
                                decoding="async"
                            />
                            <span className={`status-badge status-${project.status}`}>{project.statusLabel}</span>
                        </div>
                        <div className="header-info">
                            <h1 className="project-title">{project.name}</h1>
                            <div className="project-meta">
                                <div className="meta-item">
                                    <MapPin size={18} /> <span>{project.location}</span>
                                </div>
                                <div className="meta-item price-tag">
                                    Giá: {project.price}
                                </div>
                            </div>

                            <div className="info-table">
                                <div className="table-row">
                                    <span className="label">Chủ đầu tư:</span>
                                    <span className="value">{project.investor}</span>
                                </div>
                                <div className="table-row">
                                    <span className="label">Quy mô:</span>
                                    <span className="value">{project.scale}</span>
                                </div>
                                <div className="table-row">
                                    <span className="label">Pháp lý:</span>
                                    <span className="value">{project.legal}</span>
                                </div>
                                <div className="table-row">
                                    <span className="label">Bàn giao:</span>
                                    <span className="value">{project.handover}</span>
                                </div>
                            </div>

                            <div className="header-actions">
                                <Button onClick={handleRegister} variant="primary" className="w-full">
                                    Đăng ký nhận hồ sơ
                                </Button>
                                <Button onClick={() => window.open('tel:0914824825')} variant="outline" className="w-full">
                                    <Phone size={18} style={{ marginRight: 8 }} /> Hotline tư vấn
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Overview & Design */}
            <section className="section bg-white">
                <div className="container">
                    <h2 className="section-title">Tổng quan dự án</h2>
                    <p className="project-description">{project.description}</p>

                    {/* Image Gallery */}
                    {project.projectImages && Array.isArray(project.projectImages) && project.projectImages.length > 0 && (
                        <div className="project-gallery">
                            <h3 className="sub-title">Hình ảnh dự án</h3>
                            <div className="gallery-grid">
                                {project.projectImages.map((url, index) => (
                                    <div key={index} className="gallery-item">
                                        <img 
                                            src={url} 
                                            alt={`${project.name} - ${index + 1}`} 
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <h3 className="sub-title">Tiện ích nổi bật</h3>
                    <ul className="amenities-list">
                        {project.amenities && Array.isArray(project.amenities) && project.amenities.map((item, idx) => (
                            <li key={idx}><CheckSquare size={16} color="var(--primary-color)" /> {item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 3. Location Analysis */}
            <section className="section location-section">
                <div className="container">
                    <h2 className="section-title">Vị trí & Liên kết vùng</h2>
                    <div className="location-grid">
                        <div className="location-info">
                            <p><strong>Phía Đông:</strong> {project.locationAnalysis_east}</p>
                            <p><strong>Phía Tây:</strong> {project.locationAnalysis_west}</p>
                            <p><strong>Phía Nam:</strong> {project.locationAnalysis_south}</p>
                            <p><strong>Phía Bắc:</strong> {project.locationAnalysis_north}</p>
                            <p className="highlight-box">{project.locationAnalysis_connection}</p>
                        </div>
                        <div className="location-map-wrapper">
                            {project.mapEmbedUrl ? (
                                <iframe
                                    src={project.mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            ) : (
                                <div className="location-map-placeholder">
                                    <span>Chưa cập nhật bản đồ</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Policy - Static for now */}
            <section className="section bg-white">
                <div className="container">
                    <h2 className="section-title">Chính sách & Tiến độ thanh toán</h2>
                    <div className="policy-block">
                        <p>Dự án được hỗ trợ vay vốn gói tín dụng ưu đãi cho NOXH.</p>
                        <p>Tiến độ thanh toán linh hoạt chia làm 7-8 đợt.</p>
                        <p><em>(Liên hệ để nhận bảng tiến độ chi tiết)</em></p>
                    </div>
                </div>
            </section>

            {/* 5. CTA Form */}
            <InterestForm />
        </div>
    );
};

export default ProjectDetailPage;
