
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X, BookOpen, Star, Users, Clock, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BrowseCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
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
    },
  ];
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {selectedCourse ? (
        <div className="space-y-6">
          <Button 
            variant="outline" 
            onClick={() => setSelectedCourse(null)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <div className="h-[300px] w-full overflow-hidden">
                  <img 
                    src={selectedCourse.thumbnail} 
                    alt={selectedCourse.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{selectedCourse.level}</Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{selectedCourse.rating}</span>
                      <span className="ml-1 text-xs text-muted-foreground">({selectedCourse.reviews} reviews)</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl mt-2">{selectedCourse.title}</CardTitle>
                  <CardDescription className="text-base">{selectedCourse.longDescription || selectedCourse.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedCourse.curriculum && selectedCourse.curriculum.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Curriculum</h3>
                      <ul className="space-y-2">
                        {selectedCourse.curriculum.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedCourse.faqs && selectedCourse.faqs.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">FAQs</h3>
                      <div className="space-y-3">
                        {selectedCourse.faqs.map((faq, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2">{faq.question}</h4>
                            <p className="text-muted-foreground text-sm">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">${selectedCourse.price}</CardTitle>
                  <CardDescription>One-time payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{selectedCourse.hours} hours of content</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{selectedCourse.students} students enrolled</span>
                  </div>
                  <Button className="w-full">Enroll Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Explore Courses</h1>
            <p className="text-muted-foreground">Discover courses to expand your knowledge and skills.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for courses, topics, or instructors..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Categories</Button>
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Sort</Button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="h-40 w-full overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {course.level}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{course.rating}</span>
                        <span className="ml-1 text-xs text-muted-foreground">({course.reviews})</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2 h-10">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="flex items-center mr-4">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.hours} hours</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      By <span className="font-medium">{course.teacher}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <div className="text-lg font-bold">${course.price}</div>
                    <Button>Enroll Now</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-10">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BrowseCourses;
