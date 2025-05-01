
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, PlayCircle, Clock, CheckCircle, Lock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StudentDashboardFeatures from "./StudentDashboardFeatures";
import { useIsMobile } from "@/hooks/use-mobile";
import { fetchMyCourses } from "@/data/api-data";
import { useToast } from "@/hooks/use-toast";
import { Course } from "@/data/api-data";

const MyCourses = () => {
  const [tabValue, setTabValue] = useState("in-progress");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMyCourses();
        setEnrolledCourses(data.enrolledCourses);
        setCompletedCourses(data.completedCourses);
      } catch (error) {
        console.error("Error loading courses data:", error);
        toast({
          title: "Error",
          description: "Failed to load courses data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [toast]);

  const handleContinueLearning = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const handleViewCourseDetails = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const handleReviewCourse = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const handleViewCertificate = (courseId) => {
    alert("Certificate view would open here");
  };

  const handleBackToCourseList = () => {
    setSelectedCourseId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (selectedCourseId) {
    return (
      <StudentDashboardFeatures 
        courseId={selectedCourseId} 
        onBack={handleBackToCourseList} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Learning</h1>
        <p className="text-muted-foreground">Track your progress and continue your learning journey.</p>
      </div>

      <Tabs defaultValue="in-progress" value={tabValue} onValueChange={setTabValue} className="space-y-4">
        <TabsList className={isMobile ? "w-full" : ""}>
          <TabsTrigger value="in-progress">
            In Progress 
            <span className="ml-1 text-xs bg-primary text-white rounded-full px-1.5 inline-flex justify-center items-center">
              {enrolledCourses.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            <span className="ml-1 text-xs bg-primary text-white rounded-full px-1.5 inline-flex justify-center items-center">
              {completedCourses.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="in-progress" className="space-y-4">
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <Card key={course.id}>
                <div className={isMobile ? "flex flex-col" : "md:flex"}>
                  <div className={isMobile ? "h-48" : "h-48 md:h-auto md:w-72 flex-shrink-0 overflow-hidden"}>
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>Instructor: {course.teacher}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>{course.completedModules} of {course.modules} modules completed</span>
                            <span>{course.progress}% complete</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Last accessed {course.lastAccessed}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className={`mt-auto ${isMobile ? "flex-wrap gap-2" : ""}`}>
                      <Button 
                        className={isMobile ? "w-full" : "mr-2"}
                        onClick={() => handleContinueLearning(course.id)}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                      <Button 
                        variant="outline"
                        className={isMobile ? "w-full" : ""}
                        onClick={() => handleViewCourseDetails(course.id)}
                      >
                        View Course Details
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 border rounded-md bg-gray-50">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No courses in progress</h3>
              <p className="text-muted-foreground mb-4">Browse and enroll in a course to start learning</p>
              <Button onClick={() => navigate("/dashboard/browse")}>Browse Courses</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {completedCourses.length > 0 ? (
            completedCourses.map((course) => (
              <Card key={course.id}>
                <div className={isMobile ? "flex flex-col" : "md:flex"}>
                  <div className={isMobile ? "h-48" : "h-48 md:h-auto md:w-72 flex-shrink-0 overflow-hidden"}>
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <CardTitle>{course.title}</CardTitle>
                        {course.certificate && (
                          <div className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded text-sm">
                            <Award className="h-4 w-4 mr-1" />
                            Certificate Earned
                          </div>
                        )}
                      </div>
                      <CardDescription>Instructor: {course.teacher}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>
                              <CheckCircle className="h-4 w-4 inline mr-1 text-green-600" />
                              Completed all {course.modules} modules
                            </span>
                            <span>{course.progress}% complete</span>
                          </div>
                          <Progress value={course.progress} className="h-2 bg-gray-200" />
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span>Completed on {course.completedDate}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className={`mt-auto ${isMobile ? "flex-wrap gap-2" : ""}`}>
                      <Button 
                        variant="outline" 
                        className={isMobile ? "w-full" : "mr-2"}
                        onClick={() => handleReviewCourse(course.id)}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Review Course
                      </Button>
                      {course.certificate && (
                        <Button 
                          className={isMobile ? "w-full" : ""}
                          onClick={() => handleViewCertificate(course.id)}
                        >
                          <Award className="h-4 w-4 mr-2" />
                          View Certificate
                        </Button>
                      )}
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 border rounded-md bg-gray-50">
              <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No completed courses yet</h3>
              <p className="text-muted-foreground mb-4">Complete a course to earn certificates and track your achievements</p>
              <Button onClick={() => setTabValue("in-progress")}>Continue Learning</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="archived">
          <div className="text-center py-12 border rounded-md bg-gray-50">
            <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No archived courses</h3>
            <p className="text-muted-foreground mb-4">You haven't archived any courses yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyCourses;
