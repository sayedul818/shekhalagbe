
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Video, 
  FileText, 
  FileQuestion,
  BookPlus,
  LayoutGrid,
  List,
  Edit,
  Trash2,
  Eye,
  File,
  Clock,
  Plus,
  ArrowUp,
  ArrowDown
} from "lucide-react";

// Content types with their respective icons
const contentTypeIcons = {
  video: <Video className="h-4 w-4" />,
  reading: <FileText className="h-4 w-4" />,
  quiz: <FileQuestion className="h-4 w-4" />,
  assignment: <File className="h-4 w-4" />
};

const contentTypeLabels = {
  video: "Video",
  reading: "Reading",
  quiz: "Quiz",
  assignment: "Assignment"
};

const contentTypeColors = {
  video: "bg-blue-100 text-blue-800",
  reading: "bg-green-100 text-green-800",
  quiz: "bg-purple-100 text-purple-800",
  assignment: "bg-amber-100 text-amber-800"
};

export default function CurriculumManager() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  
  // Mock sections data (in real app, would be fetched from API)
  const [sections, setSections] = useState([
    {
      id: "section-1",
      title: "Introduction to JavaScript",
      items: [
        { id: "item-1-1", title: "JavaScript Basics", type: "video", duration: "15:30" },
        { id: "item-1-2", title: "Variables and Data Types", type: "reading", duration: "10 mins read" },
        { id: "item-1-3", title: "JavaScript Basics Quiz", type: "quiz", duration: "10 questions" }
      ]
    },
    {
      id: "section-2",
      title: "Functions and Objects",
      items: [
        { id: "item-2-1", title: "Functions in JavaScript", type: "video", duration: "25:10" },
        { id: "item-2-2", title: "Working with Objects", type: "reading", duration: "15 mins read" },
        { id: "item-2-3", title: "Functions Assignment", type: "assignment", duration: "Due: May 15" }
      ]
    }
  ]);

  const handleAddSection = () => {
    const newSection = {
      id: `section-${sections.length + 1}`,
      title: `New Section ${sections.length + 1}`,
      items: []
    };
    setSections([...sections, newSection]);
  };

  const handleAddItem = (sectionId: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId
          ? {
              ...section,
              items: [
                ...section.items,
                {
                  id: `item-${section.id}-${section.items.length + 1}`,
                  title: `New Lesson`,
                  type: "video",
                  duration: "00:00"
                }
              ]
            }
          : section
      )
    );
  };

  const handleMoveSection = (sectionId: string, direction: "up" | "down") => {
    const sectionIndex = sections.findIndex(section => section.id === sectionId);
    if (
      (direction === "up" && sectionIndex === 0) || 
      (direction === "down" && sectionIndex === sections.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? sectionIndex - 1 : sectionIndex + 1;
    const sectionsCopy = [...sections];
    const [movedSection] = sectionsCopy.splice(sectionIndex, 1);
    sectionsCopy.splice(newIndex, 0, movedSection);
    setSections(sectionsCopy);
  };

  const handleMoveItem = (sectionId: string, itemId: string, direction: "up" | "down") => {
    setSections(prevSections =>
      prevSections.map(section => {
        if (section.id !== sectionId) return section;
        
        const items = [...section.items];
        const itemIndex = items.findIndex(item => item.id === itemId);
        
        if (
          (direction === "up" && itemIndex === 0) || 
          (direction === "down" && itemIndex === items.length - 1)
        ) {
          return section;
        }
        
        const newIndex = direction === "up" ? itemIndex - 1 : itemIndex + 1;
        const [movedItem] = items.splice(itemIndex, 1);
        items.splice(newIndex, 0, movedItem);
        
        return { ...section, items };
      })
    );
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const handleDeleteItem = (sectionId: string, itemId: string) => {
    setSections(prevSections =>
      prevSections.map(section => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          items: section.items.filter(item => item.id !== itemId)
        };
      })
    );
  };

  const handleEditSectionTitle = (sectionId: string, newTitle: string) => {
    setSections(prevSections =>
      prevSections.map(section => {
        if (section.id !== sectionId) return section;
        return { ...section, title: newTitle };
      })
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Curriculum Content</CardTitle>
            <CardDescription>Manage your course structure and content</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white border rounded-md flex overflow-hidden">
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm" 
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm" 
                className="rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddSection}>
              <BookPlus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Tabs defaultValue="structure">
            <TabsList className="mb-4">
              <TabsTrigger value="structure">Structure & Content</TabsTrigger>
              <TabsTrigger value="preview">Student Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="structure" className="space-y-4">
              {sections.map((section, sectionIndex) => (
                <div key={section.id} className="border rounded-md overflow-hidden">
                  {/* Section Header */}
                  <div className="bg-muted p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Section {sectionIndex + 1}:</span>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => handleEditSectionTitle(section.id, e.target.value)}
                          className="font-semibold bg-transparent border-b border-transparent focus:border-primary focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMoveSection(section.id, "up")}
                          disabled={sectionIndex === 0}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMoveSection(section.id, "down")}
                          disabled={sectionIndex === sections.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddItem(section.id)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Lesson
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteSection(section.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Section Items */}
                  <div className="p-4 space-y-3">
                    {section.items.length > 0 ? (
                      section.items.map((item, itemIndex) => (
                        <div 
                          key={item.id} 
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-md"
                        >
                          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                            {contentTypeIcons[item.type as keyof typeof contentTypeIcons] || <File className="h-4 w-4 text-gray-500" />}
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const newTitle = e.target.value;
                                setSections(prevSections =>
                                  prevSections.map(s => {
                                    if (s.id !== section.id) return s;
                                    return {
                                      ...s,
                                      items: s.items.map(i => {
                                        if (i.id !== item.id) return i;
                                        return { ...i, title: newTitle };
                                      })
                                    };
                                  })
                                );
                              }}
                              className="bg-transparent border-b border-transparent focus:border-primary focus:outline-none"
                            />
                            <Badge className={contentTypeColors[item.type as keyof typeof contentTypeColors] || "bg-gray-100 text-gray-800"}>
                              {contentTypeLabels[item.type as keyof typeof contentTypeLabels] || "Content"}
                            </Badge>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              <input
                                type="text"
                                value={item.duration}
                                onChange={(e) => {
                                  const newDuration = e.target.value;
                                  setSections(prevSections =>
                                    prevSections.map(s => {
                                      if (s.id !== section.id) return s;
                                      return {
                                        ...s,
                                        items: s.items.map(i => {
                                          if (i.id !== item.id) return i;
                                          return { ...i, duration: newDuration };
                                        })
                                      };
                                    })
                                  );
                                }}
                                className="w-16 bg-transparent border-b border-transparent focus:border-primary focus:outline-none text-xs text-muted-foreground"
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <select
                              value={item.type}
                              onChange={(e) => {
                                const newType = e.target.value;
                                setSections(prevSections =>
                                  prevSections.map(s => {
                                    if (s.id !== section.id) return s;
                                    return {
                                      ...s,
                                      items: s.items.map(i => {
                                        if (i.id !== item.id) return i;
                                        return { ...i, type: newType };
                                      })
                                    };
                                  })
                                );
                              }}
                              className="text-xs bg-white border rounded px-2 py-1"
                            >
                              <option value="video">Video</option>
                              <option value="reading">Reading</option>
                              <option value="quiz">Quiz</option>
                              <option value="assignment">Assignment</option>
                            </select>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleMoveItem(section.id, item.id, "up")}
                              disabled={itemIndex === 0}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleMoveItem(section.id, item.id, "down")}
                              disabled={itemIndex === section.items.length - 1}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDeleteItem(section.id, item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No items in this section yet.</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => handleAddItem(section.id)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Lesson
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {sections.length === 0 && (
                <div className="text-center py-12 border rounded-md">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Sections Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start building your course by adding sections and lessons.
                  </p>
                  <Button onClick={handleAddSection}>
                    <BookPlus className="h-4 w-4 mr-2" />
                    Add First Section
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="preview">
              <div className="border rounded-md p-6">
                <h3 className="text-lg font-medium mb-6">Student View Preview</h3>
                <div className="space-y-8">
                  {sections.map((section, index) => (
                    <div key={section.id}>
                      <h4 className="text-md font-semibold mb-4">Module {index + 1}: {section.title}</h4>
                      <div className="space-y-3 pl-4">
                        {section.items.map((item) => (
                          <div key={item.id} className="flex items-start p-3 hover:bg-gray-50 rounded-md border">
                            <div className="bg-primary/10 p-2 rounded-full mr-3">
                              {contentTypeIcons[item.type as keyof typeof contentTypeIcons] || <File className="h-4 w-4 text-primary" />}
                            </div>
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <Badge className={contentTypeColors[item.type as keyof typeof contentTypeColors] || "bg-gray-100 text-gray-800"}>
                                  {contentTypeLabels[item.type as keyof typeof contentTypeLabels] || "Content"}
                                </Badge>
                                <span className="ml-2 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {item.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {sections.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No content to preview yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
