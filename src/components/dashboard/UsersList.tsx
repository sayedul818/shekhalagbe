
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search, Edit, Trash2, UserPlus, X } from "lucide-react";

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock users data
  const users = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "student", joined: "Apr 10, 2023" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "student", joined: "May 15, 2023" },
    { id: "3", name: "Robert Johnson", email: "robert@example.com", role: "teacher", joined: "Jan 05, 2023" },
    { id: "4", name: "Emily Davis", email: "emily@example.com", role: "teacher", joined: "Feb 20, 2023" },
    { id: "5", name: "Michael Brown", email: "michael@example.com", role: "admin", joined: "Mar 12, 2023" },
    { id: "6", name: "Sarah Wilson", email: "sarah@example.com", role: "student", joined: "Jun 30, 2023" },
    { id: "7", name: "David Thompson", email: "david@example.com", role: "student", joined: "Jul 22, 2023" },
    { id: "8", name: "Lisa Martinez", email: "lisa@example.com", role: "teacher", joined: "Aug 18, 2023" },
  ];
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground">View and manage all users in the system.</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>User List</CardTitle>
              <CardDescription>Manage your platform users</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
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
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                          ${user.role === "admin" 
                            ? "bg-blue-100 text-blue-800" 
                            : user.role === "teacher" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"}`
                        }>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
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
                    <TableCell colSpan={5} className="h-24 text-center">
                      No users found.
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

export default UsersList;
