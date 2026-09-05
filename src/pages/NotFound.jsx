import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '72px', color: '#ef4444', margin: '0 0 20px 0', fontFamily: "'Averia Gruesa Libre', cursive" }}>404</h1>
      <h2 style={{ color: 'var(--text-main)', marginBottom: '20px' }}>Oops! Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '400px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/dashboard" style={{ padding: '12px 25px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
        Return to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;