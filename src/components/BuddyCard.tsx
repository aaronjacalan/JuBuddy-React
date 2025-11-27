import './BuddyCard.css';

interface BuddyCardProps {
  name?: string;
}

function BuddyCard({ name = 'Lorem ipsum dolor' }: BuddyCardProps) {
  return (
    <div className="buddy-card">
      <div className="buddy-card-header">
        <div className="buddy-avatar">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="25" r="25" fill="#06D2CA"/>
          </svg>
        </div>
        <span className="buddy-name">{name}</span>
      </div>
      <div className="buddy-content-grid">
        <div className="content-placeholder"></div>
        <div className="content-placeholder"></div>
        <div className="content-placeholder"></div>
        <div className="content-placeholder"></div>
      </div>
    </div>
  );
}

export default BuddyCard;

