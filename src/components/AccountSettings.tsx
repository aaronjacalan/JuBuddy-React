import { useState, useRef, useEffect } from 'react';
import './AccountSettings.css';

function AccountSettings() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // New: Store the actual file object
  
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    phone: ''
  });

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- HANDLERS ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/user/api/account/update/');
        
        if (response.ok) {
          const data = await response.json();
          
          setFormData({
            username: data.username || '',
            firstName: data.first_name || '', 
            lastName: data.last_name || '',
            email: data.email || '',
            dob: data.dob || '',
            phone: data.phone || ''
          });

          if (data.avatar_url) {
            setAvatarPreview(data.avatar_url); 
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
      }
    };

    fetchUserData();
  }, []); // The empty [] means this runs only once when the page loads
  // --- THE NEW CONNECTION TO PYTHON ---
  const handleSaveChanges = async () => {
    const dataToSend = new FormData();

    // Append text data
    dataToSend.append('username', formData.username);
    dataToSend.append('first_name', formData.firstName);
    dataToSend.append('last_name', formData.lastName);
    dataToSend.append('email', formData.email);
    dataToSend.append('dob', formData.dob);
    dataToSend.append('phone', formData.phone);

    if (selectedFile) {
      dataToSend.append('avatar', selectedFile);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/user/api/account/update/', {
        method: 'POST',
        body: dataToSend, 
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (response.ok) {
        alert('Settings saved successfully!');
      } else {
        alert('Error saving settings: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to the server.');
    }
  };

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    setSelectedFile(null); 
    if (fileInputRef.current) {
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
          {/* ... Avatar UI (unchanged) ... */}
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
              {/* ... svg ... */} Change Photo
            </button>
            {avatarPreview && (
              <button className="remove-photo-button" onClick={handleRemovePhoto}>
                {/* ... svg ... */} Remove
              </button>
            )}
          </div>
        </div>
        
        <div className="account-settings-right">
          <div className="account-settings-form">
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Username</label>
                {/* UPDATED INPUT: Added name, value, onChange */}
                <input 
                  type="text" 
                  name="username"
                  className="form-input" 
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-field">
                <label className="form-label">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  className="form-input" 
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleInputChange} 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  className="form-input" 
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-input" 
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Date of Birth</label>
                <input 
                  type="date" 
                  name="dob"
                  className="form-input" 
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  className="form-input" 
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* ... Password Section (unchanged for now) ... */}
          <div className="password-section">
             {/* ... existing password UI code ... */}
             <button 
              className="password-toggle-button"
              onClick={() => setShowPasswordSection(!showPasswordSection)}
            >
              Change Password
            </button>
             {/* ... */}
          </div>
          
          <div className="account-settings-actions">
            <button className="cancel-button">Cancel</button>
            {/* UPDATED BUTTON: Added onClick */}
            <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;