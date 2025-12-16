import { useState, useRef, useEffect } from 'react';
import Navigation from '../components/Navigation';
import SettingsItem from '../components/SettingsItem';
import AccountSettings from '../components/AccountSettings';
import AccountTypeSettings from '../components/AccountTypeSettings';
import LogoutModal from '../components/LogoutModal';
import './Settings.css';

interface SettingsProps {
  onLogout: () => void;
  userId: string; // Add userId prop
}

function Settings({ onLogout, userId }: SettingsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const tabs = [
    'Account',
    'Account Types',
  ];

  const sections = [
    { id: 'account', title: 'Account Settings', items: [] },
    { id: 'account-types', title: 'Account Type Management', items: [] },
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
    if (!content) return;

    const handleScroll = () => {
      const containerRect = content.getBoundingClientRect();
      const containerTop = containerRect.top;
      const viewportCenter = containerRect.height / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        const sectionRect = section.getBoundingClientRect();
        const sectionCenter = sectionRect.top - containerTop + sectionRect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveTab(closestIndex);
    };

    handleScroll();
    content.addEventListener('scroll', handleScroll);
    return () => content.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="settings-container">
      <Navigation activeItem="Settings" />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />

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
          <button className="settings-logout-button" onClick={onLogout}>
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
              ) : sectionIndex === 1 ? (
                // New Account Types section
                <>
                  <div className="settings-section-header">
                    <h2 className="settings-section-title">{section.title}</h2>
                    <div className="settings-section-underline"></div>
                  </div>
                  <AccountTypeSettings userId={userId} />
                </>
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