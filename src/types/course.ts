
export interface Resource {
  type: string;
  title: string;
  duration?: string;
  pages?: number;
  questions?: number;
}

export interface Course {
  id: string;
  title: string;
  teacher: string;
  progress: number;
  lastAccessed?: string;
  completedDate?: string;
  modules: number;
  completedModules: number;
  thumbnail: string;
  certificate?: boolean;
  resources?: Resource[];
  students?: number;
  rating?: number;
  completion?: number;
}

export interface UserPreferences {
  theme: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
  contactPreferences?: {
    phone?: string;
  };
  personalInfo?: {
    birthDate?: string;
    education?: string;
    occupation?: string;
  };
}
