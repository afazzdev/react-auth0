import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Callback from './callback';
import Profile from './Profile';
import Nav from './Nav';
import { Auth } from './Auth/Auth';
import Public from './Public';
import Private from './Private';
import Courses from './Courses';
import SecureRoute from './SecureRoute';
import AuthContext from './AuthContext';

function App({ history }) {
  const [state, setState] = useState({
    auth: new Auth(history),
    tokenRenewalComplete: false,
  });
  const { auth, tokenRenewalComplete } = state;

  useEffect(() => {
    auth.renewToken(() =>
      setState((state) => ({ ...state, tokenRenewalComplete: true }))
    );
  });

  if (!tokenRenewalComplete) return 'loading';

  return (
    <AuthContext.Provider value={auth}>
      <Nav auth={auth} />
      <div>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => <Home auth={auth} {...props} />}
          />
          <Route
            path='/callback'
            render={(props) => <Callback auth={auth} {...props} />}
          />
          <SecureRoute path='/profile' component={Profile} />
          <Route path='/public' component={Public} />
          <SecureRoute path='/private' component={Private} />
          <SecureRoute
            path='/courses'
            component={Courses}
            scopes={['read:courses']}
          />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
