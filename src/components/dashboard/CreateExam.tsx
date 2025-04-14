
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, Plus, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Question } from "@/types";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  timeLimit: z.coerce.number().min(5, { message: "Time limit must be at least 5 minutes" }),
  startDate: z.string(),
  endDate: z.string(),
});

const CreateExam = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Partial<Question>[]>([
    { id: crypto.randomUUID(), question: "", options: ["", "", "", ""], correctOption: 0 }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      timeLimit: 30,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  });

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: crypto.randomUUID(), question: "", options: ["", "", "", ""], correctOption: 0 }
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot remove question",
        description: "An exam must have at least one question",
        variant: "destructive",
      });
    }
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    const options = [...updatedQuestions[questionIndex].options!];
    options[optionIndex] = value;
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], options };
    setQuestions(updatedQuestions);
  };

  const setCorrectOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = { ...updatedQuestions[questionIndex], correctOption: optionIndex };
    setQuestions(updatedQuestions);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Validate questions
    const hasEmptyQuestions = questions.some(q => !q.question || q.question.trim() === "");
    const hasEmptyOptions = questions.some(q => 
      q.options?.some(opt => !opt || opt.trim() === "")
    );

    if (hasEmptyQuestions || hasEmptyOptions) {
      toast({
        title: "Invalid exam",
        description: "All questions and options must be filled",
        variant: "destructive",
      });
      return;
    }

    const examData = {
      ...data,
      courseId,
      questions,
      id: crypto.randomUUID(),
    };

    // In a real app, this would be sent to a backend
    console.log("Created exam:", examData);
    
    toast({
      title: "Exam created",
      description: "Your exam has been successfully created",
    });
    
    navigate(`/dashboard/exams`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Exam</h1>
        <p className="text-muted-foreground">Create a new exam for your course</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Exam Details</CardTitle>
              <CardDescription>Basic information about the exam</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Final Assessment" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the title of your exam.
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="This exam covers all the topics taught in the course..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what the exam covers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="timeLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Limit (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
              <CardDescription>Create questions for your exam</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, qIndex) => (
                <div key={question.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">Question {qIndex + 1}</h3>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeQuestion(qIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium">Question</label>
                      <Textarea 
                        value={question.question}
                        onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                        placeholder="Enter your question here"
                        className="mb-4"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="block mb-2 text-sm font-medium">Options</label>
                      {question.options?.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant={question.correctOption === oIndex ? "default" : "outline"}
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => setCorrectOption(qIndex, oIndex)}
                          >
                            {String.fromCharCode(65 + oIndex)}
                          </Button>
                          <Input 
                            value={option}
                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                            placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                            className="flex-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={addQuestion} 
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </CardContent>
          </Card>
          
          <Button type="submit" className="w-full md:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Create Exam
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateExam;
