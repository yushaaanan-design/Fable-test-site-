import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="logo">FABLE CLOTHING</span>
        <p>Menswear, released in small runs.</p>
      </div>

      <nav className="footer-col" aria-label="Shop">
        <h2>Shop</h2>
        <Link to="/shop">Shop All</Link>
        <Link to="/shop?category=Henleys">Henleys</Link>
        <Link to="/shop?category=T-Shirts">Tees</Link>
        <Link to="/coming-soon">Coming Soon</Link>
      </nav>

      <div className="footer-col">
        <h2>Orders</h2>
        <p>Cash on delivery nationwide</p>
        <p>bKash, Nagad and card</p>
        <p>Exchanges only, no refunds</p>
      </div>

      <p className="footer-wordmark" aria-hidden="true">FABLE</p>
      <p className="footer-legal">© {new Date().getFullYear()} Fable Clothing</p>
    </footer>
  );
}
