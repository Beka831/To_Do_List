
export interface AnalyticsData {
  id: string;
  timestamp: Date;
  category: string;
  value: number;
  metadata?: Record<string, any>;
}

export interface Metric {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercentage?: number;
  trend: 'up' | 'down' | 'neutral';
  unit?: string;
  format?: 'number' | 'currency' | 'percentage';
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  title: string;
  data: ChartDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  colors?: string[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
  category?: string;
  date?: Date;
  metadata?: Record<string, any>;
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target?: number;
  unit?: string;
  description?: string;
  status: 'good' | 'warning' | 'critical';
  trend: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
    period: string;
  };
}

export interface Report {
  id: string;
  title: string;
  description?: string;
  type: 'summary' | 'detailed' | 'comparison';
  dateRange: {
    start: Date;
    end: Date;
  };
  metrics: Metric[];
  charts: ChartConfig[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  categories?: string[];
  metrics?: string[];
  granularity?: 'hour' | 'day' | 'week' | 'month' | 'year';
}

export interface DashboardConfig {
  title: string;
  layout: {
    kpis: boolean;
    charts: boolean;
    metrics: boolean;
    tables: boolean;
  };
  refreshInterval?: number;
  autoRefresh?: boolean;
}
