import React, { useEffect, useRef, useState } from 'react';
import './EventsSection.css';

const events = [
  {
    image: 'https://i1-vnexpress.vnecdn.net/2026/05/05/dai-lo-canh-quan-song-hong-jpe-5148-6620-1777976487.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=T9r2U5Y3-KvU-bEy56qBpQ',
    href: '/tin-du-an',
  },
  {
    image: 'https://i1-kinhdoanh.vnecdn.net/2026/02/02/2-pho-i-ca-nh-1-1769989226-176-9352-3426-1769998192.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=i-fqa7zx3OCOLKMMivDw9Q',
    href: '/tin-du-an',
  },
  {
    image: 'https://i1-vnexpress.vnecdn.net/2026/01/28/dji-20241120115806-0298-d-enha-4756-6871-1769585211.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=ErAYf5IMUe0iVdWlV5rOlA',
    href: '/tin-du-an',
  },
    {
    image: 'https://i1-vnexpress.vnecdn.net/2026/05/05/DJI-0355-4649-1777959550.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=2Og3cbtdij_9zB6Kfgxu7g',
    href: '/tin-du-an',
  },
  {
    image: 'https://i1-vnexpress.vnecdn.net/2026/05/04/z7410100044853-ffe8f1fa6c9064b-4573-3145-1777880293.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=eqVg4ahY30NBvfpYmSFFhg',
    href: '/tin-du-an',
  },
    {
    image: 'https://i1-vnexpress.vnecdn.net/2026/05/05/b7a4c4bbd4275e790736-175957805-9841-8646-1777956287.webp?w=680&h=0&q=100&dpr=1&fit=crop&s=r6doUnSPthiEVeZrUq_0QA',
    href: '/tin-du-an',
  },
  {
    image: 'https://i1-vnexpress.vnecdn.net/2026/05/07/A4-DN-1778120376-6623-1778120411.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=CJsQaSF3xizTGM5Ff5SyUw',
    href: '/tin-du-an',
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