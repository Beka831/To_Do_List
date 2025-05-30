
import React from 'react';
import { cn } from '../utils';

export interface ChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  type?: 'bar' | 'pie' | 'line';
  className?: string;
}

const Chart: React.FC<ChartProps> = ({ data, type = 'bar', className }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  if (type === 'bar') {
    return (
      <div className={cn("space-y-4", className)}>
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="h-2 rounded-full bg-primary"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color || undefined
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Simple pie chart representation
  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return (
      <div className={cn("grid grid-cols-2 gap-4", className)}>
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color || `hsl(${index * 137.5}, 70%, 50%)` }}
            />
            <span className="text-sm">
              {item.label}: {((item.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    );
  }

  return <div>Chart type not supported</div>;
};

export { Chart };
