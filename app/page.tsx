import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="terminal-hero">
        <h1 className="terminal-title">Welcome to My Terminal</h1>
      </section>

      <div className="terminal-grid">
        <Link href="/blog" className="terminal-card">
          <h2 className="terminal-card-title">Blog</h2>
          <p className="terminal-card-desc">Read my words.</p>
        </Link>

        <Link href="/resume" className="terminal-card">
          <h2 className="terminal-card-title">Resume</h2>
          <p className="terminal-card-desc">Check out my professional journeys.</p>
        </Link>
      </div>
    </div>
  );
}
