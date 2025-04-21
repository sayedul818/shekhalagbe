import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { Quiz } from "@/components/ui/quiz";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

const CourseQuiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("lessonId");
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  const quizData = {
    id: "q1",
    title: "JavaScript Fundamentals Quiz",
    description: "Test your knowledge of JavaScript basics",
    timeLimit: "30 minutes",
    passingScore: 70,
    totalQuestions: 10,
    questions: [
      {
        id: 1,
        text: "Which of the following is not a JavaScript data type?",
        options: [
          "String",
          "Number",
          "Boolean",
          "Character"
        ],
        correctAnswer: 3
      },
      {
        id: 2,
        text: "What does the '===' operator do in JavaScript?",
        options: [
          "Assigns a value",
          "Compares values only",
          "Compares values and data types",
          "None of the above"
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        text: "Which method adds an element to the end of an array?",
        options: [
          "push()",
          "pop()",
          "unshift()",
          "shift()"
        ],
        correctAnswer: 0
      },
      {
        id: 4,
        text: "What does 'DOM' stand for?",
        options: [
          "Document Object Model",
          "Data Object Model",
          "Document Oriented Model",
          "Digital Object Model"
        ],
        correctAnswer: 0
      },
      {
        id: 5,
        text: "Which statement is used to terminate a loop in JavaScript?",
        options: [
          "stop",
          "exit",
          "break",
          "return"
        ],
        correctAnswer: 2
      }
    ]
  };

  const formatTimeRemaining = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculateResults = () => {
    let correctCount = 0;
    quizData.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const scorePercentage = Math.round((correctCount / quizData.questions.length) * 100);
    const passed = scorePercentage >= quizData.passingScore;
    
    return {
      score: scorePercentage,
      correctAnswers: correctCount,
      totalQuestions: quizData.questions.length,
      passed
    };
  };

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setConfirmSubmitOpen(false);
    setQuizCompleted(true);
    setShowResults(true);
    
    const results = calculateResults();
    
    toast({
      title: results.passed ? "Quiz Passed!" : "Quiz Completed",
      description: `You scored ${results.score}% (${results.correctAnswers}/${results.totalQuestions})`,
      variant: results.passed ? "default" : "destructive",
    });
  };

  const progressPercentage = Math.round(((currentQuestion + 1) / quizData.questions.length) * 100);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center">
              <Quiz className="h-6 w-6 mr-2 text-primary" />
              {quizData.title}
            </h1>
            <p className="text-muted-foreground">{quizData.description}</p>
          </div>
          
          {!quizCompleted && (
            <div className="bg-amber-50 px-4 py-2 rounded-md border border-amber-200 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-amber-500" />
              <div>
                <p className="text-sm font-medium">Time Remaining</p>
                <p className="text-amber-600 font-mono text-lg">{formatTimeRemaining(timeLeft)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {!showResults ? (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">
                Question {currentQuestion + 1} of {quizData.questions.length}
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                {selectedAnswers[currentQuestion] !== undefined ? "Answered" : "Not answered"}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            <h3 className="text-xl font-medium">
              {quizData.questions[currentQuestion].text}
            </h3>
            
            <div className="space-y-3">
              {quizData.questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-md cursor-pointer transition-colors ${
                    selectedAnswers[currentQuestion] === index 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectAnswer(index)}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      selectedAnswers[currentQuestion] === index 
                        ? 'bg-primary text-white' 
                        : 'border border-gray-300'
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
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentQuestion === quizData.questions.length - 1 ? (
                <Button 
                  onClick={() => setConfirmSubmitOpen(true)}
                  disabled={Object.keys(selectedAnswers).length < quizData.questions.length}
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>Next</Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Quiz Results</CardTitle>
            <CardDescription>See how you performed</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {(() => {
              const results = calculateResults();
              return (
                <div>
                  <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 rounded-full border-8 flex items-center justify-center font-bold text-3xl relative">
                      {results.score}%
                      {results.passed && (
                        <CheckCircle className="absolute -top-2 -right-2 h-10 w-10 text-green-500 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">
                      {results.passed ? 'Congratulations!' : 'Quiz Completed'}
                    </h3>
                    <p className="text-muted-foreground">
                      You answered {results.correctAnswers} out of {results.totalQuestions} questions correctly.
                    </p>
                    {results.passed ? (
                      <div className="mt-2 text-green-600">
                        You passed the quiz!
                      </div>
                    ) : (
                      <div className="mt-2 text-amber-600">
                        You need {quizData.passingScore}% to pass. Try again!
                      </div>
                    )}
                  </div>
                  
                  <h4 className="font-medium text-lg mb-3">Question Summary</h4>
                  <div className="space-y-2">
                    {quizData.questions.map((question, index) => {
                      const isCorrect = selectedAnswers[index] === question.correctAnswer;
                      return (
                        <div 
                          key={index}
                          className={`p-3 border rounded-md ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                        >
                          <div className="flex items-start">
                            <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 ${
                              isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}>
                              {isCorrect ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <span>✗</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{question.text}</p>
                              <p className="text-sm mt-1">
                                <span className="font-medium">Your answer: </span>
                                {question.options[selectedAnswers[index] ?? -1] || 'No answer'}
                              </p>
                              {!isCorrect && (
                                <p className="text-sm mt-1 text-green-700">
                                  <span className="font-medium">Correct answer: </span>
                                  {question.options[question.correctAnswer]}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back to Course
            </Button>
            <Button onClick={() => {
              setShowResults(false);
              setQuizCompleted(false);
              setSelectedAnswers({});
              setCurrentQuestion(0);
              
              toast({
                title: "Quiz Reset",
                description: "You can now retake the quiz",
              });
            }}>
              Retry Quiz
            </Button>
          </CardFooter>
        </Card>
      )}

      {!quizCompleted && (
        <div className="bg-gray-50 p-4 rounded-md border">
          <h3 className="font-medium mb-2">Quiz Navigation</h3>
          <div className="flex flex-wrap gap-2">
            {quizData.questions.map((_, index) => (
              <Button
                key={index}
                variant={currentQuestion === index ? "default" : selectedAnswers[index] !== undefined ? "outline" : "ghost"}
                size="sm"
                className={`w-10 h-10 p-0 ${selectedAnswers[index] !== undefined ? 'border-primary' : ''}`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Dialog open={confirmSubmitOpen} onOpenChange={setConfirmSubmitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Quiz</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your answers? You cannot change your answers after submission.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-2 font-medium">Quiz Summary:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Total questions: {quizData.questions.length}</li>
              <li>• Answered questions: {Object.keys(selectedAnswers).length}</li>
              <li>• Unanswered questions: {quizData.questions.length - Object.keys(selectedAnswers).length}</li>
            </ul>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmSubmitOpen(false)}>
              Review Answers
            </Button>
            <Button onClick={handleSubmitQuiz}>
              Submit Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseQuiz;