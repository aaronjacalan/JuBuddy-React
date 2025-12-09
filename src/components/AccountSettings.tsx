import { useState, useRef } from 'react';
import './AccountSettings.css';

function AccountSettings() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target. files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      if (! file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePhotoClick = () => {
    fileInputRef. current?.click();
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    if (fileInputRef. current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="account-settings-container">
      <div className="account-settings-header">
        <h2 className="account-settings-title">Account Settings</h2>
        <div className="account-settings-underline"></div>
      </div>
      
      <div className="account-settings-content">
        <div className="account-settings-left">
          <div className="account-avatar" onClick={handleChangePhotoClick}>
            {avatarPreview ?  (
              <img 
                src={avatarPreview} 
                alt="Profile" 
                className="avatar-image"
              />
            ) : (
              <div className="avatar-placeholder">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            <div className="avatar-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="avatar-input"
          />
          <div className="avatar-buttons">
            <button className="change-photo-button" onClick={handleChangePhotoClick}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Change Photo
            </button>
            {avatarPreview && (
              <button className="remove-photo-button" onClick={handleRemovePhoto}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Remove
              </button>
            )}
          </div>
        </div>
        
        <div className="account-settings-right">
          <div className="account-settings-form">
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Username</label>
                <input type="text" className="form-input" placeholder="Enter username" />
              </div>
              <div className="form-field">
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" placeholder="Enter first name" />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" placeholder="Enter last name" />
              </div>
              <div className="form-field">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="Enter email" />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-field">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-input" placeholder="Enter phone number" />
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="password-section">
            <button 
              className="password-toggle-button"
              onClick={() => setShowPasswordSection(!showPasswordSection)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Change Password
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none"
                className={`chevron-icon ${showPasswordSection ? 'rotated' : ''}`}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {showPasswordSection && (
              <div className="password-form">
                <div className="form-field">
                  <label className="form-label">Current Password</label>
                  <input type="password" className="form-input" placeholder="Enter current password" />
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-input" placeholder="Enter new password" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="form-input" placeholder="Confirm new password" />
                  </div>
                </div>
                <button className="update-password-button">Update Password</button>
              </div>
            )}
          </div>
          
          <div className="account-settings-actions">
            <button className="cancel-button">Cancel</button>
            <button className="save-button">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;