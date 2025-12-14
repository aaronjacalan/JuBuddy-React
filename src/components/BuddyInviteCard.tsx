import { useState } from 'react';
import './BuddyInviteCard.css';

interface BuddyInviteCardProps {
  id: number; // Added ID for API calls
  firstName?: string;
  lastName?: string;
  username?: string;
  onInvite?: (id: number) => void; // Callback function
}

function BuddyInviteCard({ 
  id,
  firstName = 'Firstname', 
  lastName = 'Lastname', 
  username = 'username',
  onInvite
}: BuddyInviteCardProps) {
  
  const [invited, setInvited] = useState(false);

  const handleInviteClick = () => {
    setInvited(true);
    if (onInvite) {
      onInvite(id);
    }
  };

  // Helper to get initials for the avatar
  const getInitials = () => {
    const first = firstName ? firstName[0] : '';
    const last = lastName ? lastName[0] : '';
    return (first + last).toUpperCase();
  };

  return (
    <div className="buddy-invite-card">
      <div className="buddy-invite-avatar">
        {/* Switched to Initials to match the main Buddies list style */}
        <span className="invite-avatar-text">{getInitials()}</span>
      </div>
      
      <div className="buddy-invite-info">
        <h3 className="buddy-invite-name">{firstName} {lastName}</h3>
        <p className="buddy-invite-username">@{username}</p>
      </div>
      
      <button 
        className={`invite-btn ${invited ? 'invited' : ''}`} 
        onClick={handleInviteClick}
        disabled={invited}
      >
        {invited ? 'Sent' : 'Invite'}
      </button>
    </div>
  );
}

export default BuddyInviteCard;