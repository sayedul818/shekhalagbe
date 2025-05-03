import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Check, 
  Clock, 
  Play, 
  FileText, 
  BookOpen, 
  FileQuestion, 
  MessageSquare, 
  Mic,
  Brain,
  Lock,
  BarChart2,
  BookmarkPlus,
  Bookmark,
  Layers
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { fetchCourseCurriculum } from "@/lib/course-data";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { CourseComponentProps, CurriculumData, LessonItem, CurriculumModule, ContentType, ModuleStatus } from "@/types";

interface ApiSection {
  id: string;
  title: string;
  locked?: boolean;
  completionPercentage?: number;
  items: ApiItem[];
}

interface ApiItem {
  id: string;
  title: string;
  type: string;
  duration?: string;
  completed?: boolean;
  locked?: boolean;
  bookmarked?: boolean;
}

interface ApiCurriculumData {
  sections: ApiSection[];
  progress?: number;
  timeSpent?: string;
  timeRemaining?: string;
}

const CourseCurriculum = ({ courseId }: CourseComponentProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [curriculumData, setCurriculumData] = useState<CurriculumData | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [activeNotes, setActiveNotes] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const loadCurriculum = async () => {
      if (!courseId) return;
      
      try {
        setIsLoading(true);
        const data = await fetchCourseCurriculum(courseId) as ApiCurriculumData;
        
        // Transform API data into our CurriculumData structure
        const transformedData: CurriculumData = {
          modules: data.sections?.map((section) => ({
            id: section.id,
            title: section.title,
            status: section.locked ? "locked" as ModuleStatus : 
                   (section.completionPercentage === 100) ? "completed" as ModuleStatus : "in-progress" as ModuleStatus,
            completionPercentage: section.completionPercentage || 0,
            items: section.items?.map((item) => ({
              id: item.id,
              title: item.title,
              type: mapContentType(item.type),
              duration: item.duration || "10 min",
              status: item.locked ? "locked" : 
                     item.completed ? "completed" : "in-progress",
              completed: item.completed || false,
              isBookmarked: item.bookmarked || false
            })) || []
          })) || [],
          overallProgress: data.progress || 0,
          totalTimeSpent: data.timeSpent || "0h",
          totalTimeRemaining: data.timeRemaining || "0h"
        };
        
        setCurriculumData(transformedData);
        
        // Set first incomplete module as expanded by default
        const firstIncompleteModule = transformedData.modules.find(
          module => module.status === "in-progress"
        );
        
        if (firstIncompleteModule) {
          setExpanded([firstIncompleteModule.id]);
        } else if (transformedData.modules.length > 0) {
          setExpanded([transformedData.modules[0].id]);
        }
        
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
  
  const mapContentType = (type: string): ContentType => {
    const typeMap: Record<string, ContentType> = {
      "video": "video",
      "quiz": "quiz",
      "reading": "reading",
      "assignment": "assignment",
      "live": "live",
      "ai-practice": "ai-practice",
      "lecture": "video",
      "article": "reading",
      "document": "reading",
      "webinar": "live",
      "practice": "ai-practice"
    };
    
    return typeMap[type.toLowerCase()] || "reading";
  };

  const getContentTypeIcon = (type: ContentType, size: number = 16) => {
    switch (type) {
      case "video":
        return <Play size={size} />;
      case "reading":
        return <BookOpen size={size} />;
      case "quiz":
        return <FileQuestion size={size} />;
      case "assignment":
        return <FileText size={size} />;
      case "live":
        return <Mic size={size} />;
      case "ai-practice":
        return <Brain size={size} />;
      default:
        return <FileText size={size} />;
    }
  };

  const getStatusIcon = (status: LessonItem["status"], size: number = 16) => {
    switch (status) {
      case "completed":
        return <Check size={size} className="text-green-500" />;
      case "locked":
        return <Lock size={size} />;
      case "in-progress":
        return <Clock size={size} className="text-blue-500" />;
      default:
        return <Clock size={size} />;
    }
  };

  const handleModuleAccordion = (moduleId: string) => {
    setExpanded(prev => {
      if (prev.includes(moduleId)) {
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const handleMarkComplete = (moduleId: string, lessonId: string) => {
    setCurriculumData(prev => {
      if (!prev) return prev;
      
      // Create a deep copy to avoid direct state mutation
      const updatedModules = prev.modules.map(module => {
        if (module.id === moduleId) {
          const updatedItems = module.items.map(item => {
            if (item.id === lessonId) {
              return { ...item, status: "completed", completed: true };
            }
            return item;
          });
          
          // Calculate new completion percentage
          const totalItems = updatedItems.length;
          const completedItems = updatedItems.filter(item => item.completed).length;
          const newCompletionPercentage = Math.round((completedItems / totalItems) * 100);
          
          return {
            ...module,
            items: updatedItems,
            completionPercentage: newCompletionPercentage,
            status: newCompletionPercentage === 100 ? "completed" as ModuleStatus : "in-progress" as ModuleStatus
          };
        }
        return module;
      });
      
      // Calculate new overall progress
      const totalModules = updatedModules.length;
      const completedModules = updatedModules.reduce(
        (sum, module) => sum + (module.completionPercentage / 100), 
        0
      );
      const newOverallProgress = Math.round((completedModules / totalModules) * 100);
      
      toast({
        title: "Progress Updated",
        description: "Lesson marked as complete",
      });
      
      return {
        ...prev,
        modules: updatedModules,
        overallProgress: newOverallProgress
      };
    });
  };

  const toggleBookmark = (moduleId: string, lessonId: string) => {
    setCurriculumData(prev => {
      if (!prev) return prev;
      
      const updatedModules = prev.modules.map(module => {
        if (module.id === moduleId) {
          const updatedItems = module.items.map(item => {
            if (item.id === lessonId) {
              const newBookmarkStatus = !item.isBookmarked;
              
              toast({
                title: newBookmarkStatus ? "Bookmark Added" : "Bookmark Removed",
                description: `"${item.title}" has been ${newBookmarkStatus ? "bookmarked" : "removed from bookmarks"}`,
              });
              
              return { ...item, isBookmarked: newBookmarkStatus };
            }
            return item;
          });
          
          return { ...module, items: updatedItems };
        }
        return module;
      });
      
      return { ...prev, modules: updatedModules };
    });
  };

  const toggleNotes = (lessonId: string) => {
    setActiveNotes(prev => prev === lessonId ? null : lessonId);
  };

  const handleNoteChange = (lessonId: string, content: string) => {
    setNotes(prev => ({ ...prev, [lessonId]: content }));
  };

  const startLesson = (moduleId: string, lessonId: string) => {
    // Update last accessed
    setCurriculumData(prev => {
      if (!prev) return prev;
      
      const updatedModules = prev.modules.map(module => {
        if (module.id === moduleId) {
          const updatedItems = module.items.map(item => {
            if (item.id === lessonId) {
              return { ...item, lastAccessedAt: new Date().toISOString() };
            }
            return item;
          });
          return { ...module, items: updatedItems };
        }
        return module;
      });
      
      return { ...prev, modules: updatedModules };
    });
    
    // Navigate to the lesson
    navigate(`/dashboard/my-courses/${courseId}/lessons/${lessonId}`);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!curriculumData || curriculumData.modules.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No curriculum available for this course yet.</p>
      </div>
    );
  }
  
  // Find next recommended lesson (first incomplete lesson)
  const nextRecommendedLesson = curriculumData.modules
    .flatMap(module => 
      module.items
        .filter(item => item.status === "in-progress")
        .map(item => ({ ...item, moduleId: module.id }))
    )[0];
  
  // Find bookmarked lessons
  const bookmarkedLessons = curriculumData.modules
    .flatMap(module => 
      module.items
        .filter(item => item.isBookmarked)
        .map(item => ({ ...item, moduleId: module.id }))
    );

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-indigo-100 dark:border-indigo-800/30">
        <CardHeader className="pb-3">
          <CardTitle>Curriculum Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Overall Progress</p>
              <div className="flex items-center mb-1">
                <span className="text-2xl font-bold mr-2">{curriculumData.overallProgress}%</span>
                <Progress value={curriculumData.overallProgress} className="h-2 flex-grow" />
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Time Spent</p>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{curriculumData.totalTimeSpent}</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Estimated Time Remaining</p>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{curriculumData.totalTimeRemaining}</span>
              </div>
            </div>
          </div>
          
          {nextRecommendedLesson && (
            <div className="mt-4 bg-white dark:bg-gray-800 p-3 rounded-md border border-indigo-100 dark:border-indigo-800/50">
              <p className="text-sm font-medium mb-2">Continue Learning</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
                    {getContentTypeIcon(nextRecommendedLesson.type, 20)}
                  </div>
                  <div>
                    <p className="font-medium">{nextRecommendedLesson.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {nextRecommendedLesson.duration}
                    </p>
                  </div>
                </div>
                <Button size="sm" onClick={() => startLesson(nextRecommendedLesson.moduleId, nextRecommendedLesson.id)}>
                  Resume
                </Button>
              </div>
            </div>
          )}
          
          {bookmarkedLessons.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Bookmarked Lessons</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {bookmarkedLessons.slice(0, 2).map(lesson => (
                  <div 
                    key={lesson.id} 
                    className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-md border border-indigo-100 dark:border-indigo-800/50"
                  >
                    <div className="flex items-center">
                      <div className="mr-2 text-amber-500">
                        <Bookmark size={16} />
                      </div>
                      <span className="text-sm truncate max-w-[180px]">{lesson.title}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => startLesson(lesson.moduleId, lesson.id)}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modules Accordion */}
      <div>
        <Accordion type="multiple" value={expanded} className="w-full">
          {curriculumData.modules.map((module) => (
            <AccordionItem value={module.id} key={module.id}>
              <AccordionTrigger 
                onClick={(e) => { 
                  e.preventDefault(); 
                  handleModuleAccordion(module.id);
                }}
                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md data-[state=open]:bg-gray-50 dark:data-[state=open]:bg-gray-800/50"
              >
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center">
                    {module.status === "locked" ? (
                      <div className="mr-3 text-gray-400">
                        <Lock size={18} />
                      </div>
                    ) : module.status === "completed" ? (
                      <div className="mr-3 text-green-500">
                        <Check size={18} />
                      </div>
                    ) : (
                      <div className="mr-3 relative">
                        <div className="h-5 w-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-left">{module.title}</div>
                      <div className="flex items-center mt-1">
                        <Progress value={module.completionPercentage} className="h-1.5 w-24 mr-2" />
                        <span className="text-xs text-muted-foreground">
                          {module.completionPercentage}% complete
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {module.status === "locked" && module.unlockDate && (
                      <Badge variant="outline" className="mr-2">
                        <Clock className="h-3 w-3 mr-1" />
                        Unlocks {new Date(module.unlockDate).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-2">
                <ul className="space-y-2 py-2">
                  {module.items.map((lesson) => (
                    <li key={lesson.id} className="relative">
                      <div 
                        className={`
                          flex flex-col sm:flex-row sm:items-center justify-between
                          p-3 rounded-md transition-colors
                          ${lesson.status === "locked" ? "bg-gray-50 dark:bg-gray-800/50 opacity-75" : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80"}
                          ${lesson.status === "completed" ? "border-l-4 border-green-500" : lesson.status === "in-progress" ? "border-l-4 border-blue-500" : "border-l-4 border-transparent"}
                        `}
                      >
                        <div className="flex items-center mb-2 sm:mb-0">
                          <div className={`
                            p-2 rounded-md mr-3 flex-shrink-0
                            ${getContentTypeColor(lesson.type)}
                          `}>
                            {getContentTypeIcon(lesson.type)}
                          </div>
                          
                          <div>
                            <div className="font-medium flex items-center">
                              {getStatusIcon(lesson.status, 14)}
                              <span className="ml-1.5">{lesson.title}</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {lesson.duration}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => toggleNotes(lesson.id)}
                                  disabled={lesson.status === "locked"}
                                >
                                  <MessageSquare size={14} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Personal Notes</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => toggleBookmark(module.id, lesson.id)}
                                  disabled={lesson.status === "locked"}
                                >
                                  {lesson.isBookmarked ? (
                                    <Bookmark size={14} className="fill-amber-500 text-amber-500" />
                                  ) : (
                                    <BookmarkPlus size={14} />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{lesson.isBookmarked ? "Remove Bookmark" : "Bookmark Lesson"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          {lesson.status !== "locked" && (
                            lesson.status !== "completed" ? (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleMarkComplete(module.id, lesson.id)}
                              >
                                Mark Complete
                              </Button>
                            ) : (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Completed
                              </Badge>
                            )
                          )}
                          
                          <Button 
                            size="sm"
                            disabled={lesson.status === "locked"}
                            onClick={() => startLesson(module.id, lesson.id)}
                          >
                            {lesson.status === "in-progress" && lesson.lastAccessedAt ? "Resume" : "Start"}
                          </Button>
                        </div>

                        {/* Expandable Notes Section */}
                        {activeNotes === lesson.id && (
                          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md w-full">
                            <p className="text-sm font-medium mb-2">My Notes</p>
                            <textarea
                              className="w-full p-2 border rounded-md text-sm"
                              rows={3}
                              placeholder="Add your notes about this lesson..."
                              value={notes[lesson.id] || ""}
                              onChange={(e) => handleNoteChange(lesson.id, e.target.value)}
                            ></textarea>
                            <div className="flex justify-end mt-2">
                              <Button size="sm" variant="outline" onClick={() => toggleNotes(lesson.id)}>
                                Save
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

// Helper function to determine content type color
const getContentTypeColor = (type: ContentType) => {
  switch (type) {
    case "video":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    case "reading":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    case "quiz":
      return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
    case "assignment":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case "live":
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
    case "ai-practice":
      return "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  }
};

export default CourseCurriculum;
