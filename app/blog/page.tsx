import Link from 'next/link';

export default function BlogIndex() {
  return (
    <div className="space-y-6">
      <section className="terminal-hero">
        <h1 className="terminal-title">/blog</h1>
      </section>

      <article>
        <Link href="/blog/hello-world" className="terminal-card">
          <h2 className="terminal-card-title">Hello World</h2>
          <p className="terminal-muted text-sm">December 4, 2025</p>
          <p className="terminal-card-desc">This is my first blog post using MDX in Next.js...</p>
        </Link>
      </article>
    </div>
  );
}
