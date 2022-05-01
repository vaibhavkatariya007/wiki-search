import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import {Loading} from './core';

import {Articles, Detail} from './containers';

const Root = ({store}) => (
  <Provider store={store}>
    <Router basename='/wiki-search'>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Articles} />
          <Route exact path="/detail/:pageid/:title/" component={Detail} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  </Provider>
);

export default Root;
