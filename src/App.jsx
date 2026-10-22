import React, { useState } from 'react';
import { FileText, Upload, Brain, CheckCircle, Shield, Sparkles, MessageSquare, Clock, Zap, Check } from 'lucide-react';

export default function App() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        docType: "Commercial Lease Agreement",
        parties: ["Landlord: Prime Real Estate LLC", "Tenant: Nexus Tech Solutions"],
        keyTerms: "36 Months, $5,200/month, 3% escalation clause per year.",
        riskLevel: "Low Risk - Standard Clauses",
        summary: "Clear lease terms with standard security deposit & maintenance requirements."
      });
      setChatHistory([
        { sender: 'ai', text: `Document "${file.name}" processed! Ask me any question about clauses, liabilities, or risks.` }
      ]);
    }, 2000);
  };

  const handleSendQuestion = () => {
    if (!chatInput.trim()) return;
    const newHistory = [...chatHistory, { sender: 'user', text: chatInput }];
    setChatHistory(newHistory);
    setChatInput('');

    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { sender: 'ai', text: `Based on your agreement: The contract requires a 60-day notice prior to termination, and the security deposit is fully refundable within 30 days.` }
      ]);
    }, 1200);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      
      {/* 7-Day Trial Banner */}
      <div style={{ backgroundColor: '#0284c7', color: '#ffffff', textAlign: 'center', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <Clock style={{ width: '20px', height: '20px' }} />
        <span>7-Day Free Trial Active (Full Features Unlocked)</span>
      </div>

      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #334155', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Brain style={{ color: '#38bdf8', width: '32px', height: '32px' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>PropDoc <span style={{ color: '#38bdf8' }}>Global AI</span></h1>
        </div>
        <button style={{ backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '8px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Upgrade to Pro
        </button>
      </header>

      <main style={{ maxWidth: '1100px', margin: '40px auto' }}>
        
        {/* Upload & Analysis Section */}
        <section style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>Real Estate Document Intelligence & Interactive Q&A</h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '30px' }}>
            Instant AI lease & contract extraction, risk auditing, and natural language Q&A.
          </p>

          <div style={{ border: '2px dashed #475569', borderRadius: '12px', padding: '30px', backgroundColor: '#1e293b', cursor: 'pointer', marginBottom: '20px' }}>
            <Upload style={{ width: '40px', height: '40px', color: '#38bdf8', marginBottom: '12px' }} />
            <p style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
              {file ? `Selected File: ${file.name}` : "Upload Lease, Contract, or Title Deed (PDF/Word)"}
            </p>
            <input type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
          </div>

          <button 
            onClick={handleAnalyze} 
            disabled={!file || analyzing}
            style={{ 
              backgroundColor: file ? '#0284c7' : '#334155', 
              color: '#ffffff', 
              border: 'none', 
              padding: '12px 28px', 
              borderRadius: '8px', 
              fontSize: '16px', 
              fontWeight: 'bold', 
              cursor: file ? 'pointer' : 'not-allowed',
              width: '100%'
            }}
          >
            {analyzing ? "Analyzing Contract with AI..." : "Run AI Contract Intelligence"}
          </button>
        </section>

        {/* Results & Interactive RAG Q&A */}
        {result && (
          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '60px' }}>
            {/* Extracted Details */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #38bdf8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '15px' }}>
                <CheckCircle />
                <h3 style={{ margin: 0 }}>Contract Summary</h3>
              </div>
              <p><strong>Document Type:</strong> {result.docType}</p>
              <p><strong>Parties:</strong> {result.parties.join(', ')}</p>
              <p><strong>Key Terms:</strong> {result.keyTerms}</p>
              <p><strong>Risk Level:</strong> <span style={{ color: '#4ade80' }}>{result.riskLevel}</span></p>
              <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px', color: '#cbd5e1', marginTop: '10px' }}>
                <strong>AI Audit:</strong> {result.summary}
              </div>
            </div>

            {/* Interactive Q&A Chat */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #475569', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '15px' }}>
                <MessageSquare />
                <h3 style={{ margin: 0 }}>Interactive Document Q&A</h3>
              </div>
              
              <div style={{ flex: 1, minHeight: '150px', maxHeight: '200px', overflowY: 'auto', backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px', marginBottom: '10px' }}>
                {chatHistory.map((msg, index) => (
                  <div key={index} style={{ marginBottom: '8px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                    <span style={{ display: 'inline-block', padding: '6px 12px', borderRadius: '6px', backgroundColor: msg.sender === 'user' ? '#0284c7' : '#334155', color: '#ffffff', fontSize: '13px' }}>
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question about this contract..." 
                  style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }}
                />
                <button onClick={handleSendQuestion} style={{ backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Ask</button>
              </div>
            </div>
          </section>
        )}

        {/* Pricing Tiers Section */}
        <section style={{ marginTop: '60px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '30px' }}>Flexible Subscription Plans</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Free Trial Plan */}
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #475569' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>Starter Trial</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0' }}>$0 <span style={{ fontSize: '14px', color: '#94a3b8' }}>/ 7 days</span></p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', lineHeight: '2' }}>
                <li><Check style={{ width: '16px', color: '#38bdf8', marginRight: '8px' }} /> 5 Document Analyses</li>
                <li><Check style={{ width: '16px', color: '#38bdf8', marginRight: '8px' }} /> Basic Contract Summary</li>
                <li><Check style={{ width: '16px', color: '#38bdf8', marginRight: '8px' }} /> Standard Q&A Chat</li>
              </ul>
              <button style={{ width: '100%', padding: '10px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '6px' }}>Active Plan</button>
            </div>

            {/* Pro Plan */}
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '2px solid #38bdf8', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-12px', right: '20px', backgroundColor: '#38bdf8', color: '#0f172a', fontSize: '12px', padding: '2px 10px', borderRadius: '10px', fontWeight: 'bold' }}>POPULAR</span>
              <h3 style={{ margin: '0 0 10px 0' }}>Pro Agent</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0' }}>$29 <span style={{ fontSize: '14px', color: '#94a3b8' }}>/ month</span></p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', lineHeight: '2' }}>
                <li><Check style={{ width: '16px', color: '#38bdf8', marginRight: '8px' }} /> Unlimited Document RAG</li>
                <li><Check style={{ width: '16px', color: '#38bdf8', marginRight: '8px' }} /> Deep Risk Audit Engine</li>
                <li><Check style={{ width: '16px', color: '#38bdf8', marginRight: '8px' }} /> Export Summary Reports</li>
                <li><Check style={{ width: '16px', color: '#38bdf8', marginRight: '8px' }} /> Priority AI Response Speed</li>
              </ul>
              <button style={{ width: '100%', padding: '10px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Subscribe with Polar</button>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
