import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
    locked: z.boolean().default(false),
    metrics: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })).optional(),
    aiBuilt: z.boolean().default(false),
    hidden: z.boolean().default(false),
  }),
});

export const collections = { work };
