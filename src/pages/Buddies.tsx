import { useState, useEffect, useMemo } from 'react';
import Navigation from '../components/Navigation';
import InviteBuddyModal from '../components/InviteBuddyModal';
import './Buddies.css';

interface SharedDataType {
  id: number;
  name: string;
}

interface BuddyData {
  buddyID: number;
  buddyName: string;
  connectionDate: string;
  sharedDataTypes: SharedDataType[];
  // NEW FIELDS
  balance: number;
  monthlyIncome: number;
  monthlyExpense: number;
}

interface InvitationData {
  requestId: number;
  senderName: string;
  senderId: number;
  dateSent: string;
}

function Buddies() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [buddies, setBuddies] = useState<BuddyData[]>([]);
  const [invitations, setInvitations] = useState<InvitationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');

  const openInviteModal = () => setIsInviteModalOpen(true);
  const closeInviteModal = () => setIsInviteModalOpen(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const savedUser = localStorage.getItem('jubuddy_user');
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      // 1. Fetch Buddies
      const buddiesRes = await fetch(`http://127.0.0.1:8000/buddy/api/list/?user_id=${user.id}`);
      if (buddiesRes.ok) {
        setBuddies(await buddiesRes.json());
      }

      // 2. Fetch Invitations
      const invitesRes = await fetch(`http://127.0.0.1:8000/buddy/api/invitations/?user_id=${user.id}`);
      if (invitesRes.ok) {
        setInvitations(await invitesRes.json());
      }

    } catch (e: any) {
      console.error("Error fetching data:", e);
      setError("Failed to load buddy data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRespondToInvite = async (requestId: number, action: 'accept' | 'decline') => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/buddy/api/respond/${requestId}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: action })
      });
      if (response.ok) fetchData();
    } catch (error) { alert("Action failed"); }
  };

  const filteredBuddies = useMemo(() => {
    if (!searchInput.trim()) return buddies;
    const query = searchInput.toLowerCase();
    return buddies.filter(b => b.buddyName.toLowerCase().includes(query));
  }, [buddies, searchInput]);

  const getInitials = (name: string) => name ? name.substring(0, 2).toUpperCase() : '??';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatMoney = (amount: number) => {
    return amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="buddies-container">
      <Navigation activeItem="Buddies" />

      <div className="buddies-layout">
        
        {/* LEFT PANEL: INVITATIONS */}
        <div className="buddies-left-panel">
          <h2 className="section-title">Buddy Invitations</h2>
          <div className="pinned-buddies-list">
             {invitations.length === 0 && !isLoading ? (
                <div style={{color: '#999', fontStyle: 'italic', padding: '1rem'}}>
                    No pending invitations.
                </div>
             ) : (
                invitations.map(invite => (
                  <div key={invite.requestId} className="pinned-buddy-card invite-card">
                    <div className="pinned-avatar">
                      {getInitials(invite.senderName)}
                    </div>
                    <div className="pinned-info" style={{flex: 1}}>
                      <span className="pinned-name">{invite.senderName}</span>
                      <span className="pinned-status" style={{color: '#cbd5e0', fontSize: '0.75rem'}}>
                        Sent {formatDate(invite.dateSent)}
                      </span>
                    </div>
                    <div className="invite-actions" style={{display: 'flex', gap: '0.5rem'}}>
                        <button className="icon-btn accept-btn" onClick={() => handleRespondToInvite(invite.requestId, 'accept')} style={{background: '#48bb78', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </button>
                        <button className="icon-btn decline-btn" onClick={() => handleRespondToInvite(invite.requestId, 'decline')} style={{background: '#e53e3e', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                  </div>
                ))
             )}
          </div>
        </div>

        {/* RIGHT PANEL: MAIN BUDDY LIST */}
        <div className="buddies-right-panel">
          <div className="buddies-panel-header">
            <div className="buddies-controls-wrapper">
              <div className="search-container">
                <div className="search-icon-left">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input type="text" placeholder="Search buddies..." className="search-input" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              </div>
              <button onClick={openInviteModal} className="invite-buddy-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3"><path d="M8 3V13M3 8H13"/></svg>
                Invite Buddy
              </button>
            </div>
          </div>

          <div className="buddies-section">
            <div className="buddies-content-container">
              {error && <div className="error-message">{error}</div>}
              {isLoading && <div className="loading-message">Loading...</div>}
              
              {!isLoading && !error && (
                filteredBuddies.length === 0 ? (
                  <div className="empty-state">No buddies yet. Invite someone!</div>
                ) : (
                  <div className="buddies-grid">
                    {filteredBuddies.map((buddy) => (
                      <div key={buddy.buddyID} className="buddy-card-item" style={{display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem'}}>
                        
                        {/* Header: Avatar + Name */}
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                            <div className="buddy-avatar-large">
                              {getInitials(buddy.buddyName)}
                            </div>
                            <div className="buddy-info-main">
                              <h3>{buddy.buddyName}</h3>
                              <p className="buddy-since">Connected since {formatDate(buddy.connectionDate)}</p>
                            </div>
                        </div>

                        <hr style={{border: '0', borderTop: '1px solid #edf2f7', width: '100%', margin: '0.5rem 0'}} />

                        {/* Stats Grid */}
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', width: '100%'}}>
                            
                            {/* Total Balance */}
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span style={{fontSize: '0.75rem', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Total Balance</span>
                                <span style={{fontSize: '1rem', fontWeight: 'bold', color: '#2d3748'}}>₱{formatMoney(buddy.balance)}</span>
                            </div>

                            {/* Monthly Income */}
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span style={{fontSize: '0.75rem', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Mo. Income</span>
                                <span style={{fontSize: '1rem', fontWeight: 'bold', color: '#48bb78'}}>+₱{formatMoney(buddy.monthlyIncome)}</span>
                            </div>

                            {/* Monthly Expense */}
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span style={{fontSize: '0.75rem', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Mo. Expense</span>
                                <span style={{fontSize: '1rem', fontWeight: 'bold', color: '#e53e3e'}}>-₱{formatMoney(buddy.monthlyExpense)}</span>
                            </div>

                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <InviteBuddyModal isOpen={isInviteModalOpen} onClose={closeInviteModal} />
    </div>
  );
}

export default Buddies;