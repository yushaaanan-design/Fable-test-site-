import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function LowStockTab() {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetch(`${API_URL}/api/admin/low-stock`)
      .then((res) => res.json())
      .then((data) => { setRows(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <>
      <h2>Low-Stock Alerts</h2>
      {status === 'loading' && <p className="admin-empty">Loading…</p>}
      {status === 'error' && <p className="admin-empty">Could not load stock levels.</p>}
      {status === 'ready' && rows.length === 0 && <p className="admin-empty">Everything's well stocked.</p>}

      {status === 'ready' && rows.length > 0 && (
        <table className="admin-table">
          <thead><tr><th>Product</th><th>Color</th><th>Size</th><th>Stock</th><th>Threshold</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.productName}</td>
                <td>{r.color}</td>
                <td>{r.size}</td>
                <td><span className={`admin-status ${r.stock === 0 ? 'not_booked' : 'pending'}`}>{r.stock}</span></td>
                <td>{r.threshold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
