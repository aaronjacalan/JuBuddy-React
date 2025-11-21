import Navigation from './Navigation';
import BalanceCard from '../components/BalanceCard';
import './Transactions.css';

interface TransactionProps {
  currentBalance?: number;
  monthlyExpenses?: number;
  monthlyIncome?: number;
  expenseChange?: number;
  incomeChange?: number;
}

function Transactions({ 
  currentBalance = 1234567.89,
  monthlyExpenses = 1234567.89,
  monthlyIncome = 1234567.89,
  expenseChange = -8,
  incomeChange = 12
}: TransactionProps) {
  return (
    <div className="transactions-container">
      <Navigation activeItem="My Expenses" />
      
      <main className="transactions-content">
        <div className="left-panel">
          <BalanceCard 
            title="current balance"
            balance={currentBalance}
            subtitle="available funds this month"
          />
          
          <BalanceCard 
            title="total monthly expenses"
            balance={monthlyExpenses}
            subtitle={`${expenseChange}% from last month`}
            subtitleColor={expenseChange < 0 ? '#ff4444' : '#4CAF50'}
          />
          
          <BalanceCard 
            title="total income this month"
            balance={monthlyIncome}
            subtitle={`+${incomeChange}% from last month`}
            subtitleColor="#4CAF50"
          />
          
          <BalanceCard 
            title="lorem ipsum"
            balance={1234567.89}
            subtitle="+123,456,789% from last month"
          />
        </div>
        
        <div className="right-panel">
          <div className="panel-header">
            <div className="action-buttons">
              <button className="action-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
                </svg>
                add
              </button>
              <button className="action-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3L13 13M3 13L13 3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                export
              </button>
            </div>
            
            <div className="search-filter-section">
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search transactions"
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
          </div>
          
          <div className="transaction-section">
            <h2 className="section-title">transaction history</h2>
            <div className="transaction-list">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={`transaction-${index}`} className="transaction-item">
                  <div className="transaction-placeholder"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Transactions;