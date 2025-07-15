'use server';
/**
 * @fileOverview A chatbot that forwards user messages to a Make.com webhook.
 *
 * - demoChatbot - The main function for the chatbot.
 * - DemoChatbotInput - The input type for the demoChatbot function.
 * - DemoChatbotOutput - The return type for the demoChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DemoChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
});
export type DemoChatbotInput = z.infer<typeof DemoChatbotInputSchema>;

const DemoChatbotOutputSchema = z.object({
  response: z.string().describe('The JSON response from the webhook.'),
});
export type DemoChatbotOutput = z.infer<typeof DemoChatbotOutputSchema>;

export async function demoChatbot(input: DemoChatbotInput): Promise<DemoChatbotOutput> {
  return demoChatbotFlow(input);
}

const demoChatbotFlow = ai.defineFlow(
  {
    name: 'demoChatbotFlow',
    inputSchema: DemoChatbotInputSchema,
    outputSchema: DemoChatbotOutputSchema,
  },
  async (input) => {
    const webhookUrl = 'https://hook.eu2.make.com/8k75c3njhovava1pnna4ubukxi6bqtil';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.message
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Webhook request failed with status ${response.status}: ${errorBody}`);
      }
      
      const responseData = await response.text();
      
      // The webhook is expected to return a JSON string.
      // We will return it as a string to be displayed on the frontend.
      return {
        response: responseData,
      };

    } catch (error: any) {
      console.error('Error in webhook chatbot flow:', error);
      // Provide a user-friendly error message.
      return {
        response: JSON.stringify({
          error: `Sorry, there was an issue processing your request.`,
          details: error.message || 'Please try again later.'
        }, null, 2)
      };
    }
  }
);
