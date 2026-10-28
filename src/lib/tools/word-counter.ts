export function countWords(text: string): {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: string;
} {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTime: "0 min",
    };
  }

  const words = trimmed.split(/\s+/).filter((w) => w.length > 0).length;
  const characters = trimmed.length;
  const charactersNoSpaces = trimmed.replace(/\s/g, "").length;
  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || 1;
  const lines = text.split(/\r\n|\r|\n/).length;

  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);
  const readingTime = minutes < 1 ? "Less than 1 min" : `${minutes} min`;

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    lines,
    readingTime,
  };
}
