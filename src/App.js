import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Callback from './callback';
import Profile from './Profile';
import Nav from './Nav';
import { Auth } from './Auth/Auth';

function App({ history }) {
  const auth = new Auth(history);

  return (
    <div className='App'>
      <Nav />
      <Route
        exact
        path='/'
        render={(props) => <Home auth={auth} {...props} />}
      />
      <Route
        path='/callback'
        render={(props) => <Callback auth={auth} {...props} />}
      />
      <Route path='/profile' component={Profile} />
    </div>
  );
}

export default App;
