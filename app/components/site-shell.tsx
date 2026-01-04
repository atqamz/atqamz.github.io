"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { PaletteSelect } from "./palette-select";
import { ThemeToggle } from "./theme-toggle";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-frame">
      <header className="site-header">
        <nav className="site-nav">
          <div className="site-nav-left">
            <Link href="/" className="site-logo">atqamz</Link>
            <Link href="/blog" className="site-link">Blog</Link>
            <Link href="/resume" className="site-link">Resume</Link>
          </div>
          <div className="site-divider" aria-hidden="true" />
          <div className="site-actions">
            <PaletteSelect />
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main className="site-main">
        {children}
      </main>
      <footer className="site-footer">
        <div className="site-footer-links">
          <a href="https://github.com/atqamz" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/atqamunzir/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <p className="terminal-muted">© {new Date().getFullYear()} Atqa Munzir.</p>
      </footer>
    </div>
  );
}
