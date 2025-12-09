import React from 'react';
import './AddToJarModal.css';

interface AddToJarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: { name: string; amount: number }) => void;
}

function AddToJarModal({ isOpen, onClose, onSave }: AddToJarModalProps) {
  if (!isOpen) return null;

  const [itemName, setItemName] = React.useState('');
  const [price, setPrice] = React.useState('');

  const handleSubmit = (e:  React.FormEvent) => {
    e.preventDefault();
    
    const item = {
      name: itemName,
      amount: parseFloat(price)
    };

    onSave(item);
    onClose();
    
    // Reset form
    setItemName('');
    setPrice('');
  };

  const handleClose = () => {
    // Reset form before closing
    setItemName('');
    setPrice('');
    onClose();
  };

  return (
    <div className="add-to-jar-modal-overlay" onClick={handleClose}>
      <div className="add-to-jar-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-to-jar-modal-header">
          <h2 className="add-to-jar-title">Add to Virtual Jar</h2>
          <button className="add-to-jar-modal-close-btn" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-to-jar-form">
          <div className="add-to-jar-form-content">
            {/* Item Name */}
            <div className="add-to-jar-section">
              <label className="add-to-jar-label">Item Name</label>
              <input 
                type="text" 
                value={itemName} 
                onChange={(e) => setItemName(e.target. value)}
                placeholder="What are you saving for?"
                className="add-to-jar-text-input"
                required
              />
            </div>

            {/* Price */}
            <div className="add-to-jar-section">
              <label className="add-to-jar-label">Price</label>
              <div className="add-to-jar-amount-input">
                <span className="add-to-jar-currency">₱</span>
                <input 
                  type="number" 
                  value={price} 
                  onChange={(e) => setPrice(e. target.value)}
                  placeholder="0.00"
                  className="add-to-jar-number-input"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="add-to-jar-actions">
            <button type="button" onClick={handleClose} className="add-to-jar-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="add-to-jar-save-btn">
              Add to Jar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddToJarModal;