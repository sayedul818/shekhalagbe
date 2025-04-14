
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, PlayCircle, Clock, CheckCircle, Lock, Award } from "lucide-react";

const MyCourses = () => {
  const [tabValue, setTabValue] = useState("in-progress");

  // Mock enrolled courses data
  const enrolledCourses = [
    { 
      id: "1", 
      title: "JavaScript Fundamentals", 
      teacher: "Robert Johnson", 
      progress: 75, 
      lastAccessed: "2 days ago",
      modules: 12,
      completedModules: 9,
      thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc"
    },
    { 
      id: "2", 
      title: "UI/UX Design Fundamentals", 
      teacher: "Lisa Martinez", 
      progress: 32, 
      lastAccessed: "1 week ago",
      modules: 15,
      completedModules: 5,
      thumbnail: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
    },
    { 
      id: "3", 
      title: "Python for Data Science", 
      teacher: "Emily Davis", 
      progress: 18, 
      lastAccessed: "3 weeks ago",
      modules: 14,
      completedModules: 2,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
    },
  ];
  
  const completedCourses = [
    { 
      id: "4", 
      title: "HTML & CSS Basics", 
      teacher: "Michael Brown", 
      progress: 100,
      completedDate: "Mar 15, 2023", 
      modules: 8,
      completedModules: 8,
      certificate: true,
      thumbnail: "https://images.unsplash.com/photo-1621839673705-6617adf9e890"
    },
    { 
      id: "5", 
      title: "Introduction to Web Development", 
      teacher: "Robert Johnson", 
      progress: 100,
      completedDate: "Jan 20, 2023", 
      modules: 10,
      completedModules: 10,
      certificate: true,
      thumbnail: "https://images.unsplash.com/photo-1484417894907-623942c8ee29"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Learning</h1>
        <p className="text-muted-foreground">Track your progress and continue your learning journey.</p>
      </div>

      <Tabs defaultValue="in-progress" value={tabValue} onValueChange={setTabValue} className="space-y-4">
        <TabsList>
          <TabsTrigger value="in-progress" className="relative">
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
                <div className="md:flex">
                  <div className="h-48 md:h-auto md:w-72 flex-shrink-0 overflow-hidden">
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
                    <CardFooter className="mt-auto">
                      <Button className="mr-2">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                      <Button variant="outline">View Course Details</Button>
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
              <Button>Browse Courses</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {completedCourses.length > 0 ? (
            completedCourses.map((course) => (
              <Card key={course.id}>
                <div className="md:flex">
                  <div className="h-48 md:h-auto md:w-72 flex-shrink-0 overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <CardHeader>
                      <div className="flex items-center justify-between">
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
                    <CardFooter className="mt-auto">
                      <Button variant="outline" className="mr-2">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Review Course
                      </Button>
                      {course.certificate && (
                        <Button>
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
              <Button>Continue Learning</Button>
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
