import React, { useState } from 'react';
import JobDetails from './JobDetails'; // Import the JobDetails component
import JobConfiguration from './JobConfiguration'; // Import the JobConfiguration component
import JobsService from '@service/jobs-service';
import { errorEmitter } from '../../events';

type Props = {
  onSubmit: () => void;
};

const CreateJobCard = ({ onSubmit }: Props) => {
  const [selectedJobType, setSelectedJobType] = useState(''); // Add state to track the selected job type
  const [priority, setPriority] = useState<1 | 2 | 3>(1); // Initialize priority state
  const [sourceId, setSourceId] = useState<number | null>(null); // Initialize accountId state

  const handleCreateJob = async () => {
    if (sourceId === null) {
      errorEmitter.emit('apiError', 'sourceId is required');
      return;
    }

    const jobData = {
      jobType: selectedJobType,
      priority,
      state: 'pending' as const,
      sourceId,
    };

    JobsService.createJob(jobData)
      .then(() => {
        onSubmit();
        setSelectedJobType(''); // Reset the form
      })
      .catch((error) => {});
  };

  const handleChangeJobType = (e: any) => {
    setSelectedJobType(e.target.value);
  };

  const handleCancel = () => {
    setSelectedJobType('');
  };

  return (
    <div className="card">
      <h2>Create a New Job</h2>
      <form className="form">
        <div className="fields">
          <div className="input-div">
            <label>Select Job Type:</label>
            <select value={selectedJobType} onChange={handleChangeJobType}>
              <option value="" disabled>
                Select Job Type
              </option>
              <option value="fullscrape">Full Scrape</option>
              <option value="headscrape">Head Scrape</option>
            </select>
          </div>
        </div>

        {selectedJobType && (
          <div className="subsection job-subsections">
            <div className="fields job-details-section">
              <JobDetails
                priority={priority}
                setPriority={setPriority}
                sourceId={sourceId}
                setSourceId={setSourceId}
              />
            </div>
            <div className="fields job-config-section">
              <JobConfiguration jobType={selectedJobType} />
            </div>
            <div className="fields">
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="submit-button"
                onClick={handleCreateJob}
              >
                Create Job
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateJobCard;
