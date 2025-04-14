
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ClipboardList, AlertTriangle, Edit, Trash2, Play, LockIcon } from "lucide-react";
import { formatDate, getTimeRemaining } from "@/utils/date-utils";

interface ExamCardProps {
  exam: {
    id: string;
    title: string;
    course: string;
    startDate: string;
    endDate?: string;
    timeLimit: number;
    questions: number;
    status?: string;
  };
  userRole: string;
  onDelete?: (examId: string) => void;
  onTakeExam?: (examId: string) => void;
}

export const ExamCard = ({ exam, userRole, onDelete, onTakeExam }: ExamCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{exam.title}</CardTitle>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Upcoming</Badge>
        </div>
        <CardDescription>{exam.course}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-start space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-sm">Exam Date</p>
                <p className="text-sm text-muted-foreground">{formatDate(exam.startDate)}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-sm">Duration</p>
                <p className="text-sm text-muted-foreground">{exam.timeLimit} minutes</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <ClipboardList className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-sm">Questions</p>
                <p className="text-sm text-muted-foreground">{exam.questions} questions</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm">
                Starts in <span className="font-medium">{getTimeRemaining(exam.startDate)}</span>
              </span>
            </div>
            <div className="flex space-x-2">
              {userRole === "teacher" ? (
                <>
                  <Button variant="outline" asChild>
                    <Link to={`/dashboard/exams/edit/${exam.id}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Exam
                    </Link>
                  </Button>
                  <Button variant="destructive" onClick={() => onDelete?.(exam.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" disabled={new Date(exam.startDate) > new Date()}>
                    <LockIcon className="h-4 w-4 mr-2" />
                    {new Date(exam.startDate) > new Date() ? "Not Started Yet" : "Ready"}
                  </Button>
                  <Button 
                    onClick={() => onTakeExam?.(exam.id)}
                    disabled={new Date(exam.startDate) > new Date()}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Take Exam
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
