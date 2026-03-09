import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import '../styles/Monitoring.css';
import '../components/Hero/Hero.css';
import logoImage from '../assets/images/logo.png';

function Monitoring({ events = [], unreadCount = 0 }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationClick = () => {
    setShowNotifications(false);
    // Navigate to Dashboard with hash
    navigate('/Dashboard#events-table');
  };

  // Scroll to events table after navigation completes
  useEffect(() => {
    // This effect will run when component mounts or when route changes
    const checkAndScroll = () => {
      if (window.location.pathname === '/Dashboard' && window.location.hash === '#events-table') {
        const timeout = setTimeout(() => {
          const eventsTable = document.querySelector('.events-section');
          if (eventsTable) {
            eventsTable.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        
        return () => clearTimeout(timeout);
      }
    };

    checkAndScroll();
  }, []); // Empty dependency array - this will run when component mounts

  const getPendingEvents = () => {
    return events.filter(event => event.status === 'قيد الانتظار').slice(0, 5);
  };
  return (
    <div className="monitoring-page">
      {/* --- Navbar --- */}
      <header className="hero-header">
        <div className="hero-header__brand">
          <img src={logoImage} alt="" className="hero-header__logo-icon" aria-hidden />
          <span className="hero-header__brand-name">حارس ذكي</span>
        </div>
        <nav className="hero-header__nav">
          <Link to="/" className="hero-header__link">الرئيسية</Link>
          <Link to="/Dashboard" className="hero-header__link">لوحة التحكم</Link>
          <Link to="/Monitoring" className="hero-header__link" style={{color: '#8b5cf6'}}>نظام المراقبة</Link>
        </nav>
        <div className="hero-header__actions">
          <div className="notification-dropdown">
            <button 
              type="button" 
              className="hero-header__icon-btn" 
              aria-label="الإشعارات"
              onClick={toggleNotifications}
            >
              <span className="hero-header__bell-icon" />
              {unreadCount > 0 && (
                <span className="hero-header__badge" aria-label={`${unreadCount} إشعارات جديدة`}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && unreadCount > 0 && (
              <div className="notification-dropdown__menu">
                <div className="notification-dropdown__header">
                  <h4>الإشعارات الجديدة</h4>
                  <span className="notification-dropdown__count">{unreadCount} إشعارات</span>
                </div>
                <div className="notification-dropdown__list">
                  {getPendingEvents().map(event => (
                    <button 
                      key={event.id}
                      className="notification-dropdown__item"
                      onClick={handleNotificationClick}
                    >
                      <div className="notification-dropdown__location">{event.location}</div>
                      <div className="notification-dropdown__time">{event.datetime}</div>
                    </button>
                  ))}
                </div>
                <div className="notification-dropdown__footer">
                  <button 
                    className="notification-dropdown__view-all"
                    onClick={handleNotificationClick}
                  >
                    عرض جميع الإشعارات
                  </button>
                </div>
              </div>
            )}
          </div>
          <Link to="/" className="hero-header__login">تسجيل الخروج</Link>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section className="monitoring-hero">
        <h1 className="monitoring-hero__title">نظام المراقبة المباشر</h1>
        <p className="monitoring-hero__subtitle">مراقبة مباشرة على مدار الساعة بتقنية الذكاء الاصطناعي</p>
      </section>
      
      <div className="monitoring-content">
        <h2 className="section-title">البث المباشر للكاميرات</h2>
        
        <div className="camera-grid">
          {/* Main Camera View */}
          <div className="camera-main">
            <div className="camera-card camera-card--large">
              <div className="camera-header">
                <h3 className="camera-title">الكاميرا الرئيسية - مدخل الجامعة</h3>
                <span className="live-indicator">
                  <span className="live-dot"></span>
                  مباشر
                </span>
              </div>
              <div className="camera-view">
                {/* Placeholder for camera feed */}
                <div className="camera-placeholder">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <p>البث المباشر قيد التحميل...</p>
                </div>
              </div>
              <div className="camera-footer">
                <span className="camera-time">آخر تحديث: الآن</span>
                <div className="camera-controls">
                  <button className="control-btn" title="تكبير">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </button>
                  <button className="control-btn" title="التقاط صورة">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </button>
                  <button className="control-btn" title="ملء الشاشة">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Camera Thumbnails */}
          <div className="camera-sidebar">
            <div className="camera-card camera-card--small">
              <div className="camera-header">
                <h4 className="camera-title--small">كاميرا 2 - الممر</h4>
                <span className="live-indicator live-indicator--small">
                  <span className="live-dot"></span>
                </span>
              </div>
              <div className="camera-view camera-view--small">
                <div className="camera-placeholder camera-placeholder--small">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="camera-card camera-card--small">
              <div className="camera-header">
                <h4 className="camera-title--small">كاميرا 3 - الساحة</h4>
                <span className="live-indicator live-indicator--small">
                  <span className="live-dot"></span>
                </span>
              </div>
              <div className="camera-view camera-view--small">
                <div className="camera-placeholder camera-placeholder--small">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="camera-card camera-card--small">
              <div className="camera-header">
                <h4 className="camera-title--small">كاميرا 4 - المدرج 1</h4>
                <span className="live-indicator live-indicator--small">
                  <span className="live-dot"></span>
                </span>
              </div>
              <div className="camera-view camera-view--small">
                <div className="camera-placeholder camera-placeholder--small">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Monitoring;
