import React from "react";
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";

const NewsPage = () => {
    const { visibleNews: news } = useData();

    const formatNewsDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const truncateText = (text, maxLength = 150) => {
        if (!text) return "";

        const cleanText = String(text).trim();

        if (cleanText.length <= maxLength) return cleanText;

        const sliced = cleanText.slice(0, maxLength);
        const lastSpaceIndex = sliced.lastIndexOf(" ");

        if (lastSpaceIndex === -1) return sliced + "[...]";

        return sliced.slice(0, lastSpaceIndex).trim() + " [...]";
    };

    return (
        <div className="news-page section" style={{marginTop:'100px'}}>
            <div className="container">
                <div className="section-header text-center">
                    <h1 className="section-title">Tin tức & Sự kiện</h1>
                    <p className="section-subtitle">
                        Cập nhật những thông tin mới nhất về thị trường BĐS và tiến độ dự án
                    </p>
                </div>

                {news && news.length > 0 ? (
                    <div className="news-list-layout">
                        <Link to={`/tin-du-an/${news[0].id}`} className="news-featured-row">
                            <div className="news-featured-image">
                                <img
                                    src={news[0].image || "https://placehold.co/800x500"}
                                    alt={news[0].title}
                                />
                            </div>

                            <div className="news-featured-content">
                                <div>
                                    <h2>{news[0].title}</h2>
                                    <span>{formatNewsDate(news[0].date)}</span>
                                    <p>{truncateText(news[0].content, 150)}</p>
                                </div>
                            </div>
                        </Link>

                        <div className="news-normal-list">
                            {news.slice(1).map((item) => (
                                <Link
                                    to={`/tin-du-an/${item.id}`}
                                    key={item.id}
                                    className="news-normal-row"
                                >
                                    <div className="news-normal-image">
                                        <img
                                            src={item.image || "https://via.placeholder.com/400x300"}
                                            alt={item.title}
                                        />
                                    </div>

                                    <div className="news-normal-content">
                                        <h3>{item.title}</h3>
                                        <span>{formatNewsDate(item.date)}</span>
                                        <p>{truncateText(item.content, 150)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>Hiện chưa có tin tức nào được cập nhật.</p>
                    </div>
                )}
            </div>

            <style jsx>{`
        .news-list-layout {
          width: 100%;
        }

        .news-featured-row,
        .news-normal-row {
          display: grid;
          grid-template-columns: 55% 45%;
          gap: 30px;
          text-decoration: none;
          color: inherit;
        }

        .news-featured-row {
          margin-bottom: 32px;
        }

        .news-featured-image,
        .news-normal-image {
          overflow: hidden;
          background: #f2f2f2;
          border-radius: 12px;
        }

        .news-featured-image img,
        .news-normal-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .news-featured-image {
          height: 320px;
        }

        .news-featured-content {
          padding-top: 6px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .news-featured-content h2 {
          margin: 0 0 12px;
          font-size: 24px;
          font-weight: 500;
          line-height: 1.35;
          color: #1f5fa8;
          text-transform: uppercase;
        }

        .news-featured-content p,
        .news-normal-content p {
          margin: 0;
          font-size: 15px;
          line-height: 1.6;
          color: #24364b;
        }

        .news-featured-content span,
        .news-normal-content span {
          display: block;
          margin-bottom: 10px;
          font-size: 14px;
          color: #777;
        }

        .news-normal-list {
          border-top: 1px solid #d8dee8;
        }

        .news-normal-row {
          grid-template-columns: 350px 1fr;
          gap: 30px;
          padding: 30px 0;
          border-bottom: 1px solid #d8dee8;
        }

        .news-normal-image {
          height: 185px;
        }

        .news-normal-content {
          max-width: 500px;
        }

        .news-normal-content h3 {
          margin: 0 0 10px;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.4;
          color: #000;
        }

        .news-normal-content span {
          margin-bottom: 10px;
        }

        .news-featured-row:hover h2,
        .news-normal-row:hover h3 {
          color: #1f5fa8;
        }

        @media (max-width: 768px) {
          .news-list-layout {
            padding: 0 12px;
            box-sizing: border-box;
          }

          .news-featured-row,
          .news-normal-row {
            display: block;
            width: 100%;
          }

          .news-featured-row {
            margin-bottom: 24px;
          }

          .news-featured-image,
          .news-normal-image {
            width: 100%;
            height: 210px;
            border-radius: 10px;
          }

          .news-featured-content,
          .news-normal-content {
            max-width: 100%;
            padding-top: 12px;
          }

          .news-featured-content h2 {
            margin-bottom: 8px;
            font-size: 19px;
            line-height: 1.4;
          }

          .news-normal-content h3 {
            margin-bottom: 8px;
            font-size: 18px;
            line-height: 1.4;
          }

          .news-featured-content p,
          .news-normal-content p {
            font-size: 14px;
            line-height: 1.55;
          }

          .news-featured-content span,
          .news-normal-content span {
            margin-top: 12px;
            font-size: 13px;
          }

          .news-normal-list {
            border-top: 1px solid #d8dee8;
          }

          .news-normal-row {
            padding: 22px 0;
          }
        }

        @media (max-width: 480px) {
          .news-featured-image,
          .news-normal-image {
            height: 185px;
          }

          .news-list-layout {
            padding: 0 8px;
          }
        }
      `}</style>
        </div>
    );
};

export default NewsPage;
