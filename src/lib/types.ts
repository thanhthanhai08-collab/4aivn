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
  pricingPlans?: string[];
  videoUrl?: string;
  imageUrl?: string;
  userRating?: number; // Average user rating (1-5)
  totalStars?: number; // Sum of all ratings
  isFavorite?: boolean;
  myRating?: number;
  ratingCount?: number;
  viewCount?: number;
  averageRating?: number;
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
  tag?: string[]; // Add tags for filtering related articles
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous?: boolean;
}

export interface UserProfileData {
  favoriteTools?: string[];
  bookmarkedNews?: string[];
  ratedTools?: Record<string, UserToolRating>;
  ratedModels?: Record<string, number>;
  favoriteModels?: string[];
  displayName?: string;
  photoURL?: string | null;
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
  contextLengthToken?: number | string; 
  intelligenceScore?: number; // e.g., 70
  pricePerMillionTokens?: number; // e.g., 3.44
  speedTokensPerSecond?: number; // e.g., 150.6
  latencyFirstChunkSeconds?: number; // e.g., 38.11
  ratingCount?: number;
  multimodal?: boolean;
  releaseDate?: string;
  benchmarks?: BenchmarkData[];
  averageRating?: number;
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

export interface UserToolRating {
    rating: number;
    text: string;
}

export interface ToolReview extends UserToolRating {
    userId: string;
    userName: string;
    userPhotoURL: string | null;
}
