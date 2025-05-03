
import React from "react";
import CourseCurriculum from "./curriculum/CourseCurriculum";
import { CourseComponentProps } from "@/types";

// This is now a wrapper component that uses the new CourseCurriculum
// This maintains backward compatibility with any code that might be using the old component
const CourseCurriculumWrapper = ({ courseId }: CourseComponentProps) => {
  return <CourseCurriculum courseId={courseId} />;
};

export default CourseCurriculumWrapper;
