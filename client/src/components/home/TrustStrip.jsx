import './TrustStrip.css';

// Shipping threshold mirrors the placeholder config in architecture.md; update both when real numbers arrive.
const POINTS = [
  'Cash on delivery across Bangladesh',
  'Pay by bKash, Nagad or card',
  'Easy exchanges',
  'Free delivery over ৳1,500',
];

function Row({ hidden }) {
  return (
    <ul className="trust-row" aria-hidden={hidden || undefined}>
      {POINTS.map((point) => (
        <li key={point}>
          {point}
          <span className="trust-rule" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Delivery and payment">
      <div className="trust-track">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
