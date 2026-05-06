import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './ProjectsSection.css';

const projects = [
  {
    number: '01',
    title: 'EMERALD SYMPHONY',
    href: 'https://dojiland.vn/projects/du-an-emerald-symphony/',
    thumbnail: 'https://dojiland.vn/wp-content/uploads/2025/11/1-scaled.jpg',
    excerpt: '',
  },
  {
    number: '02',
    title: 'GOLDEN CROWN HAI PHONG',
    href: 'https://dojiland.vn/projects/golden-crown-hai-phong/',
    thumbnail:
      'https://dojiland.vn/wp-content/uploads/2024/02/RENDER-03-Semi-Aerial-View-DOJI-HP-2-CD-R06-230818.png',
    excerpt: '',
  },
  {
    number: '03',
    title: 'DIAMOND CROWN HAI PHONG',
    href: 'https://dojiland.vn/projects/diamond-crown-hai-phong/',
    thumbnail: 'https://dojiland.vn/wp-content/uploads/2023/07/LXHQmyHw-scaled-2.jpg',
    excerpt:
      'Dự án đầu tiên thuộc dòng sản phẩm Diamond Crown mang tên Diamond Crown Hai Phong, tọa lạc tại giao lộ Nguyễn Bỉnh Khiêm, Lê Hồng Phong, TP. Hải Phòng',
  },
  {
    number: '04',
    title: 'THE SAPPHIRE MANSIONS',
    href: 'https://dojiland.vn/projects/the-sapphire-mansions/',
    thumbnail:
      'https://dojiland.vn/wp-content/uploads/2023/07/Image-895570177-ExtractWord-1-2292-2259-1634634921.png',
    excerpt:
      'Dự án The Sapphire Mansions là quần thể dinh thự mặt biển hạng sang tại thành phố Hạ Long, Quảng Ninh.',
  },
  {
    number: '05',
    title: 'The Sapphire Residence',
    href: 'https://dojiland.vn/projects/the-sapphire-residence/',
    thumbnail: 'https://dojiland.vn/wp-content/uploads/2023/07/TT1.jpeg',
    excerpt:
      'Nằm ngay bên bờ biển trong lòng kỳ quan thiên nhiên thế giới Vịnh Hạ Long, The Sapphire Residence là khu đô thị Hạng A đẳng cấp Quốc tế đầu tiên tại Quảng Ninh.',
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
      <img
        className="projects-decor-bg"
        src="https://dojiland.vn/wp-content/themes/main/assets/images/common/s4-decor1.png"
        alt=""
      />

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
        <a href="/project_category/bat-dong-san-nha-o/">
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