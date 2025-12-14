import { useState, useEffect } from 'react';
import './FundsModal.css';

interface FundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (amount: number) => void;
  goalName: string;
  mode: 'add' | 'reduce';
  maxLimit?: number; // Passed from parent: Current Savings (Reduce) or Remaining Target (Add)
}

const FundsModal = ({ isOpen, onClose, onSave, goalName, mode, maxLimit }: FundsModalProps) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setAmount('');
    setError('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    
    if (isNaN(val) || val <= 0) {
      setError('Please enter a valid positive amount');
      return;
    }

    // VALIDATION: Check limits for both Add and Reduce
    if (maxLimit !== undefined && val > maxLimit) {
      if (mode === 'reduce') {
        setError(`Cannot withdraw more than current savings (₱${maxLimit.toLocaleString()})`);
      } else {
        setError(`Cannot add more than remaining goal amount (₱${maxLimit.toLocaleString()})`);
      }
      return;
    }

    onSave(val); 
    onClose();
  };

  const isReduce = mode === 'reduce';

  return (
    <div className="funds-modal-overlay">
      <div className="funds-modal-card">
        <div className="funds-modal-header">
          <h3>{isReduce ? 'Reduce Savings' : 'Add Savings'}</h3>
          <button onClick={onClose} className="funds-close-btn">&times;</button>
        </div>
        
        <p className="funds-subtitle">
          {isReduce 
            ? `Withdraw from "${goalName}"?` 
            : `Add to "${goalName}"?`
          }
          {/* Display the available limit dynamically */}
          {maxLimit !== undefined && (
            <span style={{display:'block', fontSize:'0.8rem', color:'#666', marginTop:'4px'}}>
              {isReduce ? 'Available to withdraw: ' : 'Remaining to save: '}
              <strong>₱{maxLimit.toLocaleString()}</strong>
            </span>
          )}
        </p>

        <form onSubmit={handleSubmit}>
          {error && <p className="funds-error">{error}</p>}
          <div className="funds-input-group">
            <label>Amount (₱)</label>
            <input 
              type="number" 
              className="funds-input"
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
              min="0"
              step="0.01"
            />
          </div>
          <div className="funds-actions">
            <button type="button" onClick={onClose} className="funds-btn-cancel">Cancel</button>
            <button 
              type="submit" 
              className="funds-btn-save"
              style={{
                backgroundColor: isReduce ? '#e53e3e' : '#06D2CA'
              }}
            >
              {isReduce ? 'Reduce' : 'Add Savings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FundsModal;