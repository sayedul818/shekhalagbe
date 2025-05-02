
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageSquare, MessageCircle, Plus, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { fetchCourseDiscussions } from "@/lib/course-data";

const CourseDiscussion = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDiscussions = async () => {
      if (!courseId) return;
      
      try {
        setLoading(true);
        const data = await fetchCourseDiscussions(courseId);
        setThreads(data.threads);
      } catch (err) {
        console.error("Error loading discussions data:", err);
        setError("Failed to load discussions");
        toast({
          title: "Error",
          description: "Failed to load course discussions",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadDiscussions();
  }, [courseId, toast]);

  // Auto-scroll to bottom of messages when active thread changes or new reply
  useEffect(() => {
    if (messageEndRef.current && activeThreadId) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeThreadId, threads]);

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setReplyContent("");
  };

  const handleBackToThreads = () => {
    setActiveThreadId(null);
  };

  const handleCreateThread = () => {
    if (!newThreadTitle.trim() || !newThreadContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }

    const newThread = {
      id: `t${threads.length + 1}`,
      title: newThreadTitle,
      content: newThreadContent,
      author: "You", // In a real app, this would be the current user
      avatarUrl: "https://i.pravatar.cc/150?u=you",
      datePosted: new Date().toISOString(),
      replies: []
    };

    setThreads([newThread, ...threads]);
    setNewThreadTitle("");
    setNewThreadContent("");
    setShowNewThreadForm(false);
    
    toast({
      title: "Thread Created",
      description: "Your discussion thread has been posted",
    });
  };

  const handleSubmitReply = () => {
    if (!replyContent.trim() || !activeThreadId) {
      return;
    }

    const newReply = {
      id: `r${new Date().getTime()}`,
      content: replyContent,
      author: "You", // In a real app, this would be the current user
      avatarUrl: "https://i.pravatar.cc/150?u=you",
      datePosted: new Date().toISOString()
    };

    setThreads(threads.map(thread => 
      thread.id === activeThreadId 
        ? { ...thread, replies: [...thread.replies, newReply] } 
        : thread
    ));

    setReplyContent("");
    
    toast({
      title: "Reply Posted",
      description: "Your reply has been added to the discussion",
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
  };

  // Get active thread
  const activeThread = activeThreadId 
    ? threads.find(thread => thread.id === activeThreadId) 
    : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (error && threads.length === 0) {
    return (
      <div className="container mx-auto p-4 max-w-5xl">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate(-1)}>
              Return to Course
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {!activeThread ? (
        <div>
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
          
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2 flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-primary" />
                Discussion Forum
              </h1>
              <p className="text-muted-foreground">
                Ask questions and participate in course discussions
              </p>
            </div>
            
            <Button onClick={() => setShowNewThreadForm(!showNewThreadForm)}>
              <Plus className="h-4 w-4 mr-2" />
              New Thread
            </Button>
          </div>
          
          {showNewThreadForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Create New Discussion Thread</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={newThreadTitle}
                    onChange={(e) => setNewThreadTitle(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Discussion topic or question"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <textarea
                    value={newThreadContent}
                    onChange={(e) => setNewThreadContent(e.target.value)}
                    className="w-full min-h-[150px] p-2 border rounded-md"
                    placeholder="Describe your question or start the discussion..."
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewThreadForm(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateThread}>
                  Post Thread
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="space-y-4">
            {threads.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Discussions Yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Be the first to start a discussion in this course
                  </p>
                  <Button onClick={() => setShowNewThreadForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Start a Discussion
                  </Button>
                </CardContent>
              </Card>
            ) : (
              threads.map((thread) => (
                <Card 
                  key={thread.id} 
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => handleSelectThread(thread.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-start justify-between">
                      <span className="flex-1">{thread.title}</span>
                      <span className="text-xs text-muted-foreground flex items-center whitespace-nowrap ml-2">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        {thread.replies.length}
                      </span>
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                          <img 
                            src={thread.avatarUrl} 
                            alt={thread.author} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span>{thread.author}</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(thread.datePosted)}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <p className="text-sm line-clamp-2">
                      {thread.content}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="pt-2 text-sm">
                    <div className="flex justify-between w-full items-center">
                      <span className="text-primary">
                        {thread.replies.length === 0
                          ? "No replies yet"
                          : thread.replies.length === 1
                          ? "1 reply"
                          : `${thread.replies.length} replies`}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectThread(thread.id);
                        }}
                      >
                        {thread.replies.length > 0 ? "View Discussion" : "Be the first to reply"}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      ) : (
        <div>
          <Button variant="outline" onClick={handleBackToThreads} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discussions
          </Button>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">{activeThread.title}</CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                    <img 
                      src={activeThread.avatarUrl} 
                      alt={activeThread.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{activeThread.author}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(activeThread.datePosted)}
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="whitespace-pre-line mb-6">
                {activeThread.content}
              </div>
              
              <div className="text-sm font-medium mb-4">
                {activeThread.replies.length === 0
                  ? "No replies yet"
                  : activeThread.replies.length === 1
                  ? "1 reply"
                  : `${activeThread.replies.length} replies`}
              </div>
              
              <div className="space-y-6">
                {activeThread.replies.map((reply) => (
                  <div key={reply.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img 
                          src={reply.avatarUrl} 
                          alt={reply.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{reply.author}</span>
                          {reply.isInstructor && (
                            <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                              Instructor
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(reply.datePosted)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="whitespace-pre-line pl-11">
                      {reply.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <div ref={messageEndRef} />
            </CardContent>
            
            <CardFooter>
              <div className="w-full space-y-4">
                <h3 className="font-medium">Add Your Reply</h3>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full min-h-[120px] p-3 border rounded-md"
                  placeholder="Type your reply here..."
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSubmitReply}
                    disabled={!replyContent.trim()}
                  >
                    Post Reply
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CourseDiscussion;
