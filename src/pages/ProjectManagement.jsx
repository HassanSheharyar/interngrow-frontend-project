import { useState } from 'react';

function ProjectManagement() {
  const [activeProject, setActiveProject] = useState('Frontend Revamp');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [selectedTask, setSelectedTask] = useState(null); // Details Modal ke liye
  const [showTaskForm, setShowTaskForm] = useState(false); // Naya Task Modal

  // Naye task ka data store karne ke liye state
  const [newTask, setNewTask] = useState({ title: '', desc: '', priority: 'Medium', assignee: 'Ali', dueDate: '' });

  // Team Members (Dummy Data)
  const team = [
    { id: 1, name: 'Ali', avatar: '👨‍💻' },
    { id: 2, name: 'Sara', avatar: '👩‍🎨' },
    { id: 3, name: 'Zain', avatar: '🧑‍💼' }
  ];

  // Tasks Data
  const [tasks, setTasks] = useState([
    { 
      id: 'task-1', title: 'Design Homepage UI', status: 'todo', priority: 'High', dueDate: 'Aug 15, 2026', assignee: 'Sara', 
      desc: 'Create wireframes and final UI for the new homepage.', 
      comments: ['Looks good so far!', 'Make sure to check mobile view.'],
      activity: ['Aug 11: Task Created', 'Aug 12: Assigned to Sara']
    },
    { 
      id: 'task-2', title: 'Setup React Router', status: 'inProgress', priority: 'High', dueDate: 'Aug 14, 2026', assignee: 'Ali',
      desc: 'Implement routing for Dashboard, Products, and Settings.', 
      comments: [], activity: ['Aug 10: Task Created', 'Aug 11: Moved to In Progress']
    },
    { 
      id: 'task-3', title: 'Fix Header Alignment', status: 'review', priority: 'Medium', dueDate: 'Aug 13, 2026', assignee: 'Zain',
      desc: 'Header is overlapping with the sidebar on tablet devices.', 
      comments: ['Added a fix, please review.'], activity: ['Aug 09: Task Created', 'Aug 12: Moved to Review']
    },
    { 
      id: 'task-4', title: 'Update CSS Variables', status: 'done', priority: 'Low', dueDate: 'Aug 10, 2026', assignee: 'Ali',
      desc: 'Move hardcoded colors to App.css variables.', 
      comments: [], activity: ['Aug 08: Task Created', 'Aug 10: Marked as Done']
    }
  ]);

  // --- NAYA TASK ADD KARNE KA LOGIC ---
  const handleAddTask = (e) => {
    e.preventDefault();
    const taskToAdd = {
      id: `task-${Date.now().toString().slice(-4)}`, // Unique ID generate karega
      title: newTask.title,
      desc: newTask.desc,
      status: 'todo', // Naya task hamesha 'To Do' mein jayega
      priority: newTask.priority,
      dueDate: newTask.dueDate || 'No Date',
      assignee: newTask.assignee,
      comments: [],
      activity: ['Task Created Manually']
    };
    
    setTasks([taskToAdd, ...tasks]); // List mein add kar diya
    setShowTaskForm(false); // Modal band kar diya
    setNewTask({ title: '', desc: '', priority: 'Medium', assignee: 'Ali', dueDate: '' }); // Form clear kar diya
  };

  // --- DRAG & DROP LOGIC ---
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('taskId', id);
    setTimeout(() => { e.target.style.opacity = '0.5'; }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData('taskId');
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus, activity: [...task.activity, `Moved to ${newStatus}`] } : task
    ));
  };

  // --- PROGRESS BAR CALCULATION ---
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Filter Tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    if (priority === 'High') return '#ef4444';
    if (priority === 'Medium') return '#f59e0b';
    return '#10b981';
  };

  // Input Handlers
  const handleInput = (e) => setNewTask({ ...newTask, [e.target.name]: e.target.value });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '85vh', boxSizing: 'border-box', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-light)', backgroundColor: 'var(--app-bg)' }}>
      
      {/* 1. TOP HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '28px', color: 'var(--text-main)', margin: '0 0 10px 0' }}>{activeProject}</h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Team:</span>
            {team.map(member => (
              <div key={member.id} title={member.name} style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', border: '1px solid var(--border-light)', cursor: 'pointer' }}>
                {member.avatar}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit' }} />
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-panel)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit' }}>
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={() => setShowTaskForm(true)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit' }}>+ Create Task</button>
        </div>
      </div>

      {/* 2. PROGRESS BAR */}
      <div style={{ marginBottom: '30px', backgroundColor: 'var(--bg-panel)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <strong style={{ color: 'var(--text-main)' }}>Project Progress</strong>
          <strong style={{ color: '#3b82f6' }}>{progressPercent}%</strong>
        </div>
        <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--input-bg)', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#3b82f6', transition: 'width 0.4s ease' }}></div>
        </div>
      </div>

      {/* 3. KANBAN BOARD */}
      <div style={{ display: 'flex', gap: '20px', flex: 1, overflowX: 'auto', paddingBottom: '10px' }}>
        {[
          { id: 'todo', title: 'To Do', emoji: '📌' },
          { id: 'inProgress', title: 'In Progress', emoji: '🚀' },
          { id: 'review', title: 'Review', emoji: '👀' },
          { id: 'done', title: 'Done', emoji: '✅' }
        ].map(column => (
          <div 
            key={column.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
            style={{ flex: '1', minWidth: '280px', backgroundColor: 'var(--bg-panel)', borderRadius: '12px', padding: '15px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column' }}
          >
            <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-main)', fontSize: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <span>{column.emoji} {column.title}</span>
              <span style={{ backgroundColor: 'var(--input-bg)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                {filteredTasks.filter(t => t.status === column.id).length}
              </span>
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
              {filteredTasks.filter(t => t.status === column.id).map(task => (
                <div 
                  key={task.id} 
                  draggable 
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedTask(task)}
                  style={{ backgroundColor: 'var(--app-bg)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-light)', cursor: 'grab', transition: 'transform 0.2s ease, boxShadow 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                    <span style={{ backgroundColor: `${getPriorityColor(task.priority)}20`, color: getPriorityColor(task.priority), padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                      {task.priority}
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-main)', fontSize: '15px', lineHeight: '1.4' }}>{task.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>📅 {task.dueDate}</span>
                    <div title={task.assignee} style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: '1px solid var(--border-light)' }}>
                      {team.find(m => m.name === task.assignee)?.avatar || '👤'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 4. 🔥 NAYA TASK BANANE KA MODAL 🔥 */}
      {showTaskForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: 'var(--bg-panel)', width: '100%', maxWidth: '500px', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <h2 style={{ margin: '0 0 20px 0', color: 'var(--text-main)', fontSize: '22px' }}>Create New Task</h2>
            <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" name="title" value={newTask.title} onChange={handleInput} placeholder="Task Title (e.g. Update Logo)" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit' }} />
              <textarea name="desc" value={newTask.desc} onChange={handleInput} placeholder="Task Description..." required rows="3" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
              
              <div style={{ display: 'flex', gap: '15px' }}>
                <select name="priority" value={newTask.priority} onChange={handleInput} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit' }}>
                  <option value="High">🔴 High Priority</option>
                  <option value="Medium">🟠 Medium Priority</option>
                  <option value="Low">🟢 Low Priority</option>
                </select>
                <select name="assignee" value={newTask.assignee} onChange={handleInput} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit' }}>
                  {team.map(m => <option key={m.id} value={m.name}>{m.avatar} {m.name}</option>)}
                </select>
              </div>
              
              <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleInput} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--input-bg)', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit' }} />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit' }}>Add Task</button>
                <button type="button" onClick={() => setShowTaskForm(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'transparent', color: 'var(--text-main)', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. TASK DETAILS MODAL */}
      {selectedTask && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: 'var(--bg-panel)', width: '100%', maxWidth: '600px', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            
            <div style={{ padding: '20px 25px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>{selectedTask.id}</span>
                <span style={{ backgroundColor: `${getPriorityColor(selectedTask.priority)}20`, color: getPriorityColor(selectedTask.priority), padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{selectedTask.priority} Priority</span>
              </div>
              <button onClick={() => setSelectedTask(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ padding: '25px', overflowY: 'auto' }}>
              <h2 style={{ margin: '0 0 20px 0', color: 'var(--text-main)', fontSize: '22px' }}>{selectedTask.title}</h2>
              
              <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', flexWrap: 'wrap' }}>
                <div><span style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'block', marginBottom: '5px' }}>Assignee</span><strong style={{ color: 'var(--text-main)', fontSize: '14px' }}>{selectedTask.assignee}</strong></div>
                <div><span style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'block', marginBottom: '5px' }}>Due Date</span><strong style={{ color: 'var(--text-main)', fontSize: '14px' }}>{selectedTask.dueDate}</strong></div>
                <div><span style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'block', marginBottom: '5px' }}>Status</span><strong style={{ color: 'var(--text-main)', fontSize: '14px', textTransform: 'capitalize' }}>{selectedTask.status}</strong></div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: 'var(--text-main)', fontSize: '16px', marginBottom: '10px' }}>Description</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', margin: 0, padding: '15px', backgroundColor: 'var(--input-bg)', borderRadius: '8px' }}>{selectedTask.desc}</p>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: 'var(--text-main)', fontSize: '16px', marginBottom: '10px' }}>Comments</h3>
                {selectedTask.comments.length === 0 ? <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No comments yet.</p> : (
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '14px' }}>
                    {selectedTask.comments.map((c, i) => <li key={i} style={{ marginBottom: '8px' }}>{c}</li>)}
                  </ul>
                )}
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <input type="text" placeholder="Write a comment..." style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--app-bg)', color: 'var(--text-main)', outline: 'none' }} />
                  <button style={{ padding: '10px 15px', borderRadius: '8px', border: 'none', background: 'var(--input-bg)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 'bold' }}>Send</button>
                </div>
              </div>

              <div>
                <h3 style={{ color: 'var(--text-main)', fontSize: '16px', marginBottom: '10px' }}>Activity Timeline</h3>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '13px', borderLeft: '2px solid var(--border-light)', listStyle: 'none', marginLeft: '5px' }}>
                  {selectedTask.activity.map((act, i) => (
                    <li key={i} style={{ position: 'relative', paddingLeft: '15px', marginBottom: '15px' }}>
                      <span style={{ position: 'absolute', left: '-25px', top: '2px', width: '10px', height: '10px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></span>
                      {act}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProjectManagement;