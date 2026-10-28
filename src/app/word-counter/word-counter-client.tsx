"use client";

import { useState, useCallback } from "react";
import ToolLayout from "@/components/layout/ToolLayout";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import RelatedTools from "@/components/tools/RelatedTools";
import { countWords } from "@/lib/tools/word-counter";
import { copyToClipboard } from "@/lib/utils";

export default function WordCounterPage() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState<ReturnType<typeof countWords> | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleCount = useCallback(() => {
    const result = countWords(input);
    setStats(result);
  }, [input]);

  function handleClear() {
    setInput("");
    setStats(null);
  }

  async function handleCopyStats() {
    if (!stats) return;
    const text = `Words: ${stats.words}
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Lines: ${stats.lines}
Reading time: ${stats.readingTime}`;
    try {
      await copyToClipboard(text);
      setToast({ message: "Stats copied to clipboard!", type: "success" });
    } catch {
      setToast({ message: "Failed to copy", type: "error" });
    }
  }

  return (
    <>
      <ToolLayout
        slug="word-counter"
        title="Word & Character Counter"
        description="Count words, characters (with and without spaces), sentences, paragraphs, and lines in any text. Includes estimated reading time and copyable statistics."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/" },
          { label: "Word Counter" },
        ]}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <TextArea
            label="Input Text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleCount();
            }}
            placeholder="Type or paste your text here..."
          />

          {stats && (
            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Statistics
                </h3>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={handleCopyStats}>
                    Copy Stats
                  </Button>
                  <Button variant="ghost" onClick={handleClear}>
                    Clear
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Words", value: stats.words, icon: "W" },
                  { label: "Characters", value: stats.characters, icon: "Aa" },
                  { label: "Characters (no spaces)", value: stats.charactersNoSpaces, icon: "Ab" },
                  { label: "Sentences", value: stats.sentences, icon: "S" },
                  { label: "Paragraphs", value: stats.paragraphs, icon: "P" },
                  { label: "Lines", value: stats.lines, icon: "L" },
                  { label: "Reading Time", value: stats.readingTime, icon: "T" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                        {stat.icon}
                      </span>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!stats && (
            <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
              Start typing to see word, character, line, and reading-time counts.
            </div>
          )}
        </div>

        <RelatedTools currentSlug="word-counter" />
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
