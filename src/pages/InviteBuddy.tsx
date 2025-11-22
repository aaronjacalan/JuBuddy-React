import Navigation from '../components/Navigation';
import BuddyInviteCard from '../components/BuddyInviteCard';
import './InviteBuddy.css';

function InviteBuddy() {
  const potentialBuddies = [
    { firstName: 'Firstname', lastName: 'Lastname', username: 'username' },
    { firstName: 'Firstname', lastName: 'Lastname', username: 'username' },
    { firstName: 'Firstname', lastName: 'Lastname', username: 'username' },
    { firstName: 'Firstname', lastName: 'Lastname', username: 'username' }
  ];

  return (
    <div className="invite-buddy-container">
      <Navigation activeItem="Buddies" />
      
      <main className="invite-buddy-content">
        <div className="invite-header">
          <h1 className="invite-title">Invite a Buddy!</h1>
          <p className="invite-description">
            To help you save more effectively, you can add one or more friends as buddies to support you in managing and growing your savings.
          </p>
        </div>
        
        <div className="invite-search-section">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="search username"
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
        
        <div className="buddies-invite-list">
          {potentialBuddies.map((buddy, index) => (
            <BuddyInviteCard
              key={`invite-${index}`}
              firstName={buddy.firstName}
              lastName={buddy.lastName}
              username={buddy.username}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default InviteBuddy;

