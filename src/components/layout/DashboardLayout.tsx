
import { useState, ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Home, 
  Book, 
  Users, 
  PieChart, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  UserPlus, 
  BookOpen, 
  Award,
  User
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const location = useLocation();

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const adminMenuItems = [
    { label: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/dashboard" },
    { label: "Users", icon: <Users className="h-5 w-5" />, path: "/dashboard/users" },
    { label: "Courses", icon: <Book className="h-5 w-5" />, path: "/dashboard/courses" },
    { label: "Reports", icon: <PieChart className="h-5 w-5" />, path: "/dashboard/reports" },
    { label: "Profile", icon: <User className="h-5 w-5" />, path: "/dashboard/profile" },
    { label: "Settings", icon: <Settings className="h-5 w-5" />, path: "/dashboard/settings" },
  ];

  const teacherMenuItems = [
    { label: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/dashboard" },
    { label: "My Courses", icon: <Book className="h-5 w-5" />, path: "/dashboard/courses" },
    { label: "Students", icon: <Users className="h-5 w-5" />, path: "/dashboard/students" },
    { label: "Exams", icon: <Award className="h-5 w-5" />, path: "/dashboard/exams" },
    { label: "Profile", icon: <User className="h-5 w-5" />, path: "/dashboard/profile" },
    { label: "Settings", icon: <Settings className="h-5 w-5" />, path: "/dashboard/settings" },
  ];

  const studentMenuItems = [
    { label: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/dashboard" },
    { label: "Browse Courses", icon: <BookOpen className="h-5 w-5" />, path: "/dashboard/browse" },
    { label: "My Courses", icon: <Book className="h-5 w-5" />, path: "/dashboard/my-courses" },
    { label: "Exams", icon: <Award className="h-5 w-5" />, path: "/dashboard/exams" },
    { label: "Profile", icon: <User className="h-5 w-5" />, path: "/dashboard/profile" },
    { label: "Settings", icon: <Settings className="h-5 w-5" />, path: "/dashboard/settings" },
  ];

  let menuItems;
  if (user?.role === "admin") {
    menuItems = adminMenuItems;
  } else if (user?.role === "teacher") {
    menuItems = teacherMenuItems;
  } else {
    menuItems = studentMenuItems;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:w-64`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">ShekhaLagbe</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3 px-6 py-4 border-b">
            <Avatar>
              {user?.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="mt-auto border-t px-6 py-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">ShekhaLagbe</span>
            </Link>
            <Avatar className="h-8 w-8">
              {user?.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
              )}
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
