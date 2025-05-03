
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, File, Clock, Users, Edit, Trash2, Eye, Plus, ChevronDown, ChevronRight, CheckCircle, Hourglass } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  moduleId?: string;
  moduleName?: string;
  dueDate: string;
  maxPoints: number;
  instructions: string;
  submissionType: "file" | "text" | "url" | "video";
  resubmissionAllowed: boolean;
  submissions: {
    pending: number;
    submitted: number;
    graded: number;
    total: number;
    averageScore?: number;
  };
}

const initialAssignments: Assignment[] = [
  {
    id: "assignment-1",
    title: "JavaScript Loops Project",
    moduleId: "section-1",
    moduleName: "Introduction to JavaScript",
    dueDate: "2023-05-25",
    maxPoints: 100,
    instructions: "Create a web page that demonstrates different types of JavaScript loops.",
    submissionType: "file",
    resubmissionAllowed: true,
    submissions: {
      pending: 12,
      submitted: 42,
      graded: 13,
      total: 67,
      averageScore: 82
    }
  },
  {
    id: "assignment-2",
    title: "DOM Manipulation Exercise",
    moduleId: "section-2",
    moduleName: "Functions and Objects",
    dueDate: "2023-06-10",
    maxPoints: 75,
    instructions: "Build an interactive form with validation using DOM manipulation techniques.",
    submissionType: "file",
    resubmissionAllowed: false,
    submissions: {
      pending: 8,
      submitted: 25,
      graded: 9,
      total: 42,
      averageScore: 76
    }
  },
  {
    id: "assignment-3",
    title: "Final Project: Portfolio Site",
    dueDate: "2023-07-15",
    maxPoints: 150,
    instructions: "Create a personal portfolio website showcasing projects from this course.",
    submissionType: "url",
    resubmissionAllowed: true,
    submissions: {
      pending: 0,
      submitted: 5,
      graded: 0,
      total: 5
    }
  }
];

const submissionTypeColors = {
  file: "bg-blue-100 text-blue-800",
  text: "bg-green-100 text-green-800",
  url: "bg-purple-100 text-purple-800",
  video: "bg-amber-100 text-amber-800"
};

const submissionTypeLabels = {
  file: "File Upload",
  text: "Text Entry",
  url: "URL Submission",
  video: "Video Recording"
};

export default function AssignmentsManager() {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  const handleDelete = (assignmentId: string) => {
    setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
  };
  
  const handleCreateAssignment = () => {
    const newAssignment: Assignment = {
      id: `assignment-${assignments.length + 1}`,
      title: "New Assignment",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      maxPoints: 100,
      instructions: "",
      submissionType: "file",
      resubmissionAllowed: true,
      submissions: {
        pending: 0,
        submitted: 0,
        graded: 0,
        total: 0
      }
    };
    setAssignments([...assignments, newAssignment]);
    setExpandedAssignment(newAssignment.id);
  };
  
  const getFilteredAssignments = () => {
    if (activeTab === "all") return assignments;
    if (activeTab === "pending") return assignments.filter(a => a.submissions.pending > 0);
    if (activeTab === "graded") return assignments.filter(a => a.submissions.graded > 0);
    return [];
  };
  
  const filteredAssignments = getFilteredAssignments();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Assignment Manager</CardTitle>
            <CardDescription>Create and manage course assignments</CardDescription>
          </div>
          <Button onClick={handleCreateAssignment}>
            <File className="h-4 w-4 mr-2" />
            Create Assignment
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Assignments</TabsTrigger>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="space-y-4">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map(assignment => (
              <div key={assignment.id} className="border rounded-md overflow-hidden">
                <div 
                  className="p-4 bg-gray-50 cursor-pointer"
                  onClick={() => setExpandedAssignment(expandedAssignment === assignment.id ? null : assignment.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <File className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        {assignment.moduleName && (
                          <p className="text-sm text-muted-foreground">
                            Module: {assignment.moduleName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={submissionTypeColors[assignment.submissionType]}>
                        {submissionTypeLabels[assignment.submissionType]}
                      </Badge>
                      <Badge className={assignment.resubmissionAllowed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {assignment.resubmissionAllowed ? "Resubmission allowed" : "No resubmission"}
                      </Badge>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(assignment.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {expandedAssignment === assignment.id ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
                
                {expandedAssignment === assignment.id && (
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Assignment Details</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Max Points</p>
                            <p className="font-medium">{assignment.maxPoints} pts</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Due Date</p>
                            <p className="font-medium">{assignment.dueDate}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Instructions</p>
                          <p className="border rounded-md p-3 bg-gray-50 text-sm">
                            {assignment.instructions || "No instructions provided."}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Submission Status</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="border rounded-md p-3 flex flex-col items-center justify-center bg-amber-50">
                            <div className="flex items-center">
                              <Hourglass className="h-5 w-5 text-amber-500 mr-2" />
                              <span className="font-medium">Pending</span>
                            </div>
                            <p className="text-2xl font-bold text-amber-600 mt-1">{assignment.submissions.pending}</p>
                          </div>
                          <div className="border rounded-md p-3 flex flex-col items-center justify-center bg-blue-50">
                            <div className="flex items-center">
                              <File className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="font-medium">Submitted</span>
                            </div>
                            <p className="text-2xl font-bold text-blue-600 mt-1">{assignment.submissions.submitted}</p>
                          </div>
                          <div className="border rounded-md p-3 flex flex-col items-center justify-center bg-green-50">
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                              <span className="font-medium">Graded</span>
                            </div>
                            <p className="text-2xl font-bold text-green-600 mt-1">{assignment.submissions.graded}</p>
                          </div>
                          <div className="border rounded-md p-3 flex flex-col items-center justify-center bg-gray-50">
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-gray-500 mr-2" />
                              <span className="font-medium">Total</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-600 mt-1">{assignment.submissions.total}</p>
                          </div>
                        </div>
                        
                        {assignment.submissions.averageScore !== undefined && (
                          <div>
                            <p className="text-sm text-muted-foreground">Average Score</p>
                            <p className="text-2xl font-bold text-primary">{assignment.submissions.averageScore}/100</p>
                          </div>
                        )}
                        
                        <div className="flex justify-between mt-4">
                          <Button size="sm" variant="outline" className="flex-1 mr-2">
                            View All Submissions
                          </Button>
                          {assignment.submissions.pending > 0 && (
                            <Button size="sm" className="flex-1">
                              Grade Pending ({assignment.submissions.pending})
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 border rounded-md">
              <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Assignments Found</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === "all" 
                  ? "Start by creating your first assignment." 
                  : activeTab === "pending" 
                    ? "No assignments pending review."
                    : "No graded assignments yet."}
              </p>
              {activeTab === "all" && (
                <Button onClick={handleCreateAssignment}>
                  <File className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
