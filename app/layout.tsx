import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { ThemeToggle } from "./components/theme-toggle";

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50 min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
            <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="font-bold text-xl">atqamz</Link>
              <div className="flex items-center space-x-6">
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link>
                <Link href="/resume" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resume</Link>
                <ThemeToggle />
              </div>
            </nav>
          </header>
          <main className="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
            {children}
          </main>
          <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
            <div className="flex justify-center space-x-4 mb-2">
              <a href="https://github.com/atqamz" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/atqamunzir/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">LinkedIn</a>
            </div>
            © {new Date().getFullYear()} Atqa Munzir.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
