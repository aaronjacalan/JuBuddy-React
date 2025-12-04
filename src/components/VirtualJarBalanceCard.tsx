import './VirtualJarBalanceCard.css';

interface VirtualJarBalanceCardProps {
  name: string;
  amount: number;
}

function VirtualJarBalanceCard({ name, amount }: VirtualJarBalanceCardProps) {
  return (
    <div className="virtual-jar-balance-card">
      <div className="virtual-jar-item-info">
        <span className="virtual-jar-item-name">{name}</span>
        <div className="virtual-jar-item-amount">
          <span className="virtual-jar-peso-sign">₱</span>
          <span className="virtual-jar-amount-value">
            {amount.toLocaleString('en-PH', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VirtualJarBalanceCard;