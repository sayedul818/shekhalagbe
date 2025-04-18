import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BookOpen } from "lucide-react";

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  
  // Provide default values for courseData including the features array
  const courseData = location.state?.courseData || {
    title: "Sample Course",
    price: 6499.00,
    duration: "4 months",
    access: "One year",
    description: "Sample course description",
    thumbnail: "/lovable-uploads/d3bc180c-0abf-4922-aaac-c28c2389b3da.png",
    features: [
      "Complete Course Material",
      "Live Doubt Assistance",
      "Library of Questions with Video Solutions",
      "Alternate Day Chapters",
      "Quant Aptitude + Logical Reasoning"
    ]
  };

  // Ensure features is always an array even if it's missing in courseData
  const features = courseData.features || [];

  // Ensure price is always a number for toFixed()
  const price = typeof courseData.price === 'number' ? courseData.price : Number(courseData.price) || 0;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone || !fullName) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Payment successful!",
        description: "You have successfully enrolled in the course.",
      });
      setIsLoading(false);
      navigate("/dashboard/courses");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-primary">ShekhaLagbe</h1>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Course Details (Left Side) */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">{courseData.title}</h2>
          
          {courseData.description && (
            <p className="text-gray-600 leading-relaxed">
              {courseData.description}
            </p>
          )}
          
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={courseData.thumbnail || "/lovable-uploads/d3bc180c-0abf-4922-aaac-c28c2389b3da.png"} 
              alt={courseData.title}
              className="w-full object-cover rounded-lg aspect-video"
            />
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Course Duration</p>
                <p className="text-gray-600">{courseData.duration}</p>
              </div>
              <div>
                <p className="font-medium">Course Access</p>
                <p className="text-gray-600">{courseData.access}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">What you'll get:</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Details (Right Side) */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Amount</span>
                <span className="font-semibold">₹{price.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500">
                (18% GST included which is paid to the Government)
              </p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please recheck this email as course access will be given here"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Please recheck as we might use this to add you to the community"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Please enter full name"
                />
              </div>

              <div className="pt-4">
                <img 
                  src="/lovable-uploads/b1bca833-473e-4bdf-9a63-c305c70d36ec.png" 
                  alt="Payment Methods" 
                  className="h-8 mb-4"
                />
                <Button 
                  type="submit" 
                  className="w-full text-lg py-6"
                  disabled={isLoading}
                >
                  Pay ₹{price.toFixed(2)}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
