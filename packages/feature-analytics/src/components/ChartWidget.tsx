
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Chart } from '@monorepo/ui-components';
import { ChartConfig } from '../types';

export interface ChartWidgetProps {
  config: ChartConfig;
  className?: string;
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({ config, className }) => {
  const chartData = config.data.map((point, index) => ({
    label: point.label,
    value: point.value,
    color: config.colors?.[index] || undefined
  }));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <Chart 
            data={chartData} 
            type={config.type === 'line' ? 'bar' : config.type} // Simplified for demo
          />
          
          {(config.xAxisLabel || config.yAxisLabel) && (
            <div className="flex justify-between text-xs text-muted-foreground">
              {config.xAxisLabel && <span>{config.xAxisLabel}</span>}
              {config.yAxisLabel && <span>{config.yAxisLabel}</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
