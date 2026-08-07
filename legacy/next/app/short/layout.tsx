import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Link Manager",
  robots: { index: false, follow: false },
};

export default function ShortLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
