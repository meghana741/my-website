import pptxgen from 'pptxgenjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize presentation
const pres = new pptxgen();

pres.layout = 'LAYOUT_16x9';
pres.author = 'EcoCycle Development Team';
pres.company = 'EcoCycle Environmental Technologies';
pres.title = 'EcoCycle E-Waste Management Platform - Complete System Flow';
pres.subject = 'Comprehensive System Architecture, User Workflows, and End-to-End Operational Lifecycle';

// Define Color Palette
const COLORS = {
  primaryDark: '064E3B',    // Dark Emerald
  primary: '059669',        // Emerald Green
  primaryLight: 'D1FAE5',   // Light Mint
  accentGreen: '10B981',    // Vibrant Green
  accentTeal: '0D9488',     // Teal
  accentBlue: '0284C7',     // Sky Blue
  accentAmber: 'D97706',    // Amber / Warning
  darkText: '0F172A',       // Slate 900
  mutedText: '475569',      // Slate 600
  lightBg: 'F8FAFC',        // Slate 50
  cardBg: 'FFFFFF',         // White
  cardBorder: 'E2E8F0',     // Slate 200
  gold: 'F59E0B'
};

// Helper to add header to slide
function addSlideHeader(slide, title, category, slideNumber) {
  // Top category / breadcrumb
  slide.addText(category.toUpperCase(), {
    x: 0.8,
    y: 0.4,
    w: 8.0,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    color: COLORS.primary,
    bold: true,
    charSpacing: 2
  });

  // Main Slide Title
  slide.addText(title, {
    x: 0.8,
    y: 0.65,
    w: 10.5,
    h: 0.6,
    fontSize: 22,
    fontFace: 'Arial',
    color: COLORS.primaryDark,
    bold: true
  });

  // Header separator line
  slide.addShape(pres.ShapeType.line, {
    x: 0.8,
    y: 1.25,
    w: 11.7,
    h: 0,
    line: { color: COLORS.primaryLight, width: 2 }
  });

  // Footer / Branding
  slide.addText('EcoCycle Portal | Comprehensive System Flow & Architecture', {
    x: 0.8,
    y: 7.1,
    w: 8.0,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: COLORS.mutedText
  });

  // Page number
  slide.addText(`Slide ${slideNumber} of 15`, {
    x: 10.5,
    y: 7.1,
    w: 2.0,
    h: 0.3,
    align: 'right',
    fontSize: 9,
    fontFace: 'Arial',
    color: COLORS.mutedText,
    bold: true
  });
}

// -------------------------------------------------------------
// SLIDE 1: Title Slide (Cover)
// -------------------------------------------------------------
const slide1 = pres.addSlide();
slide1.background = { color: COLORS.primaryDark };

// Decorative Background Shapes
slide1.addShape(pres.ShapeType.rect, {
  x: 0,
  y: 0,
  w: 13.33,
  h: 7.5,
  fill: { color: COLORS.primaryDark }
});

slide1.addShape(pres.ShapeType.ellipse, {
  x: 10.0,
  y: -1.0,
  w: 5.0,
  h: 5.0,
  fill: { color: '065F46', transparency: 60 }
});

slide1.addShape(pres.ShapeType.ellipse, {
  x: -1.5,
  y: 4.5,
  w: 4.5,
  h: 4.5,
  fill: { color: '047857', transparency: 70 }
});

// Certification Pill Badge
slide1.addShape(pres.ShapeType.roundRect, {
  x: 1.0,
  y: 1.4,
  w: 4.8,
  h: 0.45,
  rectRadius: 0.22,
  fill: { color: '065F46' },
  line: { color: '34D399', width: 1 }
});

slide1.addText('ISO 14001 CERTIFIED  •  R2 AUTHORIZED  •  ZERO LANDFILL', {
  x: 1.0,
  y: 1.4,
  w: 4.8,
  h: 0.45,
  fontSize: 10,
  fontFace: 'Arial',
  color: 'A7F3D0',
  bold: true,
  align: 'center',
  valign: 'middle'
});

// Title
slide1.addText('EcoCycle E-Waste Management Portal', {
  x: 1.0,
  y: 2.1,
  w: 11.3,
  h: 1.2,
  fontSize: 36,
  fontFace: 'Arial',
  color: 'FFFFFF',
  bold: true
});

// Subtitle
slide1.addText('End-to-End System Flow, User Journeys, Architecture & Recycling Lifecycle', {
  x: 1.0,
  y: 3.3,
  w: 11.0,
  h: 0.8,
  fontSize: 18,
  fontFace: 'Arial',
  color: '6EE7B7'
});

// Overview Box
slide1.addShape(pres.ShapeType.roundRect, {
  x: 1.0,
  y: 4.4,
  w: 11.33,
  h: 1.8,
  rectRadius: 0.1,
  fill: { color: '047857', transparency: 40 },
  line: { color: '10B981', width: 1 }
});

slide1.addText([
  { text: 'KEY SYSTEM DOMAINS COVERED:\n', options: { bold: true, color: 'FFFFFF', fontSize: 11 } },
  { text: '• 3 Role Portals: ', options: { bold: true, color: 'A7F3D0', fontSize: 11 } },
  { text: 'Citizens, Collection Logistics Agents, and Operations Administrators\n', options: { color: 'FFFFFF', fontSize: 11 } },
  { text: '• Full Pickup Lifecycle: ', options: { bold: true, color: 'A7F3D0', fontSize: 11 } },
  { text: 'Doorstep Booking  ➔  Agent Dispatch  ➔  Collection  ➔  Certified Recycling  ➔  Impact Certificate\n', options: { color: 'FFFFFF', fontSize: 11 } },
  { text: '• Tech Stack & Data: ', options: { bold: true, color: 'A7F3D0', fontSize: 11 } },
  { text: 'React 19 + Express REST API + Microsoft SQL Server with Real-Time Carbon Tracking', options: { color: 'FFFFFF', fontSize: 11 } }
], {
  x: 1.3,
  y: 4.55,
  w: 10.7,
  h: 1.5,
  fontFace: 'Arial'
});

slide1.addText('Presented for: Project Architecture & Execution Review  |  Year: 2026', {
  x: 1.0,
  y: 6.6,
  w: 11.3,
  h: 0.4,
  fontSize: 11,
  fontFace: 'Arial',
  color: 'A7F3D0'
});

// -------------------------------------------------------------
// SLIDE 2: Executive Summary & Project Purpose
// -------------------------------------------------------------
const slide2 = pres.addSlide();
addSlideHeader(slide2, 'Executive Summary & Problem Statement', 'Platform Overview', 2);

// Problem Box
slide2.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.5,
  w: 5.6,
  h: 5.2,
  rectRadius: 0.1,
  fill: { color: 'FEF2F2' },
  line: { color: 'FCA5A5', width: 1.5 }
});

slide2.addText('The E-Waste Crisis', {
  x: 1.1,
  y: 1.7,
  w: 5.0,
  h: 0.4,
  fontSize: 16,
  fontFace: 'Arial',
  color: '991B1B',
  bold: true
});

slide2.addText([
  { text: '• Rapid Electronic Waste Growth:\n', options: { bold: true, color: '7F1D1D' } },
  { text: '  Millions of tons of obsolete electronics end up in unorganized scrap yards annually.\n\n', options: { color: COLORS.mutedText } },
  { text: '• Toxic Hazard Exposure:\n', options: { bold: true, color: '7F1D1D' } },
  { text: '  Lead, Mercury, and Cadmium leach into groundwater when informal burning or dumping occurs.\n\n', options: { color: COLORS.mutedText } },
  { text: '• Lack of Citizen Access:\n', options: { bold: true, color: '7F1D1D' } },
  { text: '  Households have no convenient, transparent doorstep pickup channels.\n\n', options: { color: COLORS.mutedText } },
  { text: '• Regulatory Void:\n', options: { bold: true, color: '7F1D1D' } },
  { text: '  Absence of verifiable audit trails and recycling certificates for eco-conscious compliance.', options: { color: COLORS.mutedText } }
], {
  x: 1.1,
  y: 2.2,
  w: 5.0,
  h: 4.2,
  fontSize: 12,
  fontFace: 'Arial'
});

// Solution Box
slide2.addShape(pres.ShapeType.roundRect, {
  x: 6.8,
  y: 1.5,
  w: 5.7,
  h: 5.2,
  rectRadius: 0.1,
  fill: { color: 'F0FDF4' },
  line: { color: '86EFAC', width: 1.5 }
});

slide2.addText('The EcoCycle Solution', {
  x: 7.1,
  y: 1.7,
  w: 5.0,
  h: 0.4,
  fontSize: 16,
  fontFace: 'Arial',
  color: COLORS.primaryDark,
  bold: true
});

slide2.addText([
  { text: '• Convenient Doorstep Scheduling:\n', options: { bold: true, color: COLORS.primaryDark } },
  { text: '  Citizens easily schedule hassle-free pickups with real-time slot selection.\n\n', options: { color: COLORS.mutedText } },
  { text: '• Certified EV Fleet Logistics:\n', options: { bold: true, color: COLORS.primaryDark } },
  { text: '  Zero-emission electric vehicle agents collect, weigh, and transport e-waste safely.\n\n', options: { color: COLORS.mutedText } },
  { text: '• Verified Partner Segregation:\n', options: { bold: true, color: COLORS.primaryDark } },
  { text: '  Materials sorted into Reusable, Precious Metals, and Safe Hazardous Disposal.\n\n', options: { color: COLORS.mutedText } },
  { text: '• Real-Time Tracking & Impact Metrics:\n', options: { bold: true, color: COLORS.primaryDark } },
  { text: '  Dynamic tracking numbers (EW-2026-XXXX) with automated CO₂ and Trees Saved calculation.', options: { color: COLORS.mutedText } }
], {
  x: 7.1,
  y: 2.2,
  w: 5.1,
  h: 4.2,
  fontSize: 12,
  fontFace: 'Arial'
});

// -------------------------------------------------------------
// SLIDE 3: High-Level System Architecture
// -------------------------------------------------------------
const slide3 = pres.addSlide();
addSlideHeader(slide3, 'High-Level 3-Tier System Architecture', 'Technical Architecture', 3);

// 3 Architecture Pillars
const archTiers = [
  {
    title: 'Presentation Layer (Frontend)',
    sub: 'React 19 + Vite SPA',
    color: '059669',
    bg: 'ECFDF5',
    items: [
      '• React Router v7 with protected routes (Admin, Agent, Citizen)',
      '• Centralized EwasteContext state management',
      '• Responsive Modern UI (Vanilla CSS & Lucide Icons)',
      '• Dynamic Toast notifications & auto-calculating counters',
      '• Resilient offline fallback with mock data seeding'
    ]
  },
  {
    title: 'Application Layer (Backend API)',
    sub: 'Node.js + Express REST API',
    color: '0284C7',
    bg: 'F0F9FF',
    items: [
      '• Modular Router architecture (/auth, /requests, /recycling, /reports)',
      '• JWT Token-Based Authentication with bcrypt password hashing',
      '• Role-Based Access Control (RBAC) middleware',
      '• Request validation & real-time lifecycle event hooks',
      '• CORS enabled for seamless cross-domain connectivity'
    ]
  },
  {
    title: 'Data & Persistence Layer',
    sub: 'Microsoft SQL Server Database',
    color: '7C3AED',
    bg: 'F5F3FF',
    items: [
      '• Relational schema with normalized tables & foreign keys',
      '• Users, PickupRequests, RequestTimeline tables',
      '• WasteCategories, CollectionAgents, ServiceCenters',
      '• RecyclingFacilities & RecyclingBatches tables',
      '• ACID transaction integrity for all status updates'
    ]
  }
];

archTiers.forEach((tier, index) => {
  const xPos = 0.8 + index * 4.0;
  slide3.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 1.5,
    w: 3.7,
    h: 5.2,
    rectRadius: 0.1,
    fill: { color: tier.bg },
    line: { color: tier.color, width: 2 }
  });

  slide3.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: 1.5,
    w: 3.7,
    h: 0.85,
    fill: { color: tier.color }
  });

  slide3.addText(tier.title, {
    x: xPos + 0.15,
    y: 1.55,
    w: 3.4,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true,
    align: 'center'
  });

  slide3.addText(tier.sub, {
    x: xPos + 0.15,
    y: 1.95,
    w: 3.4,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    color: 'E0E7FF',
    align: 'center'
  });

  slide3.addText(tier.items.join('\n\n'), {
    x: xPos + 0.2,
    y: 2.55,
    w: 3.3,
    h: 3.9,
    fontSize: 11,
    fontFace: 'Arial',
    color: COLORS.darkText
  });
});

// -------------------------------------------------------------
// SLIDE 4: User Roles & Access Control Matrix
// -------------------------------------------------------------
const slide4 = pres.addSlide();
addSlideHeader(slide4, 'User Roles & Access Control Matrix', 'Stakeholder Experience', 4);

// 4 User Cards
const roles = [
  {
    role: 'Citizen / Household',
    iconColor: '10B981',
    access: 'Public & Citizen Portal',
    portal: '/citizen/dashboard, /schedule-pickup',
    features: [
      '• Book doorstep e-waste pickup',
      '• Select categories, weights & time slots',
      '• Track live order progress with Tracking ID',
      '• Monitor individual CO₂ & Tree impact',
      '• Receive notification updates & certificates'
    ]
  },
  {
    role: 'Collection Agent',
    iconColor: '0284C7',
    access: 'Agent Logistics Portal',
    portal: '/agent/dashboard',
    features: [
      '• View assigned pickup orders by territory',
      '• Accept new collection jobs from central hub',
      '• Update status: "Out for Pickup" & "Collected"',
      '• Record actual measured weight at doorstep',
      '• Deliver items to regional Service Center'
    ]
  },
  {
    role: 'Operations Admin',
    iconColor: 'D97706',
    access: 'Admin Operations Hub',
    portal: '/admin/dashboard',
    features: [
      '• Review incoming citizen pickup requests',
      '• Approve or reject requests with mandatory notes',
      '• Assign EV-fleet collection agents to requests',
      '• Manage service centers & certified recyclers',
      '• Monitor real-time platform operational KPIs'
    ]
  },
  {
    role: 'Recycling Facility Partner',
    iconColor: '7C3AED',
    access: 'Recycling Hub & Segregation',
    portal: '/recycling, /reports',
    features: [
      '• Receive collected e-waste batches from hubs',
      '• Segregate into Reusable, Metal & Hazardous',
      '• Log recovered materials (Gold, Copper, Steel)',
      '• Issue ISO 14001 compliance audit trail',
      '• Feed verified carbon savings into platform'
    ]
  }
];

roles.forEach((r, idx) => {
  const xPos = 0.8 + idx * 3.0;
  slide4.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 1.5,
    w: 2.8,
    h: 5.2,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: r.iconColor, width: 1.8 }
  });

  // Top banner of card
  slide4.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: 1.5,
    w: 2.8,
    h: 0.9,
    fill: { color: r.iconColor }
  });

  slide4.addText(r.role, {
    x: xPos + 0.1,
    y: 1.6,
    w: 2.6,
    h: 0.4,
    fontSize: 13,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true,
    align: 'center'
  });

  slide4.addText(r.access, {
    x: xPos + 0.1,
    y: 1.95,
    w: 2.6,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: 'FFFFFF',
    align: 'center'
  });

  slide4.addText([
    { text: 'ROUTE ACCESS:\n', options: { bold: true, fontSize: 8.5, color: COLORS.mutedText } },
    { text: `${r.portal}\n\n`, options: { bold: true, fontSize: 9, color: r.iconColor } },
    { text: 'KEY CAPABILITIES:\n', options: { bold: true, fontSize: 8.5, color: COLORS.mutedText } },
    { text: r.features.join('\n\n'), options: { fontSize: 9.5, color: COLORS.darkText } }
  ], {
    x: xPos + 0.15,
    y: 2.5,
    w: 2.5,
    h: 4.0,
    fontFace: 'Arial'
  });
});

// -------------------------------------------------------------
// SLIDE 5: Complete End-to-End Lifecycle Flow (Macro Overview)
// -------------------------------------------------------------
const slide5 = pres.addSlide();
addSlideHeader(slide5, 'Complete End-to-End E-Waste Lifecycle Flow', 'System Process Pipeline', 5);

const lifecycleSteps = [
  { step: '01', title: 'Schedule Pickup', actor: 'Citizen', desc: 'Submits e-waste details, quantity, condition, address & time slot.' },
  { step: '02', title: 'Admin Verification', actor: 'Admin', desc: 'Validates request for safe e-waste compliance and approves order.' },
  { step: '03', title: 'Agent Dispatch', actor: 'Admin / Agent', desc: 'Assigned to certified EV fleet agent with territory scheduling.' },
  { step: '04', title: 'Doorstep Collection', actor: 'Agent', desc: 'Agent arrives, verifies items, logs actual weight & collects items.' },
  { step: '05', title: 'Facility Processing', actor: 'Recycler', desc: 'Sent to ISO 14001 facility for component recovery & hazard neutralization.' },
  { step: '06', title: 'Audit & Certificate', actor: 'System', desc: 'Green Certificate issued, Eco-points credited, CO₂ saved updated.' }
];

lifecycleSteps.forEach((s, idx) => {
  const xPos = 0.8 + idx * 1.98;
  slide5.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 1.6,
    w: 1.85,
    h: 4.3,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.primary, width: 1.5 }
  });

  // Step Number Badge
  slide5.addShape(pres.ShapeType.ellipse, {
    x: xPos + 0.62,
    y: 1.8,
    w: 0.6,
    h: 0.6,
    fill: { color: COLORS.primary }
  });

  slide5.addText(s.step, {
    x: xPos + 0.62,
    y: 1.8,
    w: 0.6,
    h: 0.6,
    fontSize: 11,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true,
    align: 'center',
    valign: 'middle'
  });

  slide5.addText(s.title, {
    x: xPos + 0.1,
    y: 2.55,
    w: 1.65,
    h: 0.6,
    fontSize: 11,
    fontFace: 'Arial',
    color: COLORS.primaryDark,
    bold: true,
    align: 'center'
  });

  // Actor Pill
  slide5.addShape(pres.ShapeType.roundRect, {
    x: xPos + 0.25,
    y: 3.2,
    w: 1.35,
    h: 0.3,
    rectRadius: 0.15,
    fill: { color: COLORS.primaryLight }
  });

  slide5.addText(s.actor, {
    x: xPos + 0.25,
    y: 3.2,
    w: 1.35,
    h: 0.3,
    fontSize: 8.5,
    fontFace: 'Arial',
    color: COLORS.primaryDark,
    bold: true,
    align: 'center',
    valign: 'middle'
  });

  slide5.addText(s.desc, {
    x: xPos + 0.1,
    y: 3.65,
    w: 1.65,
    h: 2.1,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: COLORS.mutedText,
    align: 'center'
  });

  // Arrow between cards
  if (idx < 5) {
    slide5.addText('➔', {
      x: xPos + 1.8,
      y: 3.3,
      w: 0.25,
      h: 0.4,
      fontSize: 14,
      color: COLORS.accentGreen,
      bold: true,
      align: 'center'
    });
  }
});

// Bottom Summary Strip
slide5.addShape(pres.ShapeType.rect, {
  x: 0.8,
  y: 6.1,
  w: 11.7,
  h: 0.7,
  fill: { color: 'ECFDF5' },
  line: { color: 'A7F3D0', width: 1 }
});

slide5.addText('STATUS TRANSITION PIPELINE:  Pending  ➔  Approved  ➔  Pickup Scheduled  ➔  Collected  ➔  Sent for Recycling  ➔  Recycling Completed', {
  x: 0.9,
  y: 6.1,
  w: 11.5,
  h: 0.7,
  fontSize: 10.5,
  fontFace: 'Arial',
  color: COLORS.primaryDark,
  bold: true,
  align: 'center',
  valign: 'middle'
});

// -------------------------------------------------------------
// SLIDE 6: Citizen Journey & Request Booking Flow
// -------------------------------------------------------------
const slide6 = pres.addSlide();
addSlideHeader(slide6, 'Citizen Booking & Self-Service Workflow', 'User Journey Flow', 6);

// Left Column: Step Sequence
slide6.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.5,
  w: 7.2,
  h: 5.2,
  rectRadius: 0.1,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.cardBorder, width: 1.5 }
});

slide6.addText('4-Step Citizen Experience (/schedule-pickup)', {
  x: 1.1,
  y: 1.7,
  w: 6.6,
  h: 0.4,
  fontSize: 15,
  fontFace: 'Arial',
  color: COLORS.primaryDark,
  bold: true
});

const citizenSteps = [
  { step: '1', title: 'Item & Category Selection', desc: 'Select from certified waste streams (Laptops, Phones, Appliances, Batteries, Scrap).' },
  { step: '2', title: 'Quantity & Working Condition', desc: 'Specify reusable, repairable, or scrap state + estimated weight in kg.' },
  { step: '3', title: 'Address & Service Hub Routing', desc: 'Doorstep pickup address, city pincode & preferred regional EcoCycle Central Hub.' },
  { step: '4', title: 'Schedule Date & Time Slot', desc: 'Choose Morning (9am-12pm), Afternoon (12pm-4pm), or Evening (4pm-7pm).' }
];

citizenSteps.forEach((cs, i) => {
  const yPos = 2.25 + i * 1.05;
  slide6.addShape(pres.ShapeType.rect, {
    x: 1.1,
    y: yPos,
    w: 0.4,
    h: 0.4,
    fill: { color: COLORS.primary }
  });

  slide6.addText(cs.step, {
    x: 1.1,
    y: yPos,
    w: 0.4,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true,
    align: 'center',
    valign: 'middle'
  });

  slide6.addText([
    { text: `${cs.title}: `, options: { bold: true, color: COLORS.darkText, fontSize: 11.5 } },
    { text: cs.desc, options: { color: COLORS.mutedText, fontSize: 11 } }
  ], {
    x: 1.65,
    y: yPos - 0.05,
    w: 6.1,
    h: 0.85,
    fontFace: 'Arial'
  });
});

// Right Column: Key Outputs & Features
slide6.addShape(pres.ShapeType.roundRect, {
  x: 8.2,
  y: 1.5,
  w: 4.3,
  h: 5.2,
  rectRadius: 0.1,
  fill: { color: 'F0FDF4' },
  line: { color: '86EFAC', width: 1.5 }
});

slide6.addText('What Happens After Submission?', {
  x: 8.4,
  y: 1.7,
  w: 3.9,
  h: 0.4,
  fontSize: 14,
  fontFace: 'Arial',
  color: COLORS.primaryDark,
  bold: true
});

slide6.addText([
  { text: '• Unique Tracking Code:\n', options: { bold: true, color: COLORS.primaryDark } },
  { text: '  Instantly assigns an audit ID (e.g., EW-2026-1044) with direct URL routing.\n\n', options: { color: COLORS.mutedText } },
  { text: '• Real-Time Notification:\n', options: { bold: true, color: COLORS.primaryDark } },
  { text: '  Notification dispatched to citizen dashboard and operations queue.\n\n', options: { color: COLORS.mutedText } },
  { text: '• Citizen Dashboard Sync:\n', options: { bold: true, color: COLORS.primaryDark } },
  { text: '  Request appears in User Dashboard under "Pending Review".\n\n', options: { color: COLORS.mutedText } },
  { text: '• Automatic Eco-Impact Estimate:\n', options: { bold: true, color: COLORS.primaryDark } },
  { text: '  Initial CO₂ emission savings pre-calculated based on estimated weight.', options: { color: COLORS.mutedText } }
], {
  x: 8.4,
  y: 2.25,
  w: 3.9,
  h: 4.2,
  fontSize: 11,
  fontFace: 'Arial'
});

// -------------------------------------------------------------
// SLIDE 7: Admin Operations & Dispatch Flow
// -------------------------------------------------------------
const slide7 = pres.addSlide();
addSlideHeader(slide7, 'Admin Operations & Intelligent Dispatch Flow', 'Administrative Controls', 7);

// 3 Admin Operation Cards
const adminCards = [
  {
    title: '1. Request Triaging & Verification',
    color: '059669',
    bg: 'F0FDF4',
    content: [
      '• Live Operations Table with status filter tabs (All, Pending, Approved, In Logistics, Completed).',
      '• Item Verification: Confirms category matches authorized e-waste criteria.',
      '• One-Click Approval: Validates request and updates status to "Approved" with audit log note.',
      '• Rejection Handling: Prompts administrator for mandatory rejection reason, alerting citizen.'
    ]
  },
  {
    title: '2. Agent Scheduling & Dispatch',
    color: '0284C7',
    bg: 'F0F9FF',
    content: [
      '• Territory-Based Agent Allocation: Matches regional hubs (Indiranagar, Koramangala, Whitefield).',
      '• Fleet Vehicle Assignment: Links certified electric collection vans (KA-05-EV-4412).',
      '• Schedule Time Slot: Locks preferred morning/afternoon pickup window.',
      '• Automated Notification: Alerts assigned agent with citizen pickup address and contact phone.'
    ]
  },
  {
    title: '3. Real-Time Operational Monitoring',
    color: '7C3AED',
    bg: 'FAF5FF',
    content: [
      '• Real-time synchronization with Microsoft SQL Server backend.',
      '• Operational KPI Cards: Total volume, pending queue, vehicles active in transit.',
      '• User Management: Citizen account monitoring and compliance history.',
      '• Lifecycle Override: Manual administrative progression if manual inspection required.'
    ]
  }
];

adminCards.forEach((c, idx) => {
  const xPos = 0.8 + idx * 4.0;
  slide7.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 1.5,
    w: 3.7,
    h: 5.2,
    rectRadius: 0.1,
    fill: { color: c.bg },
    line: { color: c.color, width: 1.8 }
  });

  slide7.addText(c.title, {
    x: xPos + 0.2,
    y: 1.7,
    w: 3.3,
    h: 0.6,
    fontSize: 13,
    fontFace: 'Arial',
    color: c.color,
    bold: true
  });

  slide7.addText(c.content.join('\n\n'), {
    x: xPos + 0.2,
    y: 2.4,
    w: 3.3,
    h: 4.1,
    fontSize: 11,
    fontFace: 'Arial',
    color: COLORS.darkText
  });
});

// -------------------------------------------------------------
// SLIDE 8: Collection Agent Logistics & Pickup Flow
// -------------------------------------------------------------
const slide8 = pres.addSlide();
addSlideHeader(slide8, 'Collection Agent Logistics & Field Pickup Workflow', 'Field Operations', 8);

// Left Flow Table
const agentWorkflows = [
  { stage: 'Stage A: Job Acceptance', desc: 'Agent inspects "Assigned Pickups" queue at the regional service center and accepts pending assignments.' },
  { stage: 'Stage B: Transit & Arrival', desc: 'Agent navigates to customer address via EV van; order transitions to "Pickup Scheduled" / "Out for Pickup".' },
  { stage: 'Stage C: Doorstep Verification', desc: 'Agent inspects device condition, weighs item using calibrated scale, and logs actual weight.' },
  { stage: 'Stage D: Custody & Hub Drop', desc: 'Item marked as "Collected" with digital proof-of-pickup, then delivered to the regional central hub.' }
];

slide8.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.5,
  w: 7.2,
  h: 5.2,
  rectRadius: 0.1,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.accentBlue, width: 1.5 }
});

slide8.addText('Field Agent Execution Cycle (/agent/dashboard)', {
  x: 1.1,
  y: 1.7,
  w: 6.6,
  h: 0.4,
  fontSize: 15,
  fontFace: 'Arial',
  color: COLORS.accentBlue,
  bold: true
});

agentWorkflows.forEach((aw, i) => {
  const yPos = 2.3 + i * 1.05;
  slide8.addShape(pres.ShapeType.roundRect, {
    x: 1.1,
    y: yPos,
    w: 6.6,
    h: 0.9,
    rectRadius: 0.08,
    fill: { color: 'F0F9FF' },
    line: { color: 'BAE6FD', width: 1 }
  });

  slide8.addText(aw.stage, {
    x: 1.25,
    y: yPos + 0.1,
    w: 6.3,
    h: 0.3,
    fontSize: 11.5,
    fontFace: 'Arial',
    color: '0369A1',
    bold: true
  });

  slide8.addText(aw.desc, {
    x: 1.25,
    y: yPos + 0.4,
    w: 6.3,
    h: 0.45,
    fontSize: 10,
    fontFace: 'Arial',
    color: COLORS.mutedText
  });
});

// Right Column: Field Agent Features
slide8.addShape(pres.ShapeType.roundRect, {
  x: 8.2,
  y: 1.5,
  w: 4.3,
  h: 5.2,
  rectRadius: 0.1,
  fill: { color: 'F8FAFC' },
  line: { color: COLORS.cardBorder, width: 1.5 }
});

slide8.addText('Agent Portal Capabilities', {
  x: 8.5,
  y: 1.7,
  w: 3.7,
  h: 0.4,
  fontSize: 14,
  fontFace: 'Arial',
  color: COLORS.darkText,
  bold: true
});

slide8.addText([
  { text: '• 3 Operational Views:\n', options: { bold: true, color: '0284C7' } },
  { text: '  - Assigned Pickups (Pending acceptance)\n  - Active Pickups (In-transit / Out for pickup)\n  - Completed Deliveries (Hub custody)\n\n', options: { color: COLORS.mutedText } },
  { text: '• Quick Telephony & Navigation:\n', options: { bold: true, color: '0284C7' } },
  { text: '  One-click customer calling and route address details.\n\n', options: { color: COLORS.mutedText } },
  { text: '• Vehicle Identity Integration:\n', options: { bold: true, color: '0284C7' } },
  { text: '  All pickups stamped with Agent Name, Phone, and Electric Vehicle Plate Number (KA-05-EV-4412).', options: { color: COLORS.mutedText } }
], {
  x: 8.5,
  y: 2.25,
  w: 3.7,
  h: 4.2,
  fontSize: 10.5,
  fontFace: 'Arial'
});

// -------------------------------------------------------------
// SLIDE 9: Public Tracking & Live Timeline System
// -------------------------------------------------------------
const slide9 = pres.addSlide();
addSlideHeader(slide9, 'Real-Time Tracking & Timeline Transparency', 'Audit & Verification', 9);

// Tracking Top Banner
slide9.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 1.5,
  w: 11.7,
  h: 1.4,
  rectRadius: 0.1,
  fill: { color: 'F0FDF4' },
  line: { color: '86EFAC', width: 1.5 }
});

slide9.addText('Public Tracking Engine (/track?id=EW-2026-XXXX)', {
  x: 1.1,
  y: 1.65,
  w: 8.0,
  h: 0.35,
  fontSize: 14,
  fontFace: 'Arial',
  color: COLORS.primaryDark,
  bold: true
});

slide9.addText('Enables any citizen, corporate donor, or regulatory auditor to verify the exact custody of e-waste without requiring account login credentials.', {
  x: 1.1,
  y: 2.05,
  w: 11.0,
  h: 0.7,
  fontSize: 11,
  fontFace: 'Arial',
  color: COLORS.mutedText
});

// 6 Visual Stepper Circles
const trackingStages = [
  { name: 'Pending', desc: 'Request submitted' },
  { name: 'Approved', desc: 'Admin approved' },
  { name: 'Pickup Scheduled', desc: 'Agent assigned' },
  { name: 'Collected', desc: 'EV fleet custody' },
  { name: 'Sent for Recycling', desc: 'Hub transfer' },
  { name: 'Recycling Done', desc: 'Certificate ready' }
];

trackingStages.forEach((ts, idx) => {
  const xPos = 0.8 + idx * 1.95;
  slide9.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 3.1,
    w: 1.85,
    h: 1.5,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.primary, width: 1.5 }
  });

  slide9.addText(ts.name, {
    x: xPos + 0.1,
    y: 3.3,
    w: 1.65,
    h: 0.5,
    fontSize: 11,
    fontFace: 'Arial',
    color: COLORS.primaryDark,
    bold: true,
    align: 'center'
  });

  slide9.addText(ts.desc, {
    x: xPos + 0.1,
    y: 3.8,
    w: 1.65,
    h: 0.6,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: COLORS.mutedText,
    align: 'center'
  });
});

// Bottom Audit Info
slide9.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 4.8,
  w: 11.7,
  h: 1.9,
  rectRadius: 0.1,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.cardBorder, width: 1 }
});

slide9.addText('Live Chain-of-Custody Audit Trail Details Available in Tracking:', {
  x: 1.1,
  y: 5.0,
  w: 11.0,
  h: 0.35,
  fontSize: 12,
  fontFace: 'Arial',
  color: COLORS.darkText,
  bold: true
});

slide9.addText([
  { text: '• Assigned Agent Identity: ', options: { bold: true, color: COLORS.primaryDark } },
  { text: 'Name, Direct Contact Phone (+91 98201 55432), and Electric Van Registration\n', options: { color: COLORS.mutedText } },
  { text: '• Service Center Routing: ', options: { bold: true, color: COLORS.primaryDark } },
  { text: 'EcoCycle Central Hub address, Indiranagar contact dispatch, and state jurisdiction\n', options: { color: COLORS.mutedText } },
  { text: '• Timeline Event Log: ', options: { bold: true, color: COLORS.primaryDark } },
  { text: 'Timestamped status changes with automated audit notes preserved in SQL database', options: { color: COLORS.mutedText } }
], {
  x: 1.1,
  y: 5.4,
  w: 11.0,
  h: 1.2,
  fontSize: 10.5,
  fontFace: 'Arial'
});

// -------------------------------------------------------------
// SLIDE 10: Recycling Hub & Material Segregation Flow
// -------------------------------------------------------------
const slide10 = pres.addSlide();
addSlideHeader(slide10, 'Recycling & Hazardous Segregation Workflow', 'Circular Economy', 10);

// 3 Recycling Streams
const wasteStreams = [
  {
    title: 'Stream 1: Component Reuse',
    color: '059669',
    bg: 'ECFDF5',
    sub: 'Refurbishment & Spare Parts',
    items: [
      '• Functional RAM, storage, power adapters, and displays extracted.',
      '• Tested and repurposed for educational and low-income digital initiatives.',
      '• Diverts 35%+ of incoming material from premature destruction.',
      '• Certified safe data wiping adhering to NIST 800-88 guidelines.'
    ]
  },
  {
    title: 'Stream 2: Precious Metals Recovery',
    color: 'D97706',
    bg: 'FFFBEB',
    sub: 'Circular Metal Extraction',
    items: [
      '• Extraction of Copper, Gold, Silver, and Aluminum from PCBs.',
      '• 1 ton of recycled smartphones yields up to 300g of high-purity Gold.',
      '• Recovered raw metals supplied to authorized Indian manufacturers.',
      '• Avoids open-pit ore mining carbon expenditures.'
    ]
  },
  {
    title: 'Stream 3: Hazardous Neutralization',
    color: 'DC2626',
    bg: 'FEF2F2',
    sub: 'Safe Toxic Decontamination',
    items: [
      '• Lead from cathode ray tubes & soldering safely isolated.',
      '• Mercury backlights and Cadmium battery cells separated.',
      '• Processed by CPCB (Central Pollution Control Board) licensed handlers.',
      '• Guaranteed 0% toxic leakage into municipal landfills or water tables.'
    ]
  }
];

wasteStreams.forEach((ws, idx) => {
  const xPos = 0.8 + idx * 4.0;
  slide10.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 1.5,
    w: 3.7,
    h: 5.2,
    rectRadius: 0.1,
    fill: { color: ws.bg },
    line: { color: ws.color, width: 1.8 }
  });

  slide10.addText(ws.title, {
    x: xPos + 0.2,
    y: 1.7,
    w: 3.3,
    h: 0.4,
    fontSize: 13,
    fontFace: 'Arial',
    color: ws.color,
    bold: true
  });

  slide10.addText(ws.sub, {
    x: xPos + 0.2,
    y: 2.1,
    w: 3.3,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    color: COLORS.mutedText,
    bold: true
  });

  slide10.addText(ws.items.join('\n\n'), {
    x: xPos + 0.2,
    y: 2.5,
    w: 3.3,
    h: 4.0,
    fontSize: 10.5,
    fontFace: 'Arial',
    color: COLORS.darkText
  });
});

// -------------------------------------------------------------
// SLIDE 11: Environmental Impact & Carbon Accounting Models
// -------------------------------------------------------------
const slide11 = pres.addSlide();
addSlideHeader(slide11, 'Environmental Impact & Mathematical Models', 'Impact & Analytics', 11);

// 4 Mathematical KPI Cards
const kpis = [
  { label: 'CO₂ Emissions Prevented', formula: 'Weight (kg) × 1.85', metric: '1.85 kg CO₂ / kg', color: '059669', desc: 'Avoids greenhouse emissions from mining and smelting virgin ores.' },
  { label: 'Energy Conserved', formula: 'Weight (kg) × 14.2 kWh', metric: '14.2 kWh / kg', color: '0284C7', desc: 'Recycled aluminum and copper save up to 90% power vs primary smelting.' },
  { label: 'Tree Equivalents Saved', formula: 'Weight (kg) × 0.04 Trees', metric: '0.04 Trees / kg', color: '10B981', desc: 'Annual carbon sequestration equivalence for forest preservation.' },
  { label: 'Zero-Landfill Diverted', formula: '100% of Verified E-Waste', metric: '100% Diverted', color: '7C3AED', desc: 'Zero electronic scrap sent to municipal garbage or informal dump sites.' }
];

kpis.forEach((kpi, idx) => {
  const xPos = 0.8 + (idx % 2) * 5.95;
  const yPos = 1.6 + Math.floor(idx / 2) * 2.55;

  slide11.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: yPos,
    w: 5.75,
    h: 2.35,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: kpi.color, width: 1.8 }
  });

  slide11.addText(kpi.label, {
    x: xPos + 0.25,
    y: yPos + 0.2,
    w: 5.25,
    h: 0.35,
    fontSize: 14,
    fontFace: 'Arial',
    color: kpi.color,
    bold: true
  });

  // Metric Callout
  slide11.addText(kpi.metric, {
    x: xPos + 0.25,
    y: yPos + 0.55,
    w: 5.25,
    h: 0.55,
    fontSize: 20,
    fontFace: 'Arial',
    color: COLORS.primaryDark,
    bold: true
  });

  slide11.addText(`Mathematical Model: ${kpi.formula}`, {
    x: xPos + 0.25,
    y: yPos + 1.15,
    w: 5.25,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    color: COLORS.primary,
    bold: true
  });

  slide11.addText(kpi.desc, {
    x: xPos + 0.25,
    y: yPos + 1.5,
    w: 5.25,
    h: 0.7,
    fontSize: 10,
    fontFace: 'Arial',
    color: COLORS.mutedText
  });
});

// -------------------------------------------------------------
// SLIDE 12: Database Schema & Entity Relationships
// -------------------------------------------------------------
const slide12 = pres.addSlide();
addSlideHeader(slide12, 'Microsoft SQL Server Database Schema', 'Data Architecture', 12);

const tables = [
  {
    name: 'Users',
    keys: 'PK: Id',
    fields: ['Name, Email, PasswordHash', 'Role (citizen, agent, admin)', 'Phone, Address, City, Pincode', 'CreatedAt, IsActive']
  },
  {
    name: 'PickupRequests',
    keys: 'PK: Id  |  FK: UserId, ServiceCenterId',
    fields: ['TrackingNumber (EW-2026-XXXX)', 'CategoryId, Quantity, WeightKg', 'Condition, PreferredDate, TimeSlot', 'Status, AssignedAgentId, UserNotes']
  },
  {
    name: 'RequestTimeline',
    keys: 'PK: Id  |  FK: RequestId',
    fields: ['Status (Pending ➔ Completed)', 'Note, ChangedByUserId', 'Timestamp, LocationCoordinates']
  },
  {
    name: 'CollectionAgents',
    keys: 'PK: Id  |  FK: UserId',
    fields: ['VehicleNumber, AssignedZone', 'ActivePickupsCount, Rating', 'ServiceCenterId, IsAvailable']
  },
  {
    name: 'ServiceCenters',
    keys: 'PK: Id',
    fields: ['CenterName, Address, City, State', 'Pincode, ContactPhone, HubCapacity']
  },
  {
    name: 'RecyclingBatches',
    keys: 'PK: Id  |  FK: FacilityId',
    fields: ['BatchCode, ItemType, TotalWeight', 'Status, MetalsRecoveredKg, SafeDisposedKg']
  }
];

tables.forEach((t, idx) => {
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  const xPos = 0.8 + col * 4.0;
  const yPos = 1.5 + row * 2.65;

  slide12.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: yPos,
    w: 3.7,
    h: 2.45,
    rectRadius: 0.08,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.primary, width: 1.5 }
  });

  slide12.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: yPos,
    w: 3.7,
    h: 0.45,
    fill: { color: COLORS.primaryDark }
  });

  slide12.addText(`TABLE: ${t.name}`, {
    x: xPos + 0.15,
    y: yPos + 0.08,
    w: 3.4,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true
  });

  slide12.addText(t.keys, {
    x: xPos + 0.15,
    y: yPos + 0.52,
    w: 3.4,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: COLORS.primary,
    bold: true
  });

  slide12.addText(t.fields.map(f => `• ${f}`).join('\n'), {
    x: xPos + 0.15,
    y: yPos + 0.88,
    w: 3.4,
    h: 1.5,
    fontSize: 9.5,
    fontFace: 'Arial',
    color: COLORS.darkText
  });
});

// -------------------------------------------------------------
// SLIDE 13: Technology Stack & Implementation Details
// -------------------------------------------------------------
const slide13 = pres.addSlide();
addSlideHeader(slide13, 'Complete Technology Stack & Libraries', 'Implementation Details', 13);

const techLayers = [
  {
    category: 'Frontend Client',
    tech: 'React 19 + Vite',
    libs: 'React Router v7, Lucide Icons, Modern Vanilla CSS',
    desc: 'Ultra-fast Single Page Application with optimized bundle size, modular component hierarchy, custom CSS design system, and responsive layout.'
  },
  {
    category: 'State & API Client',
    tech: 'Context API + Fetch REST',
    libs: 'EwasteContext, Custom API Layer, Storage Sync',
    desc: 'Universal request wrapper with JWT token insertion, error interceptors, graceful offline fallback to mock datasets, and real-time state reactivity.'
  },
  {
    category: 'Backend Server',
    tech: 'Node.js + Express.js',
    libs: 'CORS, dotenv, jsonwebtoken, bcryptjs, mssql',
    desc: 'Lightweight REST microservice providing secure authentication, role verification middleware, dynamic reporting aggregation, and transaction controllers.'
  },
  {
    category: 'Enterprise Database',
    tech: 'Microsoft SQL Server',
    libs: 'T-SQL Schema, Stored Procedures, ACID Transactions',
    desc: 'Robust relational persistence with foreign key constraints, automated audit timestamping, and indexed lookup by tracking numbers.'
  }
];

techLayers.forEach((tl, i) => {
  const yPos = 1.5 + i * 1.35;
  slide13.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: yPos,
    w: 11.7,
    h: 1.2,
    rectRadius: 0.08,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.cardBorder, width: 1.5 }
  });

  // Left Tag
  slide13.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: yPos,
    w: 2.8,
    h: 1.2,
    fill: { color: COLORS.primaryDark }
  });

  slide13.addText(tl.category, {
    x: 0.9,
    y: yPos + 0.25,
    w: 2.6,
    h: 0.35,
    fontSize: 12,
    fontFace: 'Arial',
    color: 'FFFFFF',
    bold: true
  });

  slide13.addText(tl.tech, {
    x: 0.9,
    y: yPos + 0.65,
    w: 2.6,
    h: 0.35,
    fontSize: 10,
    fontFace: 'Arial',
    color: 'A7F3D0'
  });

  // Right Content
  slide13.addText([
    { text: `Libraries & Tools: `, options: { bold: true, color: COLORS.primary, fontSize: 11 } },
    { text: `${tl.libs}\n`, options: { bold: true, color: COLORS.darkText, fontSize: 11 } },
    { text: tl.desc, options: { color: COLORS.mutedText, fontSize: 10 } }
  ], {
    x: 3.8,
    y: yPos + 0.15,
    w: 8.5,
    h: 0.9,
    fontFace: 'Arial'
  });
});

// -------------------------------------------------------------
// SLIDE 14: Security, Compliance & Green Certification
// -------------------------------------------------------------
const slide14 = pres.addSlide();
addSlideHeader(slide14, 'Security Architecture & Environmental Compliance', 'Security & Standards', 14);

const complianceCards = [
  {
    title: 'Data & Access Security',
    iconColor: '0284C7',
    points: [
      '• Route Guard Protection: Dedicated AdminRoute, AgentRoute, and CitizenRoute guards.',
      '• Token Verification: Bearer JWT validation on all sensitive API mutation endpoints.',
      '• Password Security: Irreversible bcrypt salting and hashing on all registered accounts.',
      '• Zero PII Leaks: Tracking portal exposes only necessary logistics metadata without private citizen details.'
    ]
  },
  {
    title: 'ISO & Environmental Certifications',
    iconColor: '059669',
    points: [
      '• ISO 14001 Standards: Environmental management systems certified at regional collection hubs.',
      '• R2 (Responsible Recycling) Standard: Transparent downstream vendor auditing.',
      '• CPCB Compliance: Central Pollution Control Board authorized hazardous handling.',
      '• Zero-Landfill Guarantee: All components tracked until verified disposal or metal extraction.'
    ]
  },
  {
    title: 'Audit Trail & Green Certificates',
    iconColor: '7C3AED',
    points: [
      '• Immutable Request Timeline: Every transition logged with timestamp, user ID, and notes.',
      '• Verified Recycling Certificate: Digitally generated certificate after completion.',
      '• Eco-Points Reward System: Gamified incentives redeemable for green partner discounts.',
      '• ESG Corporate Reporting: Ready exports for corporate sustainability compliance.'
    ]
  }
];

complianceCards.forEach((cc, idx) => {
  const xPos = 0.8 + idx * 4.0;
  slide14.addShape(pres.ShapeType.roundRect, {
    x: xPos,
    y: 1.5,
    w: 3.7,
    h: 5.2,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: cc.iconColor, width: 1.8 }
  });

  slide14.addText(cc.title, {
    x: xPos + 0.2,
    y: 1.7,
    w: 3.3,
    h: 0.5,
    fontSize: 13,
    fontFace: 'Arial',
    color: cc.iconColor,
    bold: true
  });

  slide14.addText(cc.points.join('\n\n'), {
    x: xPos + 0.2,
    y: 2.3,
    w: 3.3,
    h: 4.2,
    fontSize: 10.5,
    fontFace: 'Arial',
    color: COLORS.darkText
  });
});

// -------------------------------------------------------------
// SLIDE 15: Conclusion & Future Innovation Roadmap
// -------------------------------------------------------------
const slide15 = pres.addSlide();
slide15.background = { color: COLORS.primaryDark };

slide15.addShape(pres.ShapeType.rect, {
  x: 0,
  y: 0,
  w: 13.33,
  h: 7.5,
  fill: { color: COLORS.primaryDark }
});

slide15.addText('FUTURE INNOVATION ROADMAP', {
  x: 0.8,
  y: 0.5,
  w: 8.0,
  h: 0.3,
  fontSize: 11,
  fontFace: 'Arial',
  color: 'A7F3D0',
  bold: true,
  charSpacing: 2
});

slide15.addText('EcoCycle Strategic Expansion & Next Milestones', {
  x: 0.8,
  y: 0.8,
  w: 11.0,
  h: 0.6,
  fontSize: 24,
  fontFace: 'Arial',
  color: 'FFFFFF',
  bold: true
});

const roadmapItems = [
  {
    phase: 'Phase 1: Real-Time Telemetry',
    desc: 'Integration with GPS live tracking on agent electric vans for real-time customer ETA notifications.'
  },
  {
    phase: 'Phase 2: AI Waste Image Recognition',
    desc: 'Mobile camera AI scanning to detect model numbers, estimate weight, and classify hazardous components automatically.'
  },
  {
    phase: 'Phase 3: Blockchain Carbon Credits',
    desc: 'Tokenization of verified recycling certificates into tradeable carbon offset credits on transparent ledgers.'
  },
  {
    phase: 'Phase 4: IoT Smart E-Waste Bins',
    desc: 'Smart collection kiosks installed in universities, IT parks, and apartment complexes with weight sensors.'
  }
];

roadmapItems.forEach((rm, i) => {
  const yPos = 1.7 + i * 1.15;
  slide15.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: yPos,
    w: 11.7,
    h: 0.95,
    rectRadius: 0.08,
    fill: { color: '065F46' },
    line: { color: '34D399', width: 1 }
  });

  slide15.addText(rm.phase, {
    x: 1.1,
    y: yPos + 0.12,
    w: 11.0,
    h: 0.35,
    fontSize: 13,
    fontFace: 'Arial',
    color: '34D399',
    bold: true
  });

  slide15.addText(rm.desc, {
    x: 1.1,
    y: yPos + 0.45,
    w: 11.0,
    h: 0.4,
    fontSize: 10.5,
    fontFace: 'Arial',
    color: 'E0E7FF'
  });
});

// Closing Summary Box
slide15.addShape(pres.ShapeType.roundRect, {
  x: 0.8,
  y: 6.2,
  w: 11.7,
  h: 0.9,
  rectRadius: 0.08,
  fill: { color: '047857' }
});

slide15.addText('Empowering a sustainable, zero-landfill future through transparent technology & certified circular recycling.', {
  x: 1.0,
  y: 6.2,
  w: 11.3,
  h: 0.9,
  fontSize: 13,
  fontFace: 'Arial',
  color: 'FFFFFF',
  bold: true,
  align: 'center',
  valign: 'middle'
});

// Output presentation file
const outputPath = path.resolve(__dirname, '..', 'EcoCycle_Ewaste_Complete_Flow.pptx');
pres.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`SUCCESS: PowerPoint presentation created at ${fileName}`);
  })
  .catch(err => {
    console.error('ERROR creating presentation:', err);
    process.exit(1);
  });
