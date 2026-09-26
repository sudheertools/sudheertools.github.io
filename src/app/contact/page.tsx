import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — DevTools",
  description:
    "Get in touch with the DevTools team. Report bugs, suggest features, or ask questions about our free browser-based developer tools.",
  alternates: {
    canonical: "https://sudheertools.github.io/contact",
  },
  openGraph: {
    title: "Contact — DevTools",
    description:
      "Get in touch with the DevTools team. Report bugs, suggest features, or ask questions.",
    url: "https://sudheertools.github.io/contact",
    siteName: "DevTools",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Contact
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Have a question, suggestion, or bug report? We&apos;d love to hear from
        you.
      </p>

      <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Best Way to Reach Us
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The fastest way to get a response is to open an issue on our{" "}
          <a
            href="https://github.com/sudheertools/sudheertools.github.io/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            GitHub Issues
          </a>
          . We monitor issues regularly and typically respond within 1-2
          business days.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          What to Include
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          To help us respond quickly, please include:
        </p>
        <ul className="text-gray-600 dark:text-gray-400">
          <li>
            <strong>Bug reports:</strong> Tool name, browser/version, steps to
            reproduce, expected vs actual behavior
          </li>
          <li>
            <strong>Feature requests:</strong> Tool name (or new tool idea), use
            case, why it would be valuable
          </li>
          <li>
            <strong>General questions:</strong> Context about what you&apos;re
            trying to achieve
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Other Channels
        </h2>
        <ul className="text-gray-600 dark:text-gray-400">
          <li>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/sudheertools"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              @sudheertools
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/sudheerkumargv/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Sudheer Kumar
            </a>
          </li>
          <li>
            <strong>YouTube:</strong>{" "}
            <a
              href="https://www.youtube.com/@TestingWithSudheer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Testing With Sudheer
            </a>
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Before contacting us, check if your question is answered below:
        </p>
        <dl className="text-gray-600 dark:text-gray-400">
          <dt className="font-semibold text-gray-900 dark:text-white mt-4">
            Is DevTools really free?
          </dt>
          <dd className="mt-1">
            Yes, completely free. No sign-up, no limits, no premium tier.
          </dd>
          <dt className="font-semibold text-gray-900 dark:text-white mt-4">
            Does it collect my data?
          </dt>
          <dd className="mt-1">
            No. Every tool runs entirely in your browser. No data is sent to any
            server.
          </dd>
          <dt className="font-semibold text-gray-900 dark:text-white mt-4">
            Can I use it offline?
          </dt>
          <dd className="mt-1">
            Yes. Once the page loads, all tools work offline.
          </dd>
          <dt className="font-semibold text-gray-900 dark:text-white mt-4">
            Which browsers are supported?
          </dt>
          <dd className="mt-1">
            All modern browsers: Chrome, Firefox, Safari, Edge.
          </dd>
          <dt className="font-semibold text-gray-900 dark:text-white mt-4">
            Can I suggest a new tool?
          </dt>
          <dd className="mt-1">
            Absolutely! Open a feature request on{" "}
            <a
              href="https://github.com/sudheertools/sudheertools.github.io/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              GitHub
            </a>
            .
          </dd>
          <dt className="font-semibold text-gray-900 dark:text-white mt-4">
            I found a bug. What should I do?
          </dt>
          <dd className="mt-1">
            Open a bug report on{" "}
            <a
              href="https://github.com/sudheertools/sudheertools.github.io/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              GitHub
            </a>{" "}
            with details.
          </dd>
        </dl>

        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
          For Press & Partnerships
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          If you&apos;re a journalist, blogger, or interested in a partnership,
          please reach out via{" "}
          <a
            href="https://github.com/sudheertools/sudheertools.github.io/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            GitHub Issues
          </a>
          with "Press" or "Partnership" in the title.
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