
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Plus, Award } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ExamCard } from "@/components/exams/ExamCard";
import { CompletedExamCard } from "@/components/exams/CompletedExamCard";

const ExamsList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tabValue, setTabValue] = useState("upcoming");
  
  // Mock exams data
  const upcomingExams = [
    { 
      id: "1", 
      title: "JavaScript Fundamentals - Final Exam", 
      course: "JavaScript Fundamentals",
      courseId: "course1",
      startDate: "2025-04-20T10:00:00Z",
      endDate: "2025-04-20T12:00:00Z",
      timeLimit: 120,
      questions: 50,
      status: "scheduled",
    },
    { 
      id: "2", 
      title: "UI/UX Design Principles", 
      course: "UI/UX Design Fundamentals",
      courseId: "course2",
      startDate: "2025-04-25T14:00:00Z",
      endDate: "2025-04-25T15:30:00Z",
      timeLimit: 90,
      questions: 40,
      status: "scheduled",
    },
  ];
  
  const completedExams = [
    { 
      id: "3", 
      title: "HTML & CSS Basics - Final Assessment", 
      course: "HTML & CSS Basics",
      courseId: "course3",
      completedDate: "2025-03-15T15:45:00Z",
      score: 92,
      maxScore: 100,
      timeTaken: 85,
      rank: 3,
      totalParticipants: 124,
    },
    { 
      id: "4", 
      title: "Web Development Introduction", 
      course: "Introduction to Web Development",
      courseId: "course4",
      completedDate: "2025-02-20T11:30:00Z",
      score: 85,
      maxScore: 100,
      timeTaken: 65,
      rank: 12,
      totalParticipants: 156,
    },
  ];

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {user?.role === "teacher" ? "Manage Exams" : "My Exams"}
        </h1>
        <p className="text-muted-foreground">
          {user?.role === "teacher" 
            ? "Create and manage exams for your courses" 
            : "View upcoming and completed exams"
          }
        </p>
      </div>

      {user?.role === "teacher" && (
        <Button className="mb-4" onClick={handleCreateExam}>
          <ClipboardList className="h-4 w-4 mr-2" />
          Create New Exam
        </Button>
      )}

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
              <ExamCard
                key={exam.id}
                exam={exam}
                userRole={user?.role || ""}
                onDelete={handleDeleteExam}
                onTakeExam={handleTakeExam}
              />
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
              <CompletedExamCard
                key={exam.id}
                exam={exam}
                userRole={user?.role || ""}
              />
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
  );
};

export default ExamsList;
