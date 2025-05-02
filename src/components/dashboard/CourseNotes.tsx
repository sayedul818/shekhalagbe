import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchCourseNotes } from "@/lib/course-data";
import { useToast } from "@/hooks/use-toast";
import { CourseComponentProps } from "@/types";

const CourseNotes = ({ courseId }: CourseComponentProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteContent, setEditingNoteContent] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      if (!courseId) return;
      
      try {
        setIsLoading(true);
        const data = await fetchCourseNotes(courseId);
        setNotes(data.notes || []);
      } catch (error) {
        console.error("Error loading notes:", error);
        toast({
          title: "Error",
          description: "Failed to load course notes",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNotes();
  }, [courseId, toast]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    // In a real app, this would be an API call
    const newNoteObj = {
      id: `note-${Date.now()}`,
      content: newNote,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setNotes([newNoteObj, ...notes]);
    setNewNote("");
    
    toast({
      title: "Note Added",
      description: "Your note has been saved"
    });
  };

  const handleEditNote = (noteId, content) => {
    setEditingNoteId(noteId);
    setEditingNoteContent(content);
  };

  const handleSaveEdit = (noteId) => {
    // In a real app, this would be an API call
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? { ...note, content: editingNoteContent, updatedAt: new Date().toISOString() } 
        : note
    );
    
    setNotes(updatedNotes);
    setEditingNoteId(null);
    setEditingNoteContent("");
    
    toast({
      title: "Note Updated",
      description: "Your note has been updated"
    });
  };

  const handleDeleteNote = (noteId) => {
    // In a real app, this would be an API call
    const filteredNotes = notes.filter(note => note.id !== noteId);
    setNotes(filteredNotes);
    
    toast({
      title: "Note Deleted",
      description: "Your note has been deleted"
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Course Notes</h2>
      <p className="text-muted-foreground">Keep track of important information and ideas</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              placeholder="Write your note here..." 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={handleAddNote}>Save Note</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map(note => (
            <Card key={note.id}>
              <CardContent className="pt-6">
                {editingNoteId === note.id ? (
                  <div className="space-y-4">
                    <Textarea 
                      value={editingNoteContent}
                      onChange={(e) => setEditingNoteContent(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex space-x-2">
                      <Button onClick={() => handleSaveEdit(note.id)}>Save</Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setEditingNoteId(null);
                          setEditingNoteContent("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="whitespace-pre-wrap mb-4">{note.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {new Date(note.updatedAt).toLocaleDateString()} at {new Date(note.updatedAt).toLocaleTimeString()}
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditNote(note.id, note.content)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 border rounded-md">
            <h3 className="text-lg font-medium mb-2">No notes yet</h3>
            <p className="text-muted-foreground mb-4">Add your first note to keep track of important information</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseNotes;
