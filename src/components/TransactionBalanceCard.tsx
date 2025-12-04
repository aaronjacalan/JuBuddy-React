import './TransactionBalanceCard.css';

interface TransactionBalanceCardProps {
  title: string;
  balance: number;
  subtitle?: string;
  subtitleColor?: string;
  cardType: 'current' | 'expense' | 'income';
  growth?: number; // Percentage change, positive for growth, negative for decline
}

function TransactionBalanceCard({ 
  title, 
  balance, 
  subtitle, 
  subtitleColor = '#ccc',
  cardType,
  growth
}: TransactionBalanceCardProps) {
  const getCardStyle = () => {
    let baseClass = '';
    switch (cardType) {
      case 'current':
        baseClass = 'transaction-balance-card-current';
        break;
      case 'expense':
        baseClass = 'transaction-balance-card-expense';
        break;
      case 'income':
        baseClass = 'transaction-balance-card-income';
        break;
      default:
        baseClass = 'transaction-balance-card-current';
    }
    
    // Add growth-based styling
    if (growth !== undefined) {
      if (growth < 0) {
        baseClass += ' transaction-balance-card-negative';
      } else if (growth > 0) {
        baseClass += ' transaction-balance-card-positive';
      }
    }
    
    return baseClass;
  };

  return (
    <div className={`transaction-balance-card ${getCardStyle()}`}>
      <div className="transaction-balance-label">{title}</div>
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
        {subtitle && (
          <div className="transaction-balance-subtitle" style={{ color: subtitleColor }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionBalanceCard;