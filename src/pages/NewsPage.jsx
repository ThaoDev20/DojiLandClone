import React from "react";
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";
import "./NewsPage.css";

const NEWS_HERO_IMAGE =
  "https://ecopark.com.vn/images/slideshow/2020/08/31/original/group-337_1598841872.jpg";

const NewsPage = () => {
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

    let lastScrollY = window.scrollY;
    let scrollDirection = "down";

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && scrollDirection === "down") {
            entry.target.classList.add("is-visible");
          }

          if (!entry.isIntersecting && scrollDirection === "up") {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
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
                <div className="news-featured-image news-animate">
                  <img
                    src={paginatedNews[0].image || "https://placehold.co/900x520"}
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
                  <div className="news-card-image news-animate">
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
      </section>
    </main>
  );
};

export default NewsPage;