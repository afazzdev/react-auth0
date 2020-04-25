import React, { useState, useEffect } from 'react';

const Public = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/public')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('network response was not ok');
      })
      .then((res) => setMessage(res.message))
      .catch((err) => setMessage(err.message));
  }, []);

  return <p>{message}</p>;
};

export default Public;
