// src/ai/flows/demo-chatbot.ts
'use server';
/**
 * @fileOverview A demo chatbot AI agent that communicates with an external webhook.
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
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        console.error(`Webhook request failed with status ${response.status}`);
        const errorBody = await response.text();
        console.error('Error body:', errorBody);
        throw new Error(`Webhook request failed with status ${response.status}`);
      }
      
      const responseText = await response.text();
      console.log('Received from webhook (raw text):', responseText);

      try {
        // Attempt to parse the text as JSON
        const responseData = JSON.parse(responseText);
        
        // Validate the parsed JSON against our schema
        const parsedOutput = DemoChatbotOutputSchema.safeParse(responseData);
        
        if (!parsedOutput.success) {
          console.error('Webhook JSON response does not match expected schema:', parsedOutput.error);
          return {
            response: `Xin lỗi, đã có lỗi định dạng dữ liệu từ webhook. Vui lòng kiểm tra lại kịch bản Make.com của bạn. Dữ liệu nhận được: ${responseText}`
          };
        }
        
        return parsedOutput.data;

      } catch (jsonError) {
        // If JSON parsing fails, assume the entire responseText is the intended message.
        console.log('Webhook response is not valid JSON. Treating as plain text response.');
        return { response: responseText };
      }

    } catch (error: any) {
      console.error('Error calling webhook or processing its response:', error);
      return {
        response: `Xin lỗi, đã có sự cố khi kết nối đến dịch vụ chatbot. Lỗi: ${error.message || 'Vui lòng thử lại sau.'}`
      };
    }
  }
);
