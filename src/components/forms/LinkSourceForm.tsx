import React, { useState, useEffect } from 'react';
import AccountsService from '@service/accounts-service';

interface LinkSourceFormProps {
  accountId: number; // You'd pass the accountId as a prop
  onSubmit: (selectedSourceId: number) => void; // Function to call when 'Link Source' is clicked
}

const LinkSourceForm: React.FC<LinkSourceFormProps> = ({
  accountId,
  onSubmit,
}) => {
  const [selectedSourceId, setSelectedSourceId] = useState<string>('');
  const [unlinkedSources, setUnlinkedSources] = useState<
    { id: number; handle: string | null }[]
  >([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const loadUnlinkedSources = async () => {
      try {
        const fetchedUnlinkedSources =
          await AccountsService.getUnlinkedSourcesForAccount(accountId);
        setUnlinkedSources(fetchedUnlinkedSources);
      } catch (error) {
        console.error('Error fetching unlinked sources:', error);
      }
    };
    loadUnlinkedSources();
  }, [accountId]);

  useEffect(() => {
    setSubmitDisabled(selectedSourceId === '');
  }, [selectedSourceId]);

  const handleOnSubmit = () => {
    if (selectedSourceId) {
      onSubmit(Number(selectedSourceId));
    }
  };

  return (
    <form className="form">
      <div className="fields">
        <div className="input-div">
          <label>Select Source:</label>
          <select
            value={selectedSourceId}
            onChange={(e) => setSelectedSourceId(e.target.value)}
          >
            <option value="" disabled>
              Select a source
            </option>
            {unlinkedSources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.handle || `Source ID: ${source.id}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        className="submit"
        disabled={submitDisabled}
        onClick={handleOnSubmit}
      >
        Link Source
      </button>
    </form>
  );
};

export default LinkSourceForm;
