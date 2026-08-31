import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to:\n${email}`);
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <p style={{ fontSize: '15px', color: '#a1a1aa', textAlign: 'center', marginBottom: '25px', lineHeight: '1.5' }}>
        Enter your registered email address, and we will send you a link to reset your password.
      </p>
      
      <form onSubmit={handleReset}>
        
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="Enter your registered email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="btn-primary">
          Send Reset Link
        </button>

      </form>
    </div>
  );
}

export default ForgotPassword;