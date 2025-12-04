import { useState } from 'react';
import Navigation from '../components/Navigation';
import BuddyCard from '../components/BuddyCard';
import InviteBuddyModal from '../components/InviteBuddyModal';
import './Buddies.css';

function Buddies() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const buddies = [
    { name: 'Jairus Espina Ruhmer' },
    { name: 'Ruhmer Espina Jairus' },
    { name: 'Ruhmer Jairus Espina' },
    { name: 'Espina Jairus Ruhmer' },
    { name: 'Jairus Ruhmer Espina' }
  ];

  const openInviteModal = () => setIsInviteModalOpen(true);
  const closeInviteModal = () => setIsInviteModalOpen(false);

  return (
    <div className="buddies-container">
      <Navigation activeItem="Buddies" />
      
      <div className="buddies-layout">
        <header className="buddies-header">
          <h1 className="page-title">View other's Progress</h1>
          <div className="header-actions">
            <div className="search-filter-section">
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="search username"
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
            </div>
            <button onClick={openInviteModal} className="invite-buddy-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Invite Buddy
            </button>
          </div>
        </header>
        
        <main className="buddies-content">
          <div className="buddies-grid">
            {buddies.map((buddy, index) => (
              <BuddyCard key={`buddy-${index}`} name={buddy.name} />
            ))}
          </div>
        </main>
      </div>

      {/* Invite Buddy Modal */}
      <InviteBuddyModal 
        isOpen={isInviteModalOpen} 
        onClose={closeInviteModal} 
      />
    </div>
  );
}

export default Buddies;
