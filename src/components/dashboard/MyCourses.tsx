
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, PlayCircle, Clock, CheckCircle, Lock, Award, FileText, Video, FileQuestion, BookMarked, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const MyCourses = () => {
  const [tabValue, setTabValue] = useState("in-progress");
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load enrolled courses from localStorage
    const saved = localStorage.getItem("enrolledCourses");
    if (saved) {
      setEnrolledCourseIds(JSON.parse(saved));
    }
  }, []);

  // All available courses data (would come from an API in a real application)
  const allCoursesData = [
    { 
      id: "1", 
      title: "JavaScript Fundamentals", 
      teacher: "Robert Johnson", 
      progress: 75, 
      lastAccessed: "2 days ago",
      modules: 12,
      completedModules: 9,
      thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
      resources: [
        { type: "video", title: "Introduction to JavaScript", duration: "15:30" },
        { type: "pdf", title: "Variables and Data Types", pages: 12 },
        { type: "quiz", title: "Basic Syntax Quiz", questions: 10 },
        { type: "video", title: "Control Flow", duration: "20:45" },
        { type: "pdf", title: "Functions in JavaScript", pages: 18 }
      ]
    },
    { 
      id: "2", 
      title: "UI/UX Design Fundamentals", 
      teacher: "Lisa Martinez", 
      progress: 32, 
      lastAccessed: "1 week ago",
      modules: 15,
      completedModules: 5,
      thumbnail: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
      resources: [
        { type: "video", title: "Design Principles", duration: "25:10" },
        { type: "pdf", title: "Color Theory", pages: 20 },
        { type: "quiz", title: "UX Terminology Quiz", questions: 15 },
        { type: "video", title: "User Research Methods", duration: "18:30" },
        { type: "pdf", title: "Wireframing Basics", pages: 14 }
      ]
    },
    { 
      id: "3", 
      title: "Python for Data Science", 
      teacher: "Emily Davis", 
      progress: 18, 
      lastAccessed: "3 weeks ago",
      modules: 14,
      completedModules: 2,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      resources: [
        { type: "video", title: "Python Basics", duration: "22:15" },
        { type: "pdf", title: "Data Structures in Python", pages: 16 },
        { type: "quiz", title: "Python Syntax Quiz", questions: 12 },
        { type: "video", title: "NumPy Introduction", duration: "24:40" },
        { type: "pdf", title: "Pandas Fundamentals", pages: 22 }
      ]
    },
    { 
      id: "4", 
      title: "HTML & CSS Basics", 
      teacher: "Michael Brown", 
      progress: 100,
      completedDate: "Mar 15, 2023", 
      modules: 8,
      completedModules: 8,
      certificate: true,
      thumbnail: "https://images.unsplash.com/photo-1621839673705-6617adf9e890",
      resources: [
        { type: "video", title: "HTML Structure", duration: "18:25" },
        { type: "pdf", title: "CSS Selectors", pages: 10 },
        { type: "quiz", title: "HTML Elements Quiz", questions: 8 },
        { type: "video", title: "CSS Box Model", duration: "16:30" },
        { type: "pdf", title: "Responsive Design", pages: 15 }
      ]
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
      thumbnail: "https://images.unsplash.com/photo-1484417894907-623942c8ee29",
      resources: [
        { type: "video", title: "Web Fundamentals", duration: "20:15" },
        { type: "pdf", title: "HTTP Protocol", pages: 12 },
        { type: "quiz", title: "Web Concepts Quiz", questions: 10 },
        { type: "video", title: "Browser Rendering", duration: "19:45" },
        { type: "pdf", title: "Developer Tools", pages: 14 }
      ]
    },
  ];

  // Filter courses based on enrollment
  const enrolledCourses = allCoursesData.filter(course => 
    enrolledCourseIds.includes(course.id) && course.progress < 100
  );
  
  const completedCourses = allCoursesData.filter(course => 
    enrolledCourseIds.includes(course.id) && course.progress === 100
  );

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  const handleContinueLearning = (courseId) => {
    // Find the course and set it as the selected course for viewing
    const course = allCoursesData.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
    }
  };

  const handleViewCourseDetails = (courseId) => {
    // Navigate to the course details view
    const course = allCoursesData.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
    }
  };

  const handleReviewCourse = (courseId) => {
    // Set the selected course for completed courses
    const course = allCoursesData.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
    }
  };

  const handleViewCertificate = (courseId) => {
    // For now, just show a certificate view (placeholder)
    alert("Certificate view would open here");
  };

  const handleBackToCourseList = () => {
    setSelectedCourse(null);
    setSelectedResource(null);
  };

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  const ResourceIcon = ({ type }) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'quiz':
        return <FileQuestion className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  // Display course details and resources if a course is selected
  if (selectedCourse) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={handleBackToCourseList}
          className="mb-4"
        >
          <BookMarked className="h-4 w-4 mr-2" />
          Back to My Courses
        </Button>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <div className="h-[250px] w-full overflow-hidden">
                <img 
                  src={selectedCourse.thumbnail} 
                  alt={selectedCourse.title} 
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
                <CardDescription>
                  Instructor: {selectedCourse.teacher} | 
                  Progress: {selectedCourse.progress}% | 
                  {selectedCourse.completedDate ? 
                    ` Completed on ${selectedCourse.completedDate}` : 
                    ` ${selectedCourse.completedModules} of ${selectedCourse.modules} modules completed`
                  }
                </CardDescription>
              </CardHeader>
              
              {selectedResource ? (
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <ResourceIcon type={selectedResource.type} />
                        <h3 className="text-lg font-medium ml-2">
                          {selectedResource.title}
                        </h3>
                      </div>
                      <Badge variant="outline">
                        {selectedResource.type === 'video' ? `${selectedResource.duration} mins` : 
                         selectedResource.type === 'pdf' ? `${selectedResource.pages} pages` : 
                         `${selectedResource.questions} questions`}
                      </Badge>
                    </div>
                    
                    <div className="bg-background p-6 rounded-md border">
                      {selectedResource.type === 'video' ? (
                        <div className="aspect-video bg-gray-100 flex justify-center items-center">
                          <div className="text-center">
                            <PlayCircle className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                            <p className="text-lg font-medium">Video Player Placeholder</p>
                            <p className="text-muted-foreground">{selectedResource.title} - {selectedResource.duration} minutes</p>
                          </div>
                        </div>
                      ) : selectedResource.type === 'pdf' ? (
                        <div className="aspect-[4/3] bg-gray-100 flex justify-center items-center">
                          <div className="text-center">
                            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                            <p className="text-lg font-medium">PDF Document Placeholder</p>
                            <p className="text-muted-foreground">{selectedResource.title} - {selectedResource.pages} pages</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-100 p-8 rounded-md flex flex-col items-center">
                          <FileQuestion className="h-16 w-16 text-muted-foreground mb-2" />
                          <p className="text-lg font-medium">Quiz Placeholder</p>
                          <p className="text-muted-foreground mb-4">{selectedResource.title} - {selectedResource.questions} questions</p>
                          <Button variant="default">Start Quiz</Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button variant="outline" onClick={() => setSelectedResource(null)} className="w-full">
                    Return to Course Materials
                  </Button>
                </CardContent>
              ) : (
                <CardContent>
                  <h3 className="text-lg font-medium mb-4">Course Resources</h3>
                  <div className="space-y-3">
                    {selectedCourse.resources.map((resource, index) => (
                      <div 
                        key={index} 
                        onClick={() => handleResourceClick(resource)}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted cursor-pointer transition-colors"
                      >
                        <div className="flex items-center">
                          <ResourceIcon type={resource.type} />
                          <span className="ml-2">{resource.title}</span>
                        </div>
                        <Badge variant="outline">
                          {resource.type === 'video' ? `${resource.duration} mins` : 
                           resource.type === 'pdf' ? `${resource.pages} pages` : 
                           `${resource.questions} questions`}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
              
              <CardFooter>
                <Button variant="outline" className="mr-3">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discussion Forum
                </Button>
                <Button variant="outline">
                  <BookMarked className="h-4 w-4 mr-2" />
                  Notes
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>{selectedCourse.completedModules} of {selectedCourse.modules} modules</span>
                      <span>{selectedCourse.progress}% complete</span>
                    </div>
                    <Progress value={selectedCourse.progress} className="h-2" />
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">Activity</h4>
                    <div className="text-sm text-muted-foreground">
                      <p className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Last accessed {selectedCourse.lastAccessed || "Not yet accessed"}
                      </p>
                    </div>
                  </div>
                  
                  {selectedCourse.certificate && (
                    <div className="pt-4">
                      <Button variant="outline" className="w-full" onClick={() => handleViewCertificate(selectedCourse.id)}>
                        <Award className="h-4 w-4 mr-2" />
                        View Certificate
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
                      <Button 
                        className="mr-2"
                        onClick={() => handleContinueLearning(course.id)}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                      <Button 
                        variant="outline"
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
                      <Button 
                        variant="outline" 
                        className="mr-2"
                        onClick={() => handleReviewCourse(course.id)}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Review Course
                      </Button>
                      {course.certificate && (
                        <Button onClick={() => handleViewCertificate(course.id)}>
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
