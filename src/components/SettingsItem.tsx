import './SettingsItem.css';

interface SettingsItemProps {
  text?: string;
}

function SettingsItem({ text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }: SettingsItemProps) {
  return (
    <div className="settings-item">
      <span className="settings-item-text">{text}</span>
      <button className="settings-item-action">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0"/>
          <path d="M5 5L11 11M11 5L5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

export default SettingsItem;

