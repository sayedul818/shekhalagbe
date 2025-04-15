import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle } from "lucide-react";

const StudentDashboard = () => {
  // Mock courses data for "Continue Learning" section
  const courses = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
      progress: 60,
      completedLessons: 8,
      totalLessons: 12,
    },
    {
      id: "2",
      title: "Advanced React & Redux",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
      progress: 35,
      completedLessons: 5,
      totalLessons: 14,
    },
    {
      id: "3",
      title: "Node.js API Development",
      thumbnail: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34",
      progress: 80,
      completedLessons: 10,
      totalLessons: 12,
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Continue Learning</h2>
        <p className="text-muted-foreground">Pick up where you left off</p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              <p className="text-sm text-muted-foreground">
                {course.completedLessons} of {course.totalLessons} lessons completed
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" className="w-full">
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
              <Button variant="outline">View Exam Details</Button>
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

export default StudentDashboard;
