import React, { useState } from 'react';
import { 
  FileText, Upload, Brain, CheckCircle, Shield, Sparkles, 
  MessageSquare, Clock, Zap, Check, LayoutDashboard, 
  FolderOpen, Search, Globe, CreditCard, Settings, User, ChevronRight, Bell, DollarSign, Languages, Trash2, Download, Plus 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Commercial_Lease_Agreement_Dubai.pdf', type: 'PDF', size: '2.4 MB', date: '2026-10-21', status: 'Audited' },
    { id: 2, name: 'Property_Deed_London_Holdings.docx', type: 'DOCX', size: '1.1 MB', date: '2026-10-19', status: 'Processed' },
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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#070b14', color: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '270px', backgroundColor: '#0b1324', borderRight: '1px solid #131e32', display: 'flex', flexDirection: 'column', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
          <div style={{ backgroundColor: '#059669', padding: '10px', borderRadius: '10px', display: 'flex', boxShadow: '0 0 15px rgba(5, 150, 105, 0.4)' }}>
            <Brain style={{ color: '#ffffff', width: '22px', height: '22px' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: '#fff' }}>PropDoc Global AI</h1>
            <span style={{ fontSize: '11px', color: '#34d399', fontWeight: '600' }}>AI Document Intelligence</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'analyzer', label: 'Document Analyzer', icon: FileText },
            { id: 'qas', label: 'Document Q&A', icon: MessageSquare },
            { id: 'law', label: 'Jurisdiction-Aware Insights', icon: Globe },
            { id: 'audit', label: 'Audit History', icon: Shield },
            { id: 'billing', label: 'Global Billing', icon: CreditCard },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
                  borderRadius: '10px', border: 'none', background: isActive ? 'linear-gradient(90deg, #0f1f38 0%, #0b1324 100%)' : 'transparent', 
                  color: isActive ? '#34d399' : '#94a3b8', fontWeight: isActive ? '600' : '500', 
                  cursor: 'pointer', textAlign: 'left', width: '100%', transition: '0.2s',
                  borderLeft: isActive ? '3px solid #059669' : '3px solid transparent'
                }}
              >
                <Icon style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '13px' }}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Free Trial Footer Card */}
        <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
            <Clock style={{ width: '14px', height: '14px' }} />
            <span>Free Trial Active</span>
          </div>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 12px 0' }}>5 days remaining on your trial.</p>
          <button onClick={() => setActiveTab('billing')} style={{ width: '100%', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
            Upgrade to Pro
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        
        {/* Top Header matching reference design */}
        <header style={{ height: '75px', borderBottom: '1px solid #131e32', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', backgroundColor: '#0b1324' }}>
          
          {/* Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#070b14', border: '1px solid #1e293b', borderRadius: '10px', padding: '8px 16px', width: '350px', gap: '10px' }}>
            <Search style={{ width: '16px', color: '#64748b' }} />
            <input 
              type="text" 
              placeholder="Search documents, clauses, jurisd..." 
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', outline: 'none', width: '100%' }} 
            />
          </div>

          {/* Right Controls: Currency, Lang, Notifications, User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ backgroundColor: '#070b14', border: '1px solid #1e293b', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
              <span style={{ color: '#34d399', fontWeight: 'bold' }}>$</span> USD
            </div>
            <div style={{ backgroundColor: '#070b14', border: '1px solid #1e293b', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
              <Languages style={{ width: '14px', color: '#34d399' }} /> EN
            </div>
            <div style={{ backgroundColor: '#070b14', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Bell style={{ width: '16px', color: '#94a3b8' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '10px', borderLeft: '1px solid #1e293b' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '13px' }}>
                AM
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Amin Al-Amir</p>
                <span style={{ fontSize: '11px', color: '#34d399' }}>Senior Agent • PRO</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Workspace Container */}
        <div style={{ padding: '32px', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#fff' }}>Dashboard Overview</h2>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>Real-time workspace analytics and AI document processing metrics.</p>
              </div>

              {/* Grid Cards matching the reference design */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' }}>
                
                <div style={{ backgroundColor: '#0b1324', border: '1px solid #131e32', borderRadius: '16px', padding: '28px' }}>
                  <div style={{ backgroundColor: '#0f1f38', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <FileText style={{ color: '#34d399', width: '20px' }} />
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>Documents Analyzed</p>
                  <h3 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{documents.length}</h3>
                </div>

                <div style={{ backgroundColor: '#0b1324', border: '1px solid #131e32', borderRadius: '16px', padding: '28px' }}>
                  <div style={{ backgroundColor: '#1a103c', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <Sparkles style={{ color: '#a78bfa', width: '20px' }} />
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>AI Questions</p>
                  <h3 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', margin: 0 }}>34</h3>
                </div>

                <div style={{ backgroundColor: '#0b1324', border: '1px solid #131e32', borderRadius: '16px', padding: '28px' }}>
                  <div style={{ backgroundColor: '#0f1f38', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <FolderOpen style={{ color: '#38bdf8', width: '20px' }} />
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>Storage Used</p>
                  <h3 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', margin: 0 }}>3.5 GB</h3>
                </div>

                <div style={{ backgroundColor: '#0b1324', border: '1px solid #131e32', borderRadius: '16px', padding: '28px' }}>
                  <div style={{ backgroundColor: '#2a1b0c', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <Zap style={{ color: '#fbbf24', width: '20px' }} />
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 8px 0' }}>Current Plan</p>
                  <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', margin: 0 }}>Free Trial</h3>
                </div>

              </div>
            </div>
          )}

          {/* ANALYZER VIEW */}
          {activeTab === 'analyzer' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#fff' }}>Document Analyzer & RAG Engine</h2>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>Upload contracts and deeds for instant AI auditing and grounded Q&A.</p>

              <div style={{ backgroundColor: '#0b1324', border: '2px dashed #1e293b', borderRadius: '16px', padding: '40px', textAlign: 'center', marginBottom: '24px' }}>
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
                  width: '100%', backgroundColor: file ? '#059669' : '#131e32', 
                  color: file ? '#fff' : '#64748b', border: 'none', padding: '14px', 
                  borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', 
                  cursor: file ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' 
                }}
              >
                <Sparkles style={{ width: '18px', height: '18px' }} />
                {analyzing ? "Running Deep AI RAG Audit..." : "Run AI Contract Intelligence"}
              </button>

              {result && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px' }}>
                  <div style={{ backgroundColor: '#0b1324', border: '1px solid #131e32', borderRadius: '16px', padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>Audited Summary</h3>
                    <p style={{ fontSize: '13px', color: '#cbd5e1' }}><strong>Type:</strong> {result.docType}</p>
                    <p style={{ fontSize: '13px', color: '#cbd5e1' }}><strong>Terms:</strong> {result.keyTerms}</p>
                    <div style={{ backgroundColor: '#131e32', padding: '12px', borderRadius: '8px', marginTop: '12px', color: '#94a3b8', fontSize: '13px' }}>
                      {result.summary}
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#0b1324', border: '1px solid #131e32', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>RAG Q&A Assistant</h3>
                    <div style={{ flex: 1, minHeight: '150px', maxHeight: '180px', overflowY: 'auto', backgroundColor: '#070b14', padding: '12px', borderRadius: '8px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {chatHistory.map((msg, idx) => (
                        <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                          <span style={{ display: 'inline-block', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', backgroundColor: msg.sender === 'user' ? '#059669' : '#131e32', color: '#fff' }}>
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
                        placeholder="Ask about clauses or penalties..."
                        style={{ flex: 1, backgroundColor: '#070b14', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px' }}
                      />
                      <button onClick={handleSendQuestion} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '0 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Ask</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BILLING VIEW */}
          {activeTab === 'billing' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#fff' }}>Global Billing & Subscriptions</h2>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '32px' }}>Secure checkout via Polar.sh for professional real-estate tiers.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {[
                  { name: 'Starter Trial', price: '$49', period: '/mo', desc: 'For independent agents', features: ['50 Uploads/mo', '100 AI Queries', '1 Jurisdiction'] },
                  { name: 'Pro Agent', price: '$199', period: '/mo', desc: 'For active brokers & teams', popular: true, features: ['250 Uploads/mo', '5,000 AI Queries', '12 Jurisdictions', 'Priority Support'] },
                  { name: 'Agency Enterprise', price: '$599', period: '/mo', desc: 'For large real-estate firms', features: ['High-Volume Processing', 'All Jurisdictions', 'Custom Roles & Audit', 'Dedicated Account Mgr'] },
                ].map((plan, i) => (
                  <div key={i} style={{ backgroundColor: '#0b1324', border: plan.popular ? '2px solid #059669' : '1px solid #131e32', borderRadius: '16px', padding: '24px', position: 'relative' }}>
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
                    <button style={{ width: '100%', backgroundColor: plan.popular ? '#059669' : '#131e32', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                      {plan.popular ? 'Subscribe via Polar.sh' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'analyzer' && activeTab !== 'billing' && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <Shield style={{ width: '48px', height: '48px', color: '#059669', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 8px 0' }}>{activeTab.replace('-', ' ').toUpperCase()} Workspace</h3>
              <p style={{ color: '#94a3b8', fontSize: '13px' }}>Enterprise module successfully mapped and ready.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
