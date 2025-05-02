
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Notebook, Plus, FileMinus, FilePlus, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { fetchCourseNotes } from "@/lib/course-data";

const CourseNotes = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [newNoteDialogOpen, setNewNoteDialogOpen] = useState(false);
  
  // Form state
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteModule, setNoteModule] = useState("");
  const [noteTags, setNoteTags] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      if (!courseId) return;
      
      try {
        setLoading(true);
        const data = await fetchCourseNotes(courseId);
        setNotes(data.notes);
      } catch (err) {
        console.error("Error loading notes data:", err);
        setError("Failed to load notes data");
        toast({
          title: "Error",
          description: "Failed to load course notes",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadNotes();
  }, [courseId, toast]);

  // Get the active note
  const activeNote = activeNoteId 
    ? notes.find(note => note.id === activeNoteId) 
    : null;

  const handleOpenNote = (noteId: string) => {
    setActiveNoteId(noteId);
    setIsEditing(false);
    
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setNoteTitle(note.title);
      setNoteContent(note.content);
      setNoteModule(note.module);
      setNoteTags(note.tags.join(", "));
    }
  };

  const handleCloseNote = () => {
    setActiveNoteId(null);
    setIsEditing(false);
  };

  const handleEditNote = () => {
    setIsEditing(true);
  };

  const handleSaveNote = () => {
    if (activeNoteId) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === activeNoteId 
          ? {
              ...note,
              title: noteTitle,
              content: noteContent,
              module: noteModule,
              tags: noteTags.split(",").map(tag => tag.trim()).filter(Boolean),
              lastEdited: new Date().toISOString()
            } 
          : note
      ));
      
      setIsEditing(false);
      
      toast({
        title: "Note Updated",
        description: "Your note has been saved successfully",
      });
    } else if (newNoteDialogOpen) {
      // Create new note
      const newNote = {
        id: `n${notes.length + 1}`,
        title: noteTitle,
        content: noteContent,
        module: noteModule,
        tags: noteTags.split(",").map(tag => tag.trim()).filter(Boolean),
        lastEdited: new Date().toISOString()
      };
      
      setNotes([...notes, newNote]);
      setNewNoteDialogOpen(false);
      
      toast({
        title: "Note Created",
        description: "Your new note has been saved",
      });
    }
  };

  const handleDeleteNote = () => {
    if (activeNoteId) {
      setNotes(notes.filter(note => note.id !== activeNoteId));
      setActiveNoteId(null);
      setConfirmDeleteDialogOpen(false);
      
      toast({
        title: "Note Deleted",
        description: "Your note has been permanently deleted",
        variant: "destructive",
      });
    }
  };

  const handleNewNote = () => {
    setNoteTitle("");
    setNoteContent("");
    setNoteModule("");
    setNoteTags("");
    setNewNoteDialogOpen(true);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (error && notes.length === 0) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate(-1)}>
              Return to Course
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (activeNote && !newNoteDialogOpen) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" onClick={handleCloseNote}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notes
          </Button>
          
          {!isEditing && (
            <>
              <Button variant="outline" onClick={handleEditNote}>
                Edit Note
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setConfirmDeleteDialogOpen(true)}
                className="text-red-500 hover:text-red-600"
              >
                <FileMinus className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
        
        <Card className="mb-6">
          {isEditing ? (
            <>
              <CardHeader>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full text-xl font-bold border-b pb-2 focus:outline-none"
                  placeholder="Note title"
                />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">Module:</span>
                  <input
                    type="text"
                    value={noteModule}
                    onChange={(e) => setNoteModule(e.target.value)}
                    className="text-xs border rounded px-2 py-1 flex-grow"
                    placeholder="Module name"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full min-h-[300px] border rounded p-3 focus:outline-none"
                  placeholder="Note content"
                />
                <div className="mt-4">
                  <label className="text-xs text-muted-foreground block mb-1">
                    Tags (comma separated):
                  </label>
                  <input
                    type="text"
                    value={noteTags}
                    onChange={(e) => setNoteTags(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveNote}>
                  Save Note
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-xl">{activeNote.title}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span>Module: {activeNote.module}</span>
                    <span className="mx-2">•</span>
                    <span>Last edited: {formatDate(activeNote.lastEdited)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activeNote.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line prose max-w-none">
                  {activeNote.content}
                </div>
              </CardContent>
            </>
          )}
        </Card>
        
        <Dialog open={confirmDeleteDialogOpen} onOpenChange={setConfirmDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Note</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this note? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteNote}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <Notebook className="h-6 w-6 mr-2 text-primary" />
            Course Notes
          </h1>
          <p className="text-muted-foreground">
            Keep track of important concepts and ideas from your course
          </p>
        </div>
        <Button onClick={handleNewNote}>
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>
      
      {notes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Notes Yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first note to keep track of important concepts
            </p>
            <Button onClick={handleNewNote}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Note
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card 
              key={note.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleOpenNote(note.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                </div>
                <CardDescription>Module: {note.module}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm line-clamp-3">
                  {note.content}
                </p>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    {formatDate(note.lastEdited)}
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {note.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                    {note.tags.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{note.tags.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={newNoteDialogOpen} onOpenChange={setNewNoteDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>
              Add a new note to your course notebook
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Note title"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Module</label>
              <input
                type="text"
                value={noteModule}
                onChange={(e) => setNoteModule(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Module name"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Content</label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full min-h-[200px] border rounded px-3 py-2"
                placeholder="Note content"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={noteTags}
                onChange={(e) => setNoteTags(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNote} disabled={!noteTitle.trim()}>
              Create Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseNotes;
