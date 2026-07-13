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
  message: z.string().max(10_000).describe('The user message to the chatbot.'),
  imageUrl: z.string().url().max(2_000).optional().describe('The image URL sent by the user.'),
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
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('MAKE_WEBHOOK_URL is not configured.');
    }

    try {
      // Construct the payload to send to the webhook
      const payload: { message: string; imageUrl?: string } = {
        message: input.message,
      };
      
      if (input.imageUrl) {
        payload.imageUrl = input.imageUrl;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
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
          error: `Sorry, there was an issue processing your request.`
        }, null, 2)
      };
    }
  }
);
