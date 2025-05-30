
import { AnalyticsData, Metric, KPI } from '../types';
import { average, sum, max, min, percentage } from '@monorepo/utils';

export class MetricsCalculator {
  static calculateMetrics(data: AnalyticsData[]): Metric[] {
    if (data.length === 0) return [];

    const values = data.map(d => d.value);
    const totalValue = sum(values);
    const avgValue = average(values);
    const maxValue = max(values);
    const minValue = min(values);

    // Calculate trends (simplified - would typically compare with previous period)
    const midPoint = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, midPoint);
    const secondHalf = data.slice(midPoint);
    
    const firstHalfAvg = average(firstHalf.map(d => d.value));
    const secondHalfAvg = average(secondHalf.map(d => d.value));
    const trendPercentage = firstHalfAvg > 0 ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100 : 0;

    return [
      {
        id: 'total-value',
        name: 'Total Value',
        value: totalValue,
        previousValue: totalValue * 0.9, // Mock previous value
        change: totalValue * 0.1,
        changePercentage: 11.1,
        trend: 'up',
        format: 'currency'
      },
      {
        id: 'average-value',
        name: 'Average Value',
        value: avgValue,
        previousValue: avgValue * 0.95,
        change: avgValue * 0.05,
        changePercentage: 5.3,
        trend: 'up',
        format: 'currency'
      },
      {
        id: 'max-value',
        name: 'Peak Value',
        value: maxValue,
        previousValue: maxValue * 0.85,
        change: maxValue * 0.15,
        changePercentage: 17.6,
        trend: 'up',
        format: 'currency'
      },
      {
        id: 'min-value',
        name: 'Minimum Value',
        value: minValue,
        previousValue: minValue * 1.1,
        change: minValue * -0.1,
        changePercentage: -9.1,
        trend: 'down',
        format: 'currency'
      },
      {
        id: 'data-points',
        name: 'Data Points',
        value: data.length,
        trend: 'neutral',
        format: 'number'
      },
      {
        id: 'trend-percentage',
        name: 'Period Trend',
        value: trendPercentage,
        trend: trendPercentage > 0 ? 'up' : trendPercentage < 0 ? 'down' : 'neutral',
        format: 'percentage',
        unit: '%'
      }
    ];
  }

  static calculateKPIs(data: AnalyticsData[]): KPI[] {
    if (data.length === 0) return [];

    const values = data.map(d => d.value);
    const totalValue = sum(values);
    const avgValue = average(values);
    
    // Calculate category performance
    const categoryTotals = data.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.value;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)[0];

    return [
      {
        id: 'revenue',
        name: 'Total Revenue',
        value: totalValue,
        target: totalValue * 1.2,
        unit: '$',
        description: 'Total revenue across all categories',
        status: totalValue > totalValue * 0.8 ? 'good' : 'warning',
        trend: {
          direction: 'up',
          percentage: 12.5,
          period: 'vs last month'
        }
      },
      {
        id: 'performance',
        name: 'Performance Score',
        value: Math.min(100, (avgValue / 5000) * 100),
        target: 85,
        unit: '%',
        description: 'Overall performance metric',
        status: avgValue > 4000 ? 'good' : avgValue > 2000 ? 'warning' : 'critical',
        trend: {
          direction: 'up',
          percentage: 8.3,
          period: 'vs last week'
        }
      },
      {
        id: 'efficiency',
        name: 'Efficiency Rate',
        value: percentage(data.filter(d => d.value > avgValue).length, data.length),
        target: 60,
        unit: '%',
        description: 'Percentage of above-average performance',
        status: 'good',
        trend: {
          direction: 'stable',
          percentage: 0.2,
          period: 'vs yesterday'
        }
      },
      {
        id: 'top-category',
        name: 'Top Category',
        value: topCategory ? topCategory[1] : 0,
        unit: '$',
        description: `Best performing: ${topCategory ? topCategory[0] : 'N/A'}`,
        status: 'good',
        trend: {
          direction: 'up',
          percentage: 15.7,
          period: 'vs last period'
        }
      }
    ];
  }
}
