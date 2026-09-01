import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Package, 
  Calendar, 
  User, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Send,
  Paperclip,
  Share2,
  GitBranch
} from 'lucide-react';

export default function ExceptionDetail({ exception, onUpdateStatus, onAddComment, onAssignOwner }) {
  const [newComment, setNewComment] = useState('');
  const [assignedUser, setAssignedUser] = useState(exception.owner);

  if (!exception) return null;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(exception.id, newComment);
    setNewComment('');
  };

  const handleOwnerChange = (e) => {
    setAssignedUser(e.target.value);
    onAssignOwner(exception.id, e.target.value);
  };

  return (
    <div className="glass-panel custom-scrollbar" style={{ height: '100%', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.8rem', background: 'rgba(59,130,246,0.2)', color: '#60a5fa', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
              {exception.documentNumber}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {exception.scenarioTitle}
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
            {exception.material}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select 
            value={exception.status}
            onChange={(e) => onUpdateStatus(exception.id, e.target.value)}
            style={{
              background: 'rgba(15,23,42,0.8)',
              border: '1px solid var(--border-color)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            <option value="Blocked">Blocked</option>
            <option value="Open">Open</option>
            <option value="Under Review">Under Review</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* SAP Master Data Grid */}
      <div>
        <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', fontWeight: 700 }}>
          SAP Organizational & Master Data Context
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ background: 'rgba(15,23,42,0.5)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Company / Plant</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
              CoCode {exception.companyCode} | Plant {exception.plant}
            </div>
          </div>
          <div style={{ background: 'rgba(15,23,42,0.5)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Storage Loc / Cost Centre</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
              {exception.storageLocation} ({exception.costCentre})
            </div>
          </div>
          <div style={{ background: 'rgba(15,23,42,0.5)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Business Partner / Vendor</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
              {exception.businessPartner}
            </div>
          </div>
          <div style={{ background: 'rgba(15,23,42,0.5)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Financial Exposure</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f87171' }}>
              £{exception.amount.toLocaleString('en-GB')} GBP
            </div>
          </div>
          <div style={{ background: 'rgba(15,23,42,0.5)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Requested Delivery Date</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
              {exception.requestedDate}
            </div>
          </div>
          <div style={{ background: 'rgba(15,23,42,0.5)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Assigned Accountable Owner</div>
            <input 
              type="text"
              value={assignedUser}
              onChange={handleOwnerChange}
              style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', width: '100%', outline: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* SAP Standard Reference App Links */}
      <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px dashed rgba(59,130,246,0.3)', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#93c5fd', fontWeight: 700 }}>
            Standard SAP GUI & Fiori Target App Reference
          </div>
          <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>
            {exception.standardApp}
          </div>
        </div>
        <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => alert(`Redirecting mock session to SAP transaction for ${exception.documentNumber}`)}>
          Launch SAP GUI <ExternalLink size={12} />
        </button>
      </div>

      {/* Process Timeline (Signavio Alignment) */}
      <div>
        <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <GitBranch size={16} color="var(--accent-cyan)" />
          Signavio Process-Timeline & Audit Log ({exception.signavioProcess})
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '12px', borderLeft: '2px solid #334155' }}>
          {exception.timeline.map((step, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-18px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-blue)' }} />
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{step.date} • {step.actor}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>{step.title}</div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{step.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Comments & Collaboration Log */}
      <div>
        <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', fontWeight: 700 }}>
          Resolution Log & Team Comments
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
          {exception.comments.length === 0 ? (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', italic: 'true' }}>No comments recorded yet.</div>
          ) : (
            exception.comments.map((c, idx) => (
              <div key={idx} style={{ background: 'rgba(15,23,42,0.6)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{c.author}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.date}</span>
                </div>
                <div style={{ color: '#f8fafc' }}>{c.text}</div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Add auditable comment or note..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              flex: 1,
              background: 'rgba(15,23,42,0.6)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#ffffff',
              fontSize: '0.8rem',
              outline: 'none'
            }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '8px 14px' }}>
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
