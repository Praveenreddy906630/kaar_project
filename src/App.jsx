import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ExceptionQueue from './components/ExceptionQueue';
import ExceptionDetail from './components/ExceptionDetail';
import AiCopilot from './components/AiCopilot';
import ImportExportModal from './components/ImportExportModal';

import { MOCK_EXCEPTIONS, INITIAL_PERSONA } from './data/sapData';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export default function App() {
  const [exceptions, setExceptions] = useState(MOCK_EXCEPTIONS);
  const [selectedException, setSelectedException] = useState(MOCK_EXCEPTIONS[0]);
  const [selectedPersona, setSelectedPersona] = useState(INITIAL_PERSONA);
  const [activeScenario, setActiveScenario] = useState('all');
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Status update handler
  const handleUpdateStatus = (id, newStatus) => {
    setExceptions(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    if (selectedException && selectedException.id === id) {
      setSelectedException(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Add Comment handler
  const handleAddComment = (id, commentText) => {
    const newComment = {
      author: `${selectedPersona.name}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      text: commentText
    };
    setExceptions(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, comments: [...item.comments, newComment] };
      }
      return item;
    }));
    if (selectedException && selectedException.id === id) {
      setSelectedException(prev => ({ ...prev, comments: [...prev.comments, newComment] }));
    }
  };

  // Assign Owner handler
  const handleAssignOwner = (id, newOwner) => {
    setExceptions(prev => prev.map(item => item.id === id ? { ...item, owner: newOwner } : item));
    if (selectedException && selectedException.id === id) {
      setSelectedException(prev => ({ ...prev, owner: newOwner }));
    }
  };

  // Accept AI Recommendation
  const handleAcceptAi = (id, updatedRecommendation) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const auditEntry = {
      date: timestamp,
      title: "AI Action Executed via SAP OData API",
      actor: `${selectedPersona.name} (AI Copilot)`,
      detail: `Executed recommendation: ${updatedRecommendation}`
    };

    setExceptions(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'Resolved',
          timeline: [...item.timeline, auditEntry]
        };
      }
      return item;
    }));

    if (selectedException && selectedException.id === id) {
      setSelectedException(prev => ({
        ...prev,
        status: 'Resolved',
        timeline: [...prev.timeline, auditEntry]
      }));
    }
  };

  // Reject AI Recommendation
  const handleRejectAi = (id, feedback) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const auditEntry = {
      date: timestamp,
      title: "AI Action Rejected by User",
      actor: `${selectedPersona.name}`,
      detail: `Reason / Feedback logged: ${feedback || 'No feedback provided.'}`
    };

    setExceptions(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          timeline: [...item.timeline, auditEntry]
        };
      }
      return item;
    }));

    if (selectedException && selectedException.id === id) {
      setSelectedException(prev => ({
        ...prev,
        timeline: [...prev.timeline, auditEntry]
      }));
    }
  };

  // Ingest New Data
  const handleImportData = (newRecords) => {
    setExceptions(prev => [...newRecords, ...prev]);
    setSelectedException(newRecords[0]);
  };

  // Export to Excel
  const handleExportExcel = () => {
    const exportData = exceptions.map(item => ({
      "Exception ID": item.id,
      "Scenario": item.scenarioTitle,
      "Document No": item.documentNumber,
      "SAP Module": item.sapModule,
      "Material": item.material,
      "Business Partner": item.businessPartner,
      "Amount (£)": item.amount,
      "Status": item.status,
      "Risk Level": item.riskLevel,
      "Owner": item.owner,
      "Ageing (Days)": item.ageDays
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SAP Exceptions");
    XLSX.writeFile(workbook, `SAP_Exception_Control_Tower_Export_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  // Export Executive PDF Report
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("SAP Exception Control Tower - Executive Report", 14, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    doc.text(`Active Persona: ${selectedPersona.name} (${selectedPersona.role})`, 14, 34);

    let y = 46;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Prioritised Exception Summary:", 14, y);
    y += 8;

    exceptions.forEach((item, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${item.documentNumber} - ${item.material}`, 14, y);
      doc.setFont("helvetica", "normal");
      doc.text(`   Scenario: ${item.scenarioTitle}`, 14, y + 5);
      doc.text(`   Exposure: £${item.amount.toLocaleString()} | Status: ${item.status} | Risk: ${item.riskLevel} | Owner: ${item.owner}`, 14, y + 10);
      doc.text(`   Root Cause: ${item.rootCause}`, 14, y + 15);
      y += 24;
    });

    doc.save(`SAP_Executive_Report_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Header 
        selectedPersona={selectedPersona}
        setSelectedPersona={setSelectedPersona}
        activeScenario={activeScenario}
        setActiveScenario={setActiveScenario}
        onOpenImport={() => setIsImportOpen(true)}
        onExportExcel={handleExportExcel}
        onExportPDF={handleExportPDF}
      />

      <main style={{ flex: 1, padding: '16px 24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* KPI Dashboard */}
        <Dashboard exceptions={exceptions} />

        {/* Workspace 3-Column Layout */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '360px 1fr 400px', gap: '16px', minHeight: 0 }}>
          {/* Column 1: Exception Queue */}
          <ExceptionQueue 
            exceptions={exceptions}
            selectedException={selectedException}
            onSelectException={setSelectedException}
            activeScenario={activeScenario}
          />

          {/* Column 2: Selected Exception Detail */}
          <ExceptionDetail 
            exception={selectedException}
            onUpdateStatus={handleUpdateStatus}
            onAddComment={handleAddComment}
            onAssignOwner={handleAssignOwner}
          />

          {/* Column 3: AI Copilot & Engine */}
          <AiCopilot 
            exception={selectedException}
            onAcceptAi={handleAcceptAi}
            onRejectAi={handleRejectAi}
          />
        </div>
      </main>

      {/* Import Modal */}
      <ImportExportModal 
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportData={handleImportData}
      />
    </div>
  );
}
