
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, ProgressBar } from '@monorepo/ui-components';
import { formatNumber, formatCurrency, formatPercentage } from '@monorepo/utils';
import { KPI } from '../types';

export interface KPIOverviewProps {
  kpis: KPI[];
  loading?: boolean;
  className?: string;
}

export const KPIOverview: React.FC<KPIOverviewProps> = ({ kpis, loading, className }) => {
  if (loading) {
    return (
      <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatValue = (value: number, unit?: string) => {
    if (unit === '$') return formatCurrency(value);
    if (unit === '%') return formatPercentage(value, 100);
    return formatNumber(value);
  };

  const getStatusColor = (status: KPI['status']) => {
    switch (status) {
      case 'good':
        return 'success';
      case 'warning':
        return 'warning';
      case 'critical':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {kpis.map((kpi) => (
        <Card key={kpi.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
              <Badge variant={getStatusColor(kpi.status)}>
                {kpi.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold">
              {formatValue(kpi.value, kpi.unit)}
            </div>
            
            {kpi.target && (
              <ProgressBar
                value={kpi.value}
                max={kpi.target}
                label={`Target: ${formatValue(kpi.target, kpi.unit)}`}
                variant={kpi.status === 'good' ? 'success' : 'default'}
              />
            )}
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {getTrendIcon(kpi.trend.direction)} {kpi.trend.percentage.toFixed(1)}%
              </span>
              <span className="text-muted-foreground">
                {kpi.trend.period}
              </span>
            </div>
            
            {kpi.description && (
              <p className="text-xs text-muted-foreground">
                {kpi.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
