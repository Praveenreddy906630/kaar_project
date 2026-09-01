import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Layers,
  Sparkles
} from 'lucide-react';

export default function ExceptionQueue({ exceptions, selectedException, onSelectException, activeScenario }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('amount');

  // Filter & Sort Logic
  const filtered = exceptions.filter(item => {
    const matchesScenario = activeScenario === 'all' || item.scenario === activeScenario;
    const matchesSearch = 
      item.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.businessPartner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === 'all' || item.riskLevel.toLowerCase() === filterRisk.toLowerCase();
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesScenario && matchesSearch && matchesRisk && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'age') return b.ageDays - a.ageDays;
    return 0;
  });

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'blocked': return 'badge-blocked';
      case 'open': return 'badge-open';
      case 'under review': return 'badge-review';
      case 'resolved': return 'badge-resolved';
      default: return 'badge-open';
    }
  };

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Controls Bar */}
      <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--accent-blue)" />
            Prioritised Exception Queue
            <span style={{ fontSize: '0.75rem', background: '#334155', color: '#94a3b8', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>
              {filtered.length} items
            </span>
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sort by:</span>
            <button 
              onClick={() => setSortBy(sortBy === 'amount' ? 'age' : 'amount')}
              className="btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              <ArrowUpDown size={12} />
              {sortBy === 'amount' ? 'Exposure (£)' : 'Ageing (Days)'}
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 140px', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search PO / Material / Partner / Owner..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15,23,42,0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '8px 12px 8px 34px',
                color: 'var(--text-main)',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />
          </div>

          <select 
            value={filterRisk} 
            onChange={(e) => setFilterRisk(e.target.value)}
            style={{
              background: 'rgba(15,23,42,0.6)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '8px',
              color: 'var(--text-main)',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          >
            <option value="all">All Risks</option>
            <option value="critical">Critical Risk</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
          </select>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              background: 'rgba(15,23,42,0.6)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '8px',
              color: 'var(--text-main)',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          >
            <option value="all">All Statuses</option>
            <option value="blocked">Blocked</option>
            <option value="open">Open</option>
            <option value="under review">Under Review</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Exception List Table */}
      <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No exceptions matched your filter criteria.
          </div>
        ) : (
          filtered.map(item => {
            const isSelected = selectedException && selectedException.id === item.id;
            return (
              <div 
                key={item.id}
                onClick={() => onSelectException(item)}
                style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(59,130,246,0.12)' : 'transparent',
                  borderLeft: isSelected ? '4px solid var(--accent-blue)' : '4px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600, fontFamily: 'JetBrains Mono' }}>
                      {item.documentNumber}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                      • {item.sapModule}
                    </span>
                  </div>
                  <span className={`sap-badge ${getStatusBadgeClass(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                  {item.material}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>{item.businessPartner}</span>
                  <span style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.85rem' }}>
                    £{item.amount.toLocaleString('en-GB')}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', fontSize: '0.72rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: item.riskLevel === 'Critical' ? '#fca5a5' : '#fde047' }}>
                    <AlertTriangle size={12} /> {item.riskLevel} Risk
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: item.ageDays > 14 ? '#ef4444' : 'var(--text-muted)' }}>
                    <Clock size={12} /> {item.ageDays}d old
                  </span>
                  <span style={{ marginLeft: 'auto', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                    Details <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
