"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { decodeBase64 } from "@/lib/tools/base64";
import { copyToClipboard } from "@/lib/utils";
import Link from "next/link";

export default function Base64DecodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleDecode() {
    setError("");
    setOutput("");
    if (!input.trim()) {
      setError("Please enter Base64 encoded text to decode.");
      return;
    }
    try {
      const result = decodeBase64(input);
      setOutput(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to decode. Invalid Base64 input."
      );
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


  return (
    <>
      <ToolLayout
        slug="base64-decode"
        title="Base64 Decoder"
        description="Decode Base64 encoded text back to readable format instantly. Our free online Base64 decoder supports Unicode characters including emojis. All processing happens locally in your browser - your data never leaves your device."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Base64 Decoder" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input (Base64 text)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Base64 encoded text to decode..."
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output (plain text)"
                value={output}
                readOnly
                placeholder="Decoded output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleDecode}>Decode</Button>
                <Button variant="secondary" onClick={handleCopy} disabled={!output}>
                  Copy Output
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          Need to encode text to Base64?{" "}
          <Link
            href="/base64-encode"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Try the Base64 Encoder →
          </Link>
        </div>
        <RelatedTools currentSlug="base64-decode" />
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
