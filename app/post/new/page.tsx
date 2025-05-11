'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Image as ImageIcon, Bold, Italic, Link, List, ListOrdered, Code, Quote, Hash, FileImage, MoreHorizontal, Trash2, RefreshCw } from 'lucide-react';
import MarkdownPreview from './markdown-preview';
import { createClient } from '@/utils/supabase/client';
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload';
import MDEditor from '@uiw/react-md-editor';
import { PostFormData } from '@/lib/types';
import { useProfile } from '@/contexts/ProfileContext';
import toast from 'react-hot-toast';

export default function CreatePostForm() {
  const { uploadImage, uploading, progress, error } = useCloudinaryUpload();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  // const [contentDisplay, setContentDisplay] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [allContent, setAllContent] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const { profile } = useProfile();
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Tab switching effect - simulate server-side markdown rendering
  useEffect(() => {
    if (activeTab === 'preview') {
      setIsPreviewLoading(true);
      // Simulate a POST request to render markdown (like dev.to does)
      const timer = setTimeout(() => {
        setIsPreviewLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, content]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement === contentRef.current) {
        e.preventDefault();
        setShowFormatMenu(true);
      }
      if (e.key === 'Escape') {
        setShowFormatMenu(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const supabase = createClient();

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim() !== '') {
      e.preventDefault();
      if (tags.length < 4 && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCoverImageUpload = () => {
    coverImageInputRef.current?.click();
  };

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
      
      
      // // Simulate upload progress
      // const interval = setInterval(() => {
      //   setUploadProgress(prev => {
      //     if (prev >= 100) {
      //       clearInterval(interval);
      //       return 100;
      //     }
      //     return prev + 10;
      //   });
      // }, 200);
      
      // Read the file as data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        setCoverImage(preview);
      };
      reader.readAsDataURL(file);

      try {
        setFile(file);
        // const coverImageUrl = await uploadImage(file);
        // setCoverImage(coverImageUrl);
      } catch (error) {
        console.error('Upload failed:', error instanceof Error ? error.message : 'Unknown error');
      }

    };
  
  const removeCoverImage = () => {
    setCoverImage(null);
    if (coverImageInputRef.current) {
      coverImageInputRef.current.value = '';
    }
  };
  
  const handleContentImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleContentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate uploading to Cloudinary
      const reader = new FileReader();
      reader.onload = (e) => {
        // In a real implementation, we'd upload to Cloudinary and get a URL back
        // For now, we'll use the data URL as a placeholder
        const imageUrl = e.target?.result as string;
        
        // Insert the image markdown at cursor position
        if (contentRef.current) {
          const textarea = contentRef.current;
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          
          // Create image markdown
          const imageMarkdown = `![Image description](${imageUrl})`;
          
          // Insert into content
          const newContent = content.substring(0, start) + imageMarkdown + content.substring(end);
          setContent(newContent);
          
          // Restore cursor position after the inserted image markdown
          setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = start + imageMarkdown.length;
            textarea.selectionEnd = start + imageMarkdown.length;
          }, 0);
        }
      };
      reader.readAsDataURL(file);
      
      // Reset the file input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const insertFormat = (format: string) => {
    if (!contentRef.current) return;
    
    const textarea = contentRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let cursorOffset = 0;
    
    switch(format) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        cursorOffset = selectedText ? 0 : -2;
        break;
      case 'italic':
        formattedText = `_${selectedText || 'italic text'}_`;
        cursorOffset = selectedText ? 0 : -1;
        break;
      case 'link':
        formattedText = `[${selectedText || 'link text'}](url)`;
        cursorOffset = selectedText ? -1 : -6;
        break;
      case 'bulletList':
        formattedText = `\n* ${selectedText || 'list item'}`;
        cursorOffset = selectedText ? 0 : 0;
        break;
      case 'numberedList':
        formattedText = `\n1. ${selectedText || 'list item'}`;
        cursorOffset = selectedText ? 0 : 0;
        break;
      case 'heading':
        formattedText = `\n## ${selectedText || 'heading'}`;
        cursorOffset = selectedText ? 0 : 0;
        break;
      case 'code':
        formattedText = selectedText.includes('\n') 
          ? `\n\`\`\`\n${selectedText || 'code block'}\n\`\`\`\n`
          : `\`${selectedText || 'inline code'}\``;
        cursorOffset = selectedText ? 0 : (selectedText.includes('\n') ? -4 : -1);
        break;
      case 'quote':
        formattedText = `\n> ${selectedText || 'quoted text'}`;
        cursorOffset = selectedText ? 0 : 0;
        break;
      case 'image':
        formattedText = `![${selectedText || 'image description'}](image-url)`;
        cursorOffset = selectedText ? -1 : -11;
        break;
      default:
        return;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + formattedText.length + cursorOffset;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
    
    setShowFormatMenu(false);
  };

  const formatContent = (text: string) => {
    return text
      .replace(/\*(.*?)\*/gm, '<strong>$1</strong>') // Bold
      .replace(/\_(.*?)\_/gm, '<em>$1</em>') // Italic
      .replace(/\~(.*?)\~/gm, '<del>$1</del>') // Strikethrough
      .replace(/\`(.*?)\`/gm, '<code>$1</code>') // Inline code
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 py-2 my-2 text-gray-600 dark:text-gray-300">$1</blockquote>')
      .replace(/^\* (.*?)/gm, '<ul><li>$1</li></ul>') // Unordered list
      .replace(/^\d+\. (.*?)/gm, '<ol><li>$1</li></ol>') // Ordered list
      .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2" target="_blank">$1</a>') // Link
      .replace(/\n(.*?)/gim, '<h2 class="border-l-4 pl-4 text-blue-600" >$1</h2>'); // Paragraph
  }
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    const formattedText = formatContent(text);
    // setContentDisplay(formattedText);
  }

  const handlePublish = async () => {
    if (!profile) {
      alert('Please log in to publish a post');
      return;
    }

    if (!title || !content) {
      alert('Please fill in all fields');
      return;
    }
    if (tags.length > 4) {
      alert('You can only add up to 4 tags');
      return;
    }
    if (tags.length === 0) {
      alert('Please add at least one tag');
      return;
    }
    // if (content.length < 100) {
    //   alert('Content must be at least 100 characters long');
    //   return;
    // }
    if (content.length > 5000) {
      alert('Content must be less than 5000 characters long');
      return;
    }
    if (title.length < 8) {
      alert('Title must be at least 10 characters long');
      return;
    }
    if (title.length > 100) {
      alert('Title must be less than 100 characters long');
      return;
    }
    console.log(content)
    const coverImageUrl = file ? await uploadImage(file) : null;
    if (coverImageUrl) {
      setCoverImage(coverImageUrl);
    }
    setAllContent(content.split('\n').map(paragraph => paragraph.trim()).filter(paragraph => paragraph !== ''));
    console.log('all content', allContent);
    const postData: PostFormData = {
      title,
      content: allContent,
      tags,
      cover_image: coverImage ? coverImage : undefined,
      author_id: profile.user_id,
      is_published: true,
    };
    console.log(postData);
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select();
      console.log('Post published successfully:', data);
      if (error) {
        console.error('Error publishing post:', error);
        toast.error('Error publishing post');
      }
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-screen-xl mx-auto">
        {/* Header with Back Button and Tab Navigation */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <ArrowLeft size={20} />
            </button>
            <div className="hidden md:flex space-x-4">
              <button 
                className={`px-4 py-2 ${activeTab === 'edit' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setActiveTab('edit')}
              >
                Edit
              </button>
              <button 
                className={`px-4 py-2 ${activeTab === 'preview' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </button>
            </div>
          </div>

          <div className="flex md:hidden space-x-2">
            <button 
              className={`px-3 py-1 ${activeTab === 'edit' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
              onClick={() => setActiveTab('edit')}
            >
              Edit
            </button>
            <button 
              className={`px-3 py-1 ${activeTab === 'preview' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
          </div>
        </header>

        <main className="flex flex-col md:flex-row">
          {/* Main Form Area */}
          <div className="flex-grow md:max-w-3xl">
            <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm m-4">
              {/* Cover Image Upload */}
              <div 
                className={`w-full rounded-t-md h-40 relative ${coverImage ? 'bg-cover bg-center' : 'bg-gray-50 dark:bg-gray-900'}`}
                style={coverImage ? { backgroundImage: `url(${coverImage})` } : {}}
              >
                {uploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                    <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-200 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-white mt-2 text-sm">Uploading... {progress}%</p>
                  </div>
                )}
                
                {!coverImage && !uploading && (
                  <div 
                    className="w-full h-full flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700"
                    onClick={handleCoverImageUpload}
                  >
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm">Add a cover image</p>
                    </div>
                  </div>
                )}
                
                {coverImage && !uploading && (
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button 
                      className="p-2 bg-gray-800 bg-opacity-75 rounded-full hover:bg-opacity-100 text-white"
                      onClick={handleCoverImageUpload}
                      title="Change cover image"
                    >
                      <ImageIcon size={16} />
                    </button>
                    <button 
                      className="p-2 bg-red-600 bg-opacity-75 rounded-full hover:bg-opacity-100 text-white"
                      onClick={removeCoverImage}
                      title="Remove cover image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
                
                <input 
                  type="file" 
                  className="hidden" 
                  ref={coverImageInputRef}
                  onChange={handleCoverImageChange}
                  accept="image/*"
                />
              </div>

              {/* Post Title */}

              <div className="p-4">
                <input
                  type="text"
                  placeholder="New post title here..."
                  className="w-full text-3xl md:text-4xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-500 dark:placeholder-gray-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Tags Input */}
              <div className="px-4 pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  {tags.map(tag => (
                    <div key={tag} className="flex items-center bg-gray-100 dark:bg-gray-700 text-sm rounded-full px-3 py-1">
                      <span>{tag}</span>
                      <button 
                        className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={() => removeTag(tag)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {tags.length < 4 && activeTab === 'edit' && (
                    <input
                      type="text"
                      placeholder={tags.length === 0 ? "Add up to 4 tags..." : "Add another tag..."}
                      className="flex-grow min-w-[120px] bg-transparent border-none focus:outline-none focus:ring-0 text-sm placeholder-gray-500 dark:placeholder-gray-400"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                    />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add a tag</p>
              </div>

              {/* Formatting Toolbar */}
              {/*{activeTab === 'edit' && (
                // <div className="border-t border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center overflow-x-auto">
                //   <button onClick={() => insertFormat('bold')} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                //     <Bold size={18} />
                //   </button>
                //   <button onClick={() => insertFormat('italic')} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                //     <Italic size={18} />
                //   </button>
                //   <button onClick={() => insertFormat('link')} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                //     <Link size={18} />
                //   </button>
                  
                //   {/* Mobile-optimized toolbar (fewer items) */}
                {/* //   <div className={`flex ${isMobile ? 'space-x-1' : 'space-x-1'}`}>
                //     <button onClick={() => insertFormat('bulletList')} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                //       <List size={18} />
                //     </button>
                //     <button onClick={() => insertFormat('numberedList')} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                //       <ListOrdered size={18} />
                //     </button>
                     */}
                    {/* Desktop-only toolbar items */}
                  {/* {!isMobile && ( */}
                     {/* <>
                          <button onClick={() => insertFormat('heading')} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            <Hash size={18} />
                          </button>
                          <button onClick={() => insertFormat('code')} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            <Code size={18} />
                          </button>
                          <button onClick={() => insertFormat('quote')} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            <Quote size={18} />
                          </button>
                          <button onClick={handleContentImageUpload} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            <FileImage size={18} />
                          </button>
                          
                        </> */}
                {/* //     )} */}
                    
                     {/* More options button for mobile */}
                {/* //     {isMobile && ( */}
                       {/* <button 
                //         className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                //         onClick={() => setShowFormatMenu(!showFormatMenu)}
                //       >
                //         <MoreHorizontal size={18} />
                //       </button>
                //     )}
                //   </div>
                // </div>
              // )} */}


              {/* Content Area */}
               {/* <div 
                className="p-4 flex flex-col gap-2"
                dangerouslySetInnerHTML={{ __html: contentDisplay }}
              /> */}
               
              <div className="p-4 min-h-[400px]">
                {activeTab === 'edit' ? (
                  <>
                    <textarea
                      ref={contentRef}
                      placeholder="Write your post content here..."
                      className="w-full min-h-[400px] bg-transparent border-none focus:outline-none focus:ring-0 resize-none font-mono"
                      value={content}
                      onChange={handleContentChange}
                    />
                    
                    {/* Format Menu */}
                    {showFormatMenu && (
                      <div className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 p-2 z-20 w-64">
                        <div className="text-sm font-medium mb-2">Formatting Options</div>
                        <div className="grid grid-cols-2 gap-1">
                          <button onClick={() => insertFormat('heading')} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm">
                            <Hash size={16} className="mr-2" /> Heading
                          </button>
                          <button onClick={() => insertFormat('bold')} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm">
                            <Bold size={16} className="mr-2" /> Bold
                          </button>
                          <button onClick={() => insertFormat('italic')} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm">
                            <Italic size={16} className="mr-2" /> Italic
                          </button>
                          <button onClick={() => insertFormat('link')} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm">
                            <Link size={16} className="mr-2" /> Link
                          </button>
                          <button onClick={() => insertFormat('bulletList')} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm">
                            <List size={16} className="mr-2" /> Bullet List
                          </button>
                          <button onClick={() => insertFormat('numberedList')} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm">
                            <ListOrdered size={16} className="mr-2" /> Numbered List
                          </button>
                          <button onClick={() => insertFormat('code')} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm">
                            <Code size={16} className="mr-2" /> Code
                          </button>
                          <button onClick={() => insertFormat('quote')} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm">
                            <Quote size={16} className="mr-2" /> Quote
                          </button>
                          <button 
                            onClick={handleContentImageUpload} 
                            className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm"
                          >
                            <FileImage size={16} className="mr-2" /> Upload Image
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleContentImageChange}
                      accept="image/*"
                    />
                  </>
                ) : (
                  <div className="prose dark:prose-invert max-w-none">
                    {isPreviewLoading ? (
                      <div className="flex flex-col items-center justify-center p-8">
                        <RefreshCw size={24} className="animate-spin text-blue-500 mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">Generating preview...</p>
                      </div>
                    ) : (
                      <div className="markdown-preview">
                        {content ? (
                          <MarkdownPreview markdown={content} />
                        ) : (
                          <div className="text-gray-400 italic">Nothing to preview</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div> 

              {/* Action Buttons */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-2">
                <div className="flex space-x-2">
                  <button 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
                    onClick={handlePublish}
                  >
                    Publish
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md font-medium">
                    Save draft
                  </button>
                </div>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md font-medium">
                  Revert changes
                </button>
              </div>
            </div>
          </div>

          {/* Tips Section (Desktop Only) */}
          <aside className="hidden md:block md:w-80 px-4 py-6">
            <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-md shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-3">Editor Basics</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <div>
                    Use <span className="text-blue-600">Markdown</span> to write and format posts.
                  </div>
                </li>
                <li>
                  <p className="font-medium mb-1">Commonly used syntax</p>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2 font-mono text-xs">
                    <div className="flex justify-between mb-1">
                      <span># Header</span>
                      <span className="font-medium">H1 Header</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>###### Header</span>
                      <span className="font-medium">H6 Header</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>*italics* or _italics_</span>
                      <span className="italic">italics</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>**bold**</span>
                      <span className="font-bold">bold</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>[Link](https://...)</span>
                      <span className="text-blue-600">Link</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>* item 1<br/>* item 2</span>
                      <span>• item 1<br/>• item 2</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>1. item 1<br/>2. item 2</span>
                      <span>1. item 1<br/>2. item 2</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>&gt; quoted text</span>
                      <span className="border-l-4 border-gray-300 pl-2">quoted text</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>`inline code`</span>
                      <span className="bg-gray-200 dark:bg-gray-700 px-1 rounded">inline code</span>
                    </div>
                    <div className="flex justify-between">
                      <span>```<br/>code block<br/>```</span>
                      <span className="bg-gray-200 dark:bg-gray-700 px-1 rounded">code block</span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <div>
                    Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 text-xs rounded">/</kbd> key to access formatting options anywhere in the editor.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <div>
                    In addition to images for the post's content, you can also drag and drop a cover image.
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}