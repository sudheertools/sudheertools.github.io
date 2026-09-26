import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regex Testing Guide — Master Regular Expressions",
  description:
    "Complete guide to regular expressions: syntax, flags, capture groups, lookaheads, and practical patterns. Test and debug regex with our free online regex tester.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/regex-testing",
  },
  openGraph: {
    title: "Regex Testing Guide — Complete Tutorial",
    description:
      "Learn regex syntax, flags, capture groups, and practical patterns with examples.",
    url: "https://sudheertools.github.io/guides/regex-testing",
  },
};

export default function RegexTestingGuide() {
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
        <span>Regex Testing</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Regular Expressions: Complete Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Master regex syntax, flags, capture groups, and debugging techniques.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What are Regular Expressions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A regular expression (regex) is a sequence of characters that defines a
            search pattern. Used for string matching, validation, extraction, and
            replacement. JavaScript uses the ECMAScript regex flavor (similar to
            Perl/PCRE but with some differences).
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Basic Syntax
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Pattern</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Matches</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">.</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Any character except newline</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">\d</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Digit (0-9)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">\D</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Non-digit</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">\w</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Word char (a-z, A-Z, 0-9, _)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">\W</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Non-word char</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">\s</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Whitespace (space, tab, newline)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">\S</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Non-whitespace</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">^</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Start of string (or line with m flag)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">$</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">End of string (or line with m flag)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">[abc]</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">a, b, or c (character class)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">[^abc]</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Not a, b, or c (negated class)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">[a-z]</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Range: a through z</td>
              </tr>
            </tbody>
          </table>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Quantifiers
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Quantifier</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">*</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">0 or more (greedy)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">+</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">1 or more (greedy)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">?</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">0 or 1 (optional)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">{'n'}</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Exactly n times</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">{'n,'}</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">n or more times</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">{'n,m'}</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Between n and m times</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">*?, +?, ??</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Lazy (non-greedy) versions</td>
              </tr>
            </tbody>
          </table>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Flags
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><strong>g</strong> — Global: find all matches, not just first</li>
            <li><strong>i</strong> — Case-insensitive</li>
            <li><strong>m</strong> — Multiline: ^/$ match line boundaries</li>
            <li><strong>s</strong> — DotAll: . matches newline too</li>
            <li><strong>u</strong> — Unicode: full Unicode support for \w, \d, etc.</li>
            <li><strong>y</strong> — Sticky: match only at lastIndex position</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Groups & Captures
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><code>(...)</code> — Capturing group (accessible via $1, $2...)</li>
            <li><code>(?:...)</code> — Non-capturing group (grouping only)</li>
            <li><code>{"(?<name>...)"}</code> — Named capture group (ES2018+)</li>
            <li><code>\1, \2</code> — Backreferences in pattern</li>
            <li><code>$1, $2</code> — Backreferences in replacement</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Assertions (Zero-Width)
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><code>(?=...)</code> — Positive lookahead</li>
            <li><code>(?!...)</code> — Negative lookahead</li>
            <li><code>{"(?<=...)"}</code> — Positive lookbehind (ES2018+)</li>
            <li><code>{"(?<!...)"}</code> — Negative lookbehind (ES2018+)</li>
            <li><code>\b</code> — Word boundary</li>
            <li><code>\B</code> — Non-word boundary</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Practical Patterns
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Use Case</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Pattern</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-2 text-gray-700 dark:text-gray-300">Email (basic)</td>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">^[\w.-]+@[\w.-]+\.\w+$</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700 dark:text-gray-300">URL</td>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">^https?://[\w.-]+\.\w+(/\S*)?$</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700 dark:text-gray-300">IPv4 address</td>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">^(\d{'{1,3}'}\.){'{3}'}\d{'{1,3}'}$</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700 dark:text-gray-300">Date (YYYY-MM-DD)</td>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">^\d{'{4}'}-\d{'{2}'}-\d{'{2}'}$</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700 dark:text-gray-300">UUID v4</td>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">^[0-9a-f]{'8'}-[0-9a-f]{'4'}-4[0-9a-f]{'3'}-[89ab][0-9a-f]{'3'}-[0-9a-f]{'12'}$</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700 dark:text-gray-300">Credit card (Luhn-ready)</td>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">^\d{'4'}[-\s]?\d{'4'}[-\s]?\d{'4'}[-\s]?\d{'4'}$</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700 dark:text-gray-300">HTML tag</td>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300"><code>{'<[^>]+>'}</code></td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700 dark:text-gray-300">Whitespace trim</td>
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">^\s+|\s+$</td>
              </tr>
            </tbody>
          </table>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Debugging Tips
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>Start simple, add complexity incrementally</li>
            <li>Use our <a href="/regex-tester" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Regex Tester</a> for live feedback</li>
            <li>Test edge cases: empty string, special chars, unicode</li>
            <li>Escape special chars when matching literally: <code>{"\\. \\* \\+ \\? \\{ \\} \\( \\) \\[ \\] \\| \\^ \\$ \\\\"}</code></li>
            <li>Beware catastrophic backtracking with nested quantifiers</li>
            <li>Use non-capturing groups <code>(?:...)</code> when you don't need captures</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <a href="/regex-tester" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Regex Tester
              </a>{" "}
              — Live matching, capture groups, replacement preview
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