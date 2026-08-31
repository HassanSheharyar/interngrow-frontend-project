import { useState, useEffect } from 'react';

function Dashboard({ onLogout }) {
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeoutWarning(true);
    }, 10000); 

    return () => clearTimeout(timer);
  }, []);

  const handleStayLoggedIn = () => {
    setShowTimeoutWarning(false);
  };

  return (
    <div className="form-container" style={{ maxWidth: '450px', position: 'relative' }}>
      <h2 style={{ color: '#8b5cf6', marginBottom: '15px' }}>Secure Dashboard</h2>
      <p style={{ color: '#a1a1aa', textAlign: 'center', lineHeight: '1.6', fontSize: '15px', marginBottom: '30px' }}>
        Welcome to the protected area! You can only see this page because you are successfully logged in.
      </p>
      
      <button 
        onClick={onLogout} 
        className="btn-primary" 
        style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.2)' }}
      >
        Logout Securely
      </button>

      {/* Session Timeout UI Overlay - Glassmorphism Style */}
      {showTimeoutWarning && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
          borderRadius: '16px', padding: '25px', zIndex: 10
        }}>
          <h3 style={{ color: '#ffffff', fontSize: '22px', marginBottom: '10px' }}>Session Expiring!</h3>
          <p style={{ color: '#a1a1aa', textAlign: 'center', marginBottom: '25px', fontSize: '14px', lineHeight: '1.5' }}>
            Your session is about to expire due to inactivity. Do you want to stay logged in?
          </p>
          
          <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
            <button 
              onClick={handleStayLoggedIn}
              className="btn-primary"
              style={{ marginTop: 0, padding: '10px' }}
            >
              Stay Logged In
            </button>
            <button 
              onClick={onLogout}
              className="btn-primary"
              style={{ marginTop: 0, padding: '10px', background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' }}
            >
              Logout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;