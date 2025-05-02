
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: {
    id: string;
    title: string;
    instructions: string;
    dueDate: string;
  };
  onSubmit: (assignmentId: string, file: File) => Promise<void>;
}

const AssignmentModal = ({ isOpen, onClose, assignment, onSubmit }: AssignmentModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create preview for supported file types
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else if (file.type === "application/pdf") {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    setProgress(0);
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);
      
      await onSubmit(assignment.id, selectedFile);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      toast({
        title: "Assignment Submitted",
        description: "Your assignment has been successfully submitted.",
      });
      
      setTimeout(() => {
        onClose();
        setSelectedFile(null);
        setPreviewUrl(null);
        setProgress(0);
        setUploading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your assignment. Please try again.",
        variant: "destructive",
      });
      setUploading(false);
      setProgress(0);
    }
  };

  const handleClose = () => {
    if (!uploading) {
      onClose();
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>{assignment.title}</DialogTitle>
          <DialogDescription>
            Due: {new Date(assignment.dueDate).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Instructions</h4>
            <p className="text-sm">{assignment.instructions}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">Upload your assignment</span>
            </div>
            
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
              {selectedFile ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">{selectedFile.name}</span>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                      }} 
                      disabled={uploading}
                      className="h-6 w-6"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <label htmlFor="file-upload" className="block">
                    <span className="text-primary font-medium cursor-pointer">Click to browse</span>
                    <span className="text-sm text-muted-foreground"> or drag and drop</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.jpg,.jpeg,.png,.txt,.zip"
                      disabled={uploading}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Accepted formats: PDF, DOCX, JPG, PNG, TXT, ZIP (Max 10MB)
                  </p>
                </>
              )}
            </div>
          </div>
          
          {previewUrl && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Preview</h4>
              {selectedFile?.type.startsWith("image/") ? (
                <div className="bg-muted rounded-lg overflow-hidden flex items-center justify-center h-56">
                  <img 
                    src={previewUrl} 
                    alt="File preview" 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
              ) : selectedFile?.type === "application/pdf" ? (
                <div className="bg-muted rounded-lg overflow-hidden h-56">
                  <iframe 
                    src={previewUrl} 
                    title="PDF preview" 
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="bg-muted p-4 rounded-lg flex items-center justify-center h-20">
                  <FileText className="h-8 w-8 text-muted-foreground mr-2" />
                  <span>Preview not available for this file type</span>
                </div>
              )}
            </div>
          )}
          
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || uploading}
            className="gap-2"
          >
            {uploading ? (
              <>Processing...</>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Submit Assignment
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentModal;
