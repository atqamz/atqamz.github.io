import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { SiteShell } from "./components/site-shell";
import { TerminalFavicon } from "./components/terminal-favicon";

const siteUrl = "https://atqamz.github.io";

export const metadata: Metadata = {
  title: {
    default: "Atqa Munzir",
    template: "%s | Atqa Munzir",
  },
  description: "Game programmer, full-stack developer. Personal terminal.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Atqa Munzir",
    title: "Atqa Munzir",
    description: "Game programmer, full-stack developer. Personal terminal.",
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: "Atqa Munzir",
    description: "Game programmer, full-stack developer. Personal terminal.",
  },
};

const paletteInitScript = `(function(){try{var p=localStorage.getItem("terminal-palette");if(p&&["amber","blue","cyan","green","magenta","red"].indexOf(p)!==-1){document.documentElement.dataset.palette=p}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-layout="terminal" data-palette="blue">
      <head>
        <script dangerouslySetInnerHTML={{ __html: paletteInitScript }} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TerminalFavicon />
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
