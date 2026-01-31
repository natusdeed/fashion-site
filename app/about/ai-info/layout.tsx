import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & LLM Information | Lola Drip",
  description:
    "Lola Drip business & product info for AI: luxury women's fashion, catalog, FAQ, shipping, returns, contact. Structured for ChatGPT, Claude, Perplexity.",
  alternates: { canonical: "/about/ai-info" },
};

export default function AIInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
