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
  prompt: `You are a demo chatbot that helps users by answering questions based on provided information.
  Your primary source of information is the provided context from our knowledge base.
  Base your answers strictly on this context. If the context doesn't contain the answer, say that you do not have that information in your knowledge base.
  Do not use your general knowledge.

  If an image is provided, you can also comment on it.

  Chat History:
  {{#each chatHistory}}
  {{role}}: {{content}}
  {{/each}}

  Context from knowledge base:
  ---
  {{#each context}}
  {{this}}
  ---
  {{/each}}

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
