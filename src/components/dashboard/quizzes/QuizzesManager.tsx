
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileQuestion, Clock, Users, Calendar, Edit, Trash2, Eye, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type QuizType = "mcq" | "true-false" | "short-answer" | "mixed";
type DifficultyLevel = "easy" | "medium" | "hard";

interface Question {
  id: string;
  text: string;
  type: "mcq" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer?: string | number | boolean;
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
  
  const handleDelete = (quizId: string) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
  };
  
  const handleCreateQuiz = () => {
    const newQuiz: Quiz = {
      id: `quiz-${quizzes.length + 1}`,
      title: "New Quiz",
      questionCount: 0,
      timeLimit: 15,
      type: "mcq",
      difficulty: "medium",
      autoGraded: true,
      passScore: 70,
      questions: [],
      submissionCount: 0
    };
    setQuizzes([...quizzes, newQuiz]);
    setExpandedQuiz(newQuiz.id);
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
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(quiz.id)}>
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
                        <div className="flex items-center justify-between mt-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm">
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
                            <Button size="sm" variant="outline" className="w-full">
                              View All Submissions
                            </Button>
                          </>
                        ) : (
                          <div className="text-center py-4 text-muted-foreground">
                            No submissions yet
                          </div>
                        )}
                      </div>
                    </div>
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
    </Card>
  );
}
