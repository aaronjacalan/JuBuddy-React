import './AccountSettings.css';

function AccountSettings() {
  return (
    <div className="account-settings-container">
      <div className="account-settings-header">
        <h2 className="account-settings-title">Account Settings</h2>
        <div className="account-settings-underline"></div>
      </div>
      
      <div className="account-settings-content">
        <div className="account-settings-left">
          <div className="account-avatar">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="60" fill="#4CAF50"/>
            </svg>
          </div>
          <button className="change-photo-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M5 5L11 11M11 5L5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            change photo
          </button>
        </div>
        
        <div className="account-settings-right">
          <div className="account-settings-form">
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Username</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-field">
              <label className="form-label">First Name</label>
              <input type="text" className="form-input" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-field">
              <label className="form-label">Email Adress</label>
              <input type="email" className="form-input" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Date of Birth</label>
              <input type="date" className="form-input" />
            </div>
          </div>
          </div>
          
          <div className="account-settings-actions">
            <button className="save-button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;

