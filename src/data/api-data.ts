
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

// Helper functions to access the data (simulating API calls)
export const fetchUserData = (userId: string): Promise<User | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = usersData.find(u => u.id === userId);
      resolve(user);
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
  return new Promise((resolve) => {
    setTimeout(() => {
      const userIndex = usersData.findIndex(u => u.id === userId);
      if (userIndex >= 0) {
        usersData[userIndex] = { ...usersData[userIndex], ...profileData };
        resolve(usersData[userIndex]);
      } else {
        throw new Error("User not found");
      }
    }, 300);
  });
};
