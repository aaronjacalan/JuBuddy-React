import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Transactions from './pages/Transactions';
import VirtualJar from './pages/VirtualJar';
import Goals from './pages/Goals';
import Buddies from './pages/Buddies';
import Settings from './pages/Settings';
import Auth from './pages/Auth'; 
import Landing from './pages/Landing'; 
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

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <div className="app-outer-container">
      <div className="app-inner-container">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          
          {/* Root Route: Shows Landing if logged out */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/home" replace /> : <Landing />} 
          />
          
          {/* Login Route: Default to Login Mode */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/home" replace /> : <Auth onLoginSuccess={handleLogin} initialMode="login" />} 
          />

          {/* ADDED: Register Route: Default to Register Mode */}
          <Route 
            path="/register" 
            element={user ? <Navigate to="/home" replace /> : <Auth onLoginSuccess={handleLogin} initialMode="register" />} 
          />

          {/* --- PRIVATE ROUTES --- */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/virtual-jar" element={<ProtectedRoute><VirtualJar /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/buddies" element={<ProtectedRoute><Buddies /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings onLogout={handleLogout} /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;