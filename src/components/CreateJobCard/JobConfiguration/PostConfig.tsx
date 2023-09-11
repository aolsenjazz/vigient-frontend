import { AccountDTOImpl } from '@domain/dto/account-dto';
import AccountsService from '@service/accounts-service';
import { useEffect, useState } from 'react';

type Props = {
  setJobConfig: (a: any) => void;
};

const PostConfig = ({ setJobConfig }: Props) => {
  const [allAccounts, setAllAccounts] = useState<AccountDTOImpl[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await AccountsService.getAllAccounts(1000, 0);
      setAllAccounts(accounts);
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    setJobConfig({ accountId });
  }, [accountId]);

  return (
    <>
      <h3>Job Config</h3>
      <div className="fields">
        <div className="input-div">
          <label>Account ID:</label>
          <select
            value={accountId || ''}
            onChange={(e) => setAccountId(parseInt(e.target.value, 10))}
          >
            <option value="" disabled>
              Select an Account
            </option>
            {allAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.handle}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default PostConfig;
