
import { useMemo } from 'react';
import { getDaysFromNow } from '@monorepo/utils';
import { Task, TaskStats } from '../types';

export const useTaskStats = (tasks: Task[]): TaskStats => {
  return useMemo(() => {
    const total = tasks.length;
    
    const byStatus = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const completedTasks = byStatus['done'] || 0;
    const completionRate = total > 0 ? (completedTasks / total) * 100 : 0;

    const avgProgress = total > 0 
      ? tasks.reduce((sum, task) => sum + task.progress, 0) / total 
      : 0;

    const overdue = tasks.filter(task => 
      task.dueDate && getDaysFromNow(task.dueDate) < 0 && task.status !== 'done'
    ).length;

    return {
      total,
      byStatus: {
        todo: byStatus['todo'] || 0,
        'in-progress': byStatus['in-progress'] || 0,
        review: byStatus['review'] || 0,
        done: byStatus['done'] || 0
      },
      byPriority: {
        low: byPriority['low'] || 0,
        medium: byPriority['medium'] || 0,
        high: byPriority['high'] || 0,
        urgent: byPriority['urgent'] || 0
      },
      completionRate: Math.round(completionRate),
      avgProgress: Math.round(avgProgress),
      overdue
    };
  }, [tasks]);
};
