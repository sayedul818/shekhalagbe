
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, FileText, Send, X, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PostDiscussionProps {
  onSubmit: (post: {
    title: string;
    content: string;
    tags: string[];
    attachments?: File[];
  }) => Promise<void>;
  isReply?: boolean;
  replyTo?: string;
  onCancel?: () => void;
}

const PostDiscussion: React.FC<PostDiscussionProps> = ({ 
  onSubmit, 
  isReply = false, 
  replyTo = '',
  onCancel
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const { toast } = useToast();
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...selectedFiles]);
      
      // Create preview URLs
      const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };
  
  const removeAttachment = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setAttachments(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags(prev => [...prev, tagInput]);
      setTagInput('');
    }
  };
  
  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };
  
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      addTag();
    }
  };
  
  const handleSubmit = async () => {
    if (isReply && !content) {
      toast({
        title: "Error",
        description: "Please enter your reply content.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isReply && (!title || !content)) {
      toast({
        title: "Error",
        description: "Please enter both title and content for your post.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      await onSubmit({
        title: isReply ? replyTo : title,
        content,
        tags,
        attachments: attachments.length > 0 ? attachments : undefined,
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setTags([]);
      setTagInput('');
      
      // Revoke object URLs to avoid memory leaks
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      setAttachments([]);
      setPreviewUrls([]);
      
      toast({
        title: isReply ? "Reply Posted" : "Discussion Posted",
        description: isReply 
          ? "Your reply has been published successfully." 
          : "Your discussion has been published successfully.",
      });
      
      // If this is a reply, call onCancel to close the reply form
      if (isReply && onCancel) {
        onCancel();
      }
    } catch (error) {
      console.error("Error posting discussion:", error);
      toast({
        title: "Error",
        description: "Failed to post your discussion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Simple Markdown preview renderer
  const renderMarkdownPreview = () => {
    // This is a simplified markdown renderer for preview purposes
    // In a real app, you'd use a proper markdown library
    
    let htmlContent = content
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Headers
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
      // Lists
      .replace(/^\* (.*?)$/gm, '<li>$1</li>')
      .replace(/^- (.*?)$/gm, '<li>$1</li>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Paragraphs (simplified)
      .replace(/\n\n/g, '<br/><br/>');
    
    return (
      <div 
        className="prose dark:prose-invert max-w-none p-4 min-h-[200px] bg-muted/50 rounded-md"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isReply ? "Post a Reply" : "Start a New Discussion"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isReply && (
          <div>
            <Input 
              placeholder="Discussion title"
              value={title}
              onChange={handleTitleChange}
              className="font-medium"
            />
          </div>
        )}
        
        <Tabs defaultValue="write" value={activeTab} onValueChange={(value) => setActiveTab(value as 'write' | 'preview')}>
          <TabsList className="mb-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <Textarea
              placeholder={isReply 
                ? "Write your reply here. You can use Markdown syntax for formatting."
                : "Write your discussion here. You can use Markdown syntax for formatting."
              }
              className="min-h-[200px]"
              value={content}
              onChange={handleContentChange}
            />
          </TabsContent>
          <TabsContent value="preview">
            {content ? renderMarkdownPreview() : (
              <div className="min-h-[200px] flex items-center justify-center bg-muted/50 rounded-md text-muted-foreground">
                <p>Nothing to preview yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Markdown reference */}
        <div className="text-xs text-muted-foreground space-x-2">
          <span>Markdown: </span>
          <span><code>**bold**</code></span>
          <span><code>*italic*</code></span>
          <span><code># Header</code></span>
          <span><code>- List item</code></span>
          <span><code>`code`</code></span>
          <span><code>[Link](url)</code></span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge 
              key={tag} 
              variant="secondary"
              className="cursor-pointer"
            >
              <Hash className="h-3 w-3 mr-1" />
              {tag}
              <button 
                onClick={() => removeTag(tag)}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          <div className="flex gap-2">
            <Input
              placeholder="Add tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              className="w-32 h-8 text-sm"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={addTag}
              disabled={!tagInput}
            >
              Add
            </Button>
          </div>
        </div>
        
        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Attachments</h4>
            <div className="flex flex-wrap gap-2">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  {attachments[index].type.startsWith('image/') ? (
                    <div className="border rounded-md overflow-hidden h-20 w-20">
                      <img
                        src={url}
                        alt={`Attachment ${index}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="border rounded-md overflow-hidden h-20 w-20 flex items-center justify-center bg-muted">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <button
                    onClick={() => removeAttachment(index)}
                    className="absolute -top-2 -right-2 rounded-full bg-destructive text-destructive-foreground p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => document.getElementById('file-upload')?.click()}
            className="flex items-center gap-1"
          >
            <Image className="h-4 w-4" />
            Attach
          </Button>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        
        <div className="flex gap-2">
          {isReply && onCancel && (
            <Button
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || (isReply ? !content : !title || !content)}
            className="flex items-center gap-1"
          >
            <Send className="h-4 w-4" />
            {isSubmitting 
              ? 'Posting...' 
              : isReply 
                ? 'Post Reply' 
                : 'Post Discussion'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostDiscussion;
