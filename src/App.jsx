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
import CRMDashboard from './pages/CRMDashboard'; // 🔥 TASK 6 CAPSTONE IMPORT
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Body Background Update
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
      <div className={`app-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`} style={{ textAlign: 'center', padding: '20px', width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
        
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '30px', padding: '15px', backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          <span style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '14px', fontFamily: "'Gowun Batang', serif" }}>Task 1:</span>
          <Link to="/login" style={{ fontSize: '13px', color: isDarkMode ? '#fff' : '#1e293b' }}>Login</Link>
          <Link to="/dashboard" style={{ fontSize: '13px', color: isDarkMode ? '#fff' : '#1e293b' }}>Dash</Link>
          
          <span style={{ color: 'rgba(150,150,150,0.3)' }}>|</span>
          <Link to="/hr-dashboard" style={{ color: '#10b981', fontWeight: 'bold', fontSize: '14px', fontFamily: "'Gowun Batang', serif" }}>Task 2</Link>
          
          <span style={{ color: 'rgba(150,150,150,0.3)' }}>|</span>
          <Link to="/ecommerce-dashboard" style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '14px', fontFamily: "'Gowun Batang', serif" }}>Task 3</Link>

          <span style={{ color: 'rgba(150,150,150,0.3)' }}>|</span>
          <Link to="/project-management" style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '14px', fontFamily: "'Gowun Batang', serif" }}>Task 4</Link>

          <span style={{ color: 'rgba(150,150,150,0.3)' }}>|</span>
          <Link to="/analytics" style={{ color: '#ec4899', fontWeight: 'bold', fontSize: '14px', fontFamily: "'Gowun Batang', serif" }}>Task 5</Link>

          {/* 🔥 TASK 6 CAPSTONE LINK */}
          <span style={{ color: 'rgba(150,150,150,0.3)' }}>|</span>
          <Link to="/crm" style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '14px', fontFamily: "'Gowun Batang', serif", textTransform: 'uppercase', letterSpacing: '1px' }}>Task 6: Capstone</Link>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            style={{ marginLeft: 'auto', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s ease', border: isDarkMode ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)', backgroundColor: isDarkMode ? 'rgba(20,20,25,0.6)' : '#ffffff', color: isDarkMode ? '#ffffff' : '#1e293b' }}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>

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
          
          {/* 🔥 TASK 6 ROUTE */}
          <Route path="/crm" element={<CRMDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;