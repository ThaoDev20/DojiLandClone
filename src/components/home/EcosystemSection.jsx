import React, { useEffect, useRef, useState } from 'react';
import './EcosystemSection.css';

const SECTION_BG = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/s6-decor1.png';
const ECO_CARD_BG = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/s6_ecosystem.png';
const PARTNER_CARD_BG = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/s6-partner.jpg';
const PREV_ICON = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/slide-prev.png';
const NEXT_ICON = 'https://dojiland.vn/wp-content/themes/main/assets/images/common/slide-next.png';

const ecosystems = [
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/logo.png',
    href: 'https://doji.vn',
    title: 'DOJI – TẬP ĐOÀN KINH DOANH ĐA NGÀNH',
    desc: 'TẬP ĐOÀN VÀNG BẠC ĐÁ QUÝ DOJI, tiền thân là Công ty Phát triển Công nghệ và Thương mại TTD được thành lập ngày 28/07/1994.',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/Logo-DJL-1.png',
    href: 'http://dojiland.vn/',
    title: 'CÔNG TY TNHH ĐẦU TƯ BẤT ĐỘNG SẢN DOJILAND',
    desc: 'DOJILAND được “khai sinh” bởi Tập đoàn Vàng bạc đá quý DOJI.',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/logo.png',
    href: '#',
    title: 'CÔNG TY CP TM HAI PHONG INVEST',
    desc: '',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/The-gioi-Kim-cuong-Logo-PNG-1.png',
    href: 'https://thegioikimcuong.vn/',
    title: 'CÔNG TY CP THẾ GIỚI KIM CƯƠNG',
    desc: 'Thế Giới Kim Cương là một trong những thương hiệu hàng đầu Việt Nam chuyên về kim cương và trang sức.',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/logo.png',
    href: '#',
    title: 'CÔNG TY CỔ PHẦN NGOẠI THƯƠNG VÀ PHÁT TRIỂN ĐẦU TƯ ĐỊA ỐC CHÂU LỤC',
    desc: '',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/Logo-Tam-dao-1-1.png',
    href: '#',
    title: 'CÔNG TY CP KHU DU LỊCH SINH THÁI TAM ĐẢO',
    desc: '',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/1464152426_untitled-1-1.png',
    href: '#',
    title: 'CÔNG TY TNHH XÂY LẮP VÀ KỸ THUẬT PHÚC THỊNH',
    desc: '',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/logo-1.png',
    href: 'http://redlotus.com.vn/',
    title: 'CÔNG TY CP ĐẦU TƯ VÀ THƯƠNG MẠI BÔNG SEN ĐỎ',
    desc: 'Công ty CP Đầu tư và Thương Mại Bông Sen Đỏ được thành lập vào năm 1976.',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/logo-1-1.png',
    href: '#',
    title: 'CÔNG TY TNHH BẤT ĐỘNG SẢN BLUE STAR',
    desc: '',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/logo.png',
    href: '#',
    title: 'CÔNG TY CP XNK VĂN HÓA PHẨM',
    desc: '',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/image-179.png',
    href: '#',
    title: 'CÔNG TY CP VBĐQ SJC HÀ NỘI',
    desc: 'Công ty CP Vàng bạc đá quý SJC Hà Nội tiền thân là Chi nhánh SJC Hà Nội – chi nhánh đầu tiên của Công ty VBĐQ Sài Gòn – SJC tại phía Bắc, được thành lập ngày 19/12/1993.',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/image-179.png',
    href: 'http://sjcdanang.vn/',
    title: 'CÔNG TY CP VBĐQ SJC ĐÀ NẴNG',
    desc: 'Công ty Cổ phần vàng bạc đá quý SJC Đà Nẵng, thành lập ngày 05 tháng 6 năm 1999.',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/logo.png',
    href: '#',
    title: 'CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI DOJI',
    desc: 'Công ty TNHH Đầu tư Thương mại DOJI là công ty thành viên trong hệ thống Tập đoàn Vàng bạc Đá quý DOJI.',
  },
  {
    logo: 'https://dojiland.vn/wp-content/uploads/2023/07/dojiland-1500198794631.jpeg',
    href: '#',
    title: 'CÔNG TY CỔ PHẦN ĐÁ QUÝ VÀ VÀNG YÊN BÁI',
    desc: 'Là một trong những thành viên của Tập đoàn DOJI, Công ty CP Đá quý và Vàng Yên Bái thực hiện các hoạt động liên quan tới thăm dò, khai thác...',
  },
];

const partners = [
  'https://dojiland.vn/wp-content/uploads/2023/07/MLD.jpg',
  'https://dojiland.vn/wp-content/uploads/2023/07/WATG.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/West-Green-Design.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/Tange.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/Logo-full.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/CBRE_Group-Logo.wine_.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/Logo_TPBank.svg-1.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/vietcombank.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/BIDv.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/CTD.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/z4365548006782_3805d8567d48338c57cbac7787265c6a.jpg',
  'https://dojiland.vn/wp-content/uploads/2023/07/bo-nhan-dien-thuong-hieu-ewh-2023-22-1536x906-1.jpeg',
  'https://dojiland.vn/wp-content/uploads/2023/07/VSL-logo-0A3F377826-seeklogo.com_.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/7a2fab3a9abd67e33eac.jpg',
  'https://dojiland.vn/wp-content/uploads/2023/07/logo-slogan-sigma.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/ID-chiMyArtboard-1-copy8.png',
  'https://dojiland.vn/wp-content/uploads/2023/07/z4365550221652_55dd163b80f18f71bb8a1174a803a2d8.jpg',
  'https://dojiland.vn/wp-content/uploads/2023/07/Logo-FTD.jpg',
  'https://dojiland.vn/wp-content/uploads/2023/07/z4371885495890_a9cd9f0d80c0527b887bb096f28f2063.jpg',
  'https://dojiland.vn/wp-content/uploads/2023/07/z4371521441190_dfca55f115e2d6d69a6155a1ec186e5a.jpg',
  'https://dojiland.vn/wp-content/uploads/2023/07/z4371520957733_47c69f8b2128067725043cbd858dac9d.jpg',
  'https://dojiland.vn/wp-content/uploads/2023/07/z4365552789461_2c2ac0ad44ff658be12fc28d24e52225.jpg',
];

const EcosystemSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeEco, setActiveEco] = useState(0);
  const [partnerIndex, setPartnerIndex] = useState(0);

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
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const nextEco = () => {
    setActiveEco((prev) => (prev + 1) % ecosystems.length);
  };

  const prevEco = () => {
    setActiveEco((prev) => (prev - 1 + ecosystems.length) % ecosystems.length);
  };

  const nextPartner = () => {
    setPartnerIndex((prev) => Math.min(prev + 1, partners.length - 1));
  };

  const prevPartner = () => {
    setPartnerIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section
      ref={sectionRef}
      className={`ecosystem-section ${isVisible ? 'is-visible' : ''}`}
      style={{ backgroundImage: `url(${SECTION_BG})` }}
    >
      {/* <div className="ecosystem-block">
        <h2 className="ecosystem-title">Hệ thống tập đoàn</h2>

        <div className="ecosystem-active-wrap">
          <button type="button" className="eco-arrow eco-arrow-prev" onClick={prevEco}>
            <img src={PREV_ICON} alt="Prev" />
          </button>

          <button
            type="button"
            className="ecosystem-active-card"
            onClick={() => setActiveEco(activeEco)}
          >
            <img className="eco-card-bg" src={ECO_CARD_BG} alt="" />
            <img
              className="eco-logo"
              src={ecosystems[activeEco].logo}
              alt={ecosystems[activeEco].title}
            />
          </button>

          <button type="button" className="eco-arrow eco-arrow-next" onClick={nextEco}>
            <img src={NEXT_ICON} alt="Next" />
          </button>
        </div>
        <div className="ecosystem-thumb-list">
          {ecosystems.map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              type="button"
              className={`ecosystem-thumb ${index === activeEco ? 'active' : ''}`}
              onClick={() => setActiveEco(index)}
            >
              <img src={item.logo} alt={item.title} />
            </button>
          ))}
        </div>

        <div className="ecosystem-content-card">
          <a
            href={ecosystems[activeEco].href}
            target="_blank"
            rel="noreferrer"
          >
            <h3>{ecosystems[activeEco].title}</h3>
          </a>
          {ecosystems[activeEco].desc && <p>{ecosystems[activeEco].desc}</p>}
        </div>
      </div> */}

      <div className="partner-block">
        <h2 className="ecosystem-title partner-title">Đối tác</h2>

        <div className="partner-slider-wrap">
          <button type="button" className="eco-arrow partner-arrow-prev" onClick={prevPartner}>
            <img src={PREV_ICON} alt="Prev" />
          </button>

          <div className="partner-window">
            <div
              className="partner-track"
              style={{ transform: `translateX(calc(-${partnerIndex} * 126px))` }}
            >
              {partners.map((logo, index) => (
                <a key={`${logo}-${index}`} href="#" className="partner-card">
                  <img className="partner-bg" src={PARTNER_CARD_BG} alt="" />
                  <img className="partner-logo" src={logo} alt="Đối tác DOJILAND" />
                </a>
              ))}
            </div>
          </div>

          <button type="button" className="eco-arrow partner-arrow-next" onClick={nextPartner}>
            <img src={NEXT_ICON} alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;