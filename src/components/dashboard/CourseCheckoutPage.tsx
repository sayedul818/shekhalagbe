
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Check, Mail, Phone, User, CreditCard } from "lucide-react";

const CourseCheckoutPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: ""
  });
  
  // Mock course data - in a real app, you would fetch this based on courseId
  const course = {
    id: courseId || "1",
    title: "JavaScript Fundamentals",
    subtitle: "Placement Preparation Batch (JavaScript)",
    description: "A comprehensive course covering JavaScript basics to advanced concepts.",
    thumbnail: "/placeholder.svg",
    price: 6499.00,
    duration: "4 months",
    access: "One year",
    startDate: "15th May",
    instructor: "Emily Davis",
    features: [
      "Complete JavaScript Language",
      "Complete Data Structures & Algorithms",
      "Live Doubt Assistance",
      "Library of Qs with Video Solutions of Top Companies",
      "Alternate Day Chapters"
    ],
    additionalFeatures: [
      "Quant Aptitude + Logical, Verbal Reasoning"
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    // In a real app, you would integrate with a payment gateway here
    
    // Validation
    if (!formData.email || !formData.phone || !formData.fullName) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Payment successful!",
      description: "You have successfully enrolled in this course.",
    });
    
    navigate(`/dashboard/courses/manage/${courseId}`);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center mb-8">
        <div className="bg-primary text-primary-foreground font-bold p-2 rounded mr-2">ELS</div>
        <h1 className="text-xl font-bold">E-LEARNING SYSTEM</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">{course.title}</h2>
          <div className="h-1 w-16 bg-primary"></div>
          
          <div className="rounded-md overflow-hidden">
            <img 
              src={course.thumbnail !== "/placeholder.svg" ? course.thumbnail : "/lovable-uploads/2e63ac0e-ba76-4429-8eea-d0ae08186679.png"} 
              alt={course.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div>
            <h3 className="font-semibold">{course.subtitle}</h3>
            <p className="text-muted-foreground mt-1">Let's get the journey started!</p>
          </div>
          
          <div className="space-y-2">
            <p><span className="font-medium">Course Duration:</span> {course.duration}</p>
            <p><span className="font-medium">Course access will be:</span> {course.access}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">With this course, you will get:</h3>
            <ul className="space-y-2">
              {course.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {course.additionalFeatures && course.additionalFeatures.length > 0 && (
            <div>
              <ul className="space-y-2">
                {course.additionalFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="text-primary text-sm mt-2">Show More</button>
            </div>
          )}
          
          <div>
            <h3 className="font-semibold">Contact Us:</h3>
            <div className="space-y-2 mt-2">
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:support@elearningsystem.com" className="text-primary">support@elearningsystem.com</a>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:9999999999" className="text-primary">9999999999</a>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold">Terms & Conditions:</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You agree to share information entered on this page with E-Learning System (owner of this page) and payment provider, adhering to applicable laws.
            </p>
          </div>
        </div>
        
        {/* Payment Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <div className="h-1 w-16 bg-primary"></div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <p className="font-medium">Amount</p>
                <div className="flex justify-between">
                  <p className="text-xl font-bold">₹{course.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">(18% GST included which is paid to the Government)</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="space-y-1">
                  <label htmlFor="email" className="font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      name="email"
                      placeholder="Enter your email" 
                      className="pl-10" 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Please recheck this email as course access will be given here</p>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="phone" className="font-medium">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      name="phone"
                      placeholder="Enter your phone number" 
                      className="pl-10" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Please recheck as we might use this to add you to the community</p>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="fullName" className="font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="fullName" 
                      name="fullName"
                      placeholder="Enter your full name" 
                      className="pl-10" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Please enter full name</p>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-wrap gap-2">
                    <img src="/placeholder.svg" alt="UPI" height="24" className="h-6" />
                    <img src="/placeholder.svg" alt="Visa" height="24" className="h-6" />
                    <img src="/placeholder.svg" alt="Mastercard" height="24" className="h-6" />
                    <img src="/placeholder.svg" alt="RuPay" height="24" className="h-6" />
                    <img src="/placeholder.svg" alt="NetBanking" height="24" className="h-6" />
                  </div>
                </div>
                <Button 
                  className="w-full text-lg py-6" 
                  size="lg"
                  onClick={handlePayment}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pay ₹{course.price.toFixed(2)}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center">
            <img src="/placeholder.svg" alt="Razorpay" className="h-8 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Want to create page like this for your Business? Visit 
              <a href="#" className="text-primary mx-1">Razorpay Payment Pages</a>
              to get started!
            </p>
            <p className="mt-2">
              <a href="#" className="text-primary text-sm">Report Page</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCheckoutPage;
