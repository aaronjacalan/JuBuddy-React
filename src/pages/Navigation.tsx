import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

interface NavigationProps {
  activeItem?: string;
}

function Navigation({ activeItem }: NavigationProps) {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'My Expenses', path: '/expenses' },
    { name: 'Virtual Jar', path: '/virtual-jar' },
    { name: 'Goals', path: '/goals' },
    { name: 'Buddies', path: '/buddies' }
  ];

  // Determine active item from route if not provided
  const getActiveItem = () => {
    if (activeItem) return activeItem;
    const currentPath = location.pathname;
    const currentItem = navItems.find(item => item.path === currentPath);
    if (currentItem) return currentItem.name;
    if (currentPath === '/settings') return 'Settings';
    return 'Home';
  };

  const currentActive = getActiveItem();

  return (
    <header className="header">
      <div className="logo-section">
        <Link to="/" className="logo">
          JuBuddy
        </Link>
      </div>
      
      <nav className="navigation">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-item ${currentActive === item.name ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="user-section">
        <Link 
          to="/settings" 
          className={`nav-item settings-btn ${currentActive === 'Settings' ? 'active' : ''}`}
        >
          Settings
        </Link>
        <div className="profile-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
            <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Navigation;