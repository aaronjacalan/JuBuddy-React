import Navigation from '../components/Navigation';
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
  currentBalance = 65000,
  monthlyExpenses = 25000,
  monthlyIncome = 85000,
  expenseChange = -8,
  incomeChange = 12
}: TransactionProps) {
  return (
    <div className="transactions-container">
      <Navigation activeItem="Transactions" />
      
      <div className="transactions-layout">
        <div className="left-panel">
          <h2 className="section-title">Transaction</h2>
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
        </div>
        
        <div className="right-panel">
          <div className="panel-header goals-panel-header">
            <div className="search-filter-section goals-search-controls">
              <div className="search-container goals-search-container">
                <input 
                  type="text" 
                  placeholder="Search Transactions"
                  className="search-input"
                />
              </div>
              <button className="icon-btn search-icon-btn" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="filter-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6H21M6 12H18M9 18H15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="action-btn add-btn goals-add-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Add New Transaction
              </button>
            </div>
          </div>
          
          <div className="transaction-section">
            <div className="transaction-content-container">
              <h2 className="section-header-title">Expenses History</h2>
              <div className="transaction-list">
                {Array.from({ length: 25 }).map((_, index) => (
                  <div key={`transaction-${index}`} className="transaction-item">
                    <div className="transaction-placeholder">
                      <div className="transaction-info">
                        <div className="transaction-description">
                          {index % 5 === 0 ? 'Grocery Shopping' : 
                           index % 5 === 1 ? 'Gas Station' :
                           index % 5 === 2 ? 'Coffee Shop' :
                           index % 5 === 3 ? 'Online Purchase' :
                           'Restaurant Bill'}
                        </div>
                        <div className="transaction-amount">
                          ₱{(Math.random() * 5000 + 100).toLocaleString('en-PH', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;