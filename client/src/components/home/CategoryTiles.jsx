import { Link } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';
import './CategoryTiles.css';

const CATEGORIES = [
  { label: 'Henleys', to: '/shop?category=Henleys', img: 473 },
  { label: 'Tees', to: '/shop?category=T-Shirts', img: 447 },
  { label: 'Hoodies', to: '/shop?category=Hoodies', img: 375 },
  { label: 'Pants', to: '/shop?category=Pants', img: 455 },
];

export default function CategoryTiles() {
  const revealRef = useScrollReveal({ threshold: 0.15 });

  return (
    <nav ref={revealRef} className="tiles reveal" aria-label="Shop by category">
      {CATEGORIES.map((c, i) => (
        <Link key={c.label} to={c.to} className="tile" style={{ '--i': i }}>
          <img src={`https://picsum.photos/id/${c.img}/700/1000`} alt="" loading="lazy" />
          <span className="tile-label">{c.label}</span>
        </Link>
      ))}
    </nav>
  );
}
