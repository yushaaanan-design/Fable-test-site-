import { useEffect, useState } from 'react';
import { getProducts } from '../../api';
import ProductForm from './ProductForm';

export default function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [showForm, setShowForm] = useState(false);

  function load() {
    setStatus('loading');
    getProducts()
      .then((data) => { setProducts(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }

  useEffect(load, []);

  if (showForm) {
    return <ProductForm onDone={() => { setShowForm(false); load(); }} />;
  }

  return (
    <>
      <div className="admin-toolbar">
        <h2>Products</h2>
        <button className="primary" onClick={() => setShowForm(true)}>Add New Product</button>
      </div>

      {status === 'loading' && <p className="admin-empty">Loading products…</p>}
      {status === 'error' && <p className="admin-empty">Could not load products.</p>}
      {status === 'ready' && products.length === 0 && <p className="admin-empty">No products yet.</p>}

      {status === 'ready' && products.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Variants</th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>৳{p.price}</td>
                <td><span className={`admin-status ${p.status === 'active' ? 'paid' : 'pending'}`}>{p.status.replace('_', ' ')}</span></td>
                <td>{p.variants.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
