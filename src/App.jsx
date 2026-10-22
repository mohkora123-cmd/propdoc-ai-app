import React, { useState } from 'react';
import { 
  FileText, Upload, Brain, CheckCircle, Shield, Sparkles, 
  MessageSquare, Clock, Zap, Check, LayoutDashboard, 
  FolderOpen, Search, Globe, CreditCard, Settings, User, ChevronRight, AlertTriangle, Trash2, Download, Plus 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  
  // Mock State for enterprise features
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Commercial_Lease_Agreement_Dubai.pdf', type: 'PDF', size: '2.4 MB', date: '2026-10-21', status: 'Audited' },
    { id: 2, name: 'Property_Deed_London_Holdings.docx', type: 'DOCX', size: '1.1 MB', date: '2026-10-19', status: 'Processed' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [propertyResults, setPropertyResults] = useState([
    { address: 'Marina Gate Tower 2, Dubai', type: 'Commercial Office', price: '$120,000 / yr', area: '1,450 sqft', beds: 'N/A', status: 'Verified in Deed #1' },
    { address: 'Baker Street, London', type: 'Residential Apartment', price: '£2,500 / mo', area: '850 sqft', beds: '2 Beds', status: 'Verified in Deed #2' },
  ]);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setDocuments(prev => [
        { id: prev.length + 1, name: selectedFile.name, type: selectedFile.name.split('.').pop().toUpperCase(), size: '1.8 MB', date: 'Today', status: 'Audited' },
        ...prev
      ]);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        docType: "Commercial Lease & Property Agreement",
        parties: ["Landlord: Global Assets FZ-LLC", "Tenant: PropDoc International"],
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
            <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '600' }}>ENTERPRISE AI SaaS</span>
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
            <span>7-Day Free Trial Active</span>
          </div>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 10px 0' }}>Pro features unlocked. 5 days remaining.</p>
          <button onClick={() => setActiveTab('billing')} style={{ width: '100%', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
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
            <span style={{ fontSize: '13px', backgroundColor: '#065f46', color: '#34d399', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>Secure SSL RAG Session</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
              AM
            </div>
          </div>
        </header>

        {/* Dynamic View Container */}
        <div style={{ padding: '32px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#fff' }}>Dashboard Overview</h2>
                <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Real-time usage metrics, document processing counters, and RAG activity.</p>
              </div>

              {/* Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {[
                  { title: 'Documents Uploaded', value: documents.length + ' / 50', desc: 'Starter Trial Quota' },
                  { title: 'AI Questions Used', value: '34 / 100', desc: 'Grounded RAG Queries' },
                  { title: 'Jurisdictions', value: '1 Active', desc: 'Global Coverage' },
                  { title: 'Trial Status', value: '5 Days Left', desc: 'Full Pro Features' },
                ].map((stat, i) => (
                  <div key={i} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>{stat.title}</p>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>{stat.value}</h3>
                    <span style={{ fontSize: '11px', color: '#10b981' }}>{stat.desc}</span>
                  </div>
                ))}
              </div>

              {/* Quick Actions & Recent */}
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>Recent Document Audits</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {documents.map(doc => (
                    <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#1e293b', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FileText style={{ color: '#34d399', width: '20px', height: '20px' }} />
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#fff', margin: 0 }}>{doc.name}</p>
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>{doc.size} • {doc.date}</span>
                        </div>
                      </div>
                      <span style={{ backgroundColor: '#065f46', color: '#34d399', fontSize: '12px', padding: '4px 10px', borderRadius: '6px', fontWeight: '600' }}>{doc.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI ANALYZER VIEW */}
          {activeTab === 'analyzer' && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#fff' }}>AI Real-Estate Document Analyzer & RAG Engine</h2>
                <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Upload property contracts, deeds, or lease agreements for instant grounded AI auditing and conversational Q&A.</p>
              </div>

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

              {result && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px' }}>
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

                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', marginBottom: '16px' }}>
                      <MessageSquare style={{ width: '20px', height: '20px' }} />
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#fff' }}>Grounded RAG Q&A</h3>
                    </div>
                    <div style={{ flex: 1, minHeight: '180px', maxHeight: '220px', overflowY: 'auto', backgroundColor: '#1e293b', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {chatHistory.map((msg, idx) => (
                        <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                          <div style={{ display: 'inline-block', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', backgroundColor: msg.sender === 'user' ? '#059669' : '#0f172a', color: '#fff', maxWidth: '90%', textAlign: 'left' }}>
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

          {/* DOCUMENT HUB VIEW */}
          {activeTab === 'hub' && (
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#fff' }}>Secure Document Hub</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Manage, search, and audit all uploaded real-estate contracts and title deeds.</p>
              
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <input 
                    type="text" 
                    placeholder="Search documents by filename..." 
                    style={{ width: '300px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px' }}
                  />
                  <button onClick={() => setActiveTab('analyzer')} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus style={{ width: '16px' }} /> Upload New Document
                  </button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                      <th style={{ padding: '12px' }}>Filename</th>
                      <th style={{ padding: '12px' }}>Type</th>
                      <th style={{ padding: '12px' }}>Size</th>
                      <th style={{ padding: '12px' }}>Upload Date</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map(doc => (
                      <tr key={doc.id} style={{ borderBottom: '1px solid #1e293b' }}>
                        <td style={{ padding: '14px', color: '#fff', fontWeight: '600' }}>{doc.name}</td>
                        <td style={{ padding: '14px', color: '#94a3b8' }}>{doc.type}</td>
                        <td style={{ padding: '14px', color: '#94a3b8' }}>{doc.size}</td>
                        <td style={{ padding: '14px', color: '#94a3b8' }}>{doc.date}</td>
                        <td style={{ padding: '14px' }}><span style={{ backgroundColor: '#065f46', color: '#34d399', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{doc.status}</span></td>
                        <td style={{ padding: '14px', textAlign: 'right' }}>
                          <button style={{ background: 'transparent', border: 'none', color: '#34d399', cursor: 'pointer', marginRight: '10px' }}><Download style={{ width: '16px' }} /></button>
                          <button style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer' }}><Trash2 style={{ width: '16px' }} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SMART PROPERTY SEARCH VIEW */}
          {activeTab === 'search' && (
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#fff' }}>Smart Property Search</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Query extracted real-estate metrics, pricing, and locations directly from your documents.</p>
              
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  {propertyResults.map((prop, idx) => (
                    <div key={idx} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '12px', backgroundColor: '#059669', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{prop.type}</span>
                        <span style={{ fontSize: '14px', color: '#34d399', fontWeight: 'bold' }}>{prop.price}</span>
                      </div>
                      <h3 style={{ fontSize: '16px', color: '#fff', margin: '0 0 8px 0' }}>{prop.address}</h3>
                      <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 12px 0' }}>Area: {prop.area} • Beds: {prop.beds}</p>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{prop.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MULTI-COUNTRY LAW VIEW */}
          {activeTab === 'law' && (
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#fff' }}>Multi-Country Law & Regulations</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Jurisdiction-aware property document research workspace (Starter: 1, Pro: 12, Agency: All).</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {['United Arab Emirates (Dubai Land Dept)', 'United Kingdom (UK Property Law)', 'United States (State Real Estate Code)', 'France (Code Civil - Immobilier)', 'Saudi Arabia (REGA Regulations)'].map((country, idx) => (
                  <div key={idx} style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '20px' }}>
                    <Globe style={{ color: '#34d399', width: '24px', height: '24px', marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', margin: '0 0 6px 0' }}>{country}</h3>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0' }}>Active regulatory database with verified source citations.</p>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold' }}>Verified & Synced</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BILLING & PLANS VIEW */}
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

        </div>
      </main>
    </div>
  );
}
