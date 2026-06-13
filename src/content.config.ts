import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    date: z.string(),
    readTime: z.string(),
    author: z.string().default("SUNSTAR Engineering Team"),
  }),
});

export const collections = {
  blog: blogCollection,
};
