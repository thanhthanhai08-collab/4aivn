export interface Tool {
  id: string;
  name: string;
  context: string; // Category like 'Chatbot', 'Image Generation'
  ranking: number;
  description: string;
  logoUrl: string; // URL to the tool's logo
  link: string; // Official link to the tool
  features?: string[];
  userRating?: number; // Average user rating (1-5)
  isFavorite?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string; // Publisher or source name
  content: string; // Full content or summary
  publishedAt: string; // ISO date string
  imageUrl: string;
  link: string; // Link to the full article if 'content' is a summary
}

export interface User {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAnonymous?: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}
