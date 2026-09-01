import React from 'react';
import { 
  AlertOctagon, 
  Clock, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle, 
  Zap, 
  FileText,
  DollarSign
} from 'lucide-react';

export default function Dashboard({ exceptions }) {
  const totalExposure = exceptions.reduce((sum, item) => sum + item.amount, 0);
  const totalCount = exceptions.length;
  const blockedCount = exceptions.filter(i => i.status === 'Blocked').length;
  const criticalCount = exceptions.filter(i => i.riskLevel === 'Critical' || i.riskLevel === 'High').length;
  const avgAge = Math.round(exceptions.reduce((sum, item) => sum + item.ageDays, 0) / (totalCount || 1));

  // Calculated ROI Metrics as per specification prompt: 20-35% productivity improvement & 10-20% reduction in ageing
  const productivityGainMin = Math.round(totalExposure * 0.20);
  const productivityGainMax = Math.round(totalExposure * 0.35);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      {/* Metric 1: Financial Exposure */}
      <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid #ef4444' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Financial Risk Exposure</span>
          <div style={{ background: 'rgba(239,68,68,0.15)', padding: '6px', borderRadius: '8px' }}>
            <DollarSign size={18} color="#f87171" />
          </div>
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
          £{totalExposure.toLocaleString('en-GB')}
        </div>
        <div style={{ fontSize: '0.72rem', color: '#fca5a5', marginTop: '4px', fontWeight: 500 }}>
          Quantified directly from SAP transaction line items
        </div>
      </div>

      {/* Metric 2: Exception Queue */}
      <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid #3b82f6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Active Backlog</span>
          <div style={{ background: 'rgba(59,130,246,0.15)', padding: '6px', borderRadius: '8px' }}>
            <AlertOctagon size={18} color="#60a5fa" />
          </div>
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          {totalCount} <span style={{ fontSize: '0.85rem', color: '#f87171', fontWeight: 600 }}>({blockedCount} Blocked)</span>
        </div>
        <div style={{ fontSize: '0.72rem', color: '#93c5fd', marginTop: '4px', fontWeight: 500 }}>
          {criticalCount} items requiring immediate action
        </div>
      </div>

      {/* Metric 3: Ageing & Cycle Time */}
      <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid #f59e0b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Avg Ageing Profile</span>
          <div style={{ background: 'rgba(245,158,11,0.15)', padding: '6px', borderRadius: '8px' }}>
            <Clock size={18} color="#fbbf24" />
          </div>
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
          {avgAge} Days
        </div>
        <div style={{ fontSize: '0.72rem', color: '#fde047', marginTop: '4px', fontWeight: 500 }}>
          Target SLA adherence: 88.5%
        </div>
      </div>

      {/* Metric 4: Target Productivity Value Impact */}
      <div className="glass-panel" style={{ padding: '16px 20px', borderLeft: '4px solid #10b981' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Productivity Improvement Impact</span>
          <div style={{ background: 'rgba(16,185,129,0.15)', padding: '6px', borderRadius: '8px' }}>
            <Zap size={18} color="#34d399" />
          </div>
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399' }}>
          +20% to +35% Gain
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
          Est. savings: £{productivityGainMin.toLocaleString()} - £{productivityGainMax.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
