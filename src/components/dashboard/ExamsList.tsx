import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  FileText, 
  Download, 
  Plus, 
  Award,
  ArrowRight,
  ClipboardList
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { fetchExamsData } from "@/lib/course-data";
import { cn } from "@/lib/utils";
import { SubjectCard, QuestionSet } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExamsList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [completedExams, setCompletedExams] = useState([]);
  
  // New states for exam question platform
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [tabValue, setTabValue] = useState("upcoming");

  // Mock data for subjects and question sets
  const mockSubjects: SubjectCard[] = [
    {
      id: "math-1",
      name: "উচ্চতর গণিত ১ম পত্র",
      questionCount: 10,
      color: "bg-blue-500",
      isNew: true,
      questionSets: [
        {
          id: "math1-set1",
          type: "এমসিকিউ",
          title: "অধ্যায় ১: সেট ও ফাংশন",
          questionCount: 25,
          date: "২০২৫-০৪-১০",
          isNew: true
        },
        {
          id: "math1-set2",
          type: "লিখিত",
          title: "অধ্যায় ২: বীজগণিতীয় রাশি",
          questionCount: 15,
          date: "২০২৫-০৪-০৫"
        }
      ]
    },
    {
      id: "physics-1",
      name: "পদার্থবিজ্ঞান ১ম পত্র",
      questionCount: 8,
      color: "bg-green-500",
      questionSets: [
        {
          id: "physics1-set1",
          type: "এমসিকিউ",
          title: "অধ্যায় ১: ভৌত জগৎ ও পরিমাপ",
          questionCount: 20,
          date: "২০২৫-০৪-০৮"
        },
        {
          id: "physics1-set2",
          type: "লিখিত",
          title: "অধ্যায় ২: ভেক্টর",
          questionCount: 12,
          date: "২০২৫-০৪-০২"
        }
      ]
    },
    {
      id: "chemistry-1",
      name: "রসায়ন ১ম পত্র",
      questionCount: 12,
      color: "bg-purple-500",
      isNew: true,
      questionSets: [
        {
          id: "chem1-set1",
          type: "এমসিকিউ",
          title: "অধ্যায় ১: পরমাণুর গঠন",
          questionCount: 30,
          date: "২০২৫-০৪-০৯",
          isNew: true
        },
        {
          id: "chem1-set2",
          type: "লিখিত",
          title: "অধ্যায় ২: পর্যায় সারণি",
          questionCount: 18,
          date: "২০২৫-০৪-০৩"
        }
      ]
    }
  ];

  // Define available options for dropdowns
  const classOptions = ["এসএসসি", "এইচএসসি", "ভর্তি পরীক্ষা"];
  const subjectOptions = ["জীববিজ্ঞান", "রসায়ন", "পদার্থবিজ্ঞান", "গণিত"];

  useEffect(() => {
    const loadExamsData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchExamsData();
        // Filter exams with status "upcoming"
        const upcoming = data.exams.filter(exam => exam.status === "upcoming") || [];
        setUpcomingExams(upcoming);
        setCompletedExams(data.completedExams || []);
      } catch (error) {
        console.error("Error loading exams data:", error);
        toast({
          title: "Error",
          description: "Failed to load exams data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadExamsData();
  }, [toast]);

  const handleCreateExam = () => {
    navigate("/dashboard/exams/create/course1");
  };

  const handleDeleteExam = (examId: string) => {
    toast({
      title: "Exam deleted",
      description: "The exam has been successfully deleted",
    });
  };

  const handleTakeExam = (examId: string) => {
    navigate(`/dashboard/exams/take/${examId}`);
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
        <h1 className="text-2xl font-bold tracking-tight">
          {user?.role === "teacher" ? "স্মার্ট প্রশ্নব্যাংক" : "My Exams"}
        </h1>
        <p className="text-muted-foreground">
          {user?.role === "teacher"
            ? "সকল পরীক্ষার প্রশ্নব্যাংক, টেস্টপেপার, আনলিমিটেড পরীক্ষা তৈরি করুন"
            : "View upcoming and completed exams"
          }
        </p>
      </div>

      {!showQuestionBank ? (
        // Hero Section for Teachers
        user?.role === "teacher" ? (
          <div className="text-center max-w-4xl mx-auto py-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              দেশের প্রথম এবং একমাত্র{" "}
              <span className="relative text-red-600">
                পেপারলেস
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q25,0 50,5 Q75,10 100,5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              স্মার্ট প্রশ্নব্যাংক!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              সকল পরীক্ষার প্রশ্নব্যাংক, টেস্টপেপার, আনলিমিটেড পরীক্ষা, প্রশ্ন ও অনলাইন পরীক্ষা তৈরী!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowQuestionBank(true)} 
                className="bg-green-500 hover:bg-green-600 text-white"
                size="lg"
              >
                ফ্রি-তে প্রশ্নব্যাংক দেখুন
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleCreateExam}
              >
                প্রশ্ন তৈরি করুন
                <Plus className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          // Original ExamsList content for Students
          <div>
            {user?.role === "student" && (
              <div>
                <Tabs defaultValue="upcoming" value={tabValue} onValueChange={setTabValue}>
                  <TabsList>
                    <TabsTrigger value="upcoming">
                      Upcoming
                      <span className="ml-1 text-xs bg-primary text-white rounded-full px-1.5 inline-flex justify-center items-center">
                        {upcomingExams.length}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Completed
                      <span className="ml-1 text-xs bg-primary text-white rounded-full px-1.5 inline-flex justify-center items-center">
                        {completedExams.length}
                      </span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="space-y-4 mt-6">
                    {upcomingExams.length > 0 ? (
                      upcomingExams.map((exam) => (
                        <Card key={exam.id} className="border">
                          <CardContent>
                            <h3 className="text-lg font-semibold">{exam.title}</h3>
                            <p className="text-muted-foreground">{exam.description}</p>
                            <Button onClick={() => handleTakeExam(exam.id)}>Take Exam</Button>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12 border rounded-md bg-gray-50">
                        <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No upcoming exams</h3>
                        <p className="text-muted-foreground mb-4">
                          {user?.role === "teacher"
                            ? "Create an exam for your courses"
                            : "You don't have any upcoming exams scheduled"
                          }
                        </p>
                        {user?.role === "teacher" && (
                          <Button onClick={handleCreateExam}>
                            <Plus className="h-4 w-4 mr-2" />
                            Create New Exam
                          </Button>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="completed" className="space-y-4 mt-6">
                    {completedExams.length > 0 ? (
                      completedExams.map((exam) => (
                        <Card key={exam.id} className="border">
                          <CardContent>
                            <h3 className="text-lg font-semibold">{exam.title}</h3>
                            <p className="text-muted-foreground">Score: {exam.score}</p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12 border rounded-md bg-gray-50">
                        <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No completed exams</h3>
                        <p className="text-muted-foreground mb-4">
                          {user?.role === "teacher"
                            ? "You haven't published any exams yet"
                            : "You haven't taken any exams yet"
                          }
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        )
      ) : (
        // Question Bank Component
        <div className="animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            স্মার্ট প্রশ্নব্যাংক
          </h2>
          
          {/* Filter Section */}
          <div className="bg-card p-4 rounded-lg shadow-sm mb-8 sticky top-16 z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">ক্লাস/লেভেল</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="ক্লাস বা লেভেল নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {classOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">বিষয়</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Subject Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSubjects.map((subject) => (
              <Card key={subject.id} className="overflow-hidden border hover:shadow-md transition-shadow">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={subject.id} className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center w-full">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-3", subject.color)}>
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{subject.name}</h3>
                            {subject.isNew && (
                              <Badge variant="secondary" className="bg-red-100 text-red-800">নতুন</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {subject.questionCount}টি প্রশ্ন
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="space-y-4">
                        {subject.questionSets.map((set) => (
                          <div key={set.id} className="bg-accent rounded-md p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{set.type}</span>
                                  {set.isNew && (
                                    <Badge variant="outline" className="text-xs bg-red-100 text-red-800 border-red-200">
                                      নতুন
                                    </Badge>
                                  )}
                                </div>
                                <h4 className="font-medium mt-1">{set.title}</h4>
                                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                  <span>{set.questionCount}টি প্রশ্ন</span>
                                  <span>{set.date}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-8">
                                  <FileText className="h-4 w-4 mr-1" />
                                  দেখুন
                                </Button>
                                <Button size="sm" variant="outline" className="h-8">
                                  <Download className="h-4 w-4 mr-1" />
                                  ডাউনলোড
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            ))}
          </div>
          
          {/* Back button and Create Exam button */}
          <div className="mt-8 flex justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setShowQuestionBank(false)}
              className="text-muted-foreground"
            >
              ← ফিরে যান
            </Button>
            
            {user?.role === "teacher" && (
              <Button onClick={handleCreateExam}>
                <ClipboardList className="h-4 w-4 mr-2" />
                Create New Exam
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamsList;
