
import { useState, useEffect } from "react";
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
import { fetchAdminDashboardData } from "@/lib/course-data";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAdminDashboardData();
        
        // Transform the stats object into an array for rendering
        const statsArray = [
          { title: "Total Users", value: data.stats.totalUsers, change: "+12% from last month", icon: "Users" },
          { title: "Active Users", value: data.stats.activeUsers, change: "+8% from last month", icon: "UserPlus" },
          { title: "Total Courses", value: data.stats.totalCourses, change: "+5% from last month", icon: "BookOpen" },
          { title: "Total Revenue", value: data.stats.totalRevenue, change: "+15% from last month", icon: "TrendingUp" },
        ];
        
        setStats(statsArray);
        setRecentUsers(data.recentUsers || []);
        setRecentCourses(data.recentCourses || []);
      } catch (error) {
        console.error("Error loading admin dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  // Function to get the icon component based on the icon name from API
  const getIconComponent = (iconName) => {
    const icons = {
      Users: <Users className="h-5 w-5" />,
      BookOpen: <BookOpen className="h-5 w-5" />,
      BookPlus: <BookPlus className="h-5 w-5" />,
      ClipboardCheck: <ClipboardCheck className="h-5 w-5" />,
      UserPlus: <UserPlus className="h-4 w-4" />,
      Award: <Award className="h-4 w-4" />,
      TrendingUp: <TrendingUp className="h-4 w-4" />
    };
    
    return icons[iconName] || <BookOpen className="h-5 w-5" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

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
                {getIconComponent(stat.icon)}
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
              {recentUsers.map((user, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <UserPlus className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name} joined as a {user.role}</p>
                    <p className="text-sm text-muted-foreground">{user.joinDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Courses</CardTitle>
            <CardDescription>Newly created courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.map((course, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{course.title}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{course.teacher || "Unknown teacher"}</span>
                      <span className="mx-2">•</span>
                      <span>{course.enrolled || 0} students</span>
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
