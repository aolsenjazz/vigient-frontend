import React from 'react';

type Props = {
  isAuthorized: boolean;
  handle: string;
};

const backend =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3000'
    : 'https://api.vigient.com';

export default function OAuth1AuthorizeButton({
  handle,
  isAuthorized = false,
}: Props) {
  return (
    <>
      {isAuthorized === true ? (
        <a href={`${backend}/twitter/oauth1/request`}>Authorized</a>
      ) : (
        <button
          className="light-blue"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <a href={`${backend}/twitter/oauth1/request`} className="white">
            Authorize
          </a>
        </button>
      )}
    </>
  );
}
