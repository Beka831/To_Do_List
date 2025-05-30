
import { useMemo } from 'react';
import { AnalyticsData, Metric, KPI } from '../types';
import { MetricsCalculator } from '../services/MetricsCalculator';

export const useMetrics = (data: AnalyticsData[]) => {
  const metrics = useMemo(() => {
    return MetricsCalculator.calculateMetrics(data);
  }, [data]);

  const kpis = useMemo(() => {
    return MetricsCalculator.calculateKPIs(data);
  }, [data]);

  return {
    metrics,
    kpis
  };
};
