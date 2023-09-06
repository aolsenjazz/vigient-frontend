import React from 'react';

type Props = {
  isAuthorized: boolean;
  handle: string;
};

const redirectUri =
  process.env.NODE_ENV === 'development'
    ? `http://127.0.0.1:3000/twitter/oauth2`
    : 'https://api.vigient.com/twitter/oauth2';

export default function OAuth2AuthorizeButton({
  handle,
  isAuthorized = false,
}: Props) {
  return (
    <>
      {isAuthorized === true ? (
        <a
          href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=bXViYWxXaDVGY1hiV0lUWnFvVDM6MTpjaQ&redirect_uri=${redirectUri}&scope=tweet.read%20tweet.write%20users.read%20offline.access%20follows.read%20follows.write%20tweet.moderate.write&20space.read&20mute.read&20mute.write&20like.read&20like.write&20list.read&20list.write&20block.read&20block.write&20bookmark.read&20bookmark.write&state=${handle}&code_challenge=challenge&code_challenge_method=plain`}
        >
          Authorized
        </a>
      ) : (
        <button
          className="blue"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <a
            href={`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=bXViYWxXaDVGY1hiV0lUWnFvVDM6MTpjaQ&redirect_uri=${redirectUri}&scope=tweet.read%20tweet.write%20users.read%20offline.access%20follows.read%20follows.write%20tweet.moderate.write&20space.read&20mute.read&20mute.write&20like.read&20like.write&20list.read&20list.write&20block.read&20block.write&20bookmark.read&20bookmark.write&state=${handle}&code_challenge=challenge&code_challenge_method=plain`}
            className="white"
          >
            Authorize
          </a>
        </button>
      )}
    </>
  );
}
