import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import useScrollReveal from '../../hooks/useScrollReveal';
import './TheEdit.css';

export default function TheEdit({ products, loading }) {
  const revealRef = useScrollReveal();

  return (
    <section className="edit">
      <div className="edit-head">
        <h2>The current edit</h2>
        <Link to="/shop" className="text-link">Shop all</Link>
      </div>

      <div ref={revealRef} className="edit-grid reveal">
        {loading
          ? [0, 1].map((i) => <div key={i} className="skeleton edit-skeleton" style={{ '--i': i }} />)
          : products.map((p, i) => (
              <div key={p.id} className="edit-item" style={{ '--i': i }}>
                <ProductCard product={p} />
              </div>
            ))}
      </div>
    </section>
  );
}
