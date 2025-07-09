// src/lib/rag-service.ts
'use server';

// IMPORTANT: Replace with your actual deployed website domain if it's different.
// For example: "my-clean-ai-hub.firebaseapp.com"
const WEBSITE_DOMAIN = "https://6000-firebase-studio-1749353897098.cluster-ubrd2huk7jh6otbgyei4h62ope.cloudworkstations.dev"; 

// The Tavily API key should be set in your .env file.
if (!process.env.TAVILY_API_KEY) {
  console.warn("TAVILY_API_KEY is not set in the .env file. RAG functionality will be disabled.");
}

/**
 * Finds relevant context from the Clean AI Hub website using Tavily AI API directly.
 * @param query The user's search query.
 * @param topK The number of search results to return.
 * @returns A promise that resolves to an array of context strings.
 */
export async function findRelevantContext(query: string, topK = 3): Promise<string[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    return []; // Return no context if API key is missing
  }

  // Construct a query that searches only within our website
  const siteSpecificQuery = `site:${WEBSITE_DOMAIN} ${query}`;

  try {
    const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key: apiKey,
            query: siteSpecificQuery,
            search_depth: 'basic',
            include_raw_content: false,
            max_results: topK,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Tavily API request failed with status ${response.status}:`, errorBody);
        return [];
    }
    
    const searchResponse = await response.json();

    if (!searchResponse.results || searchResponse.results.length === 0) {
      console.log(`Tavily search for "${siteSpecificQuery}" returned no results.`);
      return [];
    }

    // Return the content of the top results, formatted for the prompt.
    return searchResponse.results.map((result: { url: string; content: string }) => `Source: ${result.url}\nContent: ${result.content}`);

  } catch (error) {
    console.error("Error calling Tavily search API:", error);
    return []; // Return empty context on error
  }
}
