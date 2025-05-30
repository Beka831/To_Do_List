
import { AnalyticsData, AnalyticsFilters } from '../types';
import { generateId, randomInt, randomFloat } from '@monorepo/utils';

export class AnalyticsService {
  private static generateMockData(count: number = 100): AnalyticsData[] {
    const categories = ['Sales', 'Marketing', 'Support', 'Development', 'Operations'];
    const data: AnalyticsData[] = [];
    
    for (let i = 0; i < count; i++) {
      const timestamp = new Date(Date.now() - i * 24 * 60 * 60 * 1000); // Past days
      data.push({
        id: generateId('analytics'),
        timestamp,
        category: categories[randomInt(0, categories.length - 1)],
        value: randomFloat(100, 10000),
        metadata: {
          source: 'generated',
          confidence: randomFloat(0.7, 1.0)
        }
      });
    }
    
    return data.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  static async getData(filters: AnalyticsFilters = {}): Promise<AnalyticsData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let data = this.generateMockData(150);
    
    // Apply filters
    if (filters.dateRange) {
      data = data.filter(item => 
        item.timestamp >= filters.dateRange!.start && 
        item.timestamp <= filters.dateRange!.end
      );
    }
    
    if (filters.categories && filters.categories.length > 0) {
      data = data.filter(item => filters.categories!.includes(item.category));
    }
    
    // Apply granularity grouping
    if (filters.granularity) {
      data = this.applyGranularity(data, filters.granularity);
    }
    
    return data;
  }

  private static applyGranularity(data: AnalyticsData[], granularity: string): AnalyticsData[] {
    const grouped = new Map<string, AnalyticsData[]>();
    
    data.forEach(item => {
      const key = this.getGranularityKey(item.timestamp, granularity);
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(item);
    });
    
    return Array.from(grouped.entries()).map(([key, items]) => {
      const timestamp = new Date(key);
      const value = items.reduce((sum, item) => sum + item.value, 0);
      const categories = [...new Set(items.map(item => item.category))];
      
      return {
        id: generateId('grouped'),
        timestamp,
        category: categories.length === 1 ? categories[0] : 'Mixed',
        value,
        metadata: {
          grouped: true,
          itemCount: items.length,
          categories
        }
      };
    });
  }

  private static getGranularityKey(timestamp: Date, granularity: string): string {
    const date = new Date(timestamp);
    
    switch (granularity) {
      case 'hour':
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()).toISOString();
      case 'day':
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
      case 'week':
        const week = new Date(date);
        week.setDate(date.getDate() - date.getDay());
        return new Date(week.getFullYear(), week.getMonth(), week.getDate()).toISOString();
      case 'month':
        return new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
      case 'year':
        return new Date(date.getFullYear(), 0, 1).toISOString();
      default:
        return date.toISOString();
    }
  }
}
