'use server';
/**
 * @fileOverview A RAG (Retrieval-Augmented Generation) chatbot.
 * It uses a Tavily for web search to find relevant context and an LLM to generate answers.
 *
 * - demoChatbot - The main function for the RAG chatbot.
 * - DemoChatbotInput - The input type for the demoChatbot function.
 * - DemoChatbotOutput - The return type for the demoChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { findRelevantContext } from '@/lib/rag-service';

const DemoChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The chat history between the user and the chatbot.'),
});
export type DemoChatbotInput = z.infer<typeof DemoChatbotInputSchema>;

const DemoChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type DemoChatbotOutput = z.infer<typeof DemoChatbotOutputSchema>;

export async function demoChatbot(input: DemoChatbotInput): Promise<DemoChatbotOutput> {
  return demoChatbotFlow(input);
}

// Define a new prompt that takes context from the RAG service.
const ragPrompt = ai.definePrompt({
  name: 'ragPrompt',
  input: {
    schema: z.object({
      message: z.string(),
      context: z.array(z.string()),
    }),
  },
  output: { schema: DemoChatbotOutputSchema },
  prompt: `You are an AI assistant for the "Clean AI Hub" website, specializing in answering questions about AI tools, models, and news based on the website's content.

Use the following context from the website to answer the user's question. Synthesize the information accurately and provide a helpful, concise response. If the context doesn't contain the answer, say that you couldn't find the information on the website. Do not use outside knowledge.

Here is the relevant context from the website:
---
{{#each context}}
{{this}}
---
{{/each}}

User's question: {{{message}}}
`,
  config: {
    model: 'googleai/gemini-2.5-pro', // Use a powerful model for synthesis
  },
});

const demoChatbotFlow = ai.defineFlow(
  {
    name: 'demoChatbotFlow',
    inputSchema: DemoChatbotInputSchema,
    outputSchema: DemoChatbotOutputSchema,
  },
  async (input) => {
    try {
      // 1. Find relevant context from the website using the RAG service.
      const context = await findRelevantContext(input.message, 5);

      // 2. Call the LLM with the original message and the retrieved context.
      const { output } = await ragPrompt({
        message: input.message,
        context: context,
      });

      if (!output) {
        throw new Error('Failed to generate a response from the LLM.');
      }
      
      return output;

    } catch (error: any) {
      console.error('Error in RAG chatbot flow:', error);
      // Provide a user-friendly error message.
      return {
        response: `Xin lỗi, đã có sự cố khi xử lý yêu cầu của bạn. Lỗi: ${error.message || 'Vui lòng thử lại sau.'}`
      };
    }
  }
);
