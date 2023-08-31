import React, { useState, useEffect } from 'react';
import ScheduleService from '@service/schedule-service'; // Adjust the import path
import { ScheduleDTO } from '@domain/dto/schedule-dto'; // Adjust the import path

const Schedules: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleDTO[]>([]);
  const [jobType, setJobType] = useState('');
  const [eligibilityWindowStart, setEligibilityWindowStart] = useState('');
  const [eligibilityWindowEnd, setEligibilityWindowEnd] = useState('');
  const [frequencyMinutes, setFrequencyMinutes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newSchedule = await ScheduleService.createSchedule({
        jobType,
        eligibilityWindowStart: parseInt(eligibilityWindowStart),
        eligibilityWindowEnd: parseInt(eligibilityWindowEnd),
        frequencyMinutes: parseInt(frequencyMinutes),
      });

      // Assuming you have a way to refresh the schedules list after successful submission
      // For example, you might call a function to fetch and update the list of schedules.
      // refreshSchedules();

      // Clear the form fields after successful submission
      setJobType('');
      setEligibilityWindowStart('');
      setEligibilityWindowEnd('');
      setFrequencyMinutes('');
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  useEffect(() => {
    // Load schedules when the component mounts
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const fetchedSchedules = await ScheduleService.getAllSchedules(1000, 0); // Fetch first 1000 schedules
      setSchedules(fetchedSchedules);
    } catch (error) {
      console.error('Error loading schedules:', error);
    }
  };

  return (
    <div className="schedules-container">
      <h2>Create New Schedule</h2>
      <form className="create-schedule-form" onSubmit={handleSubmit}>
        <label>
          Job Type:
          <input
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
          />
        </label>
        <label>
          Eligibility Window Start:
          <input
            type="number"
            value={eligibilityWindowStart}
            onChange={(e) => setEligibilityWindowStart(e.target.value)}
            required
          />
        </label>
        <label>
          Eligibility Window End:
          <input
            type="number"
            value={eligibilityWindowEnd}
            onChange={(e) => setEligibilityWindowEnd(e.target.value)}
            required
          />
        </label>
        <label>
          Frequency Minutes:
          <input
            type="number"
            value={frequencyMinutes}
            onChange={(e) => setFrequencyMinutes(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Schedule</button>
      </form>
      {schedules.length > 0 ? (
        <>
          <h2>Schedules</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Job Type</th>
                <th>Eligibility Window Start</th>
                <th>Eligibility Window End</th>
                <th>Frequency (minutes)</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.id}</td>
                  <td>{schedule.jobType}</td>
                  <td>{schedule.eligibilityWindowStart}</td>
                  <td>{schedule.eligibilityWindowEnd}</td>
                  <td>{schedule.frequencyMinutes}</td>
                  <td>
                    {new Date(schedule.createdAt).toLocaleDateString()}{' '}
                    {new Date(schedule.createdAt).toLocaleTimeString()}
                  </td>
                  <td>{/* Add any action buttons here */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No schedules found.</p>
      )}
    </div>
  );
};

export default Schedules;
