
export type AssignmentStatus = "pending" | "submitted" | "graded" | "overdue";

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: AssignmentStatus;
  instructions: string;
  module: string;
  submissionDate?: string;
  grade?: number;
  feedback?: string;
}
