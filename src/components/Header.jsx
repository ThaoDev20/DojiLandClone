import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

const LOGO_URL = 'https://dojiland.vn/wp-content/themes/main/assets/images/logo.svg';

const menuItems = [
  {
    label: 'Giới thiệu',
    href: '/gioi-thieu',
    children: [
      { label: 'Giới thiệu chung', href: '/gioi-thieu' },
      { label: 'Ban lãnh đạo', href: '/ban-lanh-dao' },
      { label: 'Hệ sinh thái DOJI', href: '#' },
      { label: 'Giải thưởng', href: '#' },
    ],
  },
  {
    label: 'Dự án',
    href: '/bat-dong-san-nha-o',
    children: [
      { label: 'Bất động sản Nhà ở', href: '/bat-dong-san-nha-o' },
      { label: 'Bất động sản Văn phòng', href: '/bat-dong-san-van-phong' },
      { label: 'Bất động sản Nghỉ dưỡng', href: '/bat-dong-san-nghi-duong' },
      { label: 'Khu đô thị', href: '/khu-do-thi' },
    ],
  },
  {
    label: 'Truyền thông',
    href: '/tin-du-an',
    children: [
      { label: 'Tin tức', href: '/tin-du-an' },
      { label: 'Video', href: '#' },
      { label: 'Bản tin', href: '#' },
    ],
  },
  { label: 'Tuyển dụng', href: '/tuyen-dung' },
  { label: 'Liên hệ', href: '/lien-he' },
];

const highlightItems = [
  { label: 'Các dự án nổi bật', hash: 'projects_highlight' },
  { label: 'Sự kiện gần đây', hash: 'events_latest' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const shouldUseScrolledStyle = isScrolled || !isHomePage;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSubmenu({});
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const goToHash = (hash) => {
    closeMenu();
    window.location.href = `/#${hash}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${shouldUseScrolledStyle ? 'scrolled' : ''}`}>
      <div className="header-desktop">
        <Link to="/" className="header-logo">
          <img src={LOGO_URL} alt="DOJILAND" />
        </Link>

        {
          isHomePage && (
            <div className="desktop-language">
              <span>VI</span>
              <ChevronDown size={14} />
            </div>
          )
        }

        <nav className="desktop-nav">
          {menuItems.map((item, index) => (
            <div key={index} className="desktop-nav-item">
              <Link to={item.href} className="desktop-nav-link">
                {item.label}
              </Link>

              {item.children && (
                <div className="desktop-dropdown">
                  {item.children.map((child, childIndex) => (
                    <Link key={childIndex} to={child.href} className="desktop-dropdown-link">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="desktop-highlight-list">
          {highlightItems.map((item) => (
            <button
              key={item.hash}
              type="button"
              className="highlight-btn"
              onClick={() => goToHash(item.hash)}
            >
              <span className="highlight-icon" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="header-mobile">
        <Link to="/" className="mobile-logo">
          <img src={LOGO_URL} alt="DOJILAND" />
        </Link>

        <button type="button" className="mobile-menu-button" onClick={() => setIsMenuOpen(true)}>
          <Menu size={28} strokeWidth={2.4} />
        </button>
      </div>

      <div className={`mobile-menu-panel ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-top">
          <button type="button" className="mobile-language">
            VI
            <ChevronDown size={15} />
          </button>

          <Link to="/" className="mobile-panel-logo" onClick={closeMenu}>
            <img src={LOGO_URL} alt="DOJILAND" />
          </Link>

          <button type="button" className="mobile-close-button" onClick={closeMenu}>
            <X size={30} strokeWidth={2.4} />
          </button>
        </div>

        <nav className="mobile-nav">
          {menuItems.map((item, index) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;

            return (
              <div key={index} className="mobile-nav-item">
                <div className="mobile-nav-row">
                  <Link to={item.href} className="mobile-nav-link" onClick={!hasChildren ? closeMenu : undefined}>
                    {item.label}
                  </Link>

                  {hasChildren && (
                    <button
                      type="button"
                      className={`mobile-submenu-toggle ${openSubmenu[index] ? 'active' : ''}`}
                      onClick={() => toggleSubmenu(index)}
                    >
                      <ChevronDown size={26} strokeWidth={3} />
                    </button>
                  )}
                </div>

                {hasChildren && (
                  <div className={`mobile-submenu ${openSubmenu[index] ? 'active' : ''}`}>
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        to={child.href}
                        className="mobile-submenu-link"
                        onClick={closeMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="mobile-highlight-list">
            {highlightItems.map((item) => (
              <button
                key={item.hash}
                type="button"
                className="highlight-btn mobile-highlight-btn"
                onClick={() => goToHash(item.hash)}
              >
                <span className="highlight-icon" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;