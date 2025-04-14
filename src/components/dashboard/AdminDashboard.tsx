
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp,
  UserPlus,
  BookPlus,
  ClipboardCheck
} from "lucide-react";

const AdminDashboard = () => {
  // Mock stats
  const stats = [
    { title: "Total Students", value: 1256, icon: <Users className="h-5 w-5" />, change: "+12% from last month" },
    { title: "Total Teachers", value: 73, icon: <BookOpen className="h-5 w-5" />, change: "+5% from last month" },
    { title: "Total Courses", value: 142, icon: <BookPlus className="h-5 w-5" />, change: "+8% from last month" },
    { title: "Total Exams", value: 320, icon: <ClipboardCheck className="h-5 w-5" />, change: "+15% from last month" },
  ];

  const recentActions = [
    { action: "New student registered", time: "5 minutes ago", icon: <UserPlus className="h-4 w-4" /> },
    { action: "New course created", time: "1 hour ago", icon: <BookPlus className="h-4 w-4" /> },
    { action: "Exam results published", time: "3 hours ago", icon: <Award className="h-4 w-4" /> },
    { action: "Course enrollment increased", time: "12 hours ago", icon: <TrendingUp className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage your LMS platform.</p>
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

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActions.map((action, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    {action.icon}
                  </div>
                  <div>
                    <p className="font-medium">{action.action}</p>
                    <p className="text-sm text-muted-foreground">{action.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Popular Courses</CardTitle>
            <CardDescription>Most enrolled courses this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {["Web Development Bootcamp", "Data Science Fundamentals", "UI/UX Design Masterclass", "Python for Machine Learning"][i]}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{[89, 76, 64, 52][i]} students</span>
                      <span className="mx-2">•</span>
                      <span>{[12, 10, 8, 6][i]} modules</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
