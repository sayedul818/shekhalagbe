
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, File, Clock, Users, Edit, Trash2, Eye, Plus, ChevronDown, ChevronRight, CheckCircle, Hourglass, Upload, Download, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

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
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);
  const [isEditAssignmentOpen, setIsEditAssignmentOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isViewSubmissionsOpen, setIsViewSubmissionsOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: "",
    dueDate: "",
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
  });
  
  const { toast } = useToast();
  
  // Sample submission data
  const sampleSubmissions = [
    { id: "1", studentName: "John Smith", status: "graded", score: 85, submittedAt: "2025-05-01", fileType: "PDF" },
    { id: "2", studentName: "Maria Garcia", status: "pending", score: null, submittedAt: "2025-05-02", fileType: "DOCX" },
    { id: "3", studentName: "Robert Johnson", status: "graded", score: 92, submittedAt: "2025-05-01", fileType: "PDF" },
    { id: "4", studentName: "Sarah Williams", status: "pending", score: null, submittedAt: "2025-05-03", fileType: "ZIP" },
    { id: "5", studentName: "David Miller", status: "graded", score: 78, submittedAt: "2025-05-02", fileType: "PDF" },
  ];
  
  const handleDelete = (assignmentId: string) => {
    setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
    toast({
      title: "Assignment Deleted",
      description: "The assignment has been successfully deleted",
    });
  };
  
  const handleCreateAssignment = () => {
    setIsCreateAssignmentOpen(true);
  };
  
  const handleEditAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setNewAssignment({
      title: assignment.title,
      moduleId: assignment.moduleId,
      moduleName: assignment.moduleName,
      dueDate: assignment.dueDate,
      maxPoints: assignment.maxPoints,
      instructions: assignment.instructions,
      submissionType: assignment.submissionType,
      resubmissionAllowed: assignment.resubmissionAllowed
    });
    setIsEditAssignmentOpen(true);
  };
  
  const handlePreviewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsPreviewOpen(true);
  };
  
  const handleViewSubmissions = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsViewSubmissionsOpen(true);
  };
  
  const handleAssignmentSubmit = (isEdit: boolean = false) => {
    if (!newAssignment.title) {
      toast({
        title: "Missing Information",
        description: "Please provide an assignment title",
        variant: "destructive",
      });
      return;
    }

    if (isEdit && selectedAssignment) {
      setAssignments(prevAssignments => 
        prevAssignments.map(a => 
          a.id === selectedAssignment.id 
            ? {
                ...a,
                title: newAssignment.title!,
                moduleId: newAssignment.moduleId,
                moduleName: newAssignment.moduleName,
                dueDate: newAssignment.dueDate!,
                maxPoints: newAssignment.maxPoints!,
                instructions: newAssignment.instructions!,
                submissionType: newAssignment.submissionType!,
                resubmissionAllowed: newAssignment.resubmissionAllowed!
              }
            : a
        )
      );
      setIsEditAssignmentOpen(false);
      toast({
        title: "Success",
        description: "Assignment has been updated successfully",
      });
    } else {
      const assignment: Assignment = {
        id: `assignment-${assignments.length + 1}`,
        title: newAssignment.title as string,
        moduleId: newAssignment.moduleId,
        moduleName: newAssignment.moduleName,
        dueDate: newAssignment.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        maxPoints: newAssignment.maxPoints || 100,
        instructions: newAssignment.instructions || "",
        submissionType: newAssignment.submissionType || "file",
        resubmissionAllowed: newAssignment.resubmissionAllowed !== undefined ? newAssignment.resubmissionAllowed : true,
        submissions: {
          pending: 0,
          submitted: 0,
          graded: 0,
          total: 0
        }
      };

      setAssignments([...assignments, assignment]);
      setExpandedAssignment(assignment.id);
      setIsCreateAssignmentOpen(false);
      toast({
        title: "Success",
        description: "Assignment has been created successfully",
      });
    }

    // Reset form
    setNewAssignment({
      title: "",
      dueDate: "",
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
    });
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
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditAssignment(assignment);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(assignment.id);
                        }}
                      >
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
                        
                        <div className="flex items-center justify-between mt-4 gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreviewAssignment(assignment);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAssignment(assignment);
                            }}
                          >
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
                        
                        <div className="flex justify-between mt-4 gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewSubmissions(assignment);
                            }}
                          >
                            <Users className="h-4 w-4 mr-1" />
                            View Submissions
                          </Button>
                          {assignment.submissions.pending > 0 && (
                            <Button 
                              size="sm" 
                              className="flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewSubmissions(assignment);
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Grade ({assignment.submissions.pending})
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
      
      {/* Create/Edit Assignment Dialog */}
      <Dialog 
        open={isCreateAssignmentOpen || isEditAssignmentOpen} 
        onOpenChange={(open) => {
          if (isCreateAssignmentOpen) setIsCreateAssignmentOpen(open);
          if (isEditAssignmentOpen) setIsEditAssignmentOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditAssignmentOpen ? "Edit Assignment" : "Create New Assignment"}</DialogTitle>
            <DialogDescription>
              {isEditAssignmentOpen 
                ? `Update details for ${selectedAssignment?.title}`
                : "Fill in the details to create a new assignment"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input 
                  id="title" 
                  value={newAssignment.title || ''} 
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  placeholder="Enter assignment title"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="module">Module (Optional)</Label>
                  <Select 
                    value={newAssignment.moduleId} 
                    onValueChange={(value) => setNewAssignment({
                      ...newAssignment, 
                      moduleId: value,
                      moduleName: value === "section-1" ? "Introduction to JavaScript" : 
                                  value === "section-2" ? "Functions and Objects" : 
                                  value === "section-3" ? "DOM Manipulation" : undefined
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="section-1">Introduction to JavaScript</SelectItem>
                      <SelectItem value="section-2">Functions and Objects</SelectItem>
                      <SelectItem value="section-3">DOM Manipulation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-points">Max Points</Label>
                  <Input 
                    id="max-points" 
                    type="number" 
                    min={1} 
                    value={newAssignment.maxPoints || 100} 
                    onChange={(e) => setNewAssignment({...newAssignment, maxPoints: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date</Label>
                  <Input 
                    id="due-date" 
                    type="date" 
                    value={newAssignment.dueDate || ''} 
                    onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="submission-type">Submission Type</Label>
                  <Select 
                    value={newAssignment.submissionType}
                    onValueChange={(value) => setNewAssignment({
                      ...newAssignment, 
                      submissionType: value as "file" | "text" | "url" | "video"
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="file">File Upload</SelectItem>
                      <SelectItem value="text">Text Entry</SelectItem>
                      <SelectItem value="url">URL Submission</SelectItem>
                      <SelectItem value="video">Video Recording</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="resubmission">Allow Resubmissions</Label>
                  <div className="flex items-center space-x-2">
                    <RadioGroup 
                      value={newAssignment.resubmissionAllowed ? "yes" : "no"}
                      className="flex space-x-4"
                      onValueChange={(value) => setNewAssignment({
                        ...newAssignment, 
                        resubmissionAllowed: value === "yes"
                      })}
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="yes" id="resubmission-yes" />
                        <Label htmlFor="resubmission-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="no" id="resubmission-no" />
                        <Label htmlFor="resubmission-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea 
                  id="instructions" 
                  placeholder="Enter instructions for the assignment"
                  rows={5}
                  value={newAssignment.instructions || ''}
                  onChange={(e) => setNewAssignment({...newAssignment, instructions: e.target.value})}
                />
              </div>
              
              {newAssignment.submissionType === "file" && (
                <div className="space-y-2">
                  <Label>Accepted File Types</Label>
                  <div className="flex flex-wrap gap-2">
                    {["PDF", "DOCX", "ZIP", "JPG", "PNG"].map((type) => (
                      <Badge key={type} variant="outline" className="px-2 py-1">
                        {type}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm">
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              )}
              
              {newAssignment.submissionType === "file" && (
                <div className="border rounded-md p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Resources</h4>
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-1" />
                      Add Resource
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Optionally provide additional files that students will need to complete the assignment.
                  </p>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                if (isCreateAssignmentOpen) setIsCreateAssignmentOpen(false);
                if (isEditAssignmentOpen) setIsEditAssignmentOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => handleAssignmentSubmit(isEditAssignmentOpen)}>
              {isEditAssignmentOpen ? "Update Assignment" : "Create Assignment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Preview Assignment Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assignment Preview</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.title} - Preview Mode
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-xl font-semibold mb-1">{selectedAssignment?.title}</h3>
              {selectedAssignment?.moduleName && (
                <p className="text-sm text-muted-foreground mb-2">
                  Module: {selectedAssignment.moduleName}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={selectedAssignment?.submissionType ? submissionTypeColors[selectedAssignment.submissionType] : ""}>
                  {selectedAssignment?.submissionType ? submissionTypeLabels[selectedAssignment.submissionType] : ""}
                </Badge>
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  Due: {selectedAssignment?.dueDate}
                </Badge>
                <Badge variant="outline">
                  {selectedAssignment?.maxPoints} points
                </Badge>
              </div>
              
              <h4 className="font-medium mb-2">Instructions:</h4>
              <div className="border rounded-md p-3 bg-gray-50">
                {selectedAssignment?.instructions || "No instructions provided."}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Student View</h4>
              <div className="border rounded-md p-4">
                <h5 className="font-medium mb-2">Your Submission</h5>
                {selectedAssignment?.submissionType === "file" && (
                  <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium mb-1">Drag and drop your file here</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Accepted formats: PDF, DOCX, ZIP, JPG, PNG
                    </p>
                    <Button size="sm">
                      Choose File
                    </Button>
                  </div>
                )}
                
                {selectedAssignment?.submissionType === "text" && (
                  <Textarea placeholder="Enter your response here..." className="min-h-[150px]" />
                )}
                
                {selectedAssignment?.submissionType === "url" && (
                  <div className="space-y-2">
                    <Label>Submission URL</Label>
                    <Input placeholder="https://..." />
                    <p className="text-xs text-muted-foreground">
                      Enter the URL where your project or work is accessible
                    </p>
                  </div>
                )}
                
                {selectedAssignment?.submissionType === "video" && (
                  <div className="border border-dashed rounded-md p-8 flex flex-col items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <File className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium mb-1">Upload a video recording</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      MP4, MOV, or WebM format, max 500MB
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Record Video
                      </Button>
                      <Button size="sm">
                        Upload Video
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Submissions Dialog */}
      <Dialog open={isViewSubmissionsOpen} onOpenChange={setIsViewSubmissionsOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <div>
                <DialogTitle>Assignment Submissions</DialogTitle>
                <DialogDescription>
                  {selectedAssignment?.title}
                </DialogDescription>
              </div>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border rounded-md p-3 bg-amber-50">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Pending</h4>
                  <Badge variant="outline" className="bg-amber-50">
                    {selectedAssignment?.submissions.pending || 0}
                  </Badge>
                </div>
              </div>
              <div className="border rounded-md p-3 bg-blue-50">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Submissions</h4>
                  <Badge variant="outline" className="bg-blue-50">
                    {selectedAssignment?.submissions.submitted || 0}
                  </Badge>
                </div>
              </div>
              <div className="border rounded-md p-3 bg-green-50">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Graded</h4>
                  <Badge variant="outline" className="bg-green-50">
                    {selectedAssignment?.submissions.graded || 0}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-medium">All Submissions</h4>
              <div className="flex items-center gap-2">
                <select className="border rounded p-1 text-sm">
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Graded</option>
                </select>
                <Button size="sm" variant="ghost">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sampleSubmissions.map((submission) => (
                    <tr key={submission.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                            {submission.studentName.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge className={
                          submission.status === "graded" ? "bg-green-100 text-green-800" : 
                          "bg-amber-100 text-amber-800"
                        }>
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {submission.submittedAt}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant="outline">
                          <File className="h-3 w-3 mr-1" />
                          {submission.fileType}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        {submission.score !== null ? (
                          <span className="font-medium">{submission.score}/{selectedAssignment?.maxPoints}</span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <div className="flex justify-end space-x-1">
                          <Button variant="ghost" size="sm">View</Button>
                          {submission.status === "pending" && (
                            <Button variant="outline" size="sm">Grade</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsViewSubmissionsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
