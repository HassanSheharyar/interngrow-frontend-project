import { Link } from 'react-router-dom';

function Dashboard({ onLogout }) {
  // Fake summary data for professional look
  const stats = [
    { title: "Total Revenue", value: "$45,231", trend: "+20.1%", color: "#10b981", icon: "💰" },
    { title: "Active Projects", value: "12", trend: "+3", color: "#3b82f6", icon: "🚀" },
    { title: "New Clients", value: "128", trend: "+12%", color: "#f59e0b", icon: "👥" },
    { title: "Team Members", value: "24", trend: "Stable", color: "#ec4899", icon: "👨‍💻" }
  ];

  return (
    <div style={{ padding: '10px 0' }}>
      
      {/* Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ margin: 0, color: 'var(--text-main)', fontFamily: "'Averia Gruesa Libre', cursive" }}>Dashboard Overview</h1>
          <p style={{ margin: '8px 0 0 0', color: 'var(--text-muted)', fontSize: '15px' }}>Welcome back, Hassan! Here is what's happening across your platform today.</p>
        </div>
      </div>

      {/* 4 Professional Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ backgroundColor: 'var(--bg-panel)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px', fontWeight: 'bold' }}>{stat.title}</p>
              <h2 style={{ margin: '10px 0 5px 0', color: 'var(--text-main)', fontSize: '32px' }}>{stat.value}</h2>
              <span style={{ color: stat.color, fontSize: '13px', fontWeight: 'bold', backgroundColor: `${stat.color}15`, padding: '4px 8px', borderRadius: '20px' }}>{stat.trend}</span>
            </div>
            <div style={{ fontSize: '42px', opacity: 0.9 }}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Quick Access Links */}
      <h2 style={{ color: 'var(--text-main)', marginBottom: '20px', fontFamily: "'Averia Gruesa Libre', cursive", fontSize: '22px' }}>Quick Access</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        
        <Link to="/crm" style={{ padding: '20px', backgroundColor: '#ef444415', border: '1px solid #ef4444', borderRadius: '12px', textDecoration: 'none', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s' }}>
          <span style={{ fontSize: '30px', marginBottom: '10px' }}>🤝</span>
          <span style={{ fontWeight: 'bold' }}>Manage CRM</span>
        </Link>
        
        <Link to="/project-management" style={{ padding: '20px', backgroundColor: '#f59e0b15', border: '1px solid #f59e0b', borderRadius: '12px', textDecoration: 'none', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s' }}>
          <span style={{ fontSize: '30px', marginBottom: '10px' }}>📋</span>
          <span style={{ fontWeight: 'bold' }}>Kanban Board</span>
        </Link>
        
        <Link to="/analytics" style={{ padding: '20px', backgroundColor: '#ec489915', border: '1px solid #ec4899', borderRadius: '12px', textDecoration: 'none', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s' }}>
          <span style={{ fontSize: '30px', marginBottom: '10px' }}>📈</span>
          <span style={{ fontWeight: 'bold' }}>View Analytics</span>
        </Link>

      </div>
    </div>
  );
}

export default Dashboard;