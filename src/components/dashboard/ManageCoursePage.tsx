
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Users, 
  Settings, 
  MessageSquare, 
  Award, 
  FileQuestion,
  Clock,
  PieChart,
  Calendar,
  Bookmark,
  ArrowLeft,
  BookPlus,
  Tag
} from "lucide-react";

const ManageCoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");
  
  // Mock course data - in a real app, you would fetch this based on courseId
  const course = {
    id: courseId,
    title: "JavaScript Fundamentals",
    description: "A comprehensive course covering JavaScript basics to advanced concepts.",
    thumbnail: "/placeholder.svg",
    price: 49.99,
    students: 124,
    rating: 4.8,
    lastUpdated: "2 days ago",
    progress: 90,
    accessType: "Paid",
    tags: ["Programming", "Web Development", "Beginner"]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/courses")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-muted-foreground">Manage your course content and settings</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => window.open(`/dashboard/browse/${courseId}`, '_blank')}>
            <BookOpen className="h-4 w-4 mr-2" />
            Preview Course
          </Button>
          <Button>
            <BookPlus className="h-4 w-4 mr-2" />
            Publish Changes
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Course Overview Card */}
        <Card className="md:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>Key information about your course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="text-lg font-medium">{course.students}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-lg font-medium">★ {course.rating}/5.0</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Access Type</p>
                  <p className="text-lg font-medium">{course.accessType}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-lg font-medium">{course.lastUpdated}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Course Management Tabs */}
        <div className="md:col-span-4">
          <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>Manage your course curriculum, sections, and lessons</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Curriculum</h3>
                    <Button>
                      <BookPlus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </div>
                  
                  {/* Section 1 */}
                  <div className="border rounded-md">
                    <div className="flex items-center justify-between p-4 bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Section 1:</span>
                        <span className="font-semibold">Introduction to JavaScript</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Add Lesson</Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between py-2 px-3 bg-gray-100 rounded-md">
                        <div className="flex items-center space-x-3">
                          <Video className="h-4 w-4 text-gray-500" />
                          <span>Lesson 1: JavaScript Basics</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 px-3 bg-gray-100 rounded-md">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>Lesson 2: Variables and Data Types</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 px-3 bg-gray-100 rounded-md">
                        <div className="flex items-center space-x-3">
                          <FileQuestion className="h-4 w-4 text-gray-500" />
                          <span>Quiz: JavaScript Basics</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Section 2 */}
                  <div className="border rounded-md">
                    <div className="flex items-center justify-between p-4 bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Section 2:</span>
                        <span className="font-semibold">Functions and Objects</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Add Lesson</Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between py-2 px-3 bg-gray-100 rounded-md">
                        <div className="flex items-center space-x-3">
                          <Video className="h-4 w-4 text-gray-500" />
                          <span>Lesson 3: Functions in JavaScript</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-2 px-3 bg-gray-100 rounded-md">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>Lesson 4: Objects and Methods</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button variant="outline">
                      <BookPlus className="h-4 w-4 mr-2" />
                      Add New Section
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Quizzes Tab */}
            <TabsContent value="quizzes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quizzes & Assessments</CardTitle>
                  <CardDescription>Create and manage quizzes, tests, and assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium">Question Bank</h3>
                      <p className="text-sm text-muted-foreground">Reusable questions for your quizzes</p>
                    </div>
                    <Button>
                      <FileQuestion className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between">
                        <h4 className="font-medium">JavaScript Basics Quiz</h4>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Preview</Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">10 questions • Time limit: 20 minutes</p>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">MCQ</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">Easy</span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Auto-graded</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Final Assessment</h4>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Preview</Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">25 questions • Time limit: 60 minutes</p>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">Mixed</span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs mr-2">Medium</span>
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Manual Review</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Students Tab */}
            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>View and manage enrolled students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium">Students</h3>
                      <p className="text-sm text-muted-foreground">124 students enrolled</p>
                    </div>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite Students
                    </Button>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Avg.</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          { name: "John Smith", progress: 85, lastActivity: "Today", quizAvg: 92 },
                          { name: "Maria Garcia", progress: 65, lastActivity: "Yesterday", quizAvg: 78 },
                          { name: "Robert Johnson", progress: 45, lastActivity: "3 days ago", quizAvg: 65 },
                          { name: "Sarah Williams", progress: 92, lastActivity: "Today", quizAvg: 88 },
                        ].map((student, i) => (
                          <tr key={i}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                  {student.name.charAt(0)}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{student.progress}% complete</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {student.lastActivity}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                student.quizAvg >= 80 ? 'bg-green-100 text-green-800' :
                                student.quizAvg >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {student.quizAvg}%
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Message</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Assignments Tab */}
            <TabsContent value="assignments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>Create and manage assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium">All Assignments</h3>
                      <p className="text-sm text-muted-foreground">Manage your course assignments</p>
                    </div>
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      Create Assignment
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between">
                        <h4 className="font-medium">JavaScript Loops Project</h4>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">View Submissions</Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Due: May 25, 2023 • 67 submissions</p>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">File Upload</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Resubmission allowed</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between">
                        <h4 className="font-medium">DOM Manipulation Exercise</h4>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">View Submissions</Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Due: June 10, 2023 • 42 submissions</p>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">Written Response</span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">No resubmission</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Engagement Tab */}
            <TabsContent value="engagement" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Engagement</CardTitle>
                  <CardDescription>Monitor student engagement and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium">Engagement Overview</h3>
                      <p className="text-sm text-muted-foreground">Monitor student engagement with your course</p>
                    </div>
                    <Button>
                      <PieChart className="h-4 w-4 mr-2" />
                      View Full Report
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Average Completion</h4>
                      <p className="text-2xl font-bold mt-1">68%</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Active Students (Last 7 days)</h4>
                      <p className="text-2xl font-bold mt-1">87</p>
                      <div className="text-xs text-green-600 mt-2">+12% from previous week</div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Average Quiz Score</h4>
                      <p className="text-2xl font-bold mt-1">74%</p>
                      <div className="text-xs text-amber-600 mt-2">-3% from previous quizzes</div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-4">Recent Activity</h4>
                    <div className="space-y-4">
                      {[
                        { student: "John Smith", activity: "Completed Lesson 4: Objects and Methods", time: "2 hours ago" },
                        { student: "Maria Garcia", activity: "Submitted DOM Manipulation Exercise", time: "5 hours ago" },
                        { student: "Robert Johnson", activity: "Started JavaScript Basics Quiz", time: "Yesterday" },
                        { student: "Sarah Williams", activity: "Posted a question in Lesson 3 discussion", time: "Yesterday" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                            {item.student.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{item.student}</p>
                            <p className="text-sm text-muted-foreground">{item.activity}</p>
                            <p className="text-xs text-gray-500">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Communication Tab */}
            <TabsContent value="communication" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Communication</CardTitle>
                  <CardDescription>Manage communication with your students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium">Communication Tools</h3>
                      <p className="text-sm text-muted-foreground">Connect with your students</p>
                    </div>
                    <Button>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      New Announcement
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-4 flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                        Announcements
                      </h4>
                      <div className="space-y-4">
                        <div className="border-l-4 border-primary pl-4 py-1">
                          <p className="font-medium">Final Project Deadline Extension</p>
                          <p className="text-sm text-muted-foreground">Posted: 3 days ago</p>
                        </div>
                        <div className="border-l-4 border-primary pl-4 py-1">
                          <p className="font-medium">New Bonus Content Added</p>
                          <p className="text-sm text-muted-foreground">Posted: 1 week ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="mt-4 w-full">View All Announcements</Button>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-4 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        Scheduled Live Sessions
                      </h4>
                      <div className="space-y-4">
                        <div className="border rounded-md p-3">
                          <p className="font-medium">Q&A Session: JavaScript Objects</p>
                          <p className="text-sm text-muted-foreground">May 25, 2023 • 10:00 AM</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="ghost">Cancel</Button>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Schedule New Session
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 mt-6">
                    <h4 className="font-medium mb-4">Student Q&A</h4>
                    <div className="space-y-4">
                      {[
                        { student: "Maria Garcia", question: "When will we learn about async/await in JavaScript?", replies: 2, time: "2 days ago" },
                        { student: "Robert Johnson", question: "Can you provide more examples of closures?", replies: 1, time: "1 week ago" },
                      ].map((item, i) => (
                        <div key={i} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                              {item.student.charAt(0)}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium">{item.student}</p>
                              <p className="text-sm">{item.question}</p>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <span>{item.time}</span>
                                <span className="mx-2">•</span>
                                <span>{item.replies} replies</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">Reply</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Settings</CardTitle>
                  <CardDescription>Configure your course settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Course Title</label>
                          <input 
                            type="text" 
                            className="w-full rounded-md border border-gray-300 p-2"
                            value={course.title}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Price ($)</label>
                          <input 
                            type="number" 
                            className="w-full rounded-md border border-gray-300 p-2"
                            value={course.price}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea 
                          className="w-full rounded-md border border-gray-300 p-2 min-h-[100px]"
                          value={course.description}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Access Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Access Type</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                          <div className="border rounded-md p-3 flex items-start space-x-3">
                            <input type="radio" name="accessType" checked={course.accessType === "Paid"} />
                            <div>
                              <p className="font-medium">Paid</p>
                              <p className="text-sm text-muted-foreground">Students pay to access</p>
                            </div>
                          </div>
                          <div className="border rounded-md p-3 flex items-start space-x-3">
                            <input type="radio" name="accessType" checked={course.accessType === "Free"} />
                            <div>
                              <p className="font-medium">Free</p>
                              <p className="text-sm text-muted-foreground">Open access for everyone</p>
                            </div>
                          </div>
                          <div className="border rounded-md p-3 flex items-start space-x-3">
                            <input type="radio" name="accessType" checked={course.accessType === "Invite"} />
                            <div>
                              <p className="font-medium">Invite Only</p>
                              <p className="text-sm text-muted-foreground">Access by invitation</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Course Tags</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.map((tag, index) => (
                        <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                          <span className="text-sm">{tag}</span>
                          <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        className="flex-1 rounded-md border border-gray-300 p-2"
                        placeholder="Add a new tag..."
                      />
                      <Button>Add</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ManageCoursePage;
