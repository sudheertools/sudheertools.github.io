import type { Metadata } from "next";
import GradientGeneratorPage from "./gradient-generator-client";

export const metadata: Metadata = {
  title: "Gradient Generator - Linear & Radial CSS Gradients",
  description: "Build linear and radial CSS gradients with adjustable angle, color stops, and live preview. Copy production-ready CSS in one click.",
  keywords: "gradient generator online, free gradient generator, linear gradient tool, radial gradient css, css tools, generate gradient, gradient with angle",
  openGraph: {
    title: "Gradient Generator - Linear & Radial CSS Gradients",
    description: "Build linear and radial CSS gradients with adjustable angle, color stops, and live preview. Copy production-ready CSS in one click.",
    url: "https://sudheertools.github.io/gradient-generator",
    siteName: "DevTools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Generator - Linear & Radial CSS Gradients",
    description: "Build linear and radial CSS gradients with adjustable angle, color stops, and live preview. Copy production-ready CSS in one click.",
  },
  alternates: {
    canonical: "https://sudheertools.github.io/gradient-generator",
  },
};

export default function Page() {
  return <GradientGeneratorPage />;
}
