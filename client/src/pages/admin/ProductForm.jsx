import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const emptyVariant = { color: '', size: '', stock: '' };

export default function ProductForm({ onDone }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [comingSoon, setComingSoon] = useState(false);
  const [soldOut, setSoldOut] = useState(false);
  const [variants, setVariants] = useState([{ ...emptyVariant }]);
  const [saving, setSaving] = useState(false);

  function updateVariant(i, field, value) {
    setVariants((rows) => rows.map((r, idx) => (idx === i ? { ...r, [field]: value } : r)));
  }

  function addVariant() {
    setVariants((rows) => [...rows, { ...emptyVariant }]);
  }

  function removeVariant(i) {
    setVariants((rows) => rows.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const status = soldOut ? 'sold_out' : comingSoon ? 'coming_soon' : 'active';
    try {
      await fetch(`${API_URL}/api/admin/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: Number(price), category, status, variants }),
      });
      onDone();
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button className="admin-back" onClick={onDone}>&larr; Back to Products</button>
      <h2>Add New Product</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <label htmlFor="p-name">Name
          <input id="p-name" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label htmlFor="p-price">Price (BDT)
          <input id="p-price" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <label htmlFor="p-category">Category
          <input id="p-category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>

        <label htmlFor="p-images">Images (front + hover)
          <input id="p-images" type="file" accept="image/*" multiple />
        </label>

        <div>
          <span className="eyebrow">Variants</span>
          {variants.map((v, i) => (
            <div className="variant-row" key={i}>
              <label>Color
                <input value={v.color} onChange={(e) => updateVariant(i, 'color', e.target.value)} />
              </label>
              <label>Size
                <input value={v.size} onChange={(e) => updateVariant(i, 'size', e.target.value)} />
              </label>
              <label>Stock
                <input type="number" min="0" value={v.stock} onChange={(e) => updateVariant(i, 'stock', e.target.value)} />
              </label>
              <button type="button" onClick={() => removeVariant(i)} aria-label={`Remove variant ${i + 1}`}>✕</button>
            </div>
          ))}
          <button type="button" onClick={addVariant} style={{ marginTop: 8 }}>+ Add Variant</button>
        </div>

        <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={comingSoon} onChange={(e) => setComingSoon(e.target.checked)} style={{ width: 'auto' }} />
          Mark as Coming Soon
        </label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={soldOut} onChange={(e) => setSoldOut(e.target.checked)} style={{ width: 'auto' }} />
          Force Sold Out (manufactured demand)
        </label>

        <button className="primary" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
      </form>
    </>
  );
}
