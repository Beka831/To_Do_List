
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@monorepo/ui-components';
import { formatNumber, formatCurrency, formatPercentage } from '@monorepo/utils';
import { Metric } from '../types';

export interface MetricsCardProps {
  metric: Metric;
  className?: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ metric, className }) => {
  const formatValue = (value: number) => {
    switch (metric.format) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value, 100);
      default:
        return formatNumber(value);
    }
  };

  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold">
            {formatValue(metric.value)}
            {metric.unit && (
              <span className="text-sm font-normal text-muted-foreground ml-1">
                {metric.unit}
              </span>
            )}
          </div>
          
          {metric.changePercentage !== undefined && (
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {getTrendIcon()} {Math.abs(metric.changePercentage).toFixed(1)}%
              </span>
              
              {metric.previousValue !== undefined && (
                <span className="text-xs text-muted-foreground">
                  vs {formatValue(metric.previousValue)}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
