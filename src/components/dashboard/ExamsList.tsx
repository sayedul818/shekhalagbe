
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
  ClipboardList,
  Search,
  Filter,
  Check
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { fetchExamsData } from "@/lib/course-data";
import { cn } from "@/lib/utils";
import { SubjectCard, QuestionSet } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [tabValue, setTabValue] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [questionType, setQuestionType] = useState("All");

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
    },
    {
      id: "biology-1",
      name: "জীববিজ্ঞান ১ম পত্র",
      questionCount: 15,
      color: "bg-orange-500",
      isNew: true,
      questionSets: [
        {
          id: "bio1-set1",
          type: "এমসিকিউ",
          title: "অধ্যায় ১: কোষ ও এর গঠন",
          questionCount: 22,
          date: "২০২৫-০৪-১০"
        }
      ]
    },
    {
      id: "biology-2",
      name: "জীববিজ্ঞান ২য় পত্র",
      questionCount: 14,
      color: "bg-orange-500",
      questionSets: [
        {
          id: "bio2-set1",
          type: "এমসিকিউ",
          title: "অধ্যায় ১: প্রাণীর বিভিন্নতা",
          questionCount: 18,
          date: "২০২৫-০৪-১১"
        }
      ]
    }
  ];

  // Define available options for dropdowns
  const classOptions = ["এসএসসি", "এইচএসসি", "ভর্তি পরীক্ষা"];
  const subjectOptions = ["জীববিজ্ঞান", "রসায়ন", "পদার্থবিজ্ঞান", "উচ্চতর গণিত"];
  const chapterOptions = ["ম্যাট্রিক্স ও নির্ণায়ক", "ভেক্টর", "সরলরেখা", "বৃত্ত"];

  // Question types
  const questionTypes = ["All", "MCQ", "CQ", "গাণিতিক", "তত্ত্বমূলক", "ছোট লিখিত/সংক্ষিপ্ত"];

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

  const filteredSubjects = mockSubjects.filter(subject => 
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        // Advanced Question Bank Component based on the provided images
        <div className="animate-fade-in">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              স্মার্ট প্রশ্নব্যাংক
            </h2>
            <p className="mt-2 text-green-600">
              প্রশ্ন তৈরি করুন আপনার এমনকি অফলাইন মোডেও
            </p>
          </div>
          
          <div className="bg-lime-50 rounded-lg p-4 mb-8 text-center">
            <p className="text-gray-700 text-sm">
              ২ লক্ষাধিক প্রশ্ন থেকে টাইপিং ও ওয়েব ভিউয়ের মাধ্যমে ছাত্রাই যেকোনো বিষয়ের প্রশ্ন বানান সিমিটেড টাইমে তিনটি ধাপে:
            </p>
            <p className="mt-2 text-center text-sm font-medium">
              প্রশ্ন সিলেক্ট করুন &gt; পেপের সেটআপ করুন &gt; ডাউনলোড করুন
            </p>
          </div>
          
          {/* Main Content with Filters and Question Bank */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Mobile Filter Bar */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      ফিল্টার
                    </span>
                    <span className="text-muted-foreground text-sm">{selectedClass || selectedSubject ? '✓' : ''}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px]">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      ফিল্টার
                    </h3>
                    
                    <div>
                      <h4 className="font-medium mb-2">ক্লাস</h4>
                      <div className="space-y-2">
                        {classOptions.map((option) => (
                          <Button
                            key={option}
                            variant={selectedClass === option ? "default" : "outline"}
                            className="w-full justify-start"
                            onClick={() => setSelectedClass(option)}
                          >
                            {option}
                            {selectedClass === option && <Check className="ml-auto h-4 w-4" />}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">লেভেল</h4>
                      <div className="space-y-2">
                        {["সহজ", "মধ্যম", "কঠিন"].map((option) => (
                          <Button
                            key={option}
                            variant="outline"
                            className="w-full justify-start"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">টপিক</h4>
                      <div className="space-y-2">
                        {chapterOptions.map((option) => (
                          <Button
                            key={option}
                            variant={selectedChapter === option ? "default" : "outline"}
                            className="w-full justify-start"
                            onClick={() => setSelectedChapter(option)}
                          >
                            {option}
                            {selectedChapter === option && <Check className="ml-auto h-4 w-4" />}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">সোর্স</h4>
                      <div className="space-y-2">
                        {["বাংলাদেশ", "ভারত", "আন্তর্জাতিক"].map((option) => (
                          <Button
                            key={option}
                            variant="outline"
                            className="w-full justify-start"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">সাব সোর্স</h4>
                      <div className="space-y-2">
                        {["ঢাকা বিশ্ববিদ্যালয়", "বুয়েট", "মেডিকেল"].map((option) => (
                          <Button
                            key={option}
                            variant="outline"
                            className="w-full justify-start"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">ট্যাগ</h4>
                      <div className="space-y-2">
                        {["জরুরি", "বোর্ড", "ভর্তি"].map((option) => (
                          <Button
                            key={option}
                            variant="outline"
                            className="w-full justify-start"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">শিক্ষাবর্ষ</h4>
                      <div className="space-y-2">
                        {["২০২৫", "২০২৪", "২০২৩"].map((option) => (
                          <Button
                            key={option}
                            variant="outline"
                            className="w-full justify-start"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block">
              <div className="border rounded-lg">
                <div className="p-4 border-b flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">ফিল্টার</h3>
                </div>
                
                <div className="divide-y">
                  <div className="p-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="type" className="border-0">
                        <AccordionTrigger className="hover:no-underline py-1">
                          <span className="text-base">টাইপ</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {classOptions.map((option) => (
                              <div key={option} className="flex items-center">
                                <Button
                                  variant={selectedClass === option ? "default" : "ghost"}
                                  className="w-full justify-start p-2 h-auto text-sm"
                                  onClick={() => setSelectedClass(option)}
                                >
                                  {option}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  
                  <div className="p-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="level" className="border-0">
                        <AccordionTrigger className="hover:no-underline py-1">
                          <span className="text-base">লেভেল</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {["সহজ", "মধ্যম", "কঠিন"].map((option) => (
                              <div key={option} className="flex items-center">
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start p-2 h-auto text-sm"
                                >
                                  {option}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  
                  <div className="p-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="topic" className="border-0">
                        <AccordionTrigger className="hover:no-underline py-1">
                          <span className="text-base">টপিক</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {chapterOptions.map((option) => (
                              <div key={option} className="flex items-center">
                                <Button
                                  variant={selectedChapter === option ? "default" : "ghost"}
                                  className="w-full justify-start p-2 h-auto text-sm"
                                  onClick={() => setSelectedChapter(option)}
                                >
                                  {option}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  
                  <div className="p-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="source" className="border-0">
                        <AccordionTrigger className="hover:no-underline py-1">
                          <span className="text-base">সোর্স</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {["বাংলাদেশ", "ভারত", "আন্তর্জাতিক"].map((option) => (
                              <div key={option} className="flex items-center">
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start p-2 h-auto text-sm"
                                >
                                  {option}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  
                  <div className="p-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="sub-source" className="border-0">
                        <AccordionTrigger className="hover:no-underline py-1">
                          <span className="text-base">সাব সোর্স</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {["ঢাকা বিশ্ববিদ্যালয়", "বুয়েট", "মেডিকেল"].map((option) => (
                              <div key={option} className="flex items-center">
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start p-2 h-auto text-sm"
                                >
                                  {option}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  
                  <div className="p-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="tags" className="border-0">
                        <AccordionTrigger className="hover:no-underline py-1">
                          <span className="text-base">ট্যাগ</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {["জরুরি", "বোর্ড", "ভর্তি"].map((option) => (
                              <div key={option} className="flex items-center">
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start p-2 h-auto text-sm"
                                >
                                  {option}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  
                  <div className="p-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="education-year" className="border-0">
                        <AccordionTrigger className="hover:no-underline py-1">
                          <span className="text-base">শিক্ষাবর্ষ</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {["২০২৫", "২০২৪", "২০২৩"].map((option) => (
                              <div key={option} className="flex items-center">
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start p-2 h-auto text-sm"
                                >
                                  {option}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content - Question Bank */}
            <div className="lg:col-span-3 space-y-6">
              {/* Top Filter Bar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="HSC - উচ্চতর গণিত ১ম পত্র" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="ম্যাট্রিক্স ও নির্ণায়ক" />
                    </SelectTrigger>
                    <SelectContent>
                      {chapterOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">টপিক</p>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="টপিক নির্বাচন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="topic1">টপিক ১</SelectItem>
                      <SelectItem value="topic2">টপিক ২</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">প্রশ্ন সার্চ</p>
                  <div className="relative">
                    <Input 
                      type="search" 
                      placeholder="এখানে খুঁজুন" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              {/* Question Type Filter */}
              <div className="flex flex-wrap gap-2">
                {questionTypes.map((type) => (
                  <Button
                    key={type}
                    onClick={() => setQuestionType(type)}
                    className={cn(
                      "rounded-full px-4 h-9",
                      type === questionType ? "bg-green-500 text-white" : "bg-white border"
                    )}
                    variant={type === questionType ? "default" : "outline"}
                  >
                    {type}
                  </Button>
                ))}
              </div>
              
              {/* Question Stats */}
              <div className="flex items-center justify-between border-b pb-2">
                <div className="text-lg font-medium">
                  মোট <span className="text-green-500">1021</span> টি প্রশ্ন
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Reaction
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Highest</DropdownMenuItem>
                      <DropdownMenuItem>Lowest</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Priority
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>High</DropdownMenuItem>
                      <DropdownMenuItem>Medium</DropdownMenuItem>
                      <DropdownMenuItem>Low</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Rating
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>5 Star</DropdownMenuItem>
                      <DropdownMenuItem>4 Star</DropdownMenuItem>
                      <DropdownMenuItem>3 Star</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Select All Option */}
              <div className="flex items-center mb-4">
                <input type="checkbox" id="selectAll" className="h-4 w-4 mr-2" />
                <label htmlFor="selectAll">Select All</label>
              </div>
              
              {/* Error Reporting Text */}
              <div className="text-red-500 text-sm mb-4">
                প্রশ্ন, উত্তর, সমাধান বা ব্যাখ্যায় কোনো ভুল পেলে
                <button className="ml-1 text-blue-500 underline">এই বাটনে ক্লিক করে রিপোর্ট করুন!</button>
                এমনকি বানান ভুল, ছিন্ন ভুল, ছিন্ন অস্পষ্ট, সমীকরণ ভেঙে গেছে / কেটে গেছে ইত্যাদি যেকোনো ধরণের ভুল পেলে রিপোর্ট করুন।
              </div>
              
              {/* Mock Questions */}
              <div className="space-y-8">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <input type="checkbox" className="h-5 w-5 mt-1 mr-3" />
                    <div>
                      <div className="flex items-center mb-3">
                        <span className="font-bold mr-2">1.</span>
                        <div>
                          <span className="text-lg font-medium">
                            $\begin{bmatrix}
                            4 & 0 & -2 \\
                            0 & 5 & m \\
                            -2 & 4 & 5
                            \end{bmatrix}$ ম্যাট্রিক্সটি প্রতিসম হলে m = কত?
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="flex items-center">
                          <span className="mr-2">A.</span>
                          <span>-2</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">B.</span>
                          <span>0</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">C.</span>
                          <span>4</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">D.</span>
                          <span>5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <input type="checkbox" className="h-5 w-5 mt-1 mr-3" />
                    <div>
                      <div className="flex items-center mb-3">
                        <span className="font-bold mr-2">2.</span>
                        <div>
                          <span className="text-lg font-medium">
                            $A = \begin{pmatrix}
                            2 & 3-2i \\
                            1+2i & i-2
                            \end{pmatrix}$ ম্যাট্রিক্সের অনুবন্ধী (conjugate) ম্যাট্রিক্স কোনটি?
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <span className="mr-2">A.</span>
                          <span>$\begin{pmatrix}
                            2 & 3+2i \\
                            1-2i & -i-2
                            \end{pmatrix}$</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">B.</span>
                          <span>$\begin{pmatrix}
                            3-2i & 2 \\
                            i-2 & 1+2i
                            \end{pmatrix}$</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">C.</span>
                          <span>$\begin{pmatrix}
                            2 & 1+2i \\
                            3-2i & i-2
                            \end{pmatrix}$</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">D.</span>
                          <span>$\begin{pmatrix}
                            2 & 3+2i \\
                            1-2i & -i-2
                            \end{pmatrix}$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Create Question Button */}
              <div className="sticky bottom-4 pt-6">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg" size="lg">
                  Create Question(0)
                </Button>
              </div>
            </div>
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
