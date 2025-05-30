
// Analytics Feature Package
export { AnalyticsDashboard } from './components/AnalyticsDashboard';
export { MetricsCard } from './components/MetricsCard';
export { ChartWidget } from './components/ChartWidget';
export { DataTable } from './components/DataTable';
export { ReportGenerator } from './components/ReportGenerator';
export { KPIOverview } from './components/KPIOverview';

// Hooks
export { useAnalytics } from './hooks/useAnalytics';
export { useMetrics } from './hooks/useMetrics';
export { useReports } from './hooks/useReports';

// Types
export type { AnalyticsData, Metric, ChartConfig, Report, KPI } from './types';

// Services
export { AnalyticsService } from './services/AnalyticsService';
export { MetricsCalculator } from './services/MetricsCalculator';
