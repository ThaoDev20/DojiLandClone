import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';
import { useData } from '../context/DataContext';

const highlightItems = [
  {
    label: 'Các dự án nổi bật',
    href: '/du-an-noi-bat',
    showOn: '/du-an',
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const { projects } = useData();

  const menuItems = useMemo(() => {
    const baseMenu = [
      {
        label: 'Giới thiệu',
        href: '/gioi-thieu',
        children: [{ label: 'Giới thiệu chung', href: '/gioi-thieu' }],
      },
    ];

    if (projects?.length > 0) {
      baseMenu.push({
        label: 'Dự án',
        href: `/du-an/${projects[0].slug}`,
        children: projects.map((project) => ({
          label: project.name,
          href: `/du-an/${project.slug}`,
        })),
      });
    }

    baseMenu.push(
      {
        label: 'Truyền thông',
        href: '/tin-du-an',
        children: [
          { label: 'Tin tức', href: '/tin-du-an' },
          { label: 'Video', href: '/video-du-an' },
          { label: 'Bản tin', href: '/ban-tin' },
        ],
      },
      { label: 'Tuyển dụng', href: '/tuyen-dung' },
      { label: 'Liên hệ', href: '/lien-he' }
    );

    return baseMenu;
  }, [projects]);

  const isHomePage = location.pathname === '/';
  const shouldUseScrolledStyle = isScrolled || !isHomePage;

  const visibleHighlightItems = useMemo(() => {
    const pathname = location.pathname.replace(/\/+$/, '');

    return highlightItems.filter((item) => {
      const showOn = item.showOn.replace(/\/+$/, '');
      return pathname.startsWith(`${showOn}/`);
    });
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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

  return (
    <header className={`header ${shouldUseScrolledStyle ? 'scrolled' : ''}`}>
      <div className="header-desktop">
        <Link to="/" className="header-logo">
          <img src="/Logo1.png" alt="Logo" />
        </Link>

        <nav className="desktop-nav">
          {menuItems.map((item, index) => (
            <div key={index} className="desktop-nav-item">
              <Link to={item.href} className="desktop-nav-link">
                {item.label}
              </Link>

              {item.children && (
                <div className="desktop-dropdown">
                  {item.children.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      to={child.href}
                      className="desktop-dropdown-link"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {visibleHighlightItems.length > 0 && (
          <div className="desktop-highlight-list">
            {visibleHighlightItems.map((item) => (
              <Link key={item.href} to={item.href} className="highlight-btn">
                <span className="highlight-icon" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="header-mobile">
        <Link to="/" className="mobile-logo">
          <img src="/Logo1.png" alt="Logo" />
        </Link>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} strokeWidth={2.4} />
        </button>
      </div>

      <div className={`mobile-menu-panel ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-top">
          <Link to="/" className="mobile-panel-logo" onClick={closeMenu}>
            <img src="/Logo1.png" alt="Logo" />
          </Link>

          <button type="button" className="mobile-close-button" onClick={closeMenu}>
            <X size={30} strokeWidth={2.4} />
          </button>
        </div>

        <nav className="mobile-nav">
          {menuItems.map((item, index) => {
            const hasChildren = item.children?.length > 0;

            return (
              <div key={index} className="mobile-nav-item">
                <div className="mobile-nav-row">
                  <Link
                    to={item.href}
                    className="mobile-nav-link"
                    onClick={!hasChildren ? closeMenu : undefined}
                  >
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

          {visibleHighlightItems.length > 0 && (
            <div className="mobile-highlight-list">
              {visibleHighlightItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="highlight-btn mobile-highlight-btn"
                  onClick={closeMenu}
                >
                  <span className="highlight-icon" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;