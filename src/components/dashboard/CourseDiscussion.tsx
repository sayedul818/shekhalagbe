
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
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
        // Use the threads property from the API response
        setDiscussions(data.threads || []);
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

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    // In a real app, this would send the post to an API
    toast({
      title: "Post submitted",
      description: "Your discussion post has been submitted.",
    });
    setNewPost("");
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
      <Card>
        <CardHeader>
          <CardTitle>Discussion Forum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* New post form */}
          <form onSubmit={handleSubmitPost} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="new-post" className="text-sm font-medium">Start a new discussion</label>
              <Input
                id="new-post"
                placeholder="What would you like to discuss?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={!newPost.trim()}>
              Post
            </Button>
          </form>

          {/* Discussions list */}
          {discussions.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No discussions yet. Start the first one!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {discussions.map((thread) => (
                <div key={thread.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={thread.avatarUrl} alt={thread.author} />
                      <AvatarFallback>{thread.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{thread.author}</h3>
                        <span className="text-xs text-muted-foreground">{new Date(thread.datePosted).toLocaleDateString()}</span>
                      </div>
                      <h4 className="font-semibold">{thread.title}</h4>
                      <p className="text-sm">{thread.content}</p>
                    </div>
                  </div>

                  {/* Replies */}
                  {thread.replies && thread.replies.length > 0 && (
                    <div className="pl-8 space-y-4 border-l">
                      {thread.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.avatarUrl} alt={reply.author} />
                            <AvatarFallback>{reply.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1 flex-1">
                            <div className="flex justify-between">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{reply.author}</h3>
                                {reply.isInstructor && <Badge variant="outline">Instructor</Badge>}
                              </div>
                              <span className="text-xs text-muted-foreground">{new Date(reply.datePosted).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply form - simplified for this example */}
                  <div className="flex gap-2">
                    <Input placeholder="Write a reply..." />
                    <Button size="sm">Reply</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDiscussion;
