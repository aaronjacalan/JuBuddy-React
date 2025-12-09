import { useState, useRef, useEffect } from 'react';
import Navigation from '../components/Navigation';
import SettingsItem from '../components/SettingsItem';
import AccountSettings from '../components/AccountSettings';
import './Settings.css';

function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const tabs = [
    'Account',
    'Security',
    'Notifications',
    'Connected Cards/Banks',
    'Site Settings'
  ];

  const sections = [
    // Account section - rendered as AccountSettings component (includes Change Password)
    {
      id: 'account',
      title: 'Account Settings',
      items: []
    },
    {
      id: 'security',
      title: 'Security Settings',
      items: [
        'Two-Factor Authentication',
        'Login Activity',
        'Privacy Settings',
        'Session Management'
      ]
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      items: [
        'Email Notifications',
        'Push Notifications',
        'SMS Alerts'
      ]
    },
    {
      id: 'connected-cards',
      title: 'Connected Accounts',
      items: [
        'Link Credit Card',
        'Connect Bank Account',
        'Manage Payment Methods'
      ]
    },
    {
      id: 'site-settings',
      title: 'Site Preferences',
      items: [
        'Language Settings',
        'Theme Preferences',
        'Display Options'
      ]
    }
  ];

  const scrollToSection = (index: number) => {
    setActiveTab(index);
    const section = sectionRefs.current[index];
    if (section && contentRef.current) {
      const containerRect = contentRef.current.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const scrollTop = contentRef.current.scrollTop;
      const offset = sectionRect.top - containerRect.top + scrollTop - 20;
      
      contentRef.current.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const content = contentRef.current;
    if (! content) return;

    const handleScroll = () => {
      const containerRect = content.getBoundingClientRect();
      const containerTop = containerRect.top;
      const viewportCenter = containerRect.height / 2;
      
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const sectionRect = section.getBoundingClientRect();
        const sectionCenter = sectionRect. top - containerTop + sectionRect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveTab(closestIndex);
    };

    // Initial check
    handleScroll();
    
    content.addEventListener('scroll', handleScroll);
    return () => content.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="settings-container">
      <Navigation activeItem="Settings" />
      
      <div className="settings-layout">
        <aside className="settings-sidebar">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`settings-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
            >
              {tab}
            </button>
          ))}
          <button className="settings-logout-button" onClick={() => {
            // Handle logout logic here
            console. log('Logout clicked');
          }}>
            Logout
          </button>
        </aside>
        
        <main className="settings-content" ref={contentRef}>
          {sections. map((section, sectionIndex) => (
            <div 
              key={section.id} 
              className={`settings-section ${sectionIndex === 0 ? 'account-section' : ''}`}
              ref={(el) => { sectionRefs.current[sectionIndex] = el; }}
              id={section.id}
            >
              {sectionIndex === 0 ?  (
                <AccountSettings />
              ) : (
                <>
                  <div className="settings-section-header">
                    <h2 className="settings-section-title">{section.title}</h2>
                    <div className="settings-section-underline"></div>
                  </div>
                  <div className="settings-items">
                    {section.items.map((item, itemIndex) => (
                      <SettingsItem key={itemIndex} text={item} />
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default Settings;