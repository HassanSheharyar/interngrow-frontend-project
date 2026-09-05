import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
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

  // Active Tab Style Helper Function
  const navStyle = (baseColor) => ({ isActive }) => ({
    color: baseColor,
    fontWeight: 'bold',
    textDecoration: 'none',
    borderBottom: isActive ? `2px solid ${baseColor}` : '2px solid transparent',
    paddingBottom: '4px',
    opacity: isActive ? 1 : 0.7,
    transition: 'all 0.3s ease'
  });

  return (
    <BrowserRouter>
      <div className={`app-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '20px', boxSizing: 'border-box', overflowX: 'hidden' }}>
        
        {/* HEADER & NAVIGATION */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '30px', padding: '15px 25px', backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '35px', height: '35px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>BS</div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: "'Averia Gruesa Libre', cursive" }}>BizSync Pro</span>
          </Link>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-main)' }} className="mobile-menu-btn">
            ☰
          </button>

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" style={navStyle('#8b5cf6')}>Login</NavLink>
                <NavLink to="/register" style={navStyle('#10b981')}>Register</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/hr-dashboard" style={navStyle('#10b981')}>HR Desk</NavLink>
                <NavLink to="/ecommerce-dashboard" style={navStyle('#3b82f6')}>Shop</NavLink>
                <NavLink to="/project-management" style={navStyle('#f59e0b')}>Projects</NavLink>
                <NavLink to="/analytics" style={navStyle('#ec4899')}>Analytics</NavLink>
                <NavLink to="/crm" style={navStyle('#ef4444')}>CRM System</NavLink>
                
                {/* 🔴 FIXED LOGOUT BUTTON 🔴 */}
                <button 
                  onClick={() => setIsAuthenticated(false)} 
                  style={{ marginLeft: '10px', padding: '6px 14px', borderRadius: '6px', border: '1px solid #ef4444', backgroundColor: 'transparent', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'all 0.3s ease' }}
                >
                  Logout
                </button>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* FOOTER */}
        <footer style={{ marginTop: '40px', padding: '20px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', color: 'var(--text-muted)', fontSize: '14px' }}>
          <div>&copy; {new Date().getFullYear()} BizSync Pro. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:hassansheharyar56@gmail.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>hassansheharyar56@gmail.com</a>
            <a href="tel:+923194648854" style={{ color: '#10b981', textDecoration: 'none' }}>+92-319-4648854</a>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;