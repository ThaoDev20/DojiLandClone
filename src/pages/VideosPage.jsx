import React from "react";
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";
import "./NewsPage.css";

const NEWS_HERO_IMAGE =
  "https://ecopark.com.vn/images/slideshow/2020/08/31/original/group-337_1598841872.jpg";

const VideoPage = () => {
  const { visibleNews: news } = useData();

  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = React.useState(1);
  const newsSectionRef = React.useRef(null);

  const totalPages = Math.ceil((news?.length || 0) / ITEMS_PER_PAGE);

  const paginatedNews = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return news?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];
  }, [news, currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage(page);

    setTimeout(() => {
      newsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const formatNewsDate = (date) => {
    if (!date) return "";

    const value = new Date(date);

    const day = String(value.getDate()).padStart(2, "0");
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const year = value.getFullYear();
    const hour = String(value.getHours()).padStart(2, "0");
    const minute = String(value.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} | ${hour}:${minute}`;
  };

  React.useEffect(() => {
    const elements = document.querySelectorAll(".news-animate");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [paginatedNews]);

  const truncateText = (text, maxLength = 180) => {
    if (!text) return "";

    const cleanText = String(text).trim();
    if (cleanText.length <= maxLength) return cleanText;

    const sliced = cleanText.slice(0, maxLength);
    const lastSpaceIndex = sliced.lastIndexOf(" ");

    return `${sliced.slice(0, lastSpaceIndex).trim()} [...]`;
  };

  const getPaginationPages = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  return (
    <main className="news-page">
      <section
        className="news-hero"
        style={{ backgroundImage: `url(${NEWS_HERO_IMAGE})` }}
      >
        <h1>
          Tin tức <strong>Sự kiện</strong>
        </h1>
      </section>

      <section className="news-section" ref={newsSectionRef}>
        <div className="news-container">
          <h2 className="news-section-title">
            Tin tức <strong>Sự kiện</strong>
          </h2>

          {paginatedNews.length > 0 ? (
            <div className="news-list">
              <Link
                to={`/tin-du-an/${paginatedNews[0].id}`}
                className="news-featured news-animate"
              >
                <div className="news-featured-image">
                  <img
                    src={
                      paginatedNews[0].image || "https://placehold.co/900x520"
                    }
                    alt={paginatedNews[0].title}
                  />
                </div>

                <div className="news-featured-content">
                  <h3>{paginatedNews[0].title}</h3>
                  <span>{formatNewsDate(paginatedNews[0].date)}</span>
                </div>
              </Link>

              {paginatedNews.slice(1).map((item, index) => (
                <Link
                  key={item.id}
                  to={`/tin-du-an/${item.id}`}
                  className={`news-card news-animate ${index % 2 === 0 ? "is-reverse" : ""}`}
                >
                  <div className="news-card-image">
                    <img
                      src={item.image || "https://placehold.co/700x420"}
                      alt={item.title}
                    />
                  </div>

                  <div className="news-card-content">
                    <h3>{item.title}</h3>
                    <span>{formatNewsDate(item.date)}</span>
                    <p>{truncateText(item.content, 220)}</p>
                  </div>
                </Link>
              ))}

              {totalPages > 1 && (
                <div className="news-pagination">
                  {getPaginationPages().map((page) => (
                    <button
                      type="button"
                      key={page}
                      className={page === currentPage ? "active" : ""}
                      onClick={() => handleChangePage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="news-pagination-next"
                    disabled={currentPage === totalPages}
                    onClick={() => handleChangePage(currentPage + 1)}
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-state">
              <p>Hiện chưa có tin tức nào được cập nhật.</p>
            </div>
          )}
        </div>
        <style jsx>{`
          .news-page {
            width: 100%;
            background: #f7f3ea;
          }

          .news-page * {
            box-sizing: border-box;
          }

          /* ===== HERO ===== */

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
            text-transform: uppercase;
          }

          .news-hero h1 strong {
            display: block;
            margin-top: 6px;
            font-size: 42px;
            font-weight: 800;
          }

          /* ===== NEWS SECTION ===== */

          .news-section {
            padding: 58px 0 80px;
          }

          .news-container {
            max-width: 1250px;
            margin: 0 auto;
            padding: 0 40px;
          }

          .news-section-title {
            margin: 0 0 46px;

            color: #344432;
            font-size: 40px;
            font-weight: 300;
            line-height: 1.2;
            text-align: center;
            text-transform: uppercase;
          }

          .news-section-title strong {
            color: #244734;
            font-weight: 800;
          }

          .news-list {
            display: flex;
            flex-direction: column;
            gap: 54px;
          }

          /* ===== FEATURED NEWS ===== */

          .news-featured {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 58px;
            align-items: center;

            color: inherit;
            text-decoration: none;
          }

          .news-featured-image {
            height: 345px;
            overflow: hidden;
          }

          .news-featured-image img,
          .news-card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;

            transition: transform 0.35s ease;
          }

          .news-featured-content h3 {
            margin: 0 0 24px;

            color: #344432;
            font-size: 30px;
            font-weight: 800;
            line-height: 1.45;
          }

          .news-featured-content span,
          .news-card-content span {
            display: block;
            color: #344432;
            font-size: 16px;
          }

          /* ===== NORMAL NEWS ===== */

          .news-card {
            display: grid;
            grid-template-columns: 0.9fr 1.1fr;
            gap: 58px;
            align-items: center;

            color: inherit;
            text-decoration: none;
          }

          .news-card.is-reverse .news-card-image {
            order: 2;
          }

          .news-card.is-reverse .news-card-content {
            order: 1;
          }

          .news-card-image {
            height: 345px;
            overflow: hidden;
          }

          .news-card-content h3 {
            margin: 0 0 22px;

            color: #344432;
            font-size: 30px;
            font-weight: 800;
            line-height: 1.45;
          }

          .news-card-content p {
            margin: 22px 0 0;

            color: #222;
            font-family: "Times New Roman", serif;
            font-size: 18px;
            line-height: 1.55;
          }

          .news-featured:hover img,
          .news-card:hover img {
            transform: scale(1.04);
          }

          .news-featured:hover h3,
          .news-card:hover h3 {
            color: #1f5f45;
          }

          .empty-state {
            padding: 80px 20px;
            text-align: center;
            color: #344432;
            font-size: 18px;
          }

          /* ===== MOBILE ===== */

          @media (max-width: 900px) {
            .news-hero {
              height: 320px;
            }

            .news-hero h1 {
              font-size: 26px;
              text-align: center;
            }

            .news-hero h1 strong {
              font-size: 30px;
            }

            .news-section {
              padding: 42px 0 60px;
            }

            .news-container {
              padding: 0 18px;
            }

            .news-section-title {
              margin-bottom: 32px;
              font-size: 28px;
            }

            .news-list {
              gap: 36px;
            }

            .news-featured,
            .news-card {
              grid-template-columns: 1fr;
              gap: 18px;
            }

            .news-card.is-reverse .news-card-image,
            .news-card.is-reverse .news-card-content {
              order: initial;
            }

            .news-featured-image,
            .news-card-image {
              height: 240px;
            }

            .news-featured-content h3,
            .news-card-content h3 {
              margin-bottom: 12px;
              font-size: 22px;
              line-height: 1.35;
            }

            .news-featured-content span,
            .news-card-content span {
              font-size: 14px;
            }

            .news-card-content p {
              margin-top: 14px;
              font-size: 16px;
            }
          }

          @media (max-width: 480px) {
            .news-hero {
              height: 260px;
            }

            .news-section-title {
              font-size: 24px;
            }

            .news-featured-image,
            .news-card-image {
              height: 205px;
            }

            .news-featured-content h3,
            .news-card-content h3 {
              font-size: 20px;
            }

            .news-card-content p {
              font-size: 15px;
            }
          }

          /* ===== SCROLL REVEAL ANIMATION ===== */

          .news-animate {
            opacity: 0;
            transform: translateY(55px);
            transition:
              opacity 0.7s ease,
              transform 0.7s ease;
          }

          .news-animate.is-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .news-card.news-animate {
            transition-delay: 0.08s;
          }

          /* ===== PAGINATION ===== */

          .news-pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;

            margin-top: 20px;
            padding-top: 20px;
          }

          .news-pagination button {
            width: 42px;
            height: 42px;

            border: 1px solid #344432;
            background: transparent;
            color: #344432;

            font-size: 16px;
            font-weight: 700;
            cursor: pointer;

            transition:
              background 0.25s ease,
              color 0.25s ease,
              opacity 0.25s ease;
          }

          .news-pagination button:hover,
          .news-pagination button.active {
            background: #344432;
            color: #fff;
          }

          .news-pagination button:disabled {
            opacity: 0.35;
            cursor: not-allowed;
          }

          .news-pagination button:disabled:hover {
            background: transparent;
            color: #344432;
          }

          @media (max-width: 600px) {
            .news-pagination {
              gap: 6px;
              flex-wrap: wrap;
            }

            .news-pagination button {
              width: 36px;
              height: 36px;
              font-size: 14px;
            }

            .news-animate {
              transform: translateY(36px);
            }
          }
        `}</style>
      </section>
    </main>
  );
};

export default VideoPage;
