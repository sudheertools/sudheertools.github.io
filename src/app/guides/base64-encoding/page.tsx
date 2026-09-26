import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Base64 Encoding Guide — How to Encode and Decode Data",
  description:
    "Complete guide to Base64 encoding: what it is, how it works, when to use it, and practical examples. Learn to encode/decode text, images, and binary data.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/base64-encoding",
  },
  openGraph: {
    title: "Base64 Encoding Guide — Complete Tutorial",
    description:
      "Learn Base64 encoding: what it is, how it works, and practical examples.",
    url: "https://sudheertools.github.io/guides/base64-encoding",
  },
};

export default function Base64EncodingGuide() {
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
        <span>Base64 Encoding</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Base64 Encoding: Complete Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Everything you need to know about Base64 encoding and decoding.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is Base64?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Base64 is a binary-to-text encoding scheme that represents binary data
            in an ASCII string format. It uses 64 characters (A-Z, a-z, 0-9, +, /)
            plus padding (=) to encode data. The name "Base64" comes from the fact
            that each character represents 6 bits of data (2^6 = 64).
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Base64 is <strong>not encryption</strong> — it provides no security.
            Anyone can decode Base64 data. It's purely a format conversion for
            transmitting binary data over text-based systems.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            How Base64 Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Base64 processes input in 3-byte (24-bit) chunks, splitting them into
            four 6-bit groups. Each 6-bit value maps to one of the 64 characters.
          </p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto dark:bg-gray-800"><code>Input:  "Man" (3 bytes = 24 bits)
Binary: 01001101 01100001 01101110
Groups: 010011 010110 000101 101110
Values: 19     22     5      46
Output: "TWFu" (T W F u)</code></pre>
          <p className="text-gray-600 dark:text-gray-400">
            If the input isn't divisible by 3, padding (=) is added:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>1 byte remaining → 2 padding chars (==)</li>
            <li>2 bytes remaining → 1 padding char (=)</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            When to Use Base64
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Email attachments:</strong> MIME uses Base64 to encode binary
              files in email
            </li>
            <li>
              <strong>Data URIs:</strong> Embed images directly in HTML/CSS
              (<code>data:image/png;base64,...</code>)
            </li>
            <li>
              <strong>JSON APIs:</strong> Include binary data (images, files) in
              JSON payloads
            </li>
            <li>
              <strong>URL parameters:</strong> Safely pass binary data in URLs
            </li>
            <li>
              <strong>Basic Auth:</strong> HTTP Basic Authentication encodes
              credentials as Base64
            </li>
            <li>
              <strong>JWT tokens:</strong> Header and payload are Base64URL-encoded
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Base64 vs Base64URL
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Base64URL is a URL-safe variant used in JWTs and web applications:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><code>+</code> becomes <code>-</code></li>
            <li><code>/</code> becomes <code>_</code></li>
            <li>Padding <code>=</code> is often omitted</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            Our <a href="/base64-encode" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Base64 Encoder</a> handles both standard and URL-safe variants.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Common Pitfalls
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>Double encoding:</strong> Encoding already-encoded data
              creates garbled output. Always decode first if unsure.
            </li>
            <li>
              <strong>Line breaks:</strong> Some implementations add line breaks
              every 76 chars (MIME standard). Remove them before decoding.
            </li>
            <li>
              <strong>Character set issues:</strong> Base64 operates on bytes.
              Text must be encoded to bytes (UTF-8) first. Our tools handle this
              automatically.
            </li>
            <li>
              <strong>Large files:</strong> Base64 increases size by ~33%. For
              large files, consider direct binary transfer instead.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Use our free tools to experiment:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <a href="/base64-encode" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Base64 Encoder
              </a>{" "}
              — Encode text to Base64
            </li>
            <li>
              <a href="/base64-decode" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Base64 Decoder
              </a>{" "}
              — Decode Base64 back to text
            </li>
            <li>
              <a href="/image-to-base64" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Image to Base64
              </a>{" "}
              — Convert images to data URIs
            </li>
            <li>
              <a href="/base64-to-image" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Base64 to Image
              </a>{" "}
              — Decode Base64 strings to images
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