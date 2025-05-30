
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@monorepo/ui-components';
import { TaskManager } from '@monorepo/feature-task-management';
import { AnalyticsDashboard } from '@monorepo/feature-analytics';
import { IntegratedDashboard } from './components/IntegratedDashboard';
import { Navigation } from './components/Navigation';
import './styles.css';

const App: React.FC = () => {
  const header = <Navigation />;

  return (
    <BrowserRouter>
      <Layout header={header} className="min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<IntegratedDashboard />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route 
            path="/analytics" 
            element={
              <AnalyticsDashboard 
                config={{
                  title: 'Task Analytics Dashboard',
                  layout: { kpis: true, charts: true, metrics: true, tables: true },
                  autoRefresh: true,
                  refreshInterval: 60000
                }}
              />
            } 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
