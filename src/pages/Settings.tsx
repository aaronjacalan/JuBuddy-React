import Navigation from './Navigation';
import './Home.css';

function Settings() {
  return (
    <div className="home-container">
      <Navigation activeItem="Settings" />
      
      <main className="home-content">
        <div className="welcome-section">
          <h1 className="welcome-message">Settings</h1>
        </div>
      </main>
    </div>
  );
}

export default Settings;

