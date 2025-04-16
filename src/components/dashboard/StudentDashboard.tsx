import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, User, BookOpen, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to Web Development",
      thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
      progress: 65,
      completedLessons: 13,
      totalLessons: 20,
      lastLesson: "CSS Flexbox",
      teacher: "John Smith",
      description: "Learn the fundamentals of web development with HTML, CSS and JavaScript.",
      nextLessonId: 14
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      progress: 40,
      completedLessons: 8,
      totalLessons: 20,
      lastLesson: "Data Visualization",
      teacher: "Michael Chen",
      description: "Master the basics of data science and analysis.",
      nextLessonId: 9
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      thumbnail: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d",
      progress: 25,
      completedLessons: 5,
      totalLessons: 20,
      lastLesson: "Social Media Strategy",
      teacher: "Sarah Johnson",
      description: "Develop effective digital marketing strategies for businesses.",
      nextLessonId: 6
    }
  ]);

  const [upcomingExams, setUpcomingExams] = useState([
    {
      id: 1,
      title: "Web Development Mid-term",
      date: "May 10, 2025",
      time: "10:00 AM"
    },
    {
      id: 2,
      title: "Data Science Quiz",
      date: "May 15, 2025",
      time: "2:00 PM"
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Platform Maintenance",
      date: "April 20, 2025",
      content: "The platform will be down for maintenance on Sunday from 2:00 AM to 4:00 AM."
    },
    {
      id: 2,
      title: "New Courses Available",
      date: "April 18, 2025",
      content: "Check out our newly added courses on Mobile App Development and UI/UX Design."
    }
  ]);

  const handleContinueLearning = (courseId: number, lessonId: number) => {
    navigate(`/dashboard/courses/${courseId}/lessons/${lessonId}`);
  };
  
  const handleEditProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleReadMoreClick = (announcement) => {
    setSelectedAnnouncement(announcement);
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      onClick={() => handleReadMoreClick(announcement)}
                    >
                      Read More
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
                      <DialogDescription>
                        Posted on {selectedAnnouncement?.date}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <p className="text-foreground">{selectedAnnouncement?.content}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <Button onClick={handleEditProfile}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {renderDashboard()}
    </div>
  );
};

export default StudentDashboard;
