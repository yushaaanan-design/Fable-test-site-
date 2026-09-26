import './CartPanel.css';

export default function CartPanel({ open, items, onClose, onCheckout, onUpdateQty, onRemove }) {
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <>
      {open && <div className="cart-overlay" onClick={onClose} />}
      <aside className={`cart-panel ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open}>
        <div className="cart-panel-header">
          <h3>Your Cart</h3>
          <button onClick={onClose}>Close</button>
        </div>
        {items.length === 0 ? (
          <p className="state-msg">Cart is empty.</p>
        ) : (
          <ul className="cart-items">
            {items.map((item, i) => (
              <li key={i}>
                <div className="cart-item-info">
                  <span className="cart-item-name">
                    {item.product.name}
                    {item.variant ? `, ${item.variant.color} / ${item.variant.size}` : ''}
                  </span>
                  <span className="cart-item-price">৳{item.product.price * item.qty}</span>
                </div>
                <div className="cart-item-controls">
                  <div className="qty-stepper">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.product.name}`}
                      onClick={() => onUpdateQty(i, item.qty - 1)}
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.qty}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.product.name}`}
                      onClick={() => onUpdateQty(i, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button type="button" className="cart-remove" onClick={() => onRemove(i)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-panel-footer">
          <div className="cart-total">
            <span>Total</span>
            <span>৳{total}</span>
          </div>
          <button className="primary" disabled={items.length === 0} onClick={onCheckout}>Proceed to Checkout</button>
        </div>
      </aside>
    </>
  );
}
