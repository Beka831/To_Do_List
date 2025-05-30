
// Task Management Feature Package
export { TaskManager } from './components/TaskManager';
export { TaskList } from './components/TaskList';
export { TaskCard } from './components/TaskCard';
export { TaskForm } from './components/TaskForm';
export { TaskFilters } from './components/TaskFilters';
export { TaskStats } from './components/TaskStats';

// Hooks
export { useTasks } from './hooks/useTasks';
export { useTaskStats } from './hooks/useTaskStats';

// Types
export type { Task, TaskStatus, TaskPriority } from './types';

// Services
export { TaskService } from './services/TaskService';
