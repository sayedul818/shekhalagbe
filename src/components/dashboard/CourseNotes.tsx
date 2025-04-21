import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Notebook, Plus, FileMinus, FilePlus, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const CourseNotes = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const [notes, setNotes] = useState([
    {
      id: "n1",
      title: "JavaScript Variables and Types",
      content: "JavaScript has dynamic typing. Variables can be declared using var, let, or const. var is function-scoped, while let and const are block-scoped. const cannot be reassigned. Common types include: string, number, boolean, null, undefined, object, and symbol.",
      module: "Core Concepts",
      lastEdited: "2025-04-15T14:30:00",
      tags: ["variables", "types", "javascript"]
    },
    {
      id: "n2",
      title: "DOM Manipulation Methods",
      content: "Common DOM methods:\n- document.getElementById()\n- document.querySelector()\n- document.querySelectorAll()\n- element.innerHTML\n- element.textContent\n- element.setAttribute()\n- element.classList.add/remove/toggle()\n- element.appendChild()\n- element.addEventListener()",
      module: "DOM Fundamentals",
      lastEdited: "2025-04-18T09:45:00",
      tags: ["DOM", "methods", "javascript"]
    },
    {
      id: "n3",
      title: "Event Handling Best Practices",
      content: "1. Use event delegation for multiple similar elements\n2. Clean up event listeners when components unmount\n3. Debounce or throttle expensive handlers\n4. Prefer named functions over anonymous ones\n5. Remember to prevent default behavior when needed\n6. Consider using custom events for complex interactions",
      module: "DOM Fundamentals",
      lastEdited: "2025-04-19T16:20:00",
      tags: ["events", "performance", "javascript"]
    }
  ]);
  
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [newNoteDialogOpen, setNewNoteDialogOpen] = useState(false);
  
  // Form state
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteModule, setNoteModule] = useState("");
  const [noteTags, setNoteTags] = useState("");

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
                  placeholder="Note Title"
                />
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Module</label>
                  <input
                    type="text"
                    value={noteModule}
                    onChange={(e) => setNoteModule(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="Module name"
                  />
                </div>
              </CardHeader>
              
              <CardContent>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full min-h-[300px] p-3 border rounded-md font-mono text-sm"
                  placeholder="Note content..."
                />
                
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={noteTags}
                    onChange={(e) => setNoteTags(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="javascript, variables, etc."
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
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
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                    <span>Module: {activeNote.module}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>Last edited: {formatDate(activeNote.lastEdited)}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="whitespace-pre-line prose">
                  {activeNote.content}
                </div>
                
                {activeNote.tags.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {activeNote.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
                Delete Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center">
              <Notebook className="h-6 w-6 mr-2 text-primary" />
              My Notes
            </h1>
            <p className="text-muted-foreground">
              Create and manage your course notes
            </p>
          </div>
          
          <Button onClick={handleNewNote}>
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <Card 
              key={note.id} 
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => handleOpenNote(note.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1">{note.title}</CardTitle>
                <CardDescription>
                  Module: {note.module}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className="text-sm line-clamp-3 text-muted-foreground">
                  {note.content}
                </p>
              </CardContent>
              
              <CardFooter className="pt-2 flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {note.tags.length > 3 && (
                    <span className="text-xs">+{note.tags.length - 3} more</span>
                  )}
                </div>
                <span>{formatDate(note.lastEdited)}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-md bg-gray-50">
          <Notebook className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No notes yet</h3>
          <p className="text-muted-foreground mb-4">Create your first note to start taking notes for this course</p>
          <Button onClick={handleNewNote}>
            <Plus className="h-4 w-4 mr-2" />
            Create a Note
          </Button>
        </div>
      )}

      <Dialog open={newNoteDialogOpen} onOpenChange={setNewNoteDialogOpen}>
        <DialogContent className={isMobile ? "w-[95vw] max-w-lg" : "max-w-4xl"}>
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>
              Add a new note to organize your course learning
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Note title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full min-h-[200px] p-2 border rounded-md font-mono text-sm"
                placeholder="Note content..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Module</label>
                <input
                  type="text"
                  value={noteModule}
                  onChange={(e) => setNoteModule(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Module name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={noteTags}
                  onChange={(e) => setNoteTags(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="javascript, variables, etc."
                />
              </div>
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