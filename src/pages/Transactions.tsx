import { useState } from 'react';
import Navigation from '../components/Navigation';
import TransactionBalanceCard from '../components/TransactionBalanceCard';
import AddTransactionModal from '../components/AddTransactionModal';
import TransactionHistory from '../components/TransactionHistory';
import StatisticsChart from '../components/StatisticsChart';
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
          
          {/* Statistics Chart - Full Width */}
          <StatisticsChart />
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