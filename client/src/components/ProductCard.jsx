import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const front = product.images.find((i) => i.role === 'front') || product.images[0];
  const hover = product.images.find((i) => i.role === 'hover');

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-media">
        <img src={front?.url} alt={product.name} className="img-front" />
        {hover && <img src={hover.url} alt="" className="img-hover" aria-hidden="true" />}
        {product.status === 'coming_soon' && <span className="badge badge-soon">Coming Soon</span>}
        {product.status === 'sold_out' && <span className="badge badge-sold">Sold Out</span>}
      </div>
      <div className="product-card-info">
        <h3>{product.name}</h3>
        <p className="price">৳{product.price}</p>
      </div>
    </Link>
  );
}
