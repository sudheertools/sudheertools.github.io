import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unix Timestamp Guide — Epoch Time Explained",
  description:
    "What Unix timestamps are, seconds vs milliseconds, UTC and timezone pitfalls, ISO 8601 conversion, and how to debug off-by-1000 timestamp bugs.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/unix-timestamps",
  },
  openGraph: {
    title: "Unix Timestamp Guide — Epoch Time Explained",
    description:
      "Understand epoch seconds vs milliseconds, timezone bugs, and ISO 8601 conversion.",
    url: "https://sudheertools.github.io/guides/unix-timestamps",
  },
};

export default function UnixTimestampGuide() {
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
        <span>Unix Timestamps</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Unix Timestamps: Complete Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Epoch time, the seconds-vs-milliseconds trap, timezone handling, and
          conversion to human-readable dates.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What a Unix Timestamp Is
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A Unix timestamp counts whole seconds (or milliseconds) elapsed
            since 1970-01-01T00:00:00Z — the Unix epoch. It is timezone-agnostic
            by design: the same integer means the same instant everywhere.
            Converting it for display is a presentation concern, which is why
            servers store epochs and clients render local time.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Seconds vs Milliseconds
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Unit</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Digits (2026)</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">JavaScript</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-2 text-gray-900 dark:text-white">Seconds</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">10 digits</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">new Date(n * 1000)</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-900 dark:text-white">Milliseconds</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">13 digits</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">new Date(n)</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Passing seconds to <code>new Date()</code> without multiplying
            produces a date in January 1970. Passing milliseconds where seconds
            are expected produces a date around the year 55,000. The 1000× error
            is the single most common timestamp bug.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Timezone Pitfalls
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>Display with toLocaleString() or Intl.DateTimeFormat, never by hand-adding offsets.</li>
            <li>Store UTC. Convert only at the edge.</li>
            <li>Date-only strings without a timezone specifier parse as local time in most engines — append Z or an offset.</li>
            <li>Daylight saving transitions can make naive hour arithmetic off by one.</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            ISO 8601
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            ISO 8601 strings like 2026-10-28T14:30:00Z are the human-readable
            counterpart of epochs. The trailing Z marks UTC; an offset such as
            +05:30 is also valid. Most databases accept both; pick one per
            column and stay consistent.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><Link href="/timestamp-converter" className="text-blue-600 hover:underline dark:text-blue-400">Timestamp Converter</Link> — convert epochs and ISO strings</li>
            <li><Link href="/cron-generator" className="text-blue-600 hover:underline dark:text-blue-400">Cron Generator</Link> — schedule recurring jobs against wall-clock time</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
