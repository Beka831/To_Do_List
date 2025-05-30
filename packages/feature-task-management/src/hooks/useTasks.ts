
import { useState, useEffect, useMemo } from 'react';
import { generateId } from '@monorepo/utils';
import { Task, TaskFilters } from '../types';
import { TaskService } from '../services/TaskService';

export const useTasks = (filters: TaskFilters = {}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      const loadedTasks = await TaskService.getTasks();
      setTasks(loadedTasks);
      setLoading(false);
    };

    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return TaskService.filterTasks(tasks, filters);
  }, [tasks, filters]);

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId('task'),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const savedTask = await TaskService.createTask(newTask);
    setTasks(prev => [...prev, savedTask]);
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const updatedTask = await TaskService.updateTask(id, updates);
    if (updatedTask) {
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
    }
  };

  const deleteTask = async (id: string) => {
    const success = await TaskService.deleteTask(id);
    if (success) {
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };

  return {
    tasks,
    filteredTasks,
    loading,
    addTask,
    updateTask,
    deleteTask
  };
};
