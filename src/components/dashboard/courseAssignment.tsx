import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileCheck, Clock, FilePen, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const CourseAssignment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("lessonId");
  
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(null);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [assignmentResponse, setAssignmentResponse] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  // Mock assignments data
  const assignmentsData = [
    {
      id: "a1",
      title: "JavaScript Fundamentals Assignment",
      description: "Apply your knowledge of JavaScript basics by building a simple calculator",
      instructions: `
        <p>In this assignment, you'll build a simple calculator using JavaScript.</p>
        <p>Requirements:</p>
        <ul>
          <li>Create a calculator with basic operations (add, subtract, multiply, divide)</li>
          <li>Implement a clear button to reset the calculator</li>
          <li>Style your calculator using CSS</li>
          <li>Include error handling for division by zero</li>
        </ul>
        <p>Submission Guidelines:</p>
        <ul>
          <li>Submit your code as a ZIP file containing HTML, CSS, and JavaScript files</li>
          <li>Include a README file explaining how to run your calculator</li>
          <li>Add comments to your code explaining key functionality</li>
        </ul>
      `,
      dueDate: "2025-05-15",
      status: "not-started",
      maxScore: 100
    },
    {
      id: "a2",
      title: "DOM Manipulation Project",
      description: "Create a dynamic to-do list application using DOM manipulation",
      instructions: `
        <p>Create a to-do list application that allows users to:</p>
        <ul>
          <li>Add new tasks</li>
          <li>Mark tasks as completed</li>
          <li>Delete tasks</li>
          <li>Filter tasks (all, active, completed)</li>
        </ul>
        <p>Submission Guidelines:</p>
        <ul>
          <li>Submit your code as a ZIP file</li>
          <li>Use proper ES6+ syntax</li>
          <li>Implement event delegation for better performance</li>
        </ul>
      `,
      dueDate: "2025-05-30",
      status: "not-started",
      maxScore: 100
    },
    {
      id: "a3",
      title: "JavaScript OOP Concepts",
      description: "Demonstrate object-oriented programming concepts in JavaScript",
      instructions: `
        <p>Build a library management system using OOP principles in JavaScript.</p>
        <ul>
          <li>Create classes for Book, Library, and User</li>
          <li>Implement methods for checking out and returning books</li>
          <li>Track book availability and user history</li>
        </ul>
        <p>Submission Guidelines:</p>
        <ul>
          <li>Submit a JavaScript file with your implementation</li>
          <li>Include test cases demonstrating your system's functionality</li>
        </ul>
      `,
      dueDate: "2025-06-15",
      status: "submitted",
      submissionDate: "2025-06-10",
      grade: 95,
      feedback: "Excellent work! Your implementation shows a strong understanding of OOP concepts. The class hierarchy is well-designed, and your code is clean and readable."
    }
  ];

  const handleViewAssignment = (assignmentId: string) => {
    setActiveAssignmentId(assignmentId);
  };

  const handleBackToList = () => {
    setActiveAssignmentId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploaded(true);
      setFileName(e.target.files[0].name);
      
      toast({
        title: "File Uploaded",
        description: `${e.target.files[0].name} has been uploaded`,
      });
    }
  };

  const handleSubmitAssignment = () => {
    setSubmitDialogOpen(false);
    
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been submitted successfully",
    });

    // Update the assignment status and reset state
    setActiveAssignmentId(null);
    setAssignmentResponse("");
    setFileUploaded(false);
    setFileName("");
  };

  // Get the active assignment
  const activeAssignment = activeAssignmentId 
    ? assignmentsData.find(assignment => assignment.id === activeAssignmentId)
    : null;

  // Format due date
  const formatDueDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Calculate time remaining
  const getTimeRemaining = (dueDate: string) => {
    const due = new Date(dueDate).getTime();
    const now = new Date().getTime();
    const diff = due - now;
    
    if (diff <= 0) return "Past due";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `${days} days remaining`;
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "not-started":
        return (
          <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
            Not Started
          </span>
        );
      case "in-progress":
        return (
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
            In Progress
          </span>
        );
      case "submitted":
        return (
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
            Submitted
          </span>
        );
      case "graded":
        return (
          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
            Graded
          </span>
        );
      default:
        return null;
    }
  };

  if (activeAssignment) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <Button variant="outline" onClick={handleBackToList} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assignments
        </Button>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle className="text-xl">{activeAssignment.title}</CardTitle>
                <CardDescription className="mt-1">{activeAssignment.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={activeAssignment.status} />
                {activeAssignment.status === "submitted" && activeAssignment.grade !== undefined && (
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                    Grade: {activeAssignment.grade}/{activeAssignment.maxScore}
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex items-start gap-3 mb-2">
                <Clock className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Due Date</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDueDate(activeAssignment.dueDate)} ({getTimeRemaining(activeAssignment.dueDate)})
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Assignment Instructions</h3>
                  <div 
                    className="text-sm mt-2 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: activeAssignment.instructions }}
                  />
                </div>
              </div>
            </div>
            
            {activeAssignment.status === "submitted" ? (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Submission</h3>
                <div className="rounded-md border p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <FilePen className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium">Your Submission</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Submitted on {activeAssignment.submissionDate}
                  </p>
                  <div className="bg-white border rounded-md p-3 mb-4 text-sm">
                    <p>I've completed the assignment according to the requirements. My implementation includes error handling for division by zero and a clean UI design.</p>
                    <div className="mt-2 flex items-center gap-2 p-2 border rounded bg-blue-50">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">assignment_submission.zip</span>
                    </div>
                  </div>
                  
                  {activeAssignment.feedback && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Instructor Feedback</h4>
                      <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm">
                        {activeAssignment.feedback}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Submit Your Assignment</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Assignment Response
                    </label>
                    <textarea 
                      className="w-full min-h-[120px] p-3 border rounded-md"
                      placeholder="Enter any comments or notes about your submission..."
                      value={assignmentResponse}
                      onChange={(e) => setAssignmentResponse(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Upload Files
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      {fileUploaded ? (
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <span>{fileName}</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setFileUploaded(false);
                              setFileName("");
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <FilePen className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop your files here, or click to browse
                          </p>
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <label htmlFor="file-upload">
                            <Button variant="outline" className="mx-auto" size="sm" asChild>
                              <span>Browse Files</span>
                            </Button>
                          </label>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Accepted file formats: .zip, .pdf, .doc, .docx, .js, .html, .css
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter>
            {activeAssignment.status !== "submitted" && (
              <div className="flex flex-wrap gap-2 w-full justify-end">
                <Button 
                  variant="outline" 
                  onClick={handleBackToList}
                >
                  Save as Draft
                </Button>
                <Button 
                  onClick={() => setSubmitDialogOpen(true)}
                  disabled={!fileUploaded}
                >
                  Submit Assignment
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
        
        <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Assignment</DialogTitle>
              <DialogDescription>
                Are you sure you want to submit this assignment? You cannot make changes after submission.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <p className="mb-2 font-medium">Submission Summary:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Assignment: {activeAssignment.title}</li>
                <li>• File: {fileName}</li>
                <li>• Due date: {formatDueDate(activeAssignment.dueDate)}</li>
              </ul>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSubmitDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitAssignment}>
                Confirm Submission
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center">
              <FileCheck className="h-6 w-6 mr-2 text-primary" />
              Assignments
            </h1>
            <p className="text-muted-foreground">
              View and submit your course assignments
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {assignmentsData.map((assignment) => (
          <Card key={assignment.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1 bg-primary"></div>
              <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {assignment.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <StatusBadge status={assignment.status} />
                    {assignment.grade !== undefined && (
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                        Grade: {assignment.grade}/{assignment.maxScore}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-4 md:mb-0">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Due: {formatDueDate(assignment.dueDate)}</span>
                    <span className="mx-2">•</span>
                    <span>{getTimeRemaining(assignment.dueDate)}</span>
                  </div>
                  
                  <Button onClick={() => handleViewAssignment(assignment.id)}>
                    {assignment.status === "not-started" ? "Start Assignment" : 
                     assignment.status === "submitted" ? "View Submission" : 
                     "Continue Assignment"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseAssignment;