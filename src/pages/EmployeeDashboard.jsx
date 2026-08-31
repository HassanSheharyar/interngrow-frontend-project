import { useState } from 'react';

function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [departments, setDepartments] = useState(['Engineering', 'Human Resources', 'Design']);
  const [newDeptName, setNewDeptName] = useState('');

  const [employees, setEmployees] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@company.com', position: 'Frontend Developer', department: 'Engineering' },
    { id: 2, name: 'Bob Johnson', email: 'bob@company.com', position: 'HR Manager', department: 'Human Resources' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@company.com', position: 'Backend Developer', department: 'Engineering' },
    { id: 4, name: 'Diana Prince', email: 'diana@company.com', position: 'UI/UX Designer', department: 'Design' },
    { id: 5, name: 'Evan Wright', email: 'evan@company.com', position: 'QA Tester', department: 'Engineering' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', position: '', department: departments[0] });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 3;
  const [viewProfile, setViewProfile] = useState(null);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEmployees(employees.map(emp => emp.id === editId ? { ...emp, ...formData } : emp));
    } else {
      setEmployees([...employees, { id: Date.now(), ...formData }]);
    }
    resetForm();
  };

  const handleEdit = (employee) => {
    setIsEditing(true); setEditId(employee.id);
    setFormData({ name: employee.name, email: employee.email, position: employee.position, department: employee.department });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', position: '', department: departments[0] });
    setShowForm(false); setIsEditing(false); setEditId(null);
  };

  const exportToCSV = () => {
    const headers = ['ID,Name,Email,Position,Department'];
    const csvData = employees.map(emp => `${emp.id},${emp.name},${emp.email},${emp.position},${emp.department}`);
    const blob = new Blob([headers.concat(csvData).join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Employees_List.csv'; a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (newDeptName.trim() !== '' && !departments.includes(newDeptName.trim())) {
      setDepartments([...departments, newDeptName.trim()]);
      setNewDeptName('');
    } else {
      alert("Department already exists or name is empty!");
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || emp.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const indexOfLastEmp = currentPage * employeesPerPage;
  const indexOfFirstEmp = indexOfLastEmp - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmp, indexOfLastEmp);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '85vh', boxSizing: 'border-box', overflow: 'hidden', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'rgba(20, 20, 25, 0.6)', backdropFilter: 'blur(12px)', borderRight: '1px solid rgba(255, 255, 255, 0.08)', padding: '30px 20px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        
        <h2 style={{ color: '#ffffff', fontSize: '26px', marginBottom: '40px', textAlign: 'center', letterSpacing: '1px', fontFamily: "'Gowun Batang', serif", fontWeight: 'bold' }}>
          HR Panel
        </h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button className="btn-primary" onClick={() => {setActiveTab('overview'); setShowForm(false); setViewProfile(null);}} style={{ padding: '12px', fontSize: '15px', background: activeTab === 'overview' ? 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)' : 'rgba(0,0,0,0.3)', boxShadow: 'none' }}>
            Dashboard Overview
          </button>
          <button className="btn-primary" onClick={() => {setActiveTab('employees'); setShowForm(false); setViewProfile(null);}} style={{ padding: '12px', fontSize: '15px', background: activeTab === 'employees' ? 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)' : 'rgba(0,0,0,0.3)', boxShadow: 'none' }}>
            Employee List
          </button>
          <button className="btn-primary" onClick={() => {setActiveTab('departments'); setShowForm(false); setViewProfile(null);}} style={{ padding: '12px', fontSize: '15px', background: activeTab === 'departments' ? 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)' : 'rgba(0,0,0,0.3)', boxShadow: 'none' }}>
            Departments
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', overflowX: 'hidden', boxSizing: 'border-box' }}>
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div style={{ maxWidth: '100%' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#ffffff' }}>Dashboard Overview</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div style={{ backgroundColor: 'rgba(20, 20, 25, 0.6)', backdropFilter: 'blur(12px)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#a1a1aa', fontSize: '15px' }}>Total Employees</h3>
                <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>{employees.length}</p>
              </div>
              <div style={{ backgroundColor: 'rgba(20, 20, 25, 0.6)', backdropFilter: 'blur(12px)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#a1a1aa', fontSize: '15px' }}>Active Departments</h3>
                <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>{departments.length}</p>
              </div>
              <div style={{ backgroundColor: 'rgba(20, 20, 25, 0.6)', backdropFilter: 'blur(12px)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#a1a1aa', fontSize: '15px' }}>Present Today</h3>
                <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{employees.length > 0 ? employees.length - 1 : 0}</p>
              </div>
              <div style={{ backgroundColor: 'rgba(20, 20, 25, 0.6)', backdropFilter: 'blur(12px)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#a1a1aa', fontSize: '15px' }}>On Leave</h3>
                <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>{employees.length > 0 ? 1 : 0}</p>
              </div>
            </div>
            
            <p style={{ color: '#a1a1aa' }}>Switch to Employee List or Departments to manage data.</p>
          </div>
        )}

        {/* EMPLOYEES TAB */}
        {activeTab === 'employees' && (
          <div style={{ maxWidth: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
              <h1 style={{ fontSize: '32px', color: '#ffffff', margin: 0 }}>Manage Employees</h1>
              {!showForm && !viewProfile && (
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  
                  {/* 🔥 EXPORT CSV BUTTON FIX 🔥 */}
                  <button 
                    onClick={exportToCSV} 
                    style={{ 
                      width: 'auto', 
                      padding: '10px 20px', 
                      background: 'var(--input-bg, rgba(255,255,255,0.1))', 
                      color: 'var(--text-main, #ffffff)', 
                      border: '1px solid var(--border-light, rgba(255,255,255,0.2))',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      boxShadow: 'none'
                    }}
                  >
                    📥 Export CSV
                  </button>

                  <button onClick={() => setShowForm(true)} className="btn-primary" style={{ width: 'auto', padding: '10px 20px', marginTop: 0 }}>+ Add Employee</button>
                </div>
              )}
            </div>

            {viewProfile ? (
              <div className="form-container" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#8b5cf6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold', margin: '0 auto 20px auto' }}>{viewProfile.name.charAt(0)}</div>
                <h2 style={{ fontSize: '26px', marginBottom: '5px' }}>{viewProfile.name}</h2>
                <p style={{ color: '#c4b5fd', fontWeight: 'bold', marginBottom: '20px' }}>{viewProfile.position}</p>
                <div style={{ textAlign: 'left', backgroundColor: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                  <p style={{ margin: '0 0 10px 0', color: '#a1a1aa' }}><strong>Email:</strong> {viewProfile.email}</p>
                  <p style={{ margin: '0 0 10px 0', color: '#a1a1aa' }}><strong>Department:</strong> {viewProfile.department}</p>
                  <p style={{ margin: '0', color: '#a1a1aa' }}><strong>Employee ID:</strong> EMP-{viewProfile.id}</p>
                </div>
                <button onClick={() => setViewProfile(null)} className="btn-primary" style={{ width: 'auto', padding: '10px 30px' }}>Back to List</button>
              </div>
            ) : showForm ? (
              <div className="form-container" style={{ maxWidth: '600px', margin: '0 0 30px 0' }}>
                <h2 style={{ fontSize: '22px', marginBottom: '20px', textAlign: 'left' }}>{isEditing ? 'Edit Employee' : 'Add New Employee'}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g. John Doe" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="john@company.com" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Position</label>
                    <input type="text" name="position" value={formData.position} onChange={handleInputChange} required placeholder="e.g. Designer" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Department</label>
                    <select 
                      name="department" 
                      value={formData.department} 
                      onChange={handleInputChange} 
                      required
                      style={{ padding: '14px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', fontFamily: 'inherit', outline: 'none', cursor: 'pointer', width: '100%' }}
                    >
                      {departments.map(dept => <option key={dept} value={dept} style={{ backgroundColor: '#1a1a24' }}>{dept}</option>)}
                    </select>
                  </div>
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <button type="submit" className="btn-primary" style={{ marginTop: 0 }}>{isEditing ? 'Update Details' : 'Save Employee'}</button>
                    <button type="button" onClick={resetForm} className="btn-primary" style={{ marginTop: 0, background: 'rgba(255,255,255,0.1)', color: '#fff', boxShadow: 'none' }}>Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <div style={{ maxWidth: '100%' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} style={{ flex: 1, minWidth: '200px', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                  <select value={filterDepartment} onChange={(e) => {setFilterDepartment(e.target.value); setCurrentPage(1);}} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(20,20,25,0.9)', color: '#fff', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}>
                    <option value="All">All Departments</option>
                    {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                  </select>
                </div>

                <div style={{ backgroundColor: 'rgba(20, 20, 25, 0.6)', backdropFilter: 'blur(12px)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', overflowX: 'auto', maxWidth: '100%' }}>
                  <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <th style={{ padding: '15px 20px', color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Name</th>
                        <th style={{ padding: '15px 20px', color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Position</th>
                        <th style={{ padding: '15px 20px', color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Department</th>
                        <th style={{ padding: '15px 20px', color: '#a1a1aa', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEmployees.map((emp) => (
                        <tr key={emp.id} style={{ transition: 'background 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                          <td style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}><div style={{ fontWeight: '700' }}>{emp.name}</div><div style={{ fontSize: '13px', color: '#8b8b99' }}>{emp.email}</div></td>
                          <td style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#e5e7eb' }}>{emp.position}</td>
                          <td style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><span style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', whiteSpace: 'nowrap' }}>{emp.department}</span></td>
                          <td style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', whiteSpace: 'nowrap' }}>
                            <button onClick={() => setViewProfile(emp)} style={{ background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', marginRight: '10px', fontWeight: '700', fontSize: '14px', fontFamily: 'inherit' }}>View</button>
                            <button onClick={() => handleEdit(emp)} style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '10px', fontWeight: '700', fontSize: '14px', fontFamily: 'inherit' }}>Edit</button>
                            <button onClick={() => handleDelete(emp.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: 'inherit' }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* DEPARTMENTS TAB */}
        {activeTab === 'departments' && (
          <div style={{ maxWidth: '100%' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '30px', color: '#ffffff' }}>Department Management</h1>
            
            <form onSubmit={handleAddDepartment} style={{ display: 'flex', gap: '15px', marginBottom: '40px', maxWidth: '500px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="Enter new department name..." 
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
                style={{ flex: 1, minWidth: '200px', padding: '14px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
              />
              <button type="submit" className="btn-primary" style={{ width: 'auto', margin: 0, padding: '10px 25px' }}>
                Add
              </button>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
              {departments.map((dept, index) => {
                const employeeCount = employees.filter(emp => emp.department === dept).length;
                return (
                  <div key={index} style={{ backgroundColor: 'rgba(20, 20, 25, 0.6)', backdropFilter: 'blur(12px)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '15px' }}>🏢</div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#fff', fontSize: '20px' }}>{dept}</h3>
                    <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '20px', fontSize: '13px', color: '#a1a1aa' }}>
                      {employeeCount} {employeeCount === 1 ? 'Employee' : 'Employees'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default EmployeeDashboard;