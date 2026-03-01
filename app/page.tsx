import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Atqa Munzir",
  description: "Game programmer, full-stack developer. Welcome to my terminal.",
  openGraph: {
    title: "Atqa Munzir",
    description: "Game programmer, full-stack developer. Welcome to my terminal.",
  },
};

export default function Home() {
  return (
    <div>
      <section className="terminal-hero">
        <h1 className="terminal-title">welcome</h1>
      </section>

      <p className="terminal-paragraph">
          game programmer &middot; full-stack developer &middot; based in indonesia
        </p>
        <p className="terminal-paragraph terminal-muted">
          i build games, backend systems, and occasionally break things on purpose.
        </p>

      <section className="terminal-motd-links">
        <p className="terminal-prompt">links</p>
        <ul className="terminal-list">
          <li><a href="https://github.com/atqamz" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/atqamz</a></li>
          <li><a href="https://linkedin.com/in/atqamunzir" target="_blank" rel="noopener noreferrer" className="terminal-link">linkedin.com/in/atqamunzir</a></li>
          <li><a href="mailto:atqamz@gmail.com" className="terminal-link">atqamz@gmail.com</a></li>
        </ul>
      </section>

      <section>
        <p className="terminal-prompt">ls -la ~/</p>
        <div className="terminal-grid">
          <Link href="/blog" className="terminal-card">
            <div className="terminal-card-header">
              <span className="terminal-card-kicker">dir</span>
            </div>
            <h2 className="terminal-card-title">blog</h2>
            <p className="terminal-card-desc">thoughts, notes, and the occasional tutorial.</p>
          </Link>

          <Link href="/resume" className="terminal-card">
            <div className="terminal-card-header">
              <span className="terminal-card-kicker">dir</span>
            </div>
            <h2 className="terminal-card-title">resume</h2>
            <p className="terminal-card-desc">professional experience and education.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
