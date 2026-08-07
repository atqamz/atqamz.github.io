import type { Metadata } from "next";
import ResumeRenderer from "./ResumeRenderer";
import base from "./data/base";

export const metadata: Metadata = {
  title: "Resume",
  description: "Professional experience and education of Atqa Munzir.",
  openGraph: {
    title: "Resume | Atqa Munzir",
    description: "Professional experience and education of Atqa Munzir.",
  },
};

export default function ResumePage() {
  return (
    <>
      <section className="terminal-hero">
        <h1 className="terminal-title">/resume</h1>
      </section>
      <ResumeRenderer data={base} />
    </>
  );
}
