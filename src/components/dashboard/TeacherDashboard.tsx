
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp,
  UserPlus,
  PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TeacherDashboard = () => {
  // Mock stats
  const stats = [
    { title: "Total Courses", value: 8, icon: <BookOpen className="h-5 w-5" />, change: "+2 this year" },
    { title: "Active Students", value: 342, icon: <Users className="h-5 w-5" />, change: "+27 this month" },
    { title: "Course Views", value: 2845, icon: <PlayCircle className="h-5 w-5" />, change: "+18% from last month" },
    { title: "Exams Created", value: 23, icon: <Award className="h-5 w-5" />, change: "+5 this month" },
  ];

  const myCourses = [
    { title: "JavaScript Fundamentals", students: 124, rating: 4.8, lastUpdated: "2 days ago", progress: 90 },
    { title: "Advanced React & Redux", students: 97, rating: 4.7, lastUpdated: "1 week ago", progress: 75 },
    { title: "Node.js API Development", students: 68, rating: 4.5, lastUpdated: "2 weeks ago", progress: 60 },
    { title: "Web Design Principles", students: 53, rating: 4.6, lastUpdated: "1 month ago", progress: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage your courses and students.</p>
        </div>
        {/* Removed "Create New Course" button from here */}
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
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
          <CardDescription>Manage and update your course content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myCourses.map((course, i) => (
              <div key={i} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded bg-gray-200 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{course.students} students</span>
                        <span>•</span>
                        <span>★ {course.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm">
                      <p>Updated {course.lastUpdated}</p>
                      <div className="h-2 w-32 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Student Activity</CardTitle>
            <CardDescription>Latest enrollments and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "John Smith enrolled in JavaScript Fundamentals",
                "Maria Garcia completed Module 3 in Advanced React",
                "Robert Johnson started Module 1 in Node.js API Development",
                "Sarah Williams submitted Quiz 2 in Web Design Principles"
              ].map((activity, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <UserPlus className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{activity}</p>
                    <p className="text-sm text-muted-foreground">{["1 hour", "3 hours", "1 day", "2 days"][i]} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Exams scheduled for your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { course: "JavaScript Fundamentals", exam: "Final Assessment", date: "Tomorrow, 10:00 AM" },
                { course: "Advanced React & Redux", exam: "Redux Middleware", date: "May 20, 2:00 PM" },
                { course: "Node.js API Development", exam: "REST API Design", date: "May 25, 3:30 PM" },
                { course: "Web Design Principles", exam: "UI/UX Principles", date: "June 2, 11:00 AM" }
              ].map((exam, i) => (
                <div key={i} className="border-l-4 border-primary pl-4 py-1">
                  <p className="font-medium">{exam.exam}</p>
                  <p className="text-sm text-muted-foreground">{exam.course}</p>
                  <p className="text-sm font-medium text-primary">{exam.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
