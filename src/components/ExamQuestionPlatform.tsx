
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

// Define types for our data structure
interface QuestionSet {
  id: string;
  type: string;
  title: string;
  questionCount: number;
  date: string;
  isNew?: boolean;
}

interface SubjectCard {
  id: string;
  name: string;
  questionCount: number;
  color: string;
  isNew?: boolean;
  questionSets: QuestionSet[];
}

// Mock data for subjects and question sets
const mockSubjects: SubjectCard[] = [
  {
    id: "math-1",
    name: "উচ্চতর গণিত ১ম পত্র",
    questionCount: 10,
    color: "bg-blue-500",
    isNew: true,
    questionSets: [
      {
        id: "math1-set1",
        type: "এমসিকিউ",
        title: "অধ্যায় ১: সেট ও ফাংশন",
        questionCount: 25,
        date: "২০২৫-০৪-১০",
        isNew: true
      },
      {
        id: "math1-set2",
        type: "লিখিত",
        title: "অধ্যায় ২: বীজগণিতীয় রাশি",
        questionCount: 15,
        date: "২০২৫-০৪-০৫"
      }
    ]
  },
  {
    id: "physics-1",
    name: "পদার্থবিজ্ঞান ১ম পত্র",
    questionCount: 8,
    color: "bg-green-500",
    questionSets: [
      {
        id: "physics1-set1",
        type: "এমসিকিউ",
        title: "অধ্যায় ১: ভৌত জগৎ ও পরিমাপ",
        questionCount: 20,
        date: "২০২৫-০৪-০৮"
      },
      {
        id: "physics1-set2",
        type: "লিখিত",
        title: "অধ্যায় ২: ভেক্টর",
        questionCount: 12,
        date: "২০২৫-০৪-০২"
      }
    ]
  },
  {
    id: "chemistry-1",
    name: "রসায়ন ১ম পত্র",
    questionCount: 12,
    color: "bg-purple-500",
    isNew: true,
    questionSets: [
      {
        id: "chem1-set1",
        type: "এমসিকিউ",
        title: "অধ্যায় ১: পরমাণুর গঠন",
        questionCount: 30,
        date: "২০২৫-০৪-০৯",
        isNew: true
      },
      {
        id: "chem1-set2",
        type: "লিখিত",
        title: "অধ্যায় ২: পর্যায় সারণি",
        questionCount: 18,
        date: "২০২৫-০৪-০৩"
      }
    ]
  }
];

// Define available options for dropdowns
const classOptions = ["এসএসসি", "এইচএসসি", "ভর্তি পরীক্ষা"];
const subjectOptions = ["জীববিজ্ঞান", "রসায়ন", "পদার্থবিজ্ঞান", "গণিত"];

export const ExamQuestionPlatform: React.FC = () => {
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  
  return (
    <section className="py-16 bg-background">
      {!showQuestionBank ? (
        // Hero Section
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              দেশের প্রথম এবং একমাত্র{" "}
              <span className="relative text-red-600">
                পেপারলেস
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q25,0 50,5 Q75,10 100,5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              স্মার্ট প্রশ্নব্যাংক!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              সকল পরীক্ষার প্রশ্নব্যাংক, টেস্টপেপার, আনলিমিটেড পরীক্ষা, প্রশ্ন ও অনলাইন পরীক্ষা তৈরী!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowQuestionBank(true)} 
                className="bg-green-500 hover:bg-green-600 text-white"
                size="lg"
              >
                ফ্রি-তে প্রশ্নব্যাংক দেখুন
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => setShowQuestionBank(true)}
                variant="outline" 
                size="lg"
              >
                প্রশ্ন তৈরি করুন
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Question Bank Component
        <div className="container mx-auto px-4 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            স্মার্ট প্রশ্নব্যাংক
          </h2>
          
          {/* Filter Section */}
          <div className="bg-card p-4 rounded-lg shadow-sm mb-8 sticky top-16 z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">ক্লাস/লেভেল</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="ক্লাস বা লেভেল নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {classOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">বিষয়</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Subject Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSubjects.map((subject) => (
              <Card key={subject.id} className="overflow-hidden border hover:shadow-md transition-shadow">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={subject.id} className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center w-full">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-3", subject.color)}>
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{subject.name}</h3>
                            {subject.isNew && (
                              <Badge variant="secondary" className="bg-red-100 text-red-800">নতুন</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {subject.questionCount}টি প্রশ্ন
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="space-y-4">
                        {subject.questionSets.map((set) => (
                          <div key={set.id} className="bg-accent rounded-md p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{set.type}</span>
                                  {set.isNew && (
                                    <Badge variant="outline" className="text-xs bg-red-100 text-red-800 border-red-200">
                                      নতুন
                                    </Badge>
                                  )}
                                </div>
                                <h4 className="font-medium mt-1">{set.title}</h4>
                                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                  <span>{set.questionCount}টি প্রশ্ন</span>
                                  <span>{set.date}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-8">
                                  <FileText className="h-4 w-4 mr-1" />
                                  দেখুন
                                </Button>
                                <Button size="sm" variant="outline" className="h-8">
                                  <Download className="h-4 w-4 mr-1" />
                                  ডাউনলোড
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            ))}
          </div>
          
          {/* Back button */}
          <div className="mt-8 text-center">
            <Button 
              variant="ghost" 
              onClick={() => setShowQuestionBank(false)}
              className="text-muted-foreground"
            >
              ← ফিরে যান
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExamQuestionPlatform;
