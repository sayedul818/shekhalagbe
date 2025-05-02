
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, FileText, Check, Eye, Upload } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded" | "overdue";
  grade?: number;
  feedback?: string;
  instructions: string;
  module?: string;
  submissionDate?: string;
}

interface AssignmentListProps {
  assignments: Assignment[];
  filter: "pending" | "submitted" | "graded" | "all";
  onViewAssignment: (assignment: Assignment) => void;
  onSubmitAssignment: (assignment: Assignment) => void;
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  filter,
  onViewAssignment,
  onSubmitAssignment,
}) => {
  // Filter assignments based on the selected filter
  const filteredAssignments = filter === "all" 
    ? assignments 
    : assignments.filter(assignment => assignment.status === filter);
  
  // Function to determine badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "outline";
      case "submitted":
        return "secondary";
      case "graded":
        return "default";
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };
  
  // Function to format date with relative time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days ago`;
    } else if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Tomorrow";
    } else if (diffDays < 7) {
      return `In ${diffDays} days`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Function to determine action button based on status
  const getActionButton = (assignment: Assignment) => {
    switch (assignment.status) {
      case "pending":
        return (
          <Button 
            size="sm" 
            onClick={() => onSubmitAssignment(assignment)} 
            className="gap-1"
          >
            <Upload className="h-4 w-4" />
            Submit
          </Button>
        );
      case "submitted":
        return (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onViewAssignment(assignment)}
            className="gap-1"
          >
            <Eye className="h-4 w-4" />
            View
          </Button>
        );
      case "graded":
        return (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onViewAssignment(assignment)}
            className="gap-1"
          >
            <Check className="h-4 w-4" />
            Feedback
          </Button>
        );
      case "overdue":
        return (
          <Button 
            size="sm" 
            variant="destructive" 
            onClick={() => onSubmitAssignment(assignment)}
            className="gap-1"
          >
            <Upload className="h-4 w-4" />
            Submit Late
          </Button>
        );
      default:
        return null;
    }
  };
  
  // If no assignments match the filter
  if (filteredAssignments.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center text-center">
          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium mb-1">No assignments found</h3>
          <p className="text-muted-foreground text-sm max-w-sm">
            {filter === "pending" 
              ? "You don't have any pending assignments. Check back later or look at other tabs."
              : filter === "submitted" 
              ? "You haven't submitted any assignments yet."
              : filter === "graded" 
              ? "None of your assignments have been graded yet." 
              : "You don't have any assignments at the moment."}
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Assignment Title</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAssignments.map((assignment) => (
          <TableRow key={assignment.id}>
            <TableCell className="font-medium">
              <div className="flex flex-col">
                {assignment.title}
                {assignment.module && (
                  <span className="text-xs text-muted-foreground">
                    {assignment.module}
                  </span>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{formatDate(assignment.dueDate)}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={getBadgeVariant(assignment.status)}>
                {assignment.status === "graded" && assignment.grade 
                  ? `${assignment.grade}%` 
                  : assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              {getActionButton(assignment)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AssignmentList;
