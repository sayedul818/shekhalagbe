
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookPlus, Search, Edit, Trash2, Eye, X, Plus, Clock, Check, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const pricePlans = [
  { id: 1, name: "Basic", price: 49.99, students: 10, storage: "1GB", description: "Perfect for small workshops and tutorials" },
  { id: 2, name: "Standard", price: 99.99, students: 50, storage: "5GB", description: "Ideal for most educators and small classes" },
  { id: 3, name: "Professional", price: 199.99, students: 100, storage: "20GB", description: "Great for established educators with larger audiences", popular: true },
  { id: 4, name: "Enterprise", price: 399.99, students: "Unlimited", storage: "50GB", description: "Complete solution for institutions and organizations" }
];

const CoursesList = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showPricePlans, setShowPricePlans] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const courses = [
    { 
      id: "1", 
      title: "JavaScript Fundamentals", 
      teacher: "Robert Johnson", 
      students: 124, 
      price: 49.99, 
      created: "Apr 10, 2023",
      modules: 12,
      published: true
    },
    { 
      id: "2", 
      title: "Advanced React & Redux", 
      teacher: "Emily Davis", 
      students: 97, 
      price: 69.99, 
      created: "May 15, 2023",
      modules: 15,
      published: true
    },
    { 
      id: "3", 
      title: "Node.js API Development", 
      teacher: "Robert Johnson", 
      students: 68, 
      price: 59.99, 
      created: "Jan 05, 2023",
      modules: 10,
      published: true
    },
    { 
      id: "4", 
      title: "Web Design Principles", 
      teacher: "Lisa Martinez", 
      students: 53, 
      price: 39.99, 
      created: "Feb 20, 2023",
      modules: 8,
      published: true
    },
    { 
      id: "5", 
      title: "Python for Data Science", 
      teacher: "Emily Davis", 
      students: 89, 
      price: 49.99, 
      created: "Mar 12, 2023",
      modules: 14,
      published: true
    },
    { 
      id: "6", 
      title: "UI/UX Design Masterclass", 
      teacher: "Lisa Martinez", 
      students: 76, 
      price: 79.99, 
      created: "Jun 30, 2023",
      modules: 20,
      published: false
    },
  ];

  const filteredByRole = user?.role === "teacher" 
    ? courses.filter(course => course.teacher === "Robert Johnson")
    : courses;

  const filteredCourses = filteredByRole.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPlan = (planId) => {
    toast({
      title: "Plan selected",
      description: `You've selected the ${pricePlans.find(p => p.id === planId).name} plan. Now you can create your course.`,
    });
    
    // Navigate to the new course checkout page instead of create course
    navigate(`/course-checkout/${planId}`);
  };

  const handleManageCourse = (courseId) => {
    navigate(`/dashboard/courses/manage/${courseId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {user?.role === "admin" ? "All Courses" : "My Courses"}
          </h1>
          <p className="text-muted-foreground">
            {user?.role === "admin" ? "View and manage all courses in the system" : "Manage your courses and content"}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <BookPlus className="h-4 w-4 mr-2" />
              Create New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Select a Course Plan</DialogTitle>
              <DialogDescription>
                Choose the right plan for your teaching needs. Each plan offers different student capacity and storage options.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              {pricePlans.map(plan => (
                <Card key={plan.id} className={`overflow-hidden border-2 ${plan.popular ? "border-primary shadow-md" : "border-border"}`}>
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                      MOST POPULAR
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      {plan.name === "Basic" && <Clock className="h-5 w-5 text-blue-500" />}
                      {plan.name === "Standard" && <Check className="h-5 w-5 text-green-500" />}
                      {plan.name === "Professional" && <Crown className="h-5 w-5 text-amber-500" />}
                      {plan.name === "Enterprise" && <BookPlus className="h-5 w-5 text-purple-500" />}
                      {plan.name}
                    </CardTitle>
                    <div className="mt-1">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground"> /month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                        <span>Up to {plan.students} students</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                        <span>{plan.storage} storage</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                        <span>Course analytics</span>
                      </li>
                      {plan.name !== "Basic" && (
                        <li className="flex items-center">
                          <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                          <span>Priority support</span>
                        </li>
                      )}
                      {plan.name === "Enterprise" && (
                        <li className="flex items-center">
                          <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                          <span>Custom branding</span>
                        </li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleSelectPlan(plan.id)}
                    >
                      Select Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
              <p className="font-medium">Limited Time Offer!</p>
              <p>Get 3 months free with annual plans. Plus, a free domain name for all new courses.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Course List</CardTitle>
              <CardDescription>
                {user?.role === "admin" ? "All courses in the system" : "Your created courses"}
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  {user?.role === "admin" && <TableHead>Teacher</TableHead>}
                  <TableHead>Students</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      {user?.role === "admin" && <TableCell>{course.teacher}</TableCell>}
                      <TableCell>{course.students}</TableCell>
                      <TableCell>${course.price}</TableCell>
                      <TableCell>{course.modules}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                          ${course.published 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"}`
                        }>
                          {course.published ? "Published" : "Draft"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/browse/${course.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleManageCourse(course.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={user?.role === "admin" ? 7 : 6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <p className="text-muted-foreground">No courses found.</p>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add your first course
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CheckIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default CoursesList;
