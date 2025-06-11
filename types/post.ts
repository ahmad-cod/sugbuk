export interface CreatePostData {
  title?: string;
  content: string;
  images?: File[];
  priority: 'low' | 'medium' | 'high';
  category: 'resolution' | 'announcement' | 'event' | 'general';
}

export interface Post {
  id: string;
  title?: string;
  content: string;
  author_id: number;
  image_urls?: string[];
  priority: 'low' | 'medium' | 'high';
  category: 'resolution' | 'announcement' | 'event' | 'general';
  likes: number;
  comments: number;
  shares: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  author?: {
    first_name: string;
    last_name: string;
    full_name: string;
    avatar_url: string | null;
  }
}

export interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseCreatePostReturn {
  createPost: (postData: CreatePostData, images?: File[]) => Promise<Post>;
  loading: boolean;
  error: string | null;
}