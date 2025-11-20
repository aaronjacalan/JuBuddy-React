import './App.css'

function App() {
  return (
    <div className="app">
      <div className="main-container">
        <header className="header">
          <div className="logo-section">
            <div className="logo">
              JuBUDDY
            </div>
          </div>
          
          <nav className="navigation">
            <button className="nav-item active">Home</button>
            <a href="#" className="nav-item">My Expenses</a>
            <a href="#" className="nav-item">Virtual Jar</a>
            <a href="#" className="nav-item">Invite Buddy</a>
          </nav>
          
          <div className="user-section">
            <button className="settings-btn">Settings</button>
            <div className="profile-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
                <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </header>
        
        <main className="main-content">
          {/* Main content area - empty for now */}
        </main>
      </div>
    </div>
  )
}

export default App
