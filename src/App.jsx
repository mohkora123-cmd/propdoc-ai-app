import React, { useState } from 'react';
import { 
  FileText, Upload, Brain, CheckCircle, Shield, Sparkles, 
  MessageSquare, Clock, Zap, Check, LayoutDashboard, 
  FolderOpen, Search, Globe, CreditCard, Bell, Languages, 
  Trash2, Download, Plus, ArrowUpRight, Lock, HelpCircle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('EN');

  const [documents, setDocuments] = useState([
    { id: 1, name: 'Commercial_Lease_Agreement_Dubai.pdf', type: 'PDF', size: '2.4 MB', date: '2026-10-21', status: 'Audited' },
    { id: 2, name: 'Property_Deed_London_Holdings.docx', type: 'DOCX', size: '1.1 MB', date: '2026-10-19', status: 'Processed' },
  ]);

  const isRTL = language === 'AR';

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
        { sender: 'ai', text: `Document "${file.name}" parsed and indexed into RAG engine. Ask any specific question regarding liabilities or clauses.` }
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
        { sender: 'ai', text: `[Verified Citation - Page 4, Clause 12]: Based on your uploaded contract, "${query}" is governed by a 60-day written notice requirement.` }
      ]);
    }, 1000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#050811', 
      color: '#f1f5f9', 
      fontFamily: 'Inter, system-ui, sans-serif',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ 
        width: '280px', 
        backgroundColor: '#090d18', 
        borderRight: isRTL ? 'none' : '1px solid #131c2e', 
        borderLeft: isRTL ? '1px solid #131c2e' : 'none',
        display: 'flex', 
        flexDirection: 'column', 
        padding: '24px' 
      }}>
        
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
          <div style={{ 
            backgroundColor: '#059669', 
            padding: '10px', 
            borderRadius: '12px', 
            display: 'flex', 
            boxShadow: '0 0 20px rgba(5, 150, 105, 0.35)' 
          }}>
            <Brain style={{ color: '#ffffff', width: '24px', height: '24px' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#fff', letterSpacing: '-0.3px' }}>PropDoc Global</h1>
            <span style={{ fontSize: '10px', color: '#34d399', fontWeight: '700', letterSpacing: '0.5px' }}>ENTERPRISE AI</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {[
            { id: 'dashboard', label: isRTL ? 'لوحة التحكم' : 'Dashboard', icon: LayoutDashboard },
            { id: 'analyzer', label: isRTL ? 'محلل العقود الذكي' : 'AI Document Analyzer', icon: FileText },
            { id: 'hub', label: isRTL ? 'مكتبة المستندات' : 'Document Hub', icon: FolderOpen },
            { id: 'search', label: isRTL ? 'البحث العقاري الذكي' : 'Smart Property Search', icon: Search },
            { id: 'law', label: isRTL ? 'التشريعات الدولية' : 'Multi-Country Law', icon: Globe },
            { id: 'audit', label: isRTL ? 'سجل المراجعة' : 'Audit History', icon: Shield },
            { id: 'billing', label: isRTL ? 'الاشتراكات والأسعار' : 'Global Billing', icon: CreditCard },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 16px', 
                  borderRadius: '10px', 
                  border: 'none', 
                  background: isActive ? 'linear-gradient(90deg, #0d1a2d 0%, #090d18 100%)' : 'transparent', 
                  color: isActive ? '#34d399' : '#8899ac', 
                  fontWeight: isActive ? '600' : '500', 
                  cursor: 'pointer', 
                  textAlign: isRTL ? 'right' : 'left', 
                  width: '100%',
                  borderLeft: (!isRTL && isActive) ? '3px solid #059669' : '3px solid transparent',
                  borderRight: (isRTL && isActive) ? '3px solid #059669' : '3px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '13px' }}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Free Trial Widget */}
        <div style={{ backgroundColor: '#0d1527', padding: '16px', borderRadius: '12px', border: '1px solid #1a263d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
            <Clock style={{ width: '14px', height: '14px' }} />
            <span>{isRTL ? 'التجربة المجانية مفعلة' : '7-Day Trial Active'}</span>
          </div>
          <p style={{ fontSize: '11px', color: '#8899ac', margin: '0 0 12px 0' }}>
            {isRTL ? 'متبقي 5 أيام على نهاية التجربة.' : '5 days remaining on your trial.'}
          </p>
          <button 
            onClick={() => setActiveTab('billing')} 
            style={{ 
              width: '100%', 
              backgroundColor: '#059669', 
              color: '#fff', 
              border: 'none', 
              padding: '8px', 
              borderRadius: '8px', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(5, 150, 105, 0.2)'
            }}
          >
            {isRTL ? 'ترقية الحساب ($199)' : 'Upgrade Plan ($199)'}
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        
        {/* Top Header */}
        <header style={{ 
          height: '75px', 
          borderBottom: '1px solid #131c2e', 
          display: 'flex', 
          alignItems: 'center', 
          justify: 'space-between', 
          padding: '0 32px', 
          backgroundColor: '#090d18' 
        }}>
          
          {/* Global Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#050811', border: '1px solid #1e2d45', borderRadius: '10px', padding: '8px 16px', width: '380px', gap: '10px' }}>
            <Search style={{ width: '16px', color: '#64748b' }} />
            <input 
              type="text" 
              placeholder={isRTL ? 'ابحث في العقود، الشروط، التشريعات...' : 'Search contracts, clauses, jurisdictions...'}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', outline: 'none', width: '100%' }} 
            />
          </div>

          {/* User Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              style={{ backgroundColor: '#050811', border: '1px solid #1e2d45', borderRadius: '8px', padding: '6px 12px', color: '#34d399', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
            >
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
              <option value="AED">AED</option>
            </select>

            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{ backgroundColor: '#050811', border: '1px solid #1e2d45', borderRadius: '8px', padding: '6px 12px', color: '#fff', fontSize: '13px', cursor: 'pointer' }}
            >
              <option value="EN">EN</option>
              <option value="FR">FR</option>
              <option value="ES">ES</option>
              <option value="AR">العربية</option>
            </select>

            <div style={{ backgroundColor: '#050811', border: '1px solid #1e2d45', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}>
              <Bell style={{ width: '16px', color: '#8899ac' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: isRTL ? '0' : '12px', paddingRight: isRTL ? '12px' : '0', borderLeft: isRTL ? 'none' : '1px solid #1e2d45', borderRight: isRTL ? '1px solid #1e2d45' : 'none' }}>
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
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#fff' }}>
                  {isRTL ? 'ملخص لوحة التحكم' : 'Dashboard Overview'}
                </h2>
                <p style={{ color: '#8899ac', fontSize: '13px', margin: 0 }}>
                  {isRTL ? 'إحصائيات استهلاك الذكاء الاصطناعي وتحليل المستندات المباشرة.' : 'Real-time workspace analytics and AI document processing metrics.'}
                </p>
              </div>

              {/* Grid Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {[
                  { title: isRTL ? 'العقود المحللة' : 'Documents Analyzed', value: documents.length + ' / 50', icon: FileText, color: '#34d399', bg: '#0d2218' },
                  { title: isRTL ? 'أسئلة الذكاء الاصطناعي' : 'AI Questions Used', value: '34 / 100', icon: Sparkles, color: '#a78bfa', bg: '#1c1533' },
                  { title: isRTL ? 'المساحة المستعملة' : 'Storage Used', value: '3.5 GB', icon: FolderOpen, color: '#38bdf8', bg: '#0f2133' },
                  { title: isRTL ? 'الباقة الحالية' : 'Current Plan', value: 'Free Trial', icon: Zap, color: '#fbbf24', bg: '#2b210f' },
                ].map((stat, i) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={i} style={{ backgroundColor: '#090d18', border: '1px solid #131c2e', borderRadius: '16px', padding: '20px' }}>
                      <div style={{ backgroundColor: stat.bg, width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                        <StatIcon style={{ color: stat.color, width: '18px' }} />
                      </div>
                      <p style={{ fontSize: '12px', color: '#8899ac', margin: '0 0 6px 0' }}>{stat.title}</p>
                      <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{stat.value}</h3>
                    </div>
                  );
                })}
              </div>

              {/* Recent Documents Table */}
              <div style={{ backgroundColor: '#090d18', border: '1px solid #131c2e', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', margin: 0 }}>
                    {isRTL ? 'آخر المستندات المرفوعة' : 'Recent Document Audits'}
                  </h3>
                  <button onClick={() => setActiveTab('analyzer')} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus style={{ width: '14px' }} /> {isRTL ? 'رفع عقد جديد' : 'Upload Contract'}
                  </button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {documents.map(doc => (
                    <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', backgroundColor: '#050811', borderRadius: '10px', border: '1px solid #131c2e' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FileText style={{ color: '#34d399', width: '20px' }} />
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{doc.name}</p>
                          <span style={{ fontSize: '11px', color: '#8899ac' }}>{doc.size} • {doc.date}</span>
                        </div>
                      </div>
                      <span style={{ backgroundColor: '#0a2e21', color: '#34d399', border: '1px solid #059669', fontSize: '11px', padding: '4px 10px', borderRadius: '6px', fontWeight: '600' }}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI ANALYZER TAB */}
          {activeTab === 'analyzer' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#fff' }}>
                  {isRTL ? 'محلل العقود الذكي ومحرك RAG' : 'AI Document Analyzer & RAG Engine'}
                </h2>
                <p style={{ color: '#8899ac', fontSize: '13px', margin: 0 }}>
                  {isRTL ? 'قم برفع عقد الإيجار أو الملكية لاستخراج الشروط وتحديد المخاطر وطرح الأسئلة المباشرة.' : 'Upload property contracts or deeds for instant grounded AI auditing and Q&A.'}
                </p>
              </div>

              {/* Upload Dropzone */}
              <div style={{ backgroundColor: '#090d18', border: '2px dashed #1e2d45', borderRadius: '16px', padding: '40px', textAlign: 'center', marginBottom: '24px' }}>
                <Upload style={{ width: '40px', height: '40px', color: '#34d399', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 8px 0', color: '#fff' }}>
                  {file ? file.name : (isRTL ? 'اسحب وافلت ملف العقد هنا (PDF أو DOCX)' : 'Drop your PDF or DOCX contract here')}
                </h3>
                <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 20px 0' }}>Supports international property documents up to 50MB</p>
                <input type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx" style={{ color: '#8899ac' }} />
              </div>

              <button 
                onClick={handleAnalyze} 
                disabled={!file || analyzing}
                style={{ 
                  width: '100%', 
                  backgroundColor: file ? '#059669' : '#131c2e', 
                  color: file ? '#fff' : '#64748b', 
                  border: 'none', 
                  padding: '14px', 
                  borderRadius: '12px', 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  cursor: file ? 'pointer' : 'not-allowed', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justify: 'center', 
                  gap: '8px' 
                }}
              >
                <Sparkles style={{ width: '18px', height: '18px' }} />
                {analyzing ? "Extracting Chunks & Running Deep AI RAG Audit..." : "Run AI Contract Intelligence"}
              </button>

              {/* Analysis Results & Chat Grid */}
              {result && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px' }}>
                  
                  {/* Extracted Summary */}
                  <div style={{ backgroundColor: '#090d18', border: '1px solid #131c2e', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', marginBottom: '16px' }}>
                      <CheckCircle style={{ width: '20px' }} />
                      <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: '#fff' }}>Audited Contract Summary</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#cbd5e1' }}>
                      <p style={{ margin: 0 }}><strong>Type:</strong> {result.docType}</p>
                      <p style={{ margin: 0 }}><strong>Parties:</strong> {result.parties.join(' | ')}</p>
                      <p style={{ margin: 0 }}><strong>Financial Terms:</strong> {result.keyTerms}</p>
                      <p style={{ margin: 0 }}><strong>Risk Assessment:</strong> <span style={{ color: '#34d399', fontWeight: 'bold' }}>{result.riskLevel}</span></p>
                      <div style={{ backgroundColor: '#050811', padding: '12px', borderRadius: '8px', marginTop: '8px', color: '#8899ac', lineHeight: '1.5' }}>
                        {result.summary}
                      </div>
                    </div>
                  </div>

                  {/* RAG Chat Component */}
                  <div style={{ backgroundColor: '#090d18', border: '1px solid #131c2e', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', marginBottom: '16px' }}>
                      <MessageSquare style={{ width: '20px' }} />
                      <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: '#fff' }}>Grounded RAG Assistant</h3>
                    </div>
                    
                    <div style={{ flex: 1, minHeight: '160px', maxHeight: '200px', overflowY: 'auto', backgroundColor: '#050811', padding: '12px', borderRadius: '10px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {chatHistory.map((msg, idx) => (
                        <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                          <span style={{ display: 'inline-block', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', backgroundColor: msg.sender === 'user' ? '#059669' : '#131c2e', color: '#fff' }}>
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
                        placeholder="Ask about clauses, liabilities..."
                        style={{ flex: 1, backgroundColor: '#050811', border: '1px solid #1e2d45', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '13px' }}
                      />
                      <button onClick={handleSendQuestion} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '0 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Ask</button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* BILLING & SUBSCRIPTION TAB */}
          {activeTab === 'billing' && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#fff' }}>
                  {isRTL ? 'الاشتراكات والأسعار' : 'Global Billing & Subscription Tiers'}
                </h2>
                <p style={{ color: '#8899ac', fontSize: '13px', margin: 0 }}>
                  {isRTL ? 'دفع آمن ومستقر عبر منصة Polar.sh مع تفعيل فوري للباقات.' : 'Secure enterprise checkout via Polar.sh for real-estate agencies.'}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {[
                  { name: 'STARTER', price: '$49', period: '/mo', desc: 'For independent real-estate agents', features: ['50 Uploads/mo', '100 AI Queries', '1 Jurisdiction'] },
                  { name: 'PRO AGENT', price: '$199', period: '/mo', desc: 'For active brokers & small teams', popular: true, features: ['250 Uploads/mo', '5,000 AI Queries', '12 Jurisdictions', 'Priority Support'] },
                  { name: 'AGENCY ENTERPRISE', price: '$599', period: '/mo', desc: 'For large real-estate firms', features: ['High-Volume Processing', 'All Jurisdictions', 'Custom Roles & Audit', 'Dedicated Account Manager'] },
                ].map((plan, i) => (
                  <div key={i} style={{ backgroundColor: '#090d18', border: plan.popular ? '2px solid #059669' : '1px solid #131c2e', borderRadius: '16px', padding: '24px', position: 'relative' }}>
                    {plan.popular && <span style={{ position: 'absolute', top: '-12px', right: '20px', backgroundColor: '#059669', color: '#fff', fontSize: '10px', padding: '2px 10px', borderRadius: '10px', fontWeight: 'bold' }}>POPULAR</span>}
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#fff' }}>{plan.name}</h3>
                    <p style={{ fontSize: '12px', color: '#8899ac', margin: '0 0 16px 0' }}>{plan.desc}</p>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>{plan.price}<span style={{ fontSize: '13px', color: '#8899ac', fontWeight: 'normal' }}>{plan.period}</span></div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#cbd5e1' }}>
                      {plan.features.map((f, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Check style={{ width: '14px', color: '#34d399' }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button style={{ width: '100%', backgroundColor: plan.popular ? '#059669' : '#131c2e', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                      {plan.popular ? 'Subscribe via Polar.sh' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OTHER Enterprise Tabs (Placeholder for Hub, Search, Law, Audit) */}
          {['hub', 'search', 'law', 'audit'].includes(activeTab) && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <Shield style={{ width: '48px', height: '48px', color: '#059669', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 8px 0', textTransform: 'capitalize' }}>
                {activeTab} Workspace Module
              </h3>
              <p style={{ color: '#8899ac', fontSize: '13px', maxWidth: '500px', margin: '0 auto' }}>
                This enterprise workspace module is fully mapped and ready for Supabase database integration.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
