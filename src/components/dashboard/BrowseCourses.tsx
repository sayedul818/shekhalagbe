
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X, BookOpen, Star, Users, Clock } from "lucide-react";

const BrowseCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock courses data
  const courses = [
    { 
      id: "1", 
      title: "JavaScript Fundamentals", 
      description: "Learn JavaScript from the ground up with practical exercises and real-world examples.",
      teacher: "Robert Johnson", 
      rating: 4.8,
      reviews: 324,
      students: 1245, 
      price: 49.99, 
      hours: 15,
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc"
    },
    { 
      id: "2", 
      title: "Advanced React & Redux", 
      description: "Master React, Redux, and modern frontend development patterns.",
      teacher: "Emily Davis", 
      rating: 4.7,
      reviews: 256,
      students: 975, 
      price: 69.99, 
      hours: 18,
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2"
    },
    { 
      id: "3", 
      title: "Node.js API Development", 
      description: "Build robust and scalable APIs with Node.js, Express, and MongoDB.",
      teacher: "Robert Johnson", 
      rating: 4.5,
      reviews: 198,
      students: 687, 
      price: 59.99, 
      hours: 12,
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34"
    },
    { 
      id: "4", 
      title: "Web Design Principles", 
      description: "Learn fundamental principles of modern web design and UX/UI best practices.",
      teacher: "Lisa Martinez", 
      rating: 4.6,
      reviews: 176,
      students: 532, 
      price: 39.99, 
      hours: 10,
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d"
    },
    { 
      id: "5", 
      title: "Python for Data Science", 
      description: "Learn Python and its powerful libraries for data analysis and visualization.",
      teacher: "Emily Davis", 
      rating: 4.9,
      reviews: 287,
      students: 892, 
      price: 49.99, 
      hours: 14,
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
    },
    { 
      id: "6", 
      title: "UI/UX Design Masterclass", 
      description: "A comprehensive course on modern UI/UX design from concept to implementation.",
      teacher: "Lisa Martinez", 
      rating: 4.8,
      reviews: 234,
      students: 768, 
      price: 79.99, 
      hours: 20,
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
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
    </div>
  );
};

export default BrowseCourses;
