import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
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
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // 🔔 DYNAMIC NOTIFICATIONS STATE
  const [notifications, setNotifications] = useState([
    { id: 1, title: '✅ New Client Added', desc: 'TechCorp Inc. was added to CRM.', time: '2 mins ago', read: false },
    { id: 2, title: '📊 Weekly Report Ready', desc: 'Your analytics report is generated.', time: '1 hour ago', read: false }
  ]);

  // Unread notifications count calculate karna
  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark all as read function
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read!");
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#0f0f13' : '#f1f5f9';
    document.body.style.transition = 'background-color 0.3s ease';
  }, [isDarkMode]);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
  };

  const navStyle = (baseColor) => ({ isActive }) => ({
    color: baseColor,
    fontWeight: 'bold',
    textDecoration: 'none',
    borderBottom: isActive ? `2px solid ${baseColor}` : '2px solid transparent',
    paddingBottom: '4px',
    opacity: isActive ? 1 : 0.7,
    transition: 'all 0.3s ease'
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    setProfileOpen(false);
    toast.success("Logged out successfully!");
  };

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className={`app-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '20px', boxSizing: 'border-box', overflowX: 'hidden' }}>
        
        {/* HEADER & NAVIGATION */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px', marginBottom: '30px', padding: '15px 25px', backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '35px', height: '35px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>BS</div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: "'Averia Gruesa Libre', cursive" }}>BizSync Pro</span>
          </Link>

          {isAuthenticated && (
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--input-bg)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '6px 15px', flex: '1', maxWidth: '300px' }}>
              <span style={{ fontSize: '14px' }}>🔍</span>
              <input type="text" placeholder="Search anything..." style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', width: '100%', marginLeft: '10px', fontSize: '14px' }} />
            </div>
          )}

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-main)' }} className="mobile-menu-btn">
            ☰
          </button>

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
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
                
                {/* 🔔 Notification Bell Feature */}
                <div style={{ position: 'relative', marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => setNotificationsOpen(!notificationsOpen)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    
                    {/* DYNAMIC RED BADGE */}
                    {unreadCount > 0 && (
                      <span style={{ position: 'absolute', top: '0px', right: '0px', backgroundColor: '#ef4444', color: 'white', fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', width: '15px', height: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* NOTIFICATIONS DROPDOWN */}
                  {notificationsOpen && (
                    <div className="mobile-dropdown-fix" style={{ position: 'absolute', right: 0, top: '45px', backgroundColor: isDarkMode ? '#1e1e24' : '#ffffff', border: '1px solid var(--border-light)', borderRadius: '8px', width: '280px', zIndex: 9999, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)' }}>
                      <div style={{ padding: '12px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Notifications</span>
                        {unreadCount > 0 && (
                          <span style={{ fontSize: '11px', backgroundColor: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>{unreadCount} New</span>
                        )}
                      </div>
                      
                      {/* DYNAMIC LIST */}
                      {unreadCount > 0 ? (
                        notifications.filter(n => !n.read).map((notif) => (
                          <div key={notif.id} style={{ padding: '12px', borderBottom: '1px solid var(--border-light)', fontSize: '13px' }}>
                            <div style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{notif.title}</div>
                            <div style={{ color: 'var(--text-muted)' }}>{notif.desc}</div>
                            <div style={{ color: '#3b82f6', fontSize: '11px', marginTop: '4px' }}>{notif.time}</div>
                          </div>
                        ))
                      ) : (
                        <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
                          <span style={{ fontSize: '30px', display: 'block', marginBottom: '10px' }}>🎉</span>
                          No new notifications!
                        </div>
                      )}

                      {unreadCount > 0 && (
                        <div style={{ padding: '10px', textAlign: 'center' }}>
                          <button onClick={handleMarkAllRead} style={{ background: 'none', border: 'none', color: '#8b5cf6', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>Mark all as read</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div style={{ position: 'relative', marginLeft: '5px' }}>
                  <button onClick={() => setProfileOpen(!profileOpen)} style={{ background: 'linear-gradient(135deg, #f59e0b, #ec4899)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                    HS
                  </button>
                  
                  {profileOpen && (
                    <div className="mobile-dropdown-fix" style={{ position: 'absolute', right: 0, top: '45px', backgroundColor: isDarkMode ? '#1e1e24' : '#ffffff', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px', minWidth: '160px', zIndex: 9999, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)' }}>
                      <div style={{ padding: '8px', borderBottom: '1px solid var(--border-light)', marginBottom: '5px', color: 'var(--text-main)', fontWeight: 'bold' }}>
                        Hassan Sheharyar
                      </div>
                      <Link to="/hr-dashboard" onClick={() => setProfileOpen(false)} style={{ display: 'block', padding: '8px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '14px' }}>⚙️ Settings</Link>
                      <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', padding: '8px', fontSize: '14px' }}>🚪 Logout</button>
                    </div>
                  )}
                </div>
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
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard onLogout={handleLogout} /></ProtectedRoute>} />
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