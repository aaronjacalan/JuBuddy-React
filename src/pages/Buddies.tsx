import Navigation from './Navigation';
import './Home.css';

function Buddies() {
  return (
    <div className="home-container">
      <Navigation activeItem="Buddies" />
      
      <main className="home-content">
        <div className="welcome-section">
          <h1 className="welcome-message">Buddies</h1>
        </div>
      </main>
    </div>
  );
}

export default Buddies;

