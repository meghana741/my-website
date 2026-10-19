import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useEwaste } from '../../context/EwasteContext';

// Toast container renders a stack of toast messages.
// Each toast has an id, type (info, success, error, warning), message, and optional timeout.
export const ToastContainer = () => {
  const { toasts, removeToast } = useEwaste();

  // Auto-remove toast after its timeout if specified
  useEffect(() => {
    const timers = toasts.map(toast => {
      if (toast.timeout) {
        return setTimeout(() => removeToast(toast.id), toast.timeout);
      }
      return null;
    });
    return () => {
      timers.forEach(t => t && clearTimeout(t));
    };
  }, [toasts, removeToast]);

  if (!toasts || toasts.length === 0) return null;

  const typeColors = {
    info: 'bg-primary-light text-white',
    success: 'bg-primary-dark text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-600 text-white',
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg flex items-start justify-between ${typeColors[toast.type] || typeColors.info} `}
        >
          <div className="flex-1 mr-2">
            <p className="font-medium">{toast.title}</p>
            {toast.message && <p className="text-sm opacity-90">{toast.message}</p>}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 hover:opacity-80"
            aria-label="Close toast"
          >
            <X size={18} className="stroke-current" />
          </button>
        </div>
      ))}
    </div>
  );
};
