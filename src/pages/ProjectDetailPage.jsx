import React from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Button from '../components/Button';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
    const { slug } = useParams();
    const { projects, isLoading } = useData();

    const [activeAmenityIndex, setActiveAmenityIndex] = React.useState(0);

    const normalizedSlug = slug?.toLowerCase().trim();

    const project = projects.find(p => p.slug?.toLowerCase().trim() === normalizedSlug);

    const amenityImages = project.projectImages?.length
        ? project.projectImages
        : project.image
            ? [project.image]
            : [];

    const currentAmenityImage = amenityImages[activeAmenityIndex];

    const currentAmenityName =
        project.amenities?.[activeAmenityIndex] || 'Tiện ích';

    const handlePrevAmenity = () => {
        setActiveAmenityIndex(prev =>
            prev === 0 ? amenityImages.length - 1 : prev - 1
        );
    };

    const handleNextAmenity = () => {
        setActiveAmenityIndex(prev =>
            prev === amenityImages.length - 1 ? 0 : prev + 1
        );
    };

    const mainImage = project.projectImages?.[0] || project.image;
    const secondImage = project.projectImages?.[1] || project.image;

    const overviewItems = [
        ["Tên dự án", project.name],
        ["Vị trí", project.location],
        ["Mức giá", project.price],
        ["Diện tích", project.area],
        ["Chủ đầu tư", project.investor],
        ["Quy mô", project.scale],
        ["Đơn vị thiết kế", project.designUnit],
        ["Đơn vị thi công", project.constructionUnit],
        ["Pháp lý", project.legal],
        ["Bàn giao", project.handover],
        ["Tiện ích", project.amenities?.join(" | ")],
    ];

    const locationItems = [
        ["Phía Đông", project.locationAnalysis_east],
        ["Phía Tây", project.locationAnalysis_west],
        ["Phía Nam", project.locationAnalysis_south],
        ["Phía Bắc", project.locationAnalysis_north],
        ["Kết nối", project.locationAnalysis_connection],
    ];



    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!project && !isLoading) {
            console.warn('Project not found for slug:', normalizedSlug);
            console.log('Available slugs:', projects.map(p => p.slug));
            console.log('Total projects:', projects.length);
        } else if (project) {
            console.log('Project loaded:', project.name);
        }
    }, [project, normalizedSlug, projects, isLoading]);

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

    return (
        <section className="project-intro">
            <div
                className="project-hero"
                style={{ backgroundImage: `url(${project.image})` }}
            >
                <h1>Sản phẩm đang giới thiệu</h1>
            </div>

            <div className="project-detail">
                <h2 className="project-title">
                    <span>{project.name}</span>
                    {project.statusLabel && <em>{project.statusLabel}</em>}
                </h2>

                <div className="project-grid">
                    <div className="project-content">
                        <h3>Tổng quan dự án</h3>

                        {overviewItems.map(([label, value]) =>
                            value ? (
                                <p key={label}>
                                    <strong>{label}:</strong> {value}
                                </p>
                            ) : null
                        )}
                    </div>

                    <div className="project-image">
                        <img src={mainImage} alt={project.name} />
                    </div>

                    <div className="project-image">
                        <img src={secondImage} alt={`Vị trí ${project.name}`} />
                    </div>

                    <div className="project-content project-location">
                        <h3>Vị trí</h3>

                        {locationItems.map(([label, value]) =>
                            value ? (
                                <p key={label}>
                                    <strong>{label}:</strong> {value}
                                </p>
                            ) : null
                        )}
                    </div>
                </div>
                {amenityImages.length > 0 && (
                    <div className="project-amenities">
                        <p className="project-amenities-title">Tiện ích</p>

                        <div className="project-amenities-slider">
                            <img
                                src={currentAmenityImage}
                                alt={`${currentAmenityName} - ${project.name}`}
                            />

                            <div className="project-amenities-overlay">
                                <p className="project-amenities-label">Tiện ích</p>
                                <p className="project-amenities-name">{currentAmenityName}</p>
                            </div>

                            <div className="project-amenities-control">
                                <button
                                    type="button"
                                    className="project-amenities-arrow"
                                    onClick={handlePrevAmenity}
                                >
                                    ‹
                                </button>

                                <span className="project-amenities-count">
                                    {activeAmenityIndex + 1}/{amenityImages.length}
                                </span>

                                <button
                                    type="button"
                                    className="project-amenities-arrow"
                                    onClick={handleNextAmenity}
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectDetailPage;
