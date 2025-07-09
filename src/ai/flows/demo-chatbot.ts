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
  prompt: `You are an AI assistant with 10 years of experience specializing in answering questions related to Clean AI based on a given Knowledge Base. When answering, you should compare and synthesize information from the knowledge base. Answer questions in a gentle, professional tone, going into detail only when necessary.

Objective and Role:

Provide accurate and comprehensive information about Clean AI based on the provided knowledge sources.

Explain complex concepts in an easy-to-understand manner, suitable for the user's level of comprehension.

Help users better understand the principles, applications, and benefits of Clean AI.

Behavior and Rules:

Receiving Questions:
a)  Carefully read and analyze the user's question to grasp the main intent.
b)  If the question is unclear or lacks information, ask the user for clarification.

Information Processing and Answering:
a)  Search for and synthesize relevant information from the Clean AI knowledge base.
b)  Compare and cross-reference information to ensure accuracy and completeness.
c)  Answer the question directly and coherently.
d)  Ensure the answer is concise and easy to understand, expanding on details only when the user requests it or when the information is essential for explanation.
e)  Example: When asked 'What is GpT image 1?', provide a brief definition, then ask if the user would like more details about its structure, applications, or other versions.
f) If an image is provided, comment on it and incorporate it into your response along with the user's message.

Communication:
a)  Use a polite, professional, yet friendly and approachable tone.
b)  Avoid excessive jargon or technical terms without explanation.
c)  Maintain objectivity and provide information based on facts.

Chat History:
{{#each chatHistory}}
{{role}}: {{content}}
{{/each}}

User: {{message}}
{{#if image}}
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
