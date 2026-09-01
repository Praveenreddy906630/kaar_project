import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Edit3, 
  XCircle, 
  ShieldCheck, 
  Lightbulb, 
  BrainCircuit,
  MessageSquare
} from 'lucide-react';

export default function AiCopilot({ exception, onAcceptAi, onRejectAi }) {
  const [feedback, setFeedback] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecommendation, setEditedRecommendation] = useState(exception ? exception.aiRecommendation : '');
  const [statusMsg, setStatusMsg] = useState(null);

  if (!exception) return null;

  const handleAccept = () => {
    onAcceptAi(exception.id, isEditing ? editedRecommendation : exception.aiRecommendation);
    setStatusMsg({ type: 'success', text: 'AI recommendation accepted & executed in SAP OData backend!' });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleReject = () => {
    onRejectAi(exception.id, feedback);
    setStatusMsg({ type: 'error', text: 'AI recommendation rejected and logged for LLM guardrail fine-tuning.' });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  return (
    <div className="glass-panel" style={{ height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(129,140,248,0.3)', background: 'linear-gradient(180deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.95) 100%)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', padding: '8px', borderRadius: '8px' }}>
            <BrainCircuit size={20} color="#ffffff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              SAP AI Copilot & Core Engine
            </h3>
            <span style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 600 }}>
              Grounded in Signavio Process Flows & SAP Master Data
            </span>
          </div>
        </div>
        <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '999px', border: '1px solid rgba(16,185,129,0.3)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={12} /> Prompt Guardrails Active
        </span>
      </div>

      {statusMsg && (
        <div style={{ padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.8rem', fontWeight: 600, background: statusMsg.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', color: statusMsg.type === 'success' ? '#6ee7b7' : '#fca5a5', border: `1px solid ${statusMsg.type === 'success' ? '#10b981' : '#ef4444'}` }}>
          {statusMsg.text}
        </div>
      )}

      {/* Root Cause Analysis */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
          Identified Exception Root Cause
        </div>
        <div style={{ background: 'rgba(15,23,42,0.6)', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', color: '#fca5a5', borderLeft: '3px solid #ef4444' }}>
          {exception.rootCause}
        </div>
      </div>

      {/* Evidence & Context */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
          Grounding Evidence & Operational Data
        </div>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {exception.evidence.map((ev, idx) => (
            <li key={idx} style={{ fontSize: '0.78rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.03)', padding: '6px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lightbulb size={14} color="#f59e0b" style={{ shrink: 0 }} />
              <span>{ev}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Next-Best Action */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <div style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 700, textTransform: 'uppercase' }}>
            Recommended Next-Best Action
          </div>
          <button 
            onClick={() => { setIsEditing(!isEditing); setEditedRecommendation(exception.aiRecommendation); }} 
            style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
          >
            <Edit3 size={12} /> {isEditing ? 'Cancel Edit' : 'Edit Action'}
          </button>
        </div>

        {isEditing ? (
          <textarea
            value={editedRecommendation}
            onChange={(e) => setEditedRecommendation(e.target.value)}
            style={{
              width: '100%',
              flex: 1,
              background: 'rgba(15,23,42,0.8)',
              border: '1px solid var(--accent-indigo)',
              borderRadius: '8px',
              padding: '10px',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
              resize: 'none'
            }}
          />
        ) : (
          <div style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', padding: '14px', borderRadius: '8px', fontSize: '0.88rem', color: '#e0e7ff', lineHeight: '1.5', flex: 1 }}>
            {exception.aiRecommendation}
          </div>
        )}
      </div>

      {/* Accept / Edit / Reject Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button 
            onClick={handleAccept} 
            className="btn-primary"
            style={{ justifyContent: 'center', background: 'linear-gradient(135deg, #10b981, #059669)' }}
          >
            <CheckCircle2 size={16} /> Accept & Execute
          </button>

          <button 
            onClick={handleReject} 
            className="btn-secondary"
            style={{ justifyContent: 'center', borderColor: 'rgba(239,68,68,0.4)', color: '#fca5a5' }}
          >
            <XCircle size={16} /> Reject Recommendation
          </button>
        </div>

        <input 
          type="text" 
          placeholder="Optional feedback for AI model evaluation..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          style={{
            background: 'rgba(15,23,42,0.6)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '6px 10px',
            color: '#ffffff',
            fontSize: '0.75rem',
            outline: 'none'
          }}
        />
      </div>
    </div>
  );
}
