import { useState } from 'react';

function EcommerceDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar Menu Items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'products', label: 'Products', icon: '🛍️' },
    { id: 'categories', label: 'Categories', icon: '📁' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'inventory', label: 'Inventory', icon: '📋' },
    { id: 'coupons', label: 'Coupons', icon: '🎟️' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  // --- DUMMY DATA FOR ALL TABS ---
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Wireless Headphones', price: 299.99, category: 'Electronics', stock: 45, image: '🎧' },
    { id: 2, name: 'Minimalist Leather Watch', price: 120.00, category: 'Accessories', stock: 12, image: '⌚' },
    { id: 3, name: 'Ergonomic Office Chair', price: 199.50, category: 'Furniture', stock: 0, image: '🪑' },
    { id: 4, name: 'Mechanical Gaming Keyboard', price: 89.99, category: 'Electronics', stock: 30, image: '⌨️' }
  ]);

  const orders = [
    { id: '#ORD-7890', customer: 'Ali Khan', date: 'Aug 11, 2026', total: '$340.50', status: 'Delivered' },
    { id: '#ORD-7891', customer: 'Sara Ahmed', date: 'Aug 10, 2026', total: '$120.00', status: 'Processing' },
    { id: '#ORD-7892', customer: 'Zain Malik', date: 'Aug 09, 2026', total: '$89.99', status: 'Shipped' },
    { id: '#ORD-7893', customer: 'Fatima Noor', date: 'Aug 08, 2026', total: '$299.00', status: 'Cancelled' }
  ];

  const customers = [
    { id: 101, name: 'Ali Khan', email: 'ali@example.com', orders: 12, spent: '$1,240.00', status: 'Active' },
    { id: 102, name: 'Sara Ahmed', email: 'sara@example.com', orders: 5, spent: '$450.00', status: 'Active' },
    { id: 103, name: 'Zain Malik', email: 'zain@example.com', orders: 1, spent: '$89.99', status: 'Inactive' }
  ];

  const categories = [
    { id: 1, name: 'Electronics', items: 124, status: 'Active', icon: '🔌' },
    { id: 2, name: 'Furniture', items: 45, status: 'Active', icon: '🪑' },
    { id: 3, name: 'Clothing', items: 350, status: 'Active', icon: '👕' },
    { id: 4, name: 'Accessories', items: 89, status: 'Active', icon: '🕶️' }
  ];

  const coupons = [
    { code: 'SUMMER20', discount: '20% OFF', usage: '145 / 500', expiry: 'Aug 30, 2026', status: 'Active' },
    { code: 'WELCOME10', discount: '10% OFF', usage: '890 / ∞', expiry: 'No Expiry', status: 'Active' },
    { code: 'FLASH50', discount: '$50 OFF', usage: '100 / 100', expiry: 'Expired', status: 'Expired' }
  ];

  const reviews = [
    { id: 1, user: 'Ali Khan', product: 'Premium Wireless Headphones', rating: '⭐⭐⭐⭐⭐', text: 'Amazing sound quality and bass! Highly recommended.' },
    { id: 2, user: 'Sara Ahmed', product: 'Minimalist Leather Watch', rating: '⭐⭐⭐⭐', text: 'Looks very elegant, but the strap is a bit stiff.' },
    { id: 3, user: 'Zain Malik', product: 'Mechanical Gaming Keyboard', rating: '⭐⭐⭐⭐⭐', text: 'Best keyboard for gaming, switches are very tactile.' }
  ];

  // --- PRODUCTS TAB LOGIC ---
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Electronics', stock: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(prod => prod.id === editId ? { ...prod, ...formData, price: Number(formData.price), stock: Number(formData.stock) } : prod));
    } else {
      setProducts([{ id: Date.now(), ...formData, price: Number(formData.price), stock: Number(formData.stock), image: '📦' }, ...products]);
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setIsEditing(true); setEditId(product.id);
    setFormData({ name: product.name, price: product.price, category: product.category, stock: product.stock });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) setProducts(products.filter(prod => prod.id !== id));
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', category: 'Electronics', stock: '' });
    setShowForm(false); setIsEditing(false); setEditId(null);
  };

  let processedProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || prod.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortOrder === 'priceAsc') processedProducts.sort((a, b) => a.price - b.price);
  else if (sortOrder === 'priceDesc') processedProducts.sort((a, b) => b.price - a.price);
  else processedProducts.sort((a, b) => b.id - a.id);

  const indexOfLastProd = currentPage * productsPerPage;
  const indexOfFirstProd = indexOfLastProd - productsPerPage;
  const currentProducts = processedProducts.slice(indexOfFirstProd, indexOfLastProd);
  const totalPages = Math.ceil(processedProducts.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Helper function for Status Badges
  const getStatusBadge = (status) => {
    let bg = 'rgba(100, 116, 139, 0.2)'; let color = '#94a3b8';
    if (status === 'Delivered' || status === 'Active') { bg = 'rgba(16, 185, 129, 0.2)'; color = '#34d399'; }
    if (status === 'Processing' || status === 'Shipped') { bg = 'rgba(59, 130, 246, 0.2)'; color = '#60a5fa'; }
    if (status === 'Cancelled' || status === 'Expired' || status === 'Inactive') { bg = 'rgba(239, 68, 68, 0.2)'; color = '#f87171'; }
    return <span style={{ backgroundColor: bg, color: color, padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{status}</span>;
  };

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '85vh', boxSizing: 'border-box', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border-light)', backgroundColor: 'var(--app-bg)', position: 'relative' }}>
      
      {/* Mobile Sidebar Overlay */}
      <div className={`eco-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)} style={{ display: isSidebarOpen ? 'block' : 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90 }}></div>

      {/* SIDEBAR */}
      <aside className={`eco-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ width: '250px', backgroundColor: 'var(--bg-panel)', backdropFilter: 'blur(12px)', borderRight: '1px solid var(--border-light)', padding: '30px 20px', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto', zIndex: 100, transition: 'transform 0.3s ease', transform: window.innerWidth <= 900 && !isSidebarOpen ? 'translateX(-100%)' : 'translateX(0)', position: window.innerWidth <= 900 ? 'absolute' : 'relative', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '24px', margin: 0, letterSpacing: '1px', fontWeight: 'bold' }}>Admin Panel</h2>
          {window.innerWidth <= 900 && <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '24px', cursor: 'pointer' }}>✕</button>}
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => { setActiveTab(item.id); setShowForm(false); setCurrentPage(1); setIsSidebarOpen(false); }} 
                style={{ 
                  padding: '12px 15px', fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px',
                  color: isActive ? 'white' : 'var(--text-main)',
                  background: isActive ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' : 'transparent', 
                  border: isActive ? 'none' : '1px solid var(--border-light)', borderRadius: '8px',
                  cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'inherit'
                }}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto', overflowX: 'hidden', boxSizing: 'border-box' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
          {window.innerWidth <= 900 && (
            <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-light)', borderRadius: '6px', color: 'var(--text-main)', padding: '5px 10px', fontSize: '20px', cursor: 'pointer' }}>☰</button>
          )}
          <h1 style={{ fontSize: '30px', color: 'var(--text-main)', margin: 0, textTransform: 'capitalize' }}>
            {activeTab === 'dashboard' ? 'E-Commerce Overview' : activeTab}
          </h1>
        </div>

        {/* 1. DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div style={{ maxWidth: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div style={{ backgroundColor: 'var(--bg-panel)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '15px' }}>Total Revenue</h3><span style={{ fontSize: '20px' }}>💰</span></div>
                <p style={{ margin: '10px 0 5px 0', fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)' }}>$24,590</p><p style={{ margin: 0, fontSize: '13px', color: '#10b981' }}>+12.5% this week</p>
              </div>
              <div style={{ backgroundColor: 'var(--bg-panel)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '15px' }}>Total Orders</h3><span style={{ fontSize: '20px' }}>📦</span></div>
                <p style={{ margin: '10px 0 5px 0', fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)' }}>1,245</p><p style={{ margin: 0, fontSize: '13px', color: '#10b981' }}>+5.2% this week</p>
              </div>
              <div style={{ backgroundColor: 'var(--bg-panel)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><h3 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '15px' }}>Total Customers</h3><span style={{ fontSize: '20px' }}>👥</span></div>
                <p style={{ margin: '10px 0 5px 0', fontSize: '32px', fontWeight: 'bold', color: 'var(--text-main)' }}>892</p><p style={{ margin: 0, fontSize: '13px', color: '#f87171' }}>-2.1% this week</p>
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--bg-panel)', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              <h3 style={{ marginTop: 0, color: 'var(--text-main)', fontSize: '20px', marginBottom: '30px' }}>Revenue Overview (2026)</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '220px', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)' }}>
                {[{ m: 'Mar', h: '120px', v: '$12k' }, { m: 'Apr', h: '150px', v: '$15k' }, { m: 'May', h: '100px', v: '$10k' }, { m: 'Jun', h: '180px', v: '$18k' }, { m: 'Jul', h: '140px', v: '$14k' }, { m: 'Aug', h: '200px', v: '$20k' }].map((b, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#3b82f6', fontWeight: 'bold' }}>{b.v}</span>
                    <div style={{ width: 'clamp(20px, 4vw, 40px)', height: b.h, background: 'linear-gradient(180deg, #3b82f6 0%, #1e3a8a 100%)', borderRadius: '6px 6px 0 0' }}></div>
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{b.m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS TAB (With Full CRUD) */}
        {activeTab === 'products' && (
          <div style={{ maxWidth: '100%' }}>
            {!showForm && (
              <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setShowForm(true)} style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit' }}>+ Add Product</button>
              </div>
            )}
            {showForm ? (
              <div style={{ maxWidth: '800px', margin: '0 0 30px 0', backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-light)', padding: '40px', borderRadius: '16px' }}>
                <h2 style={{ fontSize: '22px', marginBottom: '25px', textAlign: 'left', color: 'var(--text-main)', marginTop: 0 }}>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div style={{ gridColumn: '1 / -1', border: '2px dashed var(--border-light)', borderRadius: '12px', padding: '40px', textAlign: 'center', backgroundColor: 'var(--input-bg)', cursor: 'pointer' }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>📸</div>
                    <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-main)', fontSize: '16px' }}>Upload product image</h3>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px' }}>SVG, PNG, JPG (max. 800x400px)</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><label style={{color: 'var(--text-muted)', fontWeight: 'bold', fontSize: '15px'}}>Name</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '14px', borderRadius: '10px', outline: 'none', fontFamily: 'inherit'}} /></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><label style={{color: 'var(--text-muted)', fontWeight: 'bold', fontSize: '15px'}}>Category</label><select name="category" value={formData.category} onChange={handleInputChange} style={{ padding: '14px', borderRadius: '10px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit' }}><option value="Electronics">Electronics</option><option value="Clothing">Clothing</option><option value="Accessories">Accessories</option><option value="Furniture">Furniture</option></select></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><label style={{color: 'var(--text-muted)', fontWeight: 'bold', fontSize: '15px'}}>Price ($)</label><input type="number" name="price" value={formData.price} onChange={handleInputChange} required style={{background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '14px', borderRadius: '10px', outline: 'none', fontFamily: 'inherit'}} /></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><label style={{color: 'var(--text-muted)', fontWeight: 'bold', fontSize: '15px'}}>Stock</label><input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required style={{background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '14px', borderRadius: '10px', outline: 'none', fontFamily: 'inherit'}} /></div>
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <button type="submit" style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit' }}>Save Product</button>
                    <button type="button" onClick={resetForm} style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--input-bg)', color: 'var(--text-main)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'bold' }}>Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} style={{ flex: 1, minWidth: '150px', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit' }} />
                  <select value={filterCategory} onChange={(e) => {setFilterCategory(e.target.value); setCurrentPage(1);}} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-panel)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit' }}><option value="All">All Categories</option><option value="Electronics">Electronics</option><option value="Accessories">Accessories</option><option value="Clothing">Clothing</option><option value="Furniture">Furniture</option></select>
                  <select value={sortOrder} onChange={(e) => {setSortOrder(e.target.value); setCurrentPage(1);}} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-panel)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit' }}><option value="newest">Newest</option><option value="priceAsc">Price: Low - High</option><option value="priceDesc">Price: High - Low</option></select>
                </div>
                <div style={{ backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid var(--border-light)', overflowX: 'auto' }}>
                  <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead><tr>
                      <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Product</th>
                      <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Category</th>
                      <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Price</th>
                      <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Status</th>
                      <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Action</th>
                    </tr></thead>
                    <tbody>
                      {currentProducts.map((prod) => (
                        <tr key={prod.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '15px' }}><div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{prod.image}</div><div><div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{prod.name}</div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>#{prod.id}</div></div></td>
                          <td style={{ padding: '15px 20px', color: 'var(--text-muted)' }}>{prod.category}</td>
                          <td style={{ padding: '15px 20px', color: 'var(--text-main)', fontWeight: 'bold' }}>${prod.price.toFixed(2)}</td>
                          <td style={{ padding: '15px 20px' }}>{prod.stock > 0 ? getStatusBadge('Active') : getStatusBadge('Inactive')}</td>
                          <td style={{ padding: '15px 20px' }}><button onClick={() => handleEdit(prod)} style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '10px', fontWeight: 'bold', fontFamily: 'inherit' }}>Edit</button><button onClick={() => handleDelete(prod.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'inherit' }}>Delete</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {totalPages > 1 && (<div style={{ padding: '15px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>{Array.from({ length: totalPages }, (_, i) => (<button key={i} onClick={() => paginate(i + 1)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-light)', backgroundColor: currentPage === i + 1 ? '#3b82f6' : 'var(--input-bg)', color: currentPage === i + 1 ? '#fff' : 'var(--text-main)', cursor: 'pointer', fontWeight: 'bold' }}>{i + 1}</button>))}</div>)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {categories.map(cat => (
              <div key={cat.id} style={{ backgroundColor: 'var(--bg-panel)', padding: '25px', borderRadius: '12px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{cat.icon}</div>
                <h3 style={{ color: 'var(--text-main)', margin: '0 0 10px 0' }}>{cat.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 15px 0' }}>{cat.items} Products</p>
                {getStatusBadge(cat.status)}
              </div>
            ))}
          </div>
        )}

        {/* 4. ORDERS TAB */}
        {activeTab === 'orders' && (
          <div style={{ backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid var(--border-light)', overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead><tr>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Order ID</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Customer</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Date</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Total</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Status</th>
              </tr></thead>
              <tbody>
                {orders.map((ord, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '15px 20px', color: 'var(--text-main)', fontWeight: 'bold' }}>{ord.id}</td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-main)' }}>{ord.customer}</td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-muted)' }}>{ord.date}</td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-main)', fontWeight: 'bold' }}>{ord.total}</td>
                    <td style={{ padding: '15px 20px' }}>{getStatusBadge(ord.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. CUSTOMERS TAB */}
        {activeTab === 'customers' && (
          <div style={{ backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid var(--border-light)', overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead><tr>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Customer Name</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Orders</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Total Spent</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Status</th>
              </tr></thead>
              <tbody>
                {customers.map((cus, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#8b5cf6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{cus.name.charAt(0)}</div>
                      <div><div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{cus.name}</div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cus.email}</div></div>
                    </td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-muted)' }}>{cus.orders} Orders</td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-main)', fontWeight: 'bold' }}>{cus.spent}</td>
                    <td style={{ padding: '15px 20px' }}>{getStatusBadge(cus.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 6. INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div style={{ backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid var(--border-light)', overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead><tr>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Product Item</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>SKU Code</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Stock Level</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Status</th>
              </tr></thead>
              <tbody>
                {products.map((prod, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '15px 20px', color: 'var(--text-main)', fontWeight: 'bold' }}>{prod.name}</td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-muted)' }}>SKU-100{prod.id}</td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-main)' }}>{prod.stock} units</td>
                    <td style={{ padding: '15px 20px' }}>{prod.stock > 0 ? getStatusBadge('Active') : getStatusBadge('Inactive')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 7. COUPONS TAB */}
        {activeTab === 'coupons' && (
          <div style={{ backgroundColor: 'var(--bg-panel)', borderRadius: '12px', border: '1px solid var(--border-light)', overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead><tr>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Coupon Code</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Discount</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Usage Limit</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Expiry Date</th>
                <th style={{ padding: '15px 20px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>Status</th>
              </tr></thead>
              <tbody>
                {coupons.map((cup, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '15px 20px', color: 'var(--text-main)', fontWeight: 'bold', letterSpacing: '1px' }}>{cup.code}</td>
                    <td style={{ padding: '15px 20px', color: '#10b981', fontWeight: 'bold' }}>{cup.discount}</td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-muted)' }}>{cup.usage}</td>
                    <td style={{ padding: '15px 20px', color: 'var(--text-muted)' }}>{cup.expiry}</td>
                    <td style={{ padding: '15px 20px' }}>{getStatusBadge(cup.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 8. REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {reviews.map(rev => (
              <div key={rev.id} style={{ backgroundColor: 'var(--bg-panel)', padding: '25px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ color: 'var(--text-main)', margin: 0, fontSize: '16px' }}>{rev.user}</h3>
                  <span style={{ fontSize: '14px' }}>{rev.rating}</span>
                </div>
                <p style={{ color: '#3b82f6', fontSize: '13px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Product: {rev.product}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>"{rev.text}"</p>
              </div>
            ))}
          </div>
        )}

        {/* 9. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '600px' }}>
            <div style={{ margin: 0, width: '100%', backgroundColor: 'var(--bg-panel)', border: '1px solid var(--border-light)', padding: '40px', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '22px', marginBottom: '25px', color: 'var(--text-main)', marginTop: 0 }}>General Settings</h2>
              <form onSubmit={(e) => { e.preventDefault(); alert('Settings saved successfully!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><label style={{color: 'var(--text-muted)', fontWeight: 'bold', fontSize: '15px'}}>Store Name</label><input type="text" defaultValue="InternGrow Store" style={{ width: '100%', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '14px', borderRadius: '10px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} /></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><label style={{color: 'var(--text-muted)', fontWeight: 'bold', fontSize: '15px'}}>Support Email</label><input type="email" defaultValue="support@store.com" style={{ width: '100%', background: 'var(--input-bg)', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '14px', borderRadius: '10px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} /></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}><label style={{color: 'var(--text-muted)', fontWeight: 'bold', fontSize: '15px'}}>Currency</label><select style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}><option>USD ($)</option><option>PKR (Rs)</option><option>EUR (€)</option></select></div>
                <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit', fontSize: '16px', marginTop: '10px' }}>Save Preferences</button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default EcommerceDashboard;