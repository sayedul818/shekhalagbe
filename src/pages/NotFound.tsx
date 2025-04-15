
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Check if this is an exam page that was refreshed
    const isExamPage = location.pathname.includes('/dashboard/exams/take/');
    
    if (isExamPage) {
      // If it's an exam page, start a countdown to redirect to exams list
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/dashboard/exams');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [location.pathname, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const isExamPage = location.pathname.includes('/dashboard/exams/take/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-4">Page Not Found</p>
        
        {isExamPage ? (
          <>
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800">
                It looks like you refreshed an exam page. Refreshing during an exam can cause you to lose your progress.
              </p>
              <p className="text-yellow-800 mt-2">
                Redirecting to exams list in {countdown} seconds...
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button onClick={() => navigate('/dashboard/exams')} className="w-full">
                Go to Exams List
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 mb-6">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col space-y-2">
              <Button onClick={handleGoBack} variant="outline" className="w-full">
                Go Back
              </Button>
              <Button onClick={handleGoToDashboard} className="w-full">
                Go to Dashboard
              </Button>
              <Button onClick={handleGoHome} variant="secondary" className="w-full">
                Go to Home Page
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotFound;
