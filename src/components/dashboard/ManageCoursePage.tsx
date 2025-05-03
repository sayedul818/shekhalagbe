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
  ArrowLeft,
  BookPlus,
  Tag,
} from "lucide-react";
import CurriculumManager from "./curriculum/CurriculumManager";
import QuizzesManager from "./quizzes/QuizzesManager";
import AssignmentsManager from "./assignments/AssignmentsManager";
import DiscussionManager from "./discussions/DiscussionManager";

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
            <span className="hidden sm:inline">Preview Course</span>
            <span className="sm:hidden">Preview</span>
          </Button>
          <Button>
            <BookPlus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Publish Changes</span>
            <span className="sm:hidden">Publish</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <TabsList className="flex flex-wrap w-full">
              <TabsTrigger value="content" className="flex-1">
                <Video className="h-4 w-4 mr-2 sm:inline hidden" />
                Content
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="flex-1">
                <FileQuestion className="h-4 w-4 mr-2 sm:inline hidden" />
                Quizzes
              </TabsTrigger>
              <TabsTrigger value="assignments" className="flex-1">
                <FileText className="h-4 w-4 mr-2 sm:inline hidden" />
                Assignments
              </TabsTrigger>
              <TabsTrigger value="students" className="flex-1">
                <Users className="h-4 w-4 mr-2 sm:inline hidden" />
                Students
              </TabsTrigger>
              <TabsTrigger value="discussions" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2 sm:inline hidden" />
                Discussions
              </TabsTrigger>
              <TabsTrigger value="engagement" className="flex-1">
                <PieChart className="h-4 w-4 mr-2 sm:inline hidden" />
                Engagement
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">
                <Settings className="h-4 w-4 mr-2 sm:inline hidden" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4">
              <CurriculumManager />
            </TabsContent>
            
            {/* Quizzes Tab */}
            <TabsContent value="quizzes" className="space-y-4">
              <QuizzesManager />
            </TabsContent>
            
            {/* Assignments Tab */}
            <TabsContent value="assignments" className="space-y-4">
              <AssignmentsManager />
            </TabsContent>
            
            {/* Students Tab */}
            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>View and manage enrolled students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-2">
                    <div>
                      <h3 className="text-lg font-medium">Students</h3>
                      <p className="text-sm text-muted-foreground">124 students enrolled</p>
                    </div>
                    <Button>
                      <Users className="h-4 w-4 mr-2" />
                      Invite Students
                    </Button>
                  </div>
                  
                  <div className="border rounded-md overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                          <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                          <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Avg.</th>
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
                            <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {student.lastActivity}
                            </td>
                            <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                student.quizAvg >= 80 ? 'bg-green-100 text-green-800' :
                                student.quizAvg >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {student.quizAvg}%
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end">
                                <Button variant="ghost" size="sm">View</Button>
                                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Message</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Discussions Tab */}
            <TabsContent value="discussions" className="space-y-4">
              <DiscussionManager />
            </TabsContent>
            
            {/* Engagement Tab */}
            <TabsContent value="engagement" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Engagement</CardTitle>
                  <CardDescription>Monitor student engagement and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-2">
                    <div>
                      <h3 className="text-lg font-medium">Engagement Overview</h3>
                      <p className="text-sm text-muted-foreground">Monitor student engagement with your course</p>
                    </div>
                    <Button>
                      <PieChart className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">View Full Report</span>
                      <span className="sm:hidden">View Report</span>
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
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Settings</CardTitle>
                  <CardDescription>Configure your course settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
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
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
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
                      <div className="flex flex-col sm:flex-row gap-2">
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
