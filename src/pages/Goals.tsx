import { useState, useEffect, useMemo } from 'react';
import Navigation from '../components/Navigation';
import AddGoalModal from '../components/AddGoalModal';
import FundsModal from '../components/FundsModal';
import DescriptionModal from '../components/DescriptionModal';
import './Goals.css';

interface GoalData {
  goalID: number;
  name: string;
  description: string;
  targetValue: number;
  actualValue: number;
  targetDate: string;
  // Updated status type to include 'expired'
  status: 'active' | 'completed' | 'paused' | 'cancelled' | 'expired';
  progress_percentage: number;
}

function Goals() {
  const [goals, setGoals] = useState<GoalData[]>([]);
  const [searchInput, setSearchInput] = useState('');

  // Modals
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isFundsModalOpen, setIsFundsModalOpen] = useState(false);
  const [isDescModalOpen, setIsDescModalOpen] = useState(false);
  
  const [fundsMode, setFundsMode] = useState<'add' | 'reduce'>('add');
  const [selectedGoal, setSelectedGoal] = useState<GoalData | null>(null);

  const calculateDaysLeft = (targetDateStr: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  };

  const fetchGoals = async () => {
    try {
      const savedUser = localStorage.getItem('jubuddy_user');
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      const response = await fetch(`http://127.0.0.1:8000/goals/api/list/?user_id=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        if(Array.isArray(data)) setGoals(data);
      }
    } catch (error) { console.error("Failed to fetch goals", error); }
  };

  useEffect(() => { fetchGoals(); }, []);

  const handleSaveGoal = async (goalFormData: any) => {
    try {
      const savedUser = localStorage.getItem('jubuddy_user');
      if (!savedUser) {
          alert("User not logged in!");
          return;
      }
      const user = JSON.parse(savedUser);

      const payload = {
        user_id: user.id, 
        name: goalFormData.name,
        description: goalFormData.description || "",
        targetValue: parseFloat(goalFormData.targetAmount),
        targetDate: goalFormData.targetDate
      };

      const response = await fetch('http://127.0.0.1:8000/goals/api/add/', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload),
      });

      const data = await response.json(); 

      if (response.ok) { 
          fetchGoals(); 
          setIsAddGoalModalOpen(false); 
      } else {
          alert(`Failed to save: ${data.error || "Unknown error"}`);
      }
    } catch (error) { 
        alert("Network connection failed.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Permanently delete this goal?")) return;
    await fetch(`http://127.0.0.1:8000/goals/api/delete/${id}/`, { method: 'DELETE' });
    fetchGoals();
  };

  const handleCancelGoal = async (id: number) => {
    if (!window.confirm("Move to Trash (Cancel)?")) return;
    await fetch(`http://127.0.0.1:8000/goals/api/update/${id}/`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'cancelled' })
    });
    fetchGoals();
  };

  const handleMarkComplete = async (goal: GoalData) => {
    if (!window.confirm(`Mark "${goal.name}" as Completed?`)) return;
    await fetch(`http://127.0.0.1:8000/goals/api/update/${goal.goalID}/`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'completed' })
    });
    fetchGoals();
  };

  const handleTogglePause = async (goal: GoalData) => {
    // If it's expired, we probably shouldn't allow pausing, but we'll leave logic flexible
    const newStatus = goal.status === 'active' ? 'paused' : 'active';
    
    // Optimistic update
    setGoals(goals.map(g => g.goalID === goal.goalID ? {...g, status: newStatus} : g));
    
    await fetch(`http://127.0.0.1:8000/goals/api/update/${goal.goalID}/`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus })
    });
    fetchGoals();
  };

  const handleClearHistory = async () => {
    const historyIds = goals.filter(g => g.status === 'completed' || g.status === 'cancelled').map(g => g.goalID);
    if (historyIds.length === 0) return;
    if (!window.confirm("Clear all history?")) return;
    await Promise.all(historyIds.map(id => fetch(`http://127.0.0.1:8000/goals/api/delete/${id}/`, { method: 'DELETE' })));
    fetchGoals();
  };

  const openFundsModal = (goal: GoalData, mode: 'add' | 'reduce') => {
    setSelectedGoal(goal);
    setFundsMode(mode);
    setIsFundsModalOpen(true);
  };

  const handleFundsTransaction = async (amount: number) => {
    if (!selectedGoal) return;
    
    let newTotal = selectedGoal.actualValue;
    if (fundsMode === 'add') {
      newTotal += amount;
    } else {
      newTotal -= amount;
      if (newTotal < 0) newTotal = 0; 
    }

    if (fundsMode === 'add' && newTotal > selectedGoal.targetValue) {
        newTotal = selectedGoal.targetValue;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/goals/api/update/${selectedGoal.goalID}/`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ actualValue: newTotal })
      });
      if (response.ok) {
        fetchGoals();
        setIsFundsModalOpen(false);
        setSelectedGoal(null);
      }
    } catch (error) { alert("Connection Error"); }
  };

  const filteredGoals = useMemo(() => {
    // Show Active, Paused, AND Expired goals in the main list
    const visibleGoals = goals.filter(g => 
        g.status === 'active' || g.status === 'paused' || g.status === 'expired'
    );
    
    if (!searchInput.trim()) return visibleGoals;
    const query = searchInput.toLowerCase();
    return visibleGoals.filter(goal => goal.name.toLowerCase().includes(query) || goal.description.toLowerCase().includes(query));
  }, [goals, searchInput]);

  const pinnedGoals = useMemo(() => {
    return [...goals]
      .map(g => ({ ...g, daysLeft: calculateDaysLeft(g.targetDate) }))
      // Only pin ACTIVE goals that aren't expired yet
      .filter(g => g.status === 'active' && g.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 3);
  }, [goals]);

  const historyGoals = useMemo(() => goals.filter(g => g.status === 'completed' || g.status === 'cancelled'), [goals]);

  return (
    <div className="goals-container">
      <Navigation activeItem="Goals" />
      <div className="goals-layout">
        
        {/* Left Panel */}
        <div className="left-panel">
          <h2 className="section-title">Upcoming Deadlines</h2>
          <div className="pinned-goals-list">
            {pinnedGoals.length === 0 ? (
                <div style={{color: '#999', fontStyle: 'italic', padding: '1rem', fontFamily: 'DMSans'}}>
                    No upcoming deadlines.
                </div>
            ) : (
                pinnedGoals.map(goal => (
                  <div key={goal.goalID} className="pinned-goal-card">
                    <div className="pinned-header">
                      <span className="pinned-name">{goal.name}</span>
                      <span className="pinned-days">{goal.daysLeft} days left</span>
                    </div>
                    <div className="pinned-amount-section">
                      <div className="pinned-currency">₱</div>
                      <div className="pinned-amount">{goal.targetValue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</div>
                    </div>
                    <div className="pinned-progress-track">
                      <div className="pinned-progress-fill" style={{ width: `${goal.progress_percentage}%` }}></div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="panel-header goals-panel-header">
            <div className="goals-controls-wrapper">
              <div className="search-container">
                <div className="search-icon-left">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input type="text" placeholder="Search Goals..." className="search-input" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              </div>
              <div className="goals-header-buttons">
                <button onClick={() => setIsHistoryModalOpen(true)} className="goals-history-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  History
                </button>
                <button onClick={() => setIsAddGoalModalOpen(true)} className="goals-add-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3"><path d="M8 3V13M3 8H13"/></svg>
                  Add New Goal
                </button>
              </div>
            </div>
          </div>
          
          <div className="goals-section">
            <div className="goals-content-container">
              {filteredGoals.length === 0 ? <p style={{textAlign:'center', color:'#666', marginTop:'2rem', fontFamily: 'DMSans'}}>No active goals.</p> : (
                <div className="goals-list-grid">
                  {filteredGoals.map((goal) => {
                    const days = calculateDaysLeft(goal.targetDate);
                    const isFull = goal.actualValue >= goal.targetValue;
                    const isPaused = goal.status === 'paused';
                    
                    // Determine if expired based on DB status OR calculation
                    const isExpired = goal.status === 'expired' || (days < 0 && goal.status !== 'completed');

                    return (
                      <div key={goal.goalID} className="goal-item-row" style={isPaused ? {opacity: 0.7, backgroundColor: '#f9f9f9'} : {}}>
                        <div className="goal-info-block">
                           <span className="goal-name">{goal.name}</span>
                           
                           {/* Status Badge */}
                           <span 
                             className="goal-status" 
                             style={
                               isPaused ? {color: '#dd6b20'} : 
                               isExpired ? {color: '#e53e3e', fontWeight: 'bold'} : 
                               {}
                             }
                           >
                             {isPaused ? 'PAUSED' : (isExpired ? 'EXPIRED' : `${days} DAYS LEFT`)}
                           </span>
                        </div>
                        
                        <div className="goal-progress-block">
                           <div className="progress-labels">
                             <span>{goal.progress_percentage}%</span>
                             <span style={{color:'#a0aec0'}}>₱{goal.actualValue.toLocaleString()} / ₱{goal.targetValue.toLocaleString()}</span>
                           </div>
                           <div className="goal-progress-track">
                             <div className="goal-progress-fill" style={{ 
                               width: `${goal.progress_percentage}%`,
                               // Grey if paused, Red if expired, Teal otherwise
                               backgroundColor: isPaused ? '#cbd5e0' : (isExpired ? '#e53e3e' : '#06D2CA')
                             }}></div>
                           </div>
                        </div>
                        
                        <div className="goal-actions-block">
                           
                           {/* SAVINGS GROUP */}
                           <div className="savings-actions-group">
                               
                               {/* REDUCE (Always visible, even if expired, you might want to withdraw money) */}
                               <button 
                                  className="reduce-funds-btn" 
                                  disabled={isPaused}
                                  onClick={() => openFundsModal(goal, 'reduce')}
                                  title="Reduce Savings"
                               >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                               </button>

                               {/* TOGGLE: Add vs Mark Complete */}
                               {isFull ? (
                                 <button 
                                   className="add-funds-btn" 
                                   style={{backgroundColor: '#48bb78'}} 
                                   onClick={() => handleMarkComplete(goal)}
                                 >
                                   Mark Complete
                                 </button>
                               ) : (
                                 <button 
                                    className="add-funds-btn" 
                                    // Disable adding funds if Paused OR Expired
                                    disabled={isPaused || isExpired} 
                                    onClick={() => openFundsModal(goal, 'add')}
                                    style={isExpired ? {backgroundColor: '#cbd5e0', cursor: 'not-allowed'} : {}}
                                 >
                                    Add Savings
                                 </button>
                               )}
                           </div>

                           {/* Pause Button (Hide if expired) */}
                           {!isExpired && (
                               <button className={`pause-goal-btn ${isPaused ? 'is-paused' : ''}`} onClick={() => handleTogglePause(goal)} title={isPaused ? "Resume" : "Pause"}>
                                  {isPaused ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>}
                               </button>
                           )}

                           <button className="desc-goal-btn" onClick={() => { setSelectedGoal(goal); setIsDescModalOpen(true); }} title="Description">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                           </button>

                           <button className="delete-goal-btn" onClick={() => handleCancelGoal(goal.goalID)} title="Move to Trash">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                           </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddGoalModal isOpen={isAddGoalModalOpen} onClose={() => setIsAddGoalModalOpen(false)} onSave={handleSaveGoal} />
      
      <FundsModal 
        isOpen={isFundsModalOpen} 
        onClose={() => setIsFundsModalOpen(false)} 
        onSave={handleFundsTransaction} 
        goalName={selectedGoal?.name || ''} 
        mode={fundsMode}
        maxLimit={
            selectedGoal 
            ? (fundsMode === 'reduce' 
                ? selectedGoal.actualValue 
                : (selectedGoal.targetValue - selectedGoal.actualValue))
            : undefined
        } 
      />
      
      <DescriptionModal isOpen={isDescModalOpen} onClose={() => setIsDescModalOpen(false)} title={selectedGoal?.name || ''} description={selectedGoal?.description || ''} />
      
      {isHistoryModalOpen && (
        <div className="history-modal-overlay">
          <div className="history-modal-content">
            <div className="history-modal-header"><h2>History</h2><button onClick={() => setIsHistoryModalOpen(false)} className="close-btn">&times;</button></div>
            <div className="history-list">
              {historyGoals.length === 0 ? <p style={{textAlign:'center',color:'#999'}}>No history.</p> : historyGoals.map(g => (
                <div key={g.goalID} className="history-item">
                   <div><div className="history-name">{g.name}</div><div className="history-status" style={{color: g.status === 'completed' ? '#48bb78':'#e53e3e'}}>{g.status.toUpperCase()}</div></div>
                   <div className="history-amount">₱{g.targetValue.toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className="history-modal-footer">
              {historyGoals.length > 0 && <button onClick={handleClearHistory} className="danger-btn">Clear History</button>}
              <button onClick={() => setIsHistoryModalOpen(false)} className="secondary-btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Goals;