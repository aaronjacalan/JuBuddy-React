import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

interface NavigationProps {
  activeItem?: string;
}

function Navigation({ activeItem }: NavigationProps) {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Item Wishlist', path: '/virtual-jar' },
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
          aria-label="Open settings"
        >
          <span aria-hidden="true" className="profile-icon-icon" />
        </Link>
      </div>
    </header>
  );
}

export default Navigation;