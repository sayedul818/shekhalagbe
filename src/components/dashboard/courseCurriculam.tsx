import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, PlayCircle, Check, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Quiz } from "@/components/ui/quiz";
import { FileCheck } from "@/components/ui/file-check";
import { fetchCourseCurriculum } from "@/lib/course-data";

// Define interfaces for curriculum data structure
interface CurriculumItem {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "assignment";
  duration?: string;
  completed: boolean;
  questions?: number;
  dueDate?: string;
}

interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  lessons: CurriculumItem[];
  completed?: boolean;
}

const CourseCurriculum = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [curriculumModules, setCurriculumModules] = useState<CurriculumModule[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadCurriculum = async () => {
      if (!courseId) return;
      
      try {
        setIsLoading(true);
        const data = await fetchCourseCurriculum(courseId);
        
        // Transform the data structure to match what the component expects
        const transformedModules = data.sections.map(section => ({
          id: section.id,
          title: section.title,
          description: "", // Add a default description since it's required
          lessons: section.items,
          completed: section.items.every(item => item.completed)
        }));
        
        setCurriculumModules(transformedModules);
      } catch (error) {
        console.error("Error loading curriculum data:", error);
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

  const totalLessons = curriculumModules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = curriculumModules.reduce((acc, module) => {
    return acc + module.lessons.filter(lesson => lesson.completed).length;
  }, 0);
  const progressPercentage = totalLessons > 0 ? Math.floor((completedLessons / totalLessons) * 100) : 0;

  const handleModuleToggle = (moduleId: string) => {
    if (activeModuleId === moduleId) {
      setActiveModuleId(null);
    } else {
      setActiveModuleId(moduleId);
    }
  };

  const handleVideoPlay = (lesson: any) => {
    setSelectedVideo(lesson);
    setVideoDialogOpen(true);
    
    toast({
      title: "Video Player",
      description: `Playing: ${lesson.title}`,
    });
  };

  const handleLessonAccess = (lesson: any) => {
    if (lesson.type === "video") {
      handleVideoPlay(lesson);
    } else if (lesson.type === "quiz") {
      navigate(`/course/${courseId}/quiz?lessonId=${lesson.id}`);
    } else if (lesson.type === "assignment") {
      navigate(`/course/${courseId}/assignment?lessonId=${lesson.id}`);
    } else {
      toast({
        title: "Content Access",
        description: `Opening: ${lesson.title}`,
      });
    }
  };

  const handleMarkAsComplete = (lessonId: string) => {
    toast({
      title: "Progress Updated",
      description: "Lesson marked as complete",
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
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Course Curriculum</h1>
            <p className="text-muted-foreground">
              Track your progress through the course materials
            </p>
          </div>
          <div className="w-full md:w-48">
            <div className="text-sm mb-1 flex justify-between">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {curriculumModules.map((module) => (
          <Card key={module.id} className={module.completed ? "border-green-200" : ""}>
            <CardHeader 
              className="cursor-pointer flex flex-row items-center justify-between"
              onClick={() => handleModuleToggle(module.id)}
            >
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {module.completed && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Completed
                  </span>
                )}
                <Button variant="ghost" size="sm">
                  {activeModuleId === module.id ? "Collapse" : "Expand"}
                </Button>
              </div>
            </CardHeader>

            {activeModuleId === module.id && (
              <CardContent>
                <div className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className={`p-3 rounded-md border flex items-center justify-between ${lesson.completed ? 'bg-gray-50 border-green-200' : ''}`}
                    >
                      <div className="flex items-center">
                        {lesson.type === 'video' && <PlayCircle className="h-5 w-5 mr-3 text-blue-500" />}
                        {lesson.type === 'reading' && <FileText className="h-5 w-5 mr-3 text-orange-500" />}
                        {lesson.type === 'quiz' && <Quiz className="h-5 w-5 mr-3 text-purple-500" />}
                        {lesson.type === 'assignment' && <FileCheck className="h-5 w-5 mr-3 text-green-500" />}
                        
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span className="capitalize">{lesson.type}</span>
                            {lesson.duration && <span className="mx-2">•</span>}
                            {lesson.duration && <span>{lesson.duration}</span>}
                            {lesson.questions && <span className="mx-2">•</span>}
                            {lesson.questions && <span>{lesson.questions} questions</span>}
                            {lesson.dueDate && <span className="mx-2">•</span>}
                            {lesson.dueDate && <span>Due: {new Date(lesson.dueDate).toLocaleDateString()}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {lesson.completed ? (
                          <span className="text-xs text-green-600 flex items-center">
                            <Check className="h-4 w-4 mr-1" />
                            Completed
                          </span>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMarkAsComplete(lesson.id)}
                          >
                            Mark Complete
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          onClick={() => handleLessonAccess(lesson)}
                        >
                          {lesson.completed ? "Review" : "Start"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <DialogDescription>
              Duration: {selectedVideo?.duration}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-center">
              <PlayCircle className="h-16 w-16 mx-auto text-primary opacity-70" />
              <p className="mt-4 text-muted-foreground">Video Player Would Appear Here</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseCurriculum;
