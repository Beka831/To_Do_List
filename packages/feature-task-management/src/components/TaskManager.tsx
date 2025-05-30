
import React, { useState } from 'react';
import { Layout } from '@monorepo/ui-components';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { TaskFilters } from './TaskFilters';
import { TaskStats } from './TaskStats';
import { useTasks } from '../hooks/useTasks';
import { useTaskStats } from '../hooks/useTaskStats';
import { TaskFilters as TaskFiltersType } from '../types';

export interface TaskManagerProps {
  className?: string;
}

export const TaskManager: React.FC<TaskManagerProps> = ({ className }) => {
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState<TaskFiltersType>({});
  
  const { tasks, addTask, updateTask, deleteTask, filteredTasks } = useTasks(filters);
  const stats = useTaskStats(tasks);

  const header = (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-bold">Task Management</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
      >
        Add Task
      </button>
    </div>
  );

  const sidebar = (
    <div className="p-4 space-y-6">
      <TaskStats stats={stats} />
      <TaskFilters filters={filters} onFiltersChange={setFilters} />
    </div>
  );

  return (
    <Layout
      header={header}
      sidebar={sidebar}
      className={className}
    >
      <div className="space-y-6">
        <TaskList
          tasks={filteredTasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
        
        {showForm && (
          <TaskForm
            onSubmit={(task) => {
              addTask(task);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </Layout>
  );
};
