import React from 'react';
import './AddGoalModal.css';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: any) => void;
}

function AddGoalModal({ isOpen, onClose, onSave }: AddGoalModalProps) {
  if (!isOpen) return null;

  const [goalName, setGoalName] = React.useState('');
  const [goalDesc, setGoalDesc] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const goal = {
      goalName,
      goalDesc,
      startDate,
      endDate
    };

    onSave(goal);
    onClose();
    
    // Reset form
    setGoalName('');
    setGoalDesc('');
    setStartDate('');
    setEndDate('');
  };

  const handleClose = () => {
    // Reset form before closing
    setGoalName('');
    setGoalDesc('');
    setStartDate('');
    setEndDate('');
    onClose();
  };

  return (
    <div className="add-goal-modal-overlay" onClick={handleClose}>
      <div className="add-goal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-goal-modal-header">
          <h2 className="add-goal-title">Add New Goal</h2>
        </div>

        <form onSubmit={handleSubmit} className="add-goal-form">
          <div className="add-goal-form-content">
            <div className="add-goal-two-column-layout">
              {/* Left Column - Goal Name and Dates */}
              <div className="add-goal-left-column">
                {/* Goal Name */}
                <div className="add-goal-section">
                  <label className="add-goal-label">Goal Name</label>
                  <input 
                    type="text" 
                    value={goalName} 
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder="Enter goal name"
                    className="add-goal-text-input"
                    required
                  />
                </div>

                {/* Start Date */}
                <div className="add-goal-section">
                  <label className="add-goal-label">Start Date</label>
                  <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}
                    className="add-goal-date-input"
                    required
                  />
                </div>

                {/* End Date */}
                <div className="add-goal-section">
                  <label className="add-goal-label">End Date</label>
                  <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                    className="add-goal-date-input"
                    required
                  />
                </div>
              </div>

              {/* Right Column - Goal Description */}
              <div className="add-goal-right-column">
                <div className="add-goal-section">
                  <label className="add-goal-label">Goal Description</label>
                  <textarea 
                    value={goalDesc} 
                    onChange={(e) => setGoalDesc(e.target.value)}
                    placeholder="Describe your goal in detail"
                    className="add-goal-textarea"
                    rows={12}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="add-goal-actions">
            <button type="button" onClick={handleClose} className="add-goal-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="add-goal-save-btn">
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGoalModal;