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
    // Account section - rendered as AccountSettings component
    {
      id: 'account',
      title: 'Account Settings',
      items: []
    },
    {
      id: 'security',
      title: 'Security Settings',
      items: [
        'Change Password',
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
    setActiveTab(index);
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
      const viewportTop = content.scrollTop;
      const viewportBottom = viewportTop + content.clientHeight;
      const viewportCenter = viewportTop + content.clientHeight / 2;
      
      let activeIndex = 0;
      let maxVisibleArea = 0;
      let centerSectionIndex = -1;
      
      // First, try to find a section that contains the viewport center
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // Check if the center of the viewport is within this section
        if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
          centerSectionIndex = index;
        }
        
        // Calculate the visible portion of this section
        const visibleTop = Math.max(viewportTop, sectionTop);
        const visibleBottom = Math.min(viewportBottom, sectionBottom);
        const visibleArea = Math.max(0, visibleBottom - visibleTop);
        
        // Track the section with the most visible area
        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea;
          activeIndex = index;
        }
      });
      
      // Prioritize the section containing the viewport center
      if (centerSectionIndex !== -1) {
        activeIndex = centerSectionIndex;
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
          <button className="settings-logout-button" onClick={() => {
            // Handle logout logic here
            console.log('Logout clicked');
          }}>
            Logout
          </button>
        </aside>
        
        <main className="settings-content" ref={contentRef}>
          {sections.map((section, sectionIndex) => (
            <div 
              key={section.id} 
              className={`settings-section ${sectionIndex === 0 ? 'account-section' : ''}`}
              ref={(el) => { sectionRefs.current[sectionIndex] = el; }}
              id={section.id}
            >
              {sectionIndex === 0 ? (
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
