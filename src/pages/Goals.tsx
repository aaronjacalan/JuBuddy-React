import { useState, useMemo } from 'react';
import Navigation from '../components/Navigation';
import GoalCard from '../components/GoalCard';
import AddGoalModal from '../components/AddGoalModal';
import './Goals.css';

interface Goal {
  daysLeft: number;
  progress: number;
  goalName: string;
  goalDesc: string;
}

function Goals() {
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const openAddGoalModal = () => setIsAddGoalModalOpen(true);
  const closeAddGoalModal = () => setIsAddGoalModalOpen(false);

  const handleSaveGoal = (goal: any) => {
    console.log('New goal saved:', goal);
  };

  // Handle search button click
  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  // Handle Enter key press in search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const goals:  Goal[] = [
    { daysLeft: 60, progress: 90, goalName: 'Emergency Fund', goalDesc:  'Save for unexpected expenses' },
    { daysLeft:  120, progress: 40, goalName: 'Vacation Trip', goalDesc: 'Save for family vacation' },
    { daysLeft: 420, progress: 69, goalName: 'New Car', goalDesc: 'Down payment for car' },
    { daysLeft: 76, progress: 67, goalName: 'Home Renovation', goalDesc: 'Kitchen and bathroom upgrades' },
    { daysLeft:  180, progress: 25, goalName: 'Education Fund', goalDesc:  'Save for children\'s education' },
    { daysLeft: 90, progress: 55, goalName: 'Wedding Preparation', goalDesc: 'Save for wedding expenses' },
    { daysLeft: 365, progress: 45, goalName: 'Business Investment', goalDesc: 'Capital for new business' },
    { daysLeft:  240, progress: 30, goalName: 'Retirement Plan', goalDesc: 'Long-term retirement savings' },
    { daysLeft:  150, progress: 80, goalName: 'Debt Payment', goalDesc: 'Clear credit card debt' },
    { daysLeft: 300, progress: 20, goalName: 'Investment Portfolio', goalDesc:  'Build investment portfolio' },
    { daysLeft:  200, progress: 35, goalName: 'Medical Expenses', goalDesc: 'Save for medical procedures' },
    { daysLeft: 110, progress: 60, goalName: 'Home Security', goalDesc: 'Security system installation' }
  ];

  // Get pinned goals (3 goals with nearest deadlines)
  const pinnedGoals = useMemo(() => {
    return [... goals]
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 3);
  }, [goals]);

  // Filter goals based on search query (only when search button is pressed)
  const filteredGoals = useMemo(() => {
    if (!searchQuery. trim()) {
      return goals;
    }
    const query = searchQuery.toLowerCase();
    return goals.filter(goal => 
      goal. goalName.toLowerCase().includes(query) ||
      goal.goalDesc.toLowerCase().includes(query)
    );
  }, [goals, searchQuery]);

  return (
    <div className="goals-container">
      <Navigation activeItem="Goals" />
      
      <div className="goals-layout">
        
        <div className="left-panel">
          <h2 className="section-title">Goals</h2>
          <p className="pinned-subtitle">Upcoming Deadlines</p>
          <div className="pinned-goals-list">
            {pinnedGoals.map((goal, index) => (
              <GoalCard
                key={`pinned-${index}`}
                daysLeft={goal. daysLeft}
                progress={goal. progress}
                goalName={goal.goalName}
                goalDesc={goal.goalDesc}
              />
            ))}
          </div>
        </div>
        
        <div className="right-panel">
          <div className="panel-header goals-panel-header">
            <div className="search-filter-section goals-search-controls">
              <div className="search-container goals-search-container">
                <input 
                  type="text" 
                  placeholder="Search Goals"
                  className="search-input goals-local-search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e. target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button 
                className="icon-btn search-icon-btn" 
                type="button"
                onClick={handleSearch}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="icon-btn filter-btn" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6H21M6 12H18M9 18H15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button onClick={openAddGoalModal} className="action-btn add-btn goals-add-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Add New Goal
              </button>
            </div>
          </div>
          
          <div className="goals-section">
            <div className="goals-content-container">
              {filteredGoals. length === 0 ?  (
                <div className="no-results">
                  <p>No goals found matching "{searchQuery}"</p>
                </div>
              ) : (
                <div className="goals-grid">
                  {filteredGoals.map((goal, index) => (
                    <GoalCard
                      key={`goal-${index}`}
                      daysLeft={goal.daysLeft}
                      progress={goal.progress}
                      goalName={goal.goalName}
                      goalDesc={goal.goalDesc}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      <AddGoalModal 
        isOpen={isAddGoalModalOpen}
        onClose={closeAddGoalModal}
        onSave={handleSaveGoal}
      />
    </div>
  );
}

export default Goals;