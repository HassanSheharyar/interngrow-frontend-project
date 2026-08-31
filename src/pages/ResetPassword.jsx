import { useState } from 'react';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert("Error: Passwords do not match. Please try again.");
      return; 
    }

    alert("Success! Your password has been updated.");
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      <p style={{ fontSize: '15px', color: '#a1a1aa', textAlign: 'center', marginBottom: '25px' }}>
        Create a strong new password for your account.
      </p>
      
      <form onSubmit={handleResetPassword}>
        
        <div className="form-group">
          <label>New Password</label>
          <input 
            type="password" 
            placeholder="Enter new password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input 
            type="password" 
            placeholder="Confirm new password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="btn-primary">
          Update Password
        </button>

      </form>
    </div>
  );
}

export default ResetPassword;