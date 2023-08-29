import React, { useState, useEffect } from 'react';
import SourceService from '@service/source-service';

interface Source {
  id: number;
  handle: string | null;
  createdAt: string;
}

type DeleteConfirmationState = {
  sourceId: number | null;
  show: boolean;
};

const Sources: React.FC = () => {
  const [handle, setHandle] = useState<string | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<DeleteConfirmationState>({
      sourceId: null,
      show: false,
    });

  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = async () => {
    try {
      const fetchedSources = await SourceService.getAllSources(1000, 0);
      setSources(fetchedSources);
    } catch (error) {
      console.error('Error loading sources:', error);
    }
  };

  const handleCreateSource = async () => {
    try {
      const newSource = await SourceService.createSource(handle);
      setSources([...sources, newSource]);
      setHandle(null);
    } catch (error) {
      console.error('Error creating source:', error);
    }
  };

  const handleDeleteSource = async (sourceId: number | null) => {
    try {
      await SourceService.deleteSource(sourceId as number);
      const updatedSources = sources.filter((source) => source.id !== sourceId);
      setSources(updatedSources);
      setDeleteConfirmation({ sourceId: null, show: false });
    } catch (error) {
      console.error('Error deleting source:', error);
    }
  };

  return (
    <div className="sources-container">
      {/* Create Source Form */}
      <div className="create-source-form">
        <input
          type="text"
          placeholder="ID: Auto-generated"
          readOnly // Make it noninteractive
        />
        <input
          type="text"
          placeholder="Enter handle"
          value={handle || ''}
          id="handle"
          onChange={(e) => setHandle(e.target.value)}
        />
        <input
          type="text"
          placeholder={`Created At: ${new Date().toLocaleString()}`} // Display current date and time
          readOnly // Make it noninteractive
        />
        <button onClick={handleCreateSource}>Create</button>
      </div>

      {/* Source List */}
      <div className="source-list">
        {sources.length === 0 ? (
          <div className="source-row empty-row">No records to display</div>
        ) : (
          sources.map((source) => (
            <div key={source.id} className="source-row">
              <div className="source-info">
                <p>ID: {source.id}</p>
                <p>
                  Handle:
                  <a
                    href={`https://x.com/${source.handle}`}
                    target="_blank"
                  >{` ${source.handle}`}</a>
                </p>
                <p>
                  Created At: {new Date(source.createdAt).toLocaleDateString()}{' '}
                  {new Date(source.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <button
                className="delete-button"
                onClick={() =>
                  setDeleteConfirmation({ sourceId: source.id, show: true })
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {deleteConfirmation.show && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this source?</p>
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
    </div>
  );
};

export default Sources;
