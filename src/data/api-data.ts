// Mock API data functions for the LMS platform
// In a real application, these would be replaced with actual API calls

// Course creation related data
export const fetchCreateCourseData = async () => {
  return {
    categories: [
      "Web Development",
      "Mobile Development",
      "Data Science",
      "Design",
      "Business",
      "Marketing",
      "Photography",
      "Music",
      "Health & Fitness"
    ],
    levels: ["Beginner", "Intermediate", "Advanced", "All Levels"]
  };
};

// Course listings data
export const fetchCoursesList = async () => {
  return {
    courses: [
      { 
        id: "1", 
        title: "JavaScript Fundamentals", 
        teacher: "Robert Johnson", 
        students: 124, 
        price: 49.99, 
        created: "Apr 10, 2023",
        modules: 12,
        published: true
      },
      { 
        id: "2", 
        title: "Advanced React & Redux", 
        teacher: "Emily Davis", 
        students: 97, 
        price: 69.99, 
        created: "May 15, 2023",
        modules: 15,
        published: true
      },
      { 
        id: "3", 
        title: "Node.js API Development", 
        teacher: "Robert Johnson", 
        students: 68, 
        price: 59.99, 
        created: "Jan 05, 2023",
        modules: 10,
        published: true
      },
      { 
        id: "4", 
        title: "Web Design Principles", 
        teacher: "Lisa Martinez", 
        students: 53, 
        price: 39.99, 
        created: "Feb 20, 2023",
        modules: 8,
        published: true
      },
      { 
        id: "5", 
        title: "Python for Data Science", 
        teacher: "Emily Davis", 
        students: 89, 
        price: 49.99, 
        created: "Mar 12, 2023",
        modules: 14,
        published: true
      },
      { 
        id: "6", 
        title: "UI/UX Design Masterclass", 
        teacher: "Lisa Martinez", 
        students: 76, 
        price: 79.99, 
        created: "Jun 30, 2023",
        modules: 20,
        published: false
      }
    ]
  };
};

// Course quizzes data
export const fetchCourseQuizzes = async (courseId: string) => {
  return {
    quizzes: [
      {
        id: "q1",
        title: "JavaScript Fundamentals Quiz",
        description: "Test your knowledge of JavaScript basics",
        timeLimit: "30 minutes",
        passingScore: 70,
        totalQuestions: 10,
        questions: [
          {
            id: 1,
            text: "Which of the following is not a JavaScript data type?",
            options: ["String", "Number", "Boolean", "Character"],
            correctAnswer: 3
          },
          {
            id: 2,
            text: "What does the '===' operator do in JavaScript?",
            options: ["Assigns a value", "Compares values only", "Compares values and data types", "None of the above"],
            correctAnswer: 2
          },
          {
            id: 3,
            text: "Which method adds an element to the end of an array?",
            options: ["push()", "pop()", "unshift()", "shift()"],
            correctAnswer: 0
          },
          {
            id: 4,
            text: "What does 'DOM' stand for?",
            options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Model"],
            correctAnswer: 0
          },
          {
            id: 5,
            text: "Which statement is used to terminate a loop in JavaScript?",
            options: ["stop", "exit", "break", "return"],
            correctAnswer: 2
          }
        ]
      }
    ]
  };
};

// Course notes data
export const fetchCourseNotes = async (courseId: string) => {
  return {
    notes: [
      {
        id: "n1",
        title: "JavaScript Variables and Types",
        content: "JavaScript has dynamic typing. Variables can be declared using var, let, or const. var is function-scoped, while let and const are block-scoped. const cannot be reassigned. Common types include: string, number, boolean, null, undefined, object, and symbol.",
        module: "Core Concepts",
        lastEdited: "2025-04-15T14:30:00",
        tags: ["variables", "types", "javascript"]
      },
      {
        id: "n2",
        title: "DOM Manipulation Methods",
        content: "Common DOM methods:\n- document.getElementById()\n- document.querySelector()\n- document.querySelectorAll()\n- element.innerHTML\n- element.textContent\n- element.setAttribute()\n- element.classList.add/remove/toggle()\n- element.appendChild()\n- element.addEventListener()",
        module: "DOM Fundamentals",
        lastEdited: "2025-04-18T09:45:00",
        tags: ["DOM", "methods", "javascript"]
      },
      {
        id: "n3",
        title: "Event Handling Best Practices",
        content: "1. Use event delegation for multiple similar elements\n2. Clean up event listeners when components unmount\n3. Debounce or throttle expensive handlers\n4. Prefer named functions over anonymous ones\n5. Remember to prevent default behavior when needed\n6. Consider using custom events for complex interactions",
        module: "DOM Fundamentals",
        lastEdited: "2025-04-19T16:20:00",
        tags: ["events", "performance", "javascript"]
      }
    ]
  };
};

// Course lessons data
export const fetchCourseLessons = async (courseId: string) => {
  const courses = [
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
  ];

  const course = courses.find(c => c.id === courseId);
  return { course };
};

// Course discussions data
export const fetchCourseDiscussions = async (courseId: string) => {
  return {
    threads: [
      {
        id: "t1",
        title: "Help with JavaScript Arrays",
        content: "I'm having trouble understanding the difference between map() and forEach(). Could someone explain when to use each one?",
        author: "Alex Johnson",
        avatarUrl: "https://i.pravatar.cc/150?u=alex",
        datePosted: "2025-04-15T10:30:00",
        replies: [
          {
            id: "r1",
            content: "The main difference is that map() returns a new array with transformed elements, while forEach() just iterates through the array and doesn't return anything. Use map() when you want to transform elements and create a new array, and forEach() when you just want to perform some action on each element without changing the array.",
            author: "Sarah Miller",
            avatarUrl: "https://i.pravatar.cc/150?u=sarah",
            datePosted: "2025-04-15T11:45:00",
            isInstructor: true
          },
          {
            id: "r2",
            content: "To add to what Sarah said, here's a quick example:\n\n```js\n// map example - returns new array\nconst numbers = [1, 2, 3];\nconst doubled = numbers.map(n => n * 2); // [2, 4, 6]\n\n// forEach example - no return value\nlet sum = 0;\nnumbers.forEach(n => sum += n); // sum becomes 6\n```",
            author: "David Wong",
            avatarUrl: "https://i.pravatar.cc/150?u=david",
            datePosted: "2025-04-15T14:20:00"
          }
        ]
      },
      {
        id: "t2",
        title: "Assignment #2 Clarification",
        content: "For the DOM manipulation project, do we need to implement local storage to save the to-do items, or is it okay if they reset when the page refreshes?",
        author: "Emma Thompson",
        avatarUrl: "https://i.pravatar.cc/150?u=emma",
        datePosted: "2025-04-18T09:15:00",
        replies: [
          {
            id: "r3",
            content: "Great question, Emma! Local storage implementation is considered a bonus feature for this assignment. The base requirements only include adding, completing, and deleting tasks during a session. However, adding persistence with localStorage would definitely earn you extra points!",
            author: "Robert Johnson",
            avatarUrl: "https://i.pravatar.cc/150?u=robert",
            datePosted: "2025-04-18T10:05:00",
            isInstructor: true
          }
        ]
      },
      {
        id: "t3",
        title: "Resources for learning more about promises",
        content: "Can anyone recommend good resources for learning more about JavaScript promises and async/await? I'm finding it difficult to understand the concepts fully.",
        author: "Miguel Sanchez",
        avatarUrl: "https://i.pravatar.cc/150?u=miguel",
        datePosted: "2025-04-20T16:30:00",
        replies: []
      }
    ]
  };
};

// Course curriculum data
export const fetchCourseCurriculum = async (courseId: string) => {
  return {
    sections: [
      {
        id: "s1",
        title: "Getting Started",
        items: [
          {
            id: "i1",
            title: "Course Overview",
            type: "video",
            duration: "10 mins",
            completed: true
          },
          {
            id: "i2",
            title: "Setting Up Your Environment",
            type: "video",
            duration: "15 mins",
            completed: true
          }
        ]
      },
      {
        id: "s2",
        title: "JavaScript Fundamentals",
        items: [
          {
            id: "i3",
            title: "Variables and Data Types",
            type: "video",
            duration: "25 mins",
            completed: true
          },
          {
            id: "i4",
            title: "Control Flow",
            type: "video",
            duration: "30 mins",
            completed: false
          },
          {
            id: "i5",
            title: "Functions",
            type: "reading",
            completed: false
          }
        ]
      },
      {
        id: "s3",
        title: "Assessment",
        items: [
          {
            id: "i6",
            title: "Module Quiz",
            type: "quiz",
            completed: false
          },
          {
            id: "i7",
            title: "Coding Challenge",
            type: "assignment",
            completed: false
          }
        ]
      }
    ]
  };
};

// Course assignments data
export const fetchCourseAssignments = async (courseId: string) => {
  return {
    assignments: [
      {
        id: "a1",
        title: "Build a Weather App",
        description: "Create a simple weather application using the OpenWeather API. The app should display current weather conditions and a 5-day forecast.",
        dueDate: "2025-05-15T23:59:00",
        submitted: false
      },
      {
        id: "a2",
        title: "Todo List Application",
        description: "Develop a todo list application with features such as adding, completing, and deleting tasks. Include local storage functionality.",
        dueDate: "2025-05-01T23:59:00",
        submitted: true,
        grade: "92/100",
        feedback: "Excellent work! The application works perfectly. Consider adding filter options for better user experience."
      },
      {
        id: "a3",
        title: "E-commerce Product Page",
        description: "Create a responsive product page for an e-commerce site. Include image gallery, product details, pricing, and an 'Add to Cart' button.",
        dueDate: "2025-05-22T23:59:00",
        submitted: false
      }
    ]
  };
};

// Browse courses data
export const fetchBrowseCoursesData = async () => {
  return {
    courses: [
      { 
        id: "1", 
        title: "JavaScript Fundamentals", 
        description: "Learn JavaScript from the ground up with practical exercises and real-world examples.",
        longDescription: "Master JavaScript fundamentals through hands-on projects and real-world applications. Perfect for beginners looking to start their web development journey.",
        teacher: "Robert Johnson", 
        rating: 4.8,
        reviews: 324,
        students: 1245, 
        price: 49.99, 
        hours: 15,
        level: "Beginner",
        thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        curriculum: [
          "Introduction to JavaScript",
          "Variables and Data Types",
          "Control Flow and Functions",
          "DOM Manipulation",
          "Async Programming",
        ],
        features: ["Lifetime access", "15 hours of content", "Certificate of completion", "Access on mobile and TV", "Downloadable resources"],
        faqs: [
          {
            question: "Do I need prior programming experience?",
            answer: "No prior experience needed. This course starts from the basics."
          },
          {
            question: "What will I be able to build after this course?",
            answer: "You'll be able to create interactive web applications and understand modern JavaScript code."
          }
        ]
      },
      { 
        id: "2", 
        title: "Advanced React & Redux", 
        description: "Master React, Redux, and modern frontend development patterns.",
        longDescription: "Take your React skills to the next level with advanced patterns, Redux state management, and performance optimization techniques.",
        teacher: "Emily Davis", 
        rating: 4.7,
        reviews: 256,
        students: 975, 
        price: 69.99, 
        hours: 18,
        level: "Intermediate",
        thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
        curriculum: [
          "Advanced React Hooks",
          "Redux Toolkit",
          "Performance Optimization",
          "Testing React Applications",
          "Server-Side Rendering",
        ],
        features: ["Lifetime access", "18 hours of content", "Certificate of completion", "Access on mobile and TV", "Downloadable resources", "Premium support"],
        faqs: [
          {
            question: "Is this course right for beginners?",
            answer: "This course is designed for developers who already have basic React knowledge."
          },
          {
            question: "Will we build real applications?",
            answer: "Yes, you'll build multiple production-ready applications throughout the course."
          }
        ]
      },
      { 
        id: "3", 
        title: "Node.js API Development", 
        description: "Build robust and scalable APIs with Node.js, Express, and MongoDB.",
        longDescription: "Learn to design, build, and deploy production-ready APIs using Node.js, Express, and MongoDB. Perfect for developers looking to master backend development.",
        teacher: "Robert Johnson", 
        rating: 4.5,
        reviews: 198,
        students: 687, 
        price: 59.99, 
        hours: 12,
        level: "Intermediate",
        thumbnail: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34",
        curriculum: [
          "RESTful API Design",
          "Express.js Framework",
          "MongoDB & Mongoose",
          "Authentication & Authorization",
          "API Testing & Deployment",
        ],
        features: ["Lifetime access", "12 hours of content", "Certificate of completion", "Access on mobile and TV", "Downloadable resources"],
        faqs: [
          {
            question: "Do I need database experience?",
            answer: "Basic database concepts are helpful but not required. We cover MongoDB from the ground up."
          },
          {
            question: "What will I be able to build after this course?",
            answer: "You'll be able to build professional backend systems and APIs for web and mobile applications."
          }
        ]
      },
      { 
        id: "4", 
        title: "Web Design Principles", 
        description: "Learn fundamental principles of modern web design and UX/UI best practices.",
        longDescription: "Master the fundamentals of effective web design including layout principles, color theory, typography, and responsive design. Create beautiful, user-friendly websites.",
        teacher: "Lisa Martinez", 
        rating: 4.6,
        reviews: 176,
        students: 532, 
        price: 39.99, 
        hours: 10,
        level: "Beginner",
        thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
        curriculum: [
          "Design Fundamentals",
          "Typography & Color Theory",
          "Layout & Composition",
          "Responsive Design",
          "UI/UX Best Practices",
        ],
        features: ["Lifetime access", "10 hours of content", "Certificate of completion", "Access on mobile and TV", "Downloadable resources"],
        faqs: [
          {
            question: "Do I need to know how to code?",
            answer: "No coding experience is required. This course focuses on design principles."
          },
          {
            question: "What software will we use?",
            answer: "We'll use Figma for design, which has a free tier sufficient for the course."
          }
        ]
      },
      { 
        id: "5", 
        title: "Python for Data Science", 
        description: "Learn Python and its powerful libraries for data analysis and visualization.",
        longDescription: "Discover how to use Python for data manipulation, analysis, and visualization. Learn libraries like Pandas, NumPy, and Matplotlib to extract insights from data.",
        teacher: "Emily Davis", 
        rating: 4.9,
        reviews: 287,
        students: 892, 
        price: 49.99, 
        hours: 14,
        level: "Beginner",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        curriculum: [
          "Python Fundamentals",
          "Data Manipulation with Pandas",
          "Numerical Computing with NumPy",
          "Data Visualization",
          "Machine Learning Basics",
        ],
        features: ["Lifetime access", "14 hours of content", "Certificate of completion", "Access on mobile and TV", "Downloadable resources"],
        faqs: [
          {
            question: "Is programming experience needed?",
            answer: "No prior programming experience is needed. We start from the basics."
          },
          {
            question: "What kind of computer do I need?",
            answer: "Any modern computer running Windows, macOS, or Linux will work for this course."
          }
        ]
      },
      { 
        id: "6", 
        title: "UI/UX Design Masterclass", 
        description: "A comprehensive course on modern UI/UX design from concept to implementation.",
        longDescription: "Learn end-to-end UI/UX design processes from user research to high-fidelity prototypes. Master design thinking and create engaging user experiences.",
        teacher: "Lisa Martinez", 
        rating: 4.8,
        reviews: 234,
        students: 768, 
        price: 79.99, 
        hours: 20,
        level: "Intermediate",
        thumbnail: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
        curriculum: [
          "User Research Methods",
          "Information Architecture",
          "Wireframing & Prototyping",
          "User Testing",
          "Design Systems",
        ],
        features: ["Lifetime access", "20 hours of content", "Certificate of completion", "Access on mobile and TV", "Downloadable resources", "Premium support"],
        faqs: [
          {
            question: "Is this course for beginners?",
            answer: "This course is best for those with some basic design knowledge, but motivated beginners can follow along."
          },
          {
            question: "Will I get feedback on my designs?",
            answer: "Yes, you'll receive feedback through peer reviews and instructor reviews on major assignments."
          }
        ]
      }
    ]
  };
};

// Manage course data
export const fetchManageCourseData = async (courseId: string) => {
  return {
    course: {
      id: courseId,
      title: "JavaScript Fundamentals",
      description: "Learn JavaScript from the ground up with practical exercises and real-world examples.",
      price: 49.99,
      category: "Web Development",
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      modules: [
        {
          id: "m1",
          title: "Getting Started",
          lessons: [
            {
              id: "l1",
              title: "Course Overview",
              type: "video",
              duration: "10 mins"
            },
            {
              id: "l2",
              title: "Setting Up Your Environment",
              type: "video",
              duration: "15 mins"
            }
          ]
        },
        {
          id: "m2",
          title: "JavaScript Fundamentals",
          lessons: [
            {
              id: "l3",
              title: "Variables and Data Types",
              type: "video",
              duration: "25 mins"
            },
            {
              id: "l4",
              title: "Control Flow",
              type: "video",
              duration: "30 mins"
            },
            {
              id: "l5",
              title: "Functions",
              type: "reading",
              duration: "20 mins"
            }
          ]
        }
      ],
      enrollments: 124,
      revenue: 6198.76,
      reviews: {
        average: 4.8,
        count: 45,
        distribution: [
          { rating: 5, count: 30 },
          { rating: 4, count: 12 },
          { rating: 3, count: 2 },
          { rating: 2, count: 0 },
          { rating: 1, count: 1 }
        ]
      },
      published: true
    }
  };
};

// Student dashboard features data
export const fetchStudentDashboardFeaturesData = async () => {
  return {
    enrolledCourses: [
      { 
        id: "1", 
        title: "JavaScript Fundamentals", 
        progress: 60, 
        thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        lastAccessed: "2025-04-28T14:30:00",
        nextLesson: "Functions and Objects"
      },
      { 
        id: "2", 
        title: "Advanced React & Redux", 
        progress: 35, 
        thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
        lastAccessed: "2025-04-27T10:15:00",
        nextLesson: "Redux Middleware"
      },
      { 
        id: "3", 
        title: "Node.js API Development", 
        progress: 80, 
        thumbnail: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34",
        lastAccessed: "2025-04-25T16:45:00",
        nextLesson: "Authentication & Authorization"
      }
    ],
    upcomingDeadlines: [
      {
        id: "d1",
        title: "Todo List Application",
        courseId: "1",
        courseTitle: "JavaScript Fundamentals",
        dueDate: "2025-05-01T23:59:00",
        type: "assignment"
      },
      {
        id: "d2",
        title: "Web Development Fundamentals",
        courseId: "1",
        courseTitle: "JavaScript Fundamentals",
        dueDate: "2025-05-03T14:00:00",
        type: "exam"
      },
      {
        id: "d3",
        title: "E-commerce Product Page",
        courseId: "3",
        courseTitle: "Node.js API Development",
        dueDate: "2025-05-22T23:59:00",
        type: "assignment"
      }
    ],
    announcements: [
      {
        id: "a1",
        title: "Live Q&A Session",
        courseId: "1",
        courseTitle: "JavaScript Fundamentals",
        date: "2025-05-05T18:00:00",
        description: "Join us for a live Q&A session to discuss your questions about the recent modules on functions and objects."
      },
      {
        id: "a2",
        title: "Assignment Deadline Extended",
        courseId: "2",
        courseTitle: "Advanced React & Redux",
        date: "2025-04-25T09:30:00",
        description: "The deadline for the Redux project has been extended to May 10th. Take advantage of this extra time to polish your work."
      }
    ],
    completedItems: [
      {
        id: "c1",
        title: "Variables and Data Types",
        courseId: "1",
        courseTitle: "JavaScript Fundamentals",
        completedDate: "2025-04-20T15:45:00",
        type: "lesson"
      },
      {
        id: "c2",
        title: "Module 1 Quiz",
        courseId: "1",
        courseTitle: "JavaScript Fundamentals",
        completedDate: "2025-04-22T11:30:00",
        type: "quiz",
        score: 90
      },
      {
        id: "c3",
        title: "Basic React Setup",
        courseId: "2",
        courseTitle: "Advanced React & Redux",
        completedDate: "2025-04-15T14:20:00",
        type: "lesson"
      }
    ]
  };
};

// Exam taking data
export const fetchExamTakeData = async (examId: string) => {
  return {
    exam: {
      id: examId,
      title: "JavaScript Fundamentals Final Exam",
      description: "This exam covers all the material from the JavaScript Fundamentals course.",
      timeLimit: 60, // in minutes
      questions: [
        {
          id: "q1",
          text: "Which of the following is not a JavaScript data type?",
          options: ["String", "Number", "Boolean", "Character"],
          correctAnswer: 3
        },
        {
          id: "q2",
          text: "What does the '===' operator do in JavaScript?",
          options: ["Assigns a value", "Compares values only", "Compares values and data types", "None of the above"],
          correctAnswer: 2
        },
        {
          id: "q3",
          text: "Which method adds an element to the end of an array?",
          options: ["push()", "pop()", "unshift()", "shift()"],
          correctAnswer: 0
        },
        {
          id: "q4",
          text: "What does 'DOM' stand for?",
          options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Model"],
          correctAnswer: 0
        },
        {
          id: "q5",
          text: "Which statement is used to terminate a loop in JavaScript?",
          options: ["stop", "exit", "break", "return"],
          correctAnswer: 2
        },
        {
          id: "q6",
          text: "Which of the following is not a way to declare a variable in JavaScript?",
          options: ["var", "let", "const", "variable"],
          correctAnswer: 3
        },
        {
          id: "q7",
          text: "What is the output of: console.log(typeof [])?",
          options: ["array", "object", "Array", "undefined"],
          correctAnswer: 1
        },
        {
          id: "q8",
          text: "Which method is used to add elements to the beginning of an array?",
          options: ["unshift()", "shift()", "push()", "pop()"],
          correctAnswer: 0
        }
      ]
    }
  };
};

// Admin Dashboard Data
export const fetchAdminDashboardData = async () => {
  return {
    stats: {
      totalUsers: 2547,
      activeUsers: 1823,
      totalCourses: 156,
      totalRevenue: 128750.45
    },
    recentUsers: [
      { id: "u1", name: "Sarah Johnson", email: "sarah.j@example.com", role: "student", joinDate: "2025-04-28T10:15:00" },
      { id: "u2", name: "Michael Chen", email: "m.chen@example.com", role: "teacher", joinDate: "2025-04-27T14:30:00" },
      { id: "u3", name: "Emma Davis", email: "emma.d@example.com", role: "student", joinDate: "2025-04-25T09:45:00" }
    ],
    recentCourses: [
      { id: "c1", title: "Advanced JavaScript", teacher: "Robert Johnson", enrolled: 45, created: "2025-04-24T11:00:00" },
      { id: "c2", title: "UI/UX Fundamentals", teacher: "Lisa Martinez", enrolled: 32, created: "2025-04-22T15:30:00" },
      { id: "c3", title: "Python Data Analysis", teacher: "Emily Davis", enrolled: 28, created: "2025-04-20T10:00:00" }
    ],
    activityGraph: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [
        { name: "Course Views", data: [320, 380, 275, 410, 390, 301, 285] },
        { name: "Lesson Completions", data: [145, 203, 175, 190, 250, 220, 170] }
      ]
    }
  };
};

// User Data
export const fetchUserData = async (userId: string) => {
  return {
    id: userId,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "student",
    avatar: "https://i.pravatar.cc/300?u=john",
    bio: "Passionate learner interested in web development and data science.",
    joinDate: "2024-10-15T08:30:00",
    location: "San Francisco, CA",
    website: "https://johndoe.example.com",
    socialLinks: {
      twitter: "johndoe_twitter",
      linkedin: "johndoe_linkedin",
      github: "johndoe_github"
    },
    preferences: {
      emailNotifications: true,
      darkMode: false,
      language: "English",
      timezone: "America/Los_Angeles"
    }
  };
};

// Update User Profile
export const updateUserProfile = async (userId: string, data: any) => {
  // In a real app, this would send the data to an API
  console.log(`Updating user ${userId} with data:`, data);
  return {
    success: true,
    message: "Profile updated successfully"
  };
};

// Reports Data
export const fetchReportsData = async () => {
  return {
    courseEngagement: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      datasets: [
        {
          name: "Video Completions",
          data: [156, 178, 190, 205, 178]
        },
        {
          name: "Quiz Attempts",
          data: [132, 145, 150, 142, 128]
        },
        {
          name: "Discussion Posts",
          data: [45, 62, 80, 95, 76]
        }
      ]
    },
    coursesCompletionRates: [
      { id: "1", title: "JavaScript Fundamentals", completion: 78 },
      { id: "2", title: "Advanced React & Redux", completion: 65 },
      { id: "3", title: "Node.js API Development", completion: 82 },
      { id: "4", title: "Web Design Principles", completion: 91 },
      { id: "5", title: "Python for Data Science", completion: 73 }
    ],
    topPerformingStudents: [
      { id: "s1", name: "Emma Wilson", avgScore: 95, coursesCompleted: 4 },
      { id: "s2", name: "Daniel Garcia", avgScore: 92, coursesCompleted: 3 },
      { id: "s3", name: "Sophia Chen", avgScore: 90, coursesCompleted: 5 },
      { id: "s4", name: "Noah Jackson", avgScore: 88, coursesCompleted: 3 },
      { id: "s5", name: "Olivia Martinez", avgScore: 87, coursesCompleted: 4 }
    ],
    monthlyRevenue: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [12500, 15200, 14800, 16700, 19500, 21000]
    }
  };
};

// Student Dashboard Data
export const fetchStudentDashboardData = async () => {
  return {
    stats: {
      enrolledCourses: 3,
      completedCourses: 1,
      upcomingAssignments: 2,
      averageScore: 87
    },
    progressGraph: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [15, 28, 42, 55]
    },
    recentActivity: [
      { id: "a1", type: "assignment", title: "Completed 'Todo App' assignment", course: "JavaScript Fundamentals", date: "2025-05-01T14:30:00" },
      { id: "a2", type: "quiz", title: "Scored 90% on 'React Hooks' quiz", course: "Advanced React & Redux", date: "2025-04-28T10:15:00" },
      { id: "a3", type: "lesson", title: "Completed 'API Authentication' lesson", course: "Node.js API Development", date: "2025-04-25T16:45:00" }
    ],
    courseProgress: [
      { id: "1", title: "JavaScript Fundamentals", progress: 60 },
      { id: "2", title: "Advanced React & Redux", progress: 35 },
      { id: "3", title: "Node.js API Development", progress: 80 }
    ]
  };
};

// Course Modules
export const fetchCourseModules = async (courseId: string) => {
  return {
    modules: [
      {
        id: "m1",
        title: "Introduction to JavaScript",
        description: "Learn the basics of JavaScript programming language",
        lessons: [
          { id: "l1", title: "What is JavaScript?", type: "video", duration: "10 mins" },
          { id: "l2", title: "Setting Up Your Development Environment", type: "text" },
          { id: "l3", title: "Variables and Data Types", type: "video", duration: "15 mins" }
        ]
      },
      {
        id: "m2",
        title: "JavaScript Functions",
        description: "Master JavaScript functions and their usage",
        lessons: [
          { id: "l4", title: "Function Declarations", type: "video", duration: "12 mins" },
          { id: "l5", title: "Arrow Functions", type: "video", duration: "8 mins" },
          { id: "l6", title: "Higher-Order Functions", type: "text" },
          { id: "l7", title: "Practice: Building a Calculator", type: "assignment" }
        ]
      }
    ]
  };
};

// Students List Data
export const fetchStudentsList = async () => {
  return {
    students: [
      {
        id: "s1",
        name: "Emma Wilson",
        email: "emma.w@example.com",
        enrolledCourses: 3,
        joinDate: "2025-01-15T10:30:00",
        lastActive: "2025-05-01T15:45:00",
        progress: 78
      },
      {
        id: "s2",
        name: "Daniel Garcia",
        email: "daniel.g@example.com",
        enrolledCourses: 2,
        joinDate: "2025-02-10T09:15:00",
        lastActive: "2025-05-02T11:30:00",
        progress: 65
      },
      {
        id: "s3",
        name: "Sophia Chen",
        email: "sophia.c@example.com",
        enrolledCourses: 4,
        joinDate: "2024-12-05T14:20:00",
        lastActive: "2025-04-30T16:45:00",
        progress: 92
      }
    ]
  };
};

// Teacher Dashboard Data
export const fetchTeacherDashboardData = async () => {
  return {
    stats: {
      totalCourses: 6,
      totalStudents: 245,
      courseCompletionRate: 68,
      averageRating: 4.7
    },
    courseEngagement: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      datasets: [
        {
          name: "Video Views",
          data: [320, 380, 275, 410, 390]
        },
        {
          name: "Assignments Completed",
          data: [145, 203, 175, 190, 250]
        }
      ]
    },
    recentActivity: [
      { id: "a1", type: "enrollment", content: "5 new students enrolled in JavaScript Fundamentals", date: "2025-05-01T14:30:00" },
      { id: "a2", type: "assignment", content: "15 students submitted the React project", date: "2025-04-28T10:15:00" },
      { id: "a3", type: "discussion", content: "New question in Node.js API forum", date: "2025-04-25T16:45:00" }
    ],
    coursePerformance: [
      { id: "1", title: "JavaScript Fundamentals", students: 87, rating: 4.8, completion: 72 },
      { id: "2", title: "Advanced React & Redux", students: 65, rating: 4.7, completion: 58 },
      { id: "3", title: "Node.js API Development", students: 53, rating: 4.6, completion: 75 }
    ]
  };
};

// Users List Data
export const fetchUsersListData = async () => {
  return {
    users: [
      {
        id: "u1",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        role: "student",
        joinDate: "2025-01-15T10:30:00",
        lastActive: "2025-05-01T15:45:00",
        status: "active"
      },
      {
        id: "u2",
        name: "Michael Chen",
        email: "m.chen@example.com",
        role: "teacher",
        joinDate: "2024-11-10T09:15:00",
        lastActive: "2025-05-02T11:30:00",
        status: "active"
      },
      {
        id: "u3",
        name: "Emma Davis",
        email: "emma.d@example.com",
        role: "student",
        joinDate: "2025-02-05T14:20:00",
        lastActive: "2025-04-30T16:45:00",
        status: "active"
      },
      {
        id: "u4",
        name: "Robert Johnson",
        email: "r.johnson@example.com",
        role: "teacher",
        joinDate: "2024-10-20T11:45:00",
        lastActive: "2025-05-01T10:15:00",
        status: "active"
      },
      {
        id: "u5",
        name: "Lisa Martinez",
        email: "lisa.m@example.com",
        role: "teacher",
        joinDate: "2024-09-15T08:30:00",
        lastActive: "2025-04-29T14:30:00",
        status: "active"
      }
    ]
  };
};

// Exams Data
export const fetchExamsData = async () => {
  return {
    exams: [
      {
        id: "e1",
        title: "JavaScript Fundamentals Final Exam",
        course: "JavaScript Fundamentals",
        startDate: "2025-05-15T14:00:00",
        timeLimit: 60,
        questions: 25,
        status: "upcoming"
      },
      {
        id: "e2",
        title: "React Components and Hooks Quiz",
        course: "Advanced React & Redux",
        startDate: "2025-05-10T10:30:00",
        timeLimit: 30,
        questions: 15,
        status: "upcoming"
      },
      {
        id: "e3",
        title: "API Development Principles",
        course: "Node.js API Development",
        startDate: "2025-04-20T15:00:00",
        endDate: "2025-04-20T16:30:00",
        timeLimit: 90,
        questions: 30,
        status: "completed"
      }
    ],
    completedExams: [
      {
        id: "ce1",
        title: "API Development Principles",
        course: "Node.js API Development",
        completedDate: "2025-04-20T16:25:00",
        score: 85,
        maxScore: 100,
        timeTaken: 82,
        rank: 3,
        totalParticipants: 25
      },
      {
        id: "ce2",
        title: "JavaScript Basics Assessment",
        course: "JavaScript Fundamentals",
        completedDate: "2025-03-15T11:45:00",
        score: 92,
        maxScore: 100,
        timeTaken: 45,
        rank: 2,
        totalParticipants: 40
      }
    ]
  };
};

// My Courses
export const fetchMyCourses = async () => {
  return {
    inProgress: [
      {
        id: "1",
        title: "JavaScript Fundamentals",
        teacher: "Robert Johnson",
        progress: 60,
        modules: 12,
        completedModules: 7,
        thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        lastAccessed: "2025-04-28T14:30:00"
      },
      {
        id: "2",
        title: "Advanced React & Redux",
        teacher: "Emily Davis",
        progress: 35,
        modules: 15,
        completedModules: 5,
        thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
        lastAccessed: "2025-04-27T10:15:00"
      },
      {
        id: "3",
        title: "Node.js API Development",
        teacher: "Michael Chen",
        progress: 80,
        modules: 10,
        completedModules: 8,
        thumbnail: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34",
        lastAccessed: "2025-04-25T16:45:00"
      }
    ],
    completed: [
      {
        id: "4",
        title: "Web Design Principles",
        teacher: "Lisa Martinez",
        progress: 100,
        modules: 8,
        completedModules: 8,
        thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
        completedDate: "2025-03-15T11:30:00",
        certificate: true
      },
      {
        id: "5",
        title: "Python for Data Science",
        teacher: "Emily Davis",
        progress: 100,
        modules: 14,
        completedModules: 14,
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
        completedDate: "2025-02-28T09:45:00",
        certificate: true
      }
    ],
    recommendedCourses: [
      {
        id: "6",
        title: "UI/UX Design Masterclass",
        teacher: "Lisa Martinez",
        thumbnail: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
        price: 79.99,
        rating: 4.8,
        students: 768
      },
      {
        id: "7",
        title: "Full Stack Development with MERN",
        teacher: "Robert Johnson",
        thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
        price: 89.99,
        rating: 4.9,
        students: 932
      }
    ],
    availableCoursesSections: [
      {
        id: "s1",
        title: "Web Development",
        lessons: [
          { id: "l1", title: "HTML & CSS Basics" },
          { id: "l2", title: "JavaScript DOM Manipulation" }
        ]
      },
      {
        id: "s2",
        title: "Data Science",
        lessons: [
          { id: "l3", title: "Data Analysis with Python" },
          { id: "l4", title: "Machine Learning Fundamentals" }
        ]
      }
    ]
  };
};
