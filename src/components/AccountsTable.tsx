import React, { useState } from 'react';
import OAuth1AuthorizeButton from './OAuth1AuthorizeButton';
import OAuth2AuthorizeButton from './OAuth2AuthorizeButton';

interface Accessor<T> {
  [key: string]: (dataRow: T) => any;
}

interface TableProps<T> {
  data: T[];
  onEmpty: string;
  accessors?: Accessor<T>;
  omit?: string[];
  onDelete?: (dataRow: T) => void;
  onClick?: (dataRow: T) => void;
}

export function AccountsTable<T extends Record<string, any>>({
  data,
  accessors,
  onDelete,
  onClick,
  onEmpty,
  omit = [],
}: TableProps<T>) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<T | null>(null);
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const colspan = headers.length + (onDelete ? 1 : 0);

  headers.sort((a, b) => {
    if (a === 'id') return -1;
    if (b === 'id') return 1;
    if (a === 'createdAt') return 1;
    if (b === 'createdAt') return -1;
    return 0;
  });

  return (
    <div className={`table-container`}>
      <table className={`subsection ${deleteConfirmation ? 'dimmed' : ''}`}>
        <thead>
          {data.length > 0 && (
            <tr>
              {headers
                .filter((h) => !omit.includes(h))
                .map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              <th>OAuth1</th>
              <th>OAuth2</th>
              {onDelete && <th>Delete</th>}
            </tr>
          )}
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={colspan} className="on-empty">
                {onEmpty}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onClick && onClick(row)}
                className={onClick ? 'clickable-row' : ''}
              >
                {headers
                  .filter((h) => !omit.includes(h))
                  .map((header, cellIndex) => (
                    <td key={cellIndex}>
                      {accessors && accessors[header]
                        ? accessors[header](row)
                        : row[header]}
                    </td>
                  ))}
                <td>
                  <OAuth1AuthorizeButton
                    isAuthorized={
                      ![undefined, null].includes(row.oauth1AccessToken)
                    }
                    handle={row.handle}
                  />
                </td>
                <td>
                  <OAuth2AuthorizeButton
                    isAuthorized={
                      ![undefined, null].includes(row.oauth2AccessToken)
                    }
                    handle={row.handle}
                  />
                </td>

                {onDelete && (
                  <td>
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmation(row);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {deleteConfirmation && (
        <div className="delete-confirmation-modal">
          <div className="delete-confirmation-content">
            <p>Are you sure you want to delete this row?</p>
            <button
              onClick={(e) => {
                onDelete && onDelete(deleteConfirmation);
                setDeleteConfirmation(null);
              }}
            >
              Confirm
            </button>
            <button onClick={() => setDeleteConfirmation(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
