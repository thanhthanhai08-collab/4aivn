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
import { googleAI } from '@genkit-ai/googleai';
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
  model: googleAI.model('gemini-2.5-flash'),
  input: {schema: DemoChatbotInputSchema},
  output: {schema: DemoChatbotOutputSchema},
  prompt: `You are a helpful AI assistant for the 'Clean AI Hub' website. Your goal is to answer user questions accurately and conversationally.
  
Use your general knowledge to provide a helpful response. If an image is provided, comment on it and incorporate it into your response along with the user's message.

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
    // Call the model directly with the user's input
    const {output} = await prompt(input);
    return output!;
  }
);
