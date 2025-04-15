
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CourseLesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);

  // Mock data for courses 
  const mockCourses = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
      progress: 60,
      completedLessons: 8,
      totalLessons: 12,
      description: "Master the fundamentals of JavaScript with practical exercises and real-world examples.",
      teacher: "Robert Johnson",
      lessons: [
        { id: "js-lesson-8", title: "Functions and Callbacks", completed: true, duration: "45 mins" },
        { id: "js-lesson-9", title: "Working with Objects", completed: false, duration: "50 mins" },
        { id: "js-lesson-10", title: "Arrays and Array Methods", completed: false, duration: "40 mins" },
        { id: "js-lesson-11", title: "DOM Manipulation", completed: false, duration: "55 mins" },
        { id: "js-lesson-12", title: "Event Handling", completed: false, duration: "45 mins" },
      ]
    },
    {
      id: "2",
      title: "Advanced React & Redux",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
      progress: 35,
      completedLessons: 5,
      totalLessons: 14,
      description: "Learn advanced React concepts and state management with Redux.",
      teacher: "Emily Davis",
      lessons: [
        { id: "react-lesson-5", title: "Redux Middleware", completed: true, duration: "60 mins" },
        { id: "react-lesson-6", title: "Redux Toolkit Overview", completed: false, duration: "45 mins" },
        { id: "react-lesson-7", title: "Creating Slices", completed: false, duration: "50 mins" },
        { id: "react-lesson-8", title: "Async Thunks", completed: false, duration: "55 mins" },
        { id: "react-lesson-9", title: "Performance Optimization", completed: false, duration: "65 mins" },
      ]
    },
    {
      id: "3",
      title: "Node.js API Development",
      thumbnail: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34",
      progress: 80,
      completedLessons: 10,
      totalLessons: 12,
      description: "Build scalable APIs with Node.js, Express, and MongoDB.",
      teacher: "Michael Chen",
      lessons: [
        { id: "node-lesson-10", title: "Authentication & Authorization", completed: true, duration: "70 mins" },
        { id: "node-lesson-11", title: "Advanced Error Handling", completed: false, duration: "45 mins" },
        { id: "node-lesson-12", title: "API Documentation", completed: false, duration: "40 mins" },
      ]
    },
  ];

  useEffect(() => {
    // Simulate API call to fetch course and lesson data
    setLoading(true);
    const fetchedCourse = mockCourses.find(c => c.id === courseId);
    
    if (fetchedCourse) {
      setCourse(fetchedCourse);
      const fetchedLesson = fetchedCourse.lessons.find(l => l.id === lessonId);
      if (fetchedLesson) {
        setLesson(fetchedLesson);
      }
    }
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [courseId, lessonId]);

  const handleMarkComplete = () => {
    // Here you would typically call an API to mark the lesson as complete
    // For now, we'll just update the state
    if (lesson && course) {
      const updatedLesson = { ...lesson, completed: true };
      setLesson(updatedLesson);
      
      // Find the next lesson
      const currentIndex = course.lessons.findIndex(l => l.id === lesson.id);
      const nextLesson = course.lessons[currentIndex + 1];
      
      if (nextLesson) {
        // Navigate to next lesson
        setTimeout(() => {
          navigate(`/dashboard/my-courses/${courseId}/lessons/${nextLesson.id}`);
        }, 1000);
      }
    }
  };

  const handleNavigateToLesson = (lessonId) => {
    navigate(`/dashboard/my-courses/${courseId}/lessons/${lessonId}`);
  };

  const findCurrentLessonIndex = () => {
    if (!course || !lesson) return -1;
    return course.lessons.findIndex(l => l.id === lesson.id);
  };

  const currentIndex = findCurrentLessonIndex();
  const prevLesson = currentIndex > 0 ? course?.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < (course?.lessons.length - 1) ? course?.lessons[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!course || !lesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Lesson Not Found</h2>
        <p className="text-muted-foreground mb-6">The lesson you're looking for doesn't exist or has been moved.</p>
        <Button onClick={() => navigate('/dashboard/my-courses')}>
          Back to My Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Course Navigation Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <button 
            onClick={() => navigate('/dashboard/my-courses')}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center mb-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to My Courses
          </button>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">Instructor: {course.teacher}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="text-sm text-muted-foreground mb-1">
            {course.completedLessons} of {course.totalLessons} lessons completed
          </div>
          <Progress value={(course.completedLessons / course.totalLessons) * 100} className="w-48" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lesson Content */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.duration}
                  </CardDescription>
                </div>
                {lesson.completed && (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-5 w-5 mr-1" />
                    <span className="text-sm">Completed</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* This would be the actual lesson content */}
              <div className="prose max-w-none">
                <h3>Introduction</h3>
                <p>
                  Welcome to the lesson on {lesson.title}. In this lesson, you will learn key concepts and practical 
                  applications that will help you master the subject matter.
                </p>
                
                <h3>Learning Objectives</h3>
                <ul>
                  <li>Understand the core principles of {lesson.title}</li>
                  <li>Apply the concepts in real-world scenarios</li>
                  <li>Practice through hands-on exercises</li>
                  <li>Prepare for the upcoming quiz</li>
                </ul>
                
                <h3>Main Content</h3>
                <p>
                  This is where the main content of the lesson would go. It would include detailed explanations,
                  code examples, diagrams, and interactive elements to help you understand the concepts.
                </p>
                
                <div className="bg-muted p-4 rounded-md my-4">
                  <h4 className="font-medium">Code Example</h4>
                  <pre><code>
                    {`// Sample code related to ${lesson.title}
function example() {
  console.log("This is a code example");
  return "Learning is fun!";
}`}
                  </code></pre>
                </div>
                
                <h3>Summary</h3>
                <p>
                  In this lesson, you've learned about {lesson.title}. These concepts are fundamental to 
                  understanding the next topics in the course. Make sure to complete the practice exercises 
                  before moving on to the next lesson.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {prevLesson ? (
                <Button 
                  variant="outline" 
                  onClick={() => handleNavigateToLesson(prevLesson.id)}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Lesson
                </Button>
              ) : (
                <div></div>
              )}
              
              {lesson.completed ? (
                nextLesson ? (
                  <Button 
                    onClick={() => handleNavigateToLesson(nextLesson.id)} 
                    className="flex items-center"
                  >
                    Next Lesson
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={() => navigate('/dashboard/my-courses')}>
                    Complete Course
                  </Button>
                )
              ) : (
                <Button onClick={handleMarkComplete}>
                  Mark as Complete
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Course Outline */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Outline</CardTitle>
              <CardDescription>Track your progress through the course</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {course.lessons.map((courseLesson, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigateToLesson(courseLesson.id)}
                      className={`w-full text-left p-2 rounded-md flex items-start hover:bg-muted transition-colors ${
                        courseLesson.id === lesson.id ? 'bg-muted font-medium' : ''
                      }`}
                    >
                      <div className="mr-3 mt-0.5">
                        {courseLesson.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className={`text-sm ${courseLesson.completed ? 'text-muted-foreground' : ''}`}>
                          {courseLesson.title}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                          <Clock className="h-3 w-3 mr-1" />
                          {courseLesson.duration}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;
