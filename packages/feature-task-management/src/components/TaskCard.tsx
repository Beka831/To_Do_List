
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, ProgressBar } from '@monorepo/ui-components';
import { formatDate, getDaysFromNow } from '@monorepo/utils';
import { Task, TaskStatus } from '../types';

export interface TaskCardProps {
  task: Task;
  onUpdate: (updates: Partial<Task>) => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const daysUntilDue = task.dueDate ? getDaysFromNow(task.dueDate) : null;
  const isOverdue = daysUntilDue !== null && daysUntilDue < 0;

  const statusColors = {
    todo: 'default',
    'in-progress': 'secondary',
    review: 'warning',
    done: 'success'
  } as const;

  const priorityColors = {
    low: 'default',
    medium: 'warning',
    high: 'destructive',
    urgent: 'destructive'
  } as const;

  const handleStatusChange = (status: TaskStatus) => {
    onUpdate({ status });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <div className="flex gap-1">
            <Badge variant={statusColors[task.status]}>
              {task.status}
            </Badge>
            <Badge variant={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {task.description && (
          <p className="text-sm text-muted-foreground">{task.description}</p>
        )}
        
        <ProgressBar
          value={task.progress}
          label="Progress"
          variant={task.progress === 100 ? 'success' : 'default'}
        />
        
        {task.dueDate && (
          <div className="flex items-center justify-between text-sm">
            <span>Due: {formatDate(task.dueDate)}</span>
            {isOverdue && (
              <Badge variant="destructive">Overdue</Badge>
            )}
          </div>
        )}
        
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
            className="text-xs px-2 py-1 border rounded"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
          
          <button
            onClick={onDelete}
            className="text-xs px-2 py-1 text-destructive hover:bg-destructive/10 rounded"
          >
            Delete
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
