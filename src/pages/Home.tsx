import Navigation from '../components/Navigation';
import PlaceholderCard from '../components/PlaceholderCard';
import './Home.css';
import './HomeBalanceDashboard.css';

interface HomeProps {
  firstname?: string;
  balance?: number;
}

function Home({ firstname = 'Ruhmer Jairus', balance = 62213.45 }: HomeProps) {
  return (
    <div className="home-container">
      <Navigation activeItem="Home" />
      
      <main className="home-content">
        <div className="welcome-section"> 
          <h1 className="welcome-message">Welcome Back, {firstname}!</h1>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-left">
            <div className="left-top-section">
              <div className="dashboard-column half-width home-balance-card">
                <div className="home-balance-label">Current Balance</div>
                <div className="home-balance-amount">
                  <span className="home-peso-sign">₱</span>
                  <span className="home-balance-amount-value">
                    {balance.toLocaleString('en-PH', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </span>
                </div>
              </div>
              
              <div className="dashboard-column half-width">
                <h2 className="column-title">recent expenses</h2>
                <div className="card-list">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <PlaceholderCard key={`expense-${index}`} />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="left-bottom-section">
              <div className="dashboard-column full-width">
                <h2 className="column-title">pending tasks</h2>
                <div className="card-list">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <PlaceholderCard key={`task-${index}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="dashboard-column monthly-report-column">
            <h2 className="column-title">monthly report</h2>
            <div className="card-list">
              <PlaceholderCard size="small" />
              <PlaceholderCard size="small" />
              <PlaceholderCard size="small" />
              <PlaceholderCard size="small" />
              <PlaceholderCard size="small" />
              <PlaceholderCard size="small" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;