import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Changelog — DevTools",
  description:
    "Every update to DevTools: new tools, content improvements, structured data fixes, and platform changes.",
  alternates: {
    canonical: "https://sudheertools.github.io/changelog",
  },
};

const entries = [
  {
    date: "October 15, 2026",
    title: "Content & quality overhaul",
    items: [
      "Every one of the 69 tool pages now includes a full guide: what the tool is, why to use it, step-by-step instructions, worked examples, real-world use cases, and FAQs.",
      "Removed duplicated inline tool descriptions in favour of a single maintained content source.",
      "Differentiated overlapping tools: the two gradient generators now have distinct purposes, descriptions, and examples.",
    ],
  },
  {
    date: "October 15, 2026",
    title: "Structured data & SEO fixes",
    items: [
      "Per-tool SoftwareApplication and FAQ schema is now emitted from the shared tool layout, matching the visible page content.",
      "Sitewide FAQPage schema scoped to the homepage only, so it matches the FAQs actually shown there.",
      "Removed the unused Sitelinks SearchAction box (the site has no search results page).",
      "BreadcrumbList schema deduplicated; 404 page marked noindex.",
      "Open Graph and Twitter card images switched to a PNG that social and ad crawlers can actually render.",
      "Sitemap regenerated from code with correct dates and now includes /about, /privacy, /terms, /contact, /changelog, and all guide pages.",
      "Added a web app manifest.",
    ],
  },
  {
    date: "September 2026",
    title: "11 new tools added",
    items: [
      "DevOps: Terraform Generator, Dockerfile Generator, Helm Chart Generator.",
      "FinTech: SIP Calculator, EMI Calculator, Subnet Calculator (networking).",
      "AI: Token Counter.",
      "Text, color, and validation utilities to round out the catalog.",
    ],
  },
  {
    date: "September 2026",
    title: "Guide pages launched",
    items: [
      "Six long-form guides: JSON formatting, JWT decoding, Base64 encoding, UUID generation, regex testing, and hash functions.",
    ],
  },
  {
    date: "September 2026",
    title: "Privacy-first redesign",
    items: [
      "Homepage rebuilt around the privacy narrative: how it works, standards and references, and quick comparisons.",
      "All tool processing confirmed to run entirely in the browser — no server round-trips.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Changelog
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Every update to DevTools, newest first. All dates are real release
        dates for the changes described.
      </p>

      <div className="mt-10 space-y-10">
        {entries.map((entry, i) => (
          <section key={i}>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {entry.date}
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
              {entry.title}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-400">
              {entry.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
        Looking for something else?{" "}
        <Link
          href="/"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Browse all 69 tools
        </Link>{" "}
        or read the{" "}
        <Link
          href="/guides"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          guides
        </Link>
        .
      </p>
    </div>
  );
}
