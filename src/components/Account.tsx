import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AccountDTO, AccountDTOImpl } from '@domain/dto/account-dto';
import { SourceDTO } from '@domain/dto/source-dto';
import AccountsService from '@service/accounts-service'; // Replace with the actual path
import SourceService from '@service/source-service'; // Replace with the actual path

type DeleteConfirmationState = {
  sourceId: number | null;
  show: boolean;
};

const Account: React.FC = () => {
  const { id } = useParams();
  const accountId = Number(id);
  const [account, setAccount] = useState<AccountDTO | null>(null);
  const [linkedSources, setLinkedSources] = useState<SourceDTO[]>([]);
  const [allSources, setAllSources] = useState<SourceDTO[]>([]); // To store all available sources
  const [selectedSourceId, setSelectedSourceId] = useState<number | null>(null); // To store selected source ID from form
  const [unlinkedSources, setUnlinkedSources] = useState<SourceDTO[]>([]); // To store unlinked sources
  const [submitDisabled, setSubmitDisabled] = useState(true); // Initialize to true

  const [deleteConfirmation, setDeleteConfirmation] =
    useState<DeleteConfirmationState>({
      sourceId: null,
      show: false,
    });

  const handleDeleteSource = async (sourceId: number | null) => {
    try {
      if (sourceId !== null && accountId) {
        await AccountsService.deleteSourceFromAccount(accountId, sourceId);
        const updatedLinkedSources = linkedSources.filter(
          (source) => source.id !== sourceId
        );
        setLinkedSources(updatedLinkedSources);
        setDeleteConfirmation({ sourceId: null, show: false });
        const fetchedUnlinkedSources =
          await AccountsService.getUnlinkedSourcesForAccount(accountId);
        setUnlinkedSources(fetchedUnlinkedSources);
      }
    } catch (error) {
      console.error('Error unlinking source:', error);
    }
  };

  useEffect(() => {
    setSubmitDisabled(!selectedSourceId);
  }, [selectedSourceId]);

  useEffect(() => {
    const fetchData = async () => {
      if (accountId) {
        try {
          const fetchedAccount =
            await AccountsService.getAccountById(accountId);
          setAccount(fetchedAccount);

          const fetchedLinkedSources =
            await AccountsService.getLinkedSourcesForAccount(accountId);
          setLinkedSources(fetchedLinkedSources);

          const fetchedAllSources = await SourceService.getAllSources(100, 0); // Fetch first 100 sources
          setAllSources(fetchedAllSources);

          // Fetch unlinked sources for the account
          const fetchedUnlinkedSources =
            await AccountsService.getUnlinkedSourcesForAccount(accountId);

          setUnlinkedSources(fetchedUnlinkedSources);
        } catch (error) {
          console.error('An error occurred while fetching data:', error);
        }
      }
    };

    fetchData();
  }, [accountId]);

  const handleLinkSource = async () => {
    if (selectedSourceId !== null && accountId) {
      await AccountsService.addSourceToAccount(accountId, selectedSourceId);
      // Refresh linked sources
      const fetchedLinkedSources =
        await AccountsService.getLinkedSourcesForAccount(accountId);
      setLinkedSources(fetchedLinkedSources);
      const fetchedUnlinkedSources =
        await AccountsService.getUnlinkedSourcesForAccount(accountId);
      setUnlinkedSources(fetchedUnlinkedSources);

      setSelectedSourceId(null);
      setSubmitDisabled(true);
    }
  };

  return (
    <div className="account-container">
      {deleteConfirmation.show && (
        <div className="delete-confirmation">
          <p>Are you sure you want to unlink this source?</p>
          <button
            onClick={() => handleDeleteSource(deleteConfirmation.sourceId)}
          >
            Yes
          </button>
          <button
            onClick={() =>
              setDeleteConfirmation({ sourceId: null, show: false })
            }
          >
            No
          </button>
        </div>
      )}

      <div className="detail-card">
        <h1>Account Details</h1>
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
            <p>
              Created At: {new Date(account.createdAt).toLocaleDateString()}{' '}
              {new Date(account.createdAt).toLocaleTimeString()}
            </p>
          </>
        )}
      </div>
      <div className="linked-sources-card">
        <h2>Linked Sources</h2>
        <form className="link-source-form">
          <label>
            Select Source:
            <select
              value={selectedSourceId || ''}
              onChange={(e) => setSelectedSourceId(Number(e.target.value))}
            >
              <option value="" disabled>
                Select a source
              </option>
              {unlinkedSources.map(
                (
                  source // Use unlinkedSources here
                ) => (
                  <option key={source.id} value={source.id}>
                    {source.handle || `Source ID: ${source.id}`}
                  </option>
                )
              )}
            </select>
          </label>
          <button
            type="button"
            disabled={submitDisabled}
            onClick={handleLinkSource}
          >
            Link Source
          </button>
        </form>
        {linkedSources.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Handle</th>
                <th>Created At</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {linkedSources.map((source) => (
                <tr key={source.id}>
                  <td>{source.id}</td>
                  <td>{source.handle}</td>
                  <td>
                    {new Date(source.createdAt).toLocaleDateString()}{' '}
                    {new Date(source.createdAt).toLocaleTimeString()}
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() =>
                        setDeleteConfirmation({
                          sourceId: source.id,
                          show: true,
                        })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No linked sources found.</p>
        )}
      </div>
    </div>
  );
};

export default Account;
