import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Trophy,
  Users,
  BookOpen
} from "lucide-react";
import { Question, ExamSubmission } from "@/types";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

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
    },
    {
      id: "q6",
      examId: "exam1",
      question: "What is the output of: console.log(typeof null)?",
      options: [
        "null",
        "undefined",
        "object",
        "string"
      ],
      correctOption: 2
    },
    {
      id: "q7",
      examId: "exam1",
      question: "Which JavaScript method is used to remove the last element of an array?",
      options: [
        "shift()",
        "pop()",
        "splice()",
        "slice()"
      ],
      correctOption: 1
    },
    {
      id: "q8",
      examId: "exam1",
      question: "What does the 'this' keyword refer to in JavaScript?",
      options: [
        "Always refers to the global object",
        "Depends on how a function is called",
        "Always refers to the function itself",
        "Refers to the nearest parent object"
      ],
      correctOption: 1
    },
    {
      id: "q9",
      examId: "exam1",
      question: "Which of the following is NOT a JavaScript framework or library?",
      options: [
        "React",
        "Angular",
        "Django",
        "Vue"
      ],
      correctOption: 2
    },
    {
      id: "q10",
      examId: "exam1",
      question: "What is the correct way to check if a variable is an array in JavaScript?",
      options: [
        "typeof variable === 'array'",
        "variable instanceof Array",
        "variable.isArray()",
        "Array.isArray(variable)"
      ],
      correctOption: 3
    }
  ]
};

const mockLeaderboard = [
  { name: "Sadia Ahmed", score: 95, timeTaken: 18, rank: 1 },
  { name: "Rahat Khan", score: 90, timeTaken: 22, rank: 2 },
  { name: "Nusrat Jahan", score: 85, timeTaken: 25, rank: 3 },
  { name: "Mehedi Hasan", score: 80, timeTaken: 23, rank: 4 },
  { name: "Tasneem Rahman", score: 75, timeTaken: 20, rank: 5 },
  { name: "Farhan Ahmed", score: 70, timeTaken: 28, rank: 6 },
  { name: "Current User", score: 65, timeTaken: 24, rank: 7 },
];

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(mockExam.timeLimit * 60); // in seconds
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [userScore, setUserScore] = useState({ score: 0, total: 0 });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!examStarted || examSubmitted || showInstructions) return;

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
  }, [examStarted, examSubmitted, showInstructions]);

  const startExam = () => {
    setShowInstructions(false);
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

    console.log("Exam submission:", submission);

    const score = calculateScore(submission);
    setUserScore(score);

    setExamSubmitted(true);
    setShowResults(true);

    toast({
      title: "Exam submitted",
      description: `Your score: ${score.score}/${score.total}`,
    });
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

  const viewLeaderboard = () => {
    setShowResults(false);
    setShowLeaderboard(true);
  };

  const returnToDashboard = () => {
    navigate('/dashboard/exams');
  };

  if (showInstructions && !examStarted) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl">{mockExam.title}</CardTitle>
            <CardDescription className="text-base">{mockExam.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Exam Instructions</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>This exam consists of {mockExam.questions.length} multiple choice questions.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You have {mockExam.timeLimit} minutes to complete the exam.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You can navigate between questions using the numbered buttons or next/previous buttons.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Once you start the exam, the timer will begin and cannot be paused.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>If you don't complete the exam in the given time, it will be automatically submitted.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Make sure you have a stable internet connection before starting.</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-md">
                <Clock className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="font-medium">Time Limit</p>
                  <p className="text-sm text-muted-foreground">{mockExam.timeLimit} minutes</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-md">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="font-medium">Questions</p>
                  <p className="text-sm text-muted-foreground">{mockExam.questions.length} multiple choice</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-md">
                <Trophy className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="font-medium">Passing Score</p>
                  <p className="text-sm text-muted-foreground">70% or higher</p>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Once you start the exam, you must complete it in one session. Make sure you are prepared
                      and have enough time before proceeding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          {/* <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={returnToDashboard}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
            <Button onClick={startExam} className="bg-green-600 hover:bg-green-700">
              Start Exam
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter> */}
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
            <Button
              variant="outline"
              onClick={returnToDashboard}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
            <Button
              onClick={startExam}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            >
              Start Exam
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>

        </Card>
      </div>
    );
  }

  if (examSubmitted && showResults) {
    const percentage = (userScore.score / userScore.total) * 100;
    const isPassed = percentage >= 70;

    return (
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Exam Results</CardTitle>
            <CardDescription>
              {mockExam.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center py-6">
              {isPassed ? (
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-12 w-12 text-red-600" />
                </div>
              )}

              <h2 className="text-3xl font-bold">{percentage.toFixed(0)}%</h2>
              <p className={`text-lg font-medium ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                {isPassed ? 'Passed' : 'Failed'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-1">Score</h3>
                <p className="text-2xl font-bold">{userScore.score}/{userScore.total}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-1">Time Taken</h3>
                <p className="text-2xl font-bold">
                  {formatTime((mockExam.timeLimit * 60) - timeLeft)}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-lg font-medium mb-1">Questions</h3>
                <p className="text-2xl font-bold">
                  {Object.keys(selectedAnswers).length}/{mockExam.questions.length}
                </p>
              </div>
            </div>

            {isPassed ? (
              <div className="bg-green-50 p-6 rounded-md text-center">
                <h3 className="text-xl font-medium text-green-800 mb-2">Congratulations!</h3>
                <p className="text-green-700">
                  You have successfully passed this exam. Keep up the good work!
                </p>
              </div>
            ) : (
              <div className="bg-red-50 p-6 rounded-md text-center">
                <h3 className="text-xl font-medium text-red-800 mb-2">Don't give up!</h3>
                <p className="text-red-700">
                  You didn't pass this time, but you can review the material and try again.
                </p>
              </div>
            )}
          </CardContent>
          {/* <CardFooter className="flex justify-between pt-4">
            <Button variant="outline" onClick={returnToDashboard}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
            <Button onClick={viewLeaderboard}>
              <Trophy className="h-4 w-4 mr-2" />
              View Leaderboard
            </Button>
          </CardFooter> */}
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
            <Button
              variant="outline"
              onClick={returnToDashboard}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
            <Button
              onClick={viewLeaderboard}
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600"
            >
              <Trophy className="h-4 w-4 mr-2" />
              View Leaderboard
            </Button>
          </CardFooter>

        </Card>
      </div>
    );
  }

  if (examSubmitted && showLeaderboard) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center border-b">
            <CardTitle className="text-2xl">Exam Leaderboard</CardTitle>
            <CardDescription>
              {mockExam.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-medium text-gray-600 text-sm">Rank</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-600 text-sm">Student</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-600 text-sm">Score</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-600 text-sm">Time Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaderboard.map((entry, index) => (
                    <tr
                      key={index}
                      className={`
                        border-b 
                        ${entry.name === "Current User" ? "bg-blue-50" : ""} 
                        ${entry.rank <= 3 ? "font-medium" : ""}
                      `}
                    >
                      <td className="px-4 py-3">
                        {entry.rank <= 3 ? (
                          <div className={`
                            flex items-center justify-center w-6 h-6 rounded-full 
                            ${entry.rank === 1 ? "bg-yellow-100 text-yellow-800" :
                              entry.rank === 2 ? "bg-gray-100 text-gray-800" :
                                "bg-amber-100 text-amber-800"}
                          `}>
                            {entry.rank}
                          </div>
                        ) : entry.rank}
                      </td>
                      <td className="px-4 py-3 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2">
                          {entry.name.charAt(0)}
                        </div>
                        {entry.name}
                        {entry.name === "Current User" && (
                          <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">You</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {entry.score}/100
                        <span className="text-xs ml-1 text-gray-500">
                          ({entry.score}%)
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {entry.timeTaken} min
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          {/* <CardFooter className="justify-between pt-4 border-t">
            <Button variant="outline" onClick={() => setShowLeaderboard(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Button>
            <Button onClick={returnToDashboard}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
          </CardFooter> */}
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowLeaderboard(false)}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Button>
            <Button
              onClick={returnToDashboard}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
          </CardFooter>

        </Card>
      </div>
    );
  }

  if (examSubmitted && !showResults && !showLeaderboard) {
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

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* <div className="sticky top-0 bg-background z-10 py-4 px-8 border-b mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-lg font-medium">{mockExam.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span className="mr-4">
                {mockExam.questions.length} Questions
              </span>
              {timeLeft < 300 && (
                <Badge variant="destructive" className="mr-2">
                  Time running out
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center text-lg font-semibold mt-2 sm:mt-0">
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div> */}
      <div className="top-0 z-10 bg-gray-100 border border-gray-300 shadow-lg px-6 py-4 sm:px-10 sm:py-5 mb-6 ">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
              {mockExam.title}
            </h1>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
              <span className="mr-4">
                {mockExam.questions.length} Questions
              </span>
              {timeLeft < 300 && (
                <Badge variant="destructive" className="mr-2">
                  Time running out
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center text-lg font-semibold mt-3 sm:mt-0 text-green-600">
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>


      <div className="space-y-8">
        {mockExam.questions.map((question, questionIndex) => (
          <Card key={question.id} className="relative">
            <CardHeader>
              <CardTitle className="text-lg flex items-start">
                <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  {questionIndex + 1}
                </span>
                <span>{question.question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedAnswers[question.id] === index
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-accent"
                      }`}
                    onClick={() => handleAnswerSelect(question.id, index)}
                  >
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 text-xs font-medium ${selectedAnswers[question.id] === index
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
          </Card>
        ))}
      </div>

      <div className=" bottom-0 bg-background border-t py-4 mt-8">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{Object.keys(selectedAnswers).length}</span> of {mockExam.questions.length} questions answered
          </div>
          <Button
            onClick={submitExam}
            className="bg-green-600 hover:bg-green-700"
          >
            Submit Exam
            <CheckCircle className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <div className="my-4 flex justify-center">
        <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-800 flex items-center max-w-md">
          <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0" />
          <p>
            Your progress is automatically saved. Take your time to review your answers before submitting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TakeExam;
