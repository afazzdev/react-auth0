import React from 'react';
import {Route} from 'react-router-dom'
import Home from './Home'
import Profile from './Profile'
import Nav from './Nav'

function App() {
  console.log(process.env.REACT_APP_AUTH0_DOMAIN)
  return (
    <div className="App">
      <Nav />
      <Route exact path='/' component={Home} />
      <Route path='/profile' component={Profile} />
    </div>
  );
}

export default App;
