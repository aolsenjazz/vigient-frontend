import { SourceDTOImpl } from '@domain/dto/source-dto';
import SourceService from '@service/source-service';
import React, { useEffect, useState } from 'react';

const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00:00`;
});

interface ScheduleDetailsProps {
  eligibilityWindowStart: string;
  setEligibilityWindowStart: React.Dispatch<React.SetStateAction<string>>;
  eligibilityWindowEnd: string;
  setEligibilityWindowEnd: React.Dispatch<React.SetStateAction<string>>;
  frequencyMinutes: number;
  setFrequencyMinutes: React.Dispatch<React.SetStateAction<number>>;
  priority: number;
  setPriority: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

const ScheduleDetails: React.FC<ScheduleDetailsProps> = ({
  eligibilityWindowStart,
  setEligibilityWindowStart,
  eligibilityWindowEnd,
  setEligibilityWindowEnd,
  frequencyMinutes,
  setFrequencyMinutes,
  priority,
  setPriority,
}) => {
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
      <h3>Schedule Details</h3>
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
          <label>Eligibility Window Start:</label>
          <select
            value={eligibilityWindowStart || ''}
            onChange={(e) => setEligibilityWindowStart(e.target.value)}
          >
            <option value="" disabled>
              Select Start Time
            </option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="input-div">
          <label>Eligibility Window End:</label>
          <select
            value={eligibilityWindowEnd || ''}
            onChange={(e) => setEligibilityWindowEnd(e.target.value)}
          >
            <option value="" disabled>
              Select End Time
            </option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="input-div">
          <label>Frequency (Minutes):</label>
          <input
            type="number"
            placeholder="Enter frequency in minutes"
            value={frequencyMinutes || ''}
            onChange={(e) => setFrequencyMinutes(parseInt(e.target.value, 10))}
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
      </div>
    </>
  );
};

export default ScheduleDetails;
