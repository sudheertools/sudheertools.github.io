import type { Metadata } from "next";
import Redirect from "@/components/tools/Redirect";

export const metadata: Metadata = {
  title: "Character Counter — Moved to Word Counter",
  description:
    "The Character Counter was merged into the Word Counter, which reports characters, lines, reading time, and more. Follow the redirect to the combined tool.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://sudheertools.github.io/word-counter",
  },
};

export default function Page() {
  return <Redirect to="/word-counter" label="Character Counter" />;
}
