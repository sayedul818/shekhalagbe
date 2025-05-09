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
  ArrowDown,
  Settings,
  Save,
  X
} from "lucide-react";
import ContentUploader from "./ContentUploader";
import { ContentType } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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
  const [contentUploaderOpen, setContentUploaderOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedSectionName, setSelectedSectionName] = useState<string | null>(null);
  
  // New state for modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [previewSheetOpen, setPreviewSheetOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [editedContent, setEditedContent] = useState<{
    title: string;
    type: string;
    duration: string;
    description: string;
    content: string;
  } | null>(null);
  
  // Mock sections data (in real app, would be fetched from API)
  const [sections, setSections] = useState([
    {
      id: "section-1",
      title: "Introduction to JavaScript",
      items: [
        { id: "item-1-1", title: "JavaScript Basics", type: "video", duration: "15:30", description: "Learn the basic concepts of JavaScript programming", content: "https://example.com/video-link" },
        { id: "item-1-2", title: "Variables and Data Types", type: "reading", duration: "10 mins read", description: "Understand JavaScript variables and different data types", content: "JavaScript has several data types including string, number, boolean, etc." },
        { id: "item-1-3", title: "JavaScript Basics Quiz", type: "quiz", duration: "10 questions", description: "Test your knowledge of JavaScript basics", content: "quiz-id-123" }
      ]
    },
    {
      id: "section-2",
      title: "Functions and Objects",
      items: [
        { id: "item-2-1", title: "Functions in JavaScript", type: "video", duration: "25:10", description: "Learn how to create and use functions", content: "https://example.com/functions-video" },
        { id: "item-2-2", title: "Working with Objects", type: "reading", duration: "15 mins read", description: "Understand JavaScript objects and their properties", content: "JavaScript objects are collections of key-value pairs that..." },
        { id: "item-2-3", title: "Functions Assignment", type: "assignment", duration: "Due: May 15", description: "Create functions to solve specific problems", content: "assignment-123" }
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

  const handleOpenContentUploader = (sectionId: string, sectionTitle: string) => {
    setSelectedSectionId(sectionId);
    setSelectedSectionName(sectionTitle);
    setContentUploaderOpen(true);
  };

  const handleContentAdded = (newContent: any) => {
    // Add the new content to the appropriate section
    if (selectedSectionId) {
      setSections(prevSections =>
        prevSections.map(section => {
          if (section.id !== selectedSectionId) return section;
          
          return {
            ...section,
            items: [
              ...section.items,
              {
                id: newContent.id,
                title: newContent.title,
                type: newContent.type.toLowerCase(),
                duration: newContent.duration || "00:00"
              }
            ]
          };
        })
      );
    }
  };

  // New functions for enhanced button functionality
  const handleOpenEditModal = (sectionId: string, item: any) => {
    setSelectedSectionId(sectionId);
    setSelectedItem(item);
    setEditedContent({
      title: item.title,
      type: item.type,
      duration: item.duration,
      description: item.description || '',
      content: item.content || ''
    });
    setEditModalOpen(true);
  };

  const handleOpenPreviewSheet = (item: any) => {
    setSelectedItem(item);
    setPreviewSheetOpen(true);
  };

  const handleOpenDeleteConfirm = (sectionId: string, item: any) => {
    setSelectedSectionId(sectionId);
    setSelectedItem(item);
    setDeleteConfirmOpen(true);
  };

  const handleSaveEditedContent = () => {
    if (!editedContent || !selectedItem || !selectedSectionId) return;

    setSections(prevSections =>
      prevSections.map(section => {
        if (section.id !== selectedSectionId) return section;
        
        return {
          ...section,
          items: section.items.map(item => {
            if (item.id !== selectedItem.id) return item;
            return { 
              ...item, 
              title: editedContent.title,
              type: editedContent.type,
              duration: editedContent.duration,
              description: editedContent.description,
              content: editedContent.content
            };
          })
        };
      })
    );

    setEditModalOpen(false);
    toast.success("Content updated successfully");
  };

  const confirmDeleteItem = () => {
    if (selectedItem && selectedSectionId) {
      handleDeleteItem(selectedSectionId, selectedItem.id);
      setDeleteConfirmOpen(false);
      toast.success("Content deleted successfully");
    }
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
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenContentUploader(section.id, section.title)}
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          Add Content
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
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleOpenEditModal(section.id, item)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleOpenPreviewSheet(item)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleOpenDeleteConfirm(section.id, item)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No items in this section yet.</p>
                        <div className="flex justify-center space-x-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAddItem(section.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Lesson
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleOpenContentUploader(section.id, section.title)}
                          >
                            <Settings className="h-4 w-4 mr-1" />
                            Add Content
                          </Button>
                        </div>
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
                              {item.description && (
                                <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                              )}
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

      {/* Content Uploader Modal */}
      <ContentUploader 
        open={contentUploaderOpen}
        onOpenChange={setContentUploaderOpen}
        onContentAdded={handleContentAdded}
        moduleId={selectedSectionId || undefined}
        moduleName={selectedSectionName || undefined}
      />

      {/* Edit Content Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>
          
          {editedContent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right font-medium">
                  Title
                </label>
                <input
                  id="title"
                  value={editedContent.title}
                  onChange={(e) => setEditedContent({...editedContent, title: e.target.value})}
                  className="col-span-3 w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="type" className="text-right font-medium">
                  Type
                </label>
                <select
                  id="type"
                  value={editedContent.type}
                  onChange={(e) => setEditedContent({...editedContent, type: e.target.value})}
                  className="col-span-3 w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="video">Video</option>
                  <option value="reading">Reading</option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="duration" className="text-right font-medium">
                  Duration
                </label>
                <input
                  id="duration"
                  value={editedContent.duration}
                  onChange={(e) => setEditedContent({...editedContent, duration: e.target.value})}
                  className="col-span-3 w-full rounded-md border border-gray-300 p-2"
                  placeholder="e.g., 15:30, 10 mins, etc."
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="description" className="text-right font-medium pt-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={editedContent.description}
                  onChange={(e) => setEditedContent({...editedContent, description: e.target.value})}
                  className="col-span-3 w-full rounded-md border border-gray-300 p-2 min-h-[80px]"
                  placeholder="Brief description of the content"
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="content" className="text-right font-medium pt-2">
                  Content URL or Text
                </label>
                <textarea
                  id="content"
                  value={editedContent.content}
                  onChange={(e) => setEditedContent({...editedContent, content: e.target.value})}
                  className="col-span-3 w-full rounded-md border border-gray-300 p-2 min-h-[120px]"
                  placeholder={
                    editedContent.type === "video" 
                      ? "Enter video URL" 
                      : editedContent.type === "reading" 
                        ? "Enter reading content or URL" 
                        : "Enter reference ID or content"
                  }
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveEditedContent}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Content Sheet */}
      <Sheet open={previewSheetOpen} onOpenChange={setPreviewSheetOpen}>
        <SheetContent className="sm:max-w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Content Preview</SheetTitle>
          </SheetHeader>
          
          {selectedItem && (
            <div className="py-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">{selectedItem.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={contentTypeColors[selectedItem.type as keyof typeof contentTypeColors] || "bg-gray-100 text-gray-800"}>
                      {contentTypeLabels[selectedItem.type as keyof typeof contentTypeLabels] || "Content"}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {selectedItem.duration}
                    </span>
                  </div>
                </div>
                
                {selectedItem.description && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Content Preview</h4>
                  <div className="border rounded-md p-4 bg-gray-50">
                    {selectedItem.type === 'video' ? (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Video URL:</p>
                        <div className="bg-white p-3 border rounded">
                          <a 
                            href={selectedItem.content} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all"
                          >
                            {selectedItem.content}
                          </a>
                        </div>
                        <div className="mt-4 bg-gray-100 p-4 rounded-md text-center">
                          <Video className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Video preview not available</p>
                        </div>
                      </div>
                    ) : selectedItem.type === 'reading' ? (
                      <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-wrap">{selectedItem.content}</p>
                      </div>
                    ) : selectedItem.type === 'quiz' ? (
                      <div className="text-center py-4">
                        <FileQuestion className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                        <p>Quiz content will be displayed to students when they take the quiz</p>
                        <p className="text-sm text-muted-foreground mt-1">Quiz ID: {selectedItem.content}</p>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <File className="h-8 w-8 mx-auto text-amber-500 mb-2" />
                        <p>Assignment details will be displayed to students</p>
                        <p className="text-sm text-muted-foreground mt-1">Assignment ID: {selectedItem.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <SheetFooter className="pt-4">
            <SheetClose asChild>
              <Button>
                <X className="h-4 w-4 mr-2" />
                Close Preview
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">{selectedItem?.title}</span> from your course.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteItem}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
