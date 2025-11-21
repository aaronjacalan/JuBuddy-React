import './BalanceCard.css';

interface BalanceCardProps {
  balance: number;
}

function BalanceCard({ balance }: BalanceCardProps) {
  const formattedBalance = balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="balance-card">
      <div className="balance-label">current balance</div>
      <div className="balance-content">
        <div className="peso-symbol">₱</div>
        <div className="balance-amount">{formattedBalance}</div>
      </div>
    </div>
  );
}

export default BalanceCard;