import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hash Functions Guide — MD5, SHA-1, SHA-256, SHA-512",
  description:
    "Complete guide to cryptographic hash functions: when to use each, security considerations, and practical examples. Generate hashes with our free online hash generator.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/hash-functions",
  },
  openGraph: {
    title: "Hash Functions Guide — Complete Tutorial",
    description:
      "Learn about MD5, SHA-1, SHA-256, SHA-512: security, use cases, and best practices.",
    url: "https://sudheertools.github.io/guides/hash-functions",
  },
};

export default function HashFunctionsGuide() {
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
        <span>Hash Functions</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Cryptographic Hash Functions: Complete Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Understand MD5, SHA-1, SHA-256, SHA-512: security, use cases, and best practices.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is a Hash Function?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A hash function takes arbitrary input data and produces a fixed-size
            output (hash/digest) that uniquely represents that input. Key
            properties:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><strong>Deterministic:</strong> Same input → same output</li>
            <li><strong>Fast to compute:</strong> Efficient for large data</li>
            <li><strong>Pre-image resistant:</strong> Can't reverse hash to input</li>
            <li><strong>Collision resistant:</strong> Hard to find two inputs with same hash</li>
            <li><strong>Avalanche effect:</strong> Small input change → completely different hash</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Common Hash Algorithms
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Algorithm</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Output Size</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="pb-2 font-semibold text-gray-900 dark:text-white">Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="bg-red-50 dark:bg-red-900/20">
                <td className="py-2 font-mono font-semibold text-gray-900 dark:text-white">MD5</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">128-bit (32 hex)</td>
                <td className="py-2 text-red-700 dark:text-red-300">BROKEN</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Checksums only (non-security)</td>
              </tr>
              <tr className="bg-red-50 dark:bg-red-900/20">
                <td className="py-2 font-mono font-semibold text-gray-900 dark:text-white">SHA-1</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">160-bit (40 hex)</td>
                <td className="py-2 text-red-700 dark:text-red-300">BROKEN</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Git commits, legacy only</td>
              </tr>
              <tr className="bg-green-50 dark:bg-green-900/20">
                <td className="py-2 font-mono font-semibold text-gray-900 dark:text-white">SHA-256</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">256-bit (64 hex)</td>
                <td className="py-2 text-green-700 dark:text-green-300">SECURE</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Standard for most uses</td>
              </tr>
              <tr className="bg-green-50 dark:bg-green-900/20">
                <td className="py-2 font-mono font-semibold text-gray-900 dark:text-white">SHA-512</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">512-bit (128 hex)</td>
                <td className="py-2 text-green-700 dark:text-green-300">SECURE</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">High security margin</td>
              </tr>
              <tr className="bg-green-50 dark:bg-green-900/20">
                <td className="py-2 font-mono font-semibold text-gray-900 dark:text-white">SHA-3</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">224-512 bit</td>
                <td className="py-2 text-green-700 dark:text-green-300">SECURE</td>
                <td className="py-2 text-gray-600 dark:text-gray-400">Future-proof, different design</td>
              </tr>
            </tbody>
          </table>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Why MD5 and SHA-1 Are Broken
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Collision attacks exist where two different inputs produce the same
            hash. In 2004, MD5 collisions were demonstrated practically. In 2017,
            SHA-1 collision (SHAttered) was proven. <strong>Never use MD5 or SHA-1
            for security purposes</strong> (passwords, signatures, certificates).
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            They're still fine for non-security checksums (file integrity, deduplication).
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            When to Use Each
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <strong>SHA-256:</strong> Default choice for most applications.
              TLS certificates, blockchain, password hashing (with salt+iterations),
              digital signatures, file verification.
            </li>
            <li>
              <strong>SHA-512:</strong> When you need extra security margin or
              64-bit CPU optimization. Slightly slower on 32-bit systems.
            </li>
            <li>
              <strong>SHA-3 (Keccak):</strong> Different internal structure than
              SHA-2. Good hedge against future SHA-2 breaks. Not yet widely
              deployed in browsers.
            </li>
            <li>
              <strong>BLAKE3:</strong> Extremely fast, parallelizable, secure.
              Great for file hashing, but not yet standard in browsers.
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Password Hashing: Don't Use Raw Hashes!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Never store raw SHA-256(password).</strong> Fast hashes enable
            brute-force attacks. Use dedicated password hashing functions:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><strong>Argon2:</strong> Winner of Password Hashing Competition (2015). Memory-hard.</li>
            <li><strong>bcrypt:</strong> Battle-tested, widely available. Cost factor adjustable.</li>
            <li><strong>scrypt:</strong> Memory-hard, older but solid.</li>
            <li><strong>PBKDF2:</strong> NIST standard, uses HMAC-SHA256. Slower than Argon2.</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            Our <a href="/hash-generator" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">Hash Generator</a> is for data integrity/checksums, NOT password storage.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            HMAC: Keyed Hashing
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            HMAC (Hash-based Message Authentication Code) combines a hash function
            with a secret key. Provides both integrity and authenticity. Use for:
          </p>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>API authentication (AWS SigV4, JWT HS256)</li>
            <li>Message integrity verification</li>
            <li>Cookie signing</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            HMAC-SHA256 is the standard. Available via Web Crypto API.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            File Verification Workflow
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Download file and its published checksum (SHA-256)</li>
            <li>Generate hash of downloaded file</li>
            <li>Compare character-by-character</li>
            <li>Match = file intact; Mismatch = corrupted/tampered</li>
          </ol>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Try It Yourself
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>
              <a href="/hash-generator" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Hash Generator
              </a>{" "}
              — Generate MD5, SHA-1, SHA-256, SHA-512 hashes instantly
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