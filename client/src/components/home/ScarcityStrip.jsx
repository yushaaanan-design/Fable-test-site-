import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScarcityStrip.css';

gsap.registerPlugin(ScrollTrigger);

const COPY = {
  coming_soon: { label: 'Coming soon', line: 'In production now. It drops once, in a small run.' },
  sold_out: { label: 'Sold out', line: 'This run is gone. The next one will not look the same.' },
};

// Cards pin with CSS sticky; GSAP only scrubs the outgoing card back as the next one covers it.
export default function ScarcityStrip({ products }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!products.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 0;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stack-card');
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card.querySelector('.stack-inner'), {
          scale: 0.9,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: `top top+=${headerH}`,
            scrub: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [products]);

  if (!products.length) return null;

  return (
    <section ref={ref} className="scarcity" aria-label="Coming soon and sold out">
      <div className="stack-card">
        <div className="stack-inner stack-intro">
          <h2>Not everything stays.</h2>
          <p>Some pieces are still on the way. Some are already gone.</p>
        </div>
      </div>

      {products.map((p) => {
        const copy = COPY[p.status];
        const front = p.images.find((img) => img.role === 'front') || p.images[0];
        return (
          <div key={p.id} className="stack-card">
            <div className="stack-inner stack-product">
              <div className="stack-media">
                <img src={front?.url} alt={p.name} loading="lazy" />
              </div>
              <div className="stack-text">
                <span className={`stack-status ${p.status}`}>{copy.label}</span>
                <h3>{p.name}</h3>
                <p>{copy.line}</p>
                <Link to={`/product/${p.id}`} className="text-link">View the piece</Link>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
