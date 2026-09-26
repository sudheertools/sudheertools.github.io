import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UUID Generation Guide — Create Unique Identifiers",
  description:
    "Complete guide to UUIDs: versions, use cases, generation methods, and best practices. Generate cryptographically secure UUID v4 identifiers with our free online tool.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/uuid-generation",
  },
  openGraph: {
    title: "UUID Generation Guide — Complete Tutorial",
    description:
      "Learn about UUID versions, when to use each, and how to generate secure identifiers.",
    url: "https://sudheertools.github.io/guides/uuid-generation",
  },
};

export default function UuidGenerationGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <nav className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600 dark:hover:text-blue-400">
          Guides
        </Link>
        <span className="mx-2">/</span>
        <span>UUID Generation</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          UUID Generation: Complete Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Everything about UUID versions, use cases, and secure generation.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is a UUID?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A UUID (Universally Unique Identifier) is a 128-bit identifier
            standardized by RFC 4122. Written as 32 hex digits in 5 groups
            separated by hyphens: <code>xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx</code>.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            The M digit indicates the version (1-8), and N indicates the variant
            (usually 8, 9, a, or b for RFC 4122 variant).
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            UUID Versions
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Version</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Method</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-2 font-semibold text-gray-900 dark:text-white">v1</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Time-based (timestamp + MAC)</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Ordered IDs, temporal sorting</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-900 dark:text-white">v2</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">DCE Security (with POSIX UID/GID)</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Legacy DCE systems</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-900 dark:text-white">v3</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Namespace + name (MD5 hash)</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Deterministic IDs from names</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-900 dark:text-white">v4</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Random (122 bits entropy)</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">General purpose, most common</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-900 dark:text-white">v5</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Namespace + name (SHA-1 hash)</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Deterministic, better than v3</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-900 dark:text-white">v6</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Reordered time-based</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Better sorting than v1</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-900 dark:text-white">v7</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Unix timestamp + random</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Time-ordered, modern standard</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-gray-900 dark:text-white">v8</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Custom vendor-specific</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Specialized use cases</td>
              </tr>
            </tbody>
          </table>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Why UUID v4 is Most Popular
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>No coordination needed:</strong> Generate independently
              across distributed systems
            </li>
            <li>
              <strong>High entropy:</strong> 122 random bits = 5.3×10^36
              possibilities
            </li>
            <li>
              <strong>Collision resistance:</strong> Negligible probability even
              at massive scale
            </li>
            <li>
              <strong>Simple:</strong> Just random bytes with version/variant bits
              set
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            When to Use Other Versions
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>v7 (or v6):</strong> When you need time-ordered IDs for
              database clustering (e.g., PostgreSQL UUID primary keys)
            </li>
            <li>
              <strong>v5:</strong> When you need deterministic IDs from a name
              (e.g., consistent ID for "user:123" across systems)
            </li>
            <li>
              <strong>v1:</strong> Legacy systems requiring MAC-based IDs
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Security Considerations
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Use cryptographically secure randomness.</strong> JavaScript's
            <code>Math.random()</code> is predictable and unsuitable for UUIDs.
            Use <code>crypto.randomUUID()</code> (Web Crypto API) or a CSPRNG
            library.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Our <a href="/uuid-generator" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">UUID Generator</a> uses <code>crypto.randomUUID()</code> for true
            cryptographic security.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Database Considerations
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>PostgreSQL:</strong> Use <code>uuid_generate_v4()</code> or
              <code>gen_random_uuid()</code> (pgcrypto). v7 preferred for
              clustering.
            </li>
            <li>
              <strong>MySQL:</strong> <code>UUID()</code> generates v1. For v4,
              use application-side generation.
            </li>
            <li>
              <strong>MongoDB:</strong> ObjectId is time-ordered (like v1/v7).
              Use UUID v4 for random distribution.
            </li>
            <li>
              <strong>Index performance:</strong> Random UUIDs (v4) cause page
              splits. Consider v7 or ULIDs for write-heavy workloads.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Alternatives
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>ULID:</strong> 128-bit, time-ordered, case-insensitive,
              URL-safe. Better for databases.
            </li>
            <li>
              <strong>NanoID:</strong> Smaller (21 chars), URL-safe, customizable
              alphabet. Good for short IDs.
            </li>
            <li>
              <strong>KSUID:</strong> 160-bit, time-ordered, sortable. Used at
              scale (Segment, etc.).
            </li>
            <li>
              <strong>Snowflake IDs:</strong> 64-bit, time + worker + sequence.
              Used by Twitter, Discord.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <a href="/uuid-generator" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                UUID Generator
              </a>{" "}
              — Generate v4 UUIDs (single or batch), copy to clipboard
            </li>
          </ul>
        </div>
      </article>

      <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/guides"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          &larr; Back to all guides
        </Link>
      </div>
    </div>
  );
}