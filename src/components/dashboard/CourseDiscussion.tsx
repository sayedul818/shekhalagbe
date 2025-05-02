import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchCourseDiscussions } from "@/lib/course-data";
import { useToast } from "@/hooks/use-toast";
import { CourseComponentProps } from "@/types";

const CourseDiscussion = ({ courseId }: CourseComponentProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [discussions, setDiscussions] = useState([]);
  const [newPost, setNewPost] = useState("");
  
  useEffect(() => {
    const loadDiscussions = async () => {
      if (!courseId) return;
      
      try {
        setIsLoading(true);
        const data = await fetchCourseDiscussions(courseId);
        setDiscussions(data.discussions || []);
      } catch (error) {
        console.error("Error loading discussions:", error);
        toast({
          title: "Error",
          description: "Failed to load course discussions",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDiscussions();
  }, [courseId, toast]);
  
  const handlePostDiscussion = () => {
    if (!newPost.trim()) return;
    
    // In a real app, this would send the post to an API
    const newDiscussion = {
      id: `disc-${Date.now()}`,
      author: "Current User",
      authorRole: "student",
      avatar: "/avatars/user.png",
      content: newPost,
      date: new Date().toISOString(),
      replies: []
    };
    
    setDiscussions([newDiscussion, ...discussions]);
    setNewPost("");
    
    toast({
      title: "Success",
      description: "Your post has been added to the discussion",
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Course Discussion</h2>
      <p className="text-muted-foreground">Engage with your peers and instructors</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Start a Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              placeholder="Share your thoughts, questions, or insights..." 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={handlePostDiscussion}>Post to Discussion</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {discussions.length > 0 ? (
          discussions.map((discussion) => (
            <Card key={discussion.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {discussion.avatar ? (
                      <img src={discussion.avatar} alt={discussion.author} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-lg font-semibold">{discussion.author.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{discussion.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {discussion.authorRole === "instructor" ? "Instructor" : "Student"} • 
                          {new Date(discussion.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">{discussion.content}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <Button variant="ghost" size="sm">Reply</Button>
                      <Button variant="ghost" size="sm">Like</Button>
                    </div>
                    
                    {discussion.replies && discussion.replies.length > 0 && (
                      <div className="mt-4 space-y-4 pl-6 border-l">
                        {discussion.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-4">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                              {reply.avatar ? (
                                <img src={reply.avatar} alt={reply.author} className="h-full w-full object-cover" />
                              ) : (
                                <span className="text-sm font-semibold">{reply.author.charAt(0)}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{reply.author}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {reply.authorRole === "instructor" ? "Instructor" : "Student"} • 
                                    {new Date(reply.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-sm">{reply.content}</p>
                              </div>
                              <div className="mt-2 flex items-center gap-4">
                                <Button variant="ghost" size="sm">Like</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-6 text-center">
              <p className="text-muted-foreground">No discussions yet. Be the first to start a conversation!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CourseDiscussion;
