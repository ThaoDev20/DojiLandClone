import React, { useEffect, useRef, useState } from 'react';
import './EventsSection.css';

const events = [
  {
    image: 'https://dojiland.vn/wp-content/uploads/2025/12/Bam-nut-khoi-cong.jpg',
    href: 'https://dojiland.vn/tap-doan-doji-chinh-thuc-khoi-cong-du-an-voi-toa-thap-cao-75-tang/',
  },
  {
    image: 'https://dojiland.vn/wp-content/uploads/2025/12/Phoi-canh-2-toa.jpg',
    href: 'https://dojiland.vn/4835-2/',
  },
  {
    image: 'https://dojiland.vn/wp-content/uploads/2025/10/DSC08380-scaled.jpg',
    href: 'https://dojiland.vn/golden-crown-hai-phong-chinh-thuc-cat-noc-khang-dinh-vi-the-bieu-tuong-pho-cang/',
  },
    {
    image: 'https://dojiland.vn/wp-content/uploads/2025/12/Phoi-canh-2-toa.jpg',
    href: 'https://dojiland.vn/4835-2/',
  },
  {
    image: 'https://dojiland.vn/wp-content/uploads/2024/12/4.jpg',
    href: 'https://dojiland.vn/dojiland-giu-vung-danh-hieu-nha-phat-trien-bat-dong-san-hang-sang-tot-nhat-dong-nam-a-2024/',
  },
    {
    image: 'https://dojiland.vn/wp-content/uploads/2025/12/Phoi-canh-2-toa.jpg',
    href: 'https://dojiland.vn/4835-2/',
  },
  {
    image: 'https://dojiland.vn/wp-content/uploads/2024/06/Chung-nhan.jpg',
    href: 'https://dojiland.vn/dojiland-dat-top-10-nha-phat-trien-bds-hang-dau-viet-nam-tai-bci-asia-awards-2024/',
  },
];

const EventsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const loopEvents = [...events, ...events];

  return (
    <section
      ref={sectionRef}
      id="events_latest"
      className={`events-section ${isVisible ? 'is-visible' : ''}`}
    >
      <h2 className="events-title">Các sự kiện nổi bật</h2>

      <div className="events-slider">
        <div className="events-track">
          {loopEvents.map((item, index) => (
            <a
              key={`${item.image}-${index}`}
              href={item.href}
              className="events-card"
              target="_blank"
              rel="noreferrer"
            >
              <img src={item.image} alt="Sự kiện DOJILAND" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;