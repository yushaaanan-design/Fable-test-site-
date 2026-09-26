import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop All' },
  { to: '/shop?category=Henleys', label: 'Henleys' },
  { to: '/shop?category=T-Shirts', label: 'Tees' },
  { to: '/shop?category=Hoodies', label: 'Hoodies' },
  { to: '/shop?category=Pants', label: 'Pants' },
  { to: '/coming-soon', label: 'Coming Soon' },
];

export default function Header({ cartCount = 0, onCartClick }) {
  const location = useLocation();
  const current = location.pathname + location.search;
  // Menu remembers the page it was opened on, so navigating closes it without an effect.
  const [openedOn, setOpenedOn] = useState(null);
  const menuOpen = openedOn === current;
  const setMenuOpen = (open) => setOpenedOn(open ? current : null);

  // Transparent while the home hero is (almost) fully in view; frosted once you scroll.
  const [heroInView, setHeroInView] = useState(false);
  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setHeroInView(e.intersectionRatio > 0.9), {
      threshold: [0, 0.9, 1],
    });
    io.observe(hero);
    return () => {
      io.disconnect();
      setHeroInView(false);
    };
  }, [location.pathname]);
  const transparent = heroInView && location.pathname === '/' && !menuOpen;

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setOpenedOn(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const links = NAV.map((item) => (
    <Link
      key={item.to}
      to={item.to}
      aria-current={current === item.to ? 'page' : undefined}
    >
      {item.label}
    </Link>
  ));

  return (
    <>
      <header className={`site-header ${transparent ? 'is-transparent' : ''}`}>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          Menu
        </button>
        <Link to="/" className="logo">FABLE CLOTHING</Link>
        <nav className="nav" aria-label="Main">{links}</nav>
        <div className="icons">
          <Link to="/account" className="icon-link">Account</Link>
          <button className="cart-icon" onClick={onCartClick}>
            Cart{cartCount > 0 ? ` (${cartCount})` : ''}
          </button>
        </div>
      </header>

      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}
      <nav
        id="mobile-nav"
        className={`mobile-nav ${menuOpen ? 'open' : ''}`}
        aria-label="Main"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button className="mobile-nav-close" onClick={() => setMenuOpen(false)}>Close</button>
        {links}
        <Link to="/account">Account</Link>
      </nav>
    </>
  );
}
