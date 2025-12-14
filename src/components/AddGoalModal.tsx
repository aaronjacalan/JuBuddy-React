import { useState } from 'react';
import './AddGoalModal.css';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const AddGoalModal = ({ isOpen, onClose, onSave }: AddGoalModalProps) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Goal name is required');
    if (!targetAmount || parseFloat(targetAmount) <= 0) return setError('Please enter a valid amount');
    if (!targetDate) return setError('Target date is required');

    onSave({
      name,
      targetAmount,
      targetDate,
      description,
      currentAmount: 0
    });

    setName('');
    setTargetAmount('');
    setTargetDate('');
    setDescription('');
    onClose();
  };

  return (
    <div className="add-goal-overlay">
      <div className="add-goal-card">
        <div className="add-goal-header">
          <h2>Add New Goal</h2>
          <button onClick={onClose} className="add-goal-close">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="add-goal-body">
          {error && <div style={{color:'red', fontWeight:'bold'}}>{error}</div>}
          
          <div className="add-goal-columns">
            <div className="add-goal-col-left">
              <div className="add-goal-field">
                <label>Goal Name</label>
                <input 
                  type="text" 
                  className="add-goal-input-styled" 
                  placeholder="e.g., New Laptop" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="add-goal-field">
                <label>Target Amount (₱)</label>
                <input 
                  type="number" 
                  className="add-goal-input-styled" 
                  placeholder="0.00" 
                  min="0"
                  step="0.01"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>

              <div className="add-goal-field">
                <label>Target Date</label>
                <input 
                  type="date" 
                  className="add-goal-input-styled" 
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>
            </div>

            <div className="add-goal-col-right">
              <div className="add-goal-field" style={{height:'100%'}}>
                <label>Description (Optional)</label>
                <textarea 
                  className="add-goal-textarea-styled" 
                  placeholder="What are you saving for?" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="add-goal-footer">
            <button type="button" onClick={onClose} className="add-goal-btn-cancel">Cancel</button>
            <button type="submit" className="add-goal-btn-save">Save Goal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;