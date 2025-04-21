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
  }
  
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
  
  export function getCourseById(courseId: string): Course | undefined {
    return allCoursesData.find(course => course.id === courseId);
  }
  