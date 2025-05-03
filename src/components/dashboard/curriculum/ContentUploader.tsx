
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, Video, Clock, BookOpen, Upload, File, FileQuestion, 
  CalendarClock, ArrowRight, RefreshCw, LucideIcon 
} from "lucide-react";
import { ContentType } from "@/types";

interface ContentUploaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContentAdded: (content: ContentItem) => void;
  moduleId?: string;
  moduleName?: string;
}

type UploadTab = "upload" | "embed" | "record" | "text" | "quiz" | "assignment";

interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  description?: string;
  duration?: string;
  moduleId?: string;
  moduleName?: string;
  contentData?: {
    url?: string;
    htmlContent?: string;
    fileInfo?: {
      fileName: string;
      fileSize: string;
      fileType: string;
    }
  };
}

const contentTypeIcons: Record<ContentType, LucideIcon> = {
  "video": Video,
  "reading": BookOpen,
  "quiz": FileQuestion,
  "assignment": FileText,
  "live": CalendarClock,
  "ai-practice": RefreshCw
};

export default function ContentUploader({ 
  open, 
  onOpenChange, 
  onContentAdded,
  moduleId,
  moduleName
}: ContentUploaderProps) {
  const [uploadTab, setUploadTab] = useState<UploadTab>("upload");
  const [contentType, setContentType] = useState<ContentType>("video");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [url, setUrl] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [fileInfo, setFileInfo] = useState<{ fileName: string; fileSize: string; fileType: string } | null>(null);
  
  const { toast } = useToast();
  
  const resetForm = () => {
    setUploadTab("upload");
    setContentType("video");
    setTitle("");
    setDescription("");
    setDuration("");
    setUploadProgress(0);
    setIsUploading(false);
    setUrl("");
    setHtmlContent("");
    setFileInfo(null);
  };
  
  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };
  
  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please provide a title for this content",
        variant: "destructive",
      });
      return;
    }
    
    // Create content item
    const newContent: ContentItem = {
      id: `content-${Date.now()}`,
      title: title.trim(),
      type: contentType,
      description: description.trim() || undefined,
      duration: duration || undefined,
      moduleId,
      moduleName,
      contentData: {
        url: url || undefined,
        htmlContent: htmlContent || undefined,
        fileInfo: fileInfo || undefined
      }
    };
    
    onContentAdded(newContent);
    toast({
      title: "Content Added",
      description: `${title} has been added to ${moduleName || 'the course'}`
    });
    
    handleClose();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Simulate upload
    setIsUploading(true);
    setFileInfo({
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      fileType: file.type
    });
    
    // Fake progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setIsUploading(false);
        
        toast({
          title: "Upload Complete",
          description: `${file.name} has been uploaded successfully`
        });
      }
      setUploadProgress(progress);
    }, 500);
  };
  
  const getUploadTabContent = () => {
    switch (uploadTab) {
      case "upload":
        return (
          <div>
            <div className="space-y-4">
              {!isUploading && !fileInfo ? (
                <div className="border-2 border-dashed rounded-lg p-10 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">Upload File</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mb-4">
                      Drag and drop your file here or click to browse
                    </p>
                    
                    <div>
                      <label className="cursor-pointer">
                        <Input 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange}
                          accept={contentType === "video" ? "video/*" : 
                                  contentType === "reading" ? ".pdf,.doc,.docx,.ppt,.pptx" : 
                                  "*/*"}
                        />
                        <Button type="button" variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Browse Files
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border rounded-lg p-6">
                  {isUploading ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                          <File className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{fileInfo?.fileName}</p>
                          <p className="text-xs text-muted-foreground">{fileInfo?.fileSize}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Uploading...</span>
                          <span>{Math.round(uploadProgress)}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-1" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center">
                        <File className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium text-sm">{fileInfo?.fileName}</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Uploaded</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{fileInfo?.fileSize}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {contentType === "video" && (
                <div className="space-y-2">
                  <Label>Video Options</Label>
                  <div className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" id="captions" />
                    <Label htmlFor="captions" className="text-sm">Enable auto-captions</Label>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" id="transcription" />
                    <Label htmlFor="transcription" className="text-sm">Generate transcription</Label>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case "embed":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="embed-url">Embed URL</Label>
              <Input 
                id="embed-url" 
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Paste a link from YouTube, Vimeo, or other supported platforms
              </p>
            </div>
            
            {url && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="aspect-video bg-gray-200 mb-2 flex items-center justify-center">
                  <Video className="h-10 w-10 text-gray-400" />
                </div>
                <div className="text-xs text-muted-foreground">
                  Preview will be available when content is added
                </div>
              </div>
            )}
          </div>
        );
        
      case "text":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="html-content">Content</Label>
              <Textarea 
                id="html-content" 
                placeholder="Enter or paste your content here"
                className="min-h-[200px]"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
              />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium text-sm">Formatting Options</h4>
                <Button type="button" variant="ghost" size="sm">
                  Rich Text Editor
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm">Bold</Button>
                <Button type="button" variant="outline" size="sm">Italic</Button>
                <Button type="button" variant="outline" size="sm">Link</Button>
                <Button type="button" variant="outline" size="sm">List</Button>
                <Button type="button" variant="outline" size="sm">Heading</Button>
              </div>
            </div>
          </div>
        );
        
      case "record":
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-10 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Record Video</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-4">
                  Record a video using your camera and microphone
                </p>
                
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-1" />
                    Use Webcam
                  </Button>
                  <Button variant="outline">
                    Screen Recording
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium text-sm mb-2">Recording Options</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Video Quality</Label>
                  <Select defaultValue="hd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hd">HD (720p)</SelectItem>
                      <SelectItem value="fullhd">Full HD (1080p)</SelectItem>
                      <SelectItem value="sd">SD (480p)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Max Duration</Label>
                  <Select defaultValue="10">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Select an option to add content</div>;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Content to {moduleName || "Course"}</DialogTitle>
          <DialogDescription>
            Upload or create content for your students
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="content-type">Content Type</Label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {(["video", "reading", "quiz", "assignment", "live", "ai-practice"] as ContentType[]).map((type) => {
                const Icon = contentTypeIcons[type];
                return (
                  <div 
                    key={type}
                    className={`border rounded-lg p-2 cursor-pointer text-center ${
                      contentType === type ? 'border-primary bg-primary/5' : 'hover:border-gray-400'
                    }`}
                    onClick={() => setContentType(type)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Icon className={`h-5 w-5 ${contentType === type ? 'text-primary' : 'text-gray-500'}`} />
                      <span className="text-xs font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter content title"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="module">Module</Label>
              <Input 
                id="module" 
                value={moduleName || ""} 
                disabled={!!moduleName}
                placeholder="Select a module"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Optional)</Label>
              <Input 
                id="duration" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 10:30 or 1.5 hours"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description" 
              placeholder="Enter a description for this content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          {contentType === "video" || contentType === "reading" ? (
            <div className="space-y-4">
              <div className="border-b">
                <Tabs defaultValue="upload" value={uploadTab} onValueChange={(value) => setUploadTab(value as UploadTab)}>
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="upload">
                      <Upload className="h-3.5 w-3.5 mr-1" />
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="embed">
                      <ArrowRight className="h-3.5 w-3.5 mr-1" />
                      Embed
                    </TabsTrigger>
                    {contentType === "video" && (
                      <TabsTrigger value="record">
                        <Video className="h-3.5 w-3.5 mr-1" />
                        Record
                      </TabsTrigger>
                    )}
                    {contentType === "reading" && (
                      <TabsTrigger value="text">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        Text
                      </TabsTrigger>
                    )}
                  </TabsList>
                </Tabs>
              </div>
              
              <div>
                {getUploadTabContent()}
              </div>
            </div>
          ) : contentType === "quiz" || contentType === "assignment" ? (
            <div className="border rounded-lg p-6 flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                {contentType === "quiz" ? (
                  <FileQuestion className="h-6 w-6 text-primary" />
                ) : (
                  <FileText className="h-6 w-6 text-primary" />
                )}
              </div>
              <h3 className="font-medium">Create {contentType === "quiz" ? "Quiz" : "Assignment"}</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                After adding this content, you'll be able to edit and configure the {contentType === "quiz" ? "quiz" : "assignment"} details.
              </p>
            </div>
          ) : (
            <div className="border rounded-lg p-6 flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                {contentTypeIcons[contentType] && React.createElement(contentTypeIcons[contentType], { className: "h-6 w-6 text-primary" })}
              </div>
              <h3 className="font-medium">
                {contentType === "live" ? "Schedule Live Session" : "Create AI Practice Activity"}
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                After adding this content, you'll be able to configure additional settings.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Content</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
