import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import AddToJarModal from '../components/AddToJarModal';
import './VirtualJar.css';

interface JarItem {
  id: number;
  name: string;
  cost: number;
  status: 'on_hold' | 'purchased' | 'expired';
  date_added: string;
  hold_until: string;
  is_expired: boolean;
  is_pinned?: boolean;
}

function VirtualJar() {
  const [items, setItems] = useState<JarItem[]>([]);
  const [isAddToJarModalOpen, setIsAddToJarModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getSavedPins = (): number[] => {
    const saved = localStorage.getItem('jubuddy_pinned_ids');
    return saved ? JSON.parse(saved) : [];
  };

  const fetchItems = async () => {
    try {
      const savedUser = localStorage.getItem('jubuddy_user');
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      // UPDATED: Added user_id param
      const response = await fetch(`http://127.0.0.1:8000/jars/api/items/?user_id=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        const savedPins = getSavedPins();
        const mergedItems = data.map((item: JarItem) => ({
          ...item,
          is_pinned: savedPins.includes(item.id) 
        }));
        setItems(mergedItems);
      }
    } catch (error) {
      console.error("Failed to fetch jar items", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSaveJarItem = async (itemData: { name: string; amount: number }) => {
    try {
      const savedUser = localStorage.getItem('jubuddy_user');
      if (!savedUser) return;
      const user = JSON.parse(savedUser);

      const response = await fetch('http://127.0.0.1:8000/jars/api/add/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            user_id: user.id, // UPDATED: Added user_id
            name: itemData.name, 
            cost: itemData.amount 
        }),
      });
      if (response.ok) {
        fetchItems();
        closeAddToJarModal();
      }
    } catch (error) { alert("Failed to add item"); }
  };

  const handlePurchase = async (id: number) => {
    if (!window.confirm("Buy this item? Money will be deducted from your account.")) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/jars/api/purchase/${id}/`, { method: 'POST' });
      if (response.ok) {
        fetchItems();
      } else {
        const result = await response.json();
        alert(result.error);
      }
    } catch (error) { alert("Purchase failed"); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Remove this item from the wishlist?")) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/jars/api/delete/${id}/`, { method: 'DELETE' });
      if (response.ok) fetchItems();
    } catch (error) { alert("Delete failed"); }
  };

  const handleClearHistory = async () => {
    const historyItems = items.filter(item => item.status === 'purchased' || item.status === 'expired');
    if (historyItems.length === 0) return;
    if (!window.confirm(`Are you sure you want to permanently delete ${historyItems.length} history items?`)) return;

    try {
      const deletePromises = historyItems.map(item => 
        fetch(`http://127.0.0.1:8000/jars/api/delete/${item.id}/`, { method: 'DELETE' })
      );
      await Promise.all(deletePromises);
      fetchItems();
    } catch (error) {
      alert("Failed to clear some items.");
    }
  };

  const openAddToJarModal = () => setIsAddToJarModalOpen(true);
  const closeAddToJarModal = () => setIsAddToJarModalOpen(false);

  const togglePin = (id: number) => {
    const savedPins = getSavedPins();
    let newPins;
    if (savedPins.includes(id)) {
      newPins = savedPins.filter(pinId => pinId !== id); 
    } else {
      newPins = [...savedPins, id]; 
    }
    localStorage.setItem('jubuddy_pinned_ids', JSON.stringify(newPins));
    setItems(items.map(item => item.id === id ? { ...item, is_pinned: !item.is_pinned } : item));
  };

  const searchFiltered = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const mainList = searchFiltered.filter(i => i.status === 'on_hold');
  const pinnedList = mainList.filter(i => i.is_pinned);
  const historyList = items.filter(i => i.status === 'purchased' || i.status === 'expired');

  return (
    <div className="virtual-jar-container">
      <Navigation activeItem="Item Wishlist" />
      
      <div className="virtual-jar-layout">
        <div className="left-panel">
          <h2 className="section-title">Pinned Priority</h2>
          <div className="pinned-list-container">
            {pinnedList.length > 0 ? (
              pinnedList.map((item) => (
                <div key={`pinned-${item.id}`} className="pinned-item">
                  <div className="item-info">
                    <span className="item-label">{item.name}</span>
                    <div className="item-amount">
                        <span className="peso-sign">₱</span>
                        <span className="amount">
                            {item.cost.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-pinned-state">
                Tap the <span style={{color: '#06D2CA'}}>★</span> icon to pin items here.
              </div>
            )}
          </div>
        </div>
        
        <div className="right-panel">
          <div className="panel-header">
             <div className="search-container">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <circle cx="11" cy="11" r="8"></circle>
                   <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search Jar..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>

             <div className="action-buttons">
                <button onClick={() => setIsHistoryModalOpen(true)} className="action-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  History
                </button>
                <button onClick={openAddToJarModal} className="action-btn">
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3V13M3 8H13"/>
                   </svg>
                   Add New Item
                </button>
             </div>
          </div>
          
          <div className="jar-section">
            <div className="jar-content-container">
              <div className="jar-grid">
                {mainList.map((item) => (
                  <div key={item.id} className={`jar-item ${item.status}`}>
                    
                    <button 
                      onClick={() => togglePin(item.id)}
                      className={`pin-btn ${item.is_pinned ? 'active' : ''}`}
                      title={item.is_pinned ? "Unpin" : "Pin to Priority"}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill={item.is_pinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </button>

                    <div className="jar-item-content">
                      <div className="jar-item-info">
                        <div style={{display:'flex', flexDirection:'column', overflow:'hidden', flex: 1, paddingRight: '1rem'}}>
                           <span className="jar-item-name">{item.name}</span>
                           <span className="jar-item-status">On Hold</span>
                        </div>
                        
                        <div style={{display:'flex', alignItems:'center', gap:'1rem', flexShrink: 0}}>
                           <span className="jar-item-amount">
                               ₱{item.cost.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                           </span>
                           
                           <button className="buy-btn" onClick={() => handlePurchase(item.id)}>
                             Buy
                           </button>
                        </div>
                      </div>
                    </div>

                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(item.id)} 
                      title="Remove Item"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>

                  </div>
                ))}
                
                {mainList.length === 0 && (
                   <div style={{textAlign: 'center', padding: '4rem', color: '#a0aec0'}}>
                      No items found. Start by adding one!
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddToJarModal 
        isOpen={isAddToJarModalOpen}
        onClose={closeAddToJarModal}
        onSave={handleSaveJarItem}
      />

      {isHistoryModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>History</h2>
              <button onClick={() => setIsHistoryModalOpen(false)} className="close-btn">&times;</button>
            </div>

            <div className="history-list">
              {historyList.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#a0aec0', margin: '2rem 0' }}>No purchased or expired items yet.</p>
              ) : (
                historyList.map(item => (
                  <div key={item.id} className="history-item">
                    <div>
                      <div className="history-name">{item.name}</div>
                      <div className={`history-status ${item.status}`}>
                        {item.status}
                      </div>
                    </div>
                    <div className="history-amount">
                      ₱{item.cost.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="modal-footer">
              {historyList.length > 0 && (
                <button onClick={handleClearHistory} className="danger-btn">
                  Clear History
                </button>
              )}
              <button onClick={() => setIsHistoryModalOpen(false)} className="secondary-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default VirtualJar;