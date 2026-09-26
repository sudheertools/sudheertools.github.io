import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — DevTools",
  description:
    "Terms of Service for DevTools. Free browser-based developer tools with no data collection. Your use constitutes acceptance of these terms.",
  alternates: {
    canonical: "https://sudheertools.github.io/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Acceptance of Terms
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          By accessing or using DevTools (the "Service"), you agree to be bound
          by these Terms of Service ("Terms"). If you disagree with any part of
          these Terms, you may not use the Service.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Description of Service
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          DevTools provides a collection of free, browser-based developer tools
          including formatters, validators, generators, converters, and
          utilities. All tools run entirely in your browser using client-side
          JavaScript. No data is transmitted to any server.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Privacy & Data Processing
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your privacy is our priority. Please review our{" "}
          <Link
            href="/privacy"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Privacy Policy
          </Link>{" "}
          for detailed information about how we handle data. In summary:
        </p>
        <ul className="text-gray-600 dark:text-gray-400">
          <li>All tools process data entirely in your browser</li>
          <li>No data you enter is collected, stored, or transmitted</li>
          <li>No cookies are used by the tools themselves</li>
          <li>Google AdSense may use cookies for advertising (see Privacy Policy)</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Acceptable Use
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          You agree to use the Service only for lawful purposes and in
          accordance with these Terms. You may not:
        </p>
        <ul className="text-gray-600 dark:text-gray-400">
          <li>
            Use the Service for any illegal or unauthorized purpose
          </li>
          <li>
            Attempt to reverse engineer, decompile, or extract the source code
            beyond what is visible in the browser
          </li>
          <li>
            Use automated systems to access the Service in a manner that
            exceeds normal human usage
          </li>
          <li>
            Interfere with or disrupt the Service or servers
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Intellectual Property
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The Service and its original content, features, and functionality are
          owned by DevTools and are protected by international copyright,
          trademark, patent, trade secret, and other intellectual property laws.
          The source code is available on{" "}
          <a
            href="https://github.com/sudheertools/sudheertools.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            GitHub
          </a>
          under an open-source license.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Disclaimer of Warranties
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES
          OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
          IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          We do not warrant that the Service will be uninterrupted, error-free,
          or that any defects will be corrected. Tools are provided for
          convenience and should not be relied upon for critical applications
          without independent verification.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Limitation of Liability
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          IN NO EVENT SHALL DEVTOOLS, ITS CREATORS, OR CONTRIBUTORS BE LIABLE
          FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
          DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE,
          GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF OR
          INABILITY TO USE THE SERVICE.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Third-Party Services
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The Service uses Google AdSense for advertising. Google&apos;s use of
          advertising cookies enables it and its partners to serve ads based on
          your visit to this site and other sites on the Internet. You may opt
          out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Google Ads Settings
          </a>
          .
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Changes to Terms
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We reserve the right to modify these Terms at any time. Changes will
          be effective immediately upon posting to this page. Your continued
          use of the Service after any changes constitutes acceptance of the new
          Terms.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Governing Law
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          These Terms shall be governed by and construed in accordance with the
          laws of the jurisdiction in which the Service operator resides,
          without regard to its conflict of law provisions.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Contact
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Questions about these Terms can be directed to the{" "}
          <a
            href="https://github.com/sudheertools/sudheertools.github.io/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            GitHub repository
          </a>
          .
        </p>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          &larr; Back to all tools
        </Link>
      </div>
    </div>
  );
}