// src/ai/flows/demo-chatbot.ts
'use server';
/**
 * @fileOverview A demo chatbot AI agent with RAG capabilities.
 *
 * - demoChatbot - A function that handles the chatbot conversation.
 * - DemoChatbotInput - The input type for the demoChatbot function.
 * - DemoChatbotOutput - The return type for the demoChatbot function.
 */

import {ai} from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import {z} from 'genkit';
import { findRelevantContext } from '@/lib/rag-service';

const DemoChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  image: z.string().optional().describe("An optional image provided by the user, as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
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

const prompt = ai.definePrompt({
  name: 'demoChatbotPrompt',
  model: googleAI.model('gemini-2.5-pro'),
  input: {schema: z.object({
    message: DemoChatbotInputSchema.shape.message,
    image: DemoChatbotInputSchema.shape.image,
    chatHistory: DemoChatbotInputSchema.shape.chatHistory,
    context: z.array(z.string()).optional().describe('Relevant information from the knowledge base.'),
  })},
  output: {schema: DemoChatbotOutputSchema},
  prompt: `You are a helpful AI assistant for the 'Clean AI Hub' website. Your goal is to answer user questions accurately and conversationally.
  
Follow these steps:
1.  First, carefully review the provided "Context from knowledge base". This context is retrieved directly from the Clean AI Hub website and is the most reliable source of information. If the user's question can be answered using this context, base your response primarily on it.
2.  If the context is empty or does not contain the information needed to answer the question, then you should use your general knowledge to provide a helpful response.
3.  When using information from the context, be sure to synthesize it into a natural, easy-to-read answer. Do not simply copy-paste the context.
4.  If an image is provided, comment on it and incorporate it into your response along with the user's message.

Chat History:
{{#each chatHistory}}
{{role}}: {{content}}
{{/each}}

Context from knowledge base:
---
{{#if context}}
{{#each context}}
{{this}}
---
{{/each}}
{{else}}
[No specific context was found on the Clean AI Hub website for this query.]
{{/if}}

User: {{message}}
{{#if image}}
[Image is attached. Describe it and respond to the user's message.]
{{media url=image}}
{{/if}}
Assistant: `,
});

const demoChatbotFlow = ai.defineFlow(
  {
    name: 'demoChatbotFlow',
    inputSchema: DemoChatbotInputSchema,
    outputSchema: DemoChatbotOutputSchema,
  },
  async input => {
    // 1. Find relevant context using RAG
    const context = await findRelevantContext(input.message);

    // 2. Call the model with the user's message and the retrieved context
    const {output} = await prompt({
      ...input,
      context,
    });
    return output!;
  }
);
