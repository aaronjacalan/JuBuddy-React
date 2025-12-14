import { useState, useEffect } from 'react';
import BuddyInviteCard from './BuddyInviteCard';
import './InviteBuddyModal.css';

interface InviteBuddyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

function InviteBuddyModal({ isOpen, onClose }: InviteBuddyModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Reset state when modal closes/opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSearchResults([]);
    }
  }, [isOpen]);

  // Debounced Search Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/buddy/api/search/?q=${encodeURIComponent(searchTerm)}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // --- FIXED HANDLE INVITE ACTION ---
  const handleInviteUser = async (userId: number) => {
    try {
      // 1. Get the Current Logged-in User (Sender)
      const savedUser = localStorage.getItem('jubuddy_user');
      if (!savedUser) {
          alert("You must be logged in to send invites.");
          return;
      }
      const sender = JSON.parse(savedUser);

      // 2. Find the Receiver's Username from the search results
      // (The backend view expects 'username' to find the user)
      const receiver = searchResults.find(user => user.id === userId);
      if (!receiver) {
          console.error("User not found in search results");
          return;
      }

      // 3. Send the Request
      const response = await fetch('http://127.0.0.1:8000/buddy/api/invite/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            sender_id: sender.id,       // Who is sending
            username: receiver.username // Who is receiving
        }),
      });
      
      const result = await response.json();

      if (!response.ok) {
          // Show error if user is already a buddy or invite pending
          alert(result.error || "Failed to send invite");
          throw new Error(result.error);
      }
      
      // Success is handled visually by the BuddyInviteCard button state
      console.log("Invite sent successfully");

    } catch (error) {
      console.error("Invite failed:", error);
    }
  };

  if (!isOpen) return null;

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
                placeholder="search username (min 2 chars)"
                className="invite-buddy-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            <button className="invite-buddy-icon-btn invite-buddy-search-icon-btn">
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
            
            {loading && <div className="invite-buddy-message">Searching...</div>}

            {!loading && searchTerm.length >= 2 && searchResults.length === 0 && (
               <div className="invite-buddy-message">No users found.</div>
            )}

            {!loading && searchTerm.length < 2 && searchResults.length === 0 && (
               <div className="invite-buddy-message">Type a name to search...</div>
            )}

            {searchResults.map((user) => (
              <BuddyInviteCard
                key={user.id}
                id={user.id}
                firstName={user.first_name || 'User'}
                lastName={user.last_name || ''}
                username={user.username}
                onInvite={handleInviteUser}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteBuddyModal;