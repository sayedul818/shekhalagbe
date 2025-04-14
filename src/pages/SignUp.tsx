
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["admin", "teacher", "student"] as const),
});

type FormData = z.infer<typeof formSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await signUp(data.name, data.email, data.password, data.role as UserRole);
      toast({
        title: "Account created successfully",
        description: "Welcome to our LMS platform!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Sign up failed",
        description: "There was an error creating your account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md px-4">
        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Account Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-2"
                          disabled={isLoading}
                        >
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="student" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Student</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="teacher" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Teacher</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="admin" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Admin</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary font-medium hover:underline">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
