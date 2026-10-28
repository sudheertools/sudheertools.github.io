import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CSS Gradients Guide — Linear, Radial, and Conic",
  description:
    "How CSS gradients work: angle math, colour stops, hard edges, radial and conic variants, and performance tips for large backgrounds.",
  alternates: {
    canonical: "https://sudheertools.github.io/guides/css-gradients",
  },
  openGraph: {
    title: "CSS Gradients Guide — Linear, Radial, and Conic",
    description:
      "Angle math, colour stops, hard edges, and performance for linear, radial, and conic gradients.",
    url: "https://sudheertools.github.io/guides/css-gradients",
  },
};

export default function CssGradientsGuide() {
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
        <span>CSS Gradients</span>
      </nav>

      <article>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          CSS Gradients: Complete Guide
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Angle math, colour-stop control, hard edges, and the three gradient
          functions.
        </p>

        <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Linear Gradient Angles
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            In <code>linear-gradient(ANGLE, …)</code>, 0deg points up, 90deg
            points right, 180deg points down, and 270deg points left. A
            top-left to bottom-right sweep is 135deg. The older keyword syntax
            (to bottom right) is equivalent but less precise; angles win when
            you need to match a design spec exactly.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Colour Stops
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Stops are colours with optional percentage positions along the
            gradient line. With no positions, colours are spaced evenly. Giving
            positions lets you bias transitions: a stop at 20% holds the first
            colour longer before blending. Stops must be non-decreasing; if a
            later stop has a smaller position, CSS clamps it to the previous
            one, turning the pair into an unintended hard edge.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Hard Edges (Stripes Without Repeating)
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Two stops at the same position (50%, 50%) produce a crisp boundary
            because interpolation has zero distance. Chain several same-position
            pairs for flag-like stripes: red at 0 and 33%, white at 33% and
            66%, blue at 66% and 100%. For true tiles, prefer
            <code> repeating-linear-gradient</code>, which loops the pattern.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Radial and Conic
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><code>radial-gradient</code> radiates from a center point; shape is circle or ellipse, size via farthest-corner by default.</li>
            <li><code>conic-gradient</code> sweeps around a center like a clock hand; great for pie charts and conic color wheels.</li>
            <li>Both accept the same colour-stop machinery, including hard edges.</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Performance
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gradients are painted by the compositor; they cost far less than
            blur filters or large box-shadows, but huge multi-stop gradients on
            every card can still add up. Prefer a single gradient on a hero over
            one per list item, and consider a static PNG past a handful of stops.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
            Related Tools
          </h2>
          <ul className="text-gray-600 dark:text-gray-400">
            <li><Link href="/css-gradient-generator" className="text-blue-600 hover:underline dark:text-blue-400">CSS Gradient Generator</Link> — build and copy gradients</li>
            <li><Link href="/box-shadow-generator" className="text-blue-600 hover:underline dark:text-blue-400">Box Shadow Generator</Link> — layer elevation with gradients</li>
            <li><Link href="/color-palette" className="text-blue-600 hover:underline dark:text-blue-400">Color Palette Generator</Link> — pick harmonious stop colours</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
