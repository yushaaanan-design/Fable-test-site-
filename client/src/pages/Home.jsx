import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api';
import TheEdit from '../components/home/TheEdit';
import CategoryTiles from '../components/home/CategoryTiles';
import ScarcityStrip from '../components/home/ScarcityStrip';
import BrandStatement from '../components/home/BrandStatement';
import TrustStrip from '../components/home/TrustStrip';
import InstagramCTA from '../components/home/InstagramCTA';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const active = products.filter((p) => p.status === 'active');
  const scarce = products.filter((p) => p.status === 'coming_soon' || p.status === 'sold_out');

  return (
    <>
      <section className="hero">
        <div className="hero-media" />
        <div className="hero-copy">
          <h1>Quiet luxury, worn loud.</h1>
          <p>Henleys, tees and heavyweight basics. Released in small runs, delivered across Bangladesh.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn primary">Shop the Drop</Link>
            <Link to="/coming-soon" className="btn">Coming Soon</Link>
          </div>
        </div>
      </section>

      {status === 'error' ? (
        <p className="home-error">The collection could not load. Refresh to try again.</p>
      ) : (
        <TheEdit products={active} loading={status === 'loading'} />
      )}
      <CategoryTiles />
      <ScarcityStrip products={scarce} />
      <BrandStatement />
      <TrustStrip />
      <InstagramCTA />
    </>
  );
}
