import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import RouteList from './helper';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const SwitchRoutes = () => {
  return (
    <Router history={history}>
      <Switch>
        {RouteList.map((item, key) => {
          return <Route path={item.path} component={item.component} key={key} />;
        })}
        <Redirect from="/" to="/author" />
      </Switch>
    </Router>
  );
};

export default SwitchRoutes;
