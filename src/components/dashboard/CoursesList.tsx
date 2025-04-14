
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookPlus, Search, Edit, Trash2, Eye, X, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CoursesList = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock courses data
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
  
  // Filter courses by role
  const filteredByRole = user?.role === "teacher" 
    ? courses.filter(course => course.teacher === "Robert Johnson") // Mock filtering for the current teacher
    : courses;
  
  // Filter courses by search term
  const filteredCourses = filteredByRole.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Button>
          <BookPlus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
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
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
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

export default CoursesList;
