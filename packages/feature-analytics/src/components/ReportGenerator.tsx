
import React, { useState } from 'react';
import { Button, Modal, Input } from '@monorepo/ui-components';
import { useReports } from '../hooks/useReports';
import { AnalyticsData, Metric } from '../types';

export interface ReportGeneratorProps {
  data: AnalyticsData[];
  metrics: Metric[];
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ data, metrics }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    title: '',
    description: '',
    type: 'summary' as const,
    includeCharts: true,
    includeMetrics: true
  });

  const { generateReport, downloading } = useReports();

  const handleGenerate = async () => {
    await generateReport({
      ...reportConfig,
      data,
      metrics
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        Generate Report
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Generate Analytics Report"
      >
        <div className="space-y-4">
          <Input
            label="Report Title"
            value={reportConfig.title}
            onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter report title..."
          />

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={reportConfig.description}
              onChange={(e) => setReportConfig(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter report description..."
              className="w-full px-3 py-2 border border-input rounded-md"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Report Type</label>
            <select
              value={reportConfig.type}
              onChange={(e) => setReportConfig(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full px-3 py-2 border border-input rounded-md"
            >
              <option value="summary">Summary Report</option>
              <option value="detailed">Detailed Report</option>
              <option value="comparison">Comparison Report</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={reportConfig.includeCharts}
                onChange={(e) => setReportConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
              />
              <span className="text-sm">Include Charts</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={reportConfig.includeMetrics}
                onChange={(e) => setReportConfig(prev => ({ ...prev, includeMetrics: e.target.checked }))}
              />
              <span className="text-sm">Include Metrics Table</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerate} disabled={downloading || !reportConfig.title}>
              {downloading ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
