import type { CollectionEntry } from "astro:content";

export const SITE = {
  name: "Kemal Akın",
  tagline: "Physicist, data scientist",
  description:
    "Physicist by training, data scientist and engineer by trade. Pipelines and analyses behind financial data, plus notes on cosmology, dynamical systems and the mathematics underneath both.",
  location: "Istanbul",
};

export const SOCIAL = [
  { label: "GitHub", href: "https://github.com/KemalAkin" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kemal-akin" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=Pq0UrfQAAAAJ" },
  { label: "ORCID", href: "https://orcid.org/0000-0002-9989-8134" },
];

export const NAV = [
  { label: "Work", href: "/#work", match: "/work/" },
  { label: "Research", href: "/research/", match: "/research/" },
  { label: "Writing", href: "/writing/", match: "/writing/" },
  { label: "CV", href: "/cv/", match: "/cv/" },
];

/** Rough reading time for a markdown body (math and code count as words; good enough). */
export function readingTime(body: string | undefined): string {
  const words = (body ?? "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function formatDate(d: Date, opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" }): string {
  return d.toLocaleDateString("en-GB", { ...opts, timeZone: "UTC" });
}

/** Drafts render in `npm run dev` only; production builds and the RSS feed never include them. */
export function isPublished(entry: CollectionEntry<"writing">): boolean {
  return import.meta.env.DEV || !entry.data.draft;
}
