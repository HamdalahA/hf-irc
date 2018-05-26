import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signin from './components/signin/SigninPage';

const App = () => (
  <BrowserRouter>
    <div id="wrap" style={{ height: '100%' }}>
      <Switch>
        <Route
          path="/"
          exact
          component={Signin}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;