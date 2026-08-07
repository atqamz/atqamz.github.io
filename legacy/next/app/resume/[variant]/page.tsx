import { notFound } from "next/navigation";
import ResumeRenderer from "../ResumeRenderer";
import { getVariant, getVariantSlugs } from "../data";

export function generateStaticParams() {
  return getVariantSlugs().map((slug) => ({ variant: slug }));
}

export default async function ResumeVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  const data = getVariant(variant);

  if (!data) {
    notFound();
  }

  return (
    <>
      <section className="terminal-hero">
        <h1 className="terminal-title">/resume/{variant}</h1>
      </section>
      <ResumeRenderer data={data} />
    </>
  );
}
