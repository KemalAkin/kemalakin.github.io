import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../site";

export async function GET(context: APIContext) {
  const posts = (await getCollection("writing", (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
  return rss({
    title: `${SITE.name} · Writing`,
    description: "Notes on cosmology, dynamical systems, numerical methods and markets.",
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/writing/${p.id}/`,
      categories: [p.data.topic, ...p.data.tags],
    })),
  });
}
