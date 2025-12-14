import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import TransactionBalanceCard from '../components/TransactionBalanceCard';
import AddTransactionModal from '../components/AddTransactionModal';
import TransactionHistory from '../components/TransactionHistory';
import StatisticsChart from '../components/StatisticsChart';
import './Transactions.css';

interface DashboardData {
  currentBalance: number;
  monthlyExpenses: number;
  monthlyIncome: number;
  expenseChange: number;
  incomeChange: number;
}

function Transactions() {
  // 1. Dashboard State
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    currentBalance: 0,
    monthlyExpenses: 0,
    monthlyIncome: 0,
    expenseChange: 0,
    incomeChange: 0
  });

  // 2. Refresh Signal State (This tells the chart to update)
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Fetch Dashboard Totals
  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/transaction/api/dashboard/');
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        console.error("Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const openAddTransactionModal = () => setIsAddTransactionModalOpen(true);
  const closeAddTransactionModal = () => setIsAddTransactionModalOpen(false);
  const openHistoryModal = () => setIsHistoryModalOpen(true);
  const closeHistoryModal = () => setIsHistoryModalOpen(false);

  // SAVE FUNCTION
  const handleSaveTransaction = async (transactionData: any) => {
    try {
      const payload = {
        ...transactionData,
      };

      const response = await fetch('http://127.0.0.1:8000/transaction/api/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Transaction added successfully!');
        closeAddTransactionModal();
        
        // 1. Refresh the Totals (Balance/Income/Expense cards)
        fetchDashboardData();
        
        // 2. Refresh the Chart (Increment the trigger)
        setRefreshTrigger(prev => prev + 1);
        
      } else {
        alert('Error saving: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Failed to connect to server.');
    }
  };

  return (
    <div className="transactions-container">
      <Navigation activeItem="Transactions" />
      
      <div className="transactions-layout">
        <div className="left-panel">
          <h2 className="section-title">Transactions</h2>
          
          <TransactionBalanceCard 
            title="current balance"
            balance={dashboardData.currentBalance}
            subtitle=""
            cardType="current"
            growth={0}
          />
          
          <TransactionBalanceCard 
            title="total monthly expenses"
            balance={dashboardData.monthlyExpenses}
            subtitle={`${dashboardData.expenseChange}%`}
            subtitleColor={dashboardData.expenseChange < 0 ? '#ff6b6b' : '#51cf66'}
            cardType="expense"
            growth={dashboardData.expenseChange}
          />
          
          <TransactionBalanceCard 
            title="total income this month"
            balance={dashboardData.monthlyIncome}
            subtitle={`+${dashboardData.incomeChange}%`}
            subtitleColor="#51cf66"
            cardType="income"
            growth={dashboardData.incomeChange}
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
          
          {/* PASS THE TRIGGER TO THE CHART */}
          <StatisticsChart refreshTrigger={refreshTrigger} />
        </div>
      </div>

      <AddTransactionModal 
        isOpen={isAddTransactionModalOpen}
        onClose={closeAddTransactionModal}
        onSave={handleSaveTransaction}
      />

      <TransactionHistory
        isOpen={isHistoryModalOpen}
        onClose={closeHistoryModal}
      />
    </div>
  );
}

export default Transactions;