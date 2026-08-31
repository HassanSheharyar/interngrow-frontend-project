import { useState, useEffect, useCallback } from 'react';

function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');

  // 1. MOCK REST API INTEGRATION
  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // API Network delay simulate karne ke liye (1.5 seconds)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Error Handling: 10% chance hai ke error aaye (testing ke liye)
      if (Math.random() < 0.1) throw new Error("Failed to fetch analytics data from server.");

      const mockData = {
        revenue: { total: '$52,430', growth: '+14%' },
        users: { total: '12,845', growth: '+8%' },
        sales: { total: '1,423', growth: '+22%' },
        traffic: [
          { source: 'Organic Search', percentage: 45, color: '#3b82f6' },
          { source: 'Direct', percentage: 30, color: '#10b981' },
          { source: 'Social Media', percentage: 25, color: '#f59e0b' }
        ],
        devices: [
          { type: 'Desktop', users: '58%', icon: '💻' },
          { type: 'Mobile', users: '35%', icon: '📱' },
          { type: 'Tablet', users: '7%', icon: '💊' }
        ],
        countries: [
          { name: 'United States', flag: '🇺🇸', value: '45%' },
          { name: 'United Kingdom', flag: '🇬🇧', value: '20%' },
          { name: 'Pakistan', flag: '🇵🇰', value: '15%' },
          { name: 'Canada', flag: '🇨🇦', value: '10%' }
        ],
        activity: [
          { id: 1, user: 'Ali', action: 'upgraded to Pro Plan', time: '2 mins ago' },
          { id: 2, user: 'Sara', action: 'opened a support ticket', time: '15 mins ago' },
          { id: 3, user: 'Zain', action: 'completed checkout', time: '1 hour ago' }
        ],
        chartData: [40, 65, 45, 80, 55, 90, 75] // Weekly revenue trend
      };

      setData(mockData);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. BONUS: AUTO REFRESH DASHBOARD & INITIAL FETCH
  useEffect(() => {
    fetchAnalyticsData();
    // Har 30 second baad auto-refresh hoga
    const intervalId = setInterval(fetchAnalyticsData, 30000);
    return () => clearInterval(intervalId);
  }, [fetchAnalyticsData]);

  // 3. LOADING SKELETONS UI
  if (loading && !data) {
    return (
      <div style={{ padding: '30px', width: '100%', boxSizing: 'border-box' }}>
        {/* CSS for Skeleton Animation */}
        <style>{`
          @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
          .skeleton { background: var(--input-bg, rgba(150,150,150,0.2)); border-radius: 10px; animation: pulse 1.5s infinite ease-in-out; }
        `}</style>
        
        <div className="skeleton" style={{ height: '40px', width: '300px', marginBottom: '30px' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div className="skeleton" style={{ height: '120px' }}></div>
          <div className="skeleton" style={{ height: '120px' }}></div>
          <div className="skeleton" style={{ height: '120px' }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div className="skeleton" style={{ height: '300px' }}></div>
          <div className="skeleton" style={{ height: '300px' }}></div>
        </div>
      </div>
    );
  }

  // 4. ERROR HANDLING UI
  if (error) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', backgroundColor: 'var(--app-bg)' }}>
        <h2 style={{ color: '#ef4444', fontSize: '24px', marginBottom: '15px' }}>⚠️ Connection Error</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{error}</p>
        <button onClick={fetchAnalyticsData} style={{ padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Retry Now
        </button>
      </div>
    );
  }

  // 5. MAIN DASHBOARD UI
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '85vh', boxSizing: 'border-box', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-light)', backgroundColor: 'var(--app-bg)' }}>
      
      {/* Header: Title, Notifications, Profile, Settings & Auto-Refresh Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '28px', color: 'var(--text-main)', margin: '0 0 5px 0' }}>Real-Time Analytics</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', marginRight: '8px', boxShadow: '0 0 8px #10b981' }}></span>
            Live Updates • Last synced: {lastUpdated}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '50%', cursor: 'pointer', color: 'var(--text-main)' }}>🔔</button>
          <button style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '50%', cursor: 'pointer', color: 'var(--text-main)' }}>⚙️</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-panel)', padding: '5px 15px 5px 5px', borderRadius: '30px', border: '1px solid var(--border-light)' }}>
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(135deg, #6d28d9, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>A</div>
            <span style={{ color: 'var(--text-main)', fontWeight: 'bold', fontSize: '14px' }}>Admin</span>
          </div>
        </div>
      </div>

      {/* KPI Cards: Revenue, Users, Sales */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {[
          { title: 'Total Revenue', value: data.revenue.total, growth: data.revenue.growth, icon: '💰' },
          { title: 'User Growth', value: data.users.total, growth: data.users.growth, icon: '📈' },
          { title: 'Sales Report', value: data.sales.total, growth: data.sales.growth, icon: '🛍️' }
        ].map((kpi, index) => (
          <div key={index} style={{ backgroundColor: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid var(--border-light)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '15px' }}>{kpi.title}</h3>
              <span style={{ fontSize: '24px' }}>{kpi.icon}</span>
            </div>
            <p style={{ margin: '0 0 10px 0', fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)' }}>{kpi.value}</p>
            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
              {kpi.growth} vs last month
            </span>
          </div>
        ))}
      </div>

      {/* Middle Section: Main Chart & Traffic Sources */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        
        {/* Weekly Revenue Chart (CSS Based) */}
        <div style={{ backgroundColor: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid var(--border-light)', flex: 2 }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-main)', fontSize: '18px', marginBottom: '30px' }}>Revenue Analytics (Last 7 Days)</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)' }}>
            {data.chartData.map((val, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '10%' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>${val}k</span>
                <div style={{ width: '100%', height: `${val}%`, background: 'linear-gradient(180deg, #3b82f6 0%, rgba(59,130,246,0.2) 100%)', borderRadius: '6px 6px 0 0', transition: 'height 1s ease' }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div style={{ backgroundColor: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid var(--border-light)', flex: 1 }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-main)', fontSize: '18px', marginBottom: '25px' }}>Traffic Sources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {data.traffic.map((src, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-main)' }}>{src.source}</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{src.percentage}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--input-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${src.percentage}%`, height: '100%', backgroundColor: src.color, borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Device, Country & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        
        {/* Device Analytics */}
        <div style={{ backgroundColor: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-main)', fontSize: '18px', marginBottom: '20px' }}>Device Analytics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {data.devices.map((dev, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--input-bg)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{dev.icon}</span>
                  <span style={{ color: 'var(--text-main)' }}>{dev.type}</span>
                </div>
                <strong style={{ color: 'var(--text-main)' }}>{dev.users}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Country Analytics */}
        <div style={{ backgroundColor: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-main)', fontSize: '18px', marginBottom: '20px' }}>Top Countries</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {data.countries.map((country, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: i !== data.countries.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{country.flag}</span>
                  <span style={{ color: 'var(--text-main)' }}>{country.name}</span>
                </div>
                <strong style={{ color: 'var(--text-main)' }}>{country.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ backgroundColor: 'var(--bg-panel)', padding: '25px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-main)', fontSize: '18px', marginBottom: '20px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {data.activity.map((act) => (
              <div key={act.id} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>
                  {act.user.charAt(0)}
                </div>
                <div>
                  <p style={{ margin: '0 0 5px 0', color: 'var(--text-main)', fontSize: '14px', lineHeight: '1.4' }}>
                    <strong>{act.user}</strong> {act.action}
                  </p>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AnalyticsDashboard;