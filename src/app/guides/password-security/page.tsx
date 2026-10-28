import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Password Security Guide — Generation, Storage, Rotation",
  description:
    "How to generate, store, and rotate strong passwords: entropy, CSPRNGs, password managers, MFA, and why length beats complexity rules.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/password-security",
  },
  openGraph: {
    title: "Password Security Guide — Generation, Storage, Rotation",
    description:
      "Entropy, password managers, MFA, and modern password guidance for developers.",
    url: "https://sudheertools.github.io/guides/password-security",
  },
};

export default function PasswordSecurityGuide() {
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
        <span>Password Security</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Password Security: Complete Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Entropy, generation, storage, and the modern rules that replaced
          90-day rotation and complexity theatre.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Entropy Is the Only Metric That Matters
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A password&apos;s strength is its entropy in bits: log2(alphabet
            size) × length. A 16-character random password drawn from 94
            printable ASCII symbols has about 104 bits — comfortably beyond
            offline cracking with current hardware. A &quot;Tr0ub4dor&amp;3&quot;
            password that satisfies every complexity rule has roughly 28 bits and
            falls to a laptop in hours.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Modern Guidance (NIST SP 800-63B)
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li>Length over complexity: minimum 8, prefer 12–16 for machine-generated secrets.</li>
            <li>Check new passwords against breach corpora (Have I Been Pwned k-anonymity API).</li>
            <li>No forced periodic rotation unless there is evidence of compromise.</li>
            <li>Offer paste into the password field; blocking paste only encourages patterns.</li>
            <li>Require MFA for anything valuable; passwords alone are no longer sufficient.</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Generation and Storage
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Generate with a CSPRNG (<code>crypto.getRandomValues</code> in the
            browser), never <code>Math.random()</code>. Store in a password
            manager vault, not a notes app or spreadsheet. If you must share a
            password once, use a sealed channel and rotate after receipt. For
            machine secrets (API keys), use environment injection or a secrets
            manager and scope them to least privilege.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Server-Side Hashing
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Never store passwords in plaintext or with a fast hash. Use argon2id
            (preferred), scrypt, or bcrypt with a per-user salt and work factors
            tuned to your hardware. Compare with constant-time equality. MD5,
            SHA-1, and plain SHA-256 are far too fast for passwords: an attacker
            with the hash can test billions of guesses per second on a GPU.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><Link href="/password-generator" className="text-blue-600 hover:underline dark:text-blue-400">Password Generator</Link> — create high-entropy passwords locally</li>
            <li><Link href="/hash-generator" className="text-blue-600 hover:underline dark:text-blue-400">Hash Generator</Link> — inspect hash output formats</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
