export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://blog.heliosent.com"

export const siteConfig = {
  name: "HelioSent",
  url: SITE_URL,
  description:
    "An engineering space for structured thinking and applied systems.",
  locale: "en_US",
  author: {
  name: "HelioAent Blog",
    url: SITE_URL,
  },
} as const
