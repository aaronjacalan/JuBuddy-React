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
          <span className="logo-text">JuBuddy</span>
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
          className={`profile-icon ${currentActive === 'Settings' ? 'active' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.622 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.4829L13.5578 4.3698L12.9353 2H11.0647L10.4422 4.3698L7.73529 5.4829L6 4L4 6L5.47529 7.7448L4.37798 10.3954L2 11.2361L2 12.7639L4.37798 13.6046L5.47529 16.2552L4 18L6 20L7.73529 18.5171L10.4422 19.6302L11.0647 22H12.9353L13.5578 19.6302L16.2647 18.5171L18 20L20 18L18.5247 16.2552L19.622 13.6046L22 12.7639V11.2361L19.622 10.3954Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default Navigation;