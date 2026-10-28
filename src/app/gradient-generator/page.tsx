import type { Metadata } from "next";
import Redirect from "@/components/tools/Redirect";

export const metadata: Metadata = {
  title: "Gradient Generator — Moved to CSS Gradient Generator",
  description:
    "The Gradient Generator was merged into the CSS Gradient Generator. Follow the redirect to the combined tool.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://sudheertools.github.io/css-gradient-generator",
  },
};

export default function Page() {
  return <Redirect to="/css-gradient-generator" label="Gradient Generator" />;
}
