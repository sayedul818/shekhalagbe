
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  Plus, 
  PlusCircle, 
  MessageCircle, 
  AlertCircle,
  Reply, 
  Heart, 
  Flag,
  Search,
  Filter,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  flagged: boolean;
}

interface Discussion {
  id: string;
  title: string;
  moduleId?: string;
  moduleName?: string;
  lessonId?: string;
  lessonName?: string;
  createdAt: string;
  lastActivity: string;
  status: "active" | "closed" | "pinned";
  commentCount: number;
  studentCount: number;
  unreadCount?: number;
  recentComments: Comment[];
}

const initialDiscussions: Discussion[] = [
  {
    id: "disc-1",
    title: "Questions about JavaScript Objects",
    moduleId: "section-2",
    moduleName: "Functions and Objects",
    lessonId: "item-2-1",
    lessonName: "Functions in JavaScript",
    createdAt: "2023-04-12",
    lastActivity: "2 hours ago",
    status: "active",
    commentCount: 23,
    studentCount: 15,
    unreadCount: 7,
    recentComments: [
      {
        id: "comment-1",
        authorName: "Maria Garcia",
        authorAvatar: "M",
        content: "Can someone explain the difference between object methods and regular functions?",
        timestamp: "2 hours ago",
        likes: 5,
        replies: 3,
        flagged: false
      },
      {
        id: "comment-2",
        authorName: "John Smith",
        authorAvatar: "J",
        content: "I'm having trouble with understanding closures. Can you provide more examples?",
        timestamp: "6 hours ago",
        likes: 8,
        replies: 4,
        flagged: false
      }
    ]
  },
  {
    id: "disc-2",
    title: "Tips for the Final Project",
    createdAt: "2023-04-25",
    lastActivity: "1 day ago",
    status: "pinned",
    commentCount: 45,
    studentCount: 28,
    recentComments: [
      {
        id: "comment-3",
        authorName: "Robert Johnson",
        authorAvatar: "R",
        content: "I've created a GitHub repo for project examples. Here's the link: [removed for security]",
        timestamp: "1 day ago",
        likes: 15,
        replies: 2,
        flagged: false
      }
    ]
  },
  {
    id: "disc-3",
    title: "Troubleshooting DOM Manipulation Exercise",
    moduleId: "section-2",
    moduleName: "Functions and Objects",
    lessonId: "item-2-2",
    lessonName: "Working with Objects",
    createdAt: "2023-04-28",
    lastActivity: "3 days ago",
    status: "active",
    commentCount: 18,
    studentCount: 10,
    unreadCount: 2,
    recentComments: [
      {
        id: "comment-4",
        authorName: "Sarah Williams",
        authorAvatar: "S",
        content: "I'm getting an error when trying to update the form fields. Can anyone help?",
        timestamp: "3 days ago",
        likes: 2,
        replies: 7,
        flagged: false
      },
      {
        id: "comment-5",
        authorName: "David Chen",
        authorAvatar: "D",
        content: "This comment contains inappropriate content and should be moderated.",
        timestamp: "4 days ago",
        likes: 0,
        replies: 1,
        flagged: true
      }
    ]
  }
];

export default function DiscussionManager() {
  const [discussions, setDiscussions] = useState<Discussion[]>(initialDiscussions);
  const [expandedDiscussion, setExpandedDiscussion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const handleCreateDiscussion = () => {
    const newDiscussion: Discussion = {
      id: `disc-${discussions.length + 1}`,
      title: "New Discussion Topic",
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: "Just now",
      status: "active",
      commentCount: 0,
      studentCount: 0,
      recentComments: []
    };
    setDiscussions([...discussions, newDiscussion]);
    setExpandedDiscussion(newDiscussion.id);
  };
  
  const handleRemoveFlag = (discussionId: string, commentId: string) => {
    setDiscussions(prevDiscussions => 
      prevDiscussions.map(discussion => {
        if (discussion.id !== discussionId) return discussion;
        
        return {
          ...discussion,
          recentComments: discussion.recentComments.map(comment => {
            if (comment.id !== commentId) return comment;
            return { ...comment, flagged: false };
          })
        };
      })
    );
  };
  
  const handleDeleteComment = (discussionId: string, commentId: string) => {
    setDiscussions(prevDiscussions => 
      prevDiscussions.map(discussion => {
        if (discussion.id !== discussionId) return discussion;
        
        return {
          ...discussion,
          recentComments: discussion.recentComments.filter(comment => comment.id !== commentId),
          commentCount: discussion.commentCount - 1
        };
      })
    );
  };
  
  const handleToggleStatus = (discussionId: string, newStatus: "active" | "closed" | "pinned") => {
    setDiscussions(prevDiscussions => 
      prevDiscussions.map(discussion => {
        if (discussion.id !== discussionId) return discussion;
        return { ...discussion, status: newStatus };
      })
    );
  };
  
  const getFilteredDiscussions = () => {
    let filtered = discussions;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(discussion => 
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.moduleName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.lessonName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(discussion => discussion.status === filterStatus);
    }
    
    return filtered;
  };
  
  const filteredDiscussions = getFilteredDiscussions();
  
  const getFlaggedComments = () => {
    const flagged: {discussionId: string, discussion: Discussion, comment: Comment}[] = [];
    
    discussions.forEach(discussion => {
      discussion.recentComments.forEach(comment => {
        if (comment.flagged) {
          flagged.push({
            discussionId: discussion.id,
            discussion,
            comment
          });
        }
      });
    });
    
    return flagged;
  };
  
  const flaggedComments = getFlaggedComments();
  const hasUnread = discussions.some(d => d.unreadCount && d.unreadCount > 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center">
              Discussion Manager
              {hasUnread && (
                <Badge className="ml-2 bg-red-100 text-red-800">New</Badge>
              )}
            </CardTitle>
            <CardDescription>Manage course discussions and student interactions</CardDescription>
          </div>
          <Button onClick={handleCreateDiscussion}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Start Discussion
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search discussions..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex">
            <Button variant="outline" size="sm" className="mr-2">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <select 
              className="px-3 py-2 border rounded-md text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="pinned">Pinned</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        
        {flaggedComments.length > 0 && (
          <div className="mb-6 border border-red-200 bg-red-50 rounded-md p-4">
            <h3 className="font-medium flex items-center text-red-800 mb-2">
              <AlertCircle className="h-5 w-5 mr-2" />
              Flagged Comments ({flaggedComments.length})
            </h3>
            <div className="space-y-4">
              {flaggedComments.map(({discussionId, discussion, comment}) => (
                <div key={comment.id} className="bg-white border rounded-md p-3">
                  <div className="text-sm text-muted-foreground mb-1">
                    From: {discussion.title}
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                      {comment.authorAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{comment.authorName}</p>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => handleRemoveFlag(discussionId, comment.id)}>
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteComment(discussionId, comment.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {filteredDiscussions.length > 0 ? (
            filteredDiscussions.map(discussion => (
              <div key={discussion.id} className="border rounded-md overflow-hidden">
                <div 
                  className={`p-4 ${discussion.status === "pinned" ? "bg-blue-50" : "bg-gray-50"} cursor-pointer`}
                  onClick={() => setExpandedDiscussion(expandedDiscussion === discussion.id ? null : discussion.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 ${discussion.status === "pinned" ? "text-blue-500" : discussion.status === "closed" ? "text-gray-500" : "text-primary"}`}>
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{discussion.title}</h3>
                          {discussion.unreadCount && discussion.unreadCount > 0 && (
                            <Badge className="ml-2 bg-red-100 text-red-800">{discussion.unreadCount} new</Badge>
                          )}
                        </div>
                        {discussion.moduleName && (
                          <p className="text-sm text-muted-foreground">
                            {discussion.moduleName} {discussion.lessonName ? `› ${discussion.lessonName}` : ""}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge className={
                        discussion.status === "pinned" ? "bg-blue-100 text-blue-800" :
                        discussion.status === "closed" ? "bg-gray-100 text-gray-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {discussion.status === "pinned" ? "Pinned" : 
                         discussion.status === "closed" ? "Closed" : "Active"}
                      </Badge>
                      <div className="hidden md:flex items-center space-x-4">
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {discussion.commentCount}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {discussion.studentCount}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {discussion.lastActivity}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm">
                        {expandedDiscussion === discussion.id ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {expandedDiscussion === discussion.id && (
                  <div className="p-4 border-t">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <Button size="sm" variant={discussion.status === "active" ? "default" : "outline"} onClick={() => handleToggleStatus(discussion.id, "active")}>
                        Mark Active
                      </Button>
                      <Button size="sm" variant={discussion.status === "pinned" ? "default" : "outline"} onClick={() => handleToggleStatus(discussion.id, "pinned")}>
                        Pin Discussion
                      </Button>
                      <Button size="sm" variant={discussion.status === "closed" ? "default" : "outline"} onClick={() => handleToggleStatus(discussion.id, "closed")}>
                        Close Discussion
                      </Button>
                      <Button size="sm" variant="outline">
                        View All Comments
                      </Button>
                    </div>
                    
                    <h4 className="font-medium mb-3">Recent Comments</h4>
                    {discussion.recentComments.length > 0 ? (
                      <div className="space-y-4">
                        {discussion.recentComments.map(comment => (
                          <div key={comment.id} className={`border ${comment.flagged ? "border-red-300 bg-red-50" : ""} rounded-md p-3`}>
                            <div className="flex items-start">
                              <div className="bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                                {comment.authorAvatar}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <p className="font-medium">{comment.authorName}</p>
                                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm mt-1">{comment.content}</p>
                                <div className="flex justify-between mt-2">
                                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                    <span className="flex items-center">
                                      <Heart className="h-3 w-3 mr-1" />
                                      {comment.likes}
                                    </span>
                                    <span className="flex items-center">
                                      <Reply className="h-3 w-3 mr-1" />
                                      {comment.replies}
                                    </span>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="ghost">
                                      <Reply className="h-3 w-3 mr-1" />
                                      Reply
                                    </Button>
                                    {comment.flagged ? (
                                      <div className="flex">
                                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleRemoveFlag(discussion.id, comment.id)}>
                                          Approve
                                        </Button>
                                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDeleteComment(discussion.id, comment.id)}>
                                          Delete
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => {
                                        setDiscussions(prevDiscussions => 
                                          prevDiscussions.map(d => {
                                            if (d.id !== discussion.id) return d;
                                            
                                            return {
                                              ...d,
                                              recentComments: d.recentComments.map(c => {
                                                if (c.id !== comment.id) return c;
                                                return { ...c, flagged: true };
                                              })
                                            };
                                          })
                                        );
                                      }}>
                                        <Flag className="h-3 w-3 mr-1" />
                                        Flag
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No comments in this discussion yet.</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                        >
                          <PlusCircle className="h-4 w-4 mr-1" />
                          Add Comment
                        </Button>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <Button size="sm" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Teacher Comment
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 border rounded-md">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Discussions Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? "No discussions match your search query."
                  : "Start a new discussion topic to engage with students."}
              </p>
              {!searchQuery && (
                <Button onClick={handleCreateDiscussion}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Discussion
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
