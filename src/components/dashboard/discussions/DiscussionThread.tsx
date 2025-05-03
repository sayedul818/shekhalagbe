import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import PostDiscussion from './PostDiscussion';
import { 
  ThumbsUp, 
  MessageSquare, 
  Clock, 
  MoreHorizontal, 
  CheckCircle2, 
  Pin, 
  Flag, 
  Copy, 
  Reply,
  Hash,
  Award,
  AlertCircle,
  Image,
  FileText,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Attachment {
  id: string;
  type: 'image' | 'document';
  url: string;
  name: string;
}

interface ReplyComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: 'student' | 'instructor' | 'ta';
  content: string;
  createdAt: string;
  likes: number;
  mentionedUsers?: { id: string; name: string }[];
  hasLiked?: boolean;
  attachments?: Attachment[];
}

interface DiscussionPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: 'student' | 'instructor' | 'ta';
  createdAt: string;
  updatedAt?: string;
  tags: string[];
  likes: number;
  replies: ReplyComment[];
  isResolved?: boolean;
  isPinned?: boolean;
  hasLiked?: boolean;
  attachments?: Attachment[];
}

interface DiscussionThreadProps {
  post: DiscussionPost;
  onLike: (postId: string, isReply?: boolean, replyId?: string) => Promise<void>;
  onReply: (postId: string, content: string, attachments?: File[]) => Promise<void>;
  onResolve?: (postId: string) => Promise<void>;
  onPin?: (postId: string) => Promise<void>;
  currentUserId: string;
}

const DiscussionThread: React.FC<DiscussionThreadProps> = ({
  post,
  onLike,
  onReply,
  onResolve,
  onPin,
  currentUserId
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [expandedAttachment, setExpandedAttachment] = useState<string | null>(null);
  const { toast } = useToast();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const timeSince = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
  };
  
  const handleReplySubmit = async (replyData: {
    title: string;
    content: string;
    tags: string[];
    attachments?: File[];
  }) => {
    try {
      await onReply(post.id, replyData.content, replyData.attachments);
      setIsReplying(false);
    } catch (error) {
      console.error("Error submitting reply:", error);
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleLikePost = () => {
    onLike(post.id);
  };
  
  const handleLikeReply = (replyId: string) => {
    onLike(post.id, true, replyId);
  };
  
  const handleResolvePost = () => {
    if (onResolve) {
      onResolve(post.id);
    }
  };
  
  const handlePinPost = () => {
    if (onPin) {
      onPin(post.id);
    }
  };
  
  const handleCopyLink = () => {
    // In a real app, this would copy a link to this discussion
    navigator.clipboard.writeText(`https://yourapp.com/discussions/${post.id}`);
    toast({
      title: "Link Copied",
      description: "Link to this discussion has been copied to your clipboard.",
    });
  };
  
  const handleReportPost = () => {
    toast({
      title: "Report Submitted",
      description: "Thank you for reporting this content. Our team will review it.",
    });
  };
  
  const isAuthor = post.authorId === currentUserId;
  const isInstructor = post.authorRole === 'instructor';
  
  // Parse content to detect mentions
  const parseContent = (content: string) => {
    // Simple regex to match @username mentions
    return content.replace(/@(\w+)/g, '<span class="text-primary font-medium">@$1</span>');
  };
  
  // Render attachments
  const renderAttachments = (attachments: Attachment[]) => {
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {attachments.map(attachment => (
          <div key={attachment.id} className="relative group">
            {attachment.type === 'image' ? (
              <div 
                className="border rounded-md overflow-hidden h-20 w-20 cursor-pointer"
                onClick={() => setExpandedAttachment(attachment.id)}
              >
                <img
                  src={attachment.url}
                  alt={attachment.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <a 
                href={attachment.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="border rounded-md overflow-hidden h-20 w-20 flex flex-col items-center justify-center bg-muted p-2"
              >
                <FileText className="h-8 w-8 text-muted-foreground" />
                <span className="text-xs truncate max-w-full">{attachment.name}</span>
              </a>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <Card className={post.isPinned ? "border-primary/50" : ""}>
      <CardHeader className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
              <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{post.authorName}</span>
                
                {post.authorRole === 'instructor' && (
                  <Badge variant="secondary">Instructor</Badge>
                )}
                
                {post.authorRole === 'ta' && (
                  <Badge variant="outline">Teaching Assistant</Badge>
                )}
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground gap-3 mt-1">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{timeSince(post.createdAt)}</span>
                </div>
                
                {post.isPinned && (
                  <div className="flex items-center text-amber-500">
                    <Pin className="h-3 w-3 mr-1" />
                    <span>Pinned</span>
                  </div>
                )}
                
                {post.isResolved && (
                  <div className="flex items-center text-green-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    <span>Resolved</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleCopyLink} title="Copy Link">
              <Copy className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={handleReportPost} title="Report">
              <Flag className="h-4 w-4" />
            </Button>
            
            {(isAuthor || isInstructor) && (
              <Button variant="ghost" size="icon" title="More actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium">{post.title}</h3>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: parseContent(post.content) }}
        />
        
        {post.attachments && post.attachments.length > 0 && renderAttachments(post.attachments)}
        
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Hash className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <div className="flex gap-2">
          <Button 
            variant={post.hasLiked ? "secondary" : "ghost"} 
            size="sm" 
            onClick={handleLikePost}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            {post.likes > 0 && post.likes}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsReplying(prev => !prev)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            {post.replies.length > 0 && post.replies.length}
          </Button>
        </div>
        
        <div className="flex gap-2">
          {!post.isResolved && onResolve && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleResolvePost}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Mark as Resolved
            </Button>
          )}
          
          {onPin && isInstructor && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePinPost}
            >
              <Pin className="h-4 w-4 mr-1" />
              {post.isPinned ? 'Unpin' : 'Pin'}
            </Button>
          )}
        </div>
      </CardFooter>
      
      {/* Reply Form */}
      {isReplying && (
        <div className="px-6 pb-6">
          <Separator className="mb-4" />
          <PostDiscussion 
            onSubmit={handleReplySubmit}
            isReply
            replyTo={post.title}
            onCancel={() => setIsReplying(false)}
          />
        </div>
      )}
      
      {/* Replies */}
      {post.replies.length > 0 && (
        <div className="px-6 pb-6">
          <Separator className="mb-4" />
          <div className="space-y-4">
            <h4 className="font-medium">{post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}</h4>
            
            {post.replies.map(reply => (
              <div key={reply.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={reply.authorAvatar} alt={reply.authorName} />
                      <AvatarFallback>{reply.authorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{reply.authorName}</span>
                        
                        {reply.authorRole === 'instructor' && (
                          <Badge variant="secondary">Instructor</Badge>
                        )}
                        
                        {reply.authorRole === 'ta' && (
                          <Badge variant="outline">Teaching Assistant</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center text-xs text-muted-foreground gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{timeSince(reply.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <div>
                  <div 
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: parseContent(reply.content) }}
                  />
                  
                  {reply.attachments && reply.attachments.length > 0 && renderAttachments(reply.attachments)}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant={reply.hasLiked ? "secondary" : "ghost"} 
                    size="sm" 
                    onClick={() => handleLikeReply(reply.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {reply.likes > 0 && reply.likes}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsReplying(true)}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Expanded Image Modal */}
      {expandedAttachment && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setExpandedAttachment(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <img
              src={post.attachments?.find(a => a.id === expandedAttachment)?.url}
              alt="Enlarged attachment"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setExpandedAttachment(null)}
              className="absolute top-2 right-2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DiscussionThread;
