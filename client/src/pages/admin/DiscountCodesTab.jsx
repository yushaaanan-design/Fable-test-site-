import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function DiscountCodesTab() {
  const [codes, setCodes] = useState([]);
  const [status, setStatus] = useState('loading');
  const [form, setForm] = useState({ code: '', type: 'percent', amount: '', expiry: '', usageLimit: '' });
  const [saving, setSaving] = useState(false);

  function load() {
    setStatus('loading');
    fetch(`${API_URL}/api/admin/discount-codes`)
      .then((res) => res.json())
      .then((data) => { setCodes(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }

  useEffect(load, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/admin/discount-codes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: Number(form.amount), usageLimit: Number(form.usageLimit) }),
      });
      setForm({ code: '', type: 'percent', amount: '', expiry: '', usageLimit: '' });
      load();
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h2>Discount Codes</h2>

      {status === 'ready' && (
        <table className="admin-table" style={{ marginBottom: 28 }}>
          <thead><tr><th>Code</th><th>Type</th><th>Amount</th><th>Expiry</th><th>Usage Limit</th></tr></thead>
          <tbody>
            {codes.map((c) => (
              <tr key={c.code}>
                <td>{c.code}</td>
                <td>{c.type}</td>
                <td>{c.type === 'percent' ? `${c.amount}%` : `৳${c.amount}`}</td>
                <td>{c.expiry}</td>
                <td>{c.usageLimit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {status === 'loading' && <p className="admin-empty">Loading…</p>}

      <span className="eyebrow">Create Code</span>
      <form className="admin-form" onSubmit={handleSubmit} style={{ marginTop: 8 }}>
        <label htmlFor="dc-code">Code
          <input id="dc-code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
        </label>
        <label htmlFor="dc-type">Type
          <select id="dc-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="percent">Percent</option>
            <option value="flat">Flat (BDT)</option>
          </select>
        </label>
        <label htmlFor="dc-amount">Amount
          <input id="dc-amount" type="number" min="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        </label>
        <label htmlFor="dc-expiry">Expiry
          <input id="dc-expiry" type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} required />
        </label>
        <label htmlFor="dc-limit">Usage Limit
          <input id="dc-limit" type="number" min="0" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} required />
        </label>
        <button className="primary" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Create Code'}</button>
      </form>
    </>
  );
}
