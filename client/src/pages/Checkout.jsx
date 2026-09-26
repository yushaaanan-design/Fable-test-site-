import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitCheckout } from '../api';
import './Checkout.css';

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery' },
  { id: 'bkash', label: 'bKash' },
  { id: 'nagad', label: 'Nagad' },
  { id: 'sslcommerz', label: 'SSLCommerz (Card)' },
];

export default function Checkout({ cartItems = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const items = location.state?.buyNowItem ? [location.state.buyNowItem] : cartItems;

  const [form, setForm] = useState({ name: '', phone: '', address: '', email: '', notes: '' });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const total = items.reduce((sum, i) => sum + i.product.price, 0);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus('submitting');
    setError('');
    try {
      const payload = {
        ...form,
        paymentMethod,
        items: items.map((i) => ({
          productId: i.product.id,
          variantId: i.variant?.id,
          qty: 1,
          price: i.product.price,
        })),
      };
      const result = await submitCheckout(payload);
      navigate('/confirmation', { state: { order: result } });
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  }

  if (items.length === 0) {
    return (
      <section className="checkout empty">
        <span className="eyebrow">Checkout</span>
        <h1>Your cart is empty</h1>
        <p className="state-msg">Add something from the shop before checking out.</p>
      </section>
    );
  }

  return (
    <section className="checkout">
      <div className="checkout-form-col">
        <span className="eyebrow">Checkout</span>
        <h1>Delivery details</h1>

        <form onSubmit={handleSubmit} className="checkout-form">
          <label htmlFor="co-name">Full name</label>
          <input id="co-name" required value={form.name} onChange={update('name')} />

          <label htmlFor="co-phone">Phone</label>
          <input id="co-phone" required value={form.phone} onChange={update('phone')} />

          <label htmlFor="co-address">Address</label>
          <textarea id="co-address" required rows={3} value={form.address} onChange={update('address')} />

          <label htmlFor="co-email">Email (optional)</label>
          <input id="co-email" type="email" value={form.email} onChange={update('email')} />

          <label htmlFor="co-notes">Order notes (optional)</label>
          <textarea id="co-notes" rows={2} value={form.notes} onChange={update('notes')} />

          <fieldset className="payment-methods">
            <legend className="eyebrow">Payment method</legend>
            {PAYMENT_METHODS.map((m) => (
              <label key={m.id} className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value={m.id}
                  checked={paymentMethod === m.id}
                  onChange={() => setPaymentMethod(m.id)}
                />
                {m.label}
              </label>
            ))}
          </fieldset>

          <p className="trust-line">Exchanges within policy · No refunds · Trusted by early customers</p>

          {error && <p className="checkout-error" role="alert">{error}</p>}

          <button type="submit" className="primary" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Placing order…' : 'Place Order'}
          </button>
        </form>
      </div>

      <aside className="checkout-summary">
        <h2>Order summary</h2>
        <ul>
          {items.map((i, idx) => (
            <li key={idx}>
              <span>{i.product.name}{i.variant ? `, ${i.variant.color} / ${i.variant.size}` : ''}</span>
              <span>৳{i.product.price}</span>
            </li>
          ))}
        </ul>
        <div className="checkout-total">
          <span>Total</span>
          <span>৳{total}</span>
        </div>
      </aside>
    </section>
  );
}
