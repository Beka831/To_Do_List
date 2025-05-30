
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Chart, ProgressBar } from '@monorepo/ui-components';
import { formatPercentage } from '@monorepo/utils';
import { TaskStats as TaskStatsType } from '../types';

export interface TaskStatsProps {
  stats: TaskStatsType;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const statusData = Object.entries(stats.byStatus).map(([status, count]) => ({
    label: status.replace('-', ' '),
    value: count,
    color: status === 'done' ? '#10b981' : 
           status === 'in-progress' ? '#3b82f6' :
           status === 'review' ? '#f59e0b' : '#6b7280'
  }));

  const priorityData = Object.entries(stats.byPriority).map(([priority, count]) => ({
    label: priority,
    value: count,
    color: priority === 'urgent' ? '#ef4444' :
           priority === 'high' ? '#f97316' :
           priority === 'medium' ? '#eab308' : '#6b7280'
  }));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Tasks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </div>
          </div>
          
          <ProgressBar
            value={stats.completionRate}
            label="Completion Rate"
            variant={stats.completionRate > 80 ? 'success' : stats.completionRate > 50 ? 'warning' : 'default'}
          />
          
          <ProgressBar
            value={stats.avgProgress}
            label="Average Progress"
            variant="default"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart data={statusData} type="bar" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Priority Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart data={priorityData} type="pie" />
        </CardContent>
      </Card>
    </div>
  );
};
