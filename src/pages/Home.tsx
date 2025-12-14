import { useState, useEffect, useMemo } from 'react';
import Navigation from '../components/Navigation';
import './Home.css';
import './HomeBalanceDashboard.css';

// --- Interfaces ---
interface HomeData {
  firstname: string;
  balance: number;
}

interface Transaction {
  transaction_id: number; 
  amount: number;
  date: string;
  type: string;
  category?: string;      
}

interface JarItem {
  id: number;
  name: string;
  cost: number;
  status: string;
}

// NEW: Goal Interface
interface GoalData {
  goalID: number;
  name: string;
  targetValue: number;
  actualValue: number;
  targetDate: string;
  status: string;
  progress_percentage: number;
}

const getSavedPins = (): number[] => {
  const saved = localStorage.getItem('jubuddy_pinned_ids');
  return saved ? JSON.parse(saved) : [];
};

function Home() {
  const [firstname, setFirstname] = useState('...');
  const [balance, setBalance] = useState(0);
  const [latestExpense, setLatestExpense] = useState<Transaction | null>(null);
  const [pinnedItems, setPinnedItems] = useState<JarItem[]>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<{[key: string]: number}>({});
  
  // NEW: State for Upcoming Goals
  const [upcomingGoals, setUpcomingGoals] = useState<GoalData[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // --- HELPER: Capitalize Text ---
  const formatCategory = (cat: string | undefined) => {
    if (!cat) return "Uncategorized";
    const lower = cat.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  // --- HELPER: Calculate Days Left ---
  const calculateDaysLeft = (targetDateStr: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  };

  const fetchDashboardData = async () => {
    try {
      // 1. Fetch User Info
      const userRes = await fetch('http://127.0.0.1:8000/user/api/home/');
      if (userRes.ok) {
        const data: HomeData = await userRes.json();
        setFirstname(data.firstname);
        setBalance(data.balance);
      }

      // 2. Fetch Transactions
      const transRes = await fetch('http://127.0.0.1:8000/transaction/api/history/');
      
      if (transRes.ok) {
        const rawData = await transRes.json();
        let allTransactions: Transaction[] = [];

        if (Array.isArray(rawData)) {
            allTransactions = rawData;
        } else if (rawData.results && Array.isArray(rawData.results)) {
            allTransactions = rawData.results;
        }

        // Filter for Expenses
        const expenses = allTransactions.filter(t => {
            const typeStr = t.type ? t.type.toUpperCase() : '';
            return typeStr === 'E' || typeStr === 'EXPENSES' || typeStr === 'EXPENSE';
        });

        // Sort Logic
        const sortedExpenses = [...expenses].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          if (dateA !== dateB) return dateB - dateA;
          return b.transaction_id - a.transaction_id;
        });
        
        setLatestExpense(sortedExpenses.length > 0 ? sortedExpenses[0] : null);

        // Calculate Monthly Report
        const breakdown: {[key: string]: number} = {};
        expenses.forEach(t => {
          const catName = t.category || 'Uncategorized';
          const val = parseFloat(t.amount.toString());
          breakdown[catName] = (breakdown[catName] || 0) + val;
        });
        setCategoryBreakdown(breakdown);
      }

      // 3. Fetch Jar Items
      const jarRes = await fetch('http://127.0.0.1:8000/jars/api/items/');
      if (jarRes.ok) {
        const allItems: JarItem[] = await jarRes.json();
        const savedPinIds = getSavedPins();
        
        const pinned = allItems.filter(item => 
          savedPinIds.includes(item.id) && item.status === 'on_hold'
        );
        setPinnedItems(pinned.slice(0, 3));
      }

      // 4. NEW: Fetch Goals
      const goalRes = await fetch('http://127.0.0.1:8000/goals/api/list/');
      if (goalRes.ok) {
        const allGoals: GoalData[] = await goalRes.json();
        // Filter active, sort by nearest deadline, take top 3
        const sortedGoals = allGoals
          .map(g => ({ ...g, daysLeft: calculateDaysLeft(g.targetDate) }))
          .filter(g => g.status === 'active' && g.daysLeft >= 0)
          .sort((a, b) => a.daysLeft - b.daysLeft)
          .slice(0, 3);
        
        setUpcomingGoals(sortedGoals);
      }

    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-PH', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  return (
    <div className="home-container">
      <Navigation activeItem="Home" />
      
      <main className="home-content">
        <div className="welcome-section"> 
          <h1 className="welcome-message">Welcome Back, {firstname}!</h1>
        </div>
        
        <div className="dashboard-grid">
          
          {/* Left Column (Unchanged) */}
          <div className="dashboard-left">
            <div className="left-top-section">
              
              {/* Balance Card */}
              <div className="dashboard-column half-width home-balance-card">
                <div className="home-balance-label">Current Balance</div>
                <div className="home-balance-amount">
                  <span className="home-peso-sign">₱</span>
                  <span className="home-balance-amount-value">
                    {formatCurrency(balance)}
                  </span>
                </div>
              </div>
              
              {/* Recent Expenses */}
              <div className="dashboard-column half-width">
                <h2 className="column-title">Latest Expenditure</h2>
                <div className="card-list" style={{ justifyContent: 'center' }}>
                  {latestExpense ? (
                    <div className="dashboard-card expense-card" style={{ height: '100%' }}>
                      <div className="card-info">
                        <span className="card-title" style={{ fontSize: '1.1rem' }}>
                          {formatCategory(latestExpense.category)}
                        </span>
                        <span className="card-subtitle">
                           {new Date(latestExpense.date).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="card-amount negative" style={{ fontSize: '1.2rem' }}>
                        -₱{formatCurrency(latestExpense.amount)}
                      </span>
                    </div>
                  ) : (
                    <div className="empty-state">No recent expenses</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="left-bottom-section">
              <div className="dashboard-column full-width">
                <div className="column-header-row">
                    <h2 className="column-title">Pinned Priorities</h2>
                </div>
                <div className="card-list horizontal-scroll">
                  {pinnedItems.length > 0 ? (
                    pinnedItems.map((item) => (
                      <div key={item.id} className="dashboard-card pinned-card">
                        <div className="card-info">
                          <span className="card-title">{item.name}</span>
                        </div>
                        <span className="card-amount">
                          ₱{formatCurrency(item.cost)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      No pinned items. Go to <span style={{color: '#06D2CA', fontWeight:'bold'}}>Virtual Jar</span> to pin some!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="dashboard-column monthly-report-column">
            {/* 1. Monthly Expenditure */}
            <div className="right-panel-section" style={{flex: 1, overflowY: 'auto', minHeight: '0'}}>
                <h2 className="column-title">This Month's Expenditure</h2>
                <div className="card-list report-list">
                  {Object.keys(categoryBreakdown).length > 0 ? (
                    Object.entries(categoryBreakdown).map(([category, amount]) => (
                      <div key={category} className="dashboard-card report-card">
                        <div className="card-info">
                          <span className="card-title">{formatCategory(category)}</span>
                        </div>
                        <span className="card-amount">
                          ₱{formatCurrency(amount)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">No spending data yet.</div>
                  )}
                </div>
            </div>

            {/* 2. Upcoming Goals (Added Here) */}
            <div className="right-panel-section" style={{marginTop: '1.5rem', flexShrink: 0}}>
                <h2 className="column-title">Upcoming Goals</h2>
                <div className="goals-list-container">
                    {upcomingGoals.length > 0 ? (
                        upcomingGoals.map((g) => (
                            <div key={g.goalID} className="mini-goal-row">
                                <div className="mini-goal-info">
                                    <span className="mini-goal-name">{g.name}</span>
                                    {/* @ts-ignore */}
                                    <span className="mini-goal-days">{g.daysLeft} days left</span>
                                </div>
                                <div className="mini-goal-progress-wrapper">
                                    <div className="mini-goal-progress-bar">
                                        <div className="mini-goal-fill" style={{width: `${g.progress_percentage}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">No upcoming goals.</div>
                    )}
                </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;