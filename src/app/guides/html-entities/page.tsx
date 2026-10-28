import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HTML Entities Guide — Escaping & Decoding Markup",
  description:
    "Guide to HTML character entities: named, decimal, and hex forms, when escaping is required, XSS prevention, and how to decode raw entities from page source.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/html-entities",
  },
  openGraph: {
    title: "HTML Entities Guide — Escaping & Decoding Markup",
    description:
      "Learn the three entity forms, when escaping prevents XSS, and how to decode entities from copied markup.",
    url: "https://sudheertools.github.io/guides/html-entities",
  },
};

export default function HtmlEntitiesGuide() {
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
        <span>HTML Entities</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          HTML Entities: Complete Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          The three reference forms, which characters require escaping, and how
          to recover readable text from entity-encoded content.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Three Forms
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Form</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Syntax</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-2 text-gray-900 dark:text-white">Named</td>
                <td className="py-2 font-mono text-gray-600 dark:text-gray-400">&amp;name;</td>
                <td className="py-2 font-mono text-gray-600 dark:text-gray-400">&amp;amp; &amp;lt; &amp;copy; &amp;hellip;</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-900 dark:text-white">Decimal</td>
                <td className="py-2 font-mono text-gray-600 dark:text-gray-400">&amp;#N;</td>
                <td className="py-2 font-mono text-gray-600 dark:text-gray-400">&amp;#33; → !</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-900 dark:text-white">Hex</td>
                <td className="py-2 font-mono text-gray-600 dark:text-gray-400">&amp;#xN;</td>
                <td className="py-2 font-mono text-gray-600 dark:text-gray-400">&amp;#x1F600; → 😀</td>
              </tr>
            </tbody>
          </table>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Characters That Must Be Escaped
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            In text nodes, three characters carry meaning and must always be
            escaped: <code>&lt;</code>, <code>&gt;</code>, and <code>&amp;</code>.
            Double quotes and apostrophes matter inside quoted attributes.
            Everything else, including accented letters and emoji, can remain
            literal. A minimal, correct escaper escapes exactly those three.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Entities and XSS
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            An unescaped user comment containing
            <code> &lt;script&gt;…&lt;/script&gt;</code> executes in every
            reader&apos;s browser — the classic stored XSS. Escaping the angle
            brackets turns the payload into visible text. When output context is
            a quoted attribute, also escape double quotes so a value cannot
            break out with <code>&quot; onclick=…</code>. When inserting into a
            <code>javascript:</code> URL context, escaping alone is insufficient;
            block the scheme instead.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Decoding Entities You Copied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            View-source and RSS feeds show entities exactly as stored. Paste the
            fragment into the HTML Decoder to resolve named, decimal, and hex
            references in one pass. Double-encoded content
            (<code>&amp;amp;amp;</code>) needs one decode per layer; the tool
            is safe to run repeatedly because plain text passes through
            unchanged.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><Link href="/html-encode" className="text-blue-600 hover:underline dark:text-blue-400">HTML Encoder</Link> — escape text for safe insertion</li>
            <li><Link href="/html-decode" className="text-blue-600 hover:underline dark:text-blue-400">HTML Decoder</Link> — resolve entities back to text</li>
            <li><Link href="/html-entities" className="text-blue-600 hover:underline dark:text-blue-400">HTML Entities Reference</Link> — lookup table of common entities</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
