// src/lib/pinecone-service.ts
'use server';

import { Pinecone } from '@pinecone-database/pinecone';

// Ensure environment variables are set
if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_HOST) {
    throw new Error('Pinecone API key or host is not set in environment variables.');
}

// Initialize the Pinecone client
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

// Use a default index name, you might want to make this an environment variable too
const indexName = "default-index"; 

const index = pinecone.index<{ text: string }>(indexName);

interface QueryResult {
    id: string;
    score: number;
    text: string;
}

/**
 * Queries the Pinecone index to find the most relevant documents for a given vector.
 * @param vector The query vector.
 * @param topK The number of results to return.
 * @returns A promise that resolves to an array of query results.
 */
export async function queryPinecone(vector: number[], topK: number): Promise<QueryResult[]> {
    try {
        const queryResponse = await index.query({
            vector: vector,
            topK: topK,
            includeMetadata: true, // Assuming the text is stored in metadata
        });

        if (!queryResponse.matches) {
            return [];
        }

        // Map the results to a more usable format
        return queryResponse.matches.map(match => ({
            id: match.id,
            score: match.score || 0,
            // Assuming the original text is stored in metadata under the key 'text'
            text: match.metadata?.text || '',
        }));

    } catch (error) {
        console.error("Error querying Pinecone:", error);
        throw new Error("Failed to query vector database.");
    }
}
