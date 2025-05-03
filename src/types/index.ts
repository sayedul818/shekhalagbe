
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

// New curriculum-related types
export type ContentType = "video" | "quiz" | "reading" | "assignment" | "live" | "ai-practice";
export type ModuleStatus = "completed" | "in-progress" | "locked";

export interface LessonItem {
  id: string;
  title: string;
  type: ContentType;
  duration: string;
  status: "completed" | "in-progress" | "locked";
  description?: string;
  completed?: boolean;
  isBookmarked?: boolean;
  lastAccessedAt?: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  status: ModuleStatus;
  completionPercentage: number;
  items: LessonItem[];
  unlockDate?: string;
}

export interface CurriculumData {
  modules: CurriculumModule[];
  overallProgress: number;
  nextRecommended?: LessonItem;
  totalTimeSpent: string;
  totalTimeRemaining: string;
}
