
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Users, Clock, ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface CourseDetailViewProps {
  course: any;
  onBack: () => void;
}

const CourseDetailView = ({ course, onBack }: CourseDetailViewProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const modules = [
    {
      title: "Introduction to the Course",
      lessons: ["Course Overview", "Setting Up Your Environment"],
      duration: "45 mins"
    },
    {
      title: "Core Concepts",
      lessons: ["Basic Principles", "Advanced Topics"],
      duration: "1.5 hours"
    }
  ];

  const handleEnroll = () => {
    navigate("/checkout", { state: { courseData: course } });
  };

  return (
    <div className="container mx-auto max-w-7xl py-6 px-4 sm:px-6">
      {/* Header Section */}
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Courses
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-[200px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <img 
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-base md:text-lg text-muted-foreground">{course.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex items-center space-x-4 p-4">
                  <Clock className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{course.hours} hours</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-4 p-4">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="font-medium">{course.students}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-4 p-4">
                  <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p className="font-medium">{course.level}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>What you'll learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(course.curriculum || []).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">Course Content</h2>
              <Accordion type="single" collapsible className="w-full">
                {modules.map((module, index) => (
                  <AccordionItem key={index} value={`module-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-left">{module.title}</span>
                        <Badge variant="secondary" className="ml-2">{module.duration}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {module.lessons.map((lesson, idx) => (
                          <li key={idx} className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Sidebar - Floating on mobile */}
        <div className="lg:col-span-1">
          <Card className={isMobile ? "fixed bottom-0 left-0 right-0 z-10 rounded-b-none" : "sticky top-6"}>
            {isMobile ? (
              <>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold">${course.price}</CardTitle>
                  <CardDescription className="text-xs">One-time payment for lifetime access</CardDescription>
                </CardHeader>
                <CardContent className="py-2">
                  <Button onClick={handleEnroll} className="w-full text-base py-4">
                    Enroll Now
                  </Button>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">${course.price}</CardTitle>
                  <CardDescription>One-time payment for lifetime access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-2">
                    {(course.features || []).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={handleEnroll} className="w-full text-lg py-6">
                    Enroll Now
                  </Button>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailView;
