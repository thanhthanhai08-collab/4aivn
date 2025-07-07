'use server';

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';

// =================================================================================
// IMPORTANT: Document Content
// =================================================================================
// Since I cannot access external Google Docs directly for security reasons,
// I've added this placeholder content.
//
// PLEASE REPLACE THE ENTIRE CONTENT of this `documentContent` variable with the
// text from your Google Doc (ID: 1D2Qha-X4kIdq9BwOGIGU3ZCFJcrssFdT56AwAFM7_yM).
const documentContent = `
PASTE YOUR GOOGLE DOC CONTENT HERE.

This content will be used as the knowledge base for the RAG chatbot.
For example, if your document contains information about company policies,
the chatbot will be able to answer questions about those policies.

Example content:
---
Welcome to the Clean AI Hub knowledge base.

**Our Mission**
Our mission is to provide the most accurate and up-to-date information about AI tools and models.

**Contact Us**
You can reach us at info@cleanai.vn.
---
`;
// =================================================================================

// Simple chunking function
function chunkText(text: string, chunkSize = 500, overlap = 50): string[] {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + chunkSize, text.length);
    chunks.push(text.slice(i, end));
    i += chunkSize - overlap;
  }
  return chunks;
}

// Cosine similarity function
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) {
    return 0;
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// In-memory store for document chunks and embeddings
let documentStore: { chunk: string; embedding: number[] }[] = [];
let isStoreInitialized = false;

// Initialize the document store with embeddings
async function initializeDocumentStore() {
  if (isStoreInitialized) return;

  const chunks = chunkText(documentContent);
  // Using the standard embedding model for reliability and performance.
  const embeddings = await ai.embed({
    model: googleAI.model('embedding-004'),
    content: chunks,
  });

  documentStore = chunks.map((chunk, i) => ({
    chunk,
    embedding: embeddings[i],
  }));

  isStoreInitialized = true;
  console.log('Document store initialized.');
}

// Find relevant context from the document
export async function findRelevantContext(query: string, topK = 3): Promise<string[]> {
  await initializeDocumentStore();

  if (!documentStore.length) {
    return [];
  }

  const queryEmbedding = await ai.embed({
    model: googleAI.model('embedding-004'),
    content: query,
  });

  const similarities = documentStore.map(item => ({
    chunk: item.chunk,
    similarity: cosineSimilarity(queryEmbedding, item.embedding),
  }));

  similarities.sort((a, b) => b.similarity - a.similarity);

  return similarities.slice(0, topK).map(item => item.chunk);
}
