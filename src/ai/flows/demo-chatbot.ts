'use server';
/**
 * @fileOverview A RAG (Retrieval-Augmented Generation) chatbot.
 * It uses a vector database (Pinecone) to find relevant context and an LLM to generate answers.
 *
 * - demoChatbot - The main function for the RAG chatbot.
 * - DemoChatbotInput - The input type for the demoChatbot function.
 * - DemoChatbotOutput - The return type for the demoChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { createEmbedding } from '@/lib/embedding-service';
import { queryPinecone } from '@/lib/pinecone-service';

const DemoChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  // Removed webhook-related fields
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

// Define a new prompt that takes context from the vector database.
const ragPrompt = ai.definePrompt(
  {
    name: 'ragPrompt',
    input: {
      schema: z.object({
        message: z.string(),
        context: z.array(z.string()),
      }),
    },
    output: { schema: DemoChatbotOutputSchema },
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

Communication:
a)  Use a polite, professional, yet friendly and approachable tone.
b)  Avoid excessive jargon or technical terms without explanation.
c)  Maintain objectivity and provide information based on facts.

Here is the relevant context from the knowledge base:
---
{{#each context}}
{{this}}
---
{{/each}}

User's question: {{{message}}}
`,
  },
  { model: 'googleai/gemini-pro' } // Specify the model for answer synthesis
);

const demoChatbotFlow = ai.defineFlow(
  {
    name: 'demoChatbotFlow',
    inputSchema: DemoChatbotInputSchema,
    outputSchema: DemoChatbotOutputSchema,
  },
  async (input) => {
    try {
      // 1. Create an embedding for the user's message.
      const embedding = await createEmbedding(input.message);

      // 2. Query Pinecone to find the most relevant context.
      const pineconeResults = await queryPinecone(embedding, 5); // Get top 5 results
      
      // Extract the text content from Pinecone results to use as context.
      const context = pineconeResults.map(result => result.text);

      // 3. Call the LLM with the original message and the retrieved context.
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
