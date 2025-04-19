'use client';

import { useState, ChangeEvent } from 'react';

interface ImageUploadProps {
  onUpload: (urls: string[]) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const files = event.target.files;
    const uploadedUrls: string[] = [];

    if (!files) return;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        
        const data: { secure_url: string } = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        }
      } catch (error) {
        console.error('Upload failed:', error instanceof Error ? error.message : 'Unknown error');
      }
    }

    setImageUrls(prev => [...prev, ...uploadedUrls]);
    onUpload(uploadedUrls);
    setUploading(false);
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {imageUrls.length > 0 && (
        <div>
          <h3>Uploaded Images:</h3>
          <div className="grid grid-cols-3 gap-4">
            {imageUrls.map((url, index) => (
              <img 
                key={index} 
                src={url} 
                alt={`Uploaded ${index + 1}`} 
                width={100}
                className="object-cover rounded"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}