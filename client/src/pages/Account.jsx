export default function Account() {
  return (
    <section style={{ padding: '48px 32px' }}>
      <span className="eyebrow">Account</span>
      <h1 style={{ margin: '10px 0 8px' }}>Login / Signup</h1>
      <p style={{ color: 'var(--muted)' }}>
        Clerk-hosted auth goes here. Guest checkout bypasses this entirely.
      </p>
    </section>
  );
}
