import type { ReactNode } from "react";
import Link from "next/link";

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <article>
      <nav aria-label="Breadcrumb">
        <Link href="/blog" className="terminal-muted" style={{ fontSize: "0.85rem" }}>
          &larr; back to /blog
        </Link>
      </nav>
      {children}
    </article>
  );
}
