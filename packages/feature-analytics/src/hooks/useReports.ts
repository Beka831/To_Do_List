
import { useState } from 'react';
import { AnalyticsData, Metric, Report } from '../types';
import { generateId } from '@monorepo/utils';

interface ReportGenerationConfig {
  title: string;
  description: string;
  type: 'summary' | 'detailed' | 'comparison';
  data: AnalyticsData[];
  metrics: Metric[];
  includeCharts?: boolean;
  includeMetrics?: boolean;
}

export const useReports = () => {
  const [downloading, setDownloading] = useState(false);

  const generateReport = async (config: ReportGenerationConfig) => {
    setDownloading(true);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const report: Report = {
        id: generateId('report'),
        title: config.title,
        description: config.description,
        type: config.type,
        dateRange: {
          start: new Date(Math.min(...config.data.map(d => d.timestamp.getTime()))),
          end: new Date(Math.max(...config.data.map(d => d.timestamp.getTime())))
        },
        metrics: config.metrics,
        charts: [], // Would be populated with chart configurations
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Create and download CSV file
      const csvContent = generateCSV(config);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${config.title.replace(/\s+/g, '_')}_report.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      console.log('Report generated:', report);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setDownloading(false);
    }
  };

  const generateCSV = (config: ReportGenerationConfig) => {
    const headers = ['Timestamp', 'Category', 'Value'];
    const rows = config.data.map(item => [
      item.timestamp.toISOString(),
      item.category,
      item.value.toString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
  };

  return {
    generateReport,
    downloading
  };
};
