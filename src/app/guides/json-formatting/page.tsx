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
          Master JSON formatting, validation, and minification — indentation,
          style rules, common errors, and when to minify.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is JSON?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            JSON (JavaScript Object Notation) is a lightweight data interchange
            format. It&apos;s human-readable, language-independent, and based on
            a subset of JavaScript syntax. Defined in RFC 8259 and ECMA-404.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            A JSON document is a single value: an object, an array, a string, a
            number, <code>true</code>, <code>false</code>, or <code>null</code>.
            Anything outside that grammar — comments, trailing commas,
            single-quoted strings, <code>undefined</code>, <code>NaN</code>, and
            functions — is not JSON, even though JavaScript object literals
            happily accept it. That gap between JavaScript syntax and strict
            JSON is where most formatting errors come from: code written as an
            object literal gets pasted into a place that requires JSON.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            JSON supports these data types:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><strong>String:</strong> <code>&quot;hello&quot;</code> (double quotes required)</li>
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
            Minified JSON (a single line) is efficient for transmission but
            unreadable. Formatting adds indentation, line breaks between
            elements, consistent spacing around colons and commas, and syntax
            highlighting in editors. The benefit is not cosmetic — it is
            practical:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Diffs and code review:</strong> version control compares
              text line by line. A minified document is one line, so changing a
              single value rewrites the whole file, and two branches touching
              different fields always conflict. Formatted JSON keeps each field
              on its own line, so a reviewer sees exactly what changed.
            </li>
            <li>
              <strong>Logs:</strong> one pretty-printed payload in a stack trace
              is readable in place; a minified one has to be copied into an
              editor before anyone can tell what failed.
            </li>
            <li>
              <strong>Exploration:</strong> nested config files and API
              responses are only navigable when every level starts on a new
              line.
            </li>
            <li>
              <strong>Error spotting:</strong> a missing brace or quote is
              visible at a glance in a formatted document.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            Formatting never changes your data. RFC 8259 makes whitespace
            outside strings insignificant, so a formatter only rewrites layout.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Indentation: 2 vs 4 vs Tabs
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Indentation is cosmetic — spaces and tabs are both valid whitespace
            — but choosing one convention and enforcing it matters:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>2 spaces:</strong> the default across the JavaScript and
              TypeScript ecosystem (Prettier, ESLint, most documentation). It
              keeps deeply nested structures within a readable line width.
            </li>
            <li>
              <strong>4 spaces:</strong> common in Python projects and some
              Java-adjacent configuration, where it matches house style.
            </li>
            <li>
              <strong>Tabs:</strong> one character regardless of font, so each
              developer can set their own display width. Teams avoid them when
              files are viewed in browsers, terminals, or diffs that render tab
              width differently.
            </li>
            <li>
              <strong>8 spaces:</strong> rarely used; helpful only when wide
              nesting must be unmistakable.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            Whatever you pick, apply it to the whole file and encode it in an{" "}
            <code>.editorconfig</code> or a formatter so indentation never shows
            up as noise in a diff. The JSON Formatter lets you switch between
            tab, 2, 4, and 8 spaces before you copy the result.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            JSON Style Conventions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Strict JSON leaves few decisions to the author, and that is the
            point. The conventions worth following everywhere:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              Quote every key and string with double quotes — single quotes are
              a syntax error, not a style preference.
            </li>
            <li>
              No trailing comma after the last element of an object or array.
            </li>
            <li>
              No comments. Put explanations in a README, a JSON Schema{" "}
              <code>description</code>, or use JSONC/JSON5 only where the parser
              explicitly supports it (for example{" "}
              <code>tsconfig.json</code> and VS Code settings).
            </li>
            <li>
              Pick one key naming convention — camelCase or snake_case — and
              apply it to every key in an API.
            </li>
            <li>
              Numbers: JSON allows integers, fractions, and exponents, but
              rejects <code>NaN</code>, <code>Infinity</code>, hexadecimal
              (<code>0x1F</code>), leading zeros (<code>007</code>), and a
              leading plus (<code>+5</code>).
            </li>
            <li>
              Keep large IDs as strings. JSON numbers are parsed as IEEE-754
              doubles, so integers beyond 9007199254740991 (2^53 − 1) silently
              lose precision — a classic bug with database and snowflake-style
              keys.
            </li>
            <li>
              Store money as integer minor units (cents) or fixed-decimal
              strings (<code>&quot;19.99&quot;</code>) rather than binary
              floats.
            </li>
            <li>
              Avoid duplicate keys: RFC 8259 says names should be unique, and
              most parsers quietly keep the last value, hiding data instead of
              raising an error.
            </li>
            <li>
              Keep key order stable in files you commit, so reformatting
              produces a clean, reviewable diff.
            </li>
          </ul>

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
                <td className="py-2 font-mono text-gray-700 dark:text-gray-300">Raw newline</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">String spans two physical lines</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Escape it: <code>&quot;a\nb&quot;</code></td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-600 dark:text-gray-400">
            A formatter cannot guess your intent, but it does pinpoint the first
            thing that stops the document from parsing: paste the input and you
            get <code>Invalid JSON at position N</code>, which you can jump to
            in the editor. Most broken documents are JavaScript object literals
            pasted into a JSON slot — single quotes, unquoted keys, comments,
            and trailing commas are all legal in JavaScript and all fatal in
            JSON. The same applies to <code>undefined</code>,{" "}
            <code>NaN</code>, <code>Infinity</code>, and functions, which have
            no JSON representation at all.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Minification vs Formatting
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Minification</strong> removes all whitespace for
            transmission: smaller payloads, no wasted bytes.{" "}
            <strong>Formatting</strong> adds whitespace for development:
            readable, diffable, debuggable. Both parse with a single linear
            pass — <code>JSON.parse</code> accepts either — so the real
            trade-offs are about humans, not speed:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Size:</strong> whitespace can double or triple a deeply
              nested document. On the wire this costs less than it looks,
              because gzip and Brotli compress repeated indentation almost
              entirely away — but uncompressed API responses, log volume, and
              pasted payloads still pay the full price.
            </li>
            <li>
              <strong>Debugging:</strong> formatted output shows which key
              changed and where a nesting level broke. Minified output hides
              both until you reformat it.
            </li>
            <li>
              <strong>Review:</strong> commit formatted JSON so a reviewer sees
              a one-line diff instead of what looks like a rewritten file.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            Rule of thumb: develop, commit, and debug formatted; minify only
            what crosses the network or is archived where nobody reads it — API
            responses, embedded payloads, bulk logs. Our formatter switches
            between both instantly.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            JSON Schema Validation
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Syntax validation only proves a document is well-formed. It says
            nothing about whether <code>price</code> must be a number,{" "}
            <code>id</code> is required, or <code>status</code> is limited to
            three allowed values. JSON Schema fills that gap: a machine-readable
            contract describing structure, types, required fields, enums,
            numeric ranges, string patterns, and nested objects.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Use a schema whenever JSON crosses a boundary:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>API request and response contracts shared between teams</li>
            <li>
              Configuration files that should fail fast with a clear message
            </li>
            <li>Test fixtures and sample data that must stay consistent</li>
            <li>
              Code generation: schemas can produce TypeScript interfaces,
              client models, and documentation
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            Schemas are themselves JSON (the current standard is draft 2020-12),
            so they use the same tooling as everything else. Beyond syntax, use
            our{" "}
            <a href="/json-schema-validator" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              JSON Schema Validator
            </a>{" "}
            to validate data against a schema and see exactly which rule
            failed.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Best Practices
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>Always use UTF-8 encoding</li>
            <li>Use consistent key naming (camelCase or snake_case)</li>
            <li>Prefer objects over arrays for keyed data</li>
            <li>Don&apos;t use JSON for comments — use a separate docs file or a Schema description</li>
            <li>Validate on both client and server</li>
            <li>Set <code>Content-Type: application/json</code> header</li>
            <li>Keep large numeric IDs as strings to avoid precision loss</li>
            <li>Format with a tool or editor command, never by hand</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <dl className="text-gray-600 dark:text-gray-400">
            <dt className="font-semibold text-gray-900 dark:text-white mt-4">
              Does formatting change my JSON data?
            </dt>
            <dd className="mt-1">
              No. Whitespace outside strings is insignificant under RFC 8259, so
              a formatter only rewrites layout. One caveat: a formatter parses
              and re-serializes, so number literals are normalized (1.50 becomes
              1.5), duplicate keys collapse to the last value, and integers
              larger than 2^53 − 1 lose precision — keep such values as strings.
            </dd>
            <dt className="font-semibold text-gray-900 dark:text-white mt-4">
              What is the difference between JSON, JSONC, and JSON5?
            </dt>
            <dd className="mt-1">
              JSON is the strict standard (RFC 8259). JSONC adds comments and
              trailing commas for tools like VS Code settings and{" "}
              <code>tsconfig.json</code>. JSON5 additionally allows single
              quotes, unquoted keys, and hexadecimal numbers. They are not
              interchangeable: only strict JSON parses in the browser with{" "}
              <code>JSON.parse</code> and in API payloads without a converter.
            </dd>
            <dt className="font-semibold text-gray-900 dark:text-white mt-4">
              How do I format JSON from the terminal?
            </dt>
            <dd className="mt-1">
              Use jq: <code>jq . file.json</code> pretty-prints with two-space
              indentation, and <code>jq -c . file.json</code> minifies it.
              Python users can pipe through <code>python -m json.tool</code>.
              For anything you commit or share, format it first so the output is
              stable and diffable.
            </dd>
          </dl>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <a href="/json-formatter" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                JSON Formatter
              </a>{" "}
              — Format, validate, minify with syntax highlighting; choose tab,
              2, 4, or 8 spaces and see line and key counts
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
