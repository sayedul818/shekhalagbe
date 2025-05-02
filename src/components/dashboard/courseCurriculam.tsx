import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, PlayCircle, FileText, FileQuestion, Clock } from "lucide-react";
import { fetchCourseCurriculum } from "@/lib/course-data";
import { useToast } from "@/hooks/use-toast";
import { CourseComponentProps } from "@/types";

// Extended the component to accept the courseId prop
const CourseCurriculum = ({ courseId }: CourseComponentProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [curriculum, setCurriculum] = useState([]);
  const [expanded, setExpanded] = React.useState<string | undefined>(undefined);
  
  useEffect(() => {
    const loadCurriculum = async () => {
      if (!courseId) return;
      
      try {
        setIsLoading(true);
        const data = await fetchCourseCurriculum(courseId);
        setCurriculum(data.curriculum || []);
      } catch (error) {
        console.error("Error loading curriculum:", error);
        toast({
          title: "Error",
          description: "Failed to load course curriculum",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCurriculum();
  }, [courseId, toast]);
  
  const handleLessonClick = (lesson) => {
    // Placeholder for lesson click action
    alert(`Clicked lesson: ${lesson.title}`);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Course Curriculum</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {curriculum.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No curriculum available for this course yet.</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {curriculum.map((module) => (
                <AccordionItem value={module.id} key={module.id}>
                  <AccordionTrigger>
                    {module.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <li key={lesson.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            {lesson.completed ? (
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                            ) : (
                              <PlayCircle className="h-4 w-4 mr-2 text-blue-500" />
                            )}
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {lesson.duration}
                            </Badge>
                            <Button variant="secondary" size="sm" onClick={() => handleLessonClick(lesson)}>
                              View
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseCurriculum;
