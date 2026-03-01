"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PaletteSelect } from "./palette-select";
import { ThemeToggle } from "./theme-toggle";

type SiteShellProps = {
  children: ReactNode;
};

const NAV_LINKS = [
  { href: "/blog", label: "/blog" },
  { href: "/resume", label: "/resume" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();

  return (
    <div className="site-frame">
      <div className="site-titlebar">
        <div className="site-window-dots" aria-hidden="true">
          <span className="site-dot site-dot--close" />
          <span className="site-dot site-dot--minimize" />
          <span className="site-dot site-dot--maximize" />
        </div>
        <span className="site-titlebar-path">
          atqamz@web:~{pathname === "/" ? "" : pathname}
        </span>
        <div className="site-titlebar-controls">
          <PaletteSelect />
          <ThemeToggle />
        </div>
      </div>

      <header className="site-header">
        <Link href="/" className="site-logo" aria-label="Home">
          atqamz
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`site-link${active ? " site-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {active && <span className="site-link-indicator" aria-hidden="true">&gt;</span>}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <main id="main-content" className="site-main">
        {children}
      </main>

      <footer className="site-statusbar">
        <div className="site-statusbar-left">
          <a href="https://github.com/atqamz" target="_blank" rel="noopener noreferrer">github</a>
          <a href="https://www.linkedin.com/in/atqamunzir/" target="_blank" rel="noopener noreferrer">linkedin</a>
        </div>
        <span className="site-statusbar-right">
          &copy; {new Date().getFullYear()} atqa munzir
        </span>
      </footer>
    </div>
  );
}
