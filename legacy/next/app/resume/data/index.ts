import type { ResumeData } from "../types";
import base from "./base";

const variants: Record<string, ResumeData> = {
  base,
};

export function getVariant(slug: string): ResumeData | undefined {
  return variants[slug];
}

export function getVariantSlugs(): string[] {
  return Object.keys(variants);
}
