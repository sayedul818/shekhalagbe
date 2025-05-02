
import { 
  fetchCourseNotes, 
  fetchCourseDiscussions,
  fetchCourseAssignments,
  fetchCourseCurriculum,
  fetchCreateCourseData,
  fetchCoursesList,
  fetchBrowseCoursesData,
  fetchManageCourseData,
  fetchStudentDashboardFeaturesData,
  fetchExamTakeData,
  fetchUsersListData,
  fetchAdminDashboardData,
  fetchExamsData,
  fetchMyCourses,
  fetchUserData,
  updateUserProfile,
  fetchReportsData,
  fetchStudentDashboardData,
  fetchStudentsList,
  fetchTeacherDashboardData,
  fetchCourseLessons,
  fetchCourseModules,
  fetchCourseQuizzes
} from "@/data/api-data";

// Define types to re-export
export interface Resource {
  type: string;
  title: string;
  duration?: string;
  pages?: number;
  questions?: number;
}

export interface Course {
  id: string;
  title: string;
  teacher: string;
  progress: number;
  lastAccessed?: string;
  completedDate?: string;
  modules: number;
  completedModules: number;
  thumbnail: string;
  certificate?: boolean;
  resources?: Resource[];
}

// Helper function to get a course by ID (placeholder implementation)
export const getCourseById = async (courseId) => {
  const courses = await allCoursesData();
  return courses.find(course => course.id === courseId);
};

// Helper function to get all courses (placeholder implementation)
export const allCoursesData = async () => {
  const data = await fetchMyCourses();
  return [...data.inProgress, ...data.completed];
};

// Re-export the data API functions
export {
  fetchCourseNotes,
  fetchCourseDiscussions,
  fetchCourseAssignments,
  fetchCourseCurriculum,
  fetchCreateCourseData,
  fetchCoursesList,
  fetchBrowseCoursesData,
  fetchManageCourseData,
  fetchStudentDashboardFeaturesData,
  fetchExamTakeData,
  fetchUsersListData,
  fetchAdminDashboardData,
  fetchExamsData,
  fetchMyCourses,
  fetchUserData,
  updateUserProfile,
  fetchReportsData,
  fetchStudentDashboardData,
  fetchStudentsList,
  fetchTeacherDashboardData,
  fetchCourseLessons,
  fetchCourseModules,
  fetchCourseQuizzes
};
