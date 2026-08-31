import { useState } from 'react';

function OTPVerification() {
  const [otp, setOtp] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    alert(`OTP Entered: ${otp}\n\nVerification successful!`);
  };

  return (
    <div className="form-container">
      <h2>Email Verification</h2>
      <p style={{ fontSize: '15px', color: '#a1a1aa', textAlign: 'center', marginBottom: '25px' }}>
        Please enter the 6-digit OTP sent to your email address.
      </p>
      
      <form onSubmit={handleVerify}>
        
        <div className="form-group">
          <label>Enter OTP</label>
          <input 
            type="text" 
            placeholder="e.g. 123456" 
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required 
            style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '18px', fontWeight: '700' }}
          />
        </div>

        <button type="submit" className="btn-primary">
          Verify Email
        </button>

      </form>
    </div>
  );
}

export default OTPVerification;