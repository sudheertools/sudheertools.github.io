import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DevTools — Free Private Browser-Based Developer Tools",
    short_name: "DevTools",
    description:
      "69 free developer tools that run entirely in your browser. Encode, format, convert, validate, and generate — no data ever leaves your device.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
