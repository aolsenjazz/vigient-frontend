import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AccountDTO, AccountDTOImpl } from '@domain/dto/account-dto';
import { SourceDTO, SourceDTOImpl } from '@domain/dto/source-dto';
import AccountsService from '@service/accounts-service'; // Replace with the actual path
import SourceService from '@service/source-service'; // Replace with the actual path
import LinkSourceForm from './forms/LinkSourceForm';
import { Table } from './Table';
import Card from './Card';

const Account: React.FC = () => {
  const { id } = useParams();
  const accountId = Number(id);
  const [account, setAccount] = useState<AccountDTOImpl | null>(null);
  const [linkedSources, setLinkedSources] = useState<SourceDTOImpl[]>([]);

  useEffect(() => {
    if (accountId) {
      AccountsService.getAccountById(accountId)
        .then((fetchedAccount) => {
          setAccount(fetchedAccount);
        })
        .catch((e) => {});

      AccountsService.getLinkedSourcesForAccount(accountId)
        .then((fetchedLinkedSources) => {
          setLinkedSources(fetchedLinkedSources);
        })
        .catch((e) => {});
    }
  }, [accountId]);

  const onDeleteSource = (dataRow: SourceDTO) => {
    if (dataRow.id !== null && accountId) {
      AccountsService.deleteSourceFromAccount(accountId, dataRow.id)
        .then(() => AccountsService.getLinkedSourcesForAccount(accountId))
        .then((fetchedLinkedSources) => {
          setLinkedSources(fetchedLinkedSources);
        })
        .catch((e) => {});
    }
  };

  const onLinkSource = (sourceId: number) => {
    if (sourceId && accountId) {
      AccountsService.addSourceToAccount(accountId, sourceId)
        .then(() => AccountsService.getLinkedSourcesForAccount(accountId))
        .then((fetchedLinkedSources) => {
          setLinkedSources(fetchedLinkedSources);
        })
        .catch((e) => {});
    }
  };

  return (
    <div className="account-container">
      <Card title="Account Details">
        <div className="subsection">
          {account && (
            <>
              <p>ID: {account.id}</p>
              <p>
                Handle:{' '}
                <a
                  href={`https://x.com/${account.handle}`}
                  target="_blank"
                >{` ${account.handle}`}</a>
              </p>
              <p>Created at: {account.createdAtReadable()}</p>
            </>
          )}
        </div>
      </Card>

      <Card title="Linked Sources">
        <div className="subsection">
          <LinkSourceForm accountId={accountId} onSubmit={onLinkSource} />
        </div>
        <div className="subsection">
          <Table
            data={linkedSources}
            accessors={{
              createdAt: (source: SourceDTOImpl) => source.createdAtReadable(),
            }}
            onDelete={onDeleteSource}
            onEmpty="No linked sources found."
          />
        </div>
      </Card>
    </div>
  );
};

export default Account;
