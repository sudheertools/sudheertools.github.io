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
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    featureList: tool.howToUse || [],
    screenshot: `${baseUrl}/hero-image.svg`,
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

      <AdBanner format="horizontal" />

      {children}

      {tool?.whatIs && (
        <section className="mt-12" id="what-is">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What is {tool.name}?
          </h2>
          <div className="prose prose-gray mt-4 max-w-none dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-400">{tool.whatIs}</p>
          </div>
        </section>
      )}

      {tool?.howToUse && tool.howToUse.length > 0 && (
        <section className="mt-12" id="how-to-use">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use {tool.name}
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
                  <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Input
                    </p>
                    <pre className="rounded-lg bg-gray-100 p-3 text-sm overflow-x-auto dark:bg-gray-700"><code>{example.input}</code></pre>
                  </div>
                  <div>
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
