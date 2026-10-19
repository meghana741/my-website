import React from 'react';
import { Link } from 'react-router-dom';
import {
  Recycle,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Heart,
  Globe2,
  CheckCircle2,
  Leaf
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#064e3b',
        color: '#e2e8f0',
        borderTop: '4px solid #10b981',
        paddingTop: '3.5rem',
        paddingBottom: '2rem',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#064e3b'
                }}
              >
                <Recycle size={24} strokeWidth={2.4} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.02em'
                }}
              >
                EcoCycle
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#a7f3d0', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Building a cleaner planet by diverting hazardous electronic waste from landfills through certified,
              scientific recycling, door-to-door electric vehicle pickups, and transparent tracking.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6ee7b7', fontSize: '0.82rem' }}>
              <ShieldCheck size={18} />
              <span>ISO 14001:2015 & R2 Certified Recycling</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '1.2rem', fontWeight: 700 }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <Link to="/" style={{ color: '#d1fae5', fontSize: '0.88rem' }}>
                  Home & E-Waste Guide
                </Link>
              </li>
              <li>
                <Link to="/schedule-pickup" style={{ color: '#d1fae5', fontSize: '0.88rem' }}>
                  Schedule Doorstep Pickup
                </Link>
              </li>
              <li>
                <Link to="/track" style={{ color: '#d1fae5', fontSize: '0.88rem' }}>
                  Track Request Status
                </Link>
              </li>
              <li>
                <Link to="/dashboard" style={{ color: '#d1fae5', fontSize: '0.88rem' }}>
                  Citizen Dashboard
                </Link>
              </li>
              <li>
                <Link to="/recycling" style={{ color: '#d1fae5', fontSize: '0.88rem' }}>
                  Recycling Hub & Facilities
                </Link>
              </li>
              <li>
                <Link to="/reports" style={{ color: '#d1fae5', fontSize: '0.88rem' }}>
                  Environmental Impact Reports
                </Link>
              </li>
              <li>
                <Link to="/admin" style={{ color: '#34d399', fontSize: '0.88rem', fontWeight: 600 }}>
                  Admin Operations Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Accepted Waste */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '1.2rem', fontWeight: 700 }}>
              Accepted Categories
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ fontSize: '0.85rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> Smartphones, Tablets & Mobiles
              </li>
              <li style={{ fontSize: '0.85rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> Laptops, Towers & Peripherals
              </li>
              <li style={{ fontSize: '0.85rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> Smart TVs, LED Displays & CRTs
              </li>
              <li style={{ fontSize: '0.85rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> Inverter & UPS Heavy Batteries
              </li>
              <li style={{ fontSize: '0.85rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> Copper Wires, Chargers & Adapters
              </li>
              <li style={{ fontSize: '0.85rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={14} color="#34d399" /> Home & Kitchen Appliances
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '1.2rem', fontWeight: 700 }}>
              Green Helpdesk
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#d1fae5' }}>
                <Phone size={16} style={{ marginTop: 3, flexShrink: 0, color: '#34d399' }} />
                <div>
                  <span style={{ display: 'block', fontWeight: 600 }}>1800-266-ECO (Toll Free)</span>
                  <span style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>Mon-Sat: 09:00 AM - 07:00 PM</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#d1fae5' }}>
                <Mail size={16} style={{ flexShrink: 0, color: '#34d399' }} />
                <span>support@ecocycle.org</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#d1fae5' }}>
                <MapPin size={16} style={{ marginTop: 3, flexShrink: 0, color: '#34d399' }} />
                <span>EcoCycle Zero-Waste Centre, Koramangala 4th Block, Bengaluru, 560034</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #047857',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8rem',
            color: '#a7f3d0'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} EcoCycle Technologies. All rights reserved. Registered E-Waste Handler.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>CPCB Guidelines</span>
            <span style={{ color: '#6ee7b7' }}>Zero-Landfill Pledge</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
