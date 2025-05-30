
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@monorepo/ui-components';
import { TaskFilters as TaskFiltersType, TaskStatus, TaskPriority } from '../types';

export interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleStatusChange = (status: TaskStatus, checked: boolean) => {
    const currentStatuses = filters.status || [];
    const newStatuses = checked
      ? [...currentStatuses, status]
      : currentStatuses.filter(s => s !== status);
    
    onFiltersChange({
      ...filters,
      status: newStatuses.length > 0 ? newStatuses : undefined
    });
  };

  const handlePriorityChange = (priority: TaskPriority, checked: boolean) => {
    const currentPriorities = filters.priority || [];
    const newPriorities = checked
      ? [...currentPriorities, priority]
      : currentPriorities.filter(p => p !== priority);
    
    onFiltersChange({
      ...filters,
      priority: newPriorities.length > 0 ? newPriorities : undefined
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <button
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Status</h4>
          <div className="space-y-2">
            {(['todo', 'in-progress', 'review', 'done'] as TaskStatus[]).map(status => (
              <label key={status} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.status?.includes(status) || false}
                  onChange={(e) => handleStatusChange(status, e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm capitalize">{status.replace('-', ' ')}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Priority</h4>
          <div className="space-y-2">
            {(['low', 'medium', 'high', 'urgent'] as TaskPriority[]).map(priority => (
              <label key={priority} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.priority?.includes(priority) || false}
                  onChange={(e) => handlePriorityChange(priority, e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm capitalize">{priority}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
