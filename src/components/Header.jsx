import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  UserCheck, 
  Bell, 
  Download, 
  Upload, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  Search,
  Sparkles
} from 'lucide-react';
import { PERSONAS } from '../data/sapData';

export default function Header({ 
  selectedPersona, 
  setSelectedPersona, 
  activeScenario, 
  setActiveScenario,
  onOpenImport,
  onExportExcel,
  onExportPDF,
  unreadCount
}) {
  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50, position: 'sticky', top: 0 }}>
      {/* Brand & Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: 'linear-gradient(135deg, #2563eb, #0284c7)', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(37,99,235,0.4)' }}>
          <Cpu size={24} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em' }} className="gradient-text">
              SAP Exception Control Tower
            </h1>
            <span style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(59,130,246,0.3)', fontWeight: 600 }}>
              S/4HANA & Signavio Engine
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Veloce Mobility Components & Crownbridge Commercial Bank Enterprise Workspace
          </p>
        </div>
      </div>

      {/* Process Scenario Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15,23,42,0.6)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
        {[
          { id: 'all', label: 'All Scenarios' },
          { id: 'plan-to-produce', label: 'Plan to Produce' },
          { id: 'contract-management', label: 'Contract Lifecycle' },
          { id: 'inventory-management', label: 'Inventory & Shortage' },
          { id: 'supplier-risk', label: 'Supplier Risk' },
          { id: 'strategic-sourcing', label: 'Strategic Sourcing' }
        ].map(sc => (
          <button
            key={sc.id}
            onClick={() => setActiveScenario(sc.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: activeScenario === sc.id ? 700 : 500,
              background: activeScenario === sc.id ? 'var(--accent-blue)' : 'transparent',
              color: activeScenario === sc.id ? '#ffffff' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {sc.label}
          </button>
        ))}
      </div>

      {/* Action Buttons & Persona Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button onClick={onOpenImport} className="btn-secondary" title="Import CSV/JSON SAP Data">
          <Upload size={16} />
          <span>Import Data</span>
        </button>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={onExportExcel} className="btn-secondary" style={{ padding: '8px 10px' }} title="Export to Excel">
            <Download size={16} color="#10b981" />
            <span style={{ fontSize: '0.75rem' }}>Excel</span>
          </button>
          <button onClick={onExportPDF} className="btn-secondary" style={{ padding: '8px 10px' }} title="Export Executive PDF Report">
            <Download size={16} color="#f43f5e" />
            <span style={{ fontSize: '0.75rem' }}>PDF</span>
          </button>
        </div>

        {/* Persona Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-card)', padding: '4px 10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <UserCheck size={16} color="var(--accent-cyan)" />
          <select 
            value={selectedPersona.id} 
            onChange={(e) => setSelectedPersona(PERSONAS.find(p => p.id === e.target.value))}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '0.8rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
          >
            {PERSONAS.map(p => (
              <option key={p.id} value={p.id} style={{ background: '#1e293b' }}>
                {p.name} ({p.role})
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
