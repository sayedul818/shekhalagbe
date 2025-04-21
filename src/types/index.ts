
export type UserRole = "admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  price: number;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  courseId: string;
  order: number;
}

export interface Content {
  id: string;
  moduleId: string;
  type: "video" | "text" | "pdf";
  title: string;
  content: string;
  order: number;
}

export interface Exam {
  id: string;
  courseId: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  startDate: string;
  endDate: string;
  questions: Question[];
}

export interface Question {
  id: string;
  examId: string;
  question: string;
  options: string[];
  correctOption: number;
}

export interface ExamResult {
  id: string;
  examId: string;
  userId: string;
  score: number;
  timeTaken: number; // in seconds
  submittedAt: string;
  answers: Answer[];
}

export interface Answer {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
}

export interface ExamSubmission {
  examId: string;
  answers: {
    questionId: string;
    selectedOption: number;
  }[];
  timeTaken: number;
}
