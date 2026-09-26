import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const CATEGORY_TITLES = {
  Henleys: 'Henleys',
  'T-Shirts': 'Tees',
  Hoodies: 'Hoodies',
  Pants: 'Pants',
};

function filterProducts(all, { category, filterStatus }) {
  if (category) return all.filter((p) => p.category === category);
  if (filterStatus) return all.filter((p) => p.status === filterStatus);
  return all.filter((p) => p.status !== 'coming_soon');
}

export default function Shop({ filterStatus }) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [all, setAll] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getProducts()
      .then((data) => {
        setAll(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const products = filterProducts(all, { category, filterStatus });
  const title = category
    ? CATEGORY_TITLES[category] || category
    : filterStatus === 'coming_soon'
      ? 'Coming Soon'
      : 'Shop All';
  const subtitle = filterStatus === 'coming_soon' ? 'On the way. Not yet available to order.' : null;

  return (
    <section className="shop">
      <h1>{title}</h1>
      {subtitle && <p className="shop-subtitle">{subtitle}</p>}

      {status === 'error' && <p className="state-msg">Could not reach the store. Refresh to try again.</p>}
      {status === 'ready' && products.length === 0 && (
        <p className="state-msg">Nothing here right now. New pieces land soon.</p>
      )}

      <div className="grid" aria-busy={status === 'loading'}>
        {status === 'loading'
          ? Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton skeleton-media" />
                <div className="skeleton skeleton-line" />
              </div>
            ))
          : products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
