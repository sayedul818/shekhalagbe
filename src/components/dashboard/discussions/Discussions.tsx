import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PostDiscussion from './PostDiscussion';
import DiscussionThread from './DiscussionThread';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Search, Tag, Filter, SlidersHorizontal, Plus, X } from 'lucide-react';
import { CourseComponentProps } from '@/types';

// Type definition for discussion post
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
  tags: string[];
  likes: number;
  replies: ReplyComment[];
  isResolved?: boolean;
  isPinned?: boolean;
  hasLiked?: boolean;
  attachments?: Attachment[];
}

// Mock discussion data with correct types
const mockDiscussions: DiscussionPost[] = [
  {
    id: "1",
    title: "How to solve this JavaScript promise issue?",
    content: "I'm trying to understand how to properly handle promises in JavaScript. When I try to chain multiple promises, I sometimes get unexpected results. Here's my code:\n\n```javascript\nfetch('/api/data')\n  .then(response => response.json())\n  .then(data => {\n    // process data\n  })\n  .catch(error => console.error('Error:', error));\n```\n\nCan someone explain the best practices for error handling in promise chains?",
    authorId: "user1",
    authorName: "Alex Johnson",
    authorAvatar: "https://i.pravatar.cc/150?u=alex",
    authorRole: "student",
    createdAt: "2025-04-28T15:32:00",
    tags: ["javascript", "promises", "async"],
    likes: 12,
    replies: [
      {
        id: "reply1",
        authorId: "user2",
        authorName: "Sarah Smith",
        authorAvatar: "https://i.pravatar.cc/150?u=sarah",
        authorRole: "instructor",
        content: "Great question, @Alex! When working with promises, it's important to understand the error propagation...\n\nFor your specific issue, try using async/await which makes error handling clearer:\n\n```javascript\nasync function fetchData() {\n  try {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    // process data\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}\n```",
        createdAt: "2025-04-28T16:15:00",
        likes: 8,
        hasLiked: true
      },
      {
        id: "reply2",
        authorId: "user3",
        authorName: "Mike Brown",
        authorAvatar: "https://i.pravatar.cc/150?u=mike",
        authorRole: "student",
        content: "I was struggling with the same issue! Thanks for the explanation @Sarah. One additional question - how would you handle multiple API calls that need to happen in sequence?",
        createdAt: "2025-04-28T17:30:00",
        likes: 3,
        mentionedUsers: [{ id: "user2", name: "Sarah Smith" }]
      }
    ],
    isResolved: true,
    isPinned: true,
    hasLiked: true
  },
  {
    id: "2",
    title: "React Hooks - useEffect dependency array",
    content: "I'm confused about the dependency array in `useEffect`. When should I include dependencies and when can I leave it empty?\n\n```jsx\nuseEffect(() => {\n  // some code here\n}, []); // <-- This empty array\n```\n\nWhat are the implications of using an empty array vs including specific dependencies?",
    authorId: "user3",
    authorName: "Mike Brown",
    authorAvatar: "https://i.pravatar.cc/150?u=mike",
    authorRole: "student",
    createdAt: "2025-04-29T10:45:00",
    tags: ["react", "hooks", "useeffect"],
    likes: 7,
    replies: [],
    isResolved: false,
    hasLiked: false,
    attachments: [
      {
        id: "att1",
        type: "image",
        url: "https://i.imgur.com/XqQZ2AS.png",
        name: "hooks-diagram.png"
      }
    ]
  },
  {
    id: "3",
    title: "CSS Grid vs Flexbox - When to use which?",
    content: "I'm building a responsive layout and I'm not sure whether to use CSS Grid or Flexbox. When is it better to use one over the other? Are there specific use cases where Grid is always better than Flexbox?",
    authorId: "user4",
    authorName: "Emily Chen",
    authorAvatar: "https://i.pravatar.cc/150?u=emily",
    authorRole: "student",
    createdAt: "2025-04-30T09:15:00",
    tags: ["css", "layout", "grid", "flexbox"],
    likes: 15,
    replies: [
      {
        id: "reply3",
        authorId: "user2",
        authorName: "Sarah Smith",
        authorAvatar: "https://i.pravatar.cc/150?u=sarah",
        authorRole: "instructor",
        content: "Great question Emily! \n\n**Flexbox** is one-dimensional, meaning it deals with either rows OR columns. It's perfect for:\n- Navigation menus\n- Aligning items in a single row/column\n- When you need to distribute space between items\n\n**Grid** is two-dimensional, handling rows AND columns simultaneously. Use it for:\n- Complex page layouts\n- Placing elements in a precise manner\n- When you need to align items both horizontally and vertically\n\nI've attached a helpful comparison image.",
        createdAt: "2025-04-30T10:30:00",
        likes: 12,
        attachments: [
          {
            id: "att2",
            type: "image",
            url: "https://i.imgur.com/DMOTgeh.png",
            name: "grid-vs-flexbox.png"
          }
        ]
      }
    ],
    isResolved: true,
    hasLiked: false
  }
];

interface DiscussionsProps extends CourseComponentProps {}

const Discussions: React.FC<DiscussionsProps> = ({ courseId }) => {
  const [activeTab, setActiveTab] = useState<"all" | "resolved" | "pinned" | "my-posts">("all");
  const [discussions, setDiscussions] = useState<DiscussionPost[]>(mockDiscussions);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Load discussions
  useEffect(() => {
    const loadDiscussions = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDiscussions(mockDiscussions);
      } catch (error) {
        console.error("Error loading discussions:", error);
        toast({
          title: "Error",
          description: "Failed to load discussions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDiscussions();
  }, [courseId, toast]);
  
  // Get all unique tags from discussions
  const allTags = Array.from(
    new Set(discussions.flatMap(d => d.tags))
  );
  
  // Filter discussions based on tab, search, and tags
  const getFilteredDiscussions = () => {
    let filtered = [...discussions];
    
    // Filter by tab
    if (activeTab === "resolved") {
      filtered = filtered.filter(d => d.isResolved);
    } else if (activeTab === "pinned") {
      filtered = filtered.filter(d => d.isPinned);
    } else if (activeTab === "my-posts") {
      filtered = filtered.filter(d => d.authorId === "user3"); // Mock current user ID
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.title.toLowerCase().includes(query) || 
        d.content.toLowerCase().includes(query) ||
        d.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(d => 
        selectedTags.some(tag => d.tags.includes(tag))
      );
    }
    
    return filtered;
  };
  
  // Handle post creation
  const handleCreatePost = async (postData: {
    title: string;
    content: string;
    tags: string[];
    attachments?: File[];
  }) => {
    try {
      console.log("Creating new post:", postData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new discussion object
      const newDiscussion: DiscussionPost = {
        id: `new-${Date.now()}`,
        title: postData.title,
        content: postData.content,
        authorId: "user3", // Mock current user ID
        authorName: "Mike Brown", // Mock current user name
        authorAvatar: "https://i.pravatar.cc/150?u=mike", // Mock current user avatar
        authorRole: "student",
        createdAt: new Date().toISOString(),
        tags: postData.tags,
        likes: 0,
        replies: [],
        isResolved: false,
        isPinned: false,
        hasLiked: false,
        attachments: postData.attachments ? postData.attachments.map((file, index) => ({
          id: `att-new-${index}`,
          type: file.type.startsWith('image/') ? 'image' : 'document',
          url: URL.createObjectURL(file),
          name: file.name
        })) : undefined
      };
      
      // Add the new discussion to the list
      setDiscussions(prev => [newDiscussion, ...prev]);
      
      // Hide the form
      setShowNewPostForm(false);
      
      toast({
        title: "Discussion Posted",
        description: "Your discussion has been published successfully.",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create discussion. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle reply
  const handleReply = async (postId: string, content: string, attachments?: File[]) => {
    try {
      console.log(`Reply to post ${postId}:`, content);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new reply
      const newReply: ReplyComment = {
        id: `reply-new-${Date.now()}`,
        authorId: "user3", // Mock current user ID
        authorName: "Mike Brown", // Mock current user name
        authorAvatar: "https://i.pravatar.cc/150?u=mike", // Mock current user avatar
        authorRole: "student",
        content,
        createdAt: new Date().toISOString(),
        likes: 0,
        hasLiked: false,
        attachments: attachments ? attachments.map((file, index) => ({
          id: `att-reply-${index}`,
          type: file.type.startsWith('image/') ? 'image' : 'document',
          url: URL.createObjectURL(file),
          name: file.name
        })) : undefined
      };
      
      // Add the reply to the discussion
      setDiscussions(prev => prev.map(d => 
        d.id === postId 
          ? { ...d, replies: [...d.replies, newReply] } 
          : d
      ));
      
      toast({
        title: "Reply Posted",
        description: "Your reply has been published successfully.",
      });
    } catch (error) {
      console.error("Error posting reply:", error);
      toast({
        title: "Error",
        description: "Failed to post reply. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  // Handle like
  const handleLike = async (postId: string, isReply = false, replyId?: string) => {
    try {
      console.log(`Like ${isReply ? 'reply' : 'post'} ${isReply ? replyId : postId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isReply && replyId) {
        setDiscussions(prev => prev.map(d => 
          d.id === postId 
            ? {
                ...d,
                replies: d.replies.map(r => 
                  r.id === replyId 
                    ? { 
                        ...r, 
                        hasLiked: !r.hasLiked, 
                        likes: r.hasLiked ? r.likes - 1 : r.likes + 1 
                      } 
                    : r
                )
              } 
            : d
        ));
      } else {
        setDiscussions(prev => prev.map(d => 
          d.id === postId 
            ? { 
                ...d, 
                hasLiked: !d.hasLiked, 
                likes: d.hasLiked ? d.likes - 1 : d.likes + 1 
              } 
            : d
        ));
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast({
        title: "Error",
        description: "Failed to like post. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle resolve
  const handleResolve = async (postId: string) => {
    try {
      console.log(`Resolve post ${postId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setDiscussions(prev => prev.map(d => 
        d.id === postId 
          ? { ...d, isResolved: true } 
          : d
      ));
      
      toast({
        title: "Discussion Resolved",
        description: "This discussion has been marked as resolved.",
      });
    } catch (error) {
      console.error("Error resolving post:", error);
      toast({
        title: "Error",
        description: "Failed to resolve discussion. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle pin
  const handlePin = async (postId: string) => {
    try {
      console.log(`Pin post ${postId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setDiscussions(prev => prev.map(d => 
        d.id === postId 
          ? { ...d, isPinned: !d.isPinned } 
          : d
      ));
      
      toast({
        title: discussions.find(d => d.id === postId)?.isPinned 
          ? "Discussion Unpinned" 
          : "Discussion Pinned",
        description: discussions.find(d => d.id === postId)?.isPinned 
          ? "This discussion is no longer pinned." 
          : "This discussion has been pinned to the top.",
      });
    } catch (error) {
      console.error("Error pinning post:", error);
      toast({
        title: "Error",
        description: "Failed to pin discussion. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }
  
  const filteredDiscussions = getFilteredDiscussions();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Discussions</h1>
          <p className="text-muted-foreground">Engage in course discussions and help each other learn</p>
        </div>
        
        <Button onClick={() => setShowNewPostForm(prev => !prev)}>
          {showNewPostForm ? 'Cancel' : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              New Discussion
            </>
          )}
        </Button>
      </div>
      
      {showNewPostForm && (
        <PostDiscussion onSubmit={handleCreatePost} />
      )}
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1 h-9">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Sort</span>
              </Button>
              
              <Button variant="outline" size="sm" className="gap-1 h-9">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">All Discussions</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="pinned">Pinned</TabsTrigger>
              <TabsTrigger value="my-posts">My Posts</TabsTrigger>
            </TabsList>
            
            <div className="mt-4 space-y-4">
              {filteredDiscussions.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center text-center">
                    <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium mb-1">No discussions found</h3>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      {searchQuery || selectedTags.length > 0 
                        ? "Try adjusting your search or filters to find what you're looking for." 
                        : activeTab === "my-posts"
                        ? "You haven't started any discussions yet."
                        : activeTab === "resolved"
                        ? "There are no resolved discussions yet."
                        : activeTab === "pinned"
                        ? "There are no pinned discussions yet."
                        : "Be the first to start a discussion in this course!"}
                    </p>
                    
                    {(searchQuery || selectedTags.length > 0) && (
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedTags([]);
                        }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                filteredDiscussions.map(discussion => (
                  <DiscussionThread 
                    key={discussion.id}
                    post={discussion}
                    onLike={handleLike}
                    onReply={handleReply}
                    onResolve={handleResolve}
                    onPin={handlePin}
                    currentUserId="user3" // Mock current user ID
                  />
                ))
              )}
            </div>
          </Tabs>
        </div>
        
        <div className="w-full md:w-1/4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Tags</CardTitle>
              <CardDescription>Filter discussions by topic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                    {selectedTags.includes(tag) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 p-0 hover:bg-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTag(tag);
                        }}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    )}
                  </Badge>
                ))}
                
                {selectedTags.length > 0 && (
                  <Button 
                    variant="link"
                    size="sm"
                    className="text-xs h-6 px-2 py-0"
                    onClick={() => setSelectedTags([])}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Discussion Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>Be respectful and considerate of others.</p>
              <p>Stay on topic and keep posts relevant to the course.</p>
              <p>Use clear titles and tags to categorize your discussions.</p>
              <p>Format code examples properly for readability.</p>
              <p>Check if a similar question has been asked before posting.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span>Posts</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Replies</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Liked</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Resolved threads</span>
                <span className="font-medium">2</span>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-2">View Your Posts</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Discussions;
