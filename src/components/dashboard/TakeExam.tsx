
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Clock, ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { Question, ExamSubmission } from "@/types";

// This would typically come from an API
const mockExam = {
  id: "exam1",
  title: "JavaScript Fundamentals - Final Exam",
  description: "This exam covers basic JavaScript concepts and syntax",
  timeLimit: 30, // in minutes
  startDate: "2025-04-01T10:00:00Z",
  endDate: "2025-04-30T23:59:59Z",
  questions: [
    {
      id: "q1",
      examId: "exam1",
      question: "What is JavaScript?",
      options: [
        "A markup language",
        "A programming language",
        "A database",
        "An operating system"
      ],
      correctOption: 1
    },
    {
      id: "q2",
      examId: "exam1",
      question: "Which of the following is a JavaScript data type?",
      options: [
        "Integer",
        "Character",
        "Boolean",
        "Double"
      ],
      correctOption: 2
    },
    {
      id: "q3",
      examId: "exam1",
      question: "What does the '===' operator do in JavaScript?",
      options: [
        "Assigns a value",
        "Compares values only",
        "Compares values and types",
        "Concatenates strings"
      ],
      correctOption: 2
    },
    {
      id: "q4",
      examId: "exam1",
      question: "What is a closure in JavaScript?",
      options: [
        "A way to secure your code",
        "A function having access to variables in its outer scope",
        "A way to close browser windows",
        "A method to end a loop"
      ],
      correctOption: 1
    },
    {
      id: "q5",
      examId: "exam1",
      question: "Which method adds a new item at the end of an array?",
      options: [
        "push()",
        "pop()",
        "shift()",
        "unshift()"
      ],
      correctOption: 0
    }
  ]
};

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(mockExam.timeLimit * 60); // in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start the exam timer
  useEffect(() => {
    if (!examStarted || examSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [examStarted, examSubmitted]);
  
  const startExam = () => {
    setExamStarted(true);
    toast({
      title: "Exam started",
      description: `You have ${mockExam.timeLimit} minutes to complete the exam`,
    });
  };
  
  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };
  
  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < mockExam.questions.length) {
      setCurrentQuestion(index);
    }
  };
  
  const submitExam = () => {
    const timeTaken = mockExam.timeLimit * 60 - timeLeft;
    
    const submission: ExamSubmission = {
      examId: mockExam.id,
      answers: Object.entries(selectedAnswers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption
      })),
      timeTaken
    };
    
    // In a real app, this would be sent to a backend
    console.log("Exam submission:", submission);
    
    // Calculate score
    const score = calculateScore(submission);
    
    setExamSubmitted(true);
    
    toast({
      title: "Exam submitted",
      description: `Your score: ${score.score}/${score.total}`,
    });
    
    // Navigate to results page
    setTimeout(() => {
      navigate('/dashboard/exams');
    }, 2000);
  };
  
  const calculateScore = (submission: ExamSubmission) => {
    let correct = 0;
    
    submission.answers.forEach(answer => {
      const question = mockExam.questions.find(q => q.id === answer.questionId);
      if (question && question.correctOption === answer.selectedOption) {
        correct++;
      }
    });
    
    return {
      score: correct,
      total: mockExam.questions.length
    };
  };
  
  // If exam hasn't started yet
  if (!examStarted) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>{mockExam.title}</CardTitle>
            <CardDescription>{mockExam.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Time Limit</span>
              </div>
              <span>{mockExam.timeLimit} minutes</span>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Questions</span>
              </div>
              <span>{mockExam.questions.length} multiple choice questions</span>
            </div>
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Once you start the exam, the timer will begin and cannot be paused. Make sure you have a stable internet connection and enough time to complete the exam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={startExam} className="w-full">Start Exam</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // If exam is submitted
  if (examSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Exam Submitted</CardTitle>
            <CardDescription>Your exam has been successfully submitted</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Thank you!</h3>
            <p className="text-muted-foreground mb-4">
              Your exam has been recorded. You will be redirected to the exams page shortly.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Exam in progress
  const question = mockExam.questions[currentQuestion];
  
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="sticky top-0 bg-background z-10 py-4 border-b mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-medium">{mockExam.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span className="mr-4">
                Question {currentQuestion + 1} of {mockExam.questions.length}
              </span>
              {timeLeft < 300 && (
                <Badge variant="destructive" className="mr-2">
                  Time running out
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center text-lg font-semibold">
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="flex mt-4 overflow-x-auto pb-2 scrollbar-none">
          {mockExam.questions.map((_, index) => (
            <Button
              key={index}
              variant={currentQuestion === index ? "default" : selectedAnswers[_.id] !== undefined ? "secondary" : "outline"}
              size="sm"
              className="mr-2 min-w-[40px]"
              onClick={() => navigateToQuestion(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Question {currentQuestion + 1}
          </CardTitle>
          <CardDescription className="text-base font-medium text-foreground mt-2">
            {question.question}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedAnswers[question.id] === index
                    ? "bg-primary/10 border-primary"
                    : "hover:bg-accent"
                }`}
                onClick={() => handleAnswerSelect(question.id, index)}
              >
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 text-xs font-medium ${
                    selectedAnswers[question.id] === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigateToQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          {currentQuestion < mockExam.questions.length - 1 ? (
            <Button
              onClick={() => navigateToQuestion(currentQuestion + 1)}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={submitExam}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Exam
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TakeExam;
