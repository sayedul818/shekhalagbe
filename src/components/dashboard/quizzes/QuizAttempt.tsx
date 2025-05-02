
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Clock, ChevronLeft, ChevronRight, Save, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption?: number; // Only available after submission
}

interface QuizAttemptProps {
  quizId: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: Question[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (answers: { questionId: string; selectedOption: number }[]) => Promise<{
    score: number;
    totalQuestions: number;
    correctAnswers: { questionId: string; selectedOption: number; correctOption: number }[];
  }>;
}

const QuizAttempt: React.FC<QuizAttemptProps> = ({
  quizId,
  title,
  description,
  timeLimit,
  questions,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; selectedOption: number }[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // convert to seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    totalQuestions: number;
    correctAnswers: { questionId: string; selectedOption: number; correctOption: number }[];
  } | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isQuestionNav, setIsQuestionNav] = useState(false);
  const [mode, setMode] = useState<'one-by-one' | 'scrollable'>('one-by-one');

  const { toast } = useToast();

  // Initialize answers array
  useEffect(() => {
    if (isOpen && questions.length > 0) {
      setAnswers(questions.map(q => ({ questionId: q.id, selectedOption: -1 })));
    }
  }, [isOpen, questions]);

  // Timer effect
  useEffect(() => {
    if (!isOpen || quizSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, quizSubmitted]);

  // Auto-save effect
  useEffect(() => {
    if (!isOpen || quizSubmitted) return;

    const autoSaveTimer = setInterval(() => {
      // In a real app, this would save to backend/localStorage
      console.log('Auto-saving answers:', answers);
      toast({
        title: 'Progress Saved',
        description: 'Your answers have been automatically saved.',
      });
    }, 60000); // Auto-save every minute

    return () => clearInterval(autoSaveTimer);
  }, [isOpen, answers, quizSubmitted, toast]);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = (timeLimit * 60 - timeRemaining) / (timeLimit * 60) * 100;

  // Handle answer selection
  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => 
      prev.map(a => 
        a.questionId === questionId ? { ...a, selectedOption: optionIndex } : a
      )
    );
  };

  // Handle navigation
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setIsQuestionNav(false);
  };

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    // Check if all questions are answered
    const unansweredCount = answers.filter(a => a.selectedOption === -1).length;
    
    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unansweredCount} unanswered question(s). Do you want to submit anyway?`
      );
      
      if (!confirmSubmit) return;
    }
    
    try {
      const quizResults = await onSubmit(answers);
      setResults(quizResults);
      setQuizSubmitted(true);
      setShowResults(true);
      
      toast({
        title: "Quiz Submitted",
        description: `Your score: ${quizResults.score}/${quizResults.totalQuestions}`,
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your quiz. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle time up
  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "Your quiz is being submitted automatically.",
      variant: "destructive",
    });
    
    handleSubmitQuiz();
  };

  // Calculate answered questions
  const answeredCount = answers.filter(a => a.selectedOption !== -1).length;
  
  // Render current question (for one-by-one mode)
  const renderCurrentQuestion = () => {
    const question = questions[currentQuestionIndex];
    
    return (
      <div key={question.id} className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-1">Question {currentQuestionIndex + 1}</h3>
          <p>{question.question}</p>
        </div>
        
        <div className="space-y-2">
          {question.options.map((option, optIndex) => {
            const isSelected = answers.find(a => a.questionId === question.id)?.selectedOption === optIndex;
            
            return (
              <div 
                key={optIndex}
                className={`p-3 border rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-muted transition-colors ${
                  isSelected ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => handleSelectAnswer(question.id, optIndex)}
              >
                <div className={`h-5 w-5 rounded-full border ${
                  isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                } flex items-center justify-center`}>
                  {isSelected && <div className="h-2 w-2 rounded-full bg-background"></div>}
                </div>
                <span>{option}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  // Render all questions (for scrollable mode)
  const renderAllQuestions = () => {
    return questions.map((question, qIndex) => (
      <div key={question.id} className="space-y-4 mb-8 pb-8 border-b last:border-b-0">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-1">Question {qIndex + 1}</h3>
          <p>{question.question}</p>
        </div>
        
        <div className="space-y-2">
          {question.options.map((option, optIndex) => {
            const isSelected = answers.find(a => a.questionId === question.id)?.selectedOption === optIndex;
            
            return (
              <div 
                key={optIndex}
                className={`p-3 border rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-muted transition-colors ${
                  isSelected ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => handleSelectAnswer(question.id, optIndex)}
              >
                <div className={`h-5 w-5 rounded-full border ${
                  isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                } flex items-center justify-center`}>
                  {isSelected && <div className="h-2 w-2 rounded-full bg-background"></div>}
                </div>
                <span>{option}</span>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };
  
  // Render results
  const renderResults = () => {
    if (!results) return null;
    
    const { score, totalQuestions, correctAnswers } = results;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="relative inline-flex">
            <svg className="w-32 h-32">
              <circle 
                cx="64" 
                cy="64" 
                r="60"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="8" 
                className="text-muted opacity-25" 
              />
              <circle 
                cx="64" 
                cy="64" 
                r="60"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="8" 
                className="text-primary" 
                strokeDasharray={`${percentage * 3.8} 1000`}
                transform="rotate(-90 64 64)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
              {percentage}%
            </div>
          </div>
          
          <h3 className="text-xl font-bold mt-4">Your Score</h3>
          <p className="text-lg mb-2">{score} out of {totalQuestions} correct</p>
          
          {percentage >= 70 ? (
            <div className="flex items-center justify-center text-green-600">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Passed</span>
            </div>
          ) : (
            <div className="flex items-center justify-center text-amber-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>Needs improvement</span>
            </div>
          )}
        </div>
        
        <div className="space-y-4 pt-4">
          <h4 className="font-medium border-b pb-2">Question Review</h4>
          
          {questions.map((question, qIndex) => {
            const answer = answers.find(a => a.questionId === question.id);
            const correctAnswer = correctAnswers.find(a => a.questionId === question.id);
            const isCorrect = answer?.selectedOption === correctAnswer?.correctOption;
            
            return (
              <div key={question.id} className={`p-4 border rounded-lg ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium">Question {qIndex + 1}</h5>
                  {isCorrect ? (
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Correct
                    </span>
                  ) : (
                    <span className="text-red-600 text-sm font-medium flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Incorrect
                    </span>
                  )}
                </div>
                
                <p className="mb-3">{question.question}</p>
                
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => {
                    const isSelected = answer?.selectedOption === optIndex;
                    const isCorrectOption = correctAnswer?.correctOption === optIndex;
                    
                    return (
                      <div 
                        key={optIndex}
                        className={`p-2 border rounded-lg ${
                          isCorrectOption 
                            ? 'border-green-500 bg-green-100' 
                            : isSelected 
                              ? 'border-red-500 bg-red-100' 
                              : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-2">{option}</span>
                          {isCorrectOption && (
                            <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                          )}
                          {isSelected && !isCorrectOption && (
                            <AlertTriangle className="h-4 w-4 text-red-600 ml-auto" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[90%] max-w-[95%] max-h-[90vh] overflow-y-auto">
        {!quizSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{title}</span>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{formatTime(timeRemaining)}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setMode(mode === 'one-by-one' ? 'scrollable' : 'one-by-one')}
                  >
                    {mode === 'one-by-one' ? 'View All Questions' : 'One Question Mode'}
                  </Button>
                </div>
              </DialogTitle>
              <DialogDescription>
                {description}
              </DialogDescription>
              <div className="space-y-2 mt-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{answeredCount}/{questions.length} questions answered</span>
                </div>
                <Progress value={(answeredCount / questions.length) * 100} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span>Time</span>
                  <span>{Math.round(progressPercentage)}% elapsed</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </DialogHeader>
            
            <div className="py-4">
              {mode === 'one-by-one' ? (
                <>
                  {renderCurrentQuestion()}
                  
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={goToPrevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => setIsQuestionNav(true)}
                    >
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </Button>
                    
                    {currentQuestionIndex < questions.length - 1 ? (
                      <Button
                        onClick={goToNextQuestion}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmitQuiz}
                      >
                        Submit Quiz
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {renderAllQuestions()}
                </>
              )}
            </div>
            
            <DialogFooter>
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Save className="h-4 w-4 mr-1" />
                  <span>Auto-saving enabled</span>
                </div>
                
                {mode === 'scrollable' && (
                  <Button onClick={handleSubmitQuiz}>
                    Submit Quiz
                  </Button>
                )}
              </div>
            </DialogFooter>
            
            <Sheet open={isQuestionNav} onOpenChange={setIsQuestionNav}>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Question Navigator</SheetTitle>
                  <SheetDescription>
                    Jump to any question. Questions you've answered are highlighted.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid grid-cols-5 gap-2 mt-6">
                  {questions.map((_, index) => {
                    const isAnswered = answers[index]?.selectedOption !== -1;
                    const isCurrent = currentQuestionIndex === index;
                    
                    return (
                      <Button
                        key={index}
                        variant={isAnswered ? "default" : "outline"}
                        size="sm"
                        className={isCurrent ? "ring-2 ring-offset-2 ring-primary" : ""}
                        onClick={() => goToQuestion(index)}
                      >
                        {index + 1}
                      </Button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Quiz Results</DialogTitle>
              <DialogDescription>
                {title} - Completed
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              {renderResults()}
            </div>
            
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizAttempt;
