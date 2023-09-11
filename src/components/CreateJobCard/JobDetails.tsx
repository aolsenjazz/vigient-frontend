export type JobStatus =
  | 'pending'
  | 'running'
  | 'failed'
  | 'paused'
  | 'completed';

interface JobDetailsProps {
  priority: number;
  setPriority: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

const JobDetails: React.FC<JobDetailsProps> = ({ priority, setPriority }) => {
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
