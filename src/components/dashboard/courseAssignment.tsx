import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchCourseAssignments } from "@/lib/course-data";
import { useToast } from "@/hooks/use-toast";
import { CourseComponentProps } from "@/types";

// Extended the component to accept the courseId prop
const CourseAssignment = ({ courseId }: CourseComponentProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const loadAssignments = async () => {
      if (!courseId) return;

      try {
        setIsLoading(true);
        const data = await fetchCourseAssignments(courseId);
        setAssignments(data.assignments || []);
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
    return <div>Loading assignments...</div>;
  }

  return (
    <div>Course Assignment Component (courseId: {courseId})</div>
  );
};

export default CourseAssignment;
