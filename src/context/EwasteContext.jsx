import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_AGENTS,
  RECYCLING_PARTNERS,
  INITIAL_REQUESTS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

// Create context
const EwasteContext = createContext(null);

export const EwasteProvider = ({ children }) => {
  // Load persisted state or fallback to initial data
  const [users] = useState(() => {
    const saved = localStorage.getItem('ewaste_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  const [agents] = useState(() => {
    const saved = localStorage.getItem('ewaste_agents');
    return saved ? JSON.parse(saved) : INITIAL_AGENTS;
  });
  const [recyclingPartners] = useState(() => {
    const saved = localStorage.getItem('ewaste_partners');
    return saved ? JSON.parse(saved) : RECYCLING_PARTNERS;
  });
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('ewaste_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('ewaste_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });
  const [toasts, setToasts] = useState([]);

  // Current user – start with first citizen for demo
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ewaste_currentUser');
    if (saved) return JSON.parse(saved);
    // Default to first citizen user
    const citizen = users.find((u) => u.role === 'citizen') || users[0];
    localStorage.setItem('ewaste_currentUser', JSON.stringify(citizen));
    return citizen;
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem('ewaste_users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('ewaste_agents', JSON.stringify(agents));
  }, [agents]);
  useEffect(() => {
    localStorage.setItem('ewaste_partners', JSON.stringify(recyclingPartners));
  }, [recyclingPartners]);
  useEffect(() => {
    localStorage.setItem('ewaste_requests', JSON.stringify(requests));
  }, [requests]);
  useEffect(() => {
    localStorage.setItem('ewaste_notifications', JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem('ewaste_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  // Toast helpers
  const addToast = (toast) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, ...toast }]);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Notification helpers
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Auth helpers
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ewaste_currentUser');
  };
  const switchUserRole = (role) => {
    // Simple demo switch: pick first user with requested role
    const user = users.find((u) => u.role === role) || users[0];
    setCurrentUser(user);
    localStorage.setItem('ewaste_currentUser', JSON.stringify(user));
  };

  const value = {
    users,
    agents,
    recyclingPartners,
    requests,
    setRequests,
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    toasts,
    addToast,
    removeToast,
    currentUser,
    setCurrentUser,
    logout,
    switchUserRole,
  };

  return <EwasteContext.Provider value={value}>{children}</EwasteContext.Provider>;
};

export const useEwaste = () => useContext(EwasteContext);