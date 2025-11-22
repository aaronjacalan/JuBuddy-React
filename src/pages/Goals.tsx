import Navigation from '../components/Navigation';
import PinnedGoalCard from '../components/PinnedGoalCard';
import GoalCard from '../components/GoalCard';
import './Goals.css';

function Goals() {
  const pinnedGoals = [
    { goalName: 'goal name', goalDesc: 'goal desc', progress: 60 },
    { goalName: 'goal name', goalDesc: 'goal desc', progress: 60 },
    { goalName: 'goal name', goalDesc: 'goal desc', progress: 60 }
  ];

  const goals = [
    { daysLeft: 999, progress: 60, goalName: 'goal name', goalDesc: 'goal desc' },
    { daysLeft: 999, progress: 60, goalName: 'goal name', goalDesc: 'goal desc' },
    { daysLeft: 999, progress: 60, goalName: 'goal name', goalDesc: 'goal desc' },
    { daysLeft: 999, progress: 60, goalName: 'goal name', goalDesc: 'goal desc' }
  ];

  return (
    <div className="goals-container">
      <Navigation activeItem="Goals" />
      
      <main className="goals-content">
        <div className="left-panel">
          <h2 className="section-title">pinned goals</h2>
          <div className="pinned-goals-list">
            {pinnedGoals.map((goal, index) => (
              <PinnedGoalCard
                key={`pinned-${index}`}
                goalName={goal.goalName}
                goalDesc={goal.goalDesc}
                progress={goal.progress}
              />
            ))}
          </div>
        </div>
        
        <div className="right-panel">
          <div className="panel-header">
            <button className="action-btn add-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
              </svg>
              add
            </button>
            
            <div className="search-filter-section">
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search Goals"
                  className="search-input"
                />
                <button className="search-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
              <button className="filter-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6H21M6 12H18M9 18H15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="goals-section">
            <h2 className="section-title">goals</h2>
            <div className="goals-grid">
              {goals.map((goal, index) => (
                <GoalCard
                  key={`goal-${index}`}
                  daysLeft={goal.daysLeft}
                  progress={goal.progress}
                  goalName={goal.goalName}
                  goalDesc={goal.goalDesc}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Goals;
