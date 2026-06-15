import React from 'react';
import { useData } from '../context/DataContext';
import './ProjectHotPage.css';

const ProjectHotPage = () => {
    const { projects, isLoading } = useData();

    const firstProjectTitleRef = React.useRef(null);

    React.useEffect(() => {
        if (isLoading || !projects?.length || !firstProjectTitleRef.current) return;

        const scrollToFirstTitle = () => {
            const titleEl = firstProjectTitleRef.current;

            const headerEl =
                document.querySelector('.header') ||
                document.querySelector('header');

            const headerHeight = headerEl?.offsetHeight || 90;
            const extraGap = 100;

            const titleTop =
                titleEl.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: titleTop - headerHeight - extraGap,
                behavior: 'auto',
            });
        };

        requestAnimationFrame(() => {
            requestAnimationFrame(scrollToFirstTitle);
        });
    }, [isLoading, projects]);

    React.useEffect(() => {
        const elements = document.querySelectorAll(
            '.project-reveal, .project-flip, .project-card'
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    } else {
                        entry.target.classList.remove('is-visible');
                    }
                });
            },
            {
                threshold: 0.18,
                rootMargin: '0px 0px -8% 0px',
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }, [projects]);


    if (isLoading) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', color: '#666' }}>
                    Đang tải dữ liệu dự án...
                </div>
            </div>
        );
    }

    if (!projects?.length) {
        return (
            <div className="container not-found" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>Chưa có dự án nào</h2>
            </div>
        );
    }

    return (
        <section className="project-intro">
            <div
                className="project-hero"
                style={{ backgroundImage: `url(${projects[0]?.image})` }}
            >
                <h1>Dự án nổi bật</h1>
            </div>

            <div className="project-list">
                {projects.map((project, index) => {
                    const mainImage = project.projectImages?.[0] || project.image;

                    const overviewItems = [
                        ['Tên dự án', project.name],
                        ['Vị trí', project.location],
                        ['Mức giá', project.price],
                        ['Diện tích', project.area],
                        ['Chủ đầu tư', project.investor],
                        ['Quy mô', project.scale],
                        ['Đơn vị thiết kế', project.designUnit],
                        ['Đơn vị thi công', project.constructionUnit],
                        ['Pháp lý', project.legal],
                        ['Bàn giao', project.handover],
                        ['Tiện ích', project.amenities?.join(' | ')],
                    ];

                    return (
                        <article
                            className="project-card"
                            key={project.id || project.slug || index}
                        >
                            <h2
                                ref={index === 0 ? firstProjectTitleRef : null}
                                className="project-title">
                                <span>{project.name}</span>
                                {project.statusLabel && <em>{project.statusLabel}</em>}
                            </h2>

                            <div className="project-grid">
                                <div className="project-content project-reveal">
                                    <h3>Tổng quan dự án</h3>

                                    {overviewItems.map(([label, value]) =>
                                        value ? (
                                            <p key={label}>
                                                <strong>{label}:</strong> {value}
                                            </p>
                                        ) : null
                                    )}
                                </div>

                                <div className="project-image project-reveal">
                                    <img src={mainImage} alt={project.name} />
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default ProjectHotPage;