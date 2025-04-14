
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardList, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  LockIcon, 
  Award
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ExamsList = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState("upcoming");
  
  // Mock exams data
  const upcomingExams = [
    { 
      id: "1", 
      title: "JavaScript Fundamentals - Final Exam", 
      course: "JavaScript Fundamentals",
      startDate: "2025-04-20T10:00:00Z",
      endDate: "2025-04-20T12:00:00Z",
      timeLimit: 120, // minutes
      questions: 50,
      status: "scheduled", // scheduled, active, completed
    },
    { 
      id: "2", 
      title: "UI/UX Design Principles", 
      course: "UI/UX Design Fundamentals",
      startDate: "2025-04-25T14:00:00Z",
      endDate: "2025-04-25T15:30:00Z",
      timeLimit: 90, // minutes
      questions: 40,
      status: "scheduled",
    },
  ];
  
  const completedExams = [
    { 
      id: "3", 
      title: "HTML & CSS Basics - Final Assessment", 
      course: "HTML & CSS Basics",
      completedDate: "2025-03-15T15:45:00Z",
      score: 92,
      maxScore: 100,
      timeTaken: 85, // minutes
      rank: 3,
      totalParticipants: 124,
    },
    { 
      id: "4", 
      title: "Web Development Introduction", 
      course: "Introduction to Web Development",
      completedDate: "2025-02-20T11:30:00Z",
      score: 85,
      maxScore: 100,
      timeTaken: 65, // minutes
      rank: 12,
      totalParticipants: 156,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getTimeRemaining = (dateString: string) => {
    const targetDate = new Date(dateString);
    const now = new Date();
    const diffMs = targetDate.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Starting now';
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ${diffHours} hr${diffHours > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ${diffMinutes} min${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {user?.role === "teacher" ? "Manage Exams" : "My Exams"}
        </h1>
        <p className="text-muted-foreground">
          {user?.role === "teacher" 
            ? "Create and manage exams for your courses" 
            : "View upcoming and completed exams"
          }
        </p>
      </div>

      {user?.role === "teacher" && (
        <Button className="mb-4">
          <ClipboardList className="h-4 w-4 mr-2" />
          Create New Exam
        </Button>
      )}

      <Tabs defaultValue="upcoming" value={tabValue} onValueChange={setTabValue}>
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming
            <span className="ml-1 text-xs bg-primary text-white rounded-full px-1.5 inline-flex justify-center items-center">
              {upcomingExams.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            <span className="ml-1 text-xs bg-primary text-white rounded-full px-1.5 inline-flex justify-center items-center">
              {completedExams.length}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingExams.length > 0 ? (
            upcomingExams.map((exam) => (
              <Card key={exam.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{exam.title}</CardTitle>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Upcoming</Badge>
                  </div>
                  <CardDescription>{exam.course}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <div className="flex items-start space-x-2">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Exam Date</p>
                          <p className="text-sm text-muted-foreground">{formatDate(exam.startDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Duration</p>
                          <p className="text-sm text-muted-foreground">{exam.timeLimit} minutes</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <ClipboardList className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Questions</p>
                          <p className="text-sm text-muted-foreground">{exam.questions} questions</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                        <span className="text-sm">
                          Starts in <span className="font-medium">{getTimeRemaining(exam.startDate)}</span>
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {user?.role === "teacher" ? (
                          <>
                            <Button variant="outline">Edit Exam</Button>
                            <Button>View Details</Button>
                          </>
                        ) : (
                          <>
                            <Button disabled={true} variant="outline">
                              <LockIcon className="h-4 w-4 mr-2" />
                              Not Started Yet
                            </Button>
                            <Button>Set Reminder</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 border rounded-md bg-gray-50">
              <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No upcoming exams</h3>
              <p className="text-muted-foreground mb-4">
                {user?.role === "teacher" 
                  ? "Create an exam for your courses" 
                  : "You don't have any upcoming exams scheduled"
                }
              </p>
              {user?.role === "teacher" && (
                <Button>Create New Exam</Button>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedExams.length > 0 ? (
            completedExams.map((exam) => (
              <Card key={exam.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{exam.title}</CardTitle>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                  </div>
                  <CardDescription>{exam.course}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                      <div className="flex items-start space-x-2">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Taken On</p>
                          <p className="text-sm text-muted-foreground">{formatDate(exam.completedDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Score</p>
                          <p className="text-sm text-muted-foreground">{exam.score}/{exam.maxScore} ({Math.round(exam.score / exam.maxScore * 100)}%)</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Time Taken</p>
                          <p className="text-sm text-muted-foreground">{exam.timeTaken} minutes</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Award className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Rank</p>
                          <p className="text-sm text-muted-foreground">
                            {exam.rank}/{exam.totalParticipants} 
                            <span className="text-xs"> (Top {Math.round(exam.rank / exam.totalParticipants * 100)}%)</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center">
                        {Math.round(exam.score / exam.maxScore * 100) >= 70 ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">Passed</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-500">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">Failed</span>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {user?.role === "teacher" ? (
                          <>
                            <Button variant="outline">View Results</Button>
                            <Button>View Leaderboard</Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline">View Leaderboard</Button>
                            <Button>Review Answers</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 border rounded-md bg-gray-50">
              <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No completed exams</h3>
              <p className="text-muted-foreground mb-4">
                {user?.role === "teacher" 
                  ? "You haven't published any exams yet" 
                  : "You haven't taken any exams yet"
                }
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamsList;
