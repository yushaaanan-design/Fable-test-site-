import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsTab from './ProductsTab';
import OrdersTab from './OrdersTab';
import DiscountCodesTab from './DiscountCodesTab';
import LowStockTab from './LowStockTab';
import './admin.css';

const TABS = [
  { id: 'products', label: 'Products' },
  { id: 'orders', label: 'Orders' },
  { id: 'discounts', label: 'Discount Codes' },
  { id: 'low-stock', label: 'Low-Stock Alerts' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  function logout() {
    sessionStorage.removeItem('fable_admin_session');
    navigate('/admin/login');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <span className="admin-brand">FABLE ADMIN</span>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
        <button className="admin-tab-btn" onClick={logout} style={{ marginTop: 'auto' }}>
          Log Out
        </button>
      </aside>
      <main className="admin-main">
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'discounts' && <DiscountCodesTab />}
        {activeTab === 'low-stock' && <LowStockTab />}
      </main>
    </div>
  );
}
