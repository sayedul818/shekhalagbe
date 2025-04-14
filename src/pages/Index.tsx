
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, CheckCircle } from "lucide-react";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative pt-6 pb-16 sm:pb-24">
            <nav className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="ml-2 text-2xl font-bold">CourseraLMS</span>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            </nav>

            <div className="mt-16 sm:mt-24">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  <span className="block">Learn Without Limits</span>
                  <span className="block text-primary">With CourseraLMS</span>
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
              Why Choose CourseraLMS?
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
                  Join thousands of students already learning on CourseraLMS.
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
