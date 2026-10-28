import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "URL Encoding Guide — Percent-Encoding Explained",
  description:
    "Complete guide to URL percent-encoding: when to encode, encodeURI vs encodeURIComponent, plus signs vs %20, and how to debug broken query strings.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/url-encoding",
  },
  openGraph: {
    title: "URL Encoding Guide — Percent-Encoding Explained",
    description:
      "Learn when and how to percent-encode URLs, avoid double-encoding, and fix broken query strings.",
    url: "https://sudheertools.github.io/guides/url-encoding",
  },
};

export default function UrlEncodingGuide() {
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
        <span>URL Encoding</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          URL Encoding: A Practical Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Percent-encoding rules, the two JavaScript encode functions, and how
          to debug a query string that arrives mangled.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What Percent-Encoding Is
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            RFC 3986 restricts URLs to a small ASCII subset. Any character
            outside that subset — spaces, ampersands inside values, emoji,
            accented letters — is replaced by <code>%</code> plus two hex
            digits representing its UTF-8 byte. A space becomes %20, an
            ampersand becomes %26, and the é in café becomes the two-byte
            sequence %C3%A9.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            encodeURI vs encodeURIComponent
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Function</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Keeps</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Use For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-2 font-mono text-gray-900 dark:text-white">encodeURI</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">:/?#&amp;= intact</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Full URLs (rarely needed)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-gray-900 dark:text-white">encodeURIComponent</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">letters, digits, - _ . ! ~ * &apos; ( )</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Individual parameter values (almost always)</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            The near-universal rule: encode each value, never the whole URL.
            Encoding a full URL turns the path slashes into %2F and the server
            no longer sees the route you intended.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Space: %20 or +?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Both appear in the wild. %20 is the URL form; + is the form-body
            convention of application/x-www-form-urlencoded. encodeURIComponent
            always emits %20, which is correct in a query string and safe
            everywhere. Servers decode + as space only in form bodies; if your
            + arrives literally in a query value, the producer used the wrong
            convention.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Double-Encoding: the Silent Bug
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Encoding an already-encoded value turns % into %25. The server
            decodes one layer and hands your code a literal %20 string instead
            of a space. The telltale sign in logs is %2520. Fix: decode once
            before re-encoding, or encode exactly once at the boundary.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Debugging a Broken Query String
          </h2>
          <ol className="text-gray-600 dark:text-gray-400">
            <li>Copy the raw value after the first ? (or the specific parameter).</li>
            <li>Decode it with the URL Decoder to see what the server actually received.</li>
            <li>Check for truncated values — an unencoded &amp; inside a value ends it early.</li>
            <li>Check for %25 — that indicates double-encoding upstream.</li>
            <li>Re-encode the corrected value with the URL Encoder and redeploy.</li>
          </ol>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><Link href="/url-encode" className="text-blue-600 hover:underline dark:text-blue-400">URL Encoder</Link> — make text URL-safe</li>
            <li><Link href="/url-decode" className="text-blue-600 hover:underline dark:text-blue-400">URL Decoder</Link> — read percent-encoded strings</li>
            <li><Link href="/url-parser" className="text-blue-600 hover:underline dark:text-blue-400">URL Parser</Link> — split a URL into parts</li>
            <li><Link href="/url-validator" className="text-blue-600 hover:underline dark:text-blue-400">URL Validator</Link> — check a URL before shipping</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
