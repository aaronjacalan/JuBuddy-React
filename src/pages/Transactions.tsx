import { useState } from 'react';
import Navigation from '../components/Navigation';
import TransactionBalanceCard from '../components/TransactionBalanceCard';
import AddTransactionModal from '../components/AddTransactionModal';
import TransactionHistory from '../components/TransactionHistory';
import './Transactions.css';

interface TransactionProps {
  currentBalance?: number;
  monthlyExpenses?: number;
  monthlyIncome?: number;
  expenseChange?: number;
  incomeChange?: number;
}

// Sample data for charts
const expenseCategories = [
  { name: 'Food & Dining', amount: 8500, color: '#ef4444', percentage: 34 },
  { name: 'Transportation', amount: 4200, color: '#f97316', percentage: 17 },
  { name: 'Shopping', amount: 5800, color: '#eab308', percentage: 23 },
  { name: 'Bills & Utilities', amount: 3500, color: '#22c55e', percentage: 14 },
  { name: 'Entertainment', amount: 3000, color: '#3b82f6', percentage: 12 },
];

const monthlyTrends = [
  { month: 'Jul', income: 75000, expenses: 28000 },
  { month: 'Aug', income: 78000, expenses: 32000 },
  { month: 'Sep', income: 82000, expenses: 27000 },
  { month: 'Oct', income: 80000, expenses: 30000 },
  { month: 'Nov', income: 85000, expenses: 25000 },
  { month: 'Dec', income: 85000, expenses: 22000 },
];

function Transactions({ 
  currentBalance = 65000,
  monthlyExpenses = 25000,
  monthlyIncome = 85000,
  expenseChange = -14,
  incomeChange = 20
}: TransactionProps) {
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const openAddTransactionModal = () => setIsAddTransactionModalOpen(true);
  const closeAddTransactionModal = () => setIsAddTransactionModalOpen(false);
  const openHistoryModal = () => setIsHistoryModalOpen(true);
  const closeHistoryModal = () => setIsHistoryModalOpen(false);

  const handleSaveTransaction = (transaction: any) => {
    console.log('New transaction saved:', transaction);
  };

  const maxTrendValue = Math.max(...monthlyTrends.flatMap(t => [t.income, t.expenses]));

  return (
    <div className="transactions-container">
      <Navigation activeItem="Transactions" />
      
      <div className="transactions-layout">
        <div className="left-panel">
          <h2 className="section-title">Transactions</h2>
          <TransactionBalanceCard 
            title="current balance"
            balance={currentBalance}
            subtitle=""
            cardType="current"
            growth={0}
          />
          
          <TransactionBalanceCard 
            title="total monthly expenses"
            balance={monthlyExpenses}
            subtitle={`${expenseChange}%`}
            subtitleColor={expenseChange < 0 ? '#ff6b6b' : '#51cf66'}
            cardType="expense"
            growth={expenseChange}
          />
          
          <TransactionBalanceCard 
            title="total income this month"
            balance={monthlyIncome}
            subtitle={`+${incomeChange}%`}
            subtitleColor="#51cf66"
            cardType="income"
            growth={incomeChange}
          />
        </div>
        
        <div className="right-panel">
          <div className="panel-header transactions-panel-header">
            <div className="search-filter-section transactions-search-controls">
              <button onClick={openHistoryModal} className="action-btn history-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                </svg>
                View History
              </button>
              <button onClick={openAddTransactionModal} className="action-btn add-btn transactions-add-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Add New Transaction
              </button>
            </div>
          </div>
          
          <div className="analytics-section">
            {/* Expense Breakdown Chart */}
            <div className="analytics-card expense-breakdown">
              <h3 className="analytics-title">Expense Breakdown</h3>
              <div className="expense-chart">
                <div className="donut-chart">
                  <svg viewBox="0 0 100 100" className="donut-svg">
                    {expenseCategories.reduce<{ elements: React.ReactNode[], offset: number }>((acc, category) => {
                      const prevOffset = acc.offset;
                      const dashArray = (category.percentage / 100) * 251.2;
                      acc.elements.push(
                        <circle
                          key={category.name}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={category.color}
                          strokeWidth="12"
                          strokeDasharray={`${dashArray} 251.2`}
                          strokeDashoffset={-prevOffset}
                          transform="rotate(-90 50 50)"
                        />
                      );
                      acc.offset += dashArray;
                      return acc;
                    }, { elements: [], offset: 0 }).elements}
                    <text x="50" y="47" textAnchor="middle" className="donut-total-label">Total</text>
                    <text x="50" y="58" textAnchor="middle" className="donut-total-value">₱{monthlyExpenses.toLocaleString()}</text>
                  </svg>
                </div>
                <div className="expense-legend">
                  {expenseCategories.map((category) => (
                    <div key={category.name} className="legend-item">
                      <span className="legend-color" style={{ backgroundColor: category.color }}></span>
                      <span className="legend-name">{category.name}</span>
                      <span className="legend-amount">₱{category.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Spending & Income Trend */}
            <div className="analytics-card trend-chart">
              <h3 className="analytics-title">Spending & Income Trend</h3>
              <div className="trend-chart-container">
                <div className="trend-bars">
                  {monthlyTrends.map((month) => (
                    <div key={month.month} className="trend-bar-group">
                      <div className="trend-bar-container">
                        <div 
                          className="trend-bar income-bar" 
                          style={{ height: `${(month.income / maxTrendValue) * 100}%` }}
                          title={`Income: ₱${month.income.toLocaleString()}`}
                        ></div>
                        <div 
                          className="trend-bar expense-bar" 
                          style={{ height: `${(month.expenses / maxTrendValue) * 100}%` }}
                          title={`Expenses: ₱${month.expenses.toLocaleString()}`}
                        ></div>
                      </div>
                      <span className="trend-month">{month.month}</span>
                    </div>
                  ))}
                </div>
                <div className="trend-legend">
                  <div className="trend-legend-item">
                    <span className="trend-legend-color income"></span>
                    <span>Income</span>
                  </div>
                  <div className="trend-legend-item">
                    <span className="trend-legend-color expense"></span>
                    <span>Expenses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal 
        isOpen={isAddTransactionModalOpen}
        onClose={closeAddTransactionModal}
        onSave={handleSaveTransaction}
      />

      {/* Transaction History Modal */}
      <TransactionHistory
        isOpen={isHistoryModalOpen}
        onClose={closeHistoryModal}
      />
    </div>
  );
}

export default Transactions;
