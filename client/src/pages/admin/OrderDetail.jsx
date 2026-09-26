import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const PAYMENT_STATUSES = ['pending', 'paid', 'refused'];
const COURIER_STATUSES = ['not_booked', 'pending', 'shipped', 'delivered'];

export default function OrderDetail({ order, onBack }) {
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
  const [courierStatus, setCourierStatus] = useState(order.courierStatus);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/admin/orders/${order.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus, courierStatus }),
      });
      onBack();
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button className="admin-back" onClick={onBack}>&larr; Back to Orders</button>
      <h2>Order {order.id}</h2>

      <p><strong>{order.customer}</strong><br />{order.address}</p>

      <table className="admin-table" style={{ margin: '16px 0 24px' }}>
        <thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
        <tbody>
          {order.items.map((item, i) => (
            <tr key={i}><td>{item.name}</td><td>{item.qty}</td><td>৳{item.price}</td></tr>
          ))}
        </tbody>
      </table>
      <p><strong>Total: ৳{order.total}</strong> ({order.paymentMethod})</p>

      <form className="admin-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <label htmlFor="payment-status">Payment Status
          <select id="payment-status" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
            {PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label htmlFor="courier-status">Courier Status
          <select id="courier-status" value={courierStatus} onChange={(e) => setCourierStatus(e.target.value)}>
            {COURIER_STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
          </select>
        </label>
        <button className="primary" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
      </form>
    </>
  );
}
