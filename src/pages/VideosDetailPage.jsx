import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Button from '../components/Button';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

const VideosDetailPage = () => {
    const { id } = useParams();
    const { news } = useData();
    const navigate = useNavigate();
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        if (news.length > 0) {
            const item = news.find(n => n.id.toString() === id);
            if (item) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setNewsItem(item);
            } else {
                // If not found, maybe redirect or show error
                // navigate('/tin-tuc');
            }
        }
    }, [id, news, navigate]);

    if (!newsItem) {
        return (
            <div className="container section text-center">
                <h2>Không tìm thấy tin tức</h2>
                <Button to="/tin-du-an">Quay lại danh sách</Button>
            </div>
        );
    }

    return (
        <div className="news-detail-page">
            <div className="news-hero">
                <div className="container">
                    <Button to="/tin-du-an" variant="outline" className="back-btn">
                        <ArrowLeft size={16} style={{ marginRight: 5 }} /> Quay lại
                    </Button>
                    <h1 className="news-title">{newsItem.title}</h1>
                    <div className="news-meta">
                        <span className="meta-item"><Calendar size={16} /> {newsItem.date}</span>
                        <span className="meta-item"><User size={16} /> Admin</span>
                        <span className="meta-item"><Tag size={16} /> Tin tức</span>
                    </div>
                </div>
            </div>

            <div className="container section news-content-wrapper">
                <div className="news-main-content">
                    {newsItem.image && (
                        <div className="news-feature-image">
                            <img src={newsItem.image} alt={newsItem.title} />
                        </div>
                    )}

                    <div className="content-body">
                        <p className="excerpt">{newsItem.excerpt}</p>
                        <div className="full-content" dangerouslySetInnerHTML={{ __html: newsItem.content.replace(/\n/g, '<br/>') }} />
                    </div>
                </div>

                <div className="news-sidebar">
                    <h3>Tin tức khác</h3>
                    <div className="sidebar-list">
                        {news.filter(n => n.id !== newsItem.id).slice(0, 5).map(item => (
                            <Link to={`/tin-tuc/${item.id}`} key={item.id} className="sidebar-item">
                                <div className="sidebar-item-image">
                                    <img src={item.image || 'https://via.placeholder.com/100'} alt={item.title} />
                                </div>
                                <div className="sidebar-item-info">
                                    <h4>{item.title}</h4>
                                    <span>{item.date}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .news-detail-page {
                    background: #fff;
                    margin-top: 5rem;
                }
                .news-hero {
                    background: #f8fafc;
                    padding: 3rem 0;
                    border-bottom: 1px solid #e2e8f0;
                }
                .back-btn {
                    margin-bottom: 1.5rem;
                    display: inline-flex;
                    align-items: center;
                }
                .news-title {
                    font-size: 2.5rem;
                    color: var(--text-color);
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }
                .news-meta {
                    display: flex;
                    gap: 1.5rem;
                    color: var(--text-light);
                    font-size: 0.9rem;
                }
                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .news-content-wrapper {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 3rem;
                }
                .news-feature-image img {
                    width: 100%;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                }
                .excerpt {
                    font-size: 1.2rem;
                    font-weight: 500;
                    color: var(--text-secondary);
                    margin-bottom: 2rem;
                    font-style: italic;
                    border-left: 4px solid var(--primary-color);
                    padding-left: 1rem;
                }
                .full-content {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: var(--text-color);
                }
                .news-sidebar h3 {
                    margin-bottom: 1.5rem;
                    border-bottom: 2px solid var(--primary-color);
                    display: inline-block;
                    padding-bottom: 5px;
                }
                .sidebar-item {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 1.5rem;
                    text-decoration: none;
                    color: inherit;
                    transition: transform 0.2s;
                }
                .sidebar-item:hover {
                    transform: translateX(5px);
                }
                .sidebar-item-image {
                    width: 80px;
                    height: 80px;
                    flex-shrink: 0;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .sidebar-item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .sidebar-item-info h4 {
                    font-size: 1rem;
                    margin-bottom: 5px;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .sidebar-item-info span {
                    font-size: 0.8rem;
                    color: var(--text-light);
                }
                @media (max-width: 768px) {
                    .news-content-wrapper {
                        grid-template-columns: 1fr;
                    }
                    .news-title {
                        font-size: 1.8rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default VideosDetailPage;
