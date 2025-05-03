
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
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowLeft,
  Activity,
} from "lucide-react";
import CourseLesson from "./CourseLesson";
import Assignments from "./assignments/Assignments";
import Quizzes from "./quizzes/Quizzes";
import Discussions from "./discussions/Discussions";
import { useToast } from "@/hooks/use-toast";
import { fetchStudentDashboardFeaturesData } from "@/lib/course-data";
import { CourseComponentProps } from "@/types"; // Import the interface

interface StudentDashboardFeaturesProps {
  courseId: string;
  onBack: () => void;
}

const StudentDashboardFeatures = ({ courseId, onBack }: StudentDashboardFeaturesProps) => {
  const [activeTab, setActiveTab] = useState("curriculum");
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
        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
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
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-4 overflow-x-auto">
              <TabsTrigger value="curriculum">
                <BookOpen className="h-4 w-4 mr-2" />
                Curriculum
              </TabsTrigger>
              <TabsTrigger value="assignments">
                Assignments
              </TabsTrigger>
              <TabsTrigger value="quizzes">
                Quizzes
              </TabsTrigger>
              <TabsTrigger value="discussions">
                Discussions
              </TabsTrigger>
            </TabsList>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum">
              <CourseLesson courseId={courseId} />
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments">
              <Assignments courseId={courseId} />
            </TabsContent>
            
            {/* Quizzes Tab */}
            <TabsContent value="quizzes">
              <Quizzes courseId={courseId} />
            </TabsContent>
              
            {/* Discussions Tab */}
            <TabsContent value="discussions">
              <Discussions courseId={courseId} />
            </TabsContent>
          </Tabs>
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
                    <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Activity Streak</span>
                  </div>
                  <span className="text-sm font-medium">{courseData.metrics?.activityStreak || '0'} days</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming deadlines section */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {courseData.assignments?.filter(a => a.status === "pending").slice(0, 2).map((assignment) => (
                <div key={assignment.id} className="flex justify-between items-center p-2 text-sm border-b last:border-0">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{assignment.title}</span>
                  </div>
                  <Badge variant="outline">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
              
              {(!courseData.assignments?.length) && (
                <div className="text-center py-2 text-sm text-muted-foreground">
                  No upcoming deadlines
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardFeatures;
