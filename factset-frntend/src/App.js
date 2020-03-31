import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import history from './history';
import Converter from './converter/Converter';
import Setting from './setting/Setting';
import Insight from './insight/Insight';
import CurrencyConverter from './currency-converter/CurrencyConverter'
import { UserProvider } from './UserContext'

const user = { name: 'John Doe', loggedIn: true }

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <UserProvider value={user}>
          <Route exact path="/" component={Converter} />
          <Route exact path="/setting" component={Setting} />
          <Route exact path="/insight" component={Insight} />
          <Route exact path="/currency-converter" component={CurrencyConverter} />
        </UserProvider>
      </Switch>
    </Router>
  );
}
