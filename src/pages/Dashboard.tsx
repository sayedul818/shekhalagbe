
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import UsersList from "@/components/dashboard/UsersList";
import CoursesList from "@/components/dashboard/CoursesList";
import StudentsList from "@/components/dashboard/StudentsList";
import BrowseCourses from "@/components/dashboard/BrowseCourses";
import MyCourses from "@/components/dashboard/MyCourses";
import ExamsList from "@/components/dashboard/ExamsList";
import CreateExam from "@/components/dashboard/CreateExam";
import TakeExam from "@/components/dashboard/TakeExam";
import NotFound from "./NotFound";
import { lazy, Suspense } from "react";

// Lazy load the CourseLesson component
const CourseLesson = lazy(() => import("@/components/dashboard/CourseLesson"));

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !user) {
      navigate("/signin");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route
          index
          element={
            user.role === "admin" ? (
              <AdminDashboard />
            ) : user.role === "teacher" ? (
              <TeacherDashboard />
            ) : (
              <StudentDashboard />
            )
          }
        />
        {/* Admin routes */}
        {user.role === "admin" && (
          <>
            <Route path="users" element={<UsersList />} />
            <Route path="courses" element={<CoursesList />} />
          </>
        )}

        {/* Teacher routes */}
        {user.role === "teacher" && (
          <>
            <Route path="courses" element={<CoursesList />} />
            <Route path="students" element={<StudentsList />} />
            <Route path="exams" element={<ExamsList />} />
            <Route path="exams/create/:courseId" element={<CreateExam />} />
            <Route path="exams/edit/:examId" element={<CreateExam />} />
          </>
        )}

        {/* Student routes */}
        {user.role === "student" && (
          <>
            <Route path="browse" element={<BrowseCourses />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="my-courses/:courseId/lessons/:lessonId" element={
              <Suspense fallback={<div className="flex justify-center p-12">Loading lesson...</div>}>
                <CourseLesson />
              </Suspense>
            } />
            <Route path="exams" element={<ExamsList />} />
            <Route path="exams/take/:examId" element={<TakeExam />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
