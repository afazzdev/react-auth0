import React, { useState, useEffect } from 'react';

function Profile({ auth }) {
  const [state, setState] = useState({
    profile: '',
    error: '',
  });

  useEffect(() => {
    auth.getProfile((profile, error) =>
      setState((prev) => ({ ...prev, profile, error }))
    );
  }, [auth]);

  const { profile } = state;
  if (!profile) return null;
  return (
    <>
      <div>Profile</div>
      <p>{profile.nickname}</p>
      <img
        style={{ maxWidth: 50, maxHeight: 50 }}
        src={profile.picture}
        alt='Profile pic'
      />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  );
}

export default Profile;
