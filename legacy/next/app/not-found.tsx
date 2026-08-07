import type { Metadata } from "next";
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="terminal-hero">
      <p className="terminal-prompt">status 404</p>
      <h1 className="terminal-title">Not Found</h1>
      <p className="terminal-lead">Could not find requested resource.</p>
      <div>
        <Link href="/" className="terminal-button terminal-button--ghost">
          Return Home
        </Link>
      </div>
    </div>
  )
}
