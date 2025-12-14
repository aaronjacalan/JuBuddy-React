import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutModal.css';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const navigate = useNavigate();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleLogout = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      // Perform logout logic here
      // For now, just navigate to landing page
      navigate('/');
    }, 200);
  };

  const handleCancel = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onClose();
      setIsAnimatingOut(false);
    }, 200);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsAnimatingOut(false);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimatingOut) return null;

  return (
    <div 
      className={`logout-modal-overlay ${isAnimatingOut ? 'fade-out' : 'fade-in'}`} 
      onClick={handleCancel}
    >
      <div className="logout-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="logout-modal-header">
          <h3>Confirm Logout</h3>
        </div>
        <div className="logout-modal-body">
          <p>Are you sure you want to logout?</p>
        </div>
        <div className="logout-modal-footer">
          <button onClick={handleCancel} className="logout-cancel-btn">Cancel</button>
          <button onClick={handleLogout} className="logout-confirm-btn">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
