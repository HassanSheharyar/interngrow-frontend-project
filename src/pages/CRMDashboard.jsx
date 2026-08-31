import { useState, useEffect, useCallback } from 'react';

function CRMDashboard() {
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // CRUD Form State
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', status: 'Active', value: '' });

  // 1. MOCK API INTEGRATION (GET)
  const fetchCRMData = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const mockStats = { totalClients: 124, activeDeals: '$45,000', conversionRate: '68%' };
      const mockClients = [
        { id: 1, name: 'Ali Khan', company: 'TechNova', email: 'ali@technova.pk', status: 'Active', value: '12000' },
        { id: 2, name: 'Sara Ahmed', company: 'DesignHub', email: 'sara@designhub.com', status: 'Lead', value: '5000' },
        { id: 3, name: 'Zain Abbas', company: 'Logistics Pro', email: 'zain@logistics.com', status: 'Closed', value: '25000' }
      ];

      setStats(mockStats);
      setClients(mockClients);
      setError(null);
    } catch (err) {
      setError("Failed to load CRM data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCRMData();
  }, [fetchCRMData]);

  // 2. CRUD: CREATE & UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      // Update existing client
      setClients(clients.map(c => c.id === editId ? { ...formData, id: editId } : c));
    } else {
      // Create new client
      const newClient = { ...formData, id: Date.now() };
      setClients([newClient, ...clients]);
    }
    closeModal();
  };

  // 3. CRUD: DELETE
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this client?")) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const openModalForEdit = (client) => {
    setFormData(client);
    setEditId(client.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ name: '', company: '', email: '', status: 'Active', value: '' });
  };

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Filter Logic
  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // LOADING STATE
  if (loading) {
    return (
      <div style={{ padding: '30px', width: '100%', boxSizing: 'border-box' }}>
        <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } } .skeleton { background: var(--input-bg, rgba(150,150,150,0.2)); border-radius: 10px; animation: pulse 1.5s infinite ease-in-out; }`}</style>
        <div className="skeleton" style={{ height: '40px', width: '250px', marginBottom: '30px' }}></div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div className="skeleton" style={{ height: '100px', flex: 1 }}></div>
          <div className="skeleton" style={{ height: '100px', flex: 1 }}></div>
          <div className="skeleton" style={{ height: '100px', flex: 1 }}></div>
        </div>
        <div className="skeleton" style={{ height: '300px', width: '100%' }}></div>
      </div>
    );
  }

  // ERROR HANDLING
  if (error) {
    return <div style={{ color: '#ef4444', padding: '50px', textAlign: 'center' }}><h2>Error</h2><p>{error}</p><button onClick={fetchCRMData}>Retry</button></div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '85vh', boxSizing: 'border-box', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-light)', backgroundColor: 'var(--app-bg)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', color: 'var(--text-main)', margin: 0 }}>CRM Dashboard</h1>
        <button onClick={() => setShowModal(true)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10b981', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>+ Add Client</button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'var(--bg-panel)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          <p style={{ margin: '0 0 10px 0', color: 'var(--text-muted)' }}>Total Clients</p>
          <h2 style={{ margin: 0, color: 'var(--text-main)', fontSize: '28px' }}>{stats.totalClients}</h2>
        </div>
        <div style={{ backgroundColor: 'var(--bg-panel)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          <p style={{ margin: '0 0 10px 0', color: 'var(--text-muted)' }}>Active Deals (Revenue)</p>
          <h2 style={{ margin: 0, color: '#3b82f6', fontSize: '28px' }}>{stats.activeDeals}</h2>
        </div>
        <div style={{ backgroundColor: 'var(--bg-panel)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
          <p style={{ margin: '0 0 10px 0', color: 'var(--text-muted)' }}>Conversion Rate</p>
          <h2 style={{ margin: 0, color: '#10b981', fontSize: '28px' }}>{stats.conversionRate}</h2>
        </div>
      </div>

      {/* Chart Section (CSS Based) */}
      <div style={{ backgroundColor: 'var(--bg-panel)', padding: '25px', borderRadius: '12px', border: '1px solid var(--border-light)', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 20px 0', color: 'var(--text-main)' }}>Sales Funnel</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ width: '100%', background: '#3b82f6', color: '#fff', padding: '10px', textAlign: 'center', borderRadius: '4px' }}>Leads (100%)</div>
          <div style={{ width: '75%', margin: '0 auto', background: '#8b5cf6', color: '#fff', padding: '10px', textAlign: 'center', borderRadius: '4px' }}>Proposals (75%)</div>
          <div style={{ width: '45%', margin: '0 auto', background: '#10b981', color: '#fff', padding: '10px', textAlign: 'center', borderRadius: '4px' }}>Closed Won (45%)</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Search by name or company..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, minWidth: '200px', padding: '10px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', outline: 'none' }} />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-panel)', color: 'var(--text-main)', outline: 'none' }}>
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Lead">Lead</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Data Table */}
      <div style={{ overflowX: 'auto', backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)' }}>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Name</th>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Company</th>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Deal Value</th>
              <th style={{ padding: '15px', color: 'var(--text-muted)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '15px', color: 'var(--text-main)', fontWeight: 'bold' }}>{client.name} <br/><span style={{fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'normal'}}>{client.email}</span></td>
                <td style={{ padding: '15px', color: 'var(--text-main)' }}>{client.company}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', backgroundColor: client.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : client.status === 'Lead' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(107, 114, 128, 0.2)', color: client.status === 'Active' ? '#10b981' : client.status === 'Lead' ? '#f59e0b' : '#6b7280' }}>
                    {client.status}
                  </span>
                </td>
                <td style={{ padding: '15px', color: 'var(--text-main)' }}>${client.value}</td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => openModalForEdit(client)} style={{ marginRight: '10px', background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', fontWeight: 'bold' }}>Edit</button>
                  <button onClick={() => handleDelete(client.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No clients found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: 'var(--bg-panel)', width: '100%', maxWidth: '400px', borderRadius: '12px', padding: '25px', border: '1px solid var(--border-light)' }}>
            <h2 style={{ margin: '0 0 20px 0', color: 'var(--text-main)' }}>{editId ? 'Edit Client' : 'Add New Client'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" name="name" value={formData.name} onChange={handleInput} placeholder="Full Name" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)' }} />
              <input type="text" name="company" value={formData.company} onChange={handleInput} placeholder="Company Name" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)' }} />
              <input type="email" name="email" value={formData.email} onChange={handleInput} placeholder="Email Address" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)' }} />
              <input type="number" name="value" value={formData.value} onChange={handleInput} placeholder="Deal Value ($)" required style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)' }} />
              <select name="status" value={formData.status} onChange={handleInput} style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)' }}>
                <option value="Lead">Lead</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>{editId ? 'Save Changes' : 'Add Client'}</button>
                <button type="button" onClick={closeModal} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'transparent', color: 'var(--text-main)', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CRMDashboard;