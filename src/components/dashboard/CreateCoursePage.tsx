
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Clock, 
  BookText, 
  Image, 
  ArrowRight, 
  Tag, 
  Bookmark, 
  Gift, 
  DollarSign,
  FileCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

// Mock data for plans - same as in CoursesList
const pricePlans = [
  { id: 1, name: "Basic", price: 49.99, students: 10, storage: "1GB", description: "Perfect for small workshops and tutorials" },
  { id: 2, name: "Standard", price: 99.99, students: 50, storage: "5GB", description: "Ideal for most educators and small classes" },
  { id: 3, name: "Professional", price: 199.99, students: 100, storage: "20GB", description: "Great for established educators with larger audiences", popular: true },
  { id: 4, name: "Enterprise", price: 399.99, students: "Unlimited", storage: "50GB", description: "Complete solution for institutions and organizations" }
];

const timePeriods = [
  { value: "12", label: "12 months", discount: "15%" },
  { value: "24", label: "24 months", discount: "25%" },
  { value: "48", label: "48 months", discount: "75%" },
];

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business" },
  { value: "marketing", label: "Marketing" },
  { value: "photography", label: "Photography" },
  { value: "music", label: "Music" },
  { value: "health", label: "Health & Fitness" },
  { value: "language", label: "Language" },
];

const CreateCoursePage = () => {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan") || "1";
  const [selectedPlan, setSelectedPlan] = useState(pricePlans.find(p => p.id === parseInt(planId)));
  const [selectedPeriod, setSelectedPeriod] = useState("48");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "49.99",
      thumbnail: ""
    }
  });

  useEffect(() => {
    setSelectedPlan(pricePlans.find(p => p.id === parseInt(planId)));
  }, [planId]);

  const getDiscountAmount = () => {
    const period = timePeriods.find(p => p.value === selectedPeriod);
    const discountPercentage = parseInt(period.discount);
    const originalPrice = selectedPlan.price * parseInt(selectedPeriod);
    return (originalPrice * discountPercentage / 100).toFixed(2);
  };

  const getDiscountedPrice = () => {
    const originalPrice = selectedPlan.price * parseInt(selectedPeriod);
    const discount = parseFloat(getDiscountAmount());
    return (originalPrice - discount).toFixed(2);
  };

  const getOriginalPrice = () => {
    return (selectedPlan.price * parseInt(selectedPeriod)).toFixed(2);
  };

  const getMonthlyPrice = () => {
    return (parseFloat(getDiscountedPrice()) / parseInt(selectedPeriod)).toFixed(2);
  };

  const handleSubmit = (data) => {
    console.log("Course data:", data);
    console.log("Selected plan:", selectedPlan);
    console.log("Selected period:", selectedPeriod);
    
    // Navigate to the checkout page with plan data
    navigate("/checkout", {
      state: {
        plan: {
          ...selectedPlan,
          period: selectedPeriod,
          discountedPrice: getDiscountedPrice(),
          originalPrice: getOriginalPrice(),
          monthlyPrice: getMonthlyPrice(),
        },
        courseData: data
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create a New Course</h1>
        <p className="text-muted-foreground">Set up your course details and subscription plan</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Course Details Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookText className="h-5 w-5 text-primary" />
                Course Details
              </CardTitle>
              <CardDescription>
                Enter the basic information about your course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. JavaScript Fundamentals" {...field} />
                        </FormControl>
                        <FormDescription>
                          A clear, descriptive title helps students find your course
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what students will learn in this course..." 
                            className="min-h-32" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Include key topics, learning outcomes, and target audience
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the category that best fits your course content
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Price (USD)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Set a competitive price for your course
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Thumbnail</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-3">
                            <div className="border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center w-32 h-32 text-muted-foreground">
                              <Image className="h-8 w-8 mb-2" />
                              <span className="text-xs text-center">Upload Image</span>
                            </div>
                            <Input type="file" className="hidden" id="thumbnailUpload" />
                            <label 
                              htmlFor="thumbnailUpload" 
                              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
                            >
                              Browse Files
                            </label>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload a 16:9 image for best results (min. 1280×720px)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* <Button type="submit" className="w-full">
                    Create Course
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button> */}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        {/* Checkout Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-violet-50 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Your Cart</CardTitle>
                </div>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-violet-100 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-2 bg-violet-100 p-2 rounded-lg mt-3 text-sm text-violet-700">
                <Gift className="h-4 w-4" />
                <span>Don't miss out! +3 months free with a {selectedPeriod}-month plan</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-purple-900">
                    {selectedPlan?.name} Plan
                  </h3>
                  <div className="border-b border-border pb-4 pt-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        <span>Up to {selectedPlan?.students} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4" />
                        <span>{selectedPlan?.storage} storage</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="font-medium">Period</label>
                  <RadioGroup 
                    defaultValue={selectedPeriod} 
                    onValueChange={setSelectedPeriod}
                    className="space-y-3"
                  >
                    {timePeriods.map((period) => (
                      <div key={period.value} className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value={period.value} id={`period-${period.value}`} />
                        <label 
                          htmlFor={`period-${period.value}`}
                          className="flex flex-1 items-center justify-between cursor-pointer"
                        >
                          <span>{period.label}</span>
                          <span className="text-green-600 font-semibold">-{period.discount}</span>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <div className="text-xs text-muted-foreground">
                    Renews at US$ {selectedPlan?.price}/mo for {selectedPeriod === "48" ? "4 years" : selectedPeriod === "24" ? "2 years" : "1 year"}. Cancel anytime.
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 pb-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <div className="text-right">
                      <span className="text-muted-foreground line-through mr-2">US$ {getOriginalPrice()}</span>
                      <span className="font-semibold">US$ {getDiscountedPrice()}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Subtotal does not include applicable taxes
                  </div>
                  
                  <div className="flex items-center justify-between text-green-600">
                    <span>Discount -{timePeriods.find(p => p.value === selectedPeriod)?.discount}</span>
                    <span>-US$ {getDiscountAmount()}</span>
                  </div>
                  
                  <div className="pt-4">
                    <button className="text-primary hover:underline flex items-center text-sm">
                      <span>Have a coupon code?</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-3 bg-gray-50 rounded-b-lg">
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-700">
                  <FileCheck className="h-4 w-4" />
                  <span className="text-sm font-medium">Great news! Your <span className="font-bold">FREE</span> domain + 3 months <span className="font-bold">FREE</span> are included with this order.</span>
                </div>
              </div>
              
              <Button className="w-full text-lg py-6" size="lg" onClick={form.handleSubmit(handleSubmit)}>
                Continue
              </Button>
              
              <div className="text-sm text-center text-muted-foreground">
                Just US$ {getMonthlyPrice()}/month
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardContent className="text-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-semibold">30-day money-back guarantee</span>
              </div>
              <p className="text-muted-foreground">
                If you're not satisfied with our product, we offer a 30-day money-back guarantee.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
