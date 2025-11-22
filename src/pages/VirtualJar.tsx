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
      
      <main className="virtual-jar-content">
        <div className="left-panel">
          <h2 className="section-title">pinned items</h2>
          <div className="pinned-list">
            {pinnedItems.map((item, index) => (
              <div key={`pinned-${index}`} className="pinned-item">
                <div className="item-info">
                  <span className="item-label">{item.name}</span>
                  <div className="item-amount">
                    <span className="peso-sign">₱</span>
                    <span className="amount">{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="right-panel">
          <div className="panel-header">
            <button className="action-btn add-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2"/>
              </svg>
              add
            </button>
            
            <div className="search-filter-section">
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search Jar"
                  className="search-input"
                />
                <button className="search-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
              <button className="filter-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6H21M6 12H18M9 18H15" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="jar-section">
            <h2 className="section-title">virtual jar items</h2>
            <div className="jar-grid">
              {Array.from({ length: jarItems }).map((_, index) => (
                <div key={`jar-${index}`} className="jar-item">
                  <div className="jar-item-content"></div>
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
      </main>
    </div>
  );
}

export default VirtualJar;