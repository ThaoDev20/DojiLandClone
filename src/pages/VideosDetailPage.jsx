import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import Button from "../components/Button";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

const VideoDetailPage = () => {
  const { id } = useParams();
  const { news } = useData();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    if (news.length > 0) {
      const item = news.find((n) => n.id.toString() === id);
      if (item) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNewsItem(item);
      } else {
        // If not found, maybe redirect or show error
        // navigate('/tin-tuc');
      }
    }
  }, [id, news, navigate]);
  const NEWS_HERO_IMAGE =
    "https://ecopark.com.vn/images/slideshow/2020/08/31/original/group-337_1598841872.jpg";
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
        <section
          className="news-hero"
          style={{ backgroundImage: `url(${NEWS_HERO_IMAGE})` }}
        >
          <h1>
            Tin tức <strong>Sự kiện</strong>
          </h1>
        </section>
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
            <div
              className="full-content"
              dangerouslySetInnerHTML={{
                __html: newsItem.content.replace(/\n/g, "<br/>"),
              }}
            />
          </div>
        </div>

        <div className="news-sidebar">
          <h3>Tin tức nổi bật</h3>
          <div className="sidebar-list">
            {news
              .filter((n) => n.id !== newsItem.id)
              .slice(0, 5)
              .map((item) => (
                <Link
                  to={`/tin-du-an/${item.id}`}
                  key={item.id}
                  className="sidebar-item"
                >
                  <div className="sidebar-item-image">
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.title}
                    />
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
        }
        .news-hero {
          position: relative;
          width: 100%;
          height: 560px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .news-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
        }

        .news-hero h1 {
          position: relative;
          z-index: 1;
          margin: 0;

          color: #fff;
          font-size: 38px;
          font-weight: 300;
          letter-spacing: 8px;
          text-transform: uppercase;
        }

        .news-hero h1 strong {
          display: block;
          margin-top: 6px;
          font-size: 42px;
          font-weight: 800;
          letter-spacing: 4px;
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
          .sidebar-item {
  display: flex;
  gap: 12px;
  padding: 14px 0;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.sidebar-item:last-child {
  border-bottom: none;
}
      `}</style>
    </div>
  );
};

export default VideoDetailPage;
