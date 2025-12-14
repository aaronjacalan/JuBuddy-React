import './TransactionBalanceCard.css';

interface TransactionBalanceCardProps {
  title: string;
  balance: number;
  subtitle?: string; // Optional text like "vs last month"
  subtitleColor?: string; // Optional override
  cardType: 'current' | 'expense' | 'income';
  growth?: number; // Raw percentage number (e.g., 20, -5)
}

function TransactionBalanceCard({ 
  title, 
  balance, 
  subtitle, 
  subtitleColor,
  cardType,
  growth = 0
}: TransactionBalanceCardProps) {
  
  // 1. Determine Dynamic Styles based on Growth
  const isPositive = growth > 0;
  const isNegative = growth < 0;
  
  // Logic: 
  // For Income/Current: Positive = Green (Good), Negative = Red (Bad)
  // For Expense: Positive = Red (Bad - you spent more), Negative = Green (Good - you saved)
  let growthColor = '#868e96'; // Default Grey
  
  if (cardType === 'expense') {
     if (isPositive) growthColor = '#ff6b6b'; // Red (Spent more)
     if (isNegative) growthColor = '#51cf66'; // Green (Spent less)
  } else {
     if (isPositive) growthColor = '#51cf66'; // Green
     if (isNegative) growthColor = '#ff6b6b'; // Red
  }

  // Use the prop override if provided, otherwise use calculated color
  const finalSubtitleColor = subtitleColor || growthColor;

  const getCardStyle = () => {
    switch (cardType) {
      case 'current': return 'transaction-balance-card-current';
      case 'expense': return 'transaction-balance-card-expense';
      case 'income': return 'transaction-balance-card-income';
      default: return 'transaction-balance-card-current';
    }
  };

  return (
    <div className={`transaction-balance-card ${getCardStyle()}`}>
      <div className="transaction-balance-header">
        <div className="transaction-balance-label">{title}</div>
        
        {/* Growth Badge (Only show if growth is not 0 or if explicitly passed) */}
        {growth !== 0 && (
           <div 
             className="transaction-growth-badge" 
             style={{ color: finalSubtitleColor }}
           >
             <span className="growth-arrow">
               {growth > 0 ? '↑' : '↓'}
             </span>
             <span className="growth-text">
               {Math.abs(growth)}%
             </span>
           </div>
        )}
      </div>

      <div className="transaction-balance-amount-row">
        <div className="transaction-balance-amount">
          <span className="transaction-peso-sign">₱</span>
          <span className="transaction-balance-amount-value">
            {balance.toLocaleString('en-PH', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </span>
        </div>
        
        {/* Optional text subtitle (e.g. "vs last month") */}
        {subtitle && (
          <div className="transaction-balance-subtitle">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionBalanceCard;