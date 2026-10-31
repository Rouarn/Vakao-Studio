export type Accent = 'blue' | 'orange' | 'purple' | 'yellow'

export interface Project {
  title: string
  titleEn?: string
  slug: string
  tagline: string
  summary: string
  category: 'platform' | 'desktop' | 'mobile' | 'extension' | 'library'
  categoryLabel: string
  status: 'active' | 'maintained' | 'paused' | 'archived'
  statusLabel: string
  year: string
  role?: string
  platforms: string[]
  stack: string[]
  accent: Accent
  featured: boolean
  order: number
  cover?: string
  links: {
    site?: string
    github?: string
    download?: string
    docs?: string
  }
  metrics: { label: string; value: string }[]
  features: { title: string; description: string }[]
  gallery: { src: string; alt: string; caption?: string }[]
  related: string[]
  path?: string
  body?: unknown
}
