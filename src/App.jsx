import { Suspense, lazy, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

// Lazy load pages for better performance
const LoginPage = lazy(() => import('./pages/LoginPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Monitoring = lazy(() => import('./pages/Monitoring'))

/**
 * Main application component with routing
 * Handles navigation between landing page, login, dashboard, and monitoring
 */
function App() {
  const [events, setEvents] = useState([
    { id: 1, location: "مدخل المكتبة الرئيسي", datetime: "15-01-2024, 14:32", status: "قيد الانتظار" },
    { id: 2, location: "سكن الطلاب بلوك ب", datetime: "15-01-2024, 13:15", status: "تم الحل" },
    { id: 3, location: "مختبر كلية الهندسة", datetime: "15-01-2024, 11:48", status: "تم الحل" },
    { id: 4, location: "الكافتيريا المركزية", datetime: "2024-01-14, 22:10", status: "تم الحل" },
  ]);

  // Calculate unread notifications (pending status)
  const unreadCount = events.filter(e => e.status === 'قيد الانتظار').length;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Suspense fallback={<div className="loading">جاري التحميل...</div>}>
          <Routes>
            <Route 
              path="/" 
              element={<LandingPage unreadCount={unreadCount} />} 
            />
            <Route 
              path="/login" 
              element={<LoginPage />} 
            />
            <Route 
              path="/Dashboard" 
              element={<Dashboard events={events} setEvents={setEvents} unreadCount={unreadCount} />} 
            />
            <Route 
              path="/Monitoring" 
              element={<Monitoring events={events} unreadCount={unreadCount} />} 
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App