import { useState } from 'react';
import BuddyInviteCard from './BuddyInviteCard';
import './InviteBuddyModal.css';

interface InviteBuddyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function InviteBuddyModal({ isOpen, onClose }: InviteBuddyModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');

  if (!isOpen) return null;

  const potentialBuddies = [
    { firstName: 'John', lastName: 'Doe', username: 'johndoe' },
    { firstName: 'Jane', lastName: 'Smith', username: 'janesmith' },
    { firstName: 'Mike', lastName: 'Johnson', username: 'mikej' },
    { firstName: 'Sarah', lastName: 'Wilson', username: 'sarahw' },
    { firstName: 'David', lastName: 'Brown', username: 'davidb' },
    { firstName: 'Emily', lastName: 'Davis', username: 'emilyd' },
    { firstName: 'Chris', lastName: 'Miller', username: 'chrism' },
    { firstName: 'Lisa', lastName: 'Garcia', username: 'lisag' },
    { firstName: 'Alex', lastName: 'Rodriguez', username: 'alexr' },
    { firstName: 'Emma', lastName: 'Martinez', username: 'emmam' },
    { firstName: 'Ryan', lastName: 'Hernandez', username: 'ryanh' },
    { firstName: 'Anna', lastName: 'Lopez', username: 'annal' },
    { firstName: 'Kevin', lastName: 'Gonzalez', username: 'keving' },
    { firstName: 'Mia', lastName: 'Wilson', username: 'miaw' },
    { firstName: 'Tyler', lastName: 'Anderson', username: 'tylera' },
    { firstName: 'Sophie', lastName: 'Thomas', username: 'sophiet' },
    { firstName: 'Jacob', lastName: 'Taylor', username: 'jacobt' },
    { firstName: 'Olivia', lastName: 'Moore', username: 'oliviam' }
  ];

  // Filter buddies based on applied search term
  const filteredBuddies = appliedSearchTerm
    ? potentialBuddies.filter(buddy => {
        const fullName = `${buddy.firstName} ${buddy.lastName}`.toLowerCase();
        const searchLower = appliedSearchTerm.toLowerCase();
        return (
          buddy.firstName.toLowerCase().includes(searchLower) ||
          buddy.lastName.toLowerCase().includes(searchLower) ||
          buddy.username.toLowerCase().includes(searchLower) ||
          fullName.includes(searchLower)
        );
      })
    : potentialBuddies;

  return (
    <div className="invite-buddy-modal-overlay" onClick={onClose}>
      <div className="invite-buddy-modal" onClick={(e) => e.stopPropagation()}>
        {/* Static header section */}
        <div className="invite-buddy-static-section">
          <div className="invite-buddy-modal-header">
            <h2 className="invite-buddy-title">Invite a Buddy!</h2>
            <button className="invite-buddy-modal-close-btn" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
          <p className="invite-buddy-description">
            To help you save more effectively, you can add one or more friends as buddies to support you in managing and growing your savings.
          </p>
          
          <div className="invite-buddy-search-section">
            <div className="invite-buddy-search-container">
              <input
                type="text"
                placeholder="search username"
                className="invite-buddy-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="invite-buddy-icon-btn invite-buddy-search-icon-btn"
              onClick={() => setAppliedSearchTerm(searchTerm)}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
          </div>
        </div>
        
        {/* Scrollable buddies list section */}
        <div className="invite-buddy-list-section">
          <div className="invite-buddy-invite-list">
            {filteredBuddies.map((buddy, index) => (
              <BuddyInviteCard
                key={`invite-${index}`}
                firstName={buddy.firstName}
                lastName={buddy.lastName}
                username={buddy.username}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteBuddyModal;