import React from 'react';

type Props = {
  isAuthorized: boolean;
  handle: string;
};

export default function AuthorizeButton({
  handle,
  isAuthorized = false,
}: Props) {
  console.log(handle);
  return (
    <>
      {isAuthorized === true ? (
        <p>Authorized</p>
      ) : (
        <button
          className="blue"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <a
            href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=bXViYWxXaDVGY1hiV0lUWnFvVDM6MTpjaQ&redirect_uri=https://api.vigient.com/twitter/oauth2&scope=tweet.read%20tweet.write%20users.read%20offline.access%20follows.read%20follows.write%20tweet.moderate.write&20space.read&20mute.read&20mute.write&20like.read&20like.write&20list.read&20list.write&20block.read&20block.write&20bookmark.read&20bookmark.write&state=${handle}&code_challenge=challenge&code_challenge_method=plain`}
            target={'_blank'}
            className="white"
          >
            Authorize
          </a>
        </button>
      )}
    </>
  );
}
