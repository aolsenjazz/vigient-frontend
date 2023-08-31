import React, { useState, useEffect } from 'react';
import AccountService from '@service/accounts-service';
import { useNavigate } from 'react-router-dom';
import { Table } from './Table';
import { AccountDTO, AccountDTOImpl } from '@domain/dto/account-dto';
import Card from './Card';
import CreateAccountForm from './forms/CreateAccountForm';

const Accounts: React.FC = () => {
  const navigate = useNavigate();
  const [handle, setHandle] = useState<string>('');
  const [accounts, setAccounts] = useState<AccountDTOImpl[]>([]);

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

  const handleCreateAccount = async (handle: string) => {
    try {
      const newAccount = await AccountService.createAccount(handle);
      setAccounts([...accounts, newAccount]);
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleDeleteAccount = async (a: AccountDTO) => {
    try {
      await AccountService.deleteAccount(a.id);
      const updatedAccounts = accounts.filter((account) => account.id !== a.id);
      setAccounts(updatedAccounts);
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="accounts-container">
      <Card title="Create New Account">
        <CreateAccountForm onCreate={handleCreateAccount} />
      </Card>
      <Card title="Existing Accounts">
        <Table
          data={accounts}
          onEmpty="No records to display"
          onClick={(account: AccountDTO) => navigateToAccount(account.id)}
          onDelete={handleDeleteAccount}
          accessors={{
            createdAt: (account: AccountDTOImpl) => account.createdAtReadable(),
          }}
        />
      </Card>
    </div>
  );
};

export default Accounts;
