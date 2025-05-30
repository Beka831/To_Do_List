
# @monorepo/feature-analytics

A comprehensive analytics and reporting feature package providing real-time dashboards, metrics calculation, data visualization, and report generation capabilities.

## Features

### 📊 Analytics Dashboard
- Real-time data visualization
- Customizable dashboard layouts
- Interactive filtering and date range selection
- Auto-refresh capabilities
- Responsive design for all devices

### 📈 Metrics & KPIs
- Automated metrics calculation
- Key Performance Indicators (KPIs) tracking
- Trend analysis and comparison
- Performance status monitoring
- Target vs actual comparisons

### 📋 Reporting System
- Automated report generation
- Multiple report formats (Summary, Detailed, Comparison)
- CSV export functionality
- Customizable report content
- Scheduled report generation

### 🎨 Data Visualization
- Multiple chart types (Line, Bar, Pie, Area)
- Interactive charts with hover states
- Color-coded status indicators
- Progress bars and trend arrows
- Responsive chart layouts

## Components

### Dashboard Components
- **AnalyticsDashboard**: Main dashboard container with layout management
- **KPIOverview**: Key performance indicators display
- **MetricsCard**: Individual metric display cards
- **ChartWidget**: Configurable chart component

### Utility Components
- **ReportGenerator**: Report creation and export interface
- **DataTable**: Tabular data display with sorting and filtering

### Hooks
- **useAnalytics**: Data fetching and filtering
- **useMetrics**: Metrics and KPI calculation
- **useReports**: Report generation and export

## Installation

```bash
npm install @monorepo/feature-analytics
```

## Usage

### Complete Dashboard
```typescript
import { AnalyticsDashboard } from '@monorepo/feature-analytics';

function App() {
  return (
    <AnalyticsDashboard
      config={{
        title: 'Business Analytics',
        layout: {
          kpis: true,
          charts: true,
          metrics: true,
          tables: true
        },
        autoRefresh: true,
        refreshInterval: 30000
      }}
    />
  );
}
```

### Individual Components
```typescript
import { 
  MetricsCard, 
  ChartWidget, 
  KPIOverview,
  useAnalytics,
  useMetrics 
} from '@monorepo/feature-analytics';

function CustomDashboard() {
  const { data, loading } = useAnalytics({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date()
    }
  });
  
  const { metrics, kpis } = useMetrics(data);

  return (
    <div className="grid gap-6">
      <KPIOverview kpis={kpis} loading={loading} />
      
      <div className="grid md:grid-cols-3 gap-4">
        {metrics.map(metric => (
          <MetricsCard key={metric.id} metric={metric} />
        ))}
      </div>
      
      <ChartWidget
        config={{
          type: 'line',
          title: 'Revenue Trend',
          data: data.map(item => ({
            label: item.timestamp.toLocaleDateString(),
            value: item.value
          }))
        }}
      />
    </div>
  );
}
```

### Custom Filters
```typescript
import { useAnalytics } from '@monorepo/feature-analytics';

function FilteredAnalytics() {
  const { data, loading, refresh } = useAnalytics({
    dateRange: {
      start: new Date('2024-01-01'),
      end: new Date('2024-12-31')
    },
    categories: ['Sales', 'Marketing'],
    granularity: 'month'
  });

  // Use data with applied filters
}
```

## Data Structure

### Analytics Data
```typescript
interface AnalyticsData {
  id: string;
  timestamp: Date;
  category: string;
  value: number;
  metadata?: Record<string, any>;
}
```

### Metrics
```typescript
interface Metric {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  changePercentage?: number;
  trend: 'up' | 'down' | 'neutral';
  format?: 'number' | 'currency' | 'percentage';
}
```

### KPIs
```typescript
interface KPI {
  id: string;
  name: string;
  value: number;
  target?: number;
  status: 'good' | 'warning' | 'critical';
  trend: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
    period: string;
  };
}
```

## Customization

### Dashboard Configuration
```typescript
const dashboardConfig = {
  title: 'Custom Analytics',
  layout: {
    kpis: true,      // Show KPI overview
    charts: true,    // Show chart widgets
    metrics: true,   // Show metrics cards
    tables: true     // Show data tables
  },
  autoRefresh: true,
  refreshInterval: 60000 // 1 minute
};
```

### Chart Configuration
```typescript
const chartConfig = {
  type: 'bar',
  title: 'Sales by Category',
  data: [
    { label: 'Q1', value: 10000 },
    { label: 'Q2', value: 15000 },
    { label: 'Q3', value: 12000 },
    { label: 'Q4', value: 18000 }
  ],
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
};
```

## Development

```bash
npm run build    # Build the package
npm run dev      # Watch mode for development
```

## Features

- 🚀 **Real-time**: Live data updates and monitoring
- 📱 **Responsive**: Works on all screen sizes
- 🎨 **Customizable**: Flexible theming and layout options
- 📊 **Comprehensive**: Complete analytics solution
- 🔧 **Extensible**: Easy to add custom metrics and visualizations
- 📈 **Performance**: Optimized for large datasets
