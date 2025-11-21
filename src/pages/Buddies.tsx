import { useState } from 'react';
import Navigation from './Navigation';
import BuddyCard from '../components/BuddyCard';
import BuddyInviteCard from '../components/BuddyInviteCard';
import './Buddies.css';

function Buddies() {
  const [showInvite, setShowInvite] = useState(false);

  const buddies = [
    { name: 'Lorem ipsum dolor' },
    { name: 'Lorem ipsum dolor' },
    { name: 'Lorem ipsum dolor' },
    { name: 'Lorem ipsum dolor' },
    { name: 'Lorem ipsum dolor' },
    { name: 'Lorem ipsum dolor' }
  ];

  const potentialBuddies = [
    { firstName: 'Firstname', lastName: 'Lastname', username: 'username' },
    { firstName: 'Firstname', lastName: 'Lastname', username: 'username' },
    { firstName: 'Firstname', lastName: 'Lastname', username: 'username' },
    { firstName: 'Firstname', lastName: 'Lastname', username: 'username' }
  ];

  return (
    <div className="buddies-container">
      <Navigation activeItem="Buddies" />
      
      {!showInvite ? (
        <main className="buddies-content">
          <div className="buddies-header">
            <h1 className="page-title">View a Buddy's progress</h1>
            <div className="header-actions">
              <div className="search-filter-section">
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
              <button className="invite-buddy-btn" onClick={() => setShowInvite(true)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
                </svg>
                Invite Buddy
              </button>
            </div>
          </div>
          
          <div className="buddies-grid">
            {buddies.map((buddy, index) => (
              <BuddyCard key={`buddy-${index}`} name={buddy.name} />
            ))}
          </div>
        </main>
      ) : (
        <main className="buddies-invite-content">
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
            <button className="back-btn" onClick={() => setShowInvite(false)}>
              Back
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
      )}
    </div>
  );
}

export default Buddies;
