import ResumeRenderer from "./ResumeRenderer";
import base from "./data/base";

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
