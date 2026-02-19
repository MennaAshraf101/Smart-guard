import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import cameraImage from '../assets/images/camera3.jpeg';

/**
 * LoginPage Component
 * 
 * Professional login interface with form validation and responsive design.
 * Features email/password authentication with real-time validation and
 * accessible form controls.
 * 
 * @component
 */
function LoginPage() {
  // Form state management
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Validates form inputs
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Login successful:', formData);
      // TODO: Navigate to dashboard
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ form: 'حدث خطأ أثناء تسجيل الدخول' });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Updates form field value and clears associated error
   * @param {string} field - Field name
   * @param {string} value - New value
   */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error on input
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Toggles password visibility
   */
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="login-page" dir="rtl" lang="ar">
      {/* Navigation - Back to home */}
      <Link 
        to="/" 
        className="back-to-home"
        aria-label="العودة للرئيسية"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </Link>
      
      <div className="login-container">
        {/* Branding Section */}
        <section className="branding-section" aria-label="معلومات النظام">
          {/* Security icon */}
          <div className="security-badge" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm3 8H9V7a3 3 0 0 1 6 0v3z"/>
            </svg>
          </div>
          
          <div className="branding-content">
            {/* Product illustration */}
            <div className="product-visual">
              <img 
                src={cameraImage}
                alt="نظام حارس ذكي - كاميرات المراقبة الذكية" 
                loading="eager"
                width="260"
                height="260"
              />
            </div>
            
            {/* Brand identity */}
            <h1 className="brand-name">حارس ذكي</h1>
            <p className="brand-tagline">نظام أمني ذكي ومتقدم</p>
            
            {/* Feature highlights */}
<div className="feature-badges" role="list" aria-label="مميزات النظام">
  <span className="feature-badge" role="listitem">
    <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
    <span>آمن</span>
  </span>
  <span className="feature-badge" role="listitem">
    <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/>
      <line x1="8" y1="16" x2="8" y2="16"/>
      <line x1="16" y1="16" x2="16" y2="16"/>
    </svg>
    <span> ذكي</span>
  </span>
  <span className="feature-badge" role="listitem">
    <svg className="feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
    <span>مراقبة 24/7</span>
  </span>
</div>
          </div>
        </section>

        {/* Login Form Section */}
        <section className="form-section" aria-labelledby="login-title">
          <header className="form-header">
            <h2 id="login-title" className="form-title">مرحباً مرة أخرى</h2>
            <p className="form-description">قم بتسجيل الدخول للوصول إلى لوحة تحكم الأمان</p>
          </header>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="form-field">
              <label htmlFor="email" className="field-label">
                عنوان البريد الإلكتروني
              </label>
              <div className={`field-input-wrapper ${errors.email ? 'has-error' : ''}`}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="field-input"
                  placeholder="admin@smartguard.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  dir="ltr"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                <span className="field-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
              </div>
              {errors.email && (
                <p id="email-error" className="field-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-field">
              <label htmlFor="password" className="field-label">
                كلمة المرور
              </label>
              <div className={`field-input-wrapper ${errors.password ? 'has-error' : ''}`}>
                <button
                  type="button"
                  className="visibility-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  aria-pressed={showPassword}
                  tabIndex={0}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="field-input"
                  placeholder="أدخل كلمة المرور الخاصة بك"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  dir="rtl"
                  autoComplete="current-password"
                  aria-required="true"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <span className="field-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                </span>
              </div>
              {errors.password && (
                <p id="password-error" className="field-error" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`submit-button ${isLoading ? 'is-loading' : ''}`}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="loading-spinner" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <circle 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="50"
                      strokeDashoffset="25"
                    />
                  </svg>
                  <span>جاري التحميل...</span>
                </>
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <span className="submit-arrow" aria-hidden="true">←</span>
                </>
              )}
            </button>

            {/* Form-level errors */}
            {errors.form && (
              <p className="form-error" role="alert">
                {errors.form}
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;