import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const projectSchema = z.object({
  title: z.string(),
  titleEn: z.string().optional(),
  slug: z.string(),
  tagline: z.string(),
  summary: z.string(),
  category: z.enum(['platform', 'desktop', 'mobile', 'extension', 'library']),
  categoryLabel: z.string(),
  status: z.enum(['active', 'maintained', 'paused', 'archived']),
  statusLabel: z.string(),
  year: z.string(),
  role: z.string().optional(),
  platforms: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
  accent: z.enum(['blue', 'orange', 'purple', 'yellow']),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  cover: z.string().optional(),
  links: z.object({
    site: z.string().optional(),
    github: z.string().optional(),
    download: z.string().optional(),
    docs: z.string().optional()
  }).default({}),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  features: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
  gallery: z.array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() })).default([]),
  related: z.array(z.string()).default([])
})

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: projectSchema
    })
  }
})
