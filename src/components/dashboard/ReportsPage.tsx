
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ReportsPage = () => {
  // Mock data for enrollment chart
  const enrollmentData = [
    { month: 'Jan', students: 65 },
    { month: 'Feb', students: 78 },
    { month: 'Mar', students: 90 },
    { month: 'Apr', students: 105 },
    { month: 'May', students: 125 },
    { month: 'Jun', students: 142 },
    { month: 'Jul', students: 138 },
    { month: 'Aug', students: 152 },
    { month: 'Sep', students: 170 },
    { month: 'Oct', students: 195 },
    { month: 'Nov', students: 220 },
    { month: 'Dec', students: 256 }
  ];
  
  // Mock data for course distribution
  const courseDistributionData = [
    { name: 'Web Development', value: 40 },
    { name: 'Data Science', value: 30 },
    { name: 'Mobile App Dev', value: 20 },
    { name: 'UI/UX Design', value: 10 }
  ];
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Mock data for top performing courses
  const topPerformingCourses = [
    { id: 1, title: 'JavaScript Fundamentals', enrollment: 128, rating: 4.8, completion: 92 },
    { id: 2, title: 'Advanced React & Redux', enrollment: 97, rating: 4.7, completion: 88 },
    { id: 3, title: 'Data Science Bootcamp', enrollment: 85, rating: 4.9, completion: 95 },
    { id: 4, title: 'Mobile App Development', enrollment: 76, rating: 4.6, completion: 85 },
    { id: 5, title: 'UI/UX Design Principles', enrollment: 68, rating: 4.5, completion: 82 }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          View detailed reports and analytics for your learning management system
        </p>
      </div>
      
      <Tabs defaultValue="enrollment">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrollment" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Enrollment</CardTitle>
              <CardDescription>
                Student enrollment trends over the past 12 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={enrollmentData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#8884d8" name="Students Enrolled" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Distribution</CardTitle>
              <CardDescription>
                Distribution of students across different course categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={courseDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {courseDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} students`, 'Enrollment']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
              <CardDescription>
                Courses with highest enrollment and completion rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Enrollment</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Completion %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformingCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.enrollment}</TableCell>
                      <TableCell>{course.rating}</TableCell>
                      <TableCell>{course.completion}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
