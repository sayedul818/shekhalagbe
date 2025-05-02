
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X, BookOpen, Star, Users, Clock, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import CourseDetailView from "./CourseDetailView";
import { fetchBrowseCoursesData } from "@/lib/course-data";

const BrowseCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem("enrolledCourses");
    return saved ? JSON.parse(saved) : [];
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchBrowseCoursesData();
        setCourses(data.courses);
      } catch (err) {
        console.error("Error loading courses data:", err);
        setError("Failed to load courses");
        toast({
          title: "Error",
          description: "Failed to load courses",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadCourses();
  }, [toast]);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    if (enrolledCourses.includes(courseId)) {
      toast({
        title: "Already Enrolled",
        description: `You are already enrolled in ${course.title}`,
        variant: "default",
      });
      navigate("/dashboard/my-courses");
      return;
    }
    
    const updatedEnrolledCourses = [...enrolledCourses, courseId];
    setEnrolledCourses(updatedEnrolledCourses);
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedEnrolledCourses));
    
    toast({
      title: "Enrollment Successful",
      description: `You have successfully enrolled in ${course.title}`,
      variant: "default",
    });
    
    navigate("/dashboard/my-courses");
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Explore Courses</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Error Loading Courses</h3>
            <p className="text-muted-foreground text-center mb-4">
              {error}
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selectedCourse ? (
        <CourseDetailView 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)}
        />
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
                    <Button onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course);
                    }}>
                      Explore Course
                    </Button>
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
