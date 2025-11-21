import Navigation from './Navigation';
import './Home.css';

function Goals() {
  return (
    <div className="home-container">
      <Navigation activeItem="Goals" />
      
      <main className="home-content">
        <div className="welcome-section">
          <h1 className="welcome-message">Goals</h1>
        </div>
      </main>
    </div>
  );
}

export default Goals;

