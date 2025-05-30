
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const packages = [
    {
      name: '@monorepo/ui-components',
      description: 'Reusable UI component library with 10+ components',
      features: ['Button', 'Card', 'DataTable', 'Charts', 'Modal', 'Forms'],
      status: 'Stable',
      docs: '/docs/ui-components'
    },
    {
      name: '@monorepo/utils',
      description: 'Essential utility functions for common development tasks',
      features: ['Date Utils', 'String Utils', 'API Helpers', 'Validation', 'Storage'],
      status: 'Stable',
      docs: '/docs/utils'
    },
    {
      name: '@monorepo/feature-task-management',
      description: 'Complete task management system with analytics',
      features: ['CRUD Operations', 'Filtering', 'Progress Tracking', 'Statistics'],
      status: 'Active Development',
      docs: '/docs/task-management'
    },
    {
      name: '@monorepo/feature-analytics',
      description: 'Analytics dashboard with real-time metrics and reporting',
      features: ['Dashboards', 'KPIs', 'Charts', 'Report Generation', 'Export'],
      status: 'Active Development',
      docs: '/docs/analytics'
    }
  ];

  const systems = [
    {
      name: 'Task Analytics System',
      description: 'Integrated system combining task management and analytics',
      technologies: ['React', 'TypeScript', 'Vite'],
      features: ['Unified Dashboard', 'Real-time Sync', 'Cross-feature Insights'],
      demoUrl: '/demo/task-analytics',
      status: 'Live Demo'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-4">
                Monorepo Architecture
              </Badge>
              <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
                Modular Genesis System
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A comprehensive monorepo showcasing modular development with reusable components, 
                utilities, and feature packages. Built with React, TypeScript, and modern development practices.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Packages
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                4 Packages
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                50+ Components
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                TypeScript
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Modern Stack
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Package Ecosystem</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Modular packages designed for reusability, scalability, and maintainability
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {packages.map((pkg, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-blue-600">
                      {pkg.name}
                    </CardTitle>
                    <p className="text-gray-600 mt-2">{pkg.description}</p>
                  </div>
                  <Badge variant={pkg.status === 'Stable' ? 'default' : 'secondary'}>
                    {pkg.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.features.map((feature, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Docs
                    </Button>
                    <Button variant="ghost" size="sm">
                      GitHub
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Systems Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Integrated Systems</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete applications built by composing our modular packages
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-1 max-w-4xl mx-auto">
            {systems.map((system, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        {system.name}
                      </CardTitle>
                      <p className="text-gray-600 mt-2">{system.description}</p>
                    </div>
                    <Badge variant="default">{system.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                        <div className="space-y-1">
                          {system.features.map((feature, i) => (
                            <div key={i} className="text-sm text-gray-600 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {system.technologies.map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        View Live Demo
                      </Button>
                      <Button variant="outline">
                        Source Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Architecture Highlights</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Modern development practices and proven architectural patterns
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🏗️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Modular Design</h3>
            <p className="text-gray-600">
              Clean separation of concerns with reusable packages and components
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Modern Tooling</h3>
            <p className="text-gray-600">
              Built with TypeScript, React 18, Vite, and Tailwind CSS
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Developer Experience</h3>
            <p className="text-gray-600">
              Type-safe development with comprehensive documentation and examples
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our packages, check out the live demos, and see how modular architecture 
            can accelerate your development workflow.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              View on GitHub
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Modular Genesis</h3>
              <p className="text-sm">
                Demonstrating modern monorepo architecture with React, TypeScript, and modular design.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Packages</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/docs/ui-components" className="hover:text-white">UI Components</Link></li>
                <li><Link to="/docs/utils" className="hover:text-white">Utils</Link></li>
                <li><Link to="/docs/task-management" className="hover:text-white">Task Management</Link></li>
                <li><Link to="/docs/analytics" className="hover:text-white">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link to="/examples" className="hover:text-white">Examples</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/changelog" className="hover:text-white">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">GitHub</a></li>
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Discussions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Modular Genesis System. Built for educational purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
