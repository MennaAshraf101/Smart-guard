import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import '../styles/Dashboard.css';
import '../components/Hero/Hero.css'; 

function Dashboard() {
  const [activeButton, setActiveButton] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const mockEvents = [
    { id: 1, location: "مدخل المكتبة الرئيسي", datetime: "15-01-2024, 14:32", status: "قيد الانتظار" },
    { id: 2, location: "سكن الطلاب بلوك ب", datetime: "15-01-2024, 13:15", status: "تم الحل" },
    { id: 3, location: "مختبر كلية الهندسة", datetime: "15-01-2024, 11:48", status: "تم الحل" },
    { id: 4, location: "الكافتيريا المركزية", datetime: "2024-01-14, 22:10", status: "تم الحل" },
  ];

  const filterOptions = {
    location: [
      { id: 'main-entrance', label: 'المدخل الرئيسي' },
      { id: 'library', label: 'المكتبة' },
      { id: 'labs', label: 'المختبرات' },
      { id: 'dorms', label: 'السكن الطلابي' },
      { id: 'cafeteria', label: 'الكافتيريا' },
    ],
    datetime: [
      { id: 'today', label: 'اليوم' },
      { id: 'yesterday', label: 'أمس' },
      { id: 'this-week', label: 'هذا الأسبوع' },
      { id: 'this-month', label: 'هذا الشهر' },
      { id: 'custom', label: 'تاريخ مخصص' },
    ],
    status: [
      { id: 'pending', label: 'قيد الانتظار' },
      { id: 'resolved', label: 'تم الحل' },
      { id: 'in-progress', label: 'قيد المعالجة' },
      { id: 'archived', label: 'مؤرشف' },
    ]
  };

  const handleQuickBtnClick = (buttonName) => {
    setActiveButton(activeButton === buttonName ? null : buttonName);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (filterType) => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const clearFilter = () => {
    setActiveFilter(null);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const selectFilterOption = (filterType, option) => {
    // Handle filter selection logic here
    setOpenDropdown(null);
  };

  return (
    <div className="dashboard-page">
      {/* --- Navbar (Modified from your Hero Header) --- */}
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
              {/* Bell Icon */}
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>

          {/* Form */}
          <div className="settings-card__form">
        
            {/* Right: نوع الإخطار */}
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

            {/* Left: الضوابط السريعة */}
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

          {/* Save Button — full width under form */}
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
                <path d="M21.5 21.5a.5.5 0 0 0 .707 0l-4.147 4.147a.5.5 0 0 0-.707-.707l4.147-4.147a.5.5 0 0 0 .707.707Z" />
              </svg>
              يبحث
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
          
          <div className="filter-bar">
            <span className="filter-label">التصفية حسب:</span>
            <div className="filter-buttons">
              <div className="filter-dropdown">
                <button 
                  className={`filter-btn ${activeFilter === 'location' ? 'filter-btn--active-location' : ''}`}
                  onClick={() => toggleDropdown('location')}
                >
                  <span className="filter-btn__text">موقع</span>
                  <span className="filter-btn__icon">
                    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s9-2 9-9-2-9-9-9-9 2-9 9 9-9-9 2-9 9 9z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <svg className="dropdown-arrow" width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18" />
                  </svg>
                </button>
                
                {openDropdown === 'location' && (
                  <div className="dropdown-menu">
                    {filterOptions.location.map(option => (
                      <button
                        key={option.id}
                        className="dropdown-item"
                        onClick={() => selectFilterOption('location', option)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="filter-dropdown">
                <button 
                  className={`filter-btn ${activeFilter === 'datetime' ? 'filter-btn--active-datetime' : ''}`}
                  onClick={() => toggleDropdown('datetime')}
                >
                  <span className="filter-btn__text">التاريخ والوقت</span>
                  <span className="filter-btn__icon">
                    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </span>
                  <svg className="dropdown-arrow" width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18" />
                  </svg>
                </button>
                
                {openDropdown === 'datetime' && (
                  <div className="dropdown-menu">
                    {filterOptions.datetime.map(option => (
                      <button
                        key={option.id}
                        className="dropdown-item"
                        onClick={() => selectFilterOption('datetime', option)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="filter-dropdown">
                <button 
                  className={`filter-btn ${activeFilter === 'status' ? 'filter-btn--active-status' : ''}`}
                  onClick={() => toggleDropdown('status')}
                >
                  <span className="filter-btn__text">حالة</span>
                  <span className="filter-btn__icon">
                    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                  <svg className="dropdown-arrow" width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18" />
                  </svg>
                </button>
                
                {openDropdown === 'status' && (
                  <div className="dropdown-menu">
                    {filterOptions.status.map(option => (
                      <button
                        key={option.id}
                        className="dropdown-item"
                        onClick={() => selectFilterOption('status', option)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {activeFilter && (
            <div className="active-filter-chip">
              <span className="active-filter-text">
                {activeFilter === 'location' && 'موقع'}
                {activeFilter === 'datetime' && 'التاريخ والوقت'}
                {activeFilter === 'status' && 'حالة'}
              </span>
              <button className="active-filter-clear" onClick={clearFilter}>
                مسح ×
              </button>
            </div>
          )}

          <table className="events-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>موقع</th>
                <th>التاريخ والوقت</th>
                <th>حالة</th>
              </tr>
            </thead>
            <tbody>
              {mockEvents.map(event => (
                <tr key={event.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{event.location}</td>
                  <td>{event.datetime}</td>
                  <td>
                    <span className={`status-badge status-badge--${event.status === 'قيد الانتظار' ? 'pending' : 'resolved'}`}>
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;