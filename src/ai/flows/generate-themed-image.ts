'use server';
/**
 * @fileOverview A Genkit flow for generating themed images using Gemini.
 *
 * - generateThemedImage - A function that generates an image based on a user prompt and website theme.
 * - GenerateThemedImageInput - The input type for the generateThemedImage function.
 * - GenerateThemedImageOutput - The return type for the generateThemedImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateThemedImageInputSchema = z.object({
  userInput: z.string().describe('The user-provided concept or description for the image.'),
});
export type GenerateThemedImageInput = z.infer<typeof GenerateThemedImageInputSchema>;

const GenerateThemedImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI, including a MIME type (e.g., image/png) and Base64 encoded data. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.')
});
export type GenerateThemedImageOutput = z.infer<typeof GenerateThemedImageOutputSchema>;

export async function generateThemedImage(input: GenerateThemedImageInput): Promise<GenerateThemedImageOutput> {
  return generateThemedImageFlow(input);
}

const generateThemedImageFlow = ai.defineFlow(
  {
    name: 'generateThemedImageFlow',
    inputSchema: GenerateThemedImageInputSchema,
    outputSchema: GenerateThemedImageOutputSchema,
  },
  async (input) => {
    const fullPrompt = `You are an AI image generator. Create an image that embodies a clean, modern, and minimalist aesthetic, suitable for a tech-focused website called "Clean AI Hub". The image should evoke a sense of innovation and intelligence. Consider incorporating a palette harmonious with dark blue (like #0B69FF), light gray (like #F5F5F5), and light purple (like #E8E6FB). The core subject of the image should be: ${input.userInput}`;

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // Crucial for image generation
      prompt: fullPrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must include IMAGE
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed or did not return a media URL.');
    }

    return { imageDataUri: media.url };
  }
);
