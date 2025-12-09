import { useState } from 'react';
import Navigation from '../components/Navigation';
import PinnedGoalCard from '../components/PinnedGoalCard';
import GoalCard from '../components/GoalCard';
import AddGoalModal from '../components/AddGoalModal';
import './Goals.css';

function Goals() {
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);

  const openAddGoalModal = () => setIsAddGoalModalOpen(true);
  const closeAddGoalModal = () => setIsAddGoalModalOpen(false);

  const handleSaveGoal = (goal: any) => {
    console.log('New goal saved:', goal);
  };
  const pinnedGoals = [
    { goalName: 'goal name', goalDesc: 'goal desc', progress: 60 },
    { goalName: 'goal name', goalDesc: 'goal desc', progress: 60 },
    { goalName: 'goal name', goalDesc: 'goal desc', progress: 60 }
  ];

  const goals = [
    { daysLeft: 60, progress: 90, goalName: 'Emergency Fund', goalDesc: 'Save for unexpected expenses' },
    { daysLeft: 120, progress: 40, goalName: 'Vacation Trip', goalDesc: 'Save for family vacation' },
    { daysLeft: 420, progress: 69, goalName: 'New Car', goalDesc: 'Down payment for car' },
    { daysLeft: 76, progress: 67, goalName: 'Home Renovation', goalDesc: 'Kitchen and bathroom upgrades' },
    { daysLeft: 180, progress: 25, goalName: 'Education Fund', goalDesc: 'Save for children\'s education' },
    { daysLeft: 90, progress: 55, goalName: 'Wedding Preparation', goalDesc: 'Save for wedding expenses' },
    { daysLeft: 365, progress: 45, goalName: 'Business Investment', goalDesc: 'Capital for new business' },
    { daysLeft: 240, progress: 30, goalName: 'Retirement Plan', goalDesc: 'Long-term retirement savings' },
    { daysLeft: 150, progress: 80, goalName: 'Debt Payment', goalDesc: 'Clear credit card debt' },
    { daysLeft: 300, progress: 20, goalName: 'Investment Portfolio', goalDesc: 'Build investment portfolio' },
    { daysLeft: 200, progress: 35, goalName: 'Medical Expenses', goalDesc: 'Save for medical procedures' },
    { daysLeft: 110, progress: 60, goalName: 'Home Security', goalDesc: 'Security system installation' }
  ];

  return (
    <div className="goals-container">
      <Navigation activeItem="Goals" />
      
      <div className="goals-layout">
        <div className="left-panel">
          <h2 className="section-title">Goals</h2>
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
          <div className="panel-header goals-panel-header">
            <div className="search-filter-section goals-search-controls">
              <div className="search-container goals-search-container">
                <input 
                  type="text" 
                  placeholder="Search Goals"
                  className="search-input"
                />
              </div>
              <button className="icon-btn search-icon-btn" type="button">
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
