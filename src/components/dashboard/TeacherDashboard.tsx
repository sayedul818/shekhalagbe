import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp,
  UserPlus,
  PlayCircle,
  ChevronRight
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { fetchTeacherDashboardData } from "@/lib/course-data";
import { useToast } from "@/hooks/use-toast";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [coursePerformance, setCoursePerformance] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [courseEngagement, setCourseEngagement] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTeacherDashboardData();
        
        // Transform the stats object into an array for rendering
        const statsArray = [
          { title: "Total Courses", value: data.stats.totalCourses, change: "+2 from last month", icon: "BookOpen" },
          { title: "Total Students", value: data.stats.totalStudents, change: "+15% from last month", icon: "Users" },
          { title: "Completion Rate", value: data.stats.courseCompletionRate + "%", change: "+5% from last month", icon: "Award" },
          { title: "Average Rating", value: data.stats.averageRating, change: "+0.2 from last month", icon: "Award" },
        ];
        
        setStats(statsArray);
        setCoursePerformance(data.coursePerformance || []);
        setRecentActivity(data.recentActivity || []);
        setCourseEngagement(data.courseEngagement);
      } catch (error) {
        console.error("Error loading teacher dashboard data:", error);
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
      Award: <Award className="h-5 w-5" />,
      PlayCircle: <PlayCircle className="h-5 w-5" />,
    };
    
    return icons[iconName] || <BookOpen className="h-5 w-5" />;
  };

  const handleManageCourse = (courseId) => {
    navigate(`/dashboard/courses/manage/${courseId}`);
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
        <h1 className="text-2xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Manage your courses and students.</p>
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

      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
          <CardDescription>Manage and update your course content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coursePerformance.map((course, i) => (
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
                      <p>Completion: {course.completion}%</p>
                      <div className="h-2 w-32 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${course.completion}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleManageCourse(course.id)}
                    >
                      Manage
                    </Button>
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
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <UserPlus className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.content}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Course Engagement</CardTitle>
            <CardDescription>Student activity in your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {courseEngagement && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseEngagement.labels.map((label, i) => ({
                    name: label,
                    views: courseEngagement.datasets[0].data[i],
                    assignments: courseEngagement.datasets[1].data[i],
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="views" fill="#8884d8" name="Video Views" />
                    <Bar dataKey="assignments" fill="#82ca9d" name="Assignments Completed" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
