
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, FileText, Upload, CheckCircle, Calendar } from "lucide-react";
import { fetchCourseAssignments } from "@/lib/course-data";
import { useToast } from "@/hooks/use-toast";
import { CourseComponentProps } from "@/types";

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "completed" | "pending" | "late";
  score?: number;
  maxScore: number;
}

const CourseAssignment = ({ courseId }: CourseComponentProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const loadAssignments = async () => {
      if (!courseId) return;

      try {
        setIsLoading(true);
        const data = await fetchCourseAssignments(courseId);
        
        // Transform API data to match our Assignment interface
        const transformedAssignments: Assignment[] = (data.assignments || []).map(assignment => ({
          id: assignment.id || `assignment-${Math.random().toString(36).substr(2, 9)}`,
          title: assignment.title || "Untitled Assignment",
          description: assignment.description || "No description provided",
          dueDate: assignment.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: assignment.status || "pending",
          score: assignment.score,
          maxScore: assignment.maxScore || 100
        }));
        
        setAssignments(transformedAssignments);
      } catch (error) {
        console.error("Error loading assignments:", error);
        toast({
          title: "Error",
          description: "Failed to load course assignments",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAssignments();
  }, [courseId, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Assignments Available</h2>
        <p className="text-muted-foreground mb-6">There are no assignments available for this course yet.</p>
      </div>
    );
  }

  const handleSubmitAssignment = (assignmentId: string) => {
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been submitted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Assignments</h2>
      <p className="text-muted-foreground">Complete assignments to demonstrate your learning</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assignments.map(assignment => (
          <Card key={assignment.id}>
            <CardHeader>
              <CardTitle className="text-xl">{assignment.title}</CardTitle>
              <CardDescription>{assignment.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  Max Score: {assignment.maxScore}
                </Badge>
              </div>
              
              {assignment.status === "completed" && typeof assignment.score === 'number' && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Your score</span>
                    <span className="text-sm font-medium">{assignment.score} / {assignment.maxScore}</span>
                  </div>
                  <Progress value={(assignment.score / assignment.maxScore) * 100} className="h-2" />
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              {assignment.status === "completed" ? (
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <Button variant="outline">
                    View Feedback
                  </Button>
                </div>
              ) : assignment.status === "late" ? (
                <div className="w-full flex items-center justify-between">
                  <Badge variant="destructive">Late</Badge>
                  <Button onClick={() => handleSubmitAssignment(assignment.id)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Late
                  </Button>
                </div>
              ) : (
                <Button className="w-full" onClick={() => handleSubmitAssignment(assignment.id)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Assignment
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseAssignment;
