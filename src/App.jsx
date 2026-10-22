import React, { useState } from 'react';
import { FileText, Upload, Brain, CheckCircle, Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzing(true);
    // Simulation of AI Analysis
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        docType: "Real Estate Lease Agreement",
        parties: ["Landlord: Global Assets Ltd", "Tenant: TechCorp LLC"],
        keyTerms: "24 Months Duration, $4,500/month, 5% annual escalation clause.",
        riskLevel: "Low Risk",
        summary: "Standard commercial property contract with clear maintenance obligations."
      });
    }, 2500);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #334155', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Brain style={{ color: '#38bdf8', width: '32px', height: '32px' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>PropDoc <span style={{ color: '#38bdf8' }}>Global AI</span></h1>
        </div>
        <span style={{ fontSize: '12px', backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '20px', border: '1px solid #475569' }}>
          Document Intelligence v1.0
        </span>
      </header>

      {/* Hero Section */}
      <main style={{ maxWidth: '800px', margin: '40px auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>AI Real-Estate Document & Contract Intelligence</h2>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px' }}>
          Upload lease agreements, purchase contracts, or property title deeds for instant AI extraction & risk audit.
        </p>

        {/* File Upload Box */}
        <div style={{ border: '2px dashed #475569', borderRadius: '12px', padding: '40px', backgroundColor: '#1e293b', cursor: 'pointer', marginBottom: '20px' }}>
          <Upload style={{ width: '48px', height: '48px', color: '#38bdf8', marginBottom: '16px' }} />
          <p style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
            {file ? `Selected: ${file.name}` : "Drag & Drop your Real Estate document here"}
          </p>
          <input type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx" style={{ marginTop: '10px' }} />
        </div>

        {/* Action Button */}
        <button 
          onClick={handleAnalyze} 
          disabled={!file || analyzing}
          style={{ 
            backgroundColor: file ? '#0284c7' : '#334155', 
            color: '#ffffff', 
            border: 'none', 
            padding: '14px 32px', 
            borderRadius: '8px', 
            fontSize: '16px', 
            fontWeight: 'bold', 
            cursor: file ? 'pointer' : 'not-allowed',
            width: '100%'
          }}
        >
          {analyzing ? "AI Analyzing Document..." : "Analyze Contract with PropDoc AI"}
        </button>

        {/* Result Showcase */}
        {result && (
          <div style={{ marginTop: '30px', textAlign: 'left', backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #38bdf8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8', marginBottom: '15px' }}>
              <CheckCircle />
              <h3 style={{ margin: 0 }}>Analysis Complete</h3>
            </div>
            <p><strong>Document Type:</strong> {result.docType}</p>
            <p><strong>Parties Involved:</strong> {result.parties.join(', ')}</p>
            <p><strong>Key Terms:</strong> {result.keyTerms}</p>
            <p><strong>Risk Assessment:</strong> <span style={{ color: '#4ade80' }}>{result.riskLevel}</span></p>
            <p style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', color: '#cbd5e1' }}>
              <strong>AI Summary:</strong> {result.summary}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
