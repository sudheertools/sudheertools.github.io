import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cron Expression Guide — Schedule Syntax Explained",
  description:
    "Learn cron syntax: the five and six field formats, common schedules, timezone gotchas, and how to read cron expressions you inherit.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/cron-expressions",
  },
  openGraph: {
    title: "Cron Expression Guide — Schedule Syntax Explained",
    description:
      "Cron field-by-field syntax, common schedules, and timezone pitfalls.",
    url: "https://sudheertools.github.io/guides/cron-expressions",
  },
};

export default function CronExpressionsGuide() {
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
        <span>Cron Expressions</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Cron Expressions: Complete Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          The five-field format, common schedules, and the timezone traps that
          make jobs fire an hour off.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            The Five Fields
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Field</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Values</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">Minute</td><td className="py-2 text-gray-600 dark:text-gray-400">0–59</td><td className="py-2 text-gray-600 dark:text-gray-400">Minute of hour</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">Hour</td><td className="py-2 text-gray-600 dark:text-gray-400">0–23</td><td className="py-2 text-gray-600 dark:text-gray-400">Hour of day</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">Day of month</td><td className="py-2 text-gray-600 dark:text-gray-400">1–31</td><td className="py-2 text-gray-600 dark:text-gray-400">Day of month</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">Month</td><td className="py-2 text-gray-600 dark:text-gray-400">1–12 or names</td><td className="py-2 text-gray-600 dark:text-gray-400">Month</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">Day of week</td><td className="py-2 text-gray-600 dark:text-gray-400">0–7 (0 and 7 = Sunday)</td><td className="py-2 text-gray-600 dark:text-gray-400">Weekday</td></tr>
            </tbody>
          </table>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Quartz and some Java schedulers add a leading seconds field, making
            six fields. Spring cron is six-field; classic Vixie cron is five.
            When a schedule misfires, count the fields first.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Common Schedules
          </h2>
          <table className="w-full text-sm text-left">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">*/5 * * * *</td><td className="py-2 text-gray-600 dark:text-gray-400">Every 5 minutes</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">0 * * * *</td><td className="py-2 text-gray-600 dark:text-gray-400">Top of every hour</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">0 9 * * 1-5</td><td className="py-2 text-gray-600 dark:text-gray-400">Weekdays at 09:00</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">0 0 1 * *</td><td className="py-2 text-gray-600 dark:text-gray-400">Midnight on the 1st</td></tr>
              <tr><td className="py-2 font-mono text-gray-900 dark:text-white">30 2 * * 0</td><td className="py-2 text-gray-600 dark:text-gray-400">Sunday at 02:30</td></tr>
            </tbody>
          </table>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Timezone Gotchas
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Classic cron runs in the server&apos;s local timezone. A container
            defaulting to UTC will fire 0 9 * * * at 09:00 UTC, not 09:00
            IST or EST. Fix by setting the container TZ, using a scheduler that
            accepts an IANA timezone (Temporal, cron with TZ=), or storing
            offsets explicitly. Daylight saving transitions can skip or repeat
            an occurrence; design jobs to be idempotent.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><Link href="/cron-generator" className="text-blue-600 hover:underline dark:text-blue-400">Cron Generator</Link> — build expressions from natural choices</li>
            <li><Link href="/timestamp-converter" className="text-blue-600 hover:underline dark:text-blue-400">Timestamp Converter</Link> — convert epoch values for schedule debugging</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
