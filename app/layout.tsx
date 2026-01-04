import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { SiteShell } from "./components/site-shell";
import { TerminalFavicon } from "./components/terminal-favicon";

export const metadata: Metadata = {
  title: "Atqa Munzir's terminal",
  description: "Welcome to my personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-layout="terminal" data-palette="amber">
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TerminalFavicon />
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
