
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@monorepo/ui-components';
import { TaskStats, useTasks } from '@monorepo/feature-task-management';
import { MetricsCard, ChartWidget, useAnalytics } from '@monorepo/feature-analytics';
import { formatDate, percentage } from '@monorepo/utils';

export const IntegratedDashboard: React.FC = () => {
  const { tasks, loading: tasksLoading } = useTasks();
  const { data: analyticsData, loading: analyticsLoading } = useAnalytics({
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      end: new Date()
    },
    granularity: 'day'
  });

  // Convert task data to analytics format
  const taskAnalytics = tasks.map(task => ({
    id: task.id,
    timestamp: task.createdAt,
    category: task.status,
    value: task.progress,
    metadata: {
      priority: task.priority,
      title: task.title
    }
  }));

  // Calculate integrated metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const overdueTasks = tasks.filter(t => 
    t.dueDate && new Date() > t.dueDate && t.status !== 'done'
  ).length;
  const completionRate = totalTasks > 0 ? percentage(completedTasks, totalTasks) : 0;

  // Chart data for task progress over time
  const taskProgressData = taskAnalytics
    .filter(task => task.metadata.priority)
    .reduce((acc, task) => {
      const priority = task.metadata.priority as string;
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const priorityChartData = Object.entries(taskProgressData).map(([priority, count]) => ({
    label: priority,
    value: count,
    color: priority === 'urgent' ? '#ef4444' :
           priority === 'high' ? '#f97316' :
           priority === 'medium' ? '#eab308' : '#6b7280'
  }));

  // Status distribution
  const statusData = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = Object.entries(statusData).map(([status, count]) => ({
    label: status.replace('-', ' '),
    value: count,
    color: status === 'done' ? '#10b981' :
           status === 'in-progress' ? '#3b82f6' :
           status === 'review' ? '#f59e0b' : '#6b7280'
  }));

  if (tasksLoading || analyticsLoading) {
    return (
      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integrated Dashboard</h1>
          <p className="text-muted-foreground">
            Task management and analytics overview for {formatDate(new Date())}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export Report
          </Button>
          <Button size="sm">
            View Details
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          metric={{
            id: 'total-tasks',
            name: 'Total Tasks',
            value: totalTasks,
            trend: 'up',
            changePercentage: 5.2,
            format: 'number'
          }}
        />
        <MetricsCard
          metric={{
            id: 'completion-rate',
            name: 'Completion Rate',
            value: completionRate,
            trend: completionRate > 70 ? 'up' : 'down',
            changePercentage: 3.1,
            format: 'percentage',
            unit: '%'
          }}
        />
        <MetricsCard
          metric={{
            id: 'completed-tasks',
            name: 'Completed Tasks',
            value: completedTasks,
            trend: 'up',
            changePercentage: 8.7,
            format: 'number'
          }}
        />
        <MetricsCard
          metric={{
            id: 'overdue-tasks',
            name: 'Overdue Tasks',
            value: overdueTasks,
            trend: overdueTasks > 0 ? 'down' : 'neutral',
            changePercentage: overdueTasks > 0 ? -2.3 : 0,
            format: 'number'
          }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChartWidget
          config={{
            type: 'pie',
            title: 'Task Status Distribution',
            data: statusChartData
          }}
        />
        
        <ChartWidget
          config={{
            type: 'bar',
            title: 'Tasks by Priority',
            data: priorityChartData
          }}
        />
      </div>

      {/* Recent Tasks & Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Due: {task.dueDate ? formatDate(task.dueDate) : 'No due date'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      task.status === 'done' ? 'default' :
                      task.status === 'in-progress' ? 'secondary' :
                      task.status === 'review' ? 'outline' : 'destructive'
                    }>
                      {task.status}
                    </Badge>
                    <Badge variant={
                      task.priority === 'urgent' ? 'destructive' :
                      task.priority === 'high' ? 'destructive' :
                      task.priority === 'medium' ? 'outline' : 'secondary'
                    }>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Task Completion</span>
                <span className="font-medium">
                  {tasks.length > 0 ? 
                    Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length) 
                    : 0}%
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Most Active Category</span>
                <span className="font-medium">
                  {Object.entries(statusData).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Productivity Score</span>
                <Badge variant={completionRate > 70 ? 'default' : 'outline'}>
                  {completionRate > 90 ? 'Excellent' :
                   completionRate > 70 ? 'Good' :
                   completionRate > 50 ? 'Fair' : 'Needs Improvement'}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Weekly Trend</span>
                <span className="text-green-600 font-medium">↗ +12.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
