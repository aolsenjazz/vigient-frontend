import React, { useState, useEffect } from 'react';
import AccountService from '@service/accounts-service';
import { useNavigate } from 'react-router-dom';

interface Account {
  id: number;
  handle: string;
  createdAt: string;
}

type DeleteConfirmationState = {
  accountId: number | null;
  show: boolean;
};

const Accounts: React.FC = () => {
  const navigate = useNavigate();
  const [handle, setHandle] = useState<string>('');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<DeleteConfirmationState>({
      accountId: null,
      show: false,
    });

  useEffect(() => {
    loadAccounts();
  }, []);

  const navigateToAccount = (id: number) => {
    navigate(`/account/${id}`);
  };

  const loadAccounts = async () => {
    try {
      const fetchedAccounts = await AccountService.getAllAccounts(1000, 0);
      setAccounts(fetchedAccounts);
    } catch (error) {
      console.error('Error loading accounts:', error);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const newAccount = await AccountService.createAccount(handle);
      setAccounts([...accounts, newAccount]);
      setHandle('');
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleDeleteAccount = async (accountId: number | null) => {
    try {
      await AccountService.deleteAccount(accountId as number);
      const updatedAccounts = accounts.filter(
        (account) => account.id !== accountId
      );
      setAccounts(updatedAccounts);
      setDeleteConfirmation({ accountId: null, show: false });
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="accounts-container">
      {/* Create Account Form */}
      <div className="create-account-form">
        <input
          type="text"
          placeholder="ID: Auto-generated"
          readOnly // Make it noninteractive
        />
        <input
          type="text"
          placeholder="Enter handle"
          value={handle}
          id="handle"
          onChange={(e) => setHandle(e.target.value)}
        />
        <input
          type="text"
          placeholder={`Created At: ${new Date().toLocaleString()}`} // Display current date and time
          readOnly // Make it noninteractive
        />
        <button onClick={handleCreateAccount}>Create</button>
      </div>

      {/* Account List */}
      <div className="account-list">
        {accounts.length === 0 ? ( // Check if there are no records
          <div className="account-row empty-row">No records to display</div>
        ) : (
          accounts.map((account) => (
            <div
              key={account.id}
              className="account-row clickable-row" // Add "clickable-row" class
              onClick={() => navigateToAccount(account.id)} // Add click handler
            >
              <div className="account-info">
                <p>ID: {account.id}</p>
                <p>
                  Handle:
                  <a
                    href={`https://x.com/${account.handle}`}
                    target="_blank"
                  >{` ${account.handle}`}</a>
                </p>
                <p>
                  Created At: {new Date(account.createdAt).toLocaleDateString()}{' '}
                  {new Date(account.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <button
                className="delete-button"
                onClick={() =>
                  setDeleteConfirmation({ accountId: account.id, show: true })
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {deleteConfirmation.show && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this account?</p>
          <button
            onClick={() => handleDeleteAccount(deleteConfirmation.accountId)}
          >
            Yes
          </button>
          <button
            onClick={() =>
              setDeleteConfirmation({ accountId: null, show: false })
            }
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default Accounts;
