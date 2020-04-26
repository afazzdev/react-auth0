import React, { useState, useEffect } from 'react';

const Private = ({ auth }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/courses', {
      headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('network response was not ok');
      })
      .then((res) => setCourses(res.courses))
      .catch((err) => setCourses(err.message));

    fetch('/admin', {
      headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('network response was not ok');
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [auth]);

  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  );
};

export default Private;
