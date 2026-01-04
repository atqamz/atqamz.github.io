import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="terminal-hero">
      <p className="terminal-prompt">status 404</p>
      <h2 className="terminal-title">Not Found</h2>
      <p className="terminal-lead">Could not find requested resource.</p>
      <div>
        <Link href="/" className="terminal-button terminal-button--ghost">
          Return Home
        </Link>
      </div>
    </div>
  )
}
