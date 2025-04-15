
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, User, BookOpen, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Mock student profile data
  const studentProfile = {
    id: "s001",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    enrolledDate: "January 15, 2024",
    completedCourses: 3,
    inProgressCourses: 5,
    totalHoursLearned: 78,
    averageScore: 92,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
  };

  // Mock courses data for "Continue Learning" section
  const courses = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
      progress: 60,
      completedLessons: 8,
      totalLessons: 12,
      description: "Master the fundamentals of JavaScript with practical exercises and real-world examples.",
      lastLesson: "Functions and Callbacks",
      teacher: "Robert Johnson",
      nextLessonId: "js-lesson-9"
    },
    {
      id: "2",
      title: "Advanced React & Redux",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
      progress: 35,
      completedLessons: 5,
      totalLessons: 14,
      description: "Learn advanced React concepts and state management with Redux.",
      lastLesson: "Redux Middleware",
      teacher: "Emily Davis",
      nextLessonId: "react-lesson-6"
    },
    {
      id: "3",
      title: "Node.js API Development",
      thumbnail: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34",
      progress: 80,
      completedLessons: 10,
      totalLessons: 12,
      description: "Build scalable APIs with Node.js, Express, and MongoDB.",
      lastLesson: "Authentication & Authorization",
      teacher: "Michael Chen",
      nextLessonId: "node-lesson-11"
    },
  ];

  // Mock data for "Upcoming Exams" section
  const upcomingExams = [
    {
      id: "1",
      title: "JavaScript Final Exam",
      date: "April 15, 2024",
      time: "10:00 AM",
    },
    {
      id: "2",
      title: "React Redux Quiz",
      date: "April 22, 2024",
      time: "2:00 PM",
    },
  ];

  // Mock data for "Recent Announcements" section
  const announcements = [
    {
      id: "1",
      title: "New JavaScript Course Available",
      date: "April 1, 2024",
      content: "Check out our new JavaScript Fundamentals course!",
    },
    {
      id: "2",
      title: "Office Hours Update",
      date: "March 28, 2024",
      content: "Office hours will be held every Tuesday and Thursday from 3-4 PM.",
    },
  ];

  const handleContinueLearning = (courseId, nextLessonId) => {
    // Navigate to the specific course and lesson
    navigate(`/dashboard/my-courses/${courseId}/lessons/${nextLessonId}`);
  };

  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Continue Learning</h2>
          <p className="text-muted-foreground">Pick up where you left off</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <Card key={index} className="flex flex-col">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-white font-semibold">{course.title}</h3>
                  <p className="text-white/80 text-sm">{course.progress}% complete</p>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <PlayCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardContent className="flex-1 p-4">
                <Progress value={course.progress} className="mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  {course.completedLessons} of {course.totalLessons} lessons completed
                </p>
                <p className="text-sm font-medium">Last viewed: {course.lastLesson}</p>
                <p className="text-xs text-muted-foreground mt-1">Instructor: {course.teacher}</p>
                <p className="text-sm mt-2">{course.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full"
                  onClick={() => handleContinueLearning(course.id, course.nextLessonId)}
                >
                  Continue Learning
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Upcoming Exams</h2>
          <p className="text-muted-foreground">Prepare for your upcoming assessments</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {upcomingExams.map((exam, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{exam.title}</CardTitle>
                <CardDescription>
                  {exam.date} at {exam.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Best of luck with your exam!
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => navigate(`/dashboard/exams/take/${exam.id}`)}>
                  View Exam Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recent Announcements</h2>
          <p className="text-muted-foreground">Stay informed with the latest updates</p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {announcements.map((announcement, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{announcement.title}</CardTitle>
                <CardDescription>{announcement.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {announcement.content}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">View and manage your profile information</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Summary Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center pb-2">
              <Avatar className="h-24 w-24 mb-2">
                <AvatarImage src={studentProfile.avatar} alt={studentProfile.name} />
                <AvatarFallback>{studentProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-center">{studentProfile.name}</CardTitle>
              <CardDescription className="text-center">{studentProfile.email}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Enrolled since</span>
                  <span className="font-medium">{studentProfile.enrolledDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed courses</span>
                  <span className="font-medium">{studentProfile.completedCourses}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">In progress</span>
                  <span className="font-medium">{studentProfile.inProgressCourses}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Average score</span>
                  <span className="font-medium">{studentProfile.averageScore}%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </CardFooter>
          </Card>

          {/* Learning Stats and Course Overview */}
          <div className="md:col-span-2 space-y-6">
            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Statistics</CardTitle>
                <CardDescription>Track your progress and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm font-medium">Total Courses</span>
                    </div>
                    <p className="text-2xl font-bold">{studentProfile.completedCourses + studentProfile.inProgressCourses}</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${(studentProfile.completedCourses / (studentProfile.completedCourses + studentProfile.inProgressCourses)) * 100}%` }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {studentProfile.completedCourses} completed, {studentProfile.inProgressCourses} in progress
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-primary" />
                      <span className="text-sm font-medium">Learning Hours</span>
                    </div>
                    <p className="text-2xl font-bold">{studentProfile.totalHoursLearned}</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: '78%' }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Target: 100 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.slice(0, 2).map((course, idx) => (
                    <div key={idx} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                      <div className="h-10 w-10 rounded overflow-hidden mr-3 flex-shrink-0">
                        <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{course.title}</h4>
                        <p className="text-xs text-muted-foreground">Completed lesson: {course.lastLesson}</p>
                        <div className="mt-1 flex items-center text-xs">
                          <Progress value={course.progress} className="h-1 mr-2 w-20" />
                          <span className="text-muted-foreground">{course.progress}% complete</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enrolled Courses Overview */}
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-4">My Courses</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-32 w-full overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>Instructor: {course.teacher}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <Progress value={course.progress} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {course.completedLessons} of {course.totalLessons} lessons completed
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => handleContinueLearning(course.id, course.nextLessonId)}>
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Profile/Dashboard Tab Switcher */}
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'dashboard' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('profile')}
        >
          My Profile
        </button>
      </div>

      {activeTab === 'dashboard' ? renderDashboard() : renderProfile()}
    </div>
  );
};

export default StudentDashboard;
