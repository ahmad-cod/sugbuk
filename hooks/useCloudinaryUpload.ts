"use client";

import { useState } from 'react';
import { uploadImageToCloudinary, uploadMultipleImagesToCloudinary, uploadVideoToCloudinary } from '../utils/cloudinary';

interface UseCloudinaryUploadReturn {
  uploading: boolean;
  progress: number;
  error: Error | null;
  uploadImage: (file: File) => Promise<string>;
  uploadMultipleImages: (files: File[]) => Promise<string[]>;
  uploadMultipleVideos: (files: File[]) => Promise<string[]>;
}

/**
 * Hook for handling Cloudinary uploads with state management
 */
export const useCloudinaryUpload = (): UseCloudinaryUploadReturn => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    setUploading(true);
    setProgress(0);
    setError(null);
    
    try {
      setProgress(10);
      const url = await uploadImageToCloudinary(file);
      setProgress(100);
      return url;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown upload error');
      setError(error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
    setUploading(true);
    setProgress(0);
    setError(null);
    
    try {
      const urls = await uploadMultipleImagesToCloudinary(files, setProgress);
      return urls;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown upload error');
      setError(error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultipleVideos = async (files: File[]) => {
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(file => uploadVideoToCloudinary(file)));
      return urls;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    progress,
    error,
    uploadImage,
    uploadMultipleImages,
    uploadMultipleVideos,
  };
};