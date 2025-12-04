import { useState } from 'react';
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
  transactions?: Transaction[];
}

function TransactionHistory({ isOpen, onClose, transactions }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'expense' | 'income'>('all');

  // Sample transactions if none provided
  const sampleTransactions: Transaction[] = Array.from({ length: 25 }).map((_, index) => ({
    id: index,
    description: index % 8 === 0 ? 'Grocery Shopping' : 
                 index % 8 === 1 ? 'Gas Station' :
                 index % 8 === 2 ? 'Coffee Shop' :
                 index % 8 === 3 ? 'Online Purchase' :
                 index % 8 === 4 ? 'Restaurant Bill' :
                 index % 8 === 5 ? 'Salary Deposit' :
                 index % 8 === 6 ? 'Freelance Payment' :
                 'Investment Dividend',
    amount: (index % 8 < 5 ? -1 : 1) * (Math.random() * 5000 + 100),
    type: index % 8 < 5 ? 'expense' : 'income',
    date: new Date(Date.now() - index * 86400000).toLocaleDateString(),
    category: index % 8 < 5 ? 'Expense' : 'Income'
  }));

  const displayTransactions = transactions || sampleTransactions;

  const filteredTransactions = displayTransactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
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
          <div className="transaction-history-search">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="transaction-history-search-input"
            />
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
            </svg>
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
              className={`filter-tab ${filterType === 'expense' ? 'active' : ''}`}
              onClick={() => setFilterType('expense')}
            >
              Expenses
            </button>
          </div>
        </div>

        <div className="transaction-history-list">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-history-item">
              <div className="transaction-history-info">
                <div className="transaction-history-description">{transaction.description}</div>
                <div className="transaction-history-date">{transaction.date}</div>
              </div>
              <div className={`transaction-history-amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : ''}₱{Math.abs(transaction.amount).toLocaleString('en-PH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
