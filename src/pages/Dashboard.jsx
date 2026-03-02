import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import '../styles/Dashboard.css';
import '../components/Hero/Hero.css'; 

function Dashboard() {
  const [events, setEvents] = useState([
    { id: 1, location: "مدخل المكتبة الرئيسي", datetime: "15-01-2024, 14:32", status: "قيد الانتظار" },
    { id: 2, location: "سكن الطلاب بلوك ب", datetime: "15-01-2024, 13:15", status: "تم الحل" },
    { id: 3, location: "مختبر كلية الهندسة", datetime: "15-01-2024, 11:48", status: "تم الحل" },
    { id: 4, location: "الكافتيريا المركزية", datetime: "2024-01-14, 22:10", status: "تم الحل" },
  ]);
  
  const [activeButton, setActiveButton] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const handleQuickBtnClick = (buttonName) => {
    setActiveButton(activeButton === buttonName ? null : buttonName);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleMarkResolved = () => {
    setEvents(prev => prev.map(e => selectedRows.includes(e.id) ? { ...e, status: "تم الحل" } : e));
    setSelectedRows([]);
  };

  const handleDeleteSelected = () => {
    setEvents(prev => prev.filter(e => !selectedRows.includes(e.id)));
    setSelectedRows([]);
  };

  const filteredEvents = events.filter(event =>
    !searchQuery ||
    event.location.includes(searchQuery) ||
    event.datetime.includes(searchQuery) ||
    event.status.includes(searchQuery)
  );

  return (
    <div className="dashboard-page">
      {/* --- Navbar --- */}
      <header className="hero-header">
        <div className="hero-header__brand">
          <span className="hero-header__logo-icon hero-header__logo-icon--placeholder" aria-hidden />
          <span className="hero-header__brand-name">حارس ذكي</span>
        </div>
        <nav className="hero-header__nav">
          <Link to="/" className="hero-header__link">الرئيسية</Link>
          <a href="#dashboard" className="hero-header__link" style={{color: '#8b5cf6'}}>لوحة التحكم</a>
          <a href="#monitoring" className="hero-header__link">نظام المراقبة</a>
        </nav>
        <div className="hero-header__actions">
          <button type="button" className="hero-header__icon-btn">
            <span className="hero-header__bell-icon" />
            <span className="hero-header__badge" />
          </button>
          <Link to="/" className="hero-header__login">تسجيل الخروج</Link>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section className="dashboard-hero">
        <h1 className="dashboard-hero__title">لوحة التحكم</h1>
        <p className="dashboard-hero__subtitle">نظام متقدم للمراقبة وإدارة الإشعارات المدعومة بالذكاء الاصطناعي</p>
      </section>
      
      <div className="dashboard-content">
        <h2 className="section-title">تخصيص التنبيهات الخاصة بك</h2>

        {/* --- Notifications Settings --- */}
        <div className="settings-card">
          <div className="settings-card__visual">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>

          <div className="settings-card__form">
            <div className="settings-group">
              <p className="settings-group__title">نوع الإخطار</p>
              <label className="checkbox-item">
                <input type="checkbox" defaultChecked />
                <span>دفع الويب (Twilio)</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" />
                <span>إشعار البريد الإلكتروني</span>
              </label>
            </div>

            <div className="settings-group">
              <p className="settings-group__title">الضوابط السريعة</p>
              <button 
                className={`quick-btn ${activeButton === 'mute' ? 'quick-btn--active' : ''}`}
                onClick={() => handleQuickBtnClick('mute')}
              >
                <span className="quick-btn__icon">
                  <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M23 9l-6 6" />
                    <path d="M17 9l6 6" />
                  </svg>
                </span>
                كتم الإخطارات
              </button>
              <button 
                className={`quick-btn ${activeButton === 'ignore' ? 'quick-btn--active' : ''}`}
                onClick={() => handleQuickBtnClick('ignore')}
              >
                <span className="quick-btn__icon">
                  <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                تجاهل لمدة 1 ساعة
              </button>
            </div>
          </div>

          <div className="settings-card__footer">
            <button className="save-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              حفظ الإعدادات
            </button>
          </div>
        </div>

        {/* --- Events Log --- */}
        <h2 className="section-title">سجلات الأحداث والبحث</h2>
        <div className="events-section">
          <div className="search-bar">
            <button className="search-btn">
              <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              بحث
            </button>
            <div className="search-input-wrapper">
              <input 
                type="text" 
                className="search-input" 
                placeholder="البحث حسب التاريخ أو الموقع أو الكلمة الرئيسية..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          <table className="events-table">
            <thead>
              <tr>
                <th></th>
                <th>الموقع</th>
                <th>التاريخ والوقت</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? filteredEvents.map(event => (
                <tr key={event.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(event.id)}
                      onChange={() => handleRowSelect(event.id)}
                    />
                  </td>
                  <td>{event.location}</td>
                  <td>{event.datetime}</td>
                  <td>
                    <span className={`status-badge status-badge--${event.status === 'قيد الانتظار' ? 'pending' : 'resolved'}`}>
                      {event.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>
                    لا توجد نتائج
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {selectedRows.length > 0 && (
            <div className="quick-actions">
              <span className="quick-actions__count">مختارة: {selectedRows.length} أحداث</span>
              <button className="qa-btn qa-btn--resolve" onClick={handleMarkResolved}>✓ تم الحل</button>
              <button className="qa-btn qa-btn--delete" onClick={handleDeleteSelected}>🗑 حذف السجل</button>
              <button className="qa-btn qa-btn--escalate">▲ تصعيد التنبيه</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;