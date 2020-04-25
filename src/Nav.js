import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ auth }) {
  const { isAuthenticated, login, logout, userHasScopes } = auth;
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/profile'>Profile</Link>
      <Link to='/public'>Public</Link>
      {isAuthenticated() && <Link to='/private'>Private</Link>}
      {isAuthenticated() && userHasScopes(['read:courses']) && (
        <Link to='/courses'>Courses</Link>
      )}
      <button onClick={isAuthenticated() ? logout : login}>
        {isAuthenticated() ? 'logout' : 'login'}
      </button>
    </div>
  );
}

export default Nav;
