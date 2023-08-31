import React, { useState } from 'react';

interface CreateSourceFormProps {
  onCreate: (handle: string) => void; // Function to call when 'Create' is clicked
}

const CreateSourceForm: React.FC<CreateSourceFormProps> = ({ onCreate }) => {
  const [handle, setHandle] = useState<string>('');

  const handleSubmit = () => {
    onCreate(handle);
    setHandle(''); // reset the handle field
  };

  return (
    <form className="form">
      <div className="fields">
        <div className="input-div">
          <label>ID:</label>
          <input type="text" placeholder="ID: Auto-generated" readOnly />
        </div>
        <div className="input-div">
          <label>Handle:</label>
          <input
            type="text"
            placeholder="Enter handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label>Created At:</label>
          <input
            type="text"
            placeholder={new Date().toLocaleString()}
            readOnly
          />
        </div>
      </div>
      <button type="button" className="submit" onClick={handleSubmit}>
        Create
      </button>
    </form>
  );
};

export default CreateSourceForm;
