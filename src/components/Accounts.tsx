import React, { useState, useEffect } from "react";

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
  const [handle, setHandle] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<DeleteConfirmationState>({
      accountId: null,
      show: false,
    });

  useEffect(() => {
    // Load accounts data when the component mounts
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    // In a real implementation, you would fetch data here
    // For this example, we'll generate dummy data with 5 rows
    const dummyData: Account[] = generateDummyData(5);
    setAccounts(dummyData);
  };

  const generateDummyData = (count: number): Account[] => {
    const dummyData: Account[] = [];
    for (let i = 1; i <= count; i++) {
      dummyData.push({
        id: i,
        handle: `User${i}`,
        createdAt: new Date().toLocaleString(),
      });
    }
    return dummyData;
  };

  const handleCreateAccount = async () => {
    // Simulated creation of an account, you can implement the API call here
    const newAccount: Account = {
      id: accounts.length + 1, // Generate a unique ID (this is just an example)
      handle: handle,
      createdAt: new Date().toLocaleString(),
    };

    // Add the new account to the existing accounts
    setAccounts([...accounts, newAccount]);

    // Clear the input field
    setHandle("");
  };

  const handleDeleteAccount = async (accountId: number | null) => {
    // Implement delete functionality here
    // Remove the account with the specified ID from the accounts state
    const updatedAccounts = accounts.filter(
      (account) => account.id !== accountId,
    );

    // Close the delete confirmation
    setDeleteConfirmation({ accountId: null, show: false });

    // Update the accounts state with the remaining accounts
    setAccounts(updatedAccounts);
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
            <div key={account.id} className="account-row">
              <div className="account-info">
                <p>ID: {account.id}</p>
                <p>Handle: {account.handle}</p>
                <p>Created At: {account.createdAt}</p>
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
