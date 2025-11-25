import './GoalCard.css';

interface GoalCardProps {
  daysLeft?: number;
  progress?: number;
  goalName?: string;
  goalDesc?: string;
}

function GoalCard({ 
  daysLeft = 0, 
  progress = 0, 
  goalName = 'goal name', 
  goalDesc = 'goal desc' 
}: GoalCardProps) {
  return (
    <div className="goal-card">
      <div className="goal-card-header">
        <span className="days-left">ends in {daysLeft} days</span>
      </div>
      <div className="goal-progress-section">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-percentage">{progress}%</span>
      </div>
      <div className="goal-info">
        <h3 className="goal-name">{goalName}</h3>
        <p className="goal-desc">{goalDesc}</p>
      </div>
    </div>
  );
}

export default GoalCard;

