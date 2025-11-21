import Navigation from './Navigation';
import BalanceCard from './BalanceCard';
import PlaceholderCard from './PlaceholderCard';
import './Home.css';

interface HomeProps {
  firstname?: string;
  balance?: number;
}

function Home({ firstname = 'Firstname', balance = 6213.45 }: HomeProps) {
  return (
    <div className="home-container">
      <Navigation activeItem="Home" />
      
      <main className="home-content">
        <div className="welcome-section">
          <h1 className="welcome-message">Welcome Back, {firstname}!</h1>
          <BalanceCard balance={balance} />
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-column">
            <h2 className="column-title">pending tasks</h2>
            <div className="card-list">
              {Array.from({ length: 5 }).map((_, index) => (
                <PlaceholderCard key={`task-${index}`} />
              ))}
            </div>
          </div>
          
          <div className="dashboard-column">
            <h2 className="column-title">recent expenses</h2>
            <div className="card-list">
              {Array.from({ length: 5 }).map((_, index) => (
                <PlaceholderCard key={`expense-${index}`} />
              ))}
            </div>
          </div>
          
          <div className="dashboard-column">
            <h2 className="column-title">monthly report</h2>
            <div className="report-grid">
              <PlaceholderCard size="small" />
              <PlaceholderCard size="small" />
              <PlaceholderCard size="small" />
              <PlaceholderCard size="small" />
              <PlaceholderCard size="large" />
              <PlaceholderCard size="medium" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;