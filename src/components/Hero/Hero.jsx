import { Link } from 'react-router-dom';
import './Hero.css';
import cameraImage from '../../assets/images/camera1.png';
import logoImage from '../../assets/images/logo.png';

function Hero({
  logoSrc = logoImage,
  onDiscoverFeatures,
  unreadCount = 0,
  showBell = true
}) {
  return (
    <div className="hero-page" dir="rtl" lang="ar">
      <header className="hero-header">
        <div className="hero-header__brand">
          <img src={logoSrc} alt="" className="hero-header__logo-icon" aria-hidden />
          <span className="hero-header__brand-name">حارس ذكي</span>
        </div>
        <nav className="hero-header__nav" aria-label="الرئيسية">
          <Link to="/" className="hero-header__link">الرئيسية</Link>
          <Link to="/Dashboard" className="hero-header__link">لوحة التحكم</Link>
          <Link to="/Monitoring" className="hero-header__link">نظام المراقبة</Link>
        </nav>
        <div className="hero-header__actions">
          {showBell && (
            <button type="button" className="hero-header__icon-btn" aria-label="الإشعارات">
              <span className="hero-header__bell-icon" aria-hidden />
              {unreadCount > 0 && (
                <span className="hero-header__badge" aria-label={`${unreadCount} إشعارات جديدة`}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          )}
          <Link to="/login" className="hero-header__login">تسجيل الدخول</Link>
        </div>
      </header>

      <section className="hero-main" aria-labelledby="hero-title">
        {/* Particle Effects */}
        <div className="particles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--delay': `${Math.random() * 15}s`,
                '--drift-x': `${(Math.random() - 0.5) * 100}px`,
                '--size': `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 6 + 12}s`
              }}
            />
          ))}
        </div>
        
        <div className="hero-main__content">
          <div className="hero-main__heading-block">
            <h1 id="hero-title" className="hero-main__title hero-heading">حارس ذكي</h1>
            <h2 className="hero-main__subtitle hero-subheading">مراقبة مستمرة 24/7</h2>
          </div>
          <p className="hero-main__description hero-description">
            حماية ذكية متقدمة تعمل على مدار الساعة باستخدام الذكاء الاصطناعي لرصد وتحليل أي سلوك غير طبيعي فوراً
          </p>
          <div className="hero-main__actions">
            <button
              type="button"
              className="hero-main__btn hero-main__btn--secondary hero-button"
              onClick={onDiscoverFeatures}
            >
              استكشف الميزات
            </button>
          </div>
        </div>
        <div className="hero-main__media">
          <img
            src={cameraImage}
            alt=""
            className="hero-main__image camera-illustration"
            aria-hidden
          />
        </div>
        
        {/* Down Arrow */}
        <button 
          className="hero-scroll-arrow"
          onClick={() => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
              featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          aria-label="Scroll to features"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </section>
    </div>
  );
}

export default Hero;
