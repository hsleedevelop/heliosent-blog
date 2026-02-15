import { defineConfig, defineCollection, s } from "velite"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeShiki from "@shikijs/rehype"
import type { RehypeShikiOptions } from "@shikijs/rehype"
import type { ShikiTransformer } from "shiki"

const timestamp = s.isodate()

const baseMeta = {
  title: s.string().max(120),
  description: s.string().max(260).optional(),
  date: timestamp,
  updated: timestamp.optional(),
  draft: s.boolean().default(false),
  tags: s.array(s.string()).default([]),
  featured: s.boolean().default(false),
  series: s.string().optional(),
  seriesOrder: s.number().optional(),
}

/** Adds data-filename attribute to <pre> when code fence has filename="..." meta */
const codeMetaTransformer: ShikiTransformer = {
  name: "code-meta",
  pre(node) {
    const raw = this.options.meta?.__raw
    if (typeof raw === "string") {
      const match = raw.match(/filename="([^"]+)"/)
      if (match) {
        node.properties["data-filename"] = match[1]
      }
    }
  },
}

const shikiOptions: RehypeShikiOptions = {
  themes: {
    light: "github-light",
    dark: "github-dark",
  },
  defaultColor: "light",
  transformers: [codeMetaTransformer],
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
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- velite's bundled unified types conflict with @shikijs/rehype
      [rehypeShiki as any, shikiOptions],
    ],
  },
})
