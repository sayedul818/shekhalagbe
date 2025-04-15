import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  Award,
  CheckCircle,
  GraduationCap,
  Star
} from "lucide-react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Diverse Courses",
      description: "Access a wide range of courses taught by expert instructors",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Teachers",
      description: "Learn from industry professionals and experienced educators",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Certificates",
      description: "Earn certificates upon successful course completion",
    },
  ];

  const popularCourses = [
    {
      title: "Web Development Bootcamp",
      instructor: "John Smith",
      rating: 4.9,
      students: 1200,
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
      category: "Programming",
    },
    {
      title: "Digital Marketing Mastery",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 980,
      image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d",
      category: "Marketing",
    },
    {
      title: "Data Science Fundamentals",
      instructor: "Michael Chen",
      rating: 4.7,
      students: 850,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      category: "Data Science",
    },
  ];

  const instructors = [
    {
      name: "Dr. Emily Watson",
      expertise: "Machine Learning",
      students: 5000,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      courses: 8,
    },
    {
      name: "Prof. David Miller",
      expertise: "Software Engineering",
      students: 4200,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
      courses: 6,
    },
    {
      name: "Lisa Anderson",
      expertise: "Business Analytics",
      students: 3800,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      courses: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold">ShekhaLagbe</span>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link to="/" className="text-foreground/60 hover:text-foreground">
                Home
              </Link>
              <a href="#courses" className="text-foreground/60 hover:text-foreground">
                Courses
              </a>
              <a href="#instructors" className="text-foreground/60 hover:text-foreground">
                Instructors
              </a>
              <a href="#about" className="text-foreground/60 hover:text-foreground">
                About
              </a>
              <Link to="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 space-y-2 bg-background border-b">
          <a href="#courses" className="block text-foreground/60 hover:text-foreground">Courses</a>
          <a href="#instructors" className="block text-foreground/60 hover:text-foreground">Instructors</a>
          <a href="#about" className="block text-foreground/60 hover:text-foreground">About</a>
          <Link to="/signin" className="block">
            <Button variant="ghost" className="w-full">Sign In</Button>
          </Link>
          <Link to="/signup" className="block">
            <Button className="w-full">Get Started</Button>
          </Link>
        </div>
      )}
      

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative pt-6 pb-16 sm:pb-24">
            <nav className="flex items-center justify-between">
              {/* <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="ml-2 text-2xl font-bold">ShekhaLagbe</span>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </div> */}
            </nav>

            <div className="mt-16 sm:mt-24">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  <span className="block">Learn Without Limits</span>
                  <span className="block text-primary">With ShekhaLagbe</span>
                </h1>
                <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                  Start, switch, or advance your career with our online courses.
                  Learn from industry experts and gain real-world skills.
                </p>
                <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Join Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-accent py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Why Choose ShekhaLagbe?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Courses Section */}
      <section id="courses" className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Popular Courses
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our most popular and highly-rated courses
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {popularCourses.map((course, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg bg-card shadow-lg transition-transform hover:scale-105">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {course.category}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    {course.title}
                  </h3>
                  <p className="mt-2 flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {course.students} students
                  </p>
                  <div className="mt-2 flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{course.rating}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Instructor: {course.instructor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Instructors Section */}
      <section id="instructors" className="py-16 bg-accent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Meet Our Expert Instructors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Learn from industry experts with years of experience
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.map((instructor, index) => (
              <div key={index} className="text-center">
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  {instructor.name}
                </h3>
                <p className="text-primary">{instructor.expertise}</p>
                <div className="mt-2 flex items-center justify-center space-x-4">
                  <span className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {instructor.students} students
                  </span>
                  <span className="flex items-center text-sm text-muted-foreground">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400" />
                    {instructor.rating}
                  </span>
                  <span className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="mr-1 h-4 w-4" />
                    {instructor.courses} courses
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                About ShekhaLagbe
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                ShekhaLagbe is a leading online learning platform that connects students
                with expert instructors from around the world. Our mission is to provide
                high-quality education that's accessible to everyone.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-8">
                <div className="flex items-center">
                  <GraduationCap className="h-12 w-12 text-primary" />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-foreground">50K+</h4>
                    <p className="text-muted-foreground">Graduates</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-12 w-12 text-primary" />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-foreground">200+</h4>
                    <p className="text-muted-foreground">Courses</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-12 w-12 text-primary" />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-foreground">100+</h4>
                    <p className="text-muted-foreground">Expert Instructors</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-12 w-12 text-primary" />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-foreground">4.8</h4>
                    <p className="text-muted-foreground">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  alt="Students collaborating"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary px-6 py-10 sm:py-16 sm:px-12">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
                  Ready to start learning?
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/90">
                  Join thousands of students already learning on ShekhaLagbe.
                  Start your journey today!
                </p>
                <div className="mt-8">
                  <Link to="/signup">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Start Learning Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 lg:mt-0">
                {[
                  "24/7 Support",
                  "Expert Instructors",
                  "Flexible Learning",
                  "Verified Certificates",
                ].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary-foreground/90" />
                    <span className="ml-2 text-primary-foreground/90">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
