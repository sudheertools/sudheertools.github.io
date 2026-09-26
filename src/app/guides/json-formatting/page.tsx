import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JSON Formatting Guide — Format, Validate & Beautify JSON",
  description:
    "Complete guide to JSON formatting: how to beautify, validate, minify JSON. Learn best practices, common errors, and use our free online JSON formatter.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/json-formatting",
  },
  openGraph: {
    title: "JSON Formatting Guide — Complete Tutorial",
    description:
      "Learn JSON formatting, validation, and minification with practical examples.",
    url: "https://sudheertools.github.io/guides/json-formatting",
  },
};

export default function JsonFormattingGuide() {
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
        <span>JSON Formatting</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          JSON Formatting: Complete Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Master JSON formatting, validation, and minification.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is JSON?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            JSON (JavaScript Object Notation) is a lightweight data interchange
            format. It's human-readable, language-independent, and based on a
            subset of JavaScript syntax. Defined in RFC 8259 and ECMA-404.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            JSON supports these data types:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><strong>String:</strong> <code>"hello"</code> (double quotes required)</li>
            <li><strong>Number:</strong> <code>42</code>, <code>3.14</code>, <code>-10</code></li>
            <li><strong>Boolean:</strong> <code>true</code>, <code>false</code></li>
            <li><strong>Null:</strong> <code>null</code></li>
            <li><strong>Object:</strong> <code>{'{"key": "value"}'}</code> (unordered key-value pairs)</li>
            <li><strong>Array:</strong> <code>[1, 2, 3]</code> (ordered list)</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Why Format JSON?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Minified JSON (single line) is efficient for transmission but
            unreadable. Formatting adds:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>Indentation (spaces or tabs)</li>
            <li>Line breaks between elements</li>
            <li>Consistent spacing around colons and commas</li>
            <li>Syntax highlighting (in editors)</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            This makes debugging, code review, and manual editing practical.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Common JSON Errors
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Error</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Cause</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">Trailing comma</td>
                <td className="py-2 text-gray-600 dark:text-gray-400"><code>{'{"a":1,}'}</code></td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Remove last comma</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">Single quotes</td>
                <td className="py-2 text-gray-600 dark:text-gray-400"><code>{"'a':1"}</code></td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Use double quotes</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">Unquoted keys</td>
                <td className="py-2 text-gray-600 dark:text-gray-400"><code>{'a:1'}</code></td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Quote all keys</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">Comments</td>
                <td className="py-2 text-gray-600 dark:text-gray-400"><code>{'//comment'}</code></td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Remove (not valid JSON)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">Undefined/NaN</td>
                <td className="py-2 text-gray-600 dark:text-gray-400"><code>{'a:NaN'}</code></td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Use null or number</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">Control chars</td>
                <td className="py-2 text-gray-600 dark:text-gray-400"><code>"a\nb"</code> (literal)</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Escape: <code>"a\\nb"</code></td>
              </tr>
            </tbody>
          </table>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Minification vs Formatting
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Minification</strong> removes all whitespace for production:
            smaller payloads, faster parsing. <strong>Formatting</strong> adds
            whitespace for development: readable, debuggable.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Best practice: Store/transmit minified, develop with formatted. Our
            tool does both instantly.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            JSON Schema Validation
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Beyond syntax validation, JSON Schema defines structure, types,
            required fields, and constraints. Use our{" "}
            <a href="/json-schema-validator" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              JSON Schema Validator
            </a>{" "}
            to validate data against a schema.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Best Practices
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>Always use UTF-8 encoding</li>
            <li>Use consistent key naming (camelCase or snake_case)</li>
            <li>Prefer objects over arrays for keyed data</li>
            <li>Don't use JSON for comments — use a separate docs file</li>
            <li>Validate on both client and server</li>
            <li>Set <code>Content-Type: application/json</code> header</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <a href="/json-formatter" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                JSON Formatter
              </a>{" "}
              — Format, validate, minify with syntax highlighting
            </li>
            <li>
              <a href="/json-validator" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                JSON Validator
              </a>{" "}
              — Quick syntax validation only
            </li>
            <li>
              <a href="/json-schema-validator" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                JSON Schema Validator
              </a>{" "}
              — Validate against JSON Schema
            </li>
            <li>
              <a href="/json-to-typescript" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                JSON to TypeScript
              </a>{" "}
              — Generate TypeScript interfaces from JSON
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