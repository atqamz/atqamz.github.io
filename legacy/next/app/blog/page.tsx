import type { Metadata } from "next";
import Link from 'next/link';
import { posts } from './posts';

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, notes, and the occasional tutorial.",
  openGraph: {
    title: "Blog | Atqa Munzir",
    description: "Thoughts, notes, and the occasional tutorial.",
  },
};

export default function BlogIndex() {
  return (
    <div>
      <section className="terminal-hero">
        <h1 className="terminal-title">/blog</h1>
      </section>

      <div className="terminal-blog-list">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="terminal-card">
              <div className="terminal-card-header">
                <time dateTime={post.date} className="terminal-card-status">
                  {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h2 className="terminal-card-title">{post.title}</h2>
              <p className="terminal-card-desc">{post.description}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
