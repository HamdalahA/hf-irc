import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signin from './components/signin/SigninPage';
import CompayPage from './components/company/companyPage';
import SingleCompany from './components/company/getSingleCompayPage';

const App = () => (
  <BrowserRouter>
    <div id="wrap" style={{ height: '100%' }}>
      <Switch>
        <Route
          path="/"
          exact
          component={Signin}
        />
        <Route
          path="/company/:companyId"
          exact
          component={SingleCompany}
        />
        <Route
          path="/companies"
          exact
          component={CompayPage}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
