import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JSON to Code Guide — Generating Types from JSON",
  description:
    "How to turn JSON payloads into TypeScript, Go, Rust, and Dart types: quicktype workflow, naming, optional fields, and handling nested and polymorphic data.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/json-to-code",
  },
  openGraph: {
    title: "JSON to Code Guide — Generating Types from JSON",
    description:
      "Turn sample JSON into TypeScript, Go, Rust, and Dart types with correct optional and nested handling.",
    url: "https://sudheertools.github.io/guides/json-to-code",
  },
};

export default function JsonToCodeGuide() {
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
        <span>JSON to Code</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          JSON to Code: Generating Types from Sample Data
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A practical workflow for converting real API payloads into TypeScript,
          Go, Rust, or Dart types you can trust.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Why Infer From Real Payloads
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Hand-writing interfaces from API documentation drifts within days.
            Inferring from an actual response captures the field names, nesting,
            and nullability the server really sends — including fields the docs
            forgot. The result compiles immediately, so mismatches surface at
            type-check time instead of in production.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            The Workflow
          </h2>
          <ol className="text-gray-600 dark:text-gray-400">
            <li>Capture a full response from DevTools or curl, including error shapes if the API returns them.</li>
            <li>Run it through a generator for your language (JSON to TypeScript, Go, Rust, or Dart).</li>
            <li>Rename inferred types: data, response, and Item become domain names like User and OrderItem.</li>
            <li>Mark fields the API omits as optional or nullable; generators guess from the sample, not the contract.</li>
            <li>Regenerate when the payload shape changes; diff the types in code review.</li>
          </ol>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Optional, Null, and Union Fields
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>A field present with value null means the type should allow null, not that it is optional.</li>
            <li>A field absent in the sample may still appear; treat it as optional unless the contract says otherwise.</li>
            <li>Mixed-type arrays (string or number) become unions in TypeScript, interface{} in Go, Value in Rust.</li>
            <li>Large integers above 2^53 lose precision in JavaScript Number; use string or BigInt on the wire.</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><Link href="/json-to-typescript" className="text-blue-600 hover:underline dark:text-blue-400">JSON to TypeScript</Link> — interfaces and unions</li>
            <li><Link href="/json-to-go" className="text-blue-600 hover:underline dark:text-blue-400">JSON to Go</Link> — structs with json tags</li>
            <li><Link href="/json-to-rust" className="text-blue-600 hover:underline dark:text-blue-400">JSON to Rust</Link> — serde structs</li>
            <li><Link href="/json-to-dart" className="text-blue-600 hover:underline dark:text-blue-400">JSON to Dart</Link> — classes with fromJson</li>
            <li><Link href="/json-formatter" className="text-blue-600 hover:underline dark:text-blue-400">JSON Formatter</Link> — clean the payload before converting</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
