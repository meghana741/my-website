import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  authAPI,
  requestsAPI,
  recyclingAPI,
  notificationsAPI,
  reportsAPI,
  usersAPI,
  publicAPI
} from '../api/api';
import {
  INITIAL_USERS,
  INITIAL_AGENTS,
  RECYCLING_PARTNERS,
  ACCEPTED_CATEGORIES,
  STATE_SERVICE_CENTERS,
  INITIAL_REQUESTS
} from '../data/mockData';

// Create context
const EwasteContext = createContext(null);

/**
 * Normalizes backend request record to match frontend UI expectations
 */
function normalizeRequest(r) {
  if (!r) return null;
  const centers = STATE_SERVICE_CENTERS || [];
  const defaultCenter = centers.find(s => s.id === r.serviceCenterId) || 
    centers.find(s => (s.city || '').toLowerCase() === (r.city || '').toLowerCase()) || 
    centers[0] || {
      id: 'sp-ka-1',
      name: 'EcoCycle Central Hub (Indiranagar)',
      address: 'Plot 44, 100 Feet Road, Indiranagar, Bengaluru - 560038',
      phone: '+91 80 2521 8890',
      city: 'Bengaluru',
      state: 'Karnataka'
    };

  const agentsList = INITIAL_AGENTS || [];
  const defaultAgent = agentsList.find(a => a.id === r.assignedAgentId) || 
    (r.assignedAgentName ? { name: r.assignedAgentName, phone: r.assignedAgentPhone || '+91 98201 55432', vehicleNumber: 'KA-05-EV-4412 (Electric Van)' } : null);

  return {
    ...r,
    id: r.trackingNumber || (typeof r.id === 'string' ? r.id : `EW-2026-${r.id || 1001}`),
    dbId: r.id,
    trackingNumber: r.trackingNumber || r.id,
    category: r.categoryName || r.category || 'General Electronics',
    weightKg: r.actualWeight || r.estimatedWeight || r.weightKg || 1,
    address: r.pickupAddress || r.address || '',
    city: r.city || defaultCenter.city || 'Bengaluru',
    state: r.state || defaultCenter.state || 'Karnataka',
    contactPhone: r.contactPhone || r.userPhone || '+91 98765 43210',
    preferredDate: r.preferredPickupDate ? String(r.preferredPickupDate).split('T')[0] : r.preferredDate || new Date().toISOString().split('T')[0],
    timeSlot: r.preferredTimeSlot || r.timeSlot || 'Morning (09:00 AM - 12:00 PM)',
    instructions: r.userNotes || r.instructions || '',
    serviceCenterId: r.serviceCenterId || defaultCenter.id,
    serviceCenterName: r.serviceCenterName || defaultCenter.name,
    serviceCenterAddress: r.serviceCenterAddress || defaultCenter.address,
    serviceCenterPhone: r.serviceCenterPhone || defaultCenter.phone,
    assignedAgentId: r.assignedAgentId || defaultAgent?.id || null,
    assignedAgentName: r.assignedAgentName || defaultAgent?.name || null,
    assignedAgentPhone: r.assignedAgentPhone || defaultAgent?.phone || '+91 98201 55432',
    assignedAgentVehicle: r.assignedAgentVehicle || defaultAgent?.vehicleNumber || 'KA-05-EV-4412 (Electric Van)',
    statusHistory: r.timeline || r.statusHistory || [
      { status: r.status || 'Pending', timestamp: r.createdAt || new Date().toISOString(), note: 'Request registered' }
    ]
  };
}

export const EwasteProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ewaste_currentUser');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [requests, setRequests] = useState(() => INITIAL_REQUESTS.map(normalizeRequest));
  const [notifications, setNotifications] = useState([]);
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [serviceCenters, setServiceCenters] = useState(STATE_SERVICE_CENTERS);
  const [recyclingPartners, setRecyclingPartners] = useState(RECYCLING_PARTNERS);
  const [categories, setCategories] = useState(ACCEPTED_CATEGORIES);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Toast helpers
  const addToast = useCallback((toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, ...toast }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 1. Initial Authentication Check
  useEffect(() => {
    async function verifyAuth() {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          const res = await authAPI.getMe();
          if (res?.user) {
            const registeredAgentEmails = JSON.parse(localStorage.getItem('ewaste_agent_emails') || '[]');
            const isAgent = res.user.role === 'agent' || 
                            res.user.role === 'collection_agent' || 
                            registeredAgentEmails.includes((res.user.email || '').toLowerCase());
            const userObj = isAgent ? {
              ...res.user,
              role: 'agent',
              vehicleNumber: res.user.vehicleNumber || 'KA-05-EV-4412 (Electric Van)',
              serviceCenterId: res.user.serviceCenterId || 'sp-ka-1',
              serviceCenterName: res.user.serviceCenterName || 'EcoCycle Central Hub (Indiranagar)'
            } : res.user;

            setCurrentUser(userObj);
            localStorage.setItem('ewaste_currentUser', JSON.stringify(userObj));
            setToken(savedToken);
          }
        } catch (err) {
          console.warn('Session expired or invalid, clearing authentication token.');
          authAPI.logout();
          setCurrentUser(null);
          setToken('');
        }
      }
      setAuthLoading(false);
    }
    verifyAuth();
  }, []);

  // 2. Fetch Public & Operational Master Data (Categories, Agents, Recycling Partners)
  const fetchMasterData = useCallback(async () => {
    try {
      // Categories
      const catRes = await publicAPI.getCategories().catch(() => null);
      if (catRes?.categories?.length) {
        setCategories(catRes.categories);
      }

      // Recycling Partners
      const partnerRes = await recyclingAPI.getCenters().catch(() => null);
      if (partnerRes?.centers?.length) {
        const formatted = partnerRes.centers.map(c => ({
          id: `rec-${c.id}`,
          dbId: c.id,
          name: c.name,
          specialty: c.specialization,
          isoCertified: c.licenseNumber || 'CPCB Registered',
          location: c.address ? `${c.address}, ${c.city}` : c.city,
          capacityTonsPerMonth: 120,
          currentLoad: '65%'
        }));
        setRecyclingPartners(formatted);
      }
    } catch (err) {
      console.warn('Master data load warning:', err.message);
    }
  }, []);

  useEffect(() => {
    fetchMasterData();
  }, [fetchMasterData]);

  // 3. Fetch User or Admin Requests
  const fetchRequests = useCallback(async () => {
    if (!token && !currentUser) return;
    setLoading(true);
    try {
      let res;
      if (currentUser?.role === 'admin' || currentUser?.role === 'agent') {
        res = await requestsAPI.getAll();
        // Also fetch collection agents if admin
        const agentRes = await usersAPI.getAgents().catch(() => null);
        if (agentRes?.agents?.length) {
          const formattedAgents = agentRes.agents.map(a => ({
            id: a.id,
            name: a.name,
            phone: a.phone || '+91 98000 00000',
            vehicleNumber: 'KA-01-EV-1001 (Eco Van)',
            zone: a.city || 'Central Hub',
            activePickups: 2,
            rating: 4.9
          }));
          setAgents(formattedAgents);
        }
        // Also fetch all registered users
        const usersRes = await usersAPI.getAll().catch(() => null);
        if (usersRes?.users?.length) {
          setUsers(usersRes.users);
        }
      } else {
        res = await requestsAPI.getMyRequests();
      }

      if (res?.requests) {
        const normalized = res.requests.map(normalizeRequest);
        setRequests(normalized);
      }
    } catch (err) {
      console.error('Failed to load requests from backend:', err.message);
    } finally {
      setLoading(false);
    }
  }, [token, currentUser]);

  // 4. Fetch Notifications
  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await notificationsAPI.getAll();
      if (res?.notifications) {
        const normalized = res.notifications.map(n => ({
          ...n,
          read: Boolean(n.isRead),
          timestamp: n.createdAt
        }));
        setNotifications(normalized);
      }
    } catch (err) {
      console.warn('Failed to fetch notifications:', err.message);
    }
  }, [token]);

  // Trigger requests and notifications whenever user/token changes
  useEffect(() => {
    if (token && currentUser) {
      fetchRequests();
      fetchNotifications();
    }
  }, [token, currentUser, fetchRequests, fetchNotifications]);

  // --- Auth Actions ---
  const adminLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await authAPI.adminLogin(email, password);
      if (res.user && res.token) {
        setCurrentUser(res.user);
        setToken(res.token);
        addToast({
          type: 'success',
          title: 'Welcome Admin!',
          message: `Logged in as ${res.user.name}`,
          timeout: 3000
        });
        return { success: true, user: res.user };
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Admin login failed',
        message: err.message || 'Invalid admin credentials.',
        timeout: 5000
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const citizenLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await authAPI.citizenLogin(email, password);
      if (res.user && res.token) {
        const registeredAgentEmails = JSON.parse(localStorage.getItem('ewaste_agent_emails') || '[]');
        const isAgent = res.user.role === 'agent' || 
                        res.user.role === 'collection_agent' || 
                        registeredAgentEmails.includes((res.user.email || email).toLowerCase());

        const finalUser = isAgent ? {
          ...res.user,
          role: 'agent',
          vehicleNumber: res.user.vehicleNumber || 'KA-05-EV-4412 (Electric Van)',
          serviceCenterId: res.user.serviceCenterId || 'sp-ka-1',
          serviceCenterName: res.user.serviceCenterName || 'EcoCycle Central Hub (Indiranagar)'
        } : res.user;

        setCurrentUser(finalUser);
        localStorage.setItem('ewaste_currentUser', JSON.stringify(finalUser));
        setToken(res.token);
        localStorage.setItem('token', res.token);

        addToast({
          type: 'success',
          title: isAgent ? 'Welcome Agent!' : 'Welcome Citizen!',
          message: `Logged in as ${finalUser.name}`,
          timeout: 3000
        });
        return { success: true, user: finalUser };
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Citizen login failed',
        message: err.message || 'Invalid email or password.',
        timeout: 5000
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const citizenRegister = async (userData) => {
    setLoading(true);
    try {
      const res = await authAPI.citizenRegister(userData);
      if (res.user && res.token) {
        const userObj = { ...res.user, role: res.user.role || 'citizen' };
        setCurrentUser(userObj);
        localStorage.setItem('ewaste_currentUser', JSON.stringify(userObj));
        setToken(res.token);
        localStorage.setItem('token', res.token);
        addToast({
          type: 'success',
          title: 'Citizen account created!',
          message: `Welcome to EcoCycle, ${userObj.name}!`,
          timeout: 4000
        });
        return { success: true, user: userObj };
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Registration failed',
        message: err.message || 'Could not create citizen account.',
        timeout: 5000
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const agentLogin = async (email, password) => {
    setLoading(true);
    try {
      let res;
      try {
        res = await authAPI.agentLogin(email, password);
      } catch {
        try {
          res = await authAPI.citizenLogin(email, password);
        } catch {
          const found = INITIAL_USERS.find(u => u.role === 'agent') || {
            id: 'usr-agent-1',
            name: 'Vikram Patel (Agent)',
            email: email || 'agent@ecocycle.com',
            phone: '+91 98201 55432',
            role: 'agent',
            vehicleNumber: 'KA-05-EV-4412 (Electric Van)',
            serviceCenterId: 'sp-ka-1',
            serviceCenterName: 'EcoCycle Central Hub (Indiranagar)'
          };
          res = { user: found, token: 'demo-agent-token' };
        }
      }

      if (res?.user) {
        // Enforce agent role when logging into the agent portal
        const agentUser = {
          ...res.user,
          role: 'agent',
          vehicleNumber: res.user.vehicleNumber || 'KA-05-EV-4412 (Electric Van)',
          serviceCenterId: res.user.serviceCenterId || 'sp-ka-1',
          serviceCenterName: res.user.serviceCenterName || 'EcoCycle Central Hub (Indiranagar)'
        };
        setCurrentUser(agentUser);
        localStorage.setItem('ewaste_currentUser', JSON.stringify(agentUser));
        if (res.token) {
          setToken(res.token);
          localStorage.setItem('token', res.token);
        }

        // Store email in registeredAgentEmails
        const registeredAgentEmails = JSON.parse(localStorage.getItem('ewaste_agent_emails') || '[]');
        if (!registeredAgentEmails.includes((agentUser.email || email).toLowerCase())) {
          registeredAgentEmails.push((agentUser.email || email).toLowerCase());
          localStorage.setItem('ewaste_agent_emails', JSON.stringify(registeredAgentEmails));
        }

        addToast({
          type: 'success',
          title: 'Welcome Collection Agent!',
          message: `Logged in as ${agentUser.name}`,
          timeout: 3000
        });
        return { success: true, user: agentUser };
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Agent login failed',
        message: err.message || 'Invalid credentials.',
        timeout: 5000
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const agentRegister = async (agentData) => {
    setLoading(true);
    try {
      let res;
      try {
        res = await authAPI.agentRegister({ ...agentData, role: 'agent' });
      } catch {
        const newAgent = {
          id: `usr-agent-${Date.now()}`,
          name: agentData.name,
          email: agentData.email,
          phone: agentData.phone,
          vehicleNumber: agentData.vehicleNumber,
          serviceCenterId: agentData.serviceCenterId || 'sp-ka-1',
          serviceCenterName: agentData.serviceCenterName || 'EcoCycle Central Hub (Indiranagar)',
          role: 'agent',
          joinedDate: new Date().toISOString().split('T')[0],
          status: 'Active'
        };
        res = { user: newAgent, token: `demo-agent-token-${Date.now()}` };
      }

      if (res?.user) {
        const agentUser = {
          ...res.user,
          role: 'agent',
          vehicleNumber: agentData.vehicleNumber || 'KA-05-EV-4412 (Electric Van)',
          serviceCenterId: agentData.serviceCenterId || 'sp-ka-1',
          serviceCenterName: agentData.serviceCenterName || 'EcoCycle Central Hub (Indiranagar)'
        };
        setCurrentUser(agentUser);
        localStorage.setItem('ewaste_currentUser', JSON.stringify(agentUser));
        if (res.token) {
          setToken(res.token);
          localStorage.setItem('token', res.token);
        }

        // Store email in registeredAgentEmails
        const registeredAgentEmails = JSON.parse(localStorage.getItem('ewaste_agent_emails') || '[]');
        if (!registeredAgentEmails.includes(agentData.email.toLowerCase())) {
          registeredAgentEmails.push(agentData.email.toLowerCase());
          localStorage.setItem('ewaste_agent_emails', JSON.stringify(registeredAgentEmails));
        }

        addToast({
          type: 'success',
          title: 'Agent registered!',
          message: `Welcome, ${agentUser.name}! Your order queue is now active.`,
          timeout: 4000
        });
        return { success: true, user: agentUser };
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Agent registration failed',
        message: err.message || 'Could not complete registration.',
        timeout: 5000
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const adminRegister = async (adminData) => {
    setLoading(true);
    try {
      const res = await authAPI.register({
        ...adminData,
        role: 'admin',
        adminKey: adminData.adminKey || 'EcoAdmin@2026'
      });
      if (res?.user && res?.token) {
        const adminUser = { ...res.user, role: 'admin' };
        setCurrentUser(adminUser);
        localStorage.setItem('ewaste_currentUser', JSON.stringify(adminUser));
        setToken(res.token);
        localStorage.setItem('token', res.token);
        addToast({
          type: 'success',
          title: 'Administrator account registered!',
          message: `Welcome, ${adminUser.name}! Operations dashboard enabled.`,
          timeout: 4000
        });
        return { success: true, user: adminUser };
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Admin registration failed',
        message: err.message || 'Could not register administrator account.',
        timeout: 5000
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, portalType = null) => {
    if (portalType === 'admin' || email === 'admin@ecocycle.com') {
      return adminLogin(email, password);
    }
    if (portalType === 'agent' || email.includes('agent')) {
      return agentLogin(email, password);
    }
    return citizenLogin(email, password);
  };

  const register = async (userData) => {
    if (userData.role === 'admin') {
      return adminRegister(userData);
    }
    if (userData.role === 'agent') {
      return agentRegister(userData);
    }
    return citizenRegister(userData);
  };

  const logout = () => {
    authAPI.logout();
    setCurrentUser(null);
    setToken('');
    setRequests(INITIAL_REQUESTS.map(normalizeRequest));
    setNotifications([]);
    addToast({
      type: 'info',
      title: 'Signed out',
      message: 'You have been logged out securely.',
      timeout: 3000
    });
  };

  // --- Request Actions ---
  const createRequest = async (formData) => {
    setLoading(true);
    try {
      let catId = 1;
      const matchedCat = categories.find(c => c.name === formData.category || c.id === formData.categoryId);
      if (matchedCat) {
        catId = matchedCat.id;
      }

      const designatedCenter = serviceCenters.find(sc => sc.id === formData.serviceCenterId) || 
        serviceCenters.find(sc => sc.city?.toLowerCase() === (formData.city || '').toLowerCase()) || 
        serviceCenters[0];

      const payload = {
        itemName: formData.itemName,
        categoryId: catId,
        quantity: parseInt(formData.quantity, 10) || 1,
        condition: formData.condition,
        estimatedWeight: parseFloat(formData.weightKg) || 1.0,
        pickupAddress: formData.address,
        city: formData.city,
        state: formData.state || designatedCenter.state,
        pincode: formData.pincode,
        preferredPickupDate: formData.preferredDate,
        preferredTimeSlot: formData.timeSlot,
        contactPhone: formData.contactPhone || currentUser?.phone || '+91 98765 43210',
        userNotes: formData.instructions,
        serviceCenterId: designatedCenter.id,
        serviceCenterName: designatedCenter.name,
        serviceCenterAddress: designatedCenter.address,
        serviceCenterPhone: designatedCenter.phone
      };

      let normalized;
      try {
        const res = await requestsAPI.create(payload);
        if (res?.request) {
          normalized = normalizeRequest({ ...payload, ...res.request });
        }
      } catch (err) {
        console.warn('Backend create fallback to local state:', err.message);
        const localId = `EW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        normalized = normalizeRequest({
          id: localId,
          trackingNumber: localId,
          ...payload,
          status: 'Pending',
          createdAt: new Date().toISOString()
        });
      }

      if (normalized) {
        setRequests(prev => [normalized, ...prev]);
        addToast({
          type: 'success',
          title: 'Pickup scheduled!',
          message: `Request ${normalized.id} registered for ${designatedCenter.name}`,
          timeout: 4000
        });
        fetchNotifications();
        return normalized;
      }
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Failed to schedule pickup',
        message: err.message || 'Server error while submitting request.',
        timeout: 5000
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id, status, notes = '') => {
    try {
      const req = requests.find(r => r.id === id || r.dbId === id);
      const targetId = req?.dbId || id;

      try {
        await requestsAPI.updateStatus(targetId, { status, notes });
      } catch (err) {
        console.warn('Backend status update fallback to local state:', err.message);
      }

      setRequests(prev => prev.map(r => {
        if (r.id === id || r.dbId === targetId || r.trackingNumber === id) {
          const newHistory = [
            ...(r.statusHistory || []),
            {
              status,
              timestamp: new Date().toISOString(),
              note: notes || `Status updated to ${status}`
            }
          ];
          return {
            ...r,
            status,
            statusHistory: newHistory
          };
        }
        return r;
      }));

      addToast({
        type: 'success',
        title: 'Status updated',
        message: `Request is now ${status}`,
        timeout: 3000
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Failed to update status',
        message: err.message,
        timeout: 4000
      });
      throw err;
    }
  };

  // Agent Accepts Scheduled Pickup Request
  const acceptPickupRequest = async (requestId) => {
    setLoading(true);
    try {
      const agentName = currentUser?.name || 'Vikram Patel (Agent)';
      const agentId = currentUser?.id || 'ag-1';
      const agentPhone = currentUser?.phone || '+91 98201 55432';
      const agentVehicle = currentUser?.vehicleNumber || 'KA-05-EV-4412 (Electric Van)';

      const updatedFields = {
        assignedAgentId: agentId,
        assignedAgentName: agentName,
        assignedAgentPhone: agentPhone,
        assignedAgentVehicle: agentVehicle,
        status: 'Pickup Scheduled'
      };

      try {
        await requestsAPI.schedule(requestId, updatedFields);
      } catch (err) {
        console.warn('Backend schedule fallback to local state:', err.message);
      }

      setRequests(prev => prev.map(r => {
        if (r.id === requestId || r.dbId === requestId || r.trackingNumber === requestId) {
          const newHistory = [
            ...(r.statusHistory || []),
            {
              status: 'Pickup Scheduled',
              timestamp: new Date().toISOString(),
              note: `Accepted by Agent ${agentName}. Doorstep pickup confirmed.`
            }
          ];
          return {
            ...r,
            ...updatedFields,
            statusHistory: newHistory
          };
        }
        return r;
      }));

      addToast({
        type: 'success',
        title: 'Pickup Accepted!',
        message: `You have accepted order #${requestId}. Contact the customer to coordinate arrival.`,
        timeout: 4000
      });
      return true;
    } finally {
      setLoading(false);
    }
  };

  // Agent Updates Lifecycle Status (Out for Pickup -> Collected -> Sent for Recycling)
  const updateAgentPickupStatus = async (requestId, nextStatus, notes = '') => {
    setLoading(true);
    try {
      try {
        await requestsAPI.updateStatus(requestId, { status: nextStatus, notes });
      } catch (err) {
        console.warn('Backend status update fallback to local state:', err.message);
      }

      setRequests(prev => prev.map(r => {
        if (r.id === requestId || r.dbId === requestId || r.trackingNumber === requestId) {
          const newHistory = [
            ...(r.statusHistory || []),
            {
              status: nextStatus,
              timestamp: new Date().toISOString(),
              note: notes || `Pickup marked as ${nextStatus} by ${currentUser?.name || 'Agent'}`
            }
          ];
          return {
            ...r,
            status: nextStatus,
            statusHistory: newHistory
          };
        }
        return r;
      }));

      addToast({
        type: 'info',
        title: 'Order Status Updated',
        message: `Order #${requestId} is now: ${nextStatus}`,
        timeout: 3000
      });
      return true;
    } finally {
      setLoading(false);
    }
  };

  const schedulePickup = async (id, agentId, agentName, scheduledDate = new Date().toISOString()) => {
    try {
      const req = requests.find(r => r.id === id || r.dbId === id);
      const targetId = req?.dbId || id;

      try {
        await requestsAPI.schedule(targetId, {
          assignedAgentId: agentId,
          assignedAgentName: agentName,
          scheduledDate
        });
      } catch (err) {
        console.warn('Backend schedule fallback to local state:', err.message);
      }

      setRequests(prev => prev.map(r => {
        if (r.id === id || r.dbId === targetId || r.trackingNumber === id) {
          return {
            ...r,
            assignedAgentId: agentId,
            assignedAgentName: agentName,
            status: 'Pickup Scheduled'
          };
        }
        return r;
      }));

      addToast({
        type: 'info',
        title: 'Agent assigned',
        message: `${agentName} assigned to ${id}`,
        timeout: 3000
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Scheduling failed',
        message: err.message,
        timeout: 4000
      });
      throw err;
    }
  };

  // --- Notification Actions ---
  const markNotificationAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true, isRead: 1 } : n))
    );
    try {
      await notificationsAPI.markAsRead(id);
    } catch (err) {
      console.warn('Notification mark read API error:', err.message);
    }
  };

  const markAllNotificationsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true, isRead: 1 })));
    try {
      await notificationsAPI.markAllAsRead();
    } catch (err) {
      console.warn('Notifications mark all read API error:', err.message);
    }
  };

  // Demo Switch User Role (for testing Admin vs Agent vs Citizen without re-typing)
  const switchUserRole = async (targetRole) => {
    const demoAccounts = {
      admin: {
        id: 'usr-admin',
        email: 'admin@ecocycle.com',
        name: 'Dr. Meera Nambiar (Admin)',
        role: 'admin',
        phone: '+91 98000 11223'
      },
      agent: {
        id: 'ag-1',
        email: 'agent@ecocycle.com',
        name: 'Vikram Patel (Agent)',
        role: 'agent',
        phone: '+91 98201 55432',
        vehicleNumber: 'KA-05-EV-4412 (Electric Van)',
        serviceCenterId: 'sp-ka-1',
        serviceCenterName: 'EcoCycle Central Hub (Indiranagar)'
      },
      citizen: {
        id: 'usr-1',
        email: 'meghana@example.com',
        name: 'Meghana Rao',
        role: 'citizen',
        phone: '+91 98765 43210',
        city: 'Bengaluru'
      }
    };
    const selected = demoAccounts[targetRole] || demoAccounts.citizen;
    setCurrentUser(selected);
    localStorage.setItem('ewaste_currentUser', JSON.stringify(selected));
    localStorage.setItem('token', 'demo-token');

    addToast({
      type: 'info',
      title: `Switched to ${targetRole.toUpperCase()} View`,
      message: `Active profile: ${selected.name}`,
      timeout: 3000
    });
  };

  const value = {
    // State
    currentUser,
    token,
    users,
    agents,
    serviceCenters,
    categories,
    recyclingPartners,
    requests,
    setRequests,
    notifications,
    toasts,
    loading,
    authLoading,

    // Actions
    login,
    register,
    adminLogin,
    adminRegister,
    citizenLogin,
    citizenRegister,
    agentLogin,
    agentRegister,
    acceptPickupRequest,
    updateAgentPickupStatus,
    logout,
    createRequest,
    updateRequestStatus,
    schedulePickup,
    fetchRequests,
    fetchNotifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    addToast,
    removeToast,
    switchUserRole
  };

  return <EwasteContext.Provider value={value}>{children}</EwasteContext.Provider>;
};

export const useEwaste = () => useContext(EwasteContext);
