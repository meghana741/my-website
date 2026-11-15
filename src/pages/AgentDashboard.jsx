import React, { useState } from 'react';
import { useEwaste } from '../context/EwasteContext';
import { Link } from 'react-router-dom';
import {
  Truck,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Package,
  CheckCircle2,
  AlertCircle,
  Navigation,
  ArrowRight,
  ShieldCheck,
  User,
  ExternalLink,
  ChevronRight,
  Loader2,
  RefreshCw
} from 'lucide-react';

const AgentDashboard = () => {
  const {
    currentUser,
    requests,
    acceptPickupRequest,
    updateAgentPickupStatus,
    serviceCenters,
    loading
  } = useEwaste();

  const [activeTab, setActiveTab] = useState('assigned'); // 'assigned', 'active', 'completed'
  const [processingId, setProcessingId] = useState(null);

  // Fallback agent info if not logged in
  const agentName = currentUser?.name || 'Vikram Patel (Agent)';
  const vehicleNumber = currentUser?.vehicleNumber || 'KA-05-EV-4412 (Electric Van)';
  const serviceCenter = serviceCenters.find((sc) => sc.id === currentUser?.serviceCenterId) || serviceCenters[0];

  // Filter requests
  // Available / Assigned to agent or waiting in the hub
  const assignedOrders = requests.filter(
    (r) => r.status === 'Pending' || r.status === 'Approved' || (r.status === 'Pickup Scheduled' && !r.assignedAgentId)
  );

  // Active orders accepted by this agent or currently in progress
  const activeOrders = requests.filter(
    (r) =>
      (r.status === 'Pickup Scheduled' && r.assignedAgentId) ||
      r.status === 'Out for Pickup' ||
      r.status === 'Collected'
  );

  // Completed deliveries
  const completedOrders = requests.filter(
    (r) => r.status === 'Sent for Recycling' || r.status === 'Recycling Completed'
  );

  const displayedOrders =
    activeTab === 'assigned' ? assignedOrders : activeTab === 'active' ? activeOrders : completedOrders;

  const handleAccept = async (requestId) => {
    setProcessingId(requestId);
    try {
      await acceptPickupRequest(requestId);
      setActiveTab('active');
    } finally {
      setProcessingId(null);
    }
  };

  const handleStatusChange = async (requestId, nextStatus, note) => {
    setProcessingId(requestId);
    try {
      await updateAgentPickupStatus(requestId, nextStatus, note);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      
      {/* Top Banner / Agent Profile */}
      <div
        className="card"
        style={{
          padding: '1.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 24px rgba(2, 132, 199, 0.25)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <Truck size={30} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'white' }}>
                  {agentName}
                </h1>
                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    padding: '0.15rem 0.6rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  Verified Agent
                </span>
              </div>
              <div style={{ fontSize: '0.86rem', opacity: 0.95, marginTop: '0.2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span>🚐 <strong>Vehicle:</strong> {vehicleNumber}</span>
                <span>🏭 <strong>Base Hub:</strong> {serviceCenter?.name}</span>
                <span>📞 <strong>Hub Phone:</strong> {serviceCenter?.phone}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link
              to="/schedule-pickup"
              className="btn"
              style={{ backgroundColor: 'white', color: '#0369a1', fontWeight: 700, fontSize: '0.85rem' }}
            >
              + New Pickup Order
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Available / Queued
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-title)' }}>
            {assignedOrders.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Orders awaiting pickup acceptance</div>
        </div>

        <div className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0284c7', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            In Progress / En Route
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0284c7' }}>
            {activeOrders.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Accepted tasks for collection</div>
        </div>

        <div className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Completed & Deposited
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>
            {completedOrders.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Handed over to Service Centers</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '2px solid var(--color-border)',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        <button
          onClick={() => setActiveTab('assigned')}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            borderBottom: activeTab === 'assigned' ? '3px solid #0284c7' : '3px solid transparent',
            background: 'none',
            fontWeight: activeTab === 'assigned' ? 800 : 600,
            color: activeTab === 'assigned' ? '#0284c7' : 'var(--color-text-muted)',
            cursor: 'pointer',
            fontSize: '0.92rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <Package size={17} /> Available Pickup Orders ({assignedOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('active')}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            borderBottom: activeTab === 'active' ? '3px solid #0284c7' : '3px solid transparent',
            background: 'none',
            fontWeight: activeTab === 'active' ? 800 : 600,
            color: activeTab === 'active' ? '#0284c7' : 'var(--color-text-muted)',
            cursor: 'pointer',
            fontSize: '0.92rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <Truck size={17} /> My Active Pickups ({activeOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            borderBottom: activeTab === 'completed' ? '3px solid #10b981' : '3px solid transparent',
            background: 'none',
            fontWeight: activeTab === 'completed' ? 800 : 600,
            color: activeTab === 'completed' ? '#10b981' : 'var(--color-text-muted)',
            cursor: 'pointer',
            fontSize: '0.92rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem'
          }}
        >
          <CheckCircle2 size={17} /> Completed Runs ({completedOrders.length})
        </button>
      </div>

      {/* Orders List */}
      {displayedOrders.length === 0 ? (
        <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <Package size={48} style={{ color: '#94a3b8', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-title)' }}>
            No orders found in this tab
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
            {activeTab === 'assigned'
              ? 'All incoming pickup orders have been claimed by agents.'
              : activeTab === 'active'
              ? 'You have no active pickups in transit. Claim an order from the Available tab.'
              : 'You have not completed any deliveries in this session yet.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {displayedOrders.map((order) => {
            const customerPhone = order.contactPhone || order.userPhone || '+91 98765 43210';
            const center =
              serviceCenters.find((sc) => sc.id === order.serviceCenterId) ||
              serviceCenters[0];

            return (
              <div
                key={order.id}
                className="card"
                style={{
                  padding: '1.5rem',
                  border: order.status === 'Out for Pickup' ? '2px solid #0284c7' : '1px solid var(--color-border)',
                  boxShadow: order.status === 'Out for Pickup' ? '0 4px 16px rgba(2, 132, 199, 0.12)' : 'none'
                }}
              >
                {/* Order Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-text-title)' }}>
                        {order.trackingNumber || order.id}
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px',
                          fontWeight: 700,
                          backgroundColor:
                            order.status === 'Collected'
                              ? '#dbeafe'
                              : order.status === 'Out for Pickup'
                              ? '#e0f2fe'
                              : order.status === 'Pickup Scheduled'
                              ? '#dcfce7'
                              : '#fef3c7',
                          color:
                            order.status === 'Collected'
                              ? '#1e40af'
                              : order.status === 'Out for Pickup'
                              ? '#0284c7'
                              : order.status === 'Pickup Scheduled'
                              ? '#15803d'
                              : '#b45309'
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-body)', marginTop: '0.2rem' }}>
                      {order.itemName} ({order.category})
                    </div>
                  </div>

                  {/* Direct Citizen Call Button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <a
                      href={`tel:${customerPhone}`}
                      className="btn"
                      style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        textDecoration: 'none',
                        padding: '0.55rem 0.95rem'
                      }}
                      title="Direct call to citizen's contact phone number"
                    >
                      <Phone size={16} /> Call Citizen ({customerPhone})
                    </a>

                    <Link
                      to={`/track?id=${order.id}`}
                      className="btn btn-outline"
                      style={{ padding: '0.55rem 0.8rem', fontSize: '0.82rem' }}
                      title="Open citizen tracking view"
                    >
                      <ExternalLink size={15} /> Track
                    </Link>
                  </div>
                </div>

                {/* Details Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    marginBottom: '1.25rem'
                  }}
                >
                  {/* Customer & Location */}
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-title)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <User size={15} /> Citizen Contact
                    </div>
                    <div><strong>Name:</strong> {order.userName || 'Citizen Requester'}</div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.3rem', marginTop: '0.2rem' }}>
                      <MapPin size={14} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
                      <span>{order.address || order.pickupAddress}, {order.city} - {order.pincode}</span>
                    </div>
                  </div>

                  {/* Schedule Slot */}
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-title)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={15} /> Pickup Window
                    </div>
                    <div><strong>Date:</strong> {order.preferredDate || 'Immediate'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                      <Clock size={14} style={{ color: '#0284c7' }} />
                      <span>{order.timeSlot || 'Morning Slot'}</span>
                    </div>
                  </div>

                  {/* Item Specs & Notes */}
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-title)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Package size={15} /> Waste Details
                    </div>
                    <div><strong>Approx Weight:</strong> {order.weightKg} kg</div>
                    <div><strong>Condition:</strong> {order.condition || 'Scrap'}</div>
                    {order.instructions && (
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem', fontStyle: 'italic' }}>
                        "{order.instructions}"
                      </div>
                    )}
                  </div>

                  {/* Destination Service Center */}
                  <div>
                    <div style={{ fontWeight: 700, color: '#0369a1', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Building2 size={15} /> Designated Service Hub
                    </div>
                    <div style={{ fontWeight: 600 }}>{order.serviceCenterName || center.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {order.serviceCenterAddress || center.address}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#0284c7', marginTop: '0.2rem' }}>
                      Hub Phone: {order.serviceCenterPhone || center.phone}
                    </div>
                  </div>
                </div>

                {/* Workflow Action Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    {order.assignedAgentName
                      ? `Assigned: ${order.assignedAgentName} (${order.assignedAgentVehicle || vehicleNumber})`
                      : 'Unassigned — Click Accept Pickup to claim'}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {/* State: Pending / Approved / Unclaimed -> Accept */}
                    {(order.status === 'Pending' || order.status === 'Approved' || (order.status === 'Pickup Scheduled' && !order.assignedAgentId)) && (
                      <button
                        onClick={() => handleAccept(order.id)}
                        disabled={processingId === order.id}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.1rem' }}
                      >
                        {processingId === order.id ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Accepting...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={16} /> Accept Pickup Request
                          </>
                        )}
                      </button>
                    )}

                    {/* State: Pickup Scheduled -> Start Trip */}
                    {order.status === 'Pickup Scheduled' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'Out for Pickup', 'Agent en route to doorstep')}
                        disabled={processingId === order.id}
                        className="btn"
                        style={{
                          backgroundColor: '#0284c7',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.55rem 1.1rem',
                          fontWeight: 700
                        }}
                      >
                        {processingId === order.id ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Updating...
                          </>
                        ) : (
                          <>
                            <Navigation size={16} /> Start Trip (Out for Pickup)
                          </>
                        )}
                      </button>
                    )}

                    {/* State: Out for Pickup -> Complete Collection */}
                    {order.status === 'Out for Pickup' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'Collected', 'Items inspected, weighed and loaded into vehicle')}
                        disabled={processingId === order.id}
                        className="btn"
                        style={{
                          backgroundColor: '#059669',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.55rem 1.1rem',
                          fontWeight: 700
                        }}
                      >
                        {processingId === order.id ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Updating...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={16} /> Confirm Doorstep Collection
                          </>
                        )}
                      </button>
                    )}

                    {/* State: Collected -> Deliver to Service Center */}
                    {order.status === 'Collected' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'Sent for Recycling', `Deposited safely at ${order.serviceCenterName || center.name}`)}
                        disabled={processingId === order.id}
                        className="btn"
                        style={{
                          backgroundColor: '#4338ca',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.55rem 1.1rem',
                          fontWeight: 700
                        }}
                      >
                        {processingId === order.id ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Depositing...
                          </>
                        ) : (
                          <>
                            <Building2 size={16} /> Deliver to Service Hub
                          </>
                        )}
                      </button>
                    )}

                    {order.status === 'Sent for Recycling' && (
                      <span style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <CheckCircle2 size={16} /> Delivered to Service Hub
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
