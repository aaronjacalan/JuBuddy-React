import './PinnedGoalCard.css';

interface PinnedGoalCardProps {
  goalName?: string;
  goalDesc?: string;
  progress?: number;
  positiveConsequence?: string;
  negativeConsequence?: string;
}

function PinnedGoalCard({ 
  goalName = 'goal name', 
  goalDesc = 'goal desc', 
  progress = 60,
  positiveConsequence = 'positive consequence',
  negativeConsequence = 'negative consequence'
}: PinnedGoalCardProps) {
  return (
    <div className="pinned-goal-card">
      <div className="pinned-goal-info">
        <h3 className="pinned-goal-name">{goalName}</h3>
        <p className="pinned-goal-desc">{goalDesc}</p>
      </div>
      <div className="pinned-goal-progress-section">
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-percentage">{progress}%</span>
      </div>
      <div className="pinned-goal-consequences">
        <p className="consequence positive">{positiveConsequence}</p>
        <p className="consequence negative">{negativeConsequence}</p>
      </div>
    </div>
  );
}

export default PinnedGoalCard;

