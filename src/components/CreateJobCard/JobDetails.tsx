import { AccountDTOImpl } from '@domain/dto/account-dto';
import { SourceDTOImpl } from '@domain/dto/source-dto';
import AccountsService from '@service/accounts-service';
import SourceService from '@service/source-service';
import React, { useEffect, useState } from 'react';

export type JobStatus =
  | 'pending'
  | 'running'
  | 'failed'
  | 'paused'
  | 'completed';

interface JobDetailsProps {
  priority: number;
  setPriority: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  sourceId: number | null;
  setSourceId: React.Dispatch<React.SetStateAction<number | null>>;
}

const JobDetails: React.FC<JobDetailsProps> = ({
  priority,
  setPriority,
  sourceId,
  setSourceId,
}) => {
  const [allAccounts, setAllAccounts] = useState<any[]>([]); // Replace 'any' with the actual AccountDTOImpl type if available
  const [allSources, setAllSources] = useState<SourceDTOImpl[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const sources = await SourceService.getAllSources(1000, 0);
      setAllSources(sources);
    };

    fetchAccounts();
  }, []);

  return (
    <>
      <h3>Job Details</h3>
      <div className="fields">
        <div className="input-div">
          <label>ID:</label>
          <input
            type="text"
            placeholder="ID: Auto-generated"
            disabled
            readOnly
          />
        </div>
        <div className="input-div">
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) =>
              setPriority(parseInt(e.target.value, 10) as 1 | 2 | 3)
            }
          >
            <option value={1}>LOW</option>
            <option value={2}>MEDIUM</option>
            <option value={3}>HIGH</option>
          </select>
        </div>
        <div className="input-div">
          <label>Schedule ID:</label>
          <input
            type="number"
            disabled
            placeholder="Schedule ID: Auto-generated"
          />
        </div>
        <div className="input-div">
          <label>Source ID:</label>
          <select
            value={sourceId || ''}
            onChange={(e) => setSourceId(parseInt(e.target.value, 10))}
          >
            <option value="" disabled>
              Select a Source
            </option>
            {allSources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.handle}
              </option>
            ))}
          </select>
        </div>
        <div className="input-div">
          <label>Created At:</label>
          <input
            type="text"
            disabled
            placeholder="Created At: Auto-generated"
            readOnly
          />
        </div>
      </div>
    </>
  );
};

export default JobDetails;
