import React, { useEffect, useMemo, useState } from 'react';
import './EventsSection.css';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

const getNewsImage = (item) => {
  return item?.image || item?.thumbnail || '';
};

const getNewsHref = (item) => {
  if (!item) return '#';

  if (item.href) return item.href;

  if (item.slug && String(item.slug).trim()) {
    return `/tin-du-an/${item.slug}`;
  }

  if (item.id) {
    return `/tin-du-an/${item.id}`;
  }

  return '#';
};

const NewsEvents = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { visibleNews = [] } = useData();

  const newsItems = useMemo(() => {
    if (!Array.isArray(visibleNews)) return [];

    return visibleNews
      .filter((item) => item?.title && getNewsImage(item))
      .map((item, index) => ({
        ...item,
        _renderKey: `${item.id || item.slug || 'news'}-${index}`,
      }));
  }, [visibleNews]);

  const total = newsItems.length;
  const safeActiveIndex = total > 0 ? activeIndex % total : 0;

  const getItemByOffset = (offset) => {
    if (total === 0) return null;

    const index = (safeActiveIndex + offset + total) % total;
    return newsItems[index];
  };

  const activeItem = getItemByOffset(0);
  const prevItem = getItemByOffset(-1);
  const nextItem = getItemByOffset(1);

  useEffect(() => {
    if (total <= 1) return undefined;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(timer);
  }, [total]);

  const handlePrev = () => {
    if (total <= 1) return;

    setActiveIndex((prev) => {
      const next = (prev - 1 + total) % total;
      return next;
    });
  };

  const handleNext = () => {
    if (total <= 1) return;

    setActiveIndex((prev) => {
      const next = (prev + 1) % total;
      return next;
    });
  };

  if (!activeItem) {
    return null;
  }

  return (
    <section className="news-events">
      <div className="news-events-leaf news-events-leaf-top" />
      <div className="news-events-leaf news-events-leaf-bottom" />

      <div className="news-events-container">
        <h2 className="news-events-title">
          <Link href="/tin-du-an">
            <span>TIN TỨC &</span>
            <span>SỰ KIỆN</span>
          </Link>
        </h2>
      </div>

      <div className="news-events-slider" key={safeActiveIndex}>
        {prevItem && total > 1 && (
          <div className="news-events-side news-events-side-left">
            <Link href={getNewsHref(prevItem)} className="news-events-image">
              <img src={getNewsImage(prevItem)} alt={prevItem.title} />
            </Link>

            <button
              type="button"
              className="news-events-nav news-events-prev"
              onClick={handlePrev}
              aria-label="Tin trước"
            >
              ‹
            </button>
          </div>
        )}

        <article className="news-events-main">
          <a href={getNewsHref(activeItem)} className="news-events-image">
            <img src={getNewsImage(activeItem)} alt={activeItem.title} />
          </a>

          <h3 className="news-events-name">
            <a href={getNewsHref(activeItem)}>{activeItem.title}</a>
          </h3>
        </article>

        {nextItem && total > 1 && (
          <div className="news-events-side news-events-side-right">
            <a href={getNewsHref(nextItem)} className="news-events-image">
              <img src={getNewsImage(nextItem)} alt={nextItem.title} />
            </a>

            <button
              type="button"
              className="news-events-nav news-events-next"
              onClick={handleNext}
              aria-label="Tin tiếp theo"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsEvents;