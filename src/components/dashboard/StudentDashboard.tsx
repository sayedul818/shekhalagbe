
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  PlayCircle,
  ChevronRight,
  Calendar,
  CheckCircle
} from "lucide-react";

const StudentDashboard = () => {
  // Mock stats
  const stats = [
    { title: "Enrolled Courses", value: 5, icon: <BookOpen className="h-5 w-5" /> },
    { title: "Completed Courses", value: 2, icon: <CheckCircle className="h-5 w-5" /> },
    { title: "Certificates Earned", value: 2, icon: <Trophy className="h-5 w-5" /> },
    { title: "Hours Learned", value: 47, icon: <Clock className="h-5 w-5" /> },
  ];

  const enrolledCourses = [
    { 
      title: "Complete JavaScript Course", 
      instructor: "Dr. Sarah Johnson", 
      progress: 75, 
      lastAccessed: "Yesterday",
      nextClass: "Advanced Functions"
    },
    { 
      title: "UI/UX Design Fundamentals", 
      instructor: "Michael Rodriguez", 
      progress: 32, 
      lastAccessed: "3 days ago",
      nextClass: "User Research Methods"
    },
    { 
      title: "Python for Data Science", 
      instructor: "Lisa Chen", 
      progress: 18, 
      lastAccessed: "1 week ago",
      nextClass: "Pandas Library"
    },
  ];

  const upcomingExams = [
    { title: "JavaScript Mid-term", course: "Complete JavaScript Course", date: "Tomorrow, 10:00 AM" },
    { title: "Design Principles", course: "UI/UX Design Fundamentals", date: "May 20, 2:00 PM" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Continue your learning journey.</p>
        </div>
        <Button>
          <BookOpen className="h-4 w-4 mr-2" />
          Browse Courses
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Continue Learning</CardTitle>
          <CardDescription>Pick up where you left off</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {enrolledCourses.map((course, i) => (
              <div key={i} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <div className="text-sm text-muted-foreground">
                        <span>Instructor: {course.instructor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm">
                      <p>Last accessed: {course.lastAccessed}</p>
                      <div className="flex items-center">
                        <div className="h-2 w-24 bg-gray-200 rounded-full mr-2">
                          <div 
                            className="h-2 bg-primary rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span>{course.progress}%</span>
                      </div>
                    </div>
                    <Button className="whitespace-nowrap">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t text-sm flex">
                  <span className="font-medium">Next up:</span>
                  <span className="ml-2 text-primary">{course.nextClass}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recommended Courses</CardTitle>
            <CardDescription>Courses based on your interests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "React - The Complete Guide", instructor: "Max Schwarz", rating: 4.9, students: 159000 },
                { title: "Machine Learning A-Z", instructor: "Frank Johnson", rating: 4.7, students: 124000 },
                { title: "Web Design for Beginners", instructor: "Emma Thompson", rating: 4.8, students: 89000 }
              ].map((course, i) => (
                <div key={i} className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded-md transition-colors">
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm">
                      <p>★ {course.rating}</p>
                      <p className="text-xs text-muted-foreground">{course.students.toLocaleString()} students</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">View All Recommendations</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Don't forget these important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam, i) => (
                <div key={i} className="flex items-start space-x-4 border-l-4 border-primary pl-4 py-1">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{exam.title}</p>
                    <p className="text-sm text-muted-foreground">{exam.course}</p>
                    <p className="text-sm font-medium text-primary mt-1">{exam.date}</p>
                  </div>
                </div>
              ))}
              {upcomingExams.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming exams</p>
                </div>
              )}
              <Button variant="outline" className="w-full mt-2">View All Exams</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
