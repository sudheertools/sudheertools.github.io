"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Client-side redirect stub used for merged/removed tool URLs in the
 * static export (next.config.ts output: "export" cannot emit server
 * redirects). Renders a noindex canonical notice with a manual link
 * while immediately forwarding the browser.
 */
export default function Redirect({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        This tool has moved
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        {label} was merged into a single, more complete tool. Redirecting you
        now…
      </p>
      <Link
        href={to}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
      >
        Go to {label} →
      </Link>
    </div>
  );
}
