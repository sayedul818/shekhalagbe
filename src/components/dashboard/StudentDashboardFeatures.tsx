import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Calendar,
  Video,
  FileText,
  FileQuestion,
  Award,
  CheckCircle,
  BarChart2,
  MessageSquare,
  Activity,
  BookmarkPlus,
  PenTool,
  Users,
  ArrowLeft,
} from "lucide-react";
import CourseCurriculum from "./courseCurriculam";
import CourseQuiz from "./CourseQuiz";
import CourseAssignment from "./courseAssignment";
import CourseDiscussion from "./CourseDiscussion";
import CourseNotes from "./CourseNotes";
import TakeExam from "./TakeExam";

interface StudentDashboardFeaturesProps {
  courseId: string;
  onBack: () => void;
}

const StudentDashboardFeatures = ({ courseId, onBack }: StudentDashboardFeaturesProps) => {
  const [activeTab, setActiveTab] = useState("curriculum");
  
  // Mock course data - in real app would come from API
  const courseData = {
    id: courseId,
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript programming language",
    instructor: "Sarah Johnson",
    thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    progress: 45,
    lastAccessed: "2 days ago",
    completedLessons: 9,
    totalLessons: 20,
    curriculum: [
      {
        id: "m1",
        title: "Getting Started with JavaScript",
        lessons: [
          { id: "l1", title: "Introduction to JavaScript", duration: "10:30", type: "video", completed: true },
          { id: "l2", title: "Setting Up Your Environment", duration: "12:45", type: "video", completed: true },
          { id: "l3", title: "Basic Syntax Quiz", duration: "15 mins", type: "quiz", completed: false },
        ]
      },
      {
        id: "m2",
        title: "JavaScript Fundamentals",
        lessons: [
          { id: "l4", title: "Variables and Data Types", duration: "15:20", type: "video", completed: false },
          { id: "l5", title: "Operators and Expressions", duration: "18:10", type: "video", completed: false },
          { id: "l6", title: "Control Flow", duration: "20:45", type: "video", completed: false },
        ]
      }
    ],
    assignments: [
      { id: "a1", title: "JavaScript Basics Assignment", dueDate: "2025-05-10", status: "pending", score: null },
      { id: "a2", title: "Building a Simple App", dueDate: "2025-05-20", status: "completed", score: 85 }
    ],
    quizzes: [
      { id: "q1", title: "JavaScript Syntax Quiz", questions: 10, timeLimit: 15, status: "completed", score: 80 },
      { id: "q2", title: "Functions & Objects Quiz", questions: 15, timeLimit: 20, status: "pending" }
    ],
    discussions: [
      { id: "d1", title: "Help with JavaScript Arrays", replies: 5, lastActive: "1 day ago" },
      { id: "d2", title: "Understanding Callbacks", replies: 8, lastActive: "3 days ago" }
    ],
    notes: [
      { id: "n1", title: "Important JavaScript Concepts", content: "Remember to check for undefined values...", date: "2025-04-15" }
    ],
    metrics: {
      timeSpent: "12h 30m",
      avgQuizScore: 82,
      completionRate: "45%",
      activityStreak: 4
    }
  };

  const [selectedLesson, setSelectedLesson] = useState(null);

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleBackToLessons = () => {
    setSelectedLesson(null);
  };

  const renderLessonContent = () => {
    if (!selectedLesson) return null;

    const LessonIcon = () => {
      switch (selectedLesson.type) {
        case 'video':
          return <Video className="h-12 w-12 text-primary" />;
        case 'quiz':
          return <FileQuestion className="h-12 w-12 text-primary" />;
        default:
          return <FileText className="h-12 w-12 text-primary" />;
      }
    };

    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={handleBackToLessons} size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to lessons
        </Button>
        
        <div className="bg-muted p-6 rounded-lg">
          <div className="flex flex-col items-center mb-6">
            <LessonIcon />
            <h3 className="text-xl font-semibold mt-2">{selectedLesson.title}</h3>
            <p className="text-muted-foreground">{selectedLesson.duration}</p>
          </div>
          
          {selectedLesson.type === 'video' ? (
            <div className="aspect-video bg-black/5 rounded-md flex items-center justify-center border">
              <div className="text-center">
                <Video className="h-16 w-16 mx-auto mb-4 text-primary/60" />
                <p className="text-lg font-medium">Video Player</p>
                <p className="text-muted-foreground">This is where the video would play</p>
              </div>
            </div>
          ) : selectedLesson.type === 'quiz' ? (
            <div className="space-y-6 p-4 border rounded-md">
              <div className="text-center mb-8">
                <FileQuestion className="h-16 w-16 mx-auto mb-4 text-primary/60" />
                <h3 className="text-lg font-medium">{selectedLesson.title}</h3>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <Badge variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    {selectedLesson.duration}
                  </Badge>
                  <Badge variant="outline">10 Questions</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Sample Question:</h4>
                <div className="p-4 border rounded-md">
                  <p className="mb-4">Which of the following is NOT a JavaScript data type?</p>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                      <input type="radio" id="opt1" name="question" className="mr-2" />
                      <label htmlFor="opt1">String</label>
                    </div>
                    <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                      <input type="radio" id="opt2" name="question" className="mr-2" />
                      <label htmlFor="opt2">Boolean</label>
                    </div>
                    <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                      <input type="radio" id="opt3" name="question" className="mr-2" />
                      <label htmlFor="opt3">Float</label>
                    </div>
                    <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                      <input type="radio" id="opt4" name="question" className="mr-2" />
                      <label htmlFor="opt4">Symbol</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">Start Quiz</Button>
            </div>
          ) : (
            <div className="p-4 border rounded-md">
              <FileText className="h-16 w-16 mx-auto mb-4 text-primary/60" />
              <h3 className="text-lg font-medium text-center">Reading Material</h3>
              <p className="text-muted-foreground text-center mb-4">Content would display here</p>
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            <Button variant="outline">Previous Lesson</Button>
            <Button>Next Lesson</Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-md">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <p className="text-sm">Can someone explain how callback functions work in JavaScript?</p>
              </div>
              
              <div className="ml-8 p-3 bg-muted/50 rounded-md">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Sarah (Instructor)</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <p className="text-sm">A callback function is a function passed into another function as an argument...</p>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <Button size="sm">Post</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Take Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              placeholder="Write your notes for this lesson here..."
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
            ></textarea>
            <Button className="mt-2" variant="outline">Save Notes</Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Courses
          </Button>
          <h1 className="text-2xl font-bold">{courseData.title}</h1>
          <p className="text-muted-foreground">Instructor: {courseData.instructor}</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {selectedLesson ? (
            renderLessonContent()
          ) : (
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">

              <TabsList className="w-full justify-start mb-4 overflow-x-auto">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="quizzes">Quizzes & Exams</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>

              <TabsContent value="quizzes">
                <TakeExam />
              </TabsContent>
              
              <TabsContent value="assignments">
                <CourseAssignment />
              </TabsContent>

              <TabsContent value="discussion">
                <CourseDiscussion />
              </TabsContent>
              
              <TabsContent value="notes">
                <CourseNotes />
              </TabsContent>

            </Tabs>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>{courseData.completedLessons} of {courseData.totalLessons} lessons</span>
                  <span>{courseData.progress}% complete</span>
                </div>
                <Progress value={courseData.progress} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Time Spent</span>
                  </div>
                  <span className="text-sm font-medium">{courseData.metrics.timeSpent}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Avg. Quiz Score</span>
                  </div>
                  <span className="text-sm font-medium">{courseData.metrics.avgQuizScore}%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Activity Streak</span>
                  </div>
                  <span className="text-sm font-medium">{courseData.metrics.activityStreak} days</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Learning Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Bookmark Lesson
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <PenTool className="h-4 w-4 mr-2" />
                Take Notes
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask Question
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {courseData.assignments.filter(a => a.status === "pending").map((assignment) => (
                <div key={assignment.id} className="flex justify-between items-center p-2 text-sm border-b last:border-0">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{assignment.title}</span>
                  </div>
                  <Badge variant="outline">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
              {courseData.quizzes.filter(q => q.status === "pending").map((quiz) => (
                <div key={quiz.id} className="flex justify-between items-center p-2 text-sm border-b last:border-0">
                  <div className="flex items-center">
                    <FileQuestion className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{quiz.title}</span>
                  </div>
                  <Badge variant="outline">
                    {quiz.timeLimit} mins
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardFeatures;
