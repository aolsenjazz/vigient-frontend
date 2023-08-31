import React, { useState, useEffect } from 'react';
import SourceService from '@service/source-service';
import Card from './Card'; // Assuming Card is exported from './Card'
import { Table } from './Table'; // Assuming Table is exported from './Table'
import { SourceDTO, SourceDTOImpl } from '@domain/dto/source-dto';
import CreateSourceForm from './forms/CreateSourceForm'; // Importing the standalone form

const Sources: React.FC = () => {
  const [handle, setHandle] = useState<string | null>(null);
  const [sources, setSources] = useState<SourceDTOImpl[]>([]);

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

  const handleCreateSource = async (handle: string) => {
    try {
      const newSource = await SourceService.createSource(handle);
      setSources([...sources, newSource]);
    } catch (error) {
      console.error('Error creating source:', error);
    }
  };

  const handleDeleteSource = async (source: SourceDTO) => {
    try {
      await SourceService.deleteSource(source.id);
      const updatedSources = sources.filter((s) => s.id !== source.id);
      setSources(updatedSources);
    } catch (error) {
      console.error('Error deleting source:', error);
    }
  };

  return (
    <div className="sources-container">
      <Card title="Create New Source">
        <CreateSourceForm onCreate={handleCreateSource} />
      </Card>

      <Card title="Existing Sources">
        <Table
          data={sources}
          onEmpty="No records to display"
          onDelete={handleDeleteSource}
          accessors={{
            createdAt: (source: SourceDTOImpl) => source.createdAtReadable(),
          }}
        />
      </Card>
    </div>
  );
};

export default Sources;
