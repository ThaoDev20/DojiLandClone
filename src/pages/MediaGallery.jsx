import React, { useEffect, useMemo, useState } from 'react';
import './MediaGallery.css';

const mediaItems = [
    {
        id: 222,
        type: 'image',
        title: 'SOLFOREST - Nhà trong Vườn, Vườn trong mây',
        image:
            'https://ecopark.com.vn/images/gallery/2023/06/27/resize_home/351108925_2843611302436818_5505970865256659562_n_1687848852.jpg',
    },
    {
        id: 221,
        type: 'image',
        title: 'Ngày hội hái xoài Ecopark 2023',
        image:
            'https://ecopark.com.vn/images/gallery/2023/06/20/resize_home/img_7583_1687229569.jpg',
    },
    {
        id: 220,
        type: 'video',
        title: 'Hoa Muồng Anh Đào 2023',
        image:
            'https://ecopark.com.vn/images/gallery/2023/05/30/resize_home/screenshot-2023-05-30-at-110245_1685421139.jpg',
        videoUrl: 'https://www.youtube.com/',
    },
    {
        id: 219,
        type: 'image',
        title: 'Muồng Anh Đào 2023',
        image:
            'https://ecopark.com.vn/images/gallery/2023/05/30/resize_home/ảnh_viber_2023-05-29_09-10-02-743_1685415730.jpg',
    },
    {
        id: 218,
        type: 'image',
        title: 'Hello Summer',
        image:
            'https://ecopark.com.vn/images/gallery/2023/05/30/resize_home/ảnh_viber_2023-05-21_14-35-41-383_1685411388.jpg',
    },
    {
        id: 217,
        type: 'image',
        title: 'Đồi hoa hướng dương 2023',
        image:
            'https://ecopark.com.vn/images/gallery/2023/05/19/resize_home/347549627_163610403321934_4570428950943103758_n_1684487814.jpg',
    },
    {
        id: 216,
        type: 'image',
        title: 'Bên đồng cỏ lau',
        image:
            'https://ecopark.com.vn/images/gallery/2023/04/10/resize_home/e13663b76c6db033e97c_1681099074.jpg',
    },
    {
        id: 215,
        type: 'image',
        title: 'Ecoband',
        image:
            'https://ecopark.com.vn/images/gallery/2023/03/29/resize_home/fcd8570f945648081147_1680057976.jpg',
    },
    {
        id: 214,
        type: 'image',
        title: 'Tớ có hẹn với thiên nhiên',
        image:
            'https://ecopark.com.vn/images/gallery/2023/04/03/resize_home/my-project_1680500158.jpg',
    },
    {
        id: 213,
        type: 'image',
        title: 'Camping',
        image:
            'https://ecopark.com.vn/images/gallery/2023/03/28/resize_home/_la_4658_1680022425.jpg',
    },
];

const displayOrder = [216, 213, 222, 215, 214, 221, 220, 219, 218, 217];

const MediaGallery = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedMedia, setSelectedMedia] = useState(null);

    const orderedItems = useMemo(() => {
        return displayOrder
            .map((id) => mediaItems.find((item) => item.id === id))
            .filter(Boolean);
    }, []);

    const visibleItems = useMemo(() => {
        if (!orderedItems.length) return [];

        return Array.from({ length: 6 }, (_, index) => {
            return orderedItems[(activeIndex + index) % orderedItems.length];
        });
    }, [orderedItems, activeIndex]);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % orderedItems.length);
        }, 4500);

        return () => clearInterval(timer);
    }, [orderedItems.length]);

    const handlePrev = () => {
        setActiveIndex((prev) => {
            return (prev - 1 + orderedItems.length) % orderedItems.length;
        });
    };

    const handleNext = () => {
        setActiveIndex((prev) => {
            return (prev + 1) % orderedItems.length;
        });
    };

    const closeModal = () => {
        setSelectedMedia(null);
    };

    return (
        <section className="media-gallery">
            <div className="media-gallery-container">
                <div className="media-gallery-header">
                    <div>
                        <h2 className="media-gallery-title">
                            <a href="/media">
                                <span>QUA ỐNG KÍNH</span>
                            </a>
                        </h2>

                        <p className="media-gallery-subtitle">
                            Không chỉ là một nơi để sống, mà đã hình thành một cách sống
                        </p>
                    </div>

                    <div className="media-gallery-controls">
                        <button
                            type="button"
                            className="media-gallery-nav"
                            onClick={handlePrev}
                            aria-label="Slide trước"
                        >
                            ‹
                        </button>

                        <button
                            type="button"
                            className="media-gallery-nav"
                            onClick={handleNext}
                            aria-label="Slide sau"
                        >
                            ›
                        </button>
                    </div>
                </div>

                <div className="media-gallery-slider">
                    <div className="media-gallery-slide">
                        {visibleItems.map((item, itemIndex) => (
                            <button
                                type="button"
                                className={`media-gallery-card media-gallery-card-${itemIndex + 1}`}
                                key={`${item.id}-${itemIndex}`}
                                onClick={() => setSelectedMedia(item)}
                            >
                                <img src={item.image} alt={item.title} />

                                {item.type === 'video' && (
                                    <span className="media-gallery-play">▶</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {selectedMedia && (
                <div className="media-gallery-modal" onClick={closeModal}>
                    <div
                        className="media-gallery-modal-content"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="media-gallery-close"
                            onClick={closeModal}
                            aria-label="Đóng"
                        >
                            Đóng
                        </button>

                        {selectedMedia.type === 'video' ? (
                            <iframe
                                src={selectedMedia.videoUrl}
                                title={selectedMedia.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        ) : (
                            <img src={selectedMedia.image} alt={selectedMedia.title} />
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default MediaGallery;