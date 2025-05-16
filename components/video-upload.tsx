'use client';

import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import { useState, ChangeEvent } from 'react';

interface VideoUploadProps {
  onUpload: (urls: string[]) => void;
}

export default function VideoUpload({ onUpload }: VideoUploadProps) {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const { uploading, progress, error, uploadMultipleVideos } = useCloudinaryUpload();

  const MAX_SIZE_MB = 40;

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter(file => {
      const isVideo = file.type.startsWith('video/');
      const isUnderLimit = file.size <= MAX_SIZE_MB * 1024 * 1024;
      return isVideo && isUnderLimit;
    });

    if (validFiles.length === 0) {
      alert(`Please upload video files under ${MAX_SIZE_MB}MB.`);
      return;
    }

    try {
      const urls = await uploadMultipleVideos(validFiles);
      setVideoUrls(prev => [...prev, ...urls]);
      onUpload(urls);
    } catch (error) {
      console.error('Upload failed:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <div className="pt-3">
      <input
        type="file"
        accept="video/*"
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
      {videoUrls.length > 0 && (
        <div>
          <h3>Uploaded Videos:</h3>
          <div className="flex flex-col gap-4">
            {videoUrls.map((url, index) => (
              <video key={index} src={url} controls width={300} className="rounded shadow" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
