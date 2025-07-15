'use server';
/**
 * @fileOverview A flow for processing an image to be used in a chat conversation.
 * It generates a description of the image using an AI model.
 *
 * - processImageForChat - A function that takes an image and returns its URI and a description.
 * - ProcessImageInput - The input type for the processImageForChat function.
 * - ProcessImageOutput - The return type for the processImageForChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo from the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ProcessImageInput = z.infer<typeof ProcessImageInputSchema>;

const ProcessImageOutputSchema = z.object({
  imageUri: z.string().describe('The original image data URI that was passed as input.'),
  description: z.string().describe('A concise, one-sentence description of the image content.'),
});
export type ProcessImageOutput = z.infer<typeof ProcessImageOutputSchema>;

export async function processImageForChat(input: ProcessImageInput): Promise<ProcessImageOutput> {
  return processImageForChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'describeImageForChatPrompt',
  input: {schema: ProcessImageInputSchema},
  output: {schema: ProcessImageOutputSchema},
  prompt: `Briefly describe the content of this image in a single, concise sentence.
  
Photo: {{media url=photoDataUri}}`,
});

const processImageForChatFlow = ai.defineFlow(
  {
    name: 'processImageForChatFlow',
    inputSchema: ProcessImageInputSchema,
    outputSchema: ProcessImageOutputSchema,
  },
  async (input) => {
    // Generate a description for the image.
    const {output} = await prompt(input);
    
    // Return the generated description along with the original image URI.
    return {
      imageUri: input.photoDataUri,
      description: output!.description,
    };
  }
);
