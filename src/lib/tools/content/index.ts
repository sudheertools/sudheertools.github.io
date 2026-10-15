import type { Tool } from "../registry";
import { batchAContent } from "./batch-a";
import { batchBContent } from "./batch-b";
import { batchC1Content } from "./batch-c1";
import { batchC2Content } from "./batch-c2";

export type { ToolContent } from "./batch-a";

const allContent: Record<
  string,
  Pick<Tool, "whatIs" | "whyUse" | "howToUse" | "examples" | "useCases" | "faqs">
> = {
  ...batchAContent,
  ...batchBContent,
  ...batchC1Content,
  ...batchC2Content,
};

export function getContentBySlug(slug: string) {
  return allContent[slug];
}
