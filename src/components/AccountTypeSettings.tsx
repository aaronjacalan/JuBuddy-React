import { useState, useEffect } from 'react';
import './AccountTypeSettings.css';

interface Account {
  accountID: number;
  type: string;
  balance: number;
}

interface AccountTypeSettingsProps {
  userId: string;
}

function AccountTypeSettings({ userId }: AccountTypeSettingsProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const accountTypes = ['Cash', 'Credit Card', 'Bank Account', 'Digital Wallet'];

  useEffect(() => {
    fetchAccountsAndActive();
  }, [userId]);

  // NEW - Fetch both accounts list AND active account
  const fetchAccountsAndActive = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch all accounts
      const accountsResponse = await fetch(`/user/api/accounts/?user_id=${userId}`);
      const accountsData = await accountsResponse.json();

      if (!accountsResponse.ok) {
        setError(accountsData.error || 'Failed to fetch accounts');
        setLoading(false);
        return;
      }

      setAccounts(accountsData.accounts || []);

      // Fetch active account from database
      const activeResponse = await fetch(`/user/api/accounts/get-active/?user_id=${userId}`);
      const activeData = await activeResponse.json();

      if (activeResponse.ok && activeData.accountID) {
        // Find and set the active account
        const active = accountsData.accounts.find(
          (acc: Account) => acc.accountID === activeData.accountID
        );
        if (active) {
          setSelectedAccount(active);
        }
      } else if (accountsData.accounts && accountsData.accounts.length > 0) {
        // No active account set, default to first one
        setSelectedAccount(accountsData.accounts[0]);
      }

    } catch (err) {
      setError(`Network error: ${err instanceof Error ? err.message : 'Unable to connect'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAccount = async (account: Account) => {
    setSelectedAccount(account);

    try {
      const response = await fetch('/user/api/accounts/set-active/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          account_id: account.accountID,
        }),
      });

      if (response.ok) {
        setError('');
        // Emit custom event to notify other components
        window.dispatchEvent(new CustomEvent('activeAccountChanged', {
          detail: { accountID: account.accountID }
        }));
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to set active account');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  const handleAddAccount = async (type: string) => {
    try {
      const response = await fetch('/user/api/accounts/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          type: type,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchAccountsAndActive(); // Refresh
        setError('');
      } else {
        setError(data.error || 'Failed to create account');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  const handleDeleteAccount = async (accountId: number) => {
    if (!window.confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/user/api/accounts/delete/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account_id: accountId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const remainingAccounts = accounts.filter(acc => acc.accountID !== accountId);
        setAccounts(remainingAccounts);

        if (selectedAccount?.accountID === accountId) {
          const newActive = remainingAccounts[0] || null;
          setSelectedAccount(newActive);
          if (newActive) {
            handleSelectAccount(newActive);
          }
        }
        setError('');
      } else {
        setError(data.error || 'Failed to delete account');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  if (loading) {
    return <div className="account-type-loading">Loading accounts...</div>;
  }

  return (
    <div className="account-type-settings">
      <div className="account-type-header">
        <h3>Your Accounts</h3>
        <p className="account-type-description">
          Create different accounts to organize your finances. Switch between accounts to track different wallets, cards, or banks.
        </p>
      </div>

      {error && <div className="account-type-error">{error}</div>}

      <div className="accounts-grid">
        {accounts.length === 0 ? (
          <div className="no-accounts-card">
            <p>No accounts found. Create your first account to get started!</p>
          </div>
        ) : (
          accounts.map((account) => (
            <div
              key={account.accountID}
              className={`account-card ${selectedAccount?.accountID === account.accountID ? 'selected' : ''}`}
              onClick={() => handleSelectAccount(account)}
            >
              <div className="account-card-header">
                <div className="account-icon">{getAccountIcon(account.type)}</div>
                <button
                  className="delete-icon-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAccount(account.accountID);
                  }}
                  title="Delete account"
                >
                  ×
                </button>
              </div>
              <h4 className="account-card-type">{account.type}</h4>
              <p className="account-card-balance">
                ${account.balance.toFixed(2)}
              </p>
              {selectedAccount?.accountID === account.accountID && (
                <div className="selected-badge">Active</div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="add-account-section">
        <h4>Add New Account</h4>
        <div className="account-type-buttons">
          {accountTypes.map((type) => (
            <button
              key={type}
              className="account-type-btn"
              onClick={() => handleAddAccount(type)}
              disabled={accounts.some(acc => acc.type === type)}
            >
              <span className="account-btn-icon">{getAccountIcon(type)}</span>
              <span className="account-btn-text">{type}</span>
            </button>
          ))}
        </div>
        <p className="add-account-hint">
          Click on an account type above to create a new account
        </p>
      </div>
    </div>
  );
}

function getAccountIcon(type: string): string {
  switch (type) {
    case 'Cash':
      return '💵';
    case 'Credit Card':
      return '💳';
    case 'Bank Account':
      return '🏦';
    case 'Digital Wallet':
      return '📱';
    default:
      return '💰';
  }
}

export default AccountTypeSettings;