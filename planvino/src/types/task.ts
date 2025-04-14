export type TaskModule = 'vineyard' | 'cellar' | 'marketing';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  module: TaskModule;
  isShared: boolean;
  sharedWith?: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
} 