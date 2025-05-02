
import React, { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
  Search,
  Upload,
  Edit,
  Plus,
  Star,
} from "lucide-react";
import CourseCurriculum from "./courseCurriculam";
import CourseQuiz from "./CourseQuiz";
import CourseAssignment from "./courseAssignment";
import CourseDiscussion from "./CourseDiscussion";
import CourseNotes from "./CourseNotes";
import { useToast } from "@/hooks/use-toast";
import { fetchStudentDashboardFeaturesData } from "@/lib/course-data";

interface StudentDashboardFeaturesProps {
  courseId: string;
  onBack: () => void;
}

// Define CustomSelect interface to avoid TypeScript errors
interface CustomSelectProps {
  children: React.ReactNode;
  placeholder: string;
  className?: string;
}

const StudentDashboardFeatures = ({ courseId, onBack }: StudentDashboardFeaturesProps) => {
  const [activeTab, setActiveTab] = useState("curriculum");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchStudentDashboardFeaturesData();
        setCourseData(data);
      } catch (error) {
        console.error("Error loading course data:", error);
        toast({
          title: "Error",
          description: "Failed to load course data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourseData();
  }, [courseId, toast]);

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
          
          {/* Lesson content based on type */}
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
        
        {/* Discussion section */}
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
        
        {/* Notes section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Take Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your notes for this lesson here..."
              className="w-full min-h-[100px]"
            />
            <div className="mt-2 flex justify-between items-center">
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <BookmarkPlus className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">Auto-saving...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  // Error or no data state
  if (!courseData) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Course not found</h2>
        <p className="text-muted-foreground mb-6">Sorry, we couldn't load this course.</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

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
                <TabsTrigger value="curriculum">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Curriculum
                </TabsTrigger>
                <TabsTrigger value="assignments">
                  <FileText className="h-4 w-4 mr-2" />
                  Assignments
                </TabsTrigger>
                <TabsTrigger value="quizzes">
                  <FileQuestion className="h-4 w-4 mr-2" />
                  Quizzes
                </TabsTrigger>
                <TabsTrigger value="notes">
                  <PenTool className="h-4 w-4 mr-2" />
                  Notes
                </TabsTrigger>
                <TabsTrigger value="discussion">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discussion
                </TabsTrigger>
              </TabsList>

              {/* Curriculum Tab */}
              <TabsContent value="curriculum">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Course Curriculum</h2>
                    <div className="flex items-center bg-muted rounded-md px-3 py-1">
                      <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Input
                        placeholder="Search lessons..."
                        className="h-8 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <CourseCurriculum courseId={courseId} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Assignments Tab */}
              <TabsContent value="assignments">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Assignments</h2>
                    <div className="flex space-x-2">
                      <Tabs defaultValue="all" className="w-fit">
                        <TabsList className="grid grid-cols-4 h-8">
                          <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                          <TabsTrigger value="pending" className="text-xs">Pending</TabsTrigger>
                          <TabsTrigger value="submitted" className="text-xs">Submitted</TabsTrigger>
                          <TabsTrigger value="graded" className="text-xs">Graded</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <CourseAssignment courseId={courseId} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Quizzes Tab */}
              <TabsContent value="quizzes">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Quizzes</h2>
                    <div className="flex space-x-2">
                      <Tabs defaultValue="all" className="w-fit">
                        <TabsList className="grid grid-cols-4 h-8">
                          <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                          <TabsTrigger value="upcoming" className="text-xs">Upcoming</TabsTrigger>
                          <TabsTrigger value="active" className="text-xs">Active</TabsTrigger>
                          <TabsTrigger value="completed" className="text-xs">Completed</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <CourseQuiz courseId={courseId} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Analytics</CardTitle>
                      <CardDescription>Your quiz performance over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                        <div className="text-center">
                          <BarChart2 className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Quiz performance chart would appear here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">My Notes</h2>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                        <Input placeholder="Search notes..." className="pl-8 h-9 w-[200px]" />
                      </div>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        New Note
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">Important JavaScript Concepts</CardTitle>
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardDescription>Module 2 - Lesson 3</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm">Remember to check for undefined values before accessing object properties...</p>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 text-xs text-muted-foreground">
                        <span>May 2, 2025</span>
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">important</Badge>
                          <Badge variant="outline">review</Badge>
                        </div>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">Working with Arrays</CardTitle>
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardDescription>Module 3 - Lesson 1</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm">Array methods to remember: map(), filter(), reduce(), forEach()...</p>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2 text-xs text-muted-foreground">
                        <span>May 1, 2025</span>
                        <Badge variant="outline">code</Badge>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Create New Note</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Input placeholder="Note title" className="mb-2" />
                        <div className="flex space-x-2 mb-2">
                          <div className="flex-1">
                            <CustomSelect placeholder="Select module" className="flex-1">
                              <div>{/* Options would go here */}</div>
                            </CustomSelect>
                          </div>
                          <div className="flex-1">
                            <CustomSelect placeholder="Select lesson" className="flex-1">
                              <div>{/* Options would go here */}</div>
                            </CustomSelect>
                          </div>
                        </div>
                        <Textarea 
                          placeholder="Write your note here..." 
                          className="min-h-[200px]"
                        />
                      </div>
                      <div className="flex justify-between">
                        <div className="flex space-x-2">
                          <Input placeholder="Add tags..." className="w-40" />
                          <Button variant="outline" size="sm">Add Tag</Button>
                        </div>
                        <Button>Save Note</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Discussion Tab */}
              <TabsContent value="discussion">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Course Discussions</h2>
                    <div className="flex space-x-2">
                      <div className="w-[120px]">
                        <CustomSelect placeholder="Filter by" className="w-full">
                          <div>{/* Options would go here */}</div>
                        </CustomSelect>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-1" />
                        New Topic
                      </Button>
                    </div>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <CourseDiscussion courseId={courseId} />
                    </CardContent>
                  </Card>
                </div>
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
                  <span className="text-sm font-medium">{courseData.metrics?.timeSpent || '0h'}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Avg. Quiz Score</span>
                  </div>
                  <span className="text-sm font-medium">{courseData.metrics?.avgQuizScore || '0'}%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Activity Streak</span>
                  </div>
                  <span className="text-sm font-medium">{courseData.metrics?.activityStreak || '0'} days</span>
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
              {courseData.assignments?.filter(a => a.status === "pending").slice(0, 2).map((assignment) => (
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
              
              {courseData.quizzes?.filter(q => q.status === "pending").slice(0, 2).map((quiz) => (
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
              
              {(!courseData.assignments?.length && !courseData.quizzes?.length) && (
                <div className="text-center py-2 text-sm text-muted-foreground">
                  No upcoming deadlines
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* New Analytics Card */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Stats</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pt-0">
              <div className="space-y-4">
                {/* Quiz Performance */}
                <div className="px-2">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Quiz Performance</span>
                    <span className="font-medium">{courseData.metrics?.avgQuizScore || '0'}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${courseData.metrics?.avgQuizScore || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Assignment Completion */}
                <div className="px-2">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Assignment Completion</span>
                    <span className="font-medium">
                      {courseData.assignments?.filter(a => a.status === "completed").length || 0}/
                      {courseData.assignments?.length || 0}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ 
                        width: `${courseData.assignments?.length ? 
                          ((courseData.assignments.filter(a => a.status === "completed").length / courseData.assignments.length) * 100) : 
                          0}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Discussion Participation */}
                <div className="px-2">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Discussion Participation</span>
                    <span className="font-medium">{courseData.metrics?.discussionPosts || 0} posts</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${Math.min((courseData.metrics?.discussionPosts || 0) * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// CustomSelect component with proper TypeScript interface
function CustomSelect({ children, placeholder, className }: CustomSelectProps) {
  return (
    <div className={`${className || ''} flex items-center justify-between bg-background border rounded-md px-3 py-2 text-sm`}>
      <span className="text-muted-foreground">{placeholder}</span>
      <span className="text-muted-foreground">▼</span>
      {children}
    </div>
  );
}

export default StudentDashboardFeatures;
