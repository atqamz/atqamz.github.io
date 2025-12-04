import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Personal Website",
  description: "Welcome to my personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
          <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="font-bold text-xl">atqamz</a>
            <div className="space-x-6">
              <a href="/" className="hover:text-blue-600">Home</a>
              <a href="/blog" className="hover:text-blue-600">Blog</a>
              <a href="/resume" className="hover:text-blue-600">Resume</a>
            </div>
          </nav>
        </header>
        <main className="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
          {children}
        </main>
        <footer className="bg-gray-100 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} atqamz. Built with Next.js & MDX.
        </footer>
      </body>
    </html>
  );
}
