// SummarizeNewsArticle.ts
'use server';

/**
 * @fileOverview Summarizes news articles about AI.
 *
 * - summarizeNewsArticle - A function that summarizes a news article.
 * - SummarizeNewsArticleInput - The input type for the summarizeNewsArticle function.
 * - SummarizeNewsArticleOutput - The return type for the summarizeNewsArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeNewsArticleInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the news article to be summarized.'),
});
export type SummarizeNewsArticleInput = z.infer<typeof SummarizeNewsArticleInputSchema>;

const SummarizeNewsArticleOutputSchema = z.object({
  summary: z.string().describe('A short summary of the news article.'),
});
export type SummarizeNewsArticleOutput = z.infer<typeof SummarizeNewsArticleOutputSchema>;

export async function summarizeNewsArticle(
  input: SummarizeNewsArticleInput
): Promise<SummarizeNewsArticleOutput> {
  return summarizeNewsArticleFlow(input);
}

const summarizeNewsArticlePrompt = ai.definePrompt({
  name: 'summarizeNewsArticlePrompt',
  input: {schema: SummarizeNewsArticleInputSchema},
  output: {schema: SummarizeNewsArticleOutputSchema},
  prompt: `Tóm tắt nhanh bài viết sau đây bằng tiếng Việt. Bản tóm tắt cần ngắn gọn, súc tích và dễ hiểu:

{{{articleContent}}}`,
});

const summarizeNewsArticleFlow = ai.defineFlow(
  {
    name: 'summarizeNewsArticleFlow',
    inputSchema: SummarizeNewsArticleInputSchema,
    outputSchema: SummarizeNewsArticleOutputSchema,
  },
  async input => {
    const {output} = await summarizeNewsArticlePrompt(input);
    return output!;
  }
);
