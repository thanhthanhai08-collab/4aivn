// src/lib/embedding-service.ts
'use server';

import { embed } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// The specific embedding model requested by the user.
const embeddingModel = googleAI.model('text-embedding-004');

/**
 * Creates an embedding for a given text using the specified Gemini model.
 * @param text The text to embed.
 * @returns A promise that resolves to an array of numbers representing the embedding.
 */
export async function createEmbedding(text: string): Promise<number[]> {
  try {
    const { embedding } = await embed({
      embedder: embeddingModel,
      content: text,
    });
    return embedding;
  } catch (error) {
    console.error("Error creating embedding:", error);
    throw new Error("Failed to create text embedding.");
  }
}
