

import { 
  getCourseById, 
  allCoursesData, 
  Resource, 
  Course,
  fetchCourseModules,
  fetchCourseQuizzes,
  fetchCourseLessons,
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
  fetchUsersListData
} from "@/data/api-data";

// Re-export the types and functions for backward compatibility
export type { Resource, Course };
export { 
  getCourseById, 
  allCoursesData,
  fetchCourseModules,
  fetchCourseQuizzes,
  fetchCourseLessons,
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
  fetchUsersListData
};
