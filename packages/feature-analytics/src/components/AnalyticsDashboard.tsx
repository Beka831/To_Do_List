
import React, { useState, useEffect } from 'react';
import { Layout, Card, CardHeader, CardTitle, CardContent } from '@monorepo/ui-components';
import { KPIOverview } from './KPIOverview';
import { MetricsCard } from './MetricsCard';
import { ChartWidget } from './ChartWidget';
import { ReportGenerator } from './ReportGenerator';
import { useAnalytics } from '../hooks/useAnalytics';
import { useMetrics } from '../hooks/useMetrics';
import { AnalyticsFilters, DashboardConfig } from '../types';

export interface AnalyticsDashboardProps {
  config?: DashboardConfig;
  className?: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  config = {
    title: 'Analytics Dashboard',
    layout: { kpis: true, charts: true, metrics: true, tables: true },
    autoRefresh: true,
    refreshInterval: 30000
  },
  className
}) => {
  const [filters, setFilters] = useState<AnalyticsFilters>({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      end: new Date()
    },
    granularity: 'day'
  });

  const { data, loading, error, refresh } = useAnalytics(filters);
  const { metrics, kpis } = useMetrics(data);

  useEffect(() => {
    if (config.autoRefresh && config.refreshInterval) {
      const interval = setInterval(refresh, config.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [config.autoRefresh, config.refreshInterval, refresh]);

  const header = (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-2xl font-bold">{config.title}</h1>
      <div className="flex gap-2">
        <button
          onClick={refresh}
          className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
        <ReportGenerator data={data} metrics={metrics} />
      </div>
    </div>
  );

  const sidebar = (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date Range</label>
            <div className="space-y-2">
              <input
                type="date"
                value={filters.dateRange?.start.toISOString().split('T')[0]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  dateRange: {
                    ...prev.dateRange!,
                    start: new Date(e.target.value)
                  }
                }))}
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
              />
              <input
                type="date"
                value={filters.dateRange?.end.toISOString().split('T')[0]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  dateRange: {
                    ...prev.dateRange!,
                    end: new Date(e.target.value)
                  }
                }))}
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Granularity</label>
            <select
              value={filters.granularity}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                granularity: e.target.value as any
              }))}
              className="w-full px-3 py-2 border border-input rounded-md text-sm"
            >
              <option value="hour">Hourly</option>
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold text-destructive mb-2">Error Loading Analytics</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={refresh}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Try Again
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Layout
      header={header}
      sidebar={sidebar}
      className={className}
    >
      <div className="space-y-6 p-6">
        {config.layout.kpis && (
          <KPIOverview kpis={kpis} loading={loading} />
        )}

        {config.layout.metrics && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <MetricsCard key={metric.id} metric={metric} />
            ))}
          </div>
        )}

        {config.layout.charts && (
          <div className="grid gap-6 md:grid-cols-2">
            <ChartWidget
              config={{
                type: 'line',
                title: 'Trend Over Time',
                data: data.map(item => ({
                  label: item.timestamp.toLocaleDateString(),
                  value: item.value,
                  date: item.timestamp
                }))
              }}
            />
            
            <ChartWidget
              config={{
                type: 'bar',
                title: 'Category Distribution',
                data: Object.entries(
                  data.reduce((acc, item) => {
                    acc[item.category] = (acc[item.category] || 0) + item.value;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, value]) => ({
                  label: category,
                  value
                }))
              }}
            />
          </div>
        )}

        {config.layout.tables && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Timestamp</th>
                      <th className="text-left p-2">Category</th>
                      <th className="text-left p-2">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, 10).map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{item.timestamp.toLocaleString()}</td>
                        <td className="p-2">{item.category}</td>
                        <td className="p-2">{item.value.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};
