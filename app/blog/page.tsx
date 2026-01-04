import Link from 'next/link';

export default function BlogIndex() {
  return (
    <div className="space-y-6">
      <h1 className="terminal-title">Blog Posts</h1>
      <div className="space-y-4">
        {/* In a real app, you'd map through posts here */}
        <article>
          <Link href="/blog/hello-world" className="terminal-card">
            <h2 className="terminal-card-title">Hello World</h2>
            <p className="terminal-muted text-sm">December 4, 2025</p>
            <p className="terminal-card-desc">This is my first blog post using MDX in Next.js...</p>
          </Link>
        </article>
      </div>
    </div>
  );
}
