import { useState } from 'react';
import './SettingsItem.css';

interface SettingsItemProps {
  text?: string;
  hasToggle?: boolean;
  onToggle?: (enabled: boolean) => void;
  onClick?: () => void;
}

function SettingsItem({ 
  text = 'Setting Item', 
  hasToggle = false,
  onToggle,
  onClick 
}: SettingsItemProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    onToggle?.(newValue);
  };

  const handleClick = () => {
    if (! hasToggle) {
      onClick?.();
    }
  };

  return (
    <div className={`settings-item ${! hasToggle ? 'clickable' : ''}`} onClick={handleClick}>
      <span className="settings-item-text">{text}</span>
      {hasToggle ?  (
        <button 
          className={`settings-toggle ${isEnabled ? 'enabled' : ''}`}
          onClick={handleToggle}
          aria-label={isEnabled ? 'Disable' : 'Enable'}
        >
          <span className="toggle-slider"></span>
        </button>
      ) : (
        <button className="settings-item-action" aria-label="Configure">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default SettingsItem;