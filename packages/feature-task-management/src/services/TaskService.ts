
import { setStorageItem, getStorageItem } from '@monorepo/utils';
import { Task, TaskFilters } from '../types';

const STORAGE_KEY = 'tasks';

export class TaskService {
  static async getTasks(): Promise<Task[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const stored = getStorageItem<Task[]>(STORAGE_KEY, []);
    return stored.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined
    }));
  }

  static async createTask(task: Task): Promise<Task> {
    const tasks = await this.getTasks();
    tasks.push(task);
    setStorageItem(STORAGE_KEY, tasks);
    return task;
  }

  static async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
    const tasks = await this.getTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) return null;
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    tasks[taskIndex] = updatedTask;
    setStorageItem(STORAGE_KEY, tasks);
    return updatedTask;
  }

  static async deleteTask(id: string): Promise<boolean> {
    const tasks = await this.getTasks();
    const filteredTasks = tasks.filter(t => t.id !== id);
    
    if (filteredTasks.length === tasks.length) return false;
    
    setStorageItem(STORAGE_KEY, filteredTasks);
    return true;
  }

  static filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
    return tasks.filter(task => {
      if (filters.status && !filters.status.includes(task.status)) {
        return false;
      }
      
      if (filters.priority && !filters.priority.includes(task.priority)) {
        return false;
      }
      
      if (filters.assignee && filters.assignee.length > 0) {
        if (!task.assignee || !filters.assignee.includes(task.assignee)) {
          return false;
        }
      }
      
      if (filters.tags && filters.tags.length > 0) {
        if (!filters.tags.some(tag => task.tags.includes(tag))) {
          return false;
        }
      }
      
      if (filters.dateRange) {
        if (!task.dueDate) return false;
        if (task.dueDate < filters.dateRange.start || task.dueDate > filters.dateRange.end) {
          return false;
        }
      }
      
      return true;
    });
  }
}
