import React, { useState } from 'react';
import { X, Upload, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export default function ImportExportModal({ isOpen, onClose, onImportData }) {
  const [jsonText, setJsonText] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  if (!isOpen) return null;

  const sampleJson = [
    {
      id: "EXC-1006",
      scenario: "plan-to-produce",
      scenarioTitle: "Plan to Produce - Production Constraint Control Tower",
      sapModule: "SAP PP",
      companyCode: "1100",
      plant: "1105",
      storageLocation: "SL12",
      costCentre: "CC-2286",
      material: "Sterile Vial 50ml",
      businessPartner: "NovaCare Clinics",
      documentNumber: "PO-460099",
      amount: 195000,
      currency: "GBP",
      requestedDate: "2026-11-01",
      status: "Blocked",
      riskLevel: "High",
      owner: "Marco Rossi",
      ageDays: 5,
      slaStatus: "On Track",
      signavioProcess: "Plan to Fulfil > Plan to Produce",
      standardApp: "Manage Production Orders",
      rootCause: "Secondary raw material delay.",
      aiRecommendation: "Expedite shipment from backup supplier.",
      evidence: ["Stock depleted", "Lead time 3 days"],
      timeline: [{ date: "2026-09-20", title: "PO Created", actor: "System", detail: "Created" }],
      attachments: [],
      comments: []
    }
  ];

  const handleValidate = () => {
    try {
      const parsed = JSON.parse(jsonText || JSON.stringify(sampleJson));
      if (!Array.isArray(parsed)) throw new Error("Dataset must be an array of SAP exception objects.");
      
      // Validate mandatory fields
      const invalidItem = parsed.find(item => !item.documentNumber || !item.amount || !item.scenario);
      if (invalidItem) {
        throw new Error("Validation Error: Mandatory fields (documentNumber, amount, scenario) missing in one or more records.");
      }

      setValidationResult({ valid: true, count: parsed.length, data: parsed });
    } catch (err) {
      setValidationResult({ valid: false, error: err.message });
    }
  };

  const handleImport = () => {
    if (validationResult && validationResult.valid) {
      onImportData(validationResult.data);
      onClose();
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '24px', background: '#1e293b', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Upload size={20} color="var(--accent-blue)" /> Import SAP OData / CSV / JSON Dataset
          </h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
          Paste JSON payload or click "Load Sample" to test dataset validation rules before importing into the Control Tower.
        </p>

        <textarea
          rows={10}
          placeholder="Paste SAP JSON records..."
          value={jsonText}
          onChange={(e) => { setJsonText(e.target.value); setValidationResult(null); }}
          style={{
            width: '100%',
            background: 'rgba(15,23,42,0.8)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '12px',
            color: '#f8fafc',
            fontSize: '0.75rem',
            fontFamily: 'JetBrains Mono',
            outline: 'none',
            marginBottom: '14px'
          }}
        />

        {validationResult && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.8rem', background: validationResult.valid ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: validationResult.valid ? '#34d399' : '#fca5a5', border: `1px solid ${validationResult.valid ? '#10b981' : '#ef4444'}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
            {validationResult.valid ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            {validationResult.valid ? `Validation Successful! ${validationResult.count} SAP records ready for ingestion.` : validationResult.error}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={() => setJsonText(JSON.stringify(sampleJson, null, 2))}
            className="btn-secondary"
            style={{ fontSize: '0.75rem' }}
          >
            Load Sample Dataset
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleValidate} className="btn-secondary">
              Validate Rules
            </button>
            <button onClick={handleImport} disabled={!validationResult || !validationResult.valid} className="btn-primary" style={{ opacity: (!validationResult || !validationResult.valid) ? 0.5 : 1 }}>
              Import Dataset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
