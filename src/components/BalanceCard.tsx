import './BalanceCard.css';

interface BalanceCardProps {
  title?: string;
  balance: number;
  subtitle?: string;
  subtitleColor?: string;
}

function BalanceCard({ 
  title = 'current balance',
  balance,
  subtitle,
  subtitleColor = '#666'
}: BalanceCardProps) {
  return (
    <div className="balance-card">
      <div className="balance-label">{title}</div>
      <div className="balance-amount">
        <span className="peso-sign">₱</span>
        <span className="amount">
          {balance.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}
        </span>
      </div>
      {subtitle && (
        <div className="balance-subtitle" style={{ color: subtitleColor }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

export default BalanceCard;