import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEwaste } from '../context/EwasteContext';
import { ACCEPTED_CATEGORIES, MONTHLY_STATS } from '../data/mockData';
import {
  CalendarPlus, Search, Recycle, Leaf, ShieldCheck, Truck,
  Award, Clock, Package, Smartphone, Laptop, Tv, BatteryCharging,
  Cable, Headphones, Printer, RefrigeratorIcon, ChevronRight, Globe2,
  TrendingUp, Users, CheckCircle2
} from 'lucide-react';

const CATEGORY_ICONS = {
  Smartphone, Laptop, Tv, BatteryCharging, Cable, Headphones, Printer,
  Refrigerator: RefrigeratorIcon || Package,
};

// Animated counter hook
const useCounter = (target, duration = 2000, start = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
};

const Home = () => {
  const { requests } = useEwaste();
  const [statsStarted, setStatsStarted] = useState(false);

  const totalCollectedKg = MONTHLY_STATS.reduce((s, m) => s + m.collectedKg, 0);
  const totalCO2 = MONTHLY_STATS.reduce((s, m) => s + m.co2SavedKg, 0);

  const citizenCount = useCounter(14800, 1800, statsStarted);
  const kgCount = useCounter(Math.round(totalCollectedKg / 100), 2000, statsStarted);
  const co2Count = useCounter(Math.round(totalCO2 / 1000), 2000, statsStarted);
  const requestsCount = useCounter(requests.length + 1036, 1500, statsStarted);

  useEffect(() => {
    const timer = setTimeout(() => setStatsStarted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    { icon: <CalendarPlus size={28} />, title: 'Schedule Pickup', desc: 'Book a doorstep collection at your preferred date and time slot.' },
    { icon: <Truck size={28} />, title: 'Agent Collects', desc: 'Our certified EV-fleet agent arrives and safely collects your e-waste.' },
    { icon: <Recycle size={28} />, title: 'Certified Recycling', desc: 'Items are processed at ISO 14001 certified partner facilities.' },
    { icon: <Award size={28} />, title: 'Get Certificate', desc: 'Receive a verified recycling certificate and earn eco-points.' },
  ];

  const impacts = [
    { icon: <Globe2 size={22} />, label: 'Zero-Landfill Pledge', desc: 'All collected e-waste is diverted from landfills through certified processing.' },
    { icon: <Leaf size={22} />, label: 'Carbon Footprint Reduction', desc: 'Responsible recycling reduces CO₂ emissions vs. new material mining.' },
    { icon: <ShieldCheck size={22} />, label: 'Hazardous Materials Safety', desc: 'Lead, mercury, and cadmium are safely neutralized by licensed handlers.' },
    { icon: <TrendingUp size={22} />, label: 'Circular Economy', desc: 'Recovered metals re-enter manufacturing, reducing raw resource demand.' },
  ];

  return (
    <div style={{ padding: '0', overflowX: 'hidden' }}>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%)',
        color: 'white', padding: '5rem 1rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '360px', height: '360px', borderRadius: '50%', backgroundColor: 'rgba(52,211,153,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '240px', height: '240px', borderRadius: '50%', backgroundColor: 'rgba(16,185,129,0.1)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(52,211,153,0.18)', border: '1px solid rgba(52,211,153,0.4)', borderRadius: '20px', padding: '0.35rem 1rem', fontSize: '0.82rem', fontWeight: 600, marginBottom: '1.5rem', color: '#a7f3d0', letterSpacing: '0.03em' }}>
            <ShieldCheck size={14} /> ISO 14001 Certified • R2 Authorized • Zero-Landfill Partner
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.25rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
            India's Most Trusted<br />
            <span style={{ color: '#34d399' }}>E-Waste Recycling Portal</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#a7f3d0', maxWidth: '620px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Schedule a doorstep pickup, track every step in real time, and receive a verified recycling certificate — all from one platform.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/schedule-pickup" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.85rem 2rem', borderRadius: '10px',
              background: 'linear-gradient(135deg, #34d399, #10b981)',
              color: '#064e3b', fontWeight: 800, fontSize: '1rem', textDecoration: 'none',
              boxShadow: '0 8px 20px rgba(52,211,153,0.35)', transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}>
              <CalendarPlus size={19} /> Book Doorstep Pickup
            </Link>
            <Link to="/track" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.85rem 2rem', borderRadius: '10px',
              backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)',
              color: 'white', fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              transition: 'background 0.15s ease'
            }}>
              <Search size={18} /> Track My Request
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#f0fdf4', borderBottom: '1px solid #d1fae5', padding: '2rem 1rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', textAlign: 'center' }}>
            {[
              { value: citizenCount.toLocaleString() + '+', label: 'Registered Citizens', icon: <Users size={20} color="#059669" /> },
              { value: kgCount.toLocaleString() + '00+ kg', label: 'E-Waste Collected', icon: <Package size={20} color="#059669" /> },
              { value: co2Count.toLocaleString() + 'T', label: 'CO₂ Emissions Saved', icon: <Leaf size={20} color="#059669" /> },
              { value: requestsCount.toLocaleString() + '+', label: 'Requests Processed', icon: <CheckCircle2 size={20} color="#059669" /> },
            ].map((s, i) => (
              <div key={i} style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>{s.icon}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#064e3b', fontFamily: 'var(--font-heading)' }}>{s.value}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1rem', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>Simple Process</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-title)', fontFamily: 'var(--font-heading)' }}>How EcoCycle Works</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', maxWidth: '520px', margin: '0.5rem auto 0' }}>From scheduling to recycling certificate — 4 simple steps.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ padding: '2rem 1.5rem', borderRadius: '16px', backgroundColor: 'white', border: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(5,150,105,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}
              >
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '3rem', fontWeight: 900, color: '#f0fdf4', lineHeight: 1 }}>{i + 1}</div>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '1.25rem' }}>{s.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-text-title)', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accepted Categories ─────────────────────────────────── */}
      <section style={{ padding: '5rem 1rem', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '0.5rem' }}>What We Accept</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-title)', fontFamily: 'var(--font-heading)' }}>Accepted E-Waste Categories</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', maxWidth: '500px', margin: '0.5rem auto 0' }}>We handle all major types of electronic waste through certified partners.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {ACCEPTED_CATEGORIES.map((cat) => (
              <div key={cat.id} style={{ padding: '1.5rem', borderRadius: '14px', backgroundColor: 'white', border: '1px solid var(--color-border)', display: 'flex', gap: '1rem', alignItems: 'flex-start', transition: 'transform 0.15s, box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(5,150,105,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: '12px', backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#047857' }}>
                  <Package size={22} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-title)', marginBottom: '0.35rem' }}>{cat.name}</h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', lineHeight: 1.5 }}>{cat.recyclingGuideline.substring(0, 80)}…</p>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Leaf size={12} /> {cat.co2PerKg} kg CO₂ saved per kg
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/schedule-pickup" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 2rem', borderRadius: '10px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
              Schedule a Pickup Now <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Environmental Impact ────────────────────────────────── */}
      <section style={{ padding: '5rem 1rem', background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a7f3d0', display: 'block', marginBottom: '0.5rem' }}>Why It Matters</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'white' }}>Environmental Impact</h2>
            <p style={{ color: '#a7f3d0', marginTop: '0.5rem', maxWidth: '500px', margin: '0.5rem auto 0' }}>Responsible e-waste management is critical to protect our planet and future generations.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {impacts.map((item, i) => (
              <div key={i} style={{ padding: '1.5rem', borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', marginBottom: '1rem' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#d1fae5', marginBottom: '0.5rem' }}>{item.label}</h3>
                <p style={{ fontSize: '0.85rem', color: '#a7f3d0', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ───────────────────────────────────────────── */}
      <section style={{ padding: '4rem 1rem', backgroundColor: '#f0fdf4', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#d1fae5', color: '#065f46', borderRadius: '20px', padding: '0.3rem 1rem', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>
            <Clock size={14} /> Takes less than 2 minutes
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#064e3b', fontFamily: 'var(--font-heading)', marginBottom: '0.75rem' }}>Ready to Recycle Your Old Electronics?</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Join thousands of citizens who've already recycled responsibly with EcoCycle. Book your pickup now.
          </p>
          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/schedule-pickup" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.85rem 2rem', borderRadius: '10px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: '1rem', boxShadow: '0 6px 16px rgba(5,150,105,0.3)' }}>
              <CalendarPlus size={18} /> Get Started Free
            </Link>
            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.85rem 2rem', borderRadius: '10px', backgroundColor: 'white', border: '1px solid var(--color-border)', color: 'var(--color-text-title)', fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>
              Sign In to Dashboard
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
