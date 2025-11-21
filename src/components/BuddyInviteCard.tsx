import './BuddyInviteCard.css';

interface BuddyInviteCardProps {
  firstName?: string;
  lastName?: string;
  username?: string;
}

function BuddyInviteCard({ 
  firstName = 'Firstname', 
  lastName = 'Lastname', 
  username = 'username' 
}: BuddyInviteCardProps) {
  return (
    <div className="buddy-invite-card">
      <div className="buddy-invite-avatar">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="25" fill="#00BCD4"/>
          <circle cx="25" cy="20" r="7" fill="#fff" stroke="#fff" strokeWidth="2"/>
          <path d="M10 40C10 32 17 27 25 27C33 27 40 32 40 40" fill="#fff" stroke="#fff" strokeWidth="2"/>
          <rect x="18" y="18" width="5" height="2" fill="#000"/>
          <rect x="27" y="18" width="5" height="2" fill="#000"/>
          <rect x="20" y="22" width="10" height="1" fill="#000"/>
        </svg>
      </div>
      <div className="buddy-invite-info">
        <h3 className="buddy-invite-name">{firstName} {lastName}</h3>
        <p className="buddy-invite-username">@{username}</p>
      </div>
      <button className="invite-btn">Invite</button>
    </div>
  );
}

export default BuddyInviteCard;

