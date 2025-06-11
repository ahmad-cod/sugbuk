import { useState } from 'react';
import { useCloudinaryUpload } from './useCloudinaryUpload';
import type { Post, CreatePostData, UseCreatePostReturn } from '../types/post';
import { createClient } from '@/utils/supabase/client';
import { useProfile } from '@/contexts/ProfileContext';

export const useCreatePost = (): UseCreatePostReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { uploadMultipleImages } = useCloudinaryUpload();
  const { profile } = useProfile();
  const supabase = createClient()

  const createPost = async (postData: CreatePostData, images?: File[]): Promise<Post> => {
    setLoading(true);
    setError(null);

    try {
      // 1. Upload images to Cloudinary first (if any)
      let imageUrls: string[] = [];
      if (images && images.length > 0) {
        imageUrls = await uploadMultipleImages(images);
      }

      // 2. Create the post record with image URLs
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert([
          {
            author_id: profile?.id,
            title: postData.title || null,
            content: postData.content,
            category: postData.category,
            priority: postData.priority,
            image_urls: imageUrls,
          }
        ])
        .select()
        .single();

      if (postError) throw new Error(postError.message);
      if (!post) throw new Error('Failed to create post');

      return post as Post;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error };
};