export interface Tool {
  id: string;
  name: string;
  context: string; // Category like 'Chatbot', 'Image Generation'
  developer: string;
  ranking?: number; // Optional: current rank, might be dynamically calculated
  description: string;
  longDescription?: string;
  logoUrl: string; // URL to the tool's logo
  link: string; // Official link to the tool
  features?: string[];
  useCases?: string[];
  whoIsItFor?: string[];
  pricingPlans?: string;
  videoUrl?: string;
  imageUrl?: string;
  userRating?: number; // Average user rating (1-5)
  totalStars?: number; // Sum of all ratings
  isFavorite?: boolean;
  myRating?: number;
  ratingCount?: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string; // Publisher or source name
  author?: string;
  content: string; // Full content or summary
  publishedAt: string; // ISO date string
  imageUrl: string;
  link?: string;
  dataAiHint?: string;
  isBookmarked?: boolean;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous?: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  imageUrl?: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export interface BenchmarkData {
    name: string;
    score: number;
}

export interface AIModel {
  id: string;
  name: string;
  type: string; // e.g., 'Mô hình ngôn ngữ', 'Tạo ảnh'
  developer: string; // e.g., 'OpenAI', 'Google'
  description: string;
  logoUrl: string;
  link?: string; // Link to project page or paper
  userRating?: number;
  totalStars?: number; // Sum of all ratings
  myRating?: number;
  features?: string[];
  isFavorite?: boolean; // Added for favorite functionality
  contextLengthToken?: string; // e.g., "1m", "200k"
  intelligenceScore?: number; // e.g., 70
  pricePerMillionTokens?: number; // e.g., 3.44
  speedTokensPerSecond?: number; // e.g., 150.6
  latencyFirstChunkSeconds?: number; // e.g., 38.11
  ratingCount?: number;
  multimodal?: boolean;
  releaseDate?: string;
  benchmarks?: BenchmarkData[];
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string | null;
  userPhotoURL: string | null;
  text: string;
  createdAt: Date;
}

export interface ToolReview {
    userId: string;
    userName: string;
    userPhotoURL: string | null;
    rating: number;
    text: string;
}
