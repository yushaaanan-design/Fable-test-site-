import useScrollReveal from '../../hooks/useScrollReveal';
import './BrandStatement.css';

export default function BrandStatement() {
  const revealRef = useScrollReveal({ threshold: 0.35 });

  return (
    <section ref={revealRef} className="statement reveal">
      <h2 style={{ '--i': 0 }}>
        Fewer pieces. <span>Worn longer.</span>
      </h2>
      <p style={{ '--i': 1 }}>
        We release in small runs and let them sell through. When a piece is gone, the next drop moves on.
      </p>
    </section>
  );
}
