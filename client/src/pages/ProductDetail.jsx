import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api';
import './ProductDetail.css';

export default function ProductDetail({ onAddToCart, onBuyNow }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProduct(data);
        setSelected(data.variants[0] || null);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [id]);

  if (status === 'loading') return <p className="state-msg">Loading…</p>;
  if (status === 'error' || !product) return <p className="state-msg">Product not found.</p>;

  const isTeaser = product.status === 'coming_soon';
  const front = product.images.find((i) => i.role === 'front') || product.images[0];

  return (
    <section className="pdp">
      <div className="pdp-gallery">
        <img src={front?.url} alt={product.name} />
      </div>
      <div className="pdp-info">
        <span className="eyebrow">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="price">৳{product.price}</p>
        <p className="desc">{product.description}</p>

        {!isTeaser && product.variants.length > 0 && (
          <div className="variants">
            <span className="eyebrow">Size / Color</span>
            <div className="variant-list">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  className={selected?.id === v.id ? 'primary' : ''}
                  disabled={v.stock === 0}
                  onClick={() => setSelected(v)}
                >
                  {v.color} · {v.size}{v.stock === 0 ? ' (out)' : ''}
                </button>
              ))}
            </div>
          </div>
        )}

        {!isTeaser && product.status !== 'sold_out' ? (
          <div className="pdp-actions">
            <button onClick={() => onAddToCart?.(product, selected)}>Add to Cart</button>
            <button className="primary" onClick={() => onBuyNow?.(product, selected)}>Buy Now</button>
          </div>
        ) : (
          <p className="state-msg">{isTeaser ? 'Not yet available for purchase.' : 'Currently sold out.'}</p>
        )}
      </div>
    </section>
  );
}
