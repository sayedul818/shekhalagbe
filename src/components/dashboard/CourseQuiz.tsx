
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Clock, FileQuestion, Trophy, CheckCircle } from "lucide-react";
import { fetchCourseQuizzes } from "@/lib/course-data";
import { CourseComponentProps } from "@/types";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  timeLimit: number;
  dueDate?: string;
  status: "completed" | "pending" | "expired";
  score?: number;
}

const CourseQuiz = ({ courseId }: CourseComponentProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  
  useEffect(() => {
    const loadQuizzes = async () => {
      if (!courseId) return;
      
      try {
        setIsLoading(true);
        const data = await fetchCourseQuizzes(courseId);
        
        // Transform the data to match our Quiz interface
        const transformedQuizzes: Quiz[] = data.quizzes.map(quiz => {
          // Create a Quiz object with required properties and default values for missing ones
          return {
            id: quiz.id,
            title: quiz.title,
            description: quiz.description,
            // Use totalQuestions property for the questions count
            questions: quiz.totalQuestions || 0,
            // Convert timeLimit to a number if it's a string
            timeLimit: typeof quiz.timeLimit === 'string' 
              ? parseInt(quiz.timeLimit, 10) 
              : quiz.timeLimit || 0,
            // These properties don't exist in the API response, so provide default values
            status: "pending", // Default to pending
            score: undefined, // Default to undefined
            dueDate: undefined // Default to undefined
          };
        });
        
        setQuizzes(transformedQuizzes);
      } catch (error) {
        console.error("Error loading quizzes:", error);
        toast({
          title: "Error",
          description: "Failed to load course quizzes",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadQuizzes();
  }, [courseId, toast]);
  
  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    toast({
      title: "Quiz Started",
      description: `Starting: ${quiz.title}`,
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }
  
  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileQuestion className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Quizzes Available</h2>
        <p className="text-muted-foreground mb-6">There are no quizzes available for this course yet.</p>
      </div>
    );
  }
  
  if (activeQuiz) {
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">{activeQuiz.title}</CardTitle>
              <CardDescription>{activeQuiz.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {activeQuiz.timeLimit} minutes
              </Badge>
              <Badge variant="outline" className="flex items-center">
                <FileQuestion className="h-3 w-3 mr-1" />
                {activeQuiz.questions} questions
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Sample question */}
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-4">1. Which of the following is NOT a JavaScript data type?</h3>
            <div className="space-y-2">
              <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                <input type="radio" id="q1-opt1" name="q1" className="mr-2" />
                <label htmlFor="q1-opt1">String</label>
              </div>
              <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                <input type="radio" id="q1-opt2" name="q1" className="mr-2" />
                <label htmlFor="q1-opt2">Boolean</label>
              </div>
              <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                <input type="radio" id="q1-opt3" name="q1" className="mr-2" />
                <label htmlFor="q1-opt3">Float</label>
              </div>
              <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                <input type="radio" id="q1-opt4" name="q1" className="mr-2" />
                <label htmlFor="q1-opt4">Symbol</label>
              </div>
            </div>
          </div>
          
          {/* Sample question */}
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-4">2. What does the "===" operator check for in JavaScript?</h3>
            <div className="space-y-2">
              <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                <input type="radio" id="q2-opt1" name="q2" className="mr-2" />
                <label htmlFor="q2-opt1">Value only</label>
              </div>
              <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                <input type="radio" id="q2-opt2" name="q2" className="mr-2" />
                <label htmlFor="q2-opt2">Type only</label>
              </div>
              <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                <input type="radio" id="q2-opt3" name="q2" className="mr-2" />
                <label htmlFor="q2-opt3">Both value and type</label>
              </div>
              <div className="flex items-center p-2 border rounded hover:bg-muted cursor-pointer">
                <input type="radio" id="q2-opt4" name="q2" className="mr-2" />
                <label htmlFor="q2-opt4">None of the above</label>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setActiveQuiz(null)}>Back to Quizzes</Button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Question 1 of {activeQuiz.questions}</span>
            <Button>Submit Quiz</Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Quizzes & Exams</h2>
      <p className="text-muted-foreground">Test your knowledge and track your progress</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quizzes.map(quiz => (
          <Card key={quiz.id}>
            <CardHeader>
              <CardTitle className="text-xl">{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {quiz.timeLimit} minutes
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <FileQuestion className="h-3 w-3 mr-1" />
                  {quiz.questions} questions
                </Badge>
                {quiz.dueDate && (
                  <Badge variant="outline" className="flex items-center">
                    Due: {new Date(quiz.dueDate).toLocaleDateString()}
                  </Badge>
                )}
              </div>
              
              {quiz.status === "completed" && typeof quiz.score === 'number' && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Your score</span>
                    <span className="text-sm font-medium">{quiz.score}%</span>
                  </div>
                  <Progress value={quiz.score} className="h-2" />
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              {quiz.status === "completed" ? (
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <Button variant="outline" onClick={() => handleStartQuiz(quiz)}>
                    Review Quiz
                  </Button>
                </div>
              ) : quiz.status === "expired" ? (
                <div className="w-full text-center text-muted-foreground">
                  This quiz is no longer available
                </div>
              ) : (
                <Button className="w-full" onClick={() => handleStartQuiz(quiz)}>
                  Start Quiz
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseQuiz;
