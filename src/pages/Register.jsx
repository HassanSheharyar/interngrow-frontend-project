import { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;

    if (pass.length === 0) return { label: '', color: 'transparent', width: '0%' };
    if (strength <= 2) return { label: 'Weak', color: '#ef4444', width: '33%' }; 
    if (strength === 3) return { label: 'Good', color: '#eab308', width: '66%' }; 
    return { label: 'Strong', color: '#22c55e', width: '100%' }; 
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Name: ${name}\nEmail: ${email}\n\nAccount created successfully!`);
  };

  const strengthData = getPasswordStrength(password);

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      
      <form onSubmit={handleRegister}>
        
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your full name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Create a strong password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          
          {password.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ height: '5px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: strengthData.width, backgroundColor: strengthData.color, transition: 'width 0.4s ease' }}></div>
              </div>
              <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: strengthData.color, textAlign: 'right', fontWeight: '700' }}>
                {strengthData.label}
              </p>
            </div>
          )}
        </div>

        <button type="submit" className="btn-primary">
          Register
        </button>

      </form>
    </div>
  );
}

export default Register;