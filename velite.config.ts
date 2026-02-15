import { defineConfig, defineCollection, s } from "velite"

const timestamp = s.isodate()

const baseMeta = {
  title: s.string().max(120),
  description: s.string().max(260).optional(),
  date: timestamp,
  updated: timestamp.optional(),
  draft: s.boolean().default(false),
  tags: s.array(s.string()).default([]),
}

const blogs = defineCollection({
  name: "Blog",
  pattern: "blog/**/*.{md,mdx}",
  schema: s
    .object({
      ...baseMeta,
      slug: s.slug("blog"),
      cover: s.image().optional(),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      content: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/blog/${data.slug}`,
    })),
})

const essays = defineCollection({
  name: "Essay",
  pattern: "essays/**/*.{md,mdx}",
  schema: s
    .object({
      ...baseMeta,
      slug: s.slug("essay"),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      content: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/essays/${data.slug}`,
    })),
})

const labs = defineCollection({
  name: "Lab",
  pattern: "labs/**/*.{md,mdx}",
  schema: s
    .object({
      ...baseMeta,
      slug: s.slug("lab"),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      content: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/labs/${data.slug}`,
    })),
})

const architectures = defineCollection({
  name: "Architecture",
  pattern: "architecture/**/*.{md,mdx}",
  schema: s
    .object({
      ...baseMeta,
      slug: s.slug("architecture"),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      content: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/architecture/${data.slug}`,
    })),
})

const apps = defineCollection({
  name: "App",
  pattern: "apps/**/*.{md,mdx}",
  schema: s
    .object({
      ...baseMeta,
      slug: s.slug("app"),
      url: s.string().url().optional(),
      repo: s.string().url().optional(),
      metadata: s.metadata(),
      excerpt: s.excerpt(),
      content: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/apps/${data.slug}`,
    })),
})

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { blogs, essays, labs, architectures, apps },
})
