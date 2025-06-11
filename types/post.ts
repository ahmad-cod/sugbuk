export interface CreatePostData {
  title?: string;
  content: string;
  author: string;
  images?: File[];
  priority: 'low' | 'medium' | 'high';
  category: 'resolution' | 'announcement' | 'event' | 'general';
}

export interface Post {
  id: string;
  title?: string;
  content: string;
  author: string;
  images?: string[];
  priority: 'low' | 'medium' | 'high';
  category: 'resolution' | 'announcement' | 'event' | 'general';
  likes: number;
  comments: number;
  shares: number;
  created_at: string;
  updated_at: string;
  user_id: string;
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