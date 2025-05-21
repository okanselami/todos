export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
} 