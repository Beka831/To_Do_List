
import React from 'react';
import { DataTable } from '@monorepo/ui-components';
import { formatDate } from '@monorepo/utils';
import { TaskCard } from './TaskCard';
import { Task } from '../types';

export interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  view?: 'table' | 'card';
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdateTask,
  onDeleteTask,
  view = 'card'
}) => {
  if (view === 'table') {
    const columns = [
      {
        key: 'title',
        label: 'Task',
        render: (value: string, task: Task) => (
          <div>
            <div className="font-medium">{value}</div>
            {task.description && (
              <div className="text-sm text-muted-foreground">{task.description}</div>
            )}
          </div>
        )
      },
      {
        key: 'status',
        label: 'Status',
        render: (value: string) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'done' ? 'bg-green-100 text-green-800' :
            value === 'in-progress' ? 'bg-blue-100 text-blue-800' :
            value === 'review' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {value}
          </span>
        )
      },
      {
        key: 'priority',
        label: 'Priority',
        render: (value: string) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'urgent' ? 'bg-red-100 text-red-800' :
            value === 'high' ? 'bg-orange-100 text-orange-800' :
            value === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {value}
          </span>
        )
      },
      {
        key: 'dueDate',
        label: 'Due Date',
        render: (value: Date) => value ? formatDate(value) : '-'
      },
      {
        key: 'progress',
        label: 'Progress',
        render: (value: number) => (
          <div className="w-20">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${value}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{value}%</span>
          </div>
        )
      }
    ];

    return <DataTable columns={columns} data={tasks} />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={(updates) => onUpdateTask(task.id, updates)}
          onDelete={() => onDeleteTask(task.id)}
        />
      ))}
    </div>
  );
};
