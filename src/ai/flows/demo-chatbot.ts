// src/ai/flows/demo-chatbot.ts
'use server';
/**
 * @fileOverview A demo chatbot AI agent.
 *
 * - demoChatbot - A function that handles the chatbot conversation.
 * - DemoChatbotInput - The input type for the demoChatbot function.
 * - DemoChatbotOutput - The return type for the demoChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  input: {schema: DemoChatbotInputSchema},
  output: {schema: DemoChatbotOutputSchema},
  prompt: `You are a demo chatbot that helps users learn about AI tools and news.
  If an image is provided, describe it or answer questions about it in the context of AI tools and news.
  Your responses should be informative and engaging.
  Use the chat history to maintain context and provide relevant answers.

  Chat History:
  {{#each chatHistory}}
  {{role}}: {{content}}
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
    const {output} = await prompt(input);
    return output!;
  }
);
