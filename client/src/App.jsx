import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import CartPanel from './components/CartPanel';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import RequireAdmin from './pages/admin/RequireAdmin';
import { useLocation } from 'react-router-dom';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  function addToCart(product, variant) {
    setCartItems((items) => {
      const existing = items.findIndex(
        (i) => i.product.id === product.id && i.variant?.id === variant?.id
      );
      if (existing !== -1) {
        const next = [...items];
        next[existing] = { ...next[existing], qty: next[existing].qty + 1 };
        return next;
      }
      return [...items, { product, variant, qty: 1 }];
    });
    setCartOpen(true);
  }

  function updateQty(index, qty) {
    setCartItems((items) => {
      if (qty < 1) return items.filter((_, i) => i !== index);
      return items.map((item, i) => (i === index ? { ...item, qty } : item));
    });
  }

  function removeItem(index) {
    setCartItems((items) => items.filter((_, i) => i !== index));
  }

  function goToCheckout() {
    setCartOpen(false);
    navigate('/checkout');
  }

  function buyNow(product, variant) {
    navigate('/checkout', { state: { buyNowItem: { product, variant, qty: 1 } } });
  }

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
      </Routes>
    );
  }

  return (
    <>
      <Header cartCount={cartItems.reduce((n, i) => n + i.qty, 0)} onCartClick={() => setCartOpen(true)} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/coming-soon" element={<Shop filterStatus="coming_soon" />} />
          <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} onBuyNow={buyNow} />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </main>
      <Footer />
      <CartPanel
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onCheckout={goToCheckout}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />
    </>
  );
}
