
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileQuestion, Clock, Users, Calendar, Edit, Trash2, Eye, Plus, ChevronDown, ChevronRight, BarChart2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

type QuizType = "mcq" | "true-false" | "short-answer" | "mixed";
type DifficultyLevel = "easy" | "medium" | "hard";

interface Question {
  id: string;
  text: string;
  type: "mcq" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer?: string | number | boolean;
  description?: string;
}

interface Quiz {
  id: string;
  title: string;
  moduleId?: string;
  moduleName?: string;
  questionCount: number;
  timeLimit: number;
  dueDate?: string;
  type: QuizType;
  difficulty: DifficultyLevel;
  autoGraded: boolean;
  passScore: number;
  questions: Question[];
  submissionCount: number;
  averageScore?: number;
  description?: string;
}

const initialQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "JavaScript Basics Quiz",
    moduleId: "section-1",
    moduleName: "Introduction to JavaScript",
    questionCount: 10,
    timeLimit: 20,
    dueDate: "2023-05-30",
    type: "mcq",
    difficulty: "easy",
    autoGraded: true,
    passScore: 70,
    questions: [],
    submissionCount: 25,
    averageScore: 82
  },
  {
    id: "quiz-2",
    title: "Functions and Objects Assessment",
    moduleId: "section-2",
    moduleName: "Functions and Objects",
    questionCount: 15,
    timeLimit: 30,
    dueDate: "2023-06-15",
    type: "mixed",
    difficulty: "medium",
    autoGraded: true,
    passScore: 65,
    questions: [],
    submissionCount: 18,
    averageScore: 75
  },
  {
    id: "quiz-3",
    title: "Final Course Exam",
    questionCount: 30,
    timeLimit: 60,
    dueDate: "2023-07-01",
    type: "mixed",
    difficulty: "hard",
    autoGraded: false,
    passScore: 60,
    questions: [],
    submissionCount: 12,
    averageScore: 68
  }
];

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-amber-100 text-amber-800",
  hard: "bg-red-100 text-red-800"
};

const quizTypeColors = {
  mcq: "bg-blue-100 text-blue-800",
  "true-false": "bg-purple-100 text-purple-800",
  "short-answer": "bg-indigo-100 text-indigo-800",
  mixed: "bg-violet-100 text-violet-800"
};

export default function QuizzesManager() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isViewSubmissionsOpen, setIsViewSubmissionsOpen] = useState(false);
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    id: "",
    text: "",
    type: "mcq",
    options: ["", "", "", ""],
    correctAnswer: 0
  });
  const [newQuiz, setNewQuiz] = useState<Partial<Quiz>>({
    title: "",
    questionCount: 0,
    timeLimit: 15,
    type: "mcq",
    difficulty: "medium",
    autoGraded: true,
    passScore: 70,
    questions: [],
    submissionCount: 0,
    description: ""
  });

  const { toast } = useToast();
  
  // Sample submission data
  const sampleSubmissions = [
    { id: "1", studentName: "Alice Johnson", score: 92, timeTaken: "8:45", submittedAt: "2025-05-02" },
    { id: "2", studentName: "Bob Smith", score: 78, timeTaken: "12:30", submittedAt: "2025-05-01" },
    { id: "3", studentName: "Charlie Brown", score: 85, timeTaken: "9:20", submittedAt: "2025-05-02" },
    { id: "4", studentName: "Diana Prince", score: 96, timeTaken: "7:15", submittedAt: "2025-05-03" },
    { id: "5", studentName: "Edward Miller", score: 65, timeTaken: "14:50", submittedAt: "2025-05-03" },
  ];
  
  const handleDelete = (quizId: string) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
    toast({
      title: "Quiz Deleted",
      description: "The quiz has been successfully deleted",
    });
  };
  
  const handleCreateQuiz = () => {
    setIsCreateQuizOpen(true);
  };

  const handleQuizSubmit = () => {
    if (!newQuiz.title) {
      toast({
        title: "Missing Information",
        description: "Please provide a quiz title",
        variant: "destructive",
      });
      return;
    }

    const quiz: Quiz = {
      id: `quiz-${quizzes.length + 1}`,
      title: newQuiz.title as string,
      questionCount: 0,
      timeLimit: newQuiz.timeLimit || 15,
      dueDate: newQuiz.dueDate,
      type: newQuiz.type as QuizType || "mcq",
      difficulty: newQuiz.difficulty as DifficultyLevel || "medium",
      autoGraded: newQuiz.autoGraded !== undefined ? newQuiz.autoGraded : true,
      passScore: newQuiz.passScore || 70,
      questions: [],
      submissionCount: 0,
      description: newQuiz.description
    };

    setQuizzes([...quizzes, quiz]);
    setExpandedQuiz(quiz.id);
    setIsCreateQuizOpen(false);
    setNewQuiz({
      title: "",
      questionCount: 0,
      timeLimit: 15,
      type: "mcq",
      difficulty: "medium",
      autoGraded: true,
      passScore: 70,
      questions: [],
      submissionCount: 0,
      description: ""
    });
    
    toast({
      title: "Success",
      description: "Quiz has been created successfully",
    });
  };
  
  const handleAddQuestion = (quizId: string) => {
    setSelectedQuiz(quizzes.find(q => q.id === quizId) || null);
    setIsAddQuestionOpen(true);
  };
  
  const handleQuestionSubmit = () => {
    if (!selectedQuiz || !newQuestion.text || (newQuestion.type === "mcq" && (!newQuestion.options || newQuestion.options.some(opt => !opt)))) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const questionId = `q-${Date.now()}`;
    const question: Question = {
      id: questionId,
      text: newQuestion.text,
      type: newQuestion.type as "mcq" | "true-false" | "short-answer",
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer
    };
    
    setQuizzes(prevQuizzes => prevQuizzes.map(quiz => {
      if (quiz.id === selectedQuiz.id) {
        const updatedQuestions = [...quiz.questions, question];
        return {...quiz, questions: updatedQuestions, questionCount: updatedQuestions.length};
      }
      return quiz;
    }));
    
    setIsAddQuestionOpen(false);
    setNewQuestion({
      id: "",
      text: "",
      type: "mcq",
      options: ["", "", "", ""],
      correctAnswer: 0
    });
    
    toast({
      title: "Success",
      description: "Question added successfully",
    });
  };
  
  const handlePreviewQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsPreviewOpen(true);
  };
  
  const handleViewSubmissions = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsViewSubmissionsOpen(true);
  };
  
  const getFilteredQuizzes = () => {
    if (activeTab === "all") return quizzes;
    if (activeTab === "mcq") return quizzes.filter(quiz => quiz.type === "mcq");
    if (activeTab === "mixed") return quizzes.filter(quiz => quiz.type === "mixed");
    return [];
  };
  
  const filteredQuizzes = getFilteredQuizzes();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Quizzes & Assessments</CardTitle>
            <CardDescription>Create and manage quizzes and assessments</CardDescription>
          </div>
          <Button onClick={handleCreateQuiz}>
            <FileQuestion className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Quizzes</TabsTrigger>
            <TabsTrigger value="mcq">Multiple Choice</TabsTrigger>
            <TabsTrigger value="mixed">Mixed Type</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="space-y-4">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map(quiz => (
              <div key={quiz.id} className="border rounded-md overflow-hidden">
                <div 
                  className="p-4 bg-gray-50 cursor-pointer"
                  onClick={() => setExpandedQuiz(expandedQuiz === quiz.id ? null : quiz.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <FileQuestion className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">{quiz.title}</h3>
                        {quiz.moduleName && (
                          <p className="text-sm text-muted-foreground">
                            Module: {quiz.moduleName}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={quizTypeColors[quiz.type]}>
                        {quiz.type === "mcq" ? "Multiple Choice" : 
                        quiz.type === "true-false" ? "True/False" : 
                        quiz.type === "short-answer" ? "Short Answer" : "Mixed"}
                      </Badge>
                      <Badge className={difficultyColors[quiz.difficulty]}>
                        {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                      </Badge>
                      <Badge className={quiz.autoGraded ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                        {quiz.autoGraded ? "Auto-graded" : "Manual Review"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(quiz.id);
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {expandedQuiz === quiz.id ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
                
                {expandedQuiz === quiz.id && (
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Quiz Details</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Questions</p>
                            <p className="font-medium">{quiz.questionCount}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Time Limit</p>
                            <p className="font-medium">{quiz.timeLimit} minutes</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Pass Score</p>
                            <p className="font-medium">{quiz.passScore}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Due Date</p>
                            <p className="font-medium">{quiz.dueDate || "Not set"}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 gap-2">
                          <Button size="sm" variant="outline" onClick={() => handlePreviewQuiz(quiz)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" onClick={() => handleAddQuestion(quiz.id)}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add Questions
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Student Performance</h4>
                        {quiz.submissionCount > 0 ? (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-sm text-muted-foreground">Submissions</p>
                                <p className="font-medium flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {quiz.submissionCount} students
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Average Score</p>
                                <p className="font-medium">{quiz.averageScore}%</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Score Distribution</p>
                              <Progress value={quiz.averageScore || 0} className="h-2" />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>0%</span>
                                <span>Pass: {quiz.passScore}%</span>
                                <span>100%</span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              onClick={() => handleViewSubmissions(quiz)}
                            >
                              <Users className="h-4 w-4 mr-1" />
                              View All Submissions
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="w-full"
                            >
                              <BarChart2 className="h-4 w-4 mr-1" />
                              View Detailed Analytics
                            </Button>
                          </>
                        ) : (
                          <div className="text-center py-4 text-muted-foreground">
                            No submissions yet
                          </div>
                        )}
                      </div>
                    </div>

                    {quiz.questionCount > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-3">Quiz Questions ({quiz.questionCount})</h4>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                          {quiz.questions.map((question, index) => (
                            <div key={question.id} className="border rounded-md p-3 bg-gray-50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">Question {index + 1}</div>
                                  <p className="text-sm">{question.text}</p>
                                  
                                  {question.type === "mcq" && question.options && (
                                    <div className="mt-2 ml-4 space-y-1">
                                      {question.options.map((option, i) => (
                                        <div 
                                          key={i} 
                                          className={`text-xs px-2 py-1 rounded ${
                                            question.correctAnswer === i ? 'bg-green-100 text-green-800' : ''
                                          }`}
                                        >
                                          {String.fromCharCode(65 + i)}. {option}
                                          {question.correctAnswer === i && " ✓"}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <Badge>
                                  {question.type === "mcq" ? "Multiple Choice" : 
                                   question.type === "true-false" ? "True/False" : 
                                   "Short Answer"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 border rounded-md">
              <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Quizzes Found</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === "all" 
                  ? "Start by creating your first quiz or assessment." 
                  : "No quizzes matching the selected filter."}
              </p>
              {activeTab === "all" && (
                <Button onClick={handleCreateQuiz}>
                  <FileQuestion className="h-4 w-4 mr-2" />
                  Create Quiz
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>

      {/* Create Quiz Dialog */}
      <Dialog open={isCreateQuizOpen} onOpenChange={setIsCreateQuizOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Quiz</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new quiz or assessment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quiz Title</Label>
                <Input 
                  id="title" 
                  value={newQuiz.title || ''} 
                  onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                  placeholder="Enter quiz title"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="module">Module (Optional)</Label>
                  <Select onValueChange={(value) => setNewQuiz({...newQuiz, moduleId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="section-1">Introduction to JavaScript</SelectItem>
                      <SelectItem value="section-2">Functions and Objects</SelectItem>
                      <SelectItem value="section-3">DOM Manipulation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                  <Input 
                    id="time-limit" 
                    type="number" 
                    min={1} 
                    value={newQuiz.timeLimit || 15} 
                    onChange={(e) => setNewQuiz({...newQuiz, timeLimit: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quiz-type">Quiz Type</Label>
                  <Select 
                    defaultValue="mcq"
                    onValueChange={(value) => setNewQuiz({
                      ...newQuiz, 
                      type: value as QuizType
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                      <SelectItem value="mixed">Mixed Question Types</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select 
                    defaultValue="medium"
                    onValueChange={(value) => setNewQuiz({
                      ...newQuiz, 
                      difficulty: value as DifficultyLevel
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pass-score">Pass Score (%)</Label>
                  <Input 
                    id="pass-score" 
                    type="number" 
                    min={0} 
                    max={100} 
                    value={newQuiz.passScore || 70} 
                    onChange={(e) => setNewQuiz({...newQuiz, passScore: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date (Optional)</Label>
                  <Input 
                    id="due-date" 
                    type="date" 
                    value={newQuiz.dueDate || ''} 
                    onChange={(e) => setNewQuiz({...newQuiz, dueDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Grading Type</Label>
                <RadioGroup 
                  defaultValue="auto" 
                  className="flex flex-col space-y-1"
                  onValueChange={(value) => setNewQuiz({
                    ...newQuiz, 
                    autoGraded: value === "auto"
                  })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="auto" id="auto" />
                    <Label htmlFor="auto">Auto-grade (Recommended for MCQ/True-False)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual" id="manual" />
                    <Label htmlFor="manual">Manual Review (Required for short answers)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter a description or instructions for this quiz"
                  rows={3}
                  onChange={(e) => setNewQuiz({
                    ...newQuiz, 
                    description: e.target.value
                  })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateQuizOpen(false)}>Cancel</Button>
            <Button onClick={handleQuizSubmit}>Create Quiz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Question Dialog */}
      <Dialog open={isAddQuestionOpen} onOpenChange={setIsAddQuestionOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Question</DialogTitle>
            <DialogDescription>
              {selectedQuiz && `Adding question to ${selectedQuiz.title}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="question-text">Question Text</Label>
              <Textarea 
                id="question-text" 
                placeholder="Enter your question"
                value={newQuestion.text || ''}
                onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="question-type">Question Type</Label>
              <Select 
                defaultValue="mcq"
                onValueChange={(value) => {
                  setNewQuestion({
                    ...newQuestion, 
                    type: value as "mcq" | "true-false" | "short-answer",
                    options: value === "mcq" ? ["", "", "", ""] : 
                             value === "true-false" ? ["True", "False"] : undefined,
                    correctAnswer: value === "mcq" ? 0 : 
                                   value === "true-false" ? 0 : ""
                  });
                }}
              >
                <SelectTrigger id="question-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcq">Multiple Choice</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newQuestion.type === "mcq" && newQuestion.options && (
              <div className="space-y-4">
                <Label>Answer Options</Label>
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-8">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm">
                        {String.fromCharCode(65 + index)}
                      </div>
                    </div>
                    <Input 
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options!];
                        newOptions[index] = e.target.value;
                        setNewQuestion({...newQuestion, options: newOptions});
                      }}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    />
                    <RadioGroup 
                      value={newQuestion.correctAnswer?.toString()}
                      className="flex"
                      onValueChange={(value) => {
                        setNewQuestion({...newQuestion, correctAnswer: parseInt(value)});
                      }}
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>Correct</Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
                {newQuestion.options.length < 6 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setNewQuestion({
                        ...newQuestion, 
                        options: [...newQuestion.options!, ""]
                      });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Option
                  </Button>
                )}
              </div>
            )}
            
            {newQuestion.type === "true-false" && (
              <div className="space-y-2">
                <Label>Correct Answer</Label>
                <RadioGroup 
                  defaultValue="0"
                  className="flex space-x-4"
                  onValueChange={(value) => {
                    setNewQuestion({...newQuestion, correctAnswer: parseInt(value)});
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="0" id="true" />
                    <Label htmlFor="true">True</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="1" id="false" />
                    <Label htmlFor="false">False</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            {newQuestion.type === "short-answer" && (
              <div className="space-y-2">
                <Label htmlFor="expected-answer">Expected Answer (for grading reference)</Label>
                <Textarea 
                  id="expected-answer" 
                  placeholder="Enter expected answer"
                  value={newQuestion.correctAnswer?.toString() || ""}
                  onChange={(e) => setNewQuestion({...newQuestion, correctAnswer: e.target.value})}
                  rows={2}
                />
                <p className="text-sm text-muted-foreground">
                  Note: Short answer questions require manual grading.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddQuestionOpen(false)}>Cancel</Button>
            <Button onClick={handleQuestionSubmit}>Add Question</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Preview Quiz Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quiz Preview</DialogTitle>
            <DialogDescription>
              {selectedQuiz?.title} - Preview Mode
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-medium">{selectedQuiz?.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedQuiz?.questionCount} questions • {selectedQuiz?.timeLimit} minutes
                </p>
              </div>
              <Badge className={selectedQuiz ? difficultyColors[selectedQuiz.difficulty] : ""}>
                {selectedQuiz?.difficulty.charAt(0).toUpperCase() + selectedQuiz?.difficulty.slice(1)}
              </Badge>
            </div>
            
            {selectedQuiz?.questions.length ? (
              <div className="space-y-6">
                {selectedQuiz.questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-medium">Q{index + 1}: {question.text}</p>
                      <Badge>
                        {question.type === "mcq" ? "Multiple Choice" : 
                         question.type === "true-false" ? "True/False" : 
                         "Short Answer"}
                      </Badge>
                    </div>
                    
                    {question.type === "mcq" && question.options && (
                      <div className="space-y-2 ml-4">
                        {question.options.map((option, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full border flex items-center justify-center">
                              {String.fromCharCode(65 + idx)}
                            </div>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {question.type === "true-false" && (
                      <div className="space-y-2 ml-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full border"></div>
                          <span>True</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full border"></div>
                          <span>False</span>
                        </div>
                      </div>
                    )}
                    
                    {question.type === "short-answer" && (
                      <div className="mt-2">
                        <Textarea placeholder="Enter your answer" disabled rows={2} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No questions added to this quiz yet.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* View Submissions Dialog */}
      <Dialog open={isViewSubmissionsOpen} onOpenChange={setIsViewSubmissionsOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quiz Submissions</DialogTitle>
            <DialogDescription>
              {selectedQuiz?.title} - Student Submissions
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 bg-muted p-3 text-sm font-medium">
                <div className="col-span-4">Student</div>
                <div className="col-span-2 text-center">Score</div>
                <div className="col-span-2 text-center">Time Taken</div>
                <div className="col-span-2 text-center">Date</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              <div>
                {sampleSubmissions.map((submission) => (
                  <div key={submission.id} className="grid grid-cols-12 border-t p-3 text-sm">
                    <div className="col-span-4">{submission.studentName}</div>
                    <div className="col-span-2 text-center font-medium">
                      <span className={submission.score >= (selectedQuiz?.passScore || 0) 
                        ? "text-green-600" 
                        : "text-red-600"}>
                        {submission.score}%
                      </span>
                    </div>
                    <div className="col-span-2 text-center">{submission.timeTaken}</div>
                    <div className="col-span-2 text-center">{submission.submittedAt}</div>
                    <div className="col-span-2 text-right">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {sampleSubmissions.length} submissions
              </div>
              <div>
                <Button size="sm">
                  Download Results
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
