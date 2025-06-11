"use client"
import React, { useState, useRef, useCallback } from 'react';
import { X, Upload, Image as ImageIcon, AlertCircle, Check, Plus, Trash2 } from 'lucide-react';
import { CreatePostData, Post } from '@/types/post';
import { useCreatePost } from '@/hooks/useCreatePost';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import toast from 'react-hot-toast';

interface CreatePostFormProps {
  onPostCreated?: (post: Post) => void;
}

const AdminPostCreator: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const [formData, setFormData] = useState<CreatePostData>({
    content: '',
    priority: 'medium',
    category: 'resolution',
  });
  const [images, setSelectedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);
  const { createPost, loading: createLoading, error } = useCreatePost()
  const { uploading, progress } = useCloudinaryUpload()
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files || []);
    if (files.length + images.length > 10) {
      setErrors(prev => ({ ...prev, images: 'Maximum 10 images allowed' }));
      toast.error('Maximum 10 images allowed');
      return;
    }
    setSelectedImages(prev => [...prev, ...files])
  }

  const removeImage = (index: number): void => {
    setSelectedImages(prev => prev.filter((_, i) => index !== i));
  };

   const resetForm = (): void => {
    setFormData({
      title: '',
      content: '',
      category: 'resolution',
      priority: 'medium'
    });
    setSelectedImages([]);
  };

  const handleInputChange = (field: keyof CreatePostData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    if (field === 'content') {
      setTimeout(adjustTextareaHeight, 0);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    // if (!formData.author.trim()) {
    //   newErrors.author = 'Author name is required';
    // }
    
    if (formData.content.length > 5000) {
      newErrors.content = 'Content must be less than 5000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const maxFiles = 10;
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (images.length + fileArray.length > maxFiles) {
      setErrors(prev => ({ ...prev, images: `Maximum ${maxFiles} images allowed` }));
      return;
    }

    const validFiles = fileArray.filter(file => {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, images: 'Only image files are allowed' }));
        return false;
      }
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, images: 'Images must be smaller than 5MB' }));
        return false;
      }
      return true;
    });

    setErrors(prev => ({ ...prev, images: '' }));
  };



  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {

      const post = await createPost(formData, images)
      resetForm();
      onPostCreated?.(post);
      toast.success('Post created successfully!');
      
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      setErrors({ general: 'Failed to create post. Please try again.' });
      toast.error('Failed to create post. Please try again.');
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = createLoading || uploading;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'resolution': return '⚖️';
      case 'announcement': return '📢';
      case 'event': return '📅';
      case 'general': return '📝';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl my-8 mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
          <p className="text-gray-600">Share resolutions, announcements, and updates with the community</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3 animate-in slide-in-from-top duration-300">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-green-800 font-medium">Post created successfully!</p>
              <p className="text-green-700 text-sm">Your post is now live in the news feed.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold text-lg">Post Details</h2>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(formData.priority)}`}>
                    {formData.priority.toUpperCase()}
                  </span>
                  <span className="text-white text-sm flex items-center space-x-1">
                    <span>{getCategoryIcon(formData.category)}</span>
                    <span className="capitalize">{formData.category}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Author and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <div className="space-y-2">
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Author Name
                  </label>
                  <input
                    id="author"
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="e.g., Students' Union Government"
                  />
                  {errors.author && (
                    <p className="text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.author}</span>
                    </p>
                  )}
                </div> */}

                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="resolution">⚖️ Resolution</option>
                    <option value="announcement">📢 Announcement</option>
                    <option value="event">📅 Event</option>
                    <option value="general">📝 General</option>
                  </select>
                </div>
              </div>

              {/* Title (Optional) */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Add a title to your post..."
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  ref={textareaRef}
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  onInput={adjustTextareaHeight}
                  className="block w-full min-h-[120px] rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                  placeholder="Share your resolution, announcement, or update..."
                />
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{formData.content.length}/5000 characters</span>
                  {errors.content && (
                    <p className="text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.content}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Priority Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['low', 'medium', 'high'] as const).map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => handleInputChange('priority', priority)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.priority === priority
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityColor(priority)}`}>
                          {priority.toUpperCase()}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
              <h3 className="text-white font-semibold text-lg flex items-center space-x-2">
                <ImageIcon className="h-5 w-5" />
                <span>Images ({images.length}/10)</span>
              </h3>
            </div>

            <div className="p-6">
              {/* Drag and Drop Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  disabled={isLoading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Drop images here or click to upload
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PNG, JPG, GIF up to 5MB each (max 10 images)
                    </p>
                  </div>
                </div>
              </div>

              {errors.images && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.images}</span>
                </p>
              )}

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setErrors({});
              }}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.content.trim()}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Post...</span>
                </>
              ) : (
                <span>Create Post</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AdminPostCreator;