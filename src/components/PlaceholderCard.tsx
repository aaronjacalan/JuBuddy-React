import './PlaceholderCard.css';

interface PlaceholderCardProps {
  size?: 'small' | 'medium' | 'large';
}

function PlaceholderCard({ size = 'medium' }: PlaceholderCardProps) {
  return (
    <div className={`placeholder-card placeholder-card-${size}`}>
      <div className="placeholder-x">✕</div>
    </div>
  );
}

export default PlaceholderCard;