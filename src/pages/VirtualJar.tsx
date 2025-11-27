import Navigation from '../components/Navigation';
import './VirtualJar.css';

interface JarItem {
  name: string;
  amount: number;
}

interface VirtualJarProps {
  pinnedItems?: JarItem[];
  jarItems?: number;
}

function VirtualJar({ 
  pinnedItems = [
    { name: 'Item name', amount: 1234.56 },
    { name: 'Item name', amount: 1234.56 },
    { name: 'Item name', amount: 1234.56 },
    { name: 'Item name', amount: 1234.56 }
  ],
  jarItems = 5
}: VirtualJarProps) {
  return (
    <div className="virtual-jar-container">
      <Navigation activeItem="Virtual Jar" />
      
      <div className="virtual-jar-layout">
        <div className="left-panel">
          <h2 className="section-title">Virtual Jar</h2>
          <div className="pinned-list">
            {pinnedItems.map((item, index) => (
              <div key={`pinned-${index}`} className="pinned-item">
                <div className="item-info">
                  <span className="item-label">{item.name}</span>
                  <div className="item-amount">
                    <span className="peso-sign">₱</span>
                    <span className="amount">{item.amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="right-panel">
          <div className="panel-header goals-panel-header">
            <div className="search-filter-section goals-search-controls">
              <div className="search-container goals-search-container">
                <input 
                  type="text" 
                  placeholder="Search Jar"
                  className="search-input"
                />
              </div>
              <button className="icon-btn search-icon-btn" type="button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="filter-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6H21M6 12H18M9 18H15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button className="action-btn add-btn goals-add-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Add to Jar
              </button>
            </div>
          </div>
          
          <div className="jar-section">
            <div className="jar-content-container">
              <div className="jar-grid">
                {Array.from({ length: 15 }).map((_, index) => (
                  <div key={`jar-${index}`} className="jar-item">
                    <div className="jar-item-content">
                      <div className="jar-item-info">
                        <span className="jar-item-name">Jar Item {index + 1}</span>
                        <span className="jar-item-amount">₱{(Math.random() * 5000 + 500).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                    <button className="delete-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualJar;