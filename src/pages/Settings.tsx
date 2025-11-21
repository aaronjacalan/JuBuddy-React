import { useState, useRef, useEffect } from 'react';
import Navigation from './Navigation';
import SettingsItem from '../components/SettingsItem';
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
    {
      id: 'account',
      title: 'Account Settings',
      items: [
        'Change Profile Picture',
        'Update Email Address',
        'Change Password'
      ]
    },
    {
      id: 'security',
      title: 'Security Settings',
      items: [
        'Two-Factor Authentication',
        'Login Activity',
        'Privacy Settings'
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
    const section = sectionRefs.current[index];
    if (section && contentRef.current) {
      const contentTop = contentRef.current.getBoundingClientRect().top + contentRef.current.scrollTop;
      const sectionTop = section.getBoundingClientRect().top + contentRef.current.scrollTop - contentTop;
      contentRef.current.scrollTo({
        top: sectionTop - 20,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => {
      const scrollTop = content.scrollTop;
      const offset = 150; // Offset from top to determine active section
      
      // Find which section is currently at the top of the viewport
      let activeIndex = 0;
      
      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[i];
        if (section && section.offsetTop <= scrollTop + offset) {
          activeIndex = i;
          break;
        }
      }

      setActiveTab(activeIndex);
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
        </aside>
        
        <main className="settings-content" ref={contentRef}>
          {sections.map((section, sectionIndex) => (
            <div 
              key={section.id} 
              className="settings-section" 
              ref={(el) => (sectionRefs.current[sectionIndex] = el)}
              id={section.id}
            >
              <h2 className="settings-section-title">{section.title}</h2>
              <div className="settings-items">
                {section.items.map((item, itemIndex) => (
                  <SettingsItem key={itemIndex} text={item} />
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default Settings;
