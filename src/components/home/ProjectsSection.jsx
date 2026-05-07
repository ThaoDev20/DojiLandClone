import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './ProjectsSection.css';

const projects = [
  {
    number: '01',
    title: 'Dự án Demo 1',
    href: '#',
    thumbnail: 'https://i1-vnexpress.vnecdn.net/2026/05/06/dji-jpg-jpeg-1778056884-3667-1778057333.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=R5cMN8nrxOeg7IM5Tz1OjQ',
    excerpt: '',
  },
  {
    number: '02',
    title: 'Dự án Demo 2',
    href: '#',
    thumbnail:
      'https://i1-vnexpress.vnecdn.net/2026/05/01/1-1777602070.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=H_pnWupI71TeLEMNX9hBSw',
    excerpt: '',
  },
  {
    number: '03',
    title: 'Dự án Demo 3',
    href: '#',
    thumbnail: 'https://i1-vnexpress.vnecdn.net/2026/05/01/5-1777602078.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=kWRaCQhcNKvlnHjlJSNqFQ',
    excerpt:
      'Dự án Demo 3 là một dự án tọa lạc tại giao lộ ...',
  },
  {
    number: '04',
    title: 'Dự án Demo 4',
    href: '#',
    thumbnail:
      'https://i1-vnexpress.vnecdn.net/2026/05/05/smartcity-1777962773-8386-1777963176.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=Rb3dtH6EYmJsUYKmFnu6SQ',
    excerpt:
      'Dự án Demo 4 là quần thể dinh thự mặt biển hạng đầu tiên tại thành phố ...',
  },
  {
    number: '05',
    title: 'Dự án Demo 5',
    href: '#',
    thumbnail: 'https://dojiland.vn/wp-content/uploads/2023/07/TT1.jpeg',
    excerpt:
      'Nằm ngay bên bờ biển trong lòng kỳ quan thiên nhiên thế giới Vịnh Hạ Long, Dự án Demo 5 là khu đô thị Hạng A đẳng cấp Quốc tế đầu tiên tại Quảng Ninh.',
  },
];

function ProjectsSection() {
  const swiperRef = useRef(null);
  const paginationRef = useRef(null);
  const sectionRef  = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const getProject = (startIndex, offset) => {
    return projects[(startIndex + offset) % projects.length];
  };

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
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const pages = projects.map((_, index) => [
    getProject(index, 0),
    getProject(index, 1),
    getProject(index, 2),
  ]);

  const initSwiperControls = (swiper) => {
    swiperRef.current = swiper;

    setTimeout(() => {
      if (!paginationRef.current) return;

      swiper.params.pagination.el = paginationRef.current;

      swiper.pagination.destroy();
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`projects-highlight ${isVisible ? 'is-visible' : ''}`}
      id="projects_highlight"
    >

      <h2 className="projects-title">Các dự án Nổi bật</h2>

      <div className="projects-content">
        <Swiper
          modules={[Pagination]}
          className="projects-swiper"
          loop
          speed={700}
          slidesPerView={1}
          spaceBetween={0}
          pagination={{
            type: 'fraction',
          }}
          onSwiper={initSwiperControls}
        >
          {pages.map((page, pageIndex) => (
            <SwiperSlide className="project-page-slide" key={pageIndex}>
              <div className="projects-page">
                {page.map((project, index) => (
                  <div
                    className={`project-item ${index === 0 ? 'is-active' : 'is-normal'
                      }`}
                    key={`${pageIndex}-${project.number}`}
                  >
                    <a href={project.href} className="project-card">
                      <img
                        className="project-decor"
                        src="https://dojiland.vn/wp-content/themes/main/assets/images/common/s5-decor3.png"
                        alt=""
                      />

                      <img
                        className="project-thumbnail"
                        src={project.thumbnail}
                        alt={project.title}
                      />

                      <div className="project-intro">
                        <div className="project-number-row">
                          <p className="project-number">{project.number}</p>
                        </div>

                        <h3 className="project-name">{project.title}</h3>

                        {project.excerpt && (
                          <p className="project-excerpt">{project.excerpt}</p>
                        )}

                        <div className="project-more">
                          <img
                            className="project-more-icon"
                            src="https://dojiland.vn/wp-content/themes/main/assets/images/common/icon_load_more.png"
                            alt=""
                          />
                          <span>Xem chi tiết</span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="project-slide-button">
          <button
            className="project-nav-btn"
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <img
              src="https://dojiland.vn/wp-content/themes/main/assets/images/common/btn-slide-prev.png"
              alt="Previous"
            />
          </button>

          <div ref={paginationRef} className="project-pagination" />

          <button
            className="project-nav-btn"
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <img
              src="https://dojiland.vn/wp-content/themes/main/assets/images/common/btn-slide-next.png"
              alt="Next"
            />
          </button>
        </div>
      </div>

      <div className="projects-view-all">
        <a href="#">
          <img
            src="https://dojiland.vn/wp-content/themes/main/assets/images/common/img-btn-large.png"
            alt=""
          />
          <span>Xem tất cả dự án</span>
        </a>
      </div>
    </section>
  );
}

export default ProjectsSection;