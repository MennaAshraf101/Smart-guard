import './Footer.css';

function Footer() {
  return (
    <footer className="footer" dir="rtl" lang="ar">
      <div className="footer__container">
        <div className="footer__content">
          {/* Right Column - Brand Section */}
          <div className="footer__brand">
            <div className="footer__brand-header">
              <div className="footer__brand-icon" aria-hidden />
              <h2 className="footer__brand-name">حارس ذكي</h2>
            </div>
            <p className="footer__brand-description">
              نظام أمني متقدم مدعوم بالذكاء الاصطناعي
            </p>
          </div>

          {/* Left Column - Product Section */}
          <div className="footer__product">
            <h3 className="footer__product-title">المنتج</h3>
            <nav className="footer__nav" aria-label="روابط المنتج">
              <a href="#features" className="footer__link">الرئيسية</a>
              <a href="#dashboard" className="footer__link">لوحة التحكم</a>
              <a href="#monitoring" className="footer__link">نظام المراقبة</a>
            </nav>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer__copyright">
          <hr className="footer__divider" />
          <p className="footer__copyright-text">
            © 2026 حارس ذكي - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
