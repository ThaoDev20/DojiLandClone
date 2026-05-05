import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ProjectPageHero.css';

const categories = [
    {
        label: 'Bất động sản nghỉ dưỡng',
        href: '/bat-dong-san-nghi-duong',
    },
    {
        label: 'Bất động sản nhà ở',
        href: '/bat-dong-san-nha-o',
    },
    {
        label: 'Bất động sản văn phòng',
        href: '/bat-dong-san-van-phong',
    },
    {
        label: 'Khu đô thị',
        href: '/khu-do-thi',
    },
];

const ProjectPageHero = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const location = useLocation();


    const activeCategory = useMemo(() => {
        const currentPath = location.pathname.replace(/\/$/, '');

        return (
            categories.find((category) => {
                const categoryPath = category.href.replace(/\/$/, '');
                return currentPath === categoryPath || currentPath.startsWith(`${categoryPath}/`);
            }) || categories[0]
        );
    }, [location.pathname]);

    const handleChooseCategory = () => {
        setIsMobileNavOpen(false);
    };

    return (
        <section className="project-page-section">
            <div className="project-page-banner">
                <img
                    className="project-banner-decor"
                    src="https://dojiland.vn/wp-content/themes/main/assets/images/common/banner_decor.png"
                    alt=""
                />

                <img
                    className="project-banner-bg"
                    src="https://dojiland.vn/wp-content/uploads/2023/07/list-tin.jpg"
                    alt="Dự án"
                />

                <div className="project-banner-intro">
                    <div className="project-banner-mask">
                        <div className="project-banner-decor-bg" />
                    </div>

                    <div className="project-breadcrumb">
                        <Link to="/">Trang chủ</Link>
                        <span>/</span>
                        <span>Dự án</span>
                    </div>

                    <h1>Dự án</h1>
                </div>
            </div>

            <div className="project-media-nav">
                <div className="project-category-nav">
                    <button
                        type="button"
                        className={`project-category-mobile ${isMobileNavOpen ? 'active' : ''}`}
                        onClick={() => setIsMobileNavOpen((prev) => !prev)}
                    >
                        <span>{activeCategory.label}</span>
                    </button>

                    <div className={`project-category-list ${isMobileNavOpen ? 'active' : ''}`}>
                        {categories.map((category) => (
                            <Link
                                key={category.href}
                                to={category.href}
                                className={`project-category-item ${activeCategory.href === category.href ? 'active' : ''
                                    }`}
                                onClick={() => handleChooseCategory(category)}
                            >
                                <span>{category.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="project-category-desc">
                    <p>
                        DOJILAND ghi dấu ấn tại thị trường bởi hàng loạt dự án bất động sản
                        nổi bật, được khách hàng, giới chuyên môn và thị trường quan tâm và
                        đánh giá cao.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProjectPageHero;