'use client';

import { useEffect, useState } from 'react';

interface MarkdownPreviewProps {
  markdown: string;
}

// A simple markdown parser for preview
const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    // This is a simplified markdown parser for demonstration
    // In a production app, you would use a library like marked or remark
    const parseMarkdown = (text: string) => {
      // Basic parsing - this would be more comprehensive in production
      let parsed = text
        // Headers
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 classname="font-bold text-4xl">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 classname="font-semibold text-4xl">$1</h3>')
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
        .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
        // Bold
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        // Italic
        .replace(/\_(.*?)\_/gim, '<em>$1</em>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
        // Images
        .replace(/!\[([^\]]+)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="max-w-full h-auto my-2 rounded">')
        // Lists
        .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
        .replace(/^- (.*$)/gim, '<ul><li>$1</li></ul>')
        .replace(/^(\d+)\. (.*$)/gim, '<ol><li>$2</li></ol>')
        // Blockquotes
        .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 py-2 my-2 text-gray-600 dark:text-gray-300">$1</blockquote>')
        // Code blocks
        .replace(/```([\s\S]*?)```/gm, '<pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded my-2 overflow-x-auto"><code>$1</code></pre>')
        // Inline code
        .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>')
        // Paragraphs
        .replace(/^(?!<[a-z]|\s*$)(.+)/gim, '<p>$1</p>');

      // Fix list nesting issues (simplified)
      parsed = parsed
        .replace(/<\/ul>\s*<ul>/g, '')
        .replace(/<\/ol>\s*<ol>/g, '');
      
      return parsed;
    };

    setHtml(parseMarkdown(markdown));
  }, [markdown]);

  return (
    <div 
      className="markdown-preview prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownPreview;