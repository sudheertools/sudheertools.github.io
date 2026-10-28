import Link from "next/link";
import AdBanner from "@/components/ui/AdBanner";
import { getToolBySlug } from "@/lib/tools/registry";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
  slug?: string;
}

function generateSoftwareApplicationSchema(tool: ReturnType<typeof getToolBySlug>) {
  if (!tool) return null;

  const baseUrl = "https://sudheertools.github.io";
  const url = `${baseUrl}${tool.href}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Person",
      name: "Sudheer Kumar",
      url: "https://github.com/sudheertools",
    },
    publisher: {
      "@type": "Organization",
      name: "DevTools",
      url: baseUrl,
    },
    // Static dates keep structured data consistent for crawlers (no fake "freshness").
  datePublished: "2024-06-01",
    dateModified: new Date().toISOString().split("T")[0],
    featureList: tool.whyUse && tool.whyUse.length > 0 ? tool.whyUse : undefined,
    screenshot: `${baseUrl}/og-image.png`,
  };
}

function generateFAQSchema(tool: ReturnType<typeof getToolBySlug>) {
  if (!tool?.faqs?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

function generateAuthorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sudheer Kumar",
    url: "https://github.com/sudheertools",
    sameAs: [
      "https://github.com/sudheertools",
      "https://www.linkedin.com/in/sudheerkumargv/",
      "https://www.youtube.com/@TestingWithSudheer",
    ],
    jobTitle: "Developer & Creator of DevTools",
    email: "mailto:sudheerkumar.gv@gmail.com",
    worksFor: {
      "@type": "Organization",
      name: "DevTools",
      url: "https://sudheertools.github.io",
    },
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Web Development",
      "Developer Tools",
      "Web Crypto API",
      "JSON",
      "JWT",
      "Base64",
    ],
  };
}

// Section order and headings vary by category so tool pages do not share
// one identical skeleton. Categories not listed use the default order.
const categorySections: Record<
  string,
  {
    useCasesTitle: string;
    howToTitle: (name: string) => string;
    whatIsTitle: (name: string) => string;
    whyTitle: (name: string) => string;
  }
> = {
  validation: {
    useCasesTitle: "When Validation Catches Real Problems",
    howToTitle: () => "Validating Step by Step",
    whatIsTitle: (name) => `What Does ${name} Check?`,
    whyTitle: (name) => `Why Run ${name} Before Shipping?`,
  },
  encoding: {
    useCasesTitle: "Where Encoding and Decoding Show Up",
    howToTitle: () => "Encoding or Decoding, Step by Step",
    whatIsTitle: (name) => `How ${name} Works`,
    whyTitle: (name) => `Why Developers Reach for ${name}`,
  },
  generation: {
    useCasesTitle: "What People Generate With This Tool",
    howToTitle: () => "Generating Values, Step by Step",
    whatIsTitle: (name) => `What ${name} Produces`,
    whyTitle: (name) => `Why Generate Values With ${name}`,
  },
  formatting: {
    useCasesTitle: "Formatting Workflows That Use This Tool",
    howToTitle: () => "Formatting, Step by Step",
    whatIsTitle: (name) => `What ${name} Changes`,
    whyTitle: (name) => `Why Format With ${name} Instead of Doing It by Hand`,
  },
  conversion: {
    useCasesTitle: "Conversion Tasks This Tool Handles",
    howToTitle: () => "Converting, Step by Step",
    whatIsTitle: (name) => `What ${name} Converts`,
    whyTitle: (name) => `Why Convert With ${name}`,
  },
  fintech: {
    useCasesTitle: "Planning Scenarios for This Calculator",
    howToTitle: () => "Running the Numbers, Step by Step",
    whatIsTitle: (name) => `How ${name} Calculates`,
    whyTitle: (name) => `Why Use ${name} for Financial Planning`,
  },
  "code-generation": {
    useCasesTitle: "Boilerplate This Tool Replaces",
    howToTitle: () => "Generating Code, Step by Step",
    whatIsTitle: (name) => `What ${name} Generates`,
    whyTitle: (name) => `Why Start With ${name}`,
  },
  devops: {
    useCasesTitle: "Infrastructure This Tool Helps Provision",
    howToTitle: () => "Generating Config, Step by Step",
    whatIsTitle: (name) => `What ${name} Produces`,
    whyTitle: (name) => `Why Generate Config With ${name}`,
  },
  "ai-tools": {
    useCasesTitle: "Prompt Workflows That Use Token Counts",
    howToTitle: () => "Counting Tokens, Step by Step",
    whatIsTitle: (name) => `How ${name} Estimates Usage`,
    whyTitle: () => "Why Count Tokens Before Calling an API",
  },
  network: {
    useCasesTitle: "Network Planning Tasks for This Tool",
    howToTitle: () => "Working Through the Calculation, Step by Step",
    whatIsTitle: (name) => `How ${name} Computes Network Details`,
    whyTitle: (name) => `Why Network Engineers Use ${name}`,
  },
  // CSS, color, image, text, utility, and reference use the default titles.
};

export default function ToolLayout({
  title,
  description,
  breadcrumbs,
  children,
  slug,
}: ToolLayoutProps) {
  const tool = slug ? getToolBySlug(slug) : undefined;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://sudheertools.github.io${item.href}` } : {}),
    })),
  };

  const softwareAppSchema = generateSoftwareApplicationSchema(tool);
  const faqSchema = generateFAQSchema(tool);
  const authorSchema = generateAuthorSchema();
  const sectionCopy = tool ? categorySections[tool.category] : undefined;
  const whatIsTitle = sectionCopy?.whatIsTitle(tool?.name ?? "") ?? (tool ? `What is ${tool.name}?` : "");
  const whyTitle = sectionCopy?.whyTitle(tool?.name ?? "") ?? (tool ? `Why Use ${tool.name}?` : "");
  const howToTitle = sectionCopy?.howToTitle(tool?.name ?? "") ?? (tool ? `How to Use ${tool.name}` : "");
  const useCasesTitle = sectionCopy?.useCasesTitle ?? "Common Use Cases";
  // Validation and network tools lead with use cases and step order; others
  // open with the definition. This keeps page flow from looking templated.
  const useCasesFirst = tool?.category === "validation" || tool?.category === "network";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {softwareAppSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />

      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          {breadcrumbs.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && (
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-gray-100">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </header>

      {children}

      {/* Single in-content ad — content above and below keeps ad-to-content ratio healthy */}

      {useCasesFirst && tool?.useCases && tool.useCases.length > 0 && (
        <section className="mt-12" id="use-cases">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {useCasesTitle}
          </h2>
          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            {tool.useCases.map((useCase, i) => (
              <li key={i}>{useCase}</li>
            ))}
          </ul>
        </section>
      )}

      {tool?.whatIs && (
        <section
          className={useCasesFirst ? "mt-12" : "mt-12"}
          id="what-is"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {whatIsTitle}
          </h2>
          <div className="prose prose-gray mt-4 max-w-none dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-400">{tool.whatIs}</p>
          </div>
        </section>
      )}

      {tool?.comparison && (
        <section className="mt-12" id="comparison">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {tool.name} vs {tool.comparison.name}
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    Use {tool.name} when
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                    Use{" "}
                    <Link
                      href={tool.comparison.href}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {tool.comparison.name}
                    </Link>{" "}
                    when
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                <tr>
                  <td className="px-4 py-4 align-top text-gray-600 dark:text-gray-400">
                    {tool.comparison.useWhen}
                  </td>
                  <td className="px-4 py-4 align-top text-gray-600 dark:text-gray-400">
                    {tool.comparison.useThemWhen}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tool?.whyUse && tool.whyUse.length > 0 && (
        <section className="mt-12" id="why-use">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {whyTitle}
          </h2>
          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            {tool.whyUse.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </section>
      )}

      {tool?.howToUse && tool.howToUse.length > 0 && (
        <section className="mt-12" id="how-to-use">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {howToTitle}
          </h2>
          <div className="prose prose-gray mt-4 max-w-none dark:prose-invert">
            <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-400">
              {tool.howToUse.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {tool?.examples && tool.examples.length > 0 && (
        <section className="mt-12" id="examples">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Examples
          </h2>
          <div className="mt-4 space-y-6">
            {tool.examples.map((example, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {example.title}
                </h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Input
                    </p>
                    <pre className="rounded-lg bg-gray-100 p-3 text-sm overflow-x-auto dark:bg-gray-700"><code>{example.input}</code></pre>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Output
                    </p>
                    <pre className="rounded-lg bg-gray-100 p-3 text-sm overflow-x-auto dark:bg-gray-700"><code>{example.output}</code></pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!useCasesFirst && tool?.useCases && tool.useCases.length > 0 && (
        <section className="mt-12" id="use-cases">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {useCasesTitle}
          </h2>
          <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            {tool.useCases.map((useCase, i) => (
              <li key={i}>{useCase}</li>
            ))}
          </ul>
        </section>
      )}

      {tool?.commonMistakes && tool.commonMistakes.length > 0 && (
        <section className="mt-12" id="common-mistakes">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Common Mistakes to Avoid
          </h2>
          <ul className="mt-4 space-y-3">
            {tool.commonMistakes.map((mistake, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-gray-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-gray-300"
              >
                <span aria-hidden className="mt-0.5 flex-shrink-0 font-bold text-amber-600 dark:text-amber-400">
                  !
                </span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tool?.security && (
        <section className="mt-12" id="security">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Security &amp; Privacy Notes
          </h2>
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-gray-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-gray-300">
            <p>{tool.security}</p>
          </div>
        </section>
      )}

      {tool?.faqs && tool.faqs.length > 0 && (
        <section className="mt-12" id="faq">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-4">
            {tool.faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
              >
                <summary className="flex items-center justify-between cursor-pointer font-medium text-gray-900 dark:text-white list-none">
                  {faq.q}
                  <svg
                    className="flex-shrink-0 ml-4 h-5 w-5 text-gray-400 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-3 text-gray-600 dark:text-gray-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {tool?.relatedGuides && tool.relatedGuides.length > 0 && (
        <section className="mt-12" id="guides">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Related Guides
          </h2>
          <ul className="mt-4 space-y-2">
            {tool.relatedGuides.map((guide, i) => (
              <li key={i}>
                <Link
                  href={guide.href}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8">
        <AdBanner format="horizontal" />
      </div>

      <section className="mt-12" id="author">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            SK
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Sudheer Kumar
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Developer & Creator of DevTools
            </p>
            <div className="mt-2 flex gap-3">
              <a
                href="mailto:sudheerkumar.gv@gmail.com"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Email
              </a>
              <a
                href="https://github.com/sudheertools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sudheerkumargv/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/@TestingWithSudheer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
