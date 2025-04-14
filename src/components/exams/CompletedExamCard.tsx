
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock, Award, AlertTriangle } from "lucide-react";
import { formatDate } from "@/utils/date-utils";

interface CompletedExamCardProps {
  exam: {
    id: string;
    title: string;
    course: string;
    completedDate: string;
    score: number;
    maxScore: number;
    timeTaken: number;
    rank: number;
    totalParticipants: number;
  };
  userRole: string;
}

export const CompletedExamCard = ({ exam, userRole }: CompletedExamCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{exam.title}</CardTitle>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
        </div>
        <CardDescription>{exam.course}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex items-start space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-sm">Taken On</p>
                <p className="text-sm text-muted-foreground">{formatDate(exam.completedDate)}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Score</p>
                <p className="text-sm text-muted-foreground">
                  {exam.score}/{exam.maxScore} ({Math.round(exam.score / exam.maxScore * 100)}%)
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-sm">Time Taken</p>
                <p className="text-sm text-muted-foreground">{exam.timeTaken} minutes</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Award className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Rank</p>
                <p className="text-sm text-muted-foreground">
                  {exam.rank}/{exam.totalParticipants}
                  <span className="text-xs"> (Top {Math.round(exam.rank / exam.totalParticipants * 100)}%)</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center">
              {Math.round(exam.score / exam.maxScore * 100) >= 70 ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Passed</span>
                </div>
              ) : (
                <div className="flex items-center text-red-500">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Failed</span>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              {userRole === "teacher" ? (
                <>
                  <Button variant="outline">View Results</Button>
                  <Button>View Leaderboard</Button>
                </>
              ) : (
                <>
                  <Button variant="outline">View Leaderboard</Button>
                  <Button>Review Answers</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
