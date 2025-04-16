
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <header className="bg-gradient-to-r from-primary to-primary-foreground py-16 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">ShekhaLagbe Learning Platform</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl">
              Your complete solution for online education. Connect with teachers, access courses, and take exams all in one place.
            </p>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signin">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Features section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Comprehensive Course Library</h3>
              <p>Access hundreds of courses across multiple disciplines, taught by expert instructors.</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Interactive Learning Experience</h3>
              <p>Engage with video lessons, quizzes, and hands-on exercises designed for maximum retention.</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Skill Certification</h3>
              <p>Earn certificates upon course completion to showcase your skills to employers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* User roles section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">For Everyone</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Students</h3>
              <p className="mb-4">Learn at your own pace with access to a wide range of courses. Track your progress and connect with teachers directly.</p>
              {!user && (
                <Link to="/signup">
                  <Button className="w-full">Join as Student</Button>
                </Link>
              )}
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Teachers</h3>
              <p className="mb-4">Create and manage your courses, track student progress, and administer exams all from one dashboard.</p>
              {!user && (
                <Link to="/signup">
                  <Button className="w-full" variant="outline">Join as Teacher</Button>
                </Link>
              )}
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Administrators</h3>
              <p className="mb-4">Oversee the entire platform, manage users, and ensure quality education standards are maintained.</p>
              {!user && (
                <Link to="/signup">
                  <Button className="w-full" variant="outline">Join as Admin</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ShekhaLagbe</h3>
              <p>Your complete solution for online education.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/courses" className="hover:underline">Courses</Link></li>
                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Twitter</a></li>
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:underline">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center">
            <p>&copy; {new Date().getFullYear()} ShekhaLagbe Learning Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
