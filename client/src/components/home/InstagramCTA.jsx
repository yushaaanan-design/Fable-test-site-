import useScrollReveal from '../../hooks/useScrollReveal';
import './InstagramCTA.css';

// ponytail: placeholder handle, swap for the real Fable Instagram URL once it exists.
const INSTAGRAM_URL = 'https://www.instagram.com/';

export default function InstagramCTA() {
  const revealRef = useScrollReveal();

  return (
    <section className="ig">
      <div ref={revealRef} className="ig-copy reveal">
        <h2 style={{ '--i': 0 }}>Questions? Send us a DM.</h2>
        <p style={{ '--i': 1 }}>
          Sizing help, restock alerts and a first look at new drops, straight from the team.
        </p>
        <a
          style={{ '--i': 2 }}
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn primary"
        >
          DM on Instagram
        </a>
      </div>
      <div className="ig-media">
        <img
          src="https://picsum.photos/id/1059/1000/1250"
          alt="A jacket hanging on a rack in a small shop"
          loading="lazy"
        />
      </div>
    </section>
  );
}
