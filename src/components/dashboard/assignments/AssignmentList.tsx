
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertTriangle, FileCheck } from "lucide-react";
import { Assignment, AssignmentStatus } from "@/types/assignments";

interface AssignmentListProps {
  assignments: Assignment[];
  filter: "all" | "pending" | "submitted" | "graded";
  onViewAssignment: (assignment: Assignment) => void;
  onSubmitAssignment: (assignment: Assignment) => void;
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  filter,
  onViewAssignment,
  onSubmitAssignment,
}) => {
  // Filter assignments based on the selected tab
  const filteredAssignments = filter === "all" 
    ? assignments 
    : assignments.filter(assignment => assignment.status === filter);

  if (filteredAssignments.length === 0) {
    return (
      <div className="text-center py-12">
        <FileCheck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No assignments found</p>
      </div>
    );
  }

  const getStatusBadge = (status: AssignmentStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 font-normal">
            <Clock className="h-3 w-3" />
            <span>Pending</span>
          </Badge>
        );
      case "submitted":
        return (
          <Badge variant="secondary" className="flex items-center gap-1 font-normal">
            <CheckCircle className="h-3 w-3" />
            <span>Submitted</span>
          </Badge>
        );
      case "graded":
        return (
          <Badge variant="default" className="flex items-center gap-1 font-normal">
            <FileCheck className="h-3 w-3" />
            <span>Graded</span>
          </Badge>
        );
      case "overdue":
        return (
          <Badge variant="destructive" className="flex items-center gap-1 font-normal">
            <AlertTriangle className="h-3 w-3" />
            <span>Overdue</span>
          </Badge>
        );
      default:
        return null;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && filter === "pending";
  };

  return (
    <div className="divide-y">
      {filteredAssignments.map((assignment) => (
        <div key={assignment.id} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1 md:space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{assignment.title}</h3>
              {getStatusBadge(assignment.status)}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>
              {assignment.module && (
                <div>{assignment.module}</div>
              )}
              {assignment.status === "submitted" && assignment.submissionDate && (
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  <span>Submitted: {new Date(assignment.submissionDate).toLocaleDateString()}</span>
                </div>
              )}
              {assignment.status === "graded" && (
                <div className="font-medium text-primary">
                  Score: {assignment.grade}/100
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 xs:ml-auto">
            {assignment.status === "pending" || assignment.status === "overdue" ? (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => onSubmitAssignment(assignment)}
              >
                Submit Assignment
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewAssignment(assignment)}
              >
                {assignment.status === "graded" ? "View Feedback" : "View Submission"}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;
