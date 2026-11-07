import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** Small label above the title, e.g. "Computational epidemiology". */
    topic: z.string(),
    tags: z.array(z.string()).default([]),
    interactive: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** Context label, e.g. "M.Sc. thesis" or "Side project". */
    kind: z.string().optional(),
    year: z.string().optional(),
    stack: z.array(z.string()).default([]),
    /** Featured projects get a card with a generated thumbnail on the home page. */
    featured: z.boolean().default(false),
    thumb: z.enum(["sir", "phase", "inflation", "candles"]).optional(),
    order: z.number().default(100),
    /** Related note in the writing collection, if any. */
    note: z.string().optional(),
  }),
});

const talks = defineCollection({
  loader: file("src/data/talks.yaml"),
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    place: z.string(),
    date: z.coerce.date(),
    language: z.string().optional(),
    summary: z.string(),
    video: z.url().optional(),
    slides: z.string().optional(),
  }),
});

const publications = defineCollection({
  loader: file("src/data/publications.yaml"),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    abstract: z.string(),
    links: z.array(z.object({ label: z.string(), href: z.string() })),
  }),
});

const teaching = defineCollection({
  loader: file("src/data/teaching.yaml"),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    institution: z.string(),
    years: z.string(),
    order: z.number(),
    summary: z.string(),
    topics: z.array(z.string()).default([]),
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
  }),
});

export const collections = { writing, work, talks, publications, teaching };
