import React, { useState } from 'react';
import { 
  FileText, Upload, Brain, CheckCircle, Shield, Sparkles, 
  MessageSquare, Clock, Zap, Check, LayoutDashboard, 
  FolderOpen, Search, Globe, CreditCard, Settings, User, ChevronRight, AlertTriangle 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        docType: "Commercial Lease Agreement (Global Standard)",
        parties: ["Landlord: Prime Global RE Holdings", "Tenant: Nexus Tech International"],
        keyTerms: "36 Months Term | $5,200/mo | 3% Annual Escalation",
        riskLevel: "Low Risk - Standard Legal Safeguards",
        summary: "The agreement incorporates standard commercial protections, a 60-day termination notice clause, and fully refundable security deposit terms within 30 days."
      });
      setChatHistory([
        { sender: 'ai', text: `Document "${file.name}" successfully parsed and indexed into RAG engine. Ask any specific question regarding liabilities, terms, or clauses.` }
      ]);
    }, 2000);
  };

  const handleSendQuestion = () => {
    if (!chatInput.trim()) return;
    setChatHistory(prev => [...prev, { sender: 'user', text: chatInput }]);
    const query = chatInput;
    setChatInput('');
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { sender: 'ai', text: `[Verified Citation - Page 4, Clause 12]: Based on your uploaded contract, "${query}" is governed by a strict 60-day written notice requirement prior to renewal or termination.` }
      ]);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#090d16', color: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', backgroundColor: '#0f172a', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#059669', padding: '8px', borderRadius: '8px', display: 'flex' }}>
            <Brain style={{ color: '#ffffff', width: '24px', height: '24px' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#fff' }}>PropDoc Global</h1>
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '600' }}>ENTERPRISE AI v2.4</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'analyzer', label: 'AI Document Analyzer', icon: FileText },
            { id: 'hub', label: 'Document Hub', icon: FolderOpen },
            { id: 'search', label: 'Smart Property Search', icon: Search },
            { id: 'law', label: 'Multi-Country Law', icon: Globe },
            { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', 
                  borderRadius: '8px', border: 'none', background: isActive ? '#1e293b' : 'transparent', 
                  color: isActive ? '#34d399' : '#94a3b8', fontWeight: isActive ? '600' : '500', 
                  cursor: 'pointer', textAlign: 'left', width: '100%', transition: '0.2s'
                }}
              >
                <Icon style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '14px' }}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Trial Widget */}
        <div style={{ backgroundColor: '#1e293b', padding: '14px', borderRadius: '10px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
            <Clock style={{ width: '14px', height: '14px' }} />
            <span>7-Day Free Trial</span>
          </div>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 10px 0' }}>Full Pro features active. 5 days remaining.</p>
          <button style={{ width: '100%', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
            Upgrade to Pro ($199)
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        
        {/* Top Header */}
        <header style={{ height: '70px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', backgroundColor: '#0f172a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px' }}>
            <span>Workspace</span>
            <ChevronRight style={{ width: '14px', height: '14px' }} />
            <span style={{ color: '#fff', fontWeight: '600', textTransform: 'capitalize' }}>{activeTab.replace('-', ' ')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '13px', backgroundColor: '#065f46', color: '#34d399', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>Secure SSL Session</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%Of', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
              AM
            </div>
          </div>
        </header>

        {/* Dynamic View Container */}
        <div style={{ padding: '32px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          
          {activeTab === 'analyzer' && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#fff' }}>AI Real-Estate Document Analyzer & RAG Engine</h2>
                <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Upload property contracts, deeds, or lease agreements for instant grounded AI auditing and conversational Q&A.</p>
              </div>

              {/* Upload Box */}
              <div style={{ backgroundColor: '#0f172a', border: '2px dashed #334155', borderRadius: '14px', padding: '40px', textAlign: 'center', marginBottom: '24px' }}>
                <Upload style={{ width: '40px', height: '40px', color: '#34d399', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', color: '#fff' }}>
                  {file ? file.name : "Drop your PDF or DOCX contract here"}
                </h3>
                <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>Supports international property documents up to 50MB</p>
                <input type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx" style={{ color: '#94a3b8' }} />
              </div>

              <button 
                onClick={handleAnalyze} 
                disabled={!file || analyzing}
                style={{ 
                  width: '100%', backgroundColor: file ? '#059669' : '#1e293b', 
                  color: file ? '#fff' : '#64748b', border: 'none', padding: '14px', 
                  borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', 
                  cursor: file ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' 
                }}
              >
                <Sparkles style={{ width: '18px', height: '18px' }} />
                {analyzing ? "Extracting Chunks & Running Deep AI RAG Audit..." : "Run AI Contract Intelligence"}
              </button>

              {/* Results & Chat Grid */}
              {result && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px' }}>
                  
                  {/* Summary Box */}
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', marginBottom: '16px' }}>
                      <CheckCircle style={{ width: '20px', height: '20px' }} />
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#fff' }}>Audited Contract Summary</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#cbd5e1' }}>
                      <p style={{ margin: 0 }}><strong>Document Type:</strong> {result.docType}</p>
                      <p style={{ margin: 0 }}><strong>Parties:</strong> {result.parties.join(' | ')}</p>
                      <p style={{ margin: 0 }}><strong>Financial Terms:</strong> {result.keyTerms}</p>
                      <p style={{ margin: 0 }}><strong>Risk Evaluation:</strong> <span style={{ color: '#34d399', fontWeight: '600' }}>{result.riskLevel}</span></p>
                      <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '8px', marginTop: '8px', color: '#94a3b8', lineHeight: '1.5' }}>
                        {result.summary}
                      </div>
                    </div>
                  </div>

                  {/* Chat RAG Box */}
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', marginBottom: '16px' }}>
                      <MessageSquare style={{ width: '20px', height: '20px' }} />
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#fff' }}>Grounded RAG Q&A</h3>
                    </div>

                    <div style={{ flex: 1, minHeight: '180px', maxHeight: '220px', overflowY: 'auto', backgroundColor: '#1e293b', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {chatHistory.map((msg, idx) => (
                        <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                          <div style={{ 
                            display: 'inline-block', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', 
                            backgroundColor: msg.sender === 'user' ? '#059669' : '#0f172a', color: '#fff', maxWidth: '90%', textAlign: 'left' 
                          }}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about clauses, penalties, or dates..."
                        style={{ flex: 1, backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px' }}
                      />
                      <button onClick={handleSendQuestion} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '0 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Ask</button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

          {activeTab === 'billing' && (
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#fff' }}>Subscription Plans & Polar.sh Checkout</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '32px' }}>Choose the ideal tier for your real-estate brokerage or agency operations.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {[
                  { name: 'Starter Trial', price: '$49', period: '/mo', desc: 'For independent agents', features: ['50 Uploads/mo', '100 AI Queries', '1 Jurisdiction'] },
                  { name: 'Pro Agent', price: '$199', period: '/mo', desc: 'For active brokers & teams', popular: true, features: ['250 Uploads/mo', '5,000 AI Queries', '12 Jurisdictions', 'Priority Support'] },
                  { name: 'Agency Enterprise', price: '$599', period: '/mo', desc: 'For large real-estate firms', features: ['High-Volume Processing', 'All Jurisdictions', 'Custom Roles & Audit', 'Dedicated Account Mgr'] },
                ].map((plan, i) => (
                  <div key={i} style={{ backgroundColor: '#0f172a', border: plan.popular ? '2px solid #059669' : '1px solid #1e293b', borderRadius: '12px', padding: '24px', position: 'relative' }}>
                    {plan.popular && <span style={{ position: 'absolute', top: '-12px', right: '20px', backgroundColor: '#059669', color: '#fff', fontSize: '11px', padding: '2px 10px', borderRadius: '10px', fontWeight: 'bold' }}>POPULAR</span>}
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#fff' }}>{plan.name}</h3>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 16px 0' }}>{plan.desc}</p>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>{plan.price}<span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 'normal' }}>{plan.period}</span></div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#cbd5e1' }}>
                      {plan.features.map((f, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Check style={{ width: '14px', color: '#34d399' }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button style={{ width: '100%', backgroundColor: plan.popular ? '#059669' : '#1e293b', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                      {plan.popular ? 'Subscribe via Polar.sh' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'analyzer' && activeTab !== 'billing' && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <Shield style={{ width: '48px', height: '48px', color: '#059669', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 8px 0' }}>{activeTab.replace('-', ' ').toUpperCase()} Workspace</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>This enterprise module is fully mapped and ready for database integration.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
