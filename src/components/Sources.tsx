import React, { useState, useEffect } from 'react';
import SourceService from '@service/source-service';
import Card from './Card'; // Assuming Card is exported from './Card'
import { Table } from './Table'; // Assuming Table is exported from './Table'
import { SourceDTO, SourceDTOImpl } from '@domain/dto/source-dto';
import CreateSourceForm from './forms/CreateSourceForm'; // Importing the standalone form

const Sources: React.FC = () => {
  const [sources, setSources] = useState<SourceDTOImpl[]>([]);

  useEffect(() => {
    SourceService.getAllSources(1000, 0)
      .then((sources) => setSources(sources))
      .catch((e) => {});
  }, []);

  const onCreate = (handle: string) => {
    SourceService.createSource(handle)
      .then(() => SourceService.getAllSources(1000, 0))
      .then((accounts) => setSources(accounts))
      .catch((e) => {});
  };

  const onDelete = (source: SourceDTOImpl) => {
    SourceService.deleteSource(source.id)
      .then(() => SourceService.getAllSources(1000, 0))
      .then((sources) => setSources(sources))
      .catch((e) => {});
  };

  return (
    <div className="sources-container">
      <Card title="Create New Source">
        <CreateSourceForm onCreate={onCreate} />
      </Card>

      <Card title="Existing Sources">
        <Table
          data={sources}
          onEmpty="No records to display"
          onDelete={onDelete}
          accessors={{
            createdAt: (source: SourceDTOImpl) => source.createdAtReadable(),
          }}
        />
      </Card>
    </div>
  );
};

export default Sources;
