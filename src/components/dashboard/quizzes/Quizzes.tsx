import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import QuizAttempt from './QuizAttempt';
import Leaderboard from './Leaderboard';
import { useToast } from '@/hooks/use-toast';
import { Clock, Calendar, FileQuestion, AlertTriangle, CheckCircle } from 'lucide-react';
import { CourseComponentProps } from '@/types';

// Mock quiz data
const mockQuizzes = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    timeLimit: 10, // minutes
    totalQuestions: 10,
    status: "upcoming",
    availableFrom: "2025-05-10T10:00:00",
    availableTo: "2025-05-20T23:59:59",
    module: "Module 2: JavaScript Basics"
  },
  {
    id: "2",
    title: "HTML & CSS Quiz",
    description: "Test your knowledge of HTML and CSS",
    timeLimit: 20,
    totalQuestions: 15,
    status: "active",
    availableFrom: "2025-04-25T00:00:00",
    availableTo: "2025-05-10T23:59:59",
    module: "Module 1: Web Fundamentals"
  },
  {
    id: "3",
    title: "React Basics",
    description: "Test your knowledge of React",
    timeLimit: 30,
    totalQuestions: 20,
    status: "completed",
    score: 85,
    completedAt: "2025-04-22T15:30:00",
    availableFrom: "2025-04-15T00:00:00",
    availableTo: "2025-04-25T23:59:59",
    module: "Module 4: React Fundamentals"
  },
  {
    id: "4",
    title: "CSS Advanced",
    description: "Test your knowledge of advanced CSS concepts",
    timeLimit: 15,
    totalQuestions: 12,
    status: "completed",
    score: 92,
    completedAt: "2025-04-18T09:45:00",
    availableFrom: "2025-04-10T00:00:00",
    availableTo: "2025-04-20T23:59:59",
    module: "Module 1: Web Fundamentals"
  }
];

// Mock quiz questions
const mockQuizQuestions = [
  {
    id: "q1",
    question: "What is the correct way to declare a JavaScript variable?",
    options: [
      "var x = 5;",
      "variable x = 5;",
      "x = 5;",
      "declare x = 5;"
    ],
    correctOption: 0
  },
  {
    id: "q2",
    question: "Which of the following is NOT a JavaScript data type?",
    options: [
      "String",
      "Boolean",
      "Character",
      "Object"
    ],
    correctOption: 2
  },
  {
    id: "q3",
    question: "What does the '===' operator do in JavaScript?",
    options: [
      "Checks if values are equal",
      "Checks if values and types are equal",
      "Assigns a value to a variable",
      "Checks if values are not equal"
    ],
    correctOption: 1
  },
  {
    id: "q4",
    question: "Which method adds a new element to the end of an array?",
    options: [
      "push()",
      "pop()",
      "shift()",
      "unshift()"
    ],
    correctOption: 0
  },
  {
    id: "q5",
    question: "What is the correct syntax for a function in JavaScript?",
    options: [
      "function = myFunction() {}",
      "function:myFunction() {}",
      "function myFunction() {}",
      "myFunction(): function {}"
    ],
    correctOption: 2
  }
];

// Mock leaderboard data
const mockLeaderboard = [
  { rank: 1, userId: "user1", userName: "Alice Smith", score: 98, timeTaken: 350, isCurrentUser: false },
  { rank: 2, userId: "user2", userName: "Bob Johnson", score: 95, timeTaken: 380, isCurrentUser: false },
  { rank: 3, userId: "user3", userName: "Charlie Brown", score: 90, timeTaken: 420, isCurrentUser: true },
  { rank: 4, userId: "user4", userName: "Diana Wilson", score: 87, timeTaken: 450, isCurrentUser: false },
  { rank: 5, userId: "user5", userName: "Edward Miller", score: 85, timeTaken: 410, isCurrentUser: false },
  { rank: 6, userId: "user6", userName: "Frank Davis", score: 80, timeTaken: 390, isCurrentUser: false },
  { rank: 7, userId: "user7", userName: "Grace Taylor", score: 78, timeTaken: 480, isCurrentUser: false },
  { rank: 8, userId: "user8", userName: "Hannah Thomas", score: 75, timeTaken: 520, isCurrentUser: false },
  { rank: 9, userId: "user9", userName: "Ian Wilson", score: 70, timeTaken: 500, isCurrentUser: false },
  { rank: 10, userId: "user10", userName: "Julia Roberts", score: 65, timeTaken: 530, isCurrentUser: false }
];

interface QuizzesProps extends CourseComponentProps {}

const Quizzes: React.FC<QuizzesProps> = ({ courseId }) => {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "active" | "completed">("all");
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  const { toast } = useToast();
  
  // Load quizzes
  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setQuizzes(mockQuizzes);
      } catch (error) {
        console.error("Error loading quizzes:", error);
        toast({
          title: "Error",
          description: "Failed to load quizzes. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadQuizzes();
  }, [courseId, toast]);
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Check if quiz is available
  const isQuizAvailable = (quiz) => {
    const now = new Date();
    const availableFrom = new Date(quiz.availableFrom);
    const availableTo = new Date(quiz.availableTo);
    
    return now >= availableFrom && now <= availableTo;
  };
  
  // Filter quizzes based on tab
  const getFilteredQuizzes = () => {
    if (activeTab === "all") return quizzes;
    return quizzes.filter(quiz => quiz.status === activeTab);
  };
  
  // Handle start quiz
  const handleStartQuiz = (quiz) => {
    if (!isQuizAvailable(quiz) && quiz.status === "upcoming") {
      toast({
        title: "Quiz Not Available Yet",
        description: `This quiz will be available from ${formatDate(quiz.availableFrom)}.`,
        variant: "default", // Changed from "warning" to "default"
      });
      return;
    }
    
    setSelectedQuiz(quiz);
    setIsQuizModalOpen(true);
  };
  
  // Handle view results
  const handleViewResults = (quiz) => {
    setSelectedQuiz(quiz);
    setShowLeaderboard(true);
  };
  
  // Handle quiz submission
  const handleQuizSubmit = async (answers) => {
    console.log("Quiz answers submitted:", answers);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly determine correctness for this mock
    const correctAnswers = answers.map(answer => ({
      questionId: answer.questionId,
      selectedOption: answer.selectedOption,
      correctOption: mockQuizQuestions.find(q => q.id === answer.questionId)?.correctOption || 0
    }));
    
    const score = Math.round(correctAnswers.filter(
      a => a.selectedOption === a.correctOption
    ).length / answers.length * 100);
    
    // Update quiz status
    setQuizzes(prevQuizzes => 
      prevQuizzes.map(q => 
        q.id === selectedQuiz.id 
          ? { ...q, status: "completed", score, completedAt: new Date().toISOString() } 
          : q
      )
    );
    
    return {
      score,
      totalQuestions: answers.length,
      correctAnswers
    };
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge and track your progress</p>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">
            All Quizzes
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
          </TabsTrigger>
        </TabsList>
        
        <div className="grid gap-4 md:grid-cols-2">
          {getFilteredQuizzes().map(quiz => (
            <Card key={quiz.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.module}</CardDescription>
                  </div>
                  
                  <Badge variant={
                    quiz.status === "upcoming" ? "outline" :
                    quiz.status === "active" ? "secondary" :
                    "default"
                  }>
                    {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm">{quiz.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <FileQuestion className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{quiz.totalQuestions} questions</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{quiz.timeLimit} minutes</span>
                  </div>
                </div>
                
                {quiz.status === "upcoming" && (
                  <div className="flex items-center space-x-1 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Available from: </span>
                    <span className="font-medium">{formatDate(quiz.availableFrom)}</span>
                  </div>
                )}
                
                {quiz.status === "active" && (
                  <div className="flex items-center space-x-1 text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span>Ends: </span>
                    <span className="font-medium">{formatDate(quiz.availableTo)}</span>
                  </div>
                )}
                
                {quiz.status === "completed" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Your score</span>
                      <span className="font-medium">{quiz.score}%</span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`rounded-full h-full ${
                          quiz.score >= 80 ? 'bg-green-500' : 
                          quiz.score >= 60 ? 'bg-amber-500' : 
                          'bg-red-500'
                        }`} 
                        style={{ width: `${quiz.score}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      {quiz.score >= 80 ? (
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      ) : quiz.score >= 60 ? (
                        <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
                      )}
                      <span>
                        {quiz.score >= 80 ? 'Excellent' : 
                         quiz.score >= 60 ? 'Good' : 
                         'Needs improvement'}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                {quiz.status === "upcoming" && (
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                )}
                
                {quiz.status === "active" && (
                  <Button 
                    className="w-full"
                    onClick={() => handleStartQuiz(quiz)}
                  >
                    Start Quiz
                  </Button>
                )}
                
                {quiz.status === "completed" && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleViewResults(quiz)}
                  >
                    View Results
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {getFilteredQuizzes().length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <FileQuestion className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No quizzes found</h3>
              <p className="text-muted-foreground">
                {activeTab === "upcoming" 
                  ? "There are no upcoming quizzes scheduled at the moment."
                  : activeTab === "active" 
                  ? "There are no active quizzes available right now." 
                  : activeTab === "completed"
                  ? "You haven't completed any quizzes yet."
                  : "There are no quizzes for this course."}
              </p>
            </CardContent>
          </Card>
        )}
      </Tabs>
      
      {showLeaderboard && selectedQuiz && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Leaderboard - {selectedQuiz.title}</h2>
          <Leaderboard 
            entries={mockLeaderboard} 
            quizTitle={selectedQuiz.title}
            currentUserId="user3"
          />
        </div>
      )}
      
      {isQuizModalOpen && selectedQuiz && (
        <QuizAttempt 
          quizId={selectedQuiz.id}
          title={selectedQuiz.title}
          description={selectedQuiz.description}
          timeLimit={selectedQuiz.timeLimit}
          questions={mockQuizQuestions}
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModalOpen(false)}
          onSubmit={handleQuizSubmit}
        />
      )}
    </div>
  );
};

export default Quizzes;
