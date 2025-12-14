import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import VirtualJar from './pages/VirtualJar';
import Goals from './pages/Goals';
import Buddies from './pages/Buddies';
import Settings from './pages/Settings';
import Auth from './pages/Auth'; 
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('jubuddy_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('jubuddy_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('jubuddy_user');
  };

  if (!user) {
    return <Auth onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="app-outer-container">
      <div className="app-inner-container">
        <Routes>
          {/* UPDATED: Redirect root "/" to "/home" instead of goals */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* ADDED: The actual Home route was missing */}
          <Route path="/home" element={<Home />} />
          
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/virtual-jar" element={<VirtualJar />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/buddies" element={<Buddies />} />
          
          <Route path="/settings" element={<Settings onLogout={handleLogout} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
