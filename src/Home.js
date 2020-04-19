import React from 'react';
import {Link} from 'react-router-dom';

function Home({ auth }) {
  return (
    <div>
      <h1>this is Home</h1>
      {
      	auth.isAuthenticated() ? 
      <Link to='/profile'>see profile</Link> :
      <button onClick={auth.login}>Login</button>
      }
    </div>
  );
}

export default Home;
