import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import BuddyCard from '../components/BuddyCard';
import './Buddies.css';

function Buddies() {
  const buddies = [
    { name: 'Jairus Espina' },
    { name: 'Lovely Shane Ong' },
    { name: 'Christian Fernandez' },
    { name: 'Aaron Jacalan' },
    { name: 'Zendy Mariel Dy' },
    { name: 'John Zillion Reyes' },
    { name: 'Paulette Olet' }
  ];

  return (
    <div className="buddies-container">
      <Navigation activeItem="Buddies" />
      
      <div className="buddies-layout">
        <header className="buddies-header">
          <h1 className="page-title">View a Buddy's progress</h1>
          <div className="header-actions">
            <div className="search-filter-section">
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="search username"
                  className="search-input"
                />
              </div>
              <button className="icon-btn search-icon-btn" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="icon-btn filter-btn" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6H21M6 12H18M9 18H15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
            <Link to="/invite-buddy" className="invite-buddy-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
              </svg>
              Invite Buddy
            </Link>
          </div>
        </header>
        
        <main className="buddies-content">
          <div className="buddies-grid">
            {buddies.map((buddy, index) => (
              <BuddyCard key={`buddy-${index}`} name={buddy.name} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Buddies;
