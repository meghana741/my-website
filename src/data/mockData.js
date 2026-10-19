// Initial Mock Seed Data for EcoCycle E-Waste Management Portal

export const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    role: 'citizen',
    joinedDate: '2026-01-15',
    totalRequests: 4,
    totalWeightKg: 24.5,
    ecoPoints: 340,
    status: 'Active',
    address: 'Flat 402, Green Meadows Residency, Indiranagar',
    city: 'Bengaluru'
  },
  {
    id: 'usr-2',
    name: 'Neha Verma',
    email: 'neha.verma@example.com',
    phone: '+91 98123 45678',
    role: 'citizen',
    joinedDate: '2026-03-02',
    totalRequests: 2,
    totalWeightKg: 9.8,
    ecoPoints: 150,
    status: 'Active',
    address: 'B-12, Sector 14, HSR Layout',
    city: 'Bengaluru'
  },
  {
    id: 'usr-3',
    name: 'Rohit Kulkarni',
    email: 'rohit.k@example.com',
    phone: '+91 97654 32109',
    role: 'citizen',
    joinedDate: '2026-04-10',
    totalRequests: 5,
    totalWeightKg: 38.2,
    ecoPoints: 520,
    status: 'Active',
    address: 'Plot 88, IT Corridor, Whitefield',
    city: 'Bengaluru'
  },
  {
    id: 'usr-admin',
    name: 'Dr. Meera Nambiar',
    email: 'admin@ecocycle.org',
    phone: '+91 98000 11223',
    role: 'admin',
    joinedDate: '2025-11-01',
    totalRequests: 0,
    totalWeightKg: 0,
    ecoPoints: 1200,
    status: 'Active',
    address: 'EcoCycle Central HQ, Koramangala',
    city: 'Bengaluru'
  }
];

export const INITIAL_AGENTS = [
  {
    id: 'ag-1',
    name: 'Vikram Patel',
    phone: '+91 98201 55432',
    vehicleNumber: 'KA-05-EV-4412 (Electric Van)',
    zone: 'East Bengaluru (Indiranagar, Whitefield)',
    activePickups: 3,
    rating: 4.9
  },
  {
    id: 'ag-2',
    name: 'Priya Sharma',
    phone: '+91 98334 77890',
    vehicleNumber: 'KA-01-EV-8821 (Electric Mini Truck)',
    zone: 'South Bengaluru (Koramangala, HSR, Jayanagar)',
    activePickups: 2,
    rating: 4.8
  },
  {
    id: 'ag-3',
    name: 'Rajesh Kumar',
    phone: '+91 98450 11982',
    vehicleNumber: 'KA-03-EV-3109 (Electric Van)',
    zone: 'North & Central Bengaluru (Hebbal, Malleshwaram)',
    activePickups: 1,
    rating: 4.7
  },
  {
    id: 'ag-4',
    name: 'Anita Das',
    phone: '+91 98771 22345',
    vehicleNumber: 'KA-04-EV-9022 (Cargo E-Bike)',
    zone: 'CBD & Tech Parks',
    activePickups: 4,
    rating: 4.95
  }
];

export const RECYCLING_PARTNERS = [
  {
    id: 'rec-1',
    name: 'GreenTech Material Refineries',
    specialty: 'Precious Metals & PCB Recovery (Gold, Copper, Silver)',
    isoCertified: 'ISO 14001:2015 & R2 Certified',
    location: 'Peenya Industrial Area, Phase II',
    capacityTonsPerMonth: 120,
    currentLoad: '72%'
  },
  {
    id: 'rec-2',
    name: 'SafeHaz Hazardous Neutralization Facility',
    specialty: 'Lead Acid Batteries, Lithium-ion Cells, Mercury Phosphor',
    isoCertified: 'CPCB & KSPCB Authorized Hazardous Waste Handler',
    location: 'Doddaballapur Eco Park',
    capacityTonsPerMonth: 85,
    currentLoad: '58%'
  },
  {
    id: 'rec-3',
    name: 'ReNew Tech Hardware Refurbishment Lab',
    specialty: 'Laptops, Monitors, Tablets Second-Life Diagnostics & Upgrades',
    isoCertified: 'Certified Circular Economy Partner',
    location: 'Electronic City Phase 1',
    capacityTonsPerMonth: 50,
    currentLoad: '64%'
  },
  {
    id: 'rec-4',
    name: 'PolyClean Polymer Granulation Works',
    specialty: 'Flame-Retardant ABS, Polycarbonate & Thermoplastics Recycling',
    isoCertified: 'Zero Landfill Accredited',
    location: 'Bidadi Industrial Estate',
    capacityTonsPerMonth: 150,
    currentLoad: '45%'
  }
];

export const INITIAL_REQUESTS = [
  {
    id: 'EW-2026-1042',
    userId: 'usr-1',
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@example.com',
    userPhone: '+91 98765 43210',
    itemName: 'MacBook Pro 15" & Dell 24" UltraSharp Monitor',
    category: 'Computers & Laptops',
    quantity: 2,
    condition: 'Minor Defect (Repairable)',
    weightKg: 5.4,
    address: 'Flat 402, Green Meadows Residency, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    preferredDate: '2026-10-22',
    timeSlot: 'Morning (09:00 AM - 12:00 PM)',
    instructions: 'Items securely placed in original packaging boxes. Buzzer 402 on arrival.',
    status: 'Approved',
    assignedAgentId: null,
    recyclingType: 'Reusable',
    recyclerId: 'rec-3',
    recyclingStatus: 'Awaiting Pickup',
    createdAt: '2026-10-18T09:30:00Z',
    updatedAt: '2026-10-18T14:15:00Z',
    statusHistory: [
      { status: 'Pending', timestamp: '2026-10-18T09:30:00Z', note: 'Request submitted online by citizen.' },
      { status: 'Approved', timestamp: '2026-10-18T14:15:00Z', note: 'Admin verified items. Eligible for refurbishment.' }
    ]
  },
  {
    id: 'EW-2026-1041',
    userId: 'usr-1',
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@example.com',
    userPhone: '+91 98765 43210',
    itemName: 'Samsung Galaxy Note 9 & 2 Vintage Nokia Handsets',
    category: 'Smartphones & Tablets',
    quantity: 3,
    condition: 'Non-working / Scrap (Recycle only)',
    weightKg: 0.85,
    address: 'Flat 402, Green Meadows Residency, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    preferredDate: '2026-10-14',
    timeSlot: 'Afternoon (12:00 PM - 04:00 PM)',
    instructions: 'Batteries removed and packed separately.',
    status: 'Recycling Completed',
    assignedAgentId: 'ag-1',
    recyclingType: 'Recyclable',
    recyclerId: 'rec-1',
    recyclingStatus: 'Completed',
    recoveredMaterials: {
      goldGrams: 0.22,
      silverGrams: 1.45,
      copperGrams: 64,
      plasticsGrams: 420
    },
    certificateNumber: 'CERT-ECO-2026-0982',
    createdAt: '2026-10-12T10:15:00Z',
    updatedAt: '2026-10-17T16:00:00Z',
    statusHistory: [
      { status: 'Pending', timestamp: '2026-10-12T10:15:00Z', note: 'Request submitted by Aarav.' },
      { status: 'Approved', timestamp: '2026-10-12T13:00:00Z', note: 'Approved by EcoCycle admin.' },
      { status: 'Pickup Scheduled', timestamp: '2026-10-13T09:00:00Z', note: 'Assigned to Agent Vikram Patel for Oct 14.' },
      { status: 'Collected', timestamp: '2026-10-14T14:20:00Z', note: 'Doorstep collection completed. Barcode scanned.' },
      { status: 'Sent for Recycling', timestamp: '2026-10-15T11:00:00Z', note: 'Transferred to GreenTech Material Refineries.' },
      { status: 'Recycling Completed', timestamp: '2026-10-17T16:00:00Z', note: 'Refining complete. Green certificate generated.' }
    ]
  },
  {
    id: 'EW-2026-1040',
    userId: 'usr-2',
    userName: 'Neha Verma',
    userEmail: 'neha.verma@example.com',
    userPhone: '+91 98123 45678',
    itemName: 'LG 43-inch Smart LED TV & Set-Top Box',
    category: 'Displays & TVs',
    quantity: 2,
    condition: 'Working (Reusable)',
    weightKg: 10.2,
    address: 'B-12, Sector 14, HSR Layout',
    city: 'Bengaluru',
    pincode: '560102',
    preferredDate: '2026-10-18',
    timeSlot: 'Morning (09:00 AM - 12:00 PM)',
    instructions: 'Display has no scratches, remote included.',
    status: 'Collected',
    assignedAgentId: 'ag-2',
    recyclingType: 'Reusable',
    recyclerId: 'rec-3',
    recyclingStatus: 'Under Diagnostics',
    createdAt: '2026-10-15T11:20:00Z',
    updatedAt: '2026-10-18T10:45:00Z',
    statusHistory: [
      { status: 'Pending', timestamp: '2026-10-15T11:20:00Z', note: 'Request logged.' },
      { status: 'Approved', timestamp: '2026-10-15T16:00:00Z', note: 'Verified by admin.' },
      { status: 'Pickup Scheduled', timestamp: '2026-10-16T10:00:00Z', note: 'Agent Priya Sharma assigned.' },
      { status: 'Collected', timestamp: '2026-10-18T10:45:00Z', note: 'Collected successfully by Priya Sharma.' }
    ]
  },
  {
    id: 'EW-2026-1039',
    userId: 'usr-3',
    userName: 'Rohit Kulkarni',
    userEmail: 'rohit.k@example.com',
    userPhone: '+91 97654 32109',
    itemName: 'Exide 150Ah Inverter Tubular Battery',
    category: 'Batteries & Power',
    quantity: 1,
    condition: 'Non-working / Scrap (Recycle only)',
    weightKg: 28.5,
    address: 'Plot 88, IT Corridor, Whitefield',
    city: 'Bengaluru',
    pincode: '560066',
    preferredDate: '2026-10-16',
    timeSlot: 'Afternoon (12:00 PM - 04:00 PM)',
    instructions: 'Heavy battery, acid vent caps sealed. Please bring trolley.',
    status: 'Sent for Recycling',
    assignedAgentId: 'ag-1',
    recyclingType: 'Hazardous Components',
    recyclerId: 'rec-2',
    recyclingStatus: 'Neutralization Process',
    createdAt: '2026-10-13T14:40:00Z',
    updatedAt: '2026-10-17T13:00:00Z',
    statusHistory: [
      { status: 'Pending', timestamp: '2026-10-13T14:40:00Z', note: 'High hazardous rating identified.' },
      { status: 'Approved', timestamp: '2026-10-13T18:00:00Z', note: 'Approved for priority hazmat containment.' },
      { status: 'Pickup Scheduled', timestamp: '2026-10-14T09:30:00Z', note: 'Special EV transport assigned.' },
      { status: 'Collected', timestamp: '2026-10-16T15:10:00Z', note: 'Safely loaded into hazmat vehicle container.' },
      { status: 'Sent for Recycling', timestamp: '2026-10-17T13:00:00Z', note: 'Delivered to SafeHaz Doddaballapur Facility.' }
    ]
  },
  {
    id: 'EW-2026-1038',
    userId: 'usr-1',
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@example.com',
    userPhone: '+91 98765 43210',
    itemName: 'Bundle of Copper Ethernet, HDMI & Power Cords',
    category: 'Cables & Accessories',
    quantity: 16,
    condition: 'Mixed (Non-working)',
    weightKg: 3.1,
    address: 'Flat 402, Green Meadows Residency, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    preferredDate: '2026-10-24',
    timeSlot: 'Evening (04:00 PM - 07:00 PM)',
    instructions: 'Placed in a green reusable tote bag near door.',
    status: 'Pending',
    assignedAgentId: null,
    recyclingType: 'Recyclable',
    recyclerId: 'rec-4',
    recyclingStatus: 'Pending Verification',
    createdAt: '2026-10-18T18:45:00Z',
    updatedAt: '2026-10-18T18:45:00Z',
    statusHistory: [
      { status: 'Pending', timestamp: '2026-10-18T18:45:00Z', note: 'Request submitted online. Pending review.' }
    ]
  },
  {
    id: 'EW-2026-1037',
    userId: 'usr-3',
    userName: 'Rohit Kulkarni',
    userEmail: 'rohit.k@example.com',
    userPhone: '+91 97654 32109',
    itemName: 'HP LaserJet Pro M404n & 2 Toner Cartridges',
    category: 'Printers & Office Tech',
    quantity: 3,
    condition: 'Minor Defect (Repairable)',
    weightKg: 9.7,
    address: 'Plot 88, IT Corridor, Whitefield',
    city: 'Bengaluru',
    pincode: '560066',
    preferredDate: '2026-10-21',
    timeSlot: 'Morning (09:00 AM - 12:00 PM)',
    instructions: 'Toner sealed in polybags. Office security pass not required.',
    status: 'Pickup Scheduled',
    assignedAgentId: 'ag-2',
    recyclingType: 'Reusable',
    recyclerId: 'rec-3',
    recyclingStatus: 'Scheduled',
    createdAt: '2026-10-16T08:00:00Z',
    updatedAt: '2026-10-17T11:20:00Z',
    statusHistory: [
      { status: 'Pending', timestamp: '2026-10-16T08:00:00Z', note: 'Logged by Rohit.' },
      { status: 'Approved', timestamp: '2026-10-16T15:30:00Z', note: 'Approved by EcoCycle admin.' },
      { status: 'Pickup Scheduled', timestamp: '2026-10-17T11:20:00Z', note: 'Agent Priya Sharma scheduled for Oct 21.' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'usr-1',
    title: 'Recycling Certificate Ready! 🌿',
    message: 'Your e-waste request EW-2026-1041 has been completely recycled by GreenTech. Certificate #CERT-ECO-2026-0982 is ready for download.',
    type: 'success',
    timestamp: '2026-10-17T16:05:00Z',
    read: false,
    requestId: 'EW-2026-1041'
  },
  {
    id: 'notif-2',
    userId: 'usr-1',
    title: 'Pickup Request Approved ✅',
    message: 'Request EW-2026-1042 for MacBook Pro 15" has been approved! We will assign a collection agent shortly.',
    type: 'info',
    timestamp: '2026-10-18T14:16:00Z',
    read: false,
    requestId: 'EW-2026-1042'
  },
  {
    id: 'notif-3',
    userId: 'usr-3',
    title: 'Agent Assigned for Pickup 🚚',
    message: 'Agent Priya Sharma has been assigned for pickup EW-2026-1037 on Oct 21, 09:00 AM - 12:00 PM.',
    type: 'info',
    timestamp: '2026-10-17T11:21:00Z',
    read: true,
    requestId: 'EW-2026-1037'
  },
  {
    id: 'notif-4',
    userId: 'usr-2',
    title: 'E-Waste Collected 🎉',
    message: 'Pickup EW-2026-1040 (LG 43" Smart LED TV) has been collected and safely transported to diagnostics.',
    type: 'success',
    timestamp: '2026-10-18T10:46:00Z',
    read: true,
    requestId: 'EW-2026-1040'
  },
  {
    id: 'notif-5',
    userId: 'usr-admin',
    title: 'New Pickup Request Pending Review ⚠️',
    message: 'Aarav Sharma submitted request EW-2026-1038 for 16 Cables & Adapters requiring validation.',
    type: 'warning',
    timestamp: '2026-10-18T18:46:00Z',
    read: false,
    requestId: 'EW-2026-1038'
  }
];

export const ACCEPTED_CATEGORIES = [
  {
    id: 'cat-phones',
    name: 'Smartphones & Tablets',
    icon: 'Smartphone',
    avgWeightKg: 0.25,
    co2PerKg: 18.2,
    goldGramsPerKg: 0.35,
    copperGramsPerKg: 130,
    acceptedItems: ['iPhones & Android phones', 'iPads & Android tablets', 'Feature phones', 'E-readers'],
    recyclingGuideline: 'Please remove SIM cards, back up personal data, and perform a factory reset if the device still powers on.'
  },
  {
    id: 'cat-computers',
    name: 'Computers & Laptops',
    icon: 'Laptop',
    avgWeightKg: 2.8,
    co2PerKg: 24.5,
    goldGramsPerKg: 0.28,
    copperGramsPerKg: 240,
    acceptedItems: ['Laptops & MacBooks', 'Desktop CPUs & Towers', 'Workstations', 'Mini PCs'],
    recyclingGuideline: 'Storage disks are wiped using DoD 5220.22-M compliant data sanitization or degaussed before shredding.'
  },
  {
    id: 'cat-displays',
    name: 'Displays & TVs',
    icon: 'Tv',
    avgWeightKg: 8.5,
    co2PerKg: 15.0,
    goldGramsPerKg: 0.05,
    copperGramsPerKg: 95,
    acceptedItems: ['LED & LCD Monitors', 'Smart TVs & CRTs', 'Curved Gaming Displays', 'Digital Signage'],
    recyclingGuideline: 'Ensure screen glass is not shattered. Handle with care to prevent mercury vapor release in older CCFL backlit units.'
  },
  {
    id: 'cat-appliances',
    name: 'Home Appliances',
    icon: 'Refrigerator',
    avgWeightKg: 18.0,
    co2PerKg: 12.3,
    goldGramsPerKg: 0.02,
    copperGramsPerKg: 180,
    acceptedItems: ['Microwaves & Ovens', 'Washing Machines', 'Refrigerators & Freezers', 'Air Conditioners & Purifiers'],
    recyclingGuideline: 'Refrigerant gases (CFC/HFC) are professionally evacuated into sealed tanks before metallic separation.'
  },
  {
    id: 'cat-batteries',
    name: 'Batteries & Power',
    icon: 'BatteryCharging',
    avgWeightKg: 4.5,
    co2PerKg: 21.0,
    goldGramsPerKg: 0.01,
    copperGramsPerKg: 110,
    acceptedItems: ['Lithium-ion Laptop & Phone Batteries', 'Lead-Acid Inverter Batteries', 'UPS Systems & Power Banks', 'AA/AAA Rechargeables'],
    recyclingGuideline: 'Tape the terminals of lithium and lead-acid batteries with electrical tape to avoid accidental short circuits.'
  },
  {
    id: 'cat-cables',
    name: 'Cables & Accessories',
    icon: 'Cable',
    avgWeightKg: 0.4,
    co2PerKg: 9.5,
    goldGramsPerKg: 0.08,
    copperGramsPerKg: 480,
    acceptedItems: ['Power adapters & chargers', 'HDMI, DisplayPort, VGA cables', 'Ethernet LAN cables', 'USB-C / Lightning cords'],
    recyclingGuideline: 'Bundle cables with twist ties or rubber bands. Copper wire is 100% recovered through mechanical stripping.'
  },
  {
    id: 'cat-audio',
    name: 'Audio & Entertainment',
    icon: 'Headphones',
    avgWeightKg: 1.2,
    co2PerKg: 11.0,
    goldGramsPerKg: 0.12,
    copperGramsPerKg: 140,
    acceptedItems: ['Bluetooth Speakers & Soundbars', 'Headphones & Earbuds', 'Gaming Consoles & Controllers', 'Amplifiers & Receivers'],
    recyclingGuideline: 'Neodymium magnets in speaker drivers and lithium batteries in wireless earbuds are extracted and recycled.'
  },
  {
    id: 'cat-printers',
    name: 'Printers & Office Tech',
    icon: 'Printer',
    avgWeightKg: 7.2,
    co2PerKg: 13.8,
    goldGramsPerKg: 0.06,
    copperGramsPerKg: 160,
    acceptedItems: ['LaserJet & Inkjet Printers', 'Scanners & Shredders', 'Projectors', 'Fax & POS Terminals'],
    recyclingGuideline: 'Remove and seal loose ink/toner cartridges into plastic bags to avoid fine particulate emissions.'
  }
];

export const MONTHLY_STATS = [
  { month: 'May 2026', collectedKg: 1240, recycledKg: 1080, reusedKg: 160, co2SavedKg: 21500 },
  { month: 'Jun 2026', collectedKg: 1580, recycledKg: 1390, reusedKg: 190, co2SavedKg: 27400 },
  { month: 'Jul 2026', collectedKg: 1920, recycledKg: 1680, reusedKg: 240, co2SavedKg: 33100 },
  { month: 'Aug 2026', collectedKg: 2450, recycledKg: 2150, reusedKg: 300, co2SavedKg: 42600 },
  { month: 'Sep 2026', collectedKg: 2980, recycledKg: 2620, reusedKg: 360, co2SavedKg: 51800 },
  { month: 'Oct 2026 (MTD)', collectedKg: 3410, recycledKg: 3010, reusedKg: 400, co2SavedKg: 59300 }
];

export const STATUS_STEPS = [
  'Pending',
  'Approved',
  'Pickup Scheduled',
  'Collected',
  'Sent for Recycling',
  'Recycling Completed'
];
