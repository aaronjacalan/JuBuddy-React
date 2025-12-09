import React from 'react';
import './AddTransactionModal.css';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: any) => void;
}

function AddTransactionModal({ isOpen, onClose, onSave }: AddTransactionModalProps) {
  if (!isOpen) return null;

  const [transactionType, setTransactionType] = React.useState<'income' | 'expense'>('expense');
  const [category, setCategory] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [date, setDate] = React.useState('');

  const expenseCategories = [
    { value: 'HOUSING', label: 'Housing' },
    { value: 'FOOD', label: 'Food & Dining' },
    { value: 'TRANSPORT', label: 'Transportation' },
    { value: 'HEALTH', label: 'Healthcare' },
    { value: 'ENTERTAIN', label: 'Entertainment' },
    { value: 'SHOPPING', label: 'Shopping' },
    { value: 'OTHER', label: 'Other' }
  ];

  const incomeCategories = [
    { value: 'SALARY', label: 'Salary' },
    { value: 'FREELANCE', label: 'Freelance' },
    { value: 'BUSINESS', label: 'Business' },
    { value: 'INVESTMENT', label: 'Investments' },
    { value: 'GIFT', label: 'Gifts' },
    { value: 'PASSIVE', label: 'Passive Income' },
    { value: 'OTHER', label: 'Other' }
  ];

  const paymentMethods = [
    { value: 'CASH', label: 'Cash' },
    { value: 'CREDIT_CARD', label: 'Credit Card' },
    { value: 'DEBIT_CARD', label: 'Debit Card' },
    { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
    { value: 'PAYPAL', label: 'PayPal' },
    { value: 'VENMO', label: 'Venmo' },
    { value: 'APPLE_PAY', label: 'Apple Pay' },
    { value: 'GOOGLE_PAY', label: 'Google Pay' },
    { value: 'CHECK', label: 'Check' },
    { value: 'CRYPTO', label: 'Cryptocurrency' },
    { value: 'OTHER', label: 'Other' }
  ];

  const currentCategories = transactionType === 'expense' ? expenseCategories : incomeCategories;
  const paymentLabel = transactionType === 'expense' ? 'Payment Method' : 'Income Channel';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transaction = {
      type: transactionType,
      category,
      paymentMethod,
      amount: parseFloat(amount),
      date
    };

    onSave(transaction);
    onClose();
    
    // Reset form
    setTransactionType('expense');
    setCategory('');
    setPaymentMethod('');
    setAmount('');
    setDate('');
  };

  const handleClose = () => {
    // Reset form before closing
    setTransactionType('expense');
    setCategory('');
    setPaymentMethod('');
    setAmount('');
    setDate('');
    onClose();
  };

  return (
    <div className="add-transaction-modal-overlay" onClick={handleClose}>
      <div className="add-transaction-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-transaction-modal-header">
          <h2 className="add-transaction-title">Add New Transaction</h2>
        </div>

        <form onSubmit={handleSubmit} className="add-transaction-form">
          <div className="add-transaction-form-content">
            {/* Transaction Type Selection */}
            <div className="add-transaction-section">
              <label className="add-transaction-label">Transaction Type</label>
              <div className="add-transaction-type-selector">
                <button
                  type="button"
                  className={`add-transaction-type-btn ${transactionType === 'expense' ? 'active' : ''}`}
                  onClick={() => setTransactionType('expense')}
                >
                  Expense
                </button>
                <button
                  type="button"
                  className={`add-transaction-type-btn ${transactionType === 'income' ? 'active' : ''}`}
                  onClick={() => setTransactionType('income')}
                >
                  Income
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="add-transaction-section">
              <label className="add-transaction-label">Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="add-transaction-select"
                required
              >
                <option value="">Select a category</option>
                {currentCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div className="add-transaction-section">
              <label className="add-transaction-label">{paymentLabel}</label>
              <select 
                value={paymentMethod} 
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="add-transaction-select"
                required
              >
                <option value="">Select a {paymentLabel.toLowerCase()}</option>
                {paymentMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div className="add-transaction-section">
              <label className="add-transaction-label">Amount</label>
              <div className="add-transaction-amount-input">
                <span className="add-transaction-currency">₱</span>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="add-transaction-number-input"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div className="add-transaction-section">
              <label className="add-transaction-label">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="add-transaction-date-input"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="add-transaction-actions">
            <button type="button" onClick={handleClose} className="add-transaction-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="add-transaction-save-btn">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;