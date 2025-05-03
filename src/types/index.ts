
export interface CourseComponentProps {
  courseId: string;
}

export type UserRole = "admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Question {
  id: string;
  examId: string;
  question: string;
  options: string[];
  correctOption: number;
}

export interface ExamSubmission {
  examId: string;
  answers: {
    questionId: string;
    selectedOption: number;
  }[];
  timeTaken: number;
}
