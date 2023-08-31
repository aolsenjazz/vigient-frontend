import React, { useState, useEffect } from 'react';
import AccountService from '@service/accounts-service';
import { useNavigate } from 'react-router-dom';
import { Table } from './Table';
import { AccountDTO, AccountDTOImpl } from '@domain/dto/account-dto';
import Card from './Card';
import CreateAccountForm from './forms/CreateAccountForm';

const Accounts: React.FC = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<AccountDTOImpl[]>([]);

  useEffect(() => {
    AccountService.getAllAccounts(1000, 0)
      .then((accounts) => setAccounts(accounts))
      .catch((e) => {});
  }, []);

  const onCreate = (handle: string) => {
    AccountService.createAccount(handle)
      .then(() => AccountService.getAllAccounts(1000, 0))
      .then((accounts) => setAccounts(accounts))
      .catch((e) => {});
  };

  const onDelete = (account: AccountDTOImpl) => {
    AccountService.deleteAccount(account.id)
      .then(() => AccountService.getAllAccounts(1000, 0))
      .then((accounts) => setAccounts(accounts))
      .catch((e) => {});
  };

  const navigateToAccount = (id: number) => {
    navigate(`/account/${id}`);
  };

  return (
    <div className="accounts-container">
      <Card title="Create New Account">
        <CreateAccountForm onCreate={onCreate} />
      </Card>
      <Card title="Existing Accounts">
        <Table
          data={accounts}
          onEmpty="No records to display"
          onClick={(account: AccountDTO) => navigateToAccount(account.id)}
          onDelete={onDelete}
          accessors={{
            createdAt: (account: AccountDTOImpl) => account.createdAtReadable(),
          }}
        />
      </Card>
    </div>
  );
};

export default Accounts;
