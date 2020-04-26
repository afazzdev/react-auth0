import React, { useState, useEffect } from 'react';

const Private = ({ auth }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/private', {
      headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('network response was not ok');
      })
      .then((res) => setMessage(res.message))
      .catch((err) => setMessage(err.message));
  }, [auth]);

  return <p>{message}</p>;
};

export default Private;
