import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Guides — In-Depth Tutorials & References",
  description:
    "Complete guides for developers: Base64 encoding, JSON formatting, JWT decoding, regex testing, UUID generation, hash functions, and more.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides",
  },
  openGraph: {
    title: "Developer Guides — In-Depth Tutorials",
    description:
      "Complete guides for developers: Base64, JSON, JWT, Regex, UUID, Hash functions.",
    url: "https://sudheertools.github.io/guides",
    siteName: "DevTools",
    type: "website",
  },
};

const guides = [
  {
    slug: "json-formatting",
    title: "JSON Formatting Guide",
    description: "Format, validate, minify JSON. Common errors, best practices, schema validation.",
    icon: "JSON",
  },
  {
    slug: "jwt-decoding",
    title: "JWT Decoding Guide",
    description: "How JWT tokens work, decoding header/payload, security considerations, common claims.",
    icon: "JWT",
  },
  {
    slug: "base64-encoding",
    title: "Base64 Encoding Guide",
    description: "What Base64 is, how it works, when to use it, Base64 vs Base64URL, common pitfalls.",
    icon: "B64",
  },
  {
    slug: "regex-testing",
    title: "Regex Testing Guide",
    description: "Regex syntax, flags, capture groups, lookaheads, practical patterns, debugging tips.",
    icon: "REG",
  },
  {
    slug: "uuid-generation",
    title: "UUID Generation Guide",
    description: "UUID versions (v1-v8), when to use each, database considerations, alternatives.",
    icon: "UID",
  },
  {
    slug: "hash-functions",
    title: "Hash Functions Guide",
    description: "MD5, SHA-1, SHA-256, SHA-512: security status, use cases, password hashing, HMAC.",
    icon: "HASH",
  },
];

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Developer Guides
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        In-depth tutorials and references for common developer tasks.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              {guide.icon}
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {guide.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {guide.description}
            </p>
            <span className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              Read guide →
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Suggest a Guide
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Want a guide on a specific topic?{" "}
          <a
            href="https://github.com/sudheertools/sudheertools.github.io/issues/new?template=feature_request.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Open a feature request on GitHub
          </a>
          .
        </p>
      </section>

      <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          &larr; Back to all tools
        </Link>
      </div>
    </div>
  );
}