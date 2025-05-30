
import React from 'react';
import { cn } from '../utils';

export interface NotificationProps {
  title: string;
  message?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  className?: string;
}

const Notification: React.FC<NotificationProps> = ({
  title,
  message,
  type = 'info',
  onClose,
  className
}) => {
  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  return (
    <div className={cn(
      "p-4 rounded-lg border flex items-start justify-between",
      variants[type],
      className
    )}>
      <div>
        <h4 className="font-medium">{title}</h4>
        {message && <p className="text-sm mt-1">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current hover:opacity-70 ml-4"
        >
          ×
        </button>
      )}
    </div>
  );
};

export { Notification };
