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
            <circle cx="25" cy="25" r="25" fill="#B8E6B8"/>
            <circle cx="25" cy="20" r="7" fill="#00BCD4" stroke="#fff" strokeWidth="2"/>
            <path d="M10 40C10 32 17 27 25 27C33 27 40 32 40 40" fill="#00BCD4" stroke="#fff" strokeWidth="2"/>
            <rect x="18" y="18" width="5" height="2" fill="#000"/>
            <rect x="27" y="18" width="5" height="2" fill="#000"/>
            <rect x="20" y="22" width="10" height="1" fill="#000"/>
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

