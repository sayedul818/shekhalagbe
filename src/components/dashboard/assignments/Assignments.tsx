
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AssignmentList from "./AssignmentList";
import AssignmentModal from "./AssignmentModal";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Clock, Calendar, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CourseComponentProps } from "@/types";
import { Assignment, AssignmentStatus } from "@/types/assignments";

// Mock data for assignments using the Assignment type
const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    dueDate: "2025-05-15",
    status: "pending",
    instructions: "Create a simple JavaScript application that demonstrates the use of promises, async/await, and error handling. Your submission should include both the code and a brief explanation of your implementation.",
    module: "Module 2: JavaScript Basics"
  },
  {
    id: "2",
    title: "React Component Library",
    dueDate: "2025-05-10",
    status: "overdue",
    instructions: "Build a reusable component library in React. Your submission should include at least 5 components with proper documentation and styling.",
    module: "Module 4: React Fundamentals"
  },
  {
    id: "3",
    title: "CSS Layouts",
    dueDate: "2025-04-28",
    status: "submitted",
    submissionDate: "2025-04-27",
    instructions: "Create a responsive layout using CSS Grid and Flexbox. Your submission should work on mobile, tablet, and desktop views.",
    module: "Module 1: Web Fundamentals"
  },
  {
    id: "4",
    title: "Backend API Integration",
    dueDate: "2025-04-20",
    status: "graded",
    grade: 95,
    feedback: "Excellent work! Your API integration was clean and well-documented. The error handling was particularly impressive.",
    instructions: "Integrate a third-party API into your application. Document the API endpoints and explain your implementation choices.",
    module: "Module 5: APIs and Integration",
    submissionDate: "2025-04-19"
  }
];

interface AssignmentsProps extends CourseComponentProps {}

const Assignments: React.FC<AssignmentsProps> = ({ courseId }) => {
  const [activeTab, setActiveTab] = useState<"pending" | "submitted" | "graded" | "all">("all");
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Load assignments
  useEffect(() => {
    // In a real implementation, this would fetch assignments from an API
    const loadAssignments = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAssignments(mockAssignments);
      } catch (error) {
        console.error("Error loading assignments:", error);
        toast({
          title: "Error",
          description: "Failed to load assignments. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAssignments();
  }, [courseId, toast]);
  
  // Filter assignments based on search query
  const filteredAssignments = assignments.filter(assignment => 
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.module?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handlers
  const handleViewAssignment = (assignment: Assignment) => {
    // In a real implementation, this would fetch the assignment details
    console.log("Viewing assignment:", assignment);
    setSelectedAssignment(assignment);
    // For graded assignments, we might show a different view
    if (assignment.status === "graded") {
      // Show feedback modal or navigate to feedback page
    } else {
      // For submitted assignments, we might show the submission
    }
  };
  
  const handleSubmitAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };
  
  // Handle file submission
  const handleFileSubmit = async (assignmentId: string, file: File) => {
    // In a real implementation, this would upload the file to a server
    console.log(`Submitting file for assignment ${assignmentId}:`, file);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update the local state to mark the assignment as submitted
    setAssignments(prevAssignments => 
      prevAssignments.map(a => 
        a.id === assignmentId 
          ? { ...a, status: "submitted" as AssignmentStatus, submissionDate: new Date().toISOString() } 
          : a
      )
    );
    
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been successfully submitted for review.",
    });
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Manage and submit your course assignments</p>
        </div>
        
        <div className="w-full sm:w-auto flex items-center border rounded-md px-3 py-1">
          <Search className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input 
            placeholder="Search assignments..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 px-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">
            All Assignments
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
          </TabsTrigger>
          <TabsTrigger value="submitted">
            Submitted
          </TabsTrigger>
          <TabsTrigger value="graded">
            Graded
          </TabsTrigger>
        </TabsList>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>
              {activeTab === "all" ? "All Assignments" : 
               activeTab === "pending" ? "Pending Assignments" :
               activeTab === "submitted" ? "Submitted Assignments" : 
               "Graded Assignments"}
            </CardTitle>
            <CardDescription>
              {activeTab === "all" ? "View all your course assignments" : 
               activeTab === "pending" ? "Assignments waiting for your submission" :
               activeTab === "submitted" ? "Assignments you've already submitted" : 
               "Assignments that have been graded"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <AssignmentList 
              assignments={filteredAssignments}
              filter={activeTab}
              onViewAssignment={handleViewAssignment}
              onSubmitAssignment={handleSubmitAssignment}
            />
          </CardContent>
        </Card>
      </Tabs>
      
      {selectedAssignment && (
        <AssignmentModal 
          isOpen={isModalOpen} 
          onClose={handleModalClose}
          assignment={selectedAssignment}
          onSubmit={handleFileSubmit}
        />
      )}
      
      {/* Upcoming deadlines section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {assignments
            .filter(a => a.status === "pending")
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .slice(0, 3)
            .map(assignment => (
              <div key={assignment.id} className="flex justify-between items-center p-2 text-sm border-b last:border-0">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{assignment.title}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          
          {assignments.filter(a => a.status === "pending").length === 0 && (
            <div className="text-center py-2 text-sm text-muted-foreground">
              No upcoming deadlines
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Assignments;
