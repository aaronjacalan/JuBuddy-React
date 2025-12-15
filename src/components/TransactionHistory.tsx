import { useState, useEffect } from 'react';
import './TransactionHistory.css';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'expense' | 'income';
  date: string;
  category: string;
}

interface TransactionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

function TransactionHistory({ isOpen, onClose }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'expense' | 'income'>('all');
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      // 1. Get the logged-in user from LocalStorage
      const savedUser = localStorage.getItem('jubuddy_user');
      if (!savedUser) {
        console.error("User not logged in");
        setLoading(false);
        return;
      }
      const user = JSON.parse(savedUser);

      // 2. Append user_id to the URL
      const response = await fetch(`http://127.0.0.1:8000/transaction/api/history/?user_id=${user.id}`);
      
      if (response.ok) {
        const data = await response.json();
        // Ensure data is an array before setting it
        if (Array.isArray(data)) {
            setTransactions(data);
        } else {
            console.error("API returned non-array data:", data);
            setTransactions([]);
        }
      } else {
        console.error("Failed to fetch history");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(t => {
    const searchLower = appliedSearchTerm.toLowerCase();
    const matchesSearch = !searchLower || t.description.toLowerCase().includes(searchLower);
    
    const matchesFilter = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (!isOpen) return null;

  return (
    <div className="transaction-history-overlay" onClick={onClose}>
      <div className="transaction-history-modal" onClick={(e) => e.stopPropagation()}>
        <div className="transaction-history-header">
          <h2 className="transaction-history-title">Transaction History</h2>
          <button className="transaction-history-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="transaction-history-controls">
          <div className="transaction-history-search-section">
            <div className="transaction-history-search-container">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="transaction-history-search-input"
              />
            </div>
            <button
              className="transaction-history-icon-btn transaction-history-search-icon-btn"
              onClick={() => setAppliedSearchTerm(searchTerm)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
          <div className="transaction-history-filters">
            <button 
              className={`filter-tab ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All
            </button>
            <button 
              className={`filter-tab ${filterType === 'income' ? 'active' : ''}`}
              onClick={() => setFilterType('income')}
            >
              Income
            </button>
            <button 
              className={`filter-tab ${filterType === 'expense' ?  'active' : ''}`}
              onClick={() => setFilterType('expense')}
            >
              Expenses
            </button>
          </div>
        </div>

        <div className="transaction-history-list">
          {loading ? (
            <div className="transaction-history-empty">Loading...</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="transaction-history-empty">
              <div className="transaction-history-empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="transaction-history-empty-text">
                {appliedSearchTerm || filterType !== 'all' ? 'No transactions found' : 'No transactions yet'}
              </div>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-history-item">
                <div className="transaction-history-info">
                  <div className="transaction-history-description">{transaction.description}</div>
                  <div className="transaction-history-date">{transaction.date}</div>
                </div>
                <div className={`transaction-history-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}₱{Math.abs(transaction.amount).toLocaleString('en-PH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;