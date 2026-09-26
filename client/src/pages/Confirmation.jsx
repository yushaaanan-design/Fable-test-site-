import { Link, useLocation, Navigate } from 'react-router-dom';
import './Confirmation.css';

export default function Confirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) return <Navigate to="/" replace />;

  return (
    <section className="confirmation">
      <span className="eyebrow">Order Confirmed</span>
      <h1>Thank you.</h1>
      <p className="order-id">Order #{order.orderId}</p>
      <p className="order-total">Total ৳{order.total}</p>
      <p className="state-msg">
        We'll confirm your order by phone before it ships.
      </p>
      <Link to="/shop" className="btn primary">Continue Shopping</Link>
    </section>
  );
}
