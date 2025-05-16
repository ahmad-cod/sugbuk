// src/utils/cloudinary.ts
/**
 * Utility functions for interacting with Cloudinary
 */

/**
 * Uploads a single file to Cloudinary and returns the secure URL
 * @param file The file to upload
 * @returns The secure URL of the uploaded image
 * @throws Error if upload fails
 */
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary environment variables are not set');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Cloudinary upload failed: ${errorData.error?.message || 'Unknown error'}`);
  }
  
  const data: { secure_url: string } = await response.json();
  return data.secure_url;
};

/**
 * Uploads multiple files to Cloudinary and returns an array of secure URLs
 * @param files Array of files to upload
 * @param onProgress Optional callback to track progress (0-100)
 * @returns Array of secure URLs for the uploaded images
 */
export const uploadMultipleImagesToCloudinary = async (
  files: File[],
  onProgress?: (progress: number) => void
): Promise<string[]> => {
  const uploadedUrls: string[] = [];
  let completed = 0;
  
  try {
    // Process uploads sequentially to avoid rate limiting
    for (const file of files) {
      const url = await uploadImageToCloudinary(file);
      uploadedUrls.push(url);
      
      completed++;
      if (onProgress) {
        onProgress((completed / files.length) * 100);
      }
    }
    
    return uploadedUrls;
  } catch (error) {
    console.error('Multiple uploads failed:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

export const uploadVideoToCloudinary = async (file: File): Promise<string> => {
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary environment variables are not set');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Cloudinary upload failed: ${errorData.error?.message || 'Unknown error'}`);
  }
  
  const data: { secure_url: string } = await response.json();
  return data.secure_url;
}

export const uploadMultipleVideosToCloudinary = async (
  files: File[],
  onProgress?: (progress: number) => void
): Promise<string[]> => {
  const uploadedUrls: string[] = [];
  let completed = 0;
  
  try {
    // Process uploads sequentially to avoid rate limiting
    for (const file of files) {
      const url = await uploadVideoToCloudinary(file);
      uploadedUrls.push(url);
      
      completed++;
      if (onProgress) {
        onProgress((completed / files.length) * 100);
      }
    }
    
    return uploadedUrls;
  } catch (error) {
    console.error('Multiple uploads failed:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};