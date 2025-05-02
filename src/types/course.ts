
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
}
