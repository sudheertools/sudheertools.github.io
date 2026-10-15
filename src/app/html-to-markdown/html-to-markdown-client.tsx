"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { htmlToMarkdown } from "@/lib/tools/markdown";
import { copyToClipboard } from "@/lib/utils";

export default function HTMLToMarkdownPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleConvert() {
    setError("");
    setOutput("");
    if (!input.trim()) {
      setError("Please enter HTML to convert.");
      return;
    }
    try {
      const result = htmlToMarkdown(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert HTML");
    }
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setError("");
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await copyToClipboard(output);
      setToast({ message: "Copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "converted.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }


  return (
    <>
      <ToolLayout
        slug="html-to-markdown"
        title="HTML to Markdown Converter"
        description="Convert HTML to clean Markdown format instantly. Supports headings, links, images, lists, tables, and code blocks. All processing happens locally in your browser."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "HTML to Markdown" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input (HTML)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your HTML code here..."
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output (Markdown)"
                value={output}
                readOnly
                placeholder="Markdown output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleConvert}>Convert</Button>
                <Button variant="secondary" onClick={handleCopy} disabled={!output}>
                  Copy
                </Button>
                <Button variant="secondary" onClick={handleDownload} disabled={!output}>
                  Download .md
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
        <RelatedTools currentSlug="html-to-markdown" />
      </ToolLayout>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
