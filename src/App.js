import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Callback from './callback';
import Profile from './Profile';
import Nav from './Nav';
import { Auth } from './Auth/Auth';
import Public from './Public';
import Private from './Private';
import Courses from './Courses';

function App({ history }) {
  const auth = new Auth(history);

  return (
    <div className='App'>
      <Nav auth={auth} />
      <Route
        exact
        path='/'
        render={(props) => <Home auth={auth} {...props} />}
      />
      <Route
        path='/callback'
        render={(props) => <Callback auth={auth} {...props} />}
      />
      <Route
        path='/profile'
        render={(props) =>
          auth.isAuthenticated() ? (
            <Profile auth={auth} {...props} />
          ) : (
            <Redirect to='/' />
          )
        }
      />
      <Route path='/public' component={Public} />
      <Route
        path='/private'
        render={(props) =>
          auth.isAuthenticated() ? (
            <Private auth={auth} {...props} />
          ) : (
            auth.login()
          )
        }
      />
      <Route
        path='/courses'
        render={(props) =>
          auth.isAuthenticated() && auth.userHasScopes(['read:courses']) ? (
            <Courses auth={auth} {...props} />
          ) : (
            auth.login()
          )
        }
      />
    </div>
  );
}

export default App;
