import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, PlayCircle, Check, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Quiz } from "@/components/ui/quiz";
import { FileCheck } from "@/components/ui/file-check";

const CourseCurriculum = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  // Mock curriculum data
  const curriculumModules = [
  {
    id: "m1",
    title: "Introduction to the Course",
    description: "Get started with the fundamentals",
    completed: true,
    lessons: [
      { 
        id: "l1", 
        type: "video", 
        title: "Course Overview", 
        duration: "10:30", 
        completed: true,
        videoUrl: "https://example.com/video1"
      },
      { 
        id: "l2", 
        type: "reading", 
        title: "Course Materials Introduction", 
        duration: "15 mins read", 
        completed: true 
      }
    ]
  },
  {
    id: "m2",
    title: "Core Concepts",
    description: "Learn the essential concepts",
    completed: true,
    lessons: [
      { 
        id: "l3", 
        type: "video", 
        title: "Understanding Variables", 
        duration: "18:45", 
        completed: true,
        videoUrl: "https://example.com/video2"
      },
      { 
        id: "l4", 
        type: "quiz", 
        title: "Variables Quiz", 
        questions: 5, 
        completed: true 
      },
      { 
        id: "l5", 
        type: "video", 
        title: "Data Types Explained", 
        duration: "22:10", 
        completed: true,
        videoUrl: "https://example.com/video3"
      }
    ]
  },
  {
    id: "m3",
    title: "Advanced Topics",
    description: "Dive deeper into complex subjects",
    completed: false,
    lessons: [
      { 
        id: "l6", 
        type: "video", 
        title: "Functions and Scope", 
        duration: "24:30", 
        completed: true,
        videoUrl: "https://example.com/video4"
      },
      { 
        id: "l7", 
        type: "reading", 
        title: "Advanced Techniques", 
        duration: "25 mins read", 
        completed: false 
      },
      { 
        id: "l8", 
        type: "video", 
        title: "Project Structure", 
        duration: "15:45", 
        completed: false,
        videoUrl: "https://example.com/video5"
      },
      { 
        id: "l9", 
        type: "assignment", 
        title: "Hands-on Project", 
        dueDate: "2025-05-15", 
        completed: false 
      }
    ]
  },
  {
    id: "m4",
    title: "Project Planning",
    description: "Learn how to plan and structure real-world projects",
    completed: false,
    lessons: [
      {
        id: "l10",
        type: "reading",
        title: "Planning a Software Project",
        duration: "20 mins read",
        completed: false
      },
      {
        id: "l11",
        type: "assignment",
        title: "Write a Project Proposal",
        dueDate: "2025-05-18",
        completed: false
      }
    ]
  },
  {
    id: "m5",
    title: "Team Collaboration",
    description: "Understand how to work in teams effectively",
    completed: false,
    lessons: [
      {
        id: "l12",
        type: "video",
        title: "Effective Communication in Teams",
        duration: "12:20",
        completed: false,
        videoUrl: "https://example.com/video6"
      },
      {
        id: "l13",
        type: "discussion",
        title: "Share your team experience",
        prompt: "Post your thoughts on collaborating in teams",
        completed: false
      }
    ]
  },
  {
    id: "m6",
    title: "Debugging & Troubleshooting",
    description: "Master the skills of finding and fixing bugs",
    completed: false,
    lessons: [
      {
        id: "l14",
        type: "video",
        title: "Debugging in JavaScript",
        duration: "16:10",
        completed: false,
        videoUrl: "https://example.com/video7"
      },
      {
        id: "l15",
        type: "quiz",
        title: "Debugging Quiz",
        questions: 7,
        completed: false
      }
    ]
  },
  {
    id: "m7",
    title: "Version Control with Git",
    description: "Track and manage changes in your codebase",
    completed: false,
    lessons: [
      {
        id: "l16",
        type: "video",
        title: "Git Basics",
        duration: "14:05",
        completed: false,
        videoUrl: "https://example.com/video8"
      },
      {
        id: "l17",
        type: "coding-challenge",
        title: "Git Workflow Practice",
        challengeLink: "https://example.com/git-challenge",
        completed: false
      }
    ]
  },
  {
    id: "m8",
    title: "Final Project",
    description: "Apply everything you’ve learned in a capstone project",
    completed: false,
    lessons: [
      {
        id: "l18",
        type: "project",
        title: "Build a Mini App",
        description: "Use HTML, CSS, JS, and Git to complete your own project",
        dueDate: "2025-06-01",
        completed: false
      },
      {
        id: "l19",
        type: "video",
        title: "Capstone Project Walkthrough",
        duration: "30:00",
        completed: false,
        videoUrl: "https://example.com/video9"
      }
    ]
  }
];

  const totalLessons = curriculumModules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = curriculumModules.reduce((acc, module) => {
    return acc + module.lessons.filter(lesson => lesson.completed).length;
  }, 0);
  const progressPercentage = Math.floor((completedLessons / totalLessons) * 100);

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
