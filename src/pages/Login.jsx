import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend demo ke liye mock authentication fix:
    // Email aur password check karke direct dashboard par bhej dega
    if (email && password) {
      onLogin();
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ backgroundColor: 'var(--bg-panel)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border-light)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--text-main)', marginBottom: '30px', fontFamily: "'Averia Gruesa Libre', cursive" }}>Account Login</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Email Field */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              required 
              style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', boxSizing: 'border-box', outline: 'none' }} 
            />
          </div>
          
          {/* Password Field with Eye Icon */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                required 
                style={{ width: '100%', padding: '12px 15px', paddingRight: '45px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', boxSizing: 'border-box', outline: 'none' }} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" id="remember" style={{ cursor: 'pointer' }} />
            <label htmlFor="remember" style={{ color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer' }}>Remember Me</label>
          </div>

          {/* Submit Button */}
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#8b5cf6', color: 'white', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
            Sign In
          </button>
        </form>
        
        {/* Helper Link */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/forgot-password" style={{ color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none' }}>Forgot your password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;