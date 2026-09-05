import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import OTPVerification from './pages/OTPVerification';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EcommerceDashboard from './pages/EcommerceDashboard';
import ProjectManagement from './pages/ProjectManagement';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import CRMDashboard from './pages/CRMDashboard';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#0f0f13' : '#f1f5f9';
    document.body.style.transition = 'background-color 0.3s ease';
  }, [isDarkMode]);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <div className={`app-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '20px', boxSizing: 'border-box', overflowX: 'hidden' }}>
        
        {/* HEADER & NAVIGATION */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '30px', padding: '15px 25px', backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          
          {/* Logo */}
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '35px', height: '35px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>IG</div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: "'Averia Gruesa Libre', cursive" }}>InternGrow</span>
          </Link>

          {/* Mobile Menu Hamburger Icon */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-main)' }} className="mobile-menu-btn">
            ☰
          </button>

          {/* Cleaned Professional Nav Links */}
          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            {!isAuthenticated ? (
              <Link to="/login" style={{ color: '#8b5cf6', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
            ) : (
              <>
                <Link to="/hr-dashboard" style={{ color: '#10b981', fontWeight: 'bold', textDecoration: 'none' }}>HR Desk</Link>
                <Link to="/ecommerce-dashboard" style={{ color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none' }}>Shop</Link>
                <Link to="/project-management" style={{ color: '#f59e0b', fontWeight: 'bold', textDecoration: 'none' }}>Projects</Link>
                <Link to="/analytics" style={{ color: '#ec4899', fontWeight: 'bold', textDecoration: 'none' }}>Analytics</Link>
                <Link to="/crm" style={{ color: '#ef4444', fontWeight: 'bold', textDecoration: 'none' }}>CRM System</Link>
              </>
            )}
            
            <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', border: isDarkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)', backgroundColor: isDarkMode ? 'rgba(20,20,25,0.6)' : '#ffffff', color: isDarkMode ? '#ffffff' : '#1e293b' }}>
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard onLogout={() => setIsAuthenticated(false)} /></ProtectedRoute>} />
            <Route path="/hr-dashboard" element={<EmployeeDashboard />} />
            <Route path="/ecommerce-dashboard" element={<EcommerceDashboard />} />
            <Route path="/project-management" element={<ProjectManagement />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/crm" element={<CRMDashboard />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch-all for broken links */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: '40px', padding: '20px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', color: 'var(--text-muted)', fontSize: '14px' }}>
          
          <div>&copy; {new Date().getFullYear()} InternGrow. All rights reserved.</div>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="mailto:support@interngrow.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>support@interngrow.com</a>
            <a href="tel:+923000000000" style={{ color: '#10b981', textDecoration: 'none' }}>+92 300 0000000</a>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;