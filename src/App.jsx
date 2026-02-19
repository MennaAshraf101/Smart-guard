import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

// Lazy load pages for better performance
const LoginPage = lazy(() => import('./pages/LoginPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

/**
 * Main application component with routing
 * Handles navigation between landing page, login, and dashboard
 */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Suspense fallback={<div className="loading">جاري التحميل...</div>}>
          <Routes>
            <Route 
              path="/" 
              element={<LandingPage />} 
            />
            <Route 
              path="/login" 
              element={<LoginPage />} 
            />
            <Route 
              path="/dashboard" 
              element={<Dashboard />} 
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App