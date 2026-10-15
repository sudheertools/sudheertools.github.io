"use client";

import { useState } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { encodeBase64 } from "@/lib/tools/base64";
import { copyToClipboard } from "@/lib/utils";
import Link from "next/link";

export default function Base64EncodePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  function handleEncode() {
    setError("");
    if (!input.trim()) {
      setError("Please enter some text to encode.");
      return;
    }
    try {
      const result = encodeBase64(input);
      setOutput(result);
    } catch {
      setError("An error occurred while encoding. Please check your input.");
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
        slug="base64-encode"
        title="Base64 Encoder"
        description="Encode any text to Base64 format instantly. Our free online Base64 encoder supports Unicode characters including emojis and special characters. All processing happens locally in your browser - your data never leaves your device."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Base64 Encoder" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="grid gap-6 lg:grid-cols-2">
            <TextArea
              label="Input (plain text)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode..."
              error={error}
            />
            <div className="flex flex-col">
              <TextArea
                label="Output (Base64)"
                value={output}
                readOnly
                placeholder="Encoded output will appear here..."
                className="flex-1"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={handleEncode}>Encode</Button>
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
          Need to decode Base64?{" "}
          <Link
            href="/base64-decode"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Try the Base64 Decoder →
          </Link>
        </div>
        <RelatedTools currentSlug="base64-encode" />
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
