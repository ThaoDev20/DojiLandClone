import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import InterestForm from '../components/home/InterestForm';
import Button from '../components/Button';
import './ProvincePage.css';
import { useData } from '../context/DataContext';

const ProvincePage = () => {
    const { slug } = useParams();
    const { settings, projects: allProjects, isLoading, provinces } = useData();

    // Normalize slug
    const normalizedSlug = slug?.toLowerCase().trim();

    const province = provinces.find(p => p.id?.toLowerCase().trim() === normalizedSlug);
    const provinceProjects = allProjects.filter(p => p.province?.toLowerCase().trim() === normalizedSlug && p.isVisible !== false);

    // Debug logging
    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);

        if (!province && !isLoading) {
            console.warn('Province not found for slug:', normalizedSlug);
            console.log('Available province IDs:', provinces.map(p => p.id));
        } else if (province) {
            console.log('Province loaded:', province.name);
        }
    }, [province, normalizedSlug, isLoading]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', color: '#666' }}>Đang tải dữ liệu...</div>
            </div>
        );
    }

    if (!province) {
        return (
            <div className="container not-found" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>Không tìm thấy thông tin tỉnh thành này</h2>
                <p style={{ margin: '20px 0', color: '#666' }}>Slug: {slug}</p>
                <Button to="/" variant="primary">Quay lại trang chủ</Button>
            </div>
        );
    }

    const bannerStyle = settings?.provinceBanners?.[slug]
        ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${settings.provinceBanners[slug]})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : {backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${settings.defaultProvinceBanner})`, backgroundSize: 'cover', backgroundPosition: 'center' };

    return (
        <div className="province-page">
            {/* Hero */}
            <section className="province-hero" style={bannerStyle}>
                <div className="container">
                    <h1 className="province-title">Nhà ở xã hội tại {province.name}</h1>
                    <p className="province-desc">{province.description}</p>
                    <div className="province-actions">
                        <Button to="#danh-sach" variant="primary">Danh sách dự án</Button>
                    </div>
                </div>
            </section>

            {/* Market Overview */}
            <section className="section province-market">
                <div className="container">
                    <h2 className="section-title">Tổng quan thị trường {province.name}</h2>
                    <div className="market-card">
                        <p>{province.marketInfo}</p>
                        <p>Hiện tại có <strong>{provinceProjects.length}</strong> dự án đang được quan tâm tại khu vực này.</p>
                    </div>
                </div>
            </section>

            {/* Project List */}
            <section className="section province-projects" id="danh-sach">
                <div className="container">
                    <h2 className="section-title">Danh sách dự án tại {province.name}</h2>

                    {provinceProjects.length > 0 ? (
                        <div className="projects-grid">
                            {provinceProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>Hiện chưa có dự án nào được cập nhật tại khu vực này.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Form could be reused or slightly modified to pre-fill province */}
            <div className="section-divider"></div>
            <InterestForm />
        </div>
    );
};

export default ProvincePage;
