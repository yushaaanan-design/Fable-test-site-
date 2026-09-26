import { useEffect, useState } from 'react';
import OrderDetail from './OrderDetail';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('loading');
  const [selected, setSelected] = useState(null);

  function load() {
    setStatus('loading');
    fetch(`${API_URL}/api/admin/orders`)
      .then((res) => res.json())
      .then((data) => { setOrders(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }

  useEffect(load, []);

  if (selected) {
    return <OrderDetail order={selected} onBack={() => { setSelected(null); load(); }} />;
  }

  return (
    <>
      <h2>Orders</h2>
      {status === 'loading' && <p className="admin-empty">Loading orders…</p>}
      {status === 'error' && <p className="admin-empty">Could not load orders.</p>}
      {status === 'ready' && orders.length === 0 && <p className="admin-empty">No orders yet.</p>}

      {status === 'ready' && orders.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr><th>Order #</th><th>Customer</th><th>Total</th><th>Payment</th><th>Courier</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="clickable" onClick={() => setSelected(o)}>
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>৳{o.total}</td>
                <td><span className={`admin-status ${o.paymentStatus}`}>{o.paymentStatus}</span></td>
                <td><span className={`admin-status ${o.courierStatus}`}>{o.courierStatus.replace('_', ' ')}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
