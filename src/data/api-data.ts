// Mock API data store for the entire application

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
  avatar?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  bio?: string;
  education?: string;
  occupation?: string;
}

interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface Exam {
  id: number;
  title: string;
  date: string;
  time: string;
  courseId?: number;
}

interface StudentCourse {
  id: number;
  title: string;
  thumbnail: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastLesson: string;
  teacher: string;
  description: string;
  nextLessonId: number;
}

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
  resources: Resource[];
  students?: number;
  rating?: number;
}

interface TeacherCourse {
  id: string;
  title: string;
  students: number;
  rating: number;
  lastUpdated: string;
  progress: number;
}

interface RecentAction {
  action: string;
  time: string;
  icon: string;
}

interface PopularCourse {
  title: string;
  students: number;
  modules: number;
}

interface ActivityItem {
  message: string;
  timeAgo: string;
}

interface Stats {
  title: string;
  value: number;
  icon: string;
  change: string;
}

interface UpcomingExam {
  course: string;
  exam: string;
  date: string;
}

// Users data
export const usersData: User[] = [
  { 
    id: "1", 
    name: "John Admin", 
    email: "admin@example.com", 
    role: "admin",
    phone: "+1 (555) 123-4567",
    address: "123 Admin St, Management City, 54321",
    birthDate: "January 10, 1980",
    bio: "Experienced administrator with a focus on educational technologies.",
    education: "MBA in Educational Administration",
    occupation: "Administrator"
  },
  { 
    id: "2", 
    name: "Jane Teacher", 
    email: "teacher@example.com", 
    role: "teacher",
    phone: "+1 (555) 987-6543",
    address: "456 Teaching Ave, Education City, 12345",
    birthDate: "March 15, 1985",
    bio: "Passionate educator with 10+ years of teaching experience.",
    education: "PhD in Computer Science",
    occupation: "Teacher"
  },
  { 
    id: "3", 
    name: "Sam Student", 
    email: "student@example.com", 
    role: "student",
    phone: "+1 (555) 234-5678",
    address: "789 Learning Lane, Student City, 67890",
    birthDate: "May 20, 1998",
    bio: "Dedicated student pursuing a degree in Computer Science.",
    education: "Bachelor's in Computer Science (in progress)",
    occupation: "Student"
  }
];

// Student dashboard data
export const studentData = {
  courses: [
    {
      id: 1,
      title: "Introduction to Web Development",
      thumbnail: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
      progress: 65,
      completedLessons: 13,
      totalLessons: 20,
      lastLesson: "CSS Flexbox",
      teacher: "John Smith",
      description: "Learn the fundamentals of web development with HTML, CSS and JavaScript.",
      nextLessonId: 14
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      progress: 40,
      completedLessons: 8,
      totalLessons: 20,
      lastLesson: "Data Visualization",
      teacher: "Michael Chen",
      description: "Master the basics of data science and analysis.",
      nextLessonId: 9
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      thumbnail: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d",
      progress: 25,
      completedLessons: 5,
      totalLessons: 20,
      lastLesson: "Social Media Strategy",
      teacher: "Sarah Johnson",
      description: "Develop effective digital marketing strategies for businesses.",
      nextLessonId: 6
    }
  ],
  upcomingExams: [
    {
      id: 1,
      title: "Web Development Mid-term",
      date: "May 10, 2025",
      time: "10:00 AM"
    },
    {
      id: 2,
      title: "Data Science Quiz",
      date: "May 15, 2025",
      time: "2:00 PM"
    }
  ],
  announcements: [
    {
      id: 1,
      title: "Platform Maintenance",
      date: "April 20, 2025",
      content: "The platform will be down for maintenance on Sunday from 2:00 AM to 4:00 AM."
    },
    {
      id: 2,
      title: "New Courses Available",
      date: "April 18, 2025",
      content: "Check out our newly added courses on Mobile App Development and UI/UX Design."
    }
  ]
};

// Teacher dashboard data
export const teacherData = {
  stats: [
    { title: "Total Courses", value: 8, icon: "BookOpen", change: "+2 this year" },
    { title: "Active Students", value: 342, icon: "Users", change: "+27 this month" },
    { title: "Course Views", value: 2845, icon: "PlayCircle", change: "+18% from last month" },
    { title: "Exams Created", value: 23, icon: "Award", change: "+5 this month" },
  ],
  courses: [
    { id: "1", title: "JavaScript Fundamentals", students: 124, rating: 4.8, lastUpdated: "2 days ago", progress: 90 },
    { id: "2", title: "Advanced React & Redux", students: 97, rating: 4.7, lastUpdated: "1 week ago", progress: 75 },
    { id: "3", title: "Node.js API Development", students: 68, rating: 4.5, lastUpdated: "2 weeks ago", progress: 60 },
    { id: "4", title: "Web Design Principles", students: 53, rating: 4.6, lastUpdated: "1 month ago", progress: 100 },
  ],
  recentActivities: [
    "John Smith enrolled in JavaScript Fundamentals",
    "Maria Garcia completed Module 3 in Advanced React",
    "Robert Johnson started Module 1 in Node.js API Development",
    "Sarah Williams submitted Quiz 2 in Web Design Principles"
  ],
  upcomingExams: [
    { course: "JavaScript Fundamentals", exam: "Final Assessment", date: "Tomorrow, 10:00 AM" },
    { course: "Advanced React & Redux", exam: "Redux Middleware", date: "May 20, 2:00 PM" },
    { course: "Node.js API Development", exam: "REST API Design", date: "May 25, 3:30 PM" },
    { course: "Web Design Principles", exam: "UI/UX Principles", date: "June 2, 11:00 AM" }
  ],
  activityTimes: ["1 hour", "3 hours", "1 day", "2 days"]
};

// Admin dashboard data
export const adminData = {
  stats: [
    { title: "Total Students", value: 1256, icon: "Users", change: "+12% from last month" },
    { title: "Total Teachers", value: 73, icon: "BookOpen", change: "+5% from last month" },
    { title: "Total Courses", value: 142, icon: "BookPlus", change: "+8% from last month" },
    { title: "Total Exams", value: 320, icon: "ClipboardCheck", change: "+15% from last month" },
  ],
  recentActions: [
    { action: "New student registered", time: "5 minutes ago", icon: "UserPlus" },
    { action: "New course created", time: "1 hour ago", icon: "BookPlus" },
    { action: "Exam results published", time: "3 hours ago", icon: "Award" },
    { action: "Course enrollment increased", time: "12 hours ago", icon: "TrendingUp" },
  ],
  popularCourses: [
    { title: "Web Development Bootcamp", students: 89, modules: 12 },
    { title: "Data Science Fundamentals", students: 76, modules: 10 },
    { title: "UI/UX Design Masterclass", students: 64, modules: 8 },
    { title: "Python for Machine Learning", students: 52, modules: 6 }
  ]
};

// Students list data
export const studentsData = [
  { id: "1", name: "John Doe", email: "john@example.com", progress: 85, lastActive: "Today", enrolled: "Apr 10, 2023" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", progress: 72, lastActive: "Yesterday", enrolled: "May 15, 2023" },
  { id: "3", name: "Michael Lee", email: "michael@example.com", progress: 65, lastActive: "3 days ago", enrolled: "Jan 05, 2023" },
  { id: "4", name: "Sarah Wilson", email: "sarah@example.com", progress: 92, lastActive: "Today", enrolled: "Feb 20, 2023" },
  { id: "5", name: "David Thompson", email: "david@example.com", progress: 45, lastActive: "1 week ago", enrolled: "Mar 12, 2023" },
  { id: "6", name: "Emma Johnson", email: "emma@example.com", progress: 78, lastActive: "2 days ago", enrolled: "Jun 30, 2023" },
];

// Reports data
export const reportsData = {
  enrollmentData: [
    { month: 'Jan', students: 65 },
    { month: 'Feb', students: 78 },
    { month: 'Mar', students: 90 },
    { month: 'Apr', students: 105 },
    { month: 'May', students: 125 },
    { month: 'Jun', students: 142 },
    { month: 'Jul', students: 138 },
    { month: 'Aug', students: 152 },
    { month: 'Sep', students: 170 },
    { month: 'Oct', students: 195 },
    { month: 'Nov', students: 220 },
    { month: 'Dec', students: 256 }
  ],
  courseDistributionData: [
    { name: 'Web Development', value: 40 },
    { name: 'Data Science', value: 30 },
    { name: 'Mobile App Dev', value: 20 },
    { name: 'UI/UX Design', value: 10 }
  ],
  topPerformingCourses: [
    { id: 1, title: 'JavaScript Fundamentals', enrollment: 128, rating: 4.8, completion: 92 },
    { id: 2, title: 'Advanced React & Redux', enrollment: 97, rating: 4.7, completion: 88 },
    { id: 3, title: 'Data Science Bootcamp', enrollment: 85, rating: 4.9, completion: 95 },
    { id: 4, title: 'Mobile App Development', enrollment: 76, rating: 4.6, completion: 85 },
    { id: 5, title: 'UI/UX Design Principles', enrollment: 68, rating: 4.5, completion: 82 }
  ]
};

// Exporting the original courses data too
export const allCoursesData: Course[] = [
  { 
    id: "1", 
    title: "JavaScript Fundamentals", 
    teacher: "Robert Johnson", 
    progress: 75, 
    lastAccessed: "2 days ago",
    modules: 12,
    completedModules: 9,
    thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    resources: [
      { type: "video", title: "Introduction to JavaScript", duration: "15:30" },
      { type: "pdf", title: "Variables and Data Types", pages: 12 },
      { type: "quiz", title: "Basic Syntax Quiz", questions: 10 },
      { type: "video", title: "Control Flow", duration: "20:45" },
      { type: "pdf", title: "Functions in JavaScript", pages: 18 }
    ]
  },
  { 
    id: "2", 
    title: "UI/UX Design Fundamentals", 
    teacher: "Lisa Martinez", 
    progress: 32, 
    lastAccessed: "1 week ago",
    modules: 15,
    completedModules: 5,
    thumbnail: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
    resources: [
      { type: "video", title: "Design Principles", duration: "25:10" },
      { type: "pdf", title: "Color Theory", pages: 20 },
      { type: "quiz", title: "UX Terminology Quiz", questions: 15 },
      { type: "video", title: "User Research Methods", duration: "18:30" },
      { type: "pdf", title: "Wireframing Basics", pages: 14 }
    ]
  },
  { 
    id: "3", 
    title: "Python for Data Science", 
    teacher: "Emily Davis", 
    progress: 18, 
    lastAccessed: "3 weeks ago",
    modules: 14,
    completedModules: 2,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    resources: [
      { type: "video", title: "Python Basics", duration: "22:15" },
      { type: "pdf", title: "Data Structures in Python", pages: 16 },
      { type: "quiz", title: "Python Syntax Quiz", questions: 12 },
      { type: "video", title: "NumPy Introduction", duration: "24:40" },
      { type: "pdf", title: "Pandas Fundamentals", pages: 22 }
    ]
  },
  { 
    id: "4", 
    title: "HTML & CSS Basics", 
    teacher: "Michael Brown", 
    progress: 100,
    completedDate: "Mar 15, 2023", 
    modules: 8,
    completedModules: 8,
    certificate: true,
    thumbnail: "https://images.unsplash.com/photo-1621839673705-6617adf9e890",
    resources: [
      { type: "video", title: "HTML Structure", duration: "18:25" },
      { type: "pdf", title: "CSS Selectors", pages: 10 },
      { type: "quiz", title: "HTML Elements Quiz", questions: 8 },
      { type: "video", title: "CSS Box Model", duration: "16:30" },
      { type: "pdf", title: "Responsive Design", pages: 15 }
    ]
  },
  { 
    id: "5", 
    title: "Introduction to Web Development", 
    teacher: "Robert Johnson", 
    progress: 100,
    completedDate: "Jan 20, 2023", 
    modules: 10,
    completedModules: 10,
    certificate: true,
    thumbnail: "https://images.unsplash.com/photo-1484417894907-623942c8ee29",
    resources: [
      { type: "video", title: "Web Fundamentals", duration: "20:15" },
      { type: "pdf", title: "HTTP Protocol", pages: 12 },
      { type: "quiz", title: "Web Concepts Quiz", questions: 10 },
      { type: "video", title: "Browser Rendering", duration: "19:45" },
      { type: "pdf", title: "Developer Tools", pages: 14 }
    ]
  },
];

// Adding the data from MyCourses.tsx
export const myCoursesData = {
  enrolledCourses: allCoursesData.filter(course => course.progress < 100),
  completedCourses: allCoursesData.filter(course => course.progress === 100)
};

// Exams data that was in ExamsList.tsx
export const examsData = {
  upcomingExams: [
    {
      id: "1",
      title: "JavaScript Fundamentals - Final Exam",
      course: "JavaScript Fundamentals",
      courseId: "course1",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      timeLimit: 120,
      questions: 50,
      status: "scheduled",
    },
    {
      id: "2",
      title: "UI/UX Design Principles",
      course: "UI/UX Design Fundamentals",
      courseId: "course2",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      timeLimit: 90,
      questions: 40,
      status: "scheduled",
    },
  ],
  completedExams: [
    {
      id: "3",
      title: "HTML & CSS Basics - Final Assessment",
      course: "HTML & CSS Basics",
      courseId: "course3",
      completedDate: "2025-03-15T15:45:00Z",
      score: 92,
      maxScore: 100,
      timeTaken: 85,
      rank: 3,
      totalParticipants: 124,
    },
    {
      id: "4",
      title: "Web Development Introduction",
      course: "Introduction to Web Development",
      courseId: "course4",
      completedDate: "2025-02-20T11:30:00Z",
      score: 85,
      maxScore: 100,
      timeTaken: 65,
      rank: 12,
      totalParticipants: 156,
    },
  ],
};

// Helper functions to access the data (simulating API calls)
export const fetchUserData = (userId: string): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = usersData.find(u => u.id === userId);
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not found"));
      }
    }, 200); // Simulating network delay
  });
};

export const fetchStudentDashboardData = (): Promise<typeof studentData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(studentData);
    }, 300);
  });
};

export const fetchTeacherDashboardData = (): Promise<typeof teacherData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teacherData);
    }, 300);
  });
};

export const fetchAdminDashboardData = (): Promise<typeof adminData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(adminData);
    }, 300);
  });
};

export const fetchStudentsList = (): Promise<typeof studentsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(studentsData);
    }, 250);
  });
};

export const fetchReportsData = (): Promise<typeof reportsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(reportsData);
    }, 400);
  });
};

export function getCourseById(courseId: string): Promise<Course | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = allCoursesData.find(course => course.id === courseId);
      resolve(course);
    }, 200);
  });
}

// Simulate updating profile data
export const updateUserProfile = (userId: string, profileData: Partial<User>): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = usersData.findIndex(u => u.id === userId);
      if (userIndex >= 0) {
        usersData[userIndex] = { ...usersData[userIndex], ...profileData };
        resolve(usersData[userIndex]);
      } else {
        reject(new Error("User not found"));
      }
    }, 300);
  });
};

// New function to fetch exams data
export const fetchExamsData = (): Promise<typeof examsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(examsData);
    }, 300);
  });
};

// New function to fetch my courses data
export const fetchMyCourses = (): Promise<typeof myCoursesData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(myCoursesData);
    }, 250);
  });
};

// Additional interfaces for course-related data
interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
}

interface CourseQuiz {
  id: string;
  title: string;
  questions: number;
  timeLimit: number;
  dueDate: string;
  completed?: boolean;
  score?: number;
}

interface CourseLesson {
  id: string;
  title: string;
  completed: boolean;
  duration: string;
}

interface CourseNote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  moduleId: string;
}

interface CourseDiscussion {
  id: string;
  title: string;
  user: string;
  avatar: string;
  date: string;
  content: string;
  replies: number;
}

interface CourseAssignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  submitted: boolean;
  grade?: string;
  feedback?: string;
}

interface CourseCurriculumItem {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "assignment";
  duration?: string;
  completed: boolean;
}

interface CourseStudent {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  enrolled: string;
}

interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
}

// CreateCoursePage data
export const createCourseData = {
  categories: [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "AI & Machine Learning",
    "Design",
    "Business",
    "Marketing",
    "Personal Development"
  ],
  levels: ["Beginner", "Intermediate", "Advanced", "All Levels"],
  languages: ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Korean"]
};

// CoursesList data
export const coursesListData = {
  courses: [
    {
      id: "cl1",
      title: "JavaScript Fundamentals",
      students: 124,
      rating: 4.8,
      lastUpdated: "May 1, 2025",
      status: "published",
      thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159"
    },
    {
      id: "cl2",
      title: "Advanced React & Redux",
      students: 97,
      rating: 4.7,
      lastUpdated: "April 28, 2025",
      status: "published",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2"
    },
    {
      id: "cl3",
      title: "Node.js API Development",
      students: 68,
      rating: 4.5,
      lastUpdated: "April 20, 2025",
      status: "draft",
      thumbnail: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4"
    }
  ]
};

// CourseQuiz data
export const courseQuizzesData = {
  quizzes: [
    {
      id: "q1",
      title: "JavaScript Basics Quiz",
      questions: 10,
      timeLimit: 15,
      dueDate: "May 10, 2025",
      completed: false
    },
    {
      id: "q2",
      title: "Advanced Functions Quiz",
      questions: 8,
      timeLimit: 12,
      dueDate: "May 15, 2025",
      completed: true,
      score: 85
    },
    {
      id: "q3",
      title: "DOM Manipulation",
      questions: 12,
      timeLimit: 20,
      dueDate: "May 20, 2025",
      completed: false
    }
  ]
};

// CourseNotes data
export const courseNotesData = {
  notes: [
    {
      id: "n1",
      title: "JavaScript Variables and Data Types",
      content: "Notes about variables, let vs const, and primitive data types in JavaScript.",
      createdAt: "April 28, 2025",
      updatedAt: "April 30, 2025",
      moduleId: "m1"
    },
    {
      id: "n2",
      title: "Functions and Scope",
      content: "Understanding function declarations, expressions, and scope in JavaScript.",
      createdAt: "April 29, 2025",
      updatedAt: "April 29, 2025",
      moduleId: "m2"
    }
  ]
};

// CourseDiscussions data
export const courseDiscussionsData = {
  discussions: [
    {
      id: "d1",
      title: "How to handle state in complex React applications?",
      user: "John Smith",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      date: "2 days ago",
      content: "I'm working on a complex React app and struggling with state management. Would Redux be overkill for this?",
      replies: 8
    },
    {
      id: "d2",
      title: "Best practices for API error handling",
      user: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      date: "1 week ago",
      content: "What's the best way to handle API errors in a React application? Should I use try/catch or handle them in a middleware?",
      replies: 5
    }
  ]
};

// CourseModules data
export const courseModulesData = {
  modules: [
    {
      id: "m1",
      title: "Introduction to JavaScript",
      description: "Learn the basics of JavaScript programming language.",
      lessons: 5,
      duration: "2 hours 30 mins"
    },
    {
      id: "m2",
      title: "Working with Functions",
      description: "Understanding functions and their role in JavaScript.",
      lessons: 4,
      duration: "2 hours"
    },
    {
      id: "m3",
      title: "Objects and Arrays",
      description: "Mastering JavaScript data structures.",
      lessons: 6,
      duration: "3 hours 15 mins"
    }
  ]
};

// CourseLessons data (expanded from what was in CourseLesson.tsx)
export const courseLessonsData = {
  lessons: [
    {
      id: "js-lesson-8",
      title: "Functions and Callbacks",
      completed: true,
      duration: "45 mins"
    },
    {
      id: "js-lesson-9",
      title: "Working with Objects",
      completed: false,
      duration: "50 mins"
    },
    {
      id: "js-lesson-10",
      title: "Arrays and Array Methods",
      completed: false,
      duration: "40 mins"
    },
    {
      id: "js-lesson-11",
      title: "DOM Manipulation",
      completed: false,
      duration: "55 mins"
    },
    {
      id: "js-lesson-12",
      title: "Event Handling",
      completed: false,
      duration: "45 mins"
    }
  ],
  courses: [
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
        { id: "js-lesson-12", title: "Event Handling", completed: false, duration: "45 mins" }
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
        { id: "react-lesson-9", title: "Performance Optimization", completed: false, duration: "65 mins" }
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
        { id: "node-lesson-12", title: "API Documentation", completed: false, duration: "40 mins" }
      ]
    }
  ]
};

// CourseAssignments data
export const courseAssignmentsData = {
  assignments: [
    {
      id: "a1",
      title: "Build a Todo List App",
      description: "Create a simple todo list app using HTML, CSS, and JavaScript.",
      dueDate: "May 12, 2025",
      submitted: false
    },
    {
      id: "a2",
      title: "React Components Library",
      description: "Build a reusable component library with React and Styled Components.",
      dueDate: "May 5, 2025",
      submitted: true,
      grade: "A",
      feedback: "Excellent work on the component architecture and documentation."
    },
    {
      id: "a3",
      title: "RESTful API Implementation",
      description: "Implement a RESTful API with Node.js and Express.",
      dueDate: "May 20, 2025",
      submitted: false
    }
  ]
};

// CourseCurriculum data
export const courseCurriculumData = {
  sections: [
    {
      id: "s1",
      title: "Getting Started",
      items: [
        { id: "i1", title: "Introduction", type: "video", duration: "10 mins", completed: true },
        { id: "i2", title: "Setting Up Your Environment", type: "video", duration: "15 mins", completed: true },
        { id: "i3", title: "Basic Concepts Quiz", type: "quiz", completed: true }
      ]
    },
    {
      id: "s2",
      title: "Core Concepts",
      items: [
        { id: "i4", title: "Data Types and Variables", type: "video", duration: "25 mins", completed: true },
        { id: "i5", title: "Control Flow", type: "reading", completed: false },
        { id: "i6", title: "Functions", type: "video", duration: "30 mins", completed: false },
        { id: "i7", title: "First Assignment", type: "assignment", completed: false }
      ]
    },
    {
      id: "s3",
      title: "Advanced Topics",
      items: [
        { id: "i8", title: "Object-Oriented Programming", type: "video", duration: "45 mins", completed: false },
        { id: "i9", title: "Asynchronous JavaScript", type: "video", duration: "40 mins", completed: false },
        { id: "i10", title: "Final Project", type: "assignment", completed: false }
      ]
    }
  ]
};

// BrowseCourses data
export const browseCoursesData = {
  categories: [
    "All Categories",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Design",
    "Business",
    "Marketing"
  ],
  levels: ["All Levels", "Beginner", "Intermediate", "Advanced"],
  courses: [
    {
      id: "bc1",
      title: "JavaScript Fundamentals",
      instructor: "Robert Johnson",
      rating: 4.8,
      students: 13540,
      price: 59.99,
      thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
      category: "Web Development",
      level: "Beginner",
      bestseller: true
    },
    {
      id: "bc2",
      title: "Advanced React & Redux",
      instructor: "Emily Davis",
      rating: 4.7,
      students: 8920,
      price: 79.99,
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
      category: "Web Development",
      level: "Intermediate"
    },
    {
      id: "bc3",
      title: "Python for Data Science",
      instructor: "Michael Chen",
      rating: 4.9,
      students: 15200,
      price: 69.99,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      category: "Data Science",
      level: "Beginner",
      bestseller: true
    },
    {
      id: "bc4",
      title: "Flutter App Development",
      instructor: "Sarah Williams",
      rating: 4.6,
      students: 7450,
      price: 89.99,
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
      category: "Mobile Development",
      level: "Intermediate"
    }
  ]
};

// ManageCourse data
export const manageCourseData = {
  course: {
    id: "mc1",
    title: "JavaScript Fundamentals",
    description: "A comprehensive introduction to JavaScript programming language.",
    thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    enrolled: 124,
    rating: 4.8,
    lastUpdated: "April 28, 2025",
    status: "published",
    modules: 8,
    totalLessons: 42,
    totalDuration: "32 hours"
  },
  students: [
    {
      id: "s1",
      name: "John Doe",
      email: "john@example.com",
      progress: 85,
      lastActive: "2 days ago"
    },
    {
      id: "s2",
      name: "Jane Smith",
      email: "jane@example.com",
      progress: 72,
      lastActive: "Yesterday"
    },
    {
      id: "s3",
      name: "Michael Brown",
      email: "michael@example.com",
      progress: 35,
      lastActive: "1 week ago"
    }
  ]
};

// StudentDashboardFeatures data
export const studentDashboardFeaturesData = {
  course: {
    id: "1",
    title: "JavaScript Fundamentals",
    teacher: "Robert Johnson",
    progress: 65,
    modules: 8,
    completedModules: 5,
    thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    nextLesson: {
      id: "l14",
      title: "Asynchronous JavaScript",
      module: "Advanced JavaScript Concepts"
    }
  },
  features: [
    { id: "f1", title: "Lessons", icon: "BookOpen", path: "lessons" },
    { id: "f2", title: "Quizzes", icon: "CheckSquare", path: "quizzes" },
    { id: "f3", title: "Notes", icon: "FileText", path: "notes" },
    { id: "f4", title: "Discussions", icon: "MessageCircle", path: "discussions" },
    { id: "f5", title: "Assignments", icon: "Clipboard", path: "assignments" }
  ],
  announcements: [
    {
      id: "a1",
      title: "New Quiz Available",
      date: "May 2, 2025",
      content: "A new quiz on JavaScript Promises is now available. Please complete it by May 10."
    },
    {
      id: "a2",
      title: "Live Coding Session",
      date: "April 30, 2025",
      content: "Join us for a live coding session on May 5 at 3:00 PM EST."
    }
  ],
  upcomingDeadlines: [
    {
      id: "d1",
      title: "JavaScript Promises Quiz",
      due: "May 10, 2025",
      type: "quiz"
    },
    {
      id: "d2",
      title: "Build a REST API",
      due: "May 15, 2025",
      type: "assignment"
    }
  ]
};

// TakeExam data
export const takeExamData = {
  exam: {
    id: "e1",
    title: "JavaScript Fundamentals - Final Exam",
    courseId: "course1",
    timeLimit: 120, // in minutes
    questions: [
      {
        id: "q1",
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Integer", "Symbol"],
        correctOption: 2
      },
      {
        id: "q2",
        question: "Which method is used to add elements to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctOption: 0
      },
      {
        id: "q3",
        question: "What does the === operator do in JavaScript?",
        options: [
          "Assigns a value",
          "Compares values only",
          "Compares values and types",
          "Logical OR"
        ],
        correctOption: 2
      },
      {
        id: "q4",
        question: "Which function is used to parse a string to an integer in JavaScript?",
        options: ["Integer.parse()", "parseInteger()", "parseInt()", "Number.parseInteger()"],
        correctOption: 2
      },
      {
        id: "q5",
        question: "What does JSON.stringify() do?",
        options: [
          "Parses JSON to an object",
          "Converts an object to a JSON string",
          "Validates JSON format",
          "None of the above"
        ],
        correctOption: 1
      }
    ]
  }
};

// UsersList data
export const usersListData = {
  users: [
    {
      id: "u1",
      name: "John Smith",
      email: "john@example.com",
      role: "student",
      joinDate: "Jan 15, 2025",
      status: "active",
      courses: 3
    },
    {
      id: "u2",
      name: "Maria Garcia",
      email: "maria@example.com",
      role: "student",
      joinDate: "Feb 10, 2025",
      status: "active",
      courses: 2
    },
    {
      id: "u3",
      name: "Robert Johnson",
      email: "robert@example.com",
      role: "teacher",
      joinDate: "Dec 5, 2024",
      status: "active",
      courses: 5
    },
    {
      id: "u4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "teacher",
      joinDate: "Mar 20, 2025",
      status: "active",
      courses: 2
    },
    {
      id: "u5",
      name: "David Chen",
      email: "david@example.com",
      role: "admin",
      joinDate: "Nov 12, 2024",
      status: "active",
      courses: 0
    }
  ]
};

// CourseDetailView data
export const courseDetailViewData = {
  course: {
    id: "cd1",
    title: "JavaScript Fundamentals",
    instructor: "Robert Johnson",
    rating: 4.8,
    students: 13540,
    price: 59.99,
    thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    category: "Web Development",
    level: "Beginner",
    lastUpdated: "April 2025",
    description: "A comprehensive introduction to JavaScript programming language with hands-on projects and exercises.",
    whatYouWillLearn: [
      "Understand core JavaScript concepts",
      "Work with DOM manipulation",
      "Handle events and callbacks",
      "Create interactive web applications",
      "Implement asynchronous JavaScript"
    ],
    prerequisites: [
      "Basic HTML and CSS knowledge",
      "No prior programming experience required",
      "A modern web browser and text editor"
    ],
    modules: [
      {
        id: "m1",
        title: "Introduction to JavaScript",
        lessons: 5,
        duration: "2 hours 30 mins"
      },
      {
        id: "m2",
        title: "Working with Functions",
        lessons: 4,
        duration: "2 hours"
      },
      {
        id: "m3",
        title: "Objects and Arrays",
        lessons: 6,
        duration: "3 hours 15 mins"
      }
    ]
  },
  reviews: [
    {
      id: "r1",
      user: "John D.",
      rating: 5,
      date: "April 15, 2025",
      content: "Excellent course! The explanations are clear and the exercises are practical."
    },
    {
      id: "r2",
      user: "Sarah W.",
      rating: 4,
      date: "April 10, 2025",
      content: "Good introduction to JavaScript. I would have liked more advanced topics."
    },
    {
      id: "r3",
      user: "Michael B.",
      rating: 5,
      date: "April 5, 2025",
      content: "The instructor is engaging and explains concepts well. Highly recommended!"
    }
  ]
};

// New functions to access the added data
export const fetchCreateCourseData = (): Promise<typeof createCourseData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(createCourseData);
    }, 250);
  });
};

export const fetchCoursesList = (): Promise<typeof coursesListData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(coursesListData);
    }, 250);
  });
};

export const fetchCourseQuizzes = (courseId: string): Promise<typeof courseQuizzesData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courseQuizzesData);
    }, 300);
  });
};

export const fetchCourseNotes = (courseId: string): Promise<typeof courseNotesData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courseNotesData);
    }, 300);
  });
};

export const fetchCourseLessons = (courseId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = courseLessonsData.courses.find(c => c.id === courseId);
      resolve(course);
    }, 300);
  });
};

export const fetchCourseDiscussions = (courseId: string): Promise<typeof courseDiscussionsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courseDiscussionsData);
    }, 300);
  });
};

export const fetchCourseModules = (courseId: string): Promise<typeof courseModulesData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courseModulesData);
    }, 300);
  });
};

export const fetchCourseAssignments = (courseId: string): Promise<typeof courseAssignmentsData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courseAssignmentsData);
    }, 300);
  });
};

export const fetchCourseCurriculum = (courseId: string): Promise<typeof courseCurriculumData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courseCurriculumData);
    }, 300);
  });
};

export const fetchBrowseCoursesData = (): Promise<typeof browseCoursesData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(browseCoursesData);
    }, 250);
  });
};

export const fetchManageCourseData = (courseId: string): Promise<typeof manageCourseData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(manageCourseData);
    }, 300);
  });
};

export const fetchStudentDashboardFeaturesData = (courseId: string): Promise<typeof studentDashboardFeaturesData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(studentDashboardFeaturesData);
    }, 300);
  });
};

export const fetchExamTakeData = (examId: string): Promise<typeof takeExamData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(takeExamData);
    }, 300);
  });
};

export const fetchUsersListData = (): Promise<typeof usersListData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(usersListData);
    }, 250);
  });
};

export const fetchCourseDetailData = (courseId: string): Promise<typeof courseDetailViewData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courseDetailViewData);
    }, 300);
  });
};
