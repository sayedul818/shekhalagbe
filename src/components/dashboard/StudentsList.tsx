
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, X, Mail, Eye } from "lucide-react";

const StudentsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock students data
  const students = [
    { id: "1", name: "John Doe", email: "john@example.com", progress: 85, lastActive: "Today", enrolled: "Apr 10, 2023" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", progress: 72, lastActive: "Yesterday", enrolled: "May 15, 2023" },
    { id: "3", name: "Michael Lee", email: "michael@example.com", progress: 65, lastActive: "3 days ago", enrolled: "Jan 05, 2023" },
    { id: "4", name: "Sarah Wilson", email: "sarah@example.com", progress: 92, lastActive: "Today", enrolled: "Feb 20, 2023" },
    { id: "5", name: "David Thompson", email: "david@example.com", progress: 45, lastActive: "1 week ago", enrolled: "Mar 12, 2023" },
    { id: "6", name: "Emma Johnson", email: "emma@example.com", progress: 78, lastActive: "2 days ago", enrolled: "Jun 30, 2023" },
  ];
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Students</h1>
        <p className="text-muted-foreground">View and manage students enrolled in your courses.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Student List</CardTitle>
              <CardDescription>All students enrolled in your courses</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-20 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                student.progress > 80 ? "bg-green-500" : 
                                student.progress > 60 ? "bg-blue-500" : 
                                student.progress > 40 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.lastActive}</TableCell>
                      <TableCell>{student.enrolled}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No students found.
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

export default StudentsList;
