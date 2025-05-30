
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/tasks', label: 'Tasks', icon: '✅' },
    { path: '/analytics', label: 'Analytics', icon: '📊' }
  ];

  return (
    <nav className="bg-background border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Task Analytics System</h1>
        
        <div className="flex space-x-6">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
