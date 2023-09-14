import { AccountDTOImpl } from '@domain/dto/account-dto';
import AccountsService from '@service/accounts-service';
import { abort } from 'process';
import { useEffect, useState } from 'react';

type Props = {
  setJobConfig: (a: any) => void;
};

const PostConfig = ({ setJobConfig }: Props) => {
  const [allAccounts, setAllAccounts] = useState<AccountDTOImpl[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [abortChance, setAbortChance] = useState<number>(75);

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await AccountsService.getAllAccounts(1000, 0);
      setAllAccounts(accounts);
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const chance = abortChance / 100;
    setJobConfig({ accountId, data: { abortChance: chance } });
  }, [accountId, abortChance]);

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
        <div className="input-div">
          <label>Abort Chance (%):</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={abortChance}
            onChange={(e) => setAbortChance(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </>
  );
};

export default PostConfig;
