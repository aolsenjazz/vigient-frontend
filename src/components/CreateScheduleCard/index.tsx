import React, { useState } from 'react';
import ScheduleDetails from './ScheduleDetails'; // Import the ScheduleDetails component
import JobConfiguration from '../CreateJobCard/JobConfiguration'; // Import the JobConfiguration component
import SchedulesService from '@service/schedule-service';
import { errorEmitter } from '../../events';

type Props = {
  onSubmit: () => void;
};

const CreateScheduleCard = ({ onSubmit }: Props) => {
  const [selectedJobType, setSelectedJobType] = useState(''); // Add state to track the selected job type
  const [eligibilityWindowStart, setEligibilityWindowStart] = useState('');
  const [eligibilityWindowEnd, setEligibilityWindowEnd] = useState('');
  const [frequencyMinutes, setFrequencyMinutes] = useState(60);
  const [priority, setPriority] = useState<1 | 2 | 3>(1);
  const [jobConfig, setJobConfig] = useState<Object>({});

  const handleCreateSchedule = () => {
    if (
      eligibilityWindowStart === undefined ||
      eligibilityWindowEnd === undefined ||
      frequencyMinutes === undefined
    ) {
      errorEmitter.emit('apiError', 'All schedule details are required');
      return;
    }

    const scheduleData = {
      jobType: selectedJobType,
      eligibilityWindowStart,
      eligibilityWindowEnd,
      frequencyMinutes,
      priority,
      ...jobConfig,
    };

    SchedulesService.createSchedule(scheduleData)
      .then(() => {
        onSubmit();
        setSelectedJobType(''); // Reset the form
      })
      .catch((error) => {});
  };

  return (
    <div className="card">
      <h2>Create a New Schedule</h2>
      <form className="form">
        <div className="fields">
          <div className="input-div">
            <label>Select Job Type:</label>
            <select
              value={selectedJobType}
              onChange={(e: any) => setSelectedJobType(e.target.value)}
            >
              <option value="" disabled>
                Select Job Type
              </option>
              <option value="headscrape">Headscrape</option>
              <option value="post">Post</option>
              <option value="scroll">Scroll</option>
            </select>
          </div>
        </div>

        {selectedJobType && (
          <div className="subsection schedule-subsections">
            <div className="fields schedule-details-section">
              <ScheduleDetails
                eligibilityWindowStart={eligibilityWindowStart}
                setEligibilityWindowStart={setEligibilityWindowStart}
                eligibilityWindowEnd={eligibilityWindowEnd}
                setEligibilityWindowEnd={setEligibilityWindowEnd}
                frequencyMinutes={frequencyMinutes}
                setFrequencyMinutes={setFrequencyMinutes}
                priority={priority}
                setPriority={setPriority}
              />
            </div>
            <div className="fields job-config-section">
              <JobConfiguration
                jobType={selectedJobType}
                setJobConfig={setJobConfig}
              />
            </div>
            <div className="fields">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setSelectedJobType('')}
              >
                Cancel
              </button>
              <button
                type="button"
                className="submit-button"
                onClick={handleCreateSchedule}
              >
                Create Schedule
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateScheduleCard;
