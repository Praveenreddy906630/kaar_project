export const MOCK_EXCEPTIONS = [
  {
    id: "EXC-1001",
    scenario: "plan-to-produce",
    scenarioTitle: "Plan to Produce - Production Constraint Control Tower",
    sapModule: "SAP PP",
    companyCode: "1100",
    plant: "1105",
    storageLocation: "SL12",
    costCentre: "CC-2286",
    material: "Sterile Vial 20ml",
    businessPartner: "NovaCare Clinics",
    documentNumber: "PO-460086",
    amount: 130750,
    currency: "GBP",
    requestedDate: "2026-10-11",
    status: "Blocked",
    riskLevel: "High",
    owner: "Marco Rossi (Production Lead)",
    ageDays: 14,
    slaStatus: "At Risk",
    signavioProcess: "Plan to Fulfil > Plan to Produce (BJ5)",
    standardApp: "Manage Production Orders (MD04 / COO1 / COO2)",
    rootCause: "Unresolved component bottleneck & capacity overload on Line 3. Master data routing missing secondary work center allocation.",
    aiRecommendation: "Re-route production order PO-460086 to Alternate Work Center WC-402 and trigger automatic MRP run for packaging material.",
    evidence: [
      "Work Center WC-301 capacity is at 118% load until 2026-10-15.",
      "Alternative Work Center WC-402 is operating at 42% capacity with compatible tooling.",
      "Financial risk exposure: £130,750 blocked with penalty of £2,500/day after 2026-10-12."
    ],
    timeline: [
      { date: "2026-09-18 09:00", title: "PO Created in SAP PP", actor: "System", detail: "Order PO-460086 created for 50,000 units." },
      { date: "2026-09-18 11:30", title: "Signavio Flow Gate Failed", actor: "Signavio BPM", detail: "Capacity check failed at step BJ5.04." },
      { date: "2026-09-19 08:15", title: "Exception Flagged", actor: "Control Tower AI", detail: "Status changed to Blocked due to 14 days aging." }
    ],
    attachments: [
      { name: "Production_Order_MD04.pdf", size: "420 KB", uploadDate: "2026-09-18" },
      { name: "Capacity_Analysis_WC301.xlsx", size: "1.2 MB", uploadDate: "2026-09-19" }
    ],
    comments: [
      { author: "Marco Rossi", date: "2026-09-19 14:22", text: "Waiting for plant manager approval to switch work center." }
    ]
  },
  {
    id: "EXC-1002",
    scenario: "contract-management",
    scenarioTitle: "Contract Management - Obligation & Renewal Tracking",
    sapModule: "SAP Ariba Contracts",
    companyCode: "1100",
    plant: "1106",
    storageLocation: "SL12",
    costCentre: "CC-2251",
    material: "Sterile Vial 20ml",
    businessPartner: "NovaCare Clinics",
    documentNumber: "PO-460051",
    amount: 82625,
    currency: "GBP",
    requestedDate: "2026-11-16",
    status: "Blocked",
    riskLevel: "Critical",
    owner: "Sarah Jenkins (Procurement Mgr)",
    ageDays: 22,
    slaStatus: "Breached",
    signavioProcess: "Source to Pay > Contract Lifecycle",
    standardApp: "Manage Purchase Contracts (ME31K / ME32K)",
    rootCause: "Target value limit exceeded by 12% on master contract. Renewal agreement approval pending in Ariba Inbox with missing tax clearance certificate.",
    aiRecommendation: "Initiate auto-extension workflow for PO-460051 under pre-approved threshold (£100k limit) and request vendor document upload.",
    evidence: [
      "Contract CTR-8809 reached £82,625 of £75,000 threshold.",
      "Supplier NovaCare Clinics has 98.4% quality compliance rating.",
      "Avoids £15,000 spot-market purchasing premium."
    ],
    timeline: [
      { date: "2026-08-10 10:00", title: "Contract Target Warning", actor: "SAP Ariba", detail: "80% volume threshold reached." },
      { date: "2026-08-25 15:00", title: "PO Blocked on Release", actor: "SAP S/4HANA", detail: "Blocked PO-460051 due to contract credit lock." }
    ],
    attachments: [
      { name: "Ariba_Contract_ME32K.pdf", size: "890 KB", uploadDate: "2026-08-10" }
    ],
    comments: [
      { author: "Sarah Jenkins", date: "2026-08-26 11:00", text: "Legal review completed, pending supplier signature." }
    ]
  },
  {
    id: "EXC-1003",
    scenario: "supplier-risk",
    scenarioTitle: "Supplier Risk & Evaluation Cockpit",
    sapModule: "SAP MM / SLC",
    companyCode: "1000",
    plant: "1108",
    storageLocation: "SL10",
    costCentre: "CC-2235",
    material: "Servo Drive SD-480",
    businessPartner: "Greenford Utilities",
    documentNumber: "SO-460035",
    amount: 60625,
    currency: "GBP",
    requestedDate: "2026-11-20",
    status: "Open",
    riskLevel: "Medium",
    owner: "David Chen (Risk Specialist)",
    ageDays: 8,
    slaStatus: "On Track",
    signavioProcess: "Supplier Lifecycle > Evaluation & Audit",
    standardApp: "Supplier Evaluation by Purchasing Category (ME61 / ME63)",
    rootCause: "Late delivery score dropped below 65%. On-time delivery SLA missed on last 3 consignments.",
    aiRecommendation: "Trigger targeted audit task for Greenford Utilities and apply 5% temporary risk buffer on procurement lead times.",
    evidence: [
      "Vendor delivery score fell from 88 to 61 in Q3.",
      "Order SO-460035 (£60,625) impacted by delayed arrival date."
    ],
    timeline: [
      { date: "2026-08-24 08:30", title: "ME61 Score Generated", actor: "SAP MM", detail: "Evaluation score 61/100 (Below Target)." }
    ],
    attachments: [
      { name: "Supplier_Scorecard_ME63.pdf", size: "310 KB", uploadDate: "2026-08-24" }
    ],
    comments: []
  },
  {
    id: "EXC-1004",
    scenario: "inventory-management",
    scenarioTitle: "Inventory Management - Slow-Moving & Shortage",
    sapModule: "SAP MM / WM",
    companyCode: "1100",
    plant: "1105",
    storageLocation: "SL04",
    costCentre: "CC-1102",
    material: "Titanium Brake Rotors EV-9",
    businessPartner: "Veloce Internal Logistics",
    documentNumber: "INV-998201",
    amount: 215000,
    currency: "GBP",
    requestedDate: "2026-12-01",
    status: "Blocked",
    riskLevel: "High",
    owner: "Elena Rostova (Inventory Lead)",
    ageDays: 45,
    slaStatus: "Breached",
    signavioProcess: "Plan to Fulfil > Inventory Optimisation",
    standardApp: "Stock Overview & Goods Movement (MB52 / MD04)",
    rootCause: "Slow-moving inventory idle for >180 days with excess working capital lockup. Risk of material obsolescence.",
    aiRecommendation: "Reallocate 450 units to Plant 1106 which currently reports a shortage of EV-9 components for Q4 production.",
    evidence: [
      "Stock holding cost: £1,200/month.",
      "Plant 1106 has active backorder demand for EV-9 rotors."
    ],
    timeline: [
      { date: "2026-07-15 10:00", title: "Slow Moving Alert Flagged", actor: "Control Tower Engine", detail: "Idle time surpassed 180 days." }
    ],
    attachments: [
      { name: "MB52_Stock_Aging_Report.xlsx", size: "2.4 MB", uploadDate: "2026-07-15" }
    ],
    comments: []
  },
  {
    id: "EXC-1005",
    scenario: "strategic-sourcing",
    scenarioTitle: "Strategic Sourcing Event & RFQ Bottleneck",
    sapModule: "SAP Ariba Sourcing",
    companyCode: "1400",
    plant: "1100",
    storageLocation: "SL12",
    costCentre: "CC-2209",
    material: "Smart Meter SM-8",
    businessPartner: "Cobalt Engineering",
    documentNumber: "SRV-460009",
    amount: 24875,
    currency: "GBP",
    requestedDate: "2026-09-14",
    status: "Awaiting Approval",
    riskLevel: "Medium",
    owner: "Alex Wright (Category Mgr)",
    ageDays: 11,
    slaStatus: "On Track",
    signavioProcess: "Source to Contract > Strategic Sourcing",
    standardApp: "Manage Sourcing Events (ME41 / ME47)",
    rootCause: "Single-source bid discrepancy. Recommended supplier bid exceeds baseline estimate by 18%.",
    aiRecommendation: "Approve SRV-460009 exception under volume variance rule or initiate e-Auction round 2.",
    evidence: [
      "Historical unit cost: £340. Current bid: £401.",
      "Market commodity index for silicon down 3.2%."
    ],
    timeline: [
      { date: "2026-08-20 14:00", title: "SRV Created in SAP", actor: "SAP Ariba", detail: "Document SRV-460009 created." }
    ],
    attachments: [
      { name: "ME47_Bid_Comparison.pdf", size: "750 KB", uploadDate: "2026-08-20" }
    ],
    comments: []
  }
];

export const INITIAL_PERSONA = {
  id: "planner",
  name: "Operations Planner",
  role: "SAP Business User",
  avatar: "OP"
};

export const PERSONAS = [
  { id: "planner", name: "Operations Planner", role: "SAP Business User", avatar: "OP" },
  { id: "procurement", name: "Procurement Manager", role: "SAP Lead", avatar: "PM" },
  { id: "executive", name: "VP Supply Chain", role: "Executive Board", avatar: "VP" },
  { id: "auditor", name: "Compliance Auditor", role: "SAP Governance", avatar: "CA" }
];
