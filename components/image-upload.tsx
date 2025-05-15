'use client';

import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';

interface ImageUploadProps {
  onUpload: (urls: string[]) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { uploading, progress, error, uploadMultipleImages } = useCloudinaryUpload();

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;
    
      try {
        const urls = await uploadMultipleImages(Array.from(files));
        setImageUrls(prev => [...prev, ...urls]);
        onUpload(urls);
      } catch (error) {
        console.error('Upload failed:', error instanceof Error ? error.message : 'Unknown error');
      }
  };

  return (
    <div className='pt-3'>
      {/* <h2>Upload Images</h2> */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && (
        <div>
          <p>Uploading: {progress.toFixed(0)}%</p>
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}
      {imageUrls.length > 0 && (
        <div>
          <h3>Uploaded Images:</h3>
          <div className="flex gap-4">
            {imageUrls.map((url, index) => (
              <Image 
                key={index} 
                src={url} 
                alt={`Uploaded ${index + 1}`} 
                width={200}
                height={200}
                className="object-cover rounded"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}