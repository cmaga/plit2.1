import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Welcome from './Welcome';
import Home from './Home';
import PrivateRoute from './authentication/PrivateRoute';
import Header from './Header';
import Bids from './bids/Bids';

const App = () => {

    return(
      <div>
          <HashRouter>
              <div>
                  <Header/>
                  <Switch>
                    <PrivateRoute path="/" exact component = {Home} />
                    <Route path="/login" exact component={Welcome} />

                    <PrivateRoute path="/bids" exact component = {Bids}/>
                  </Switch>
              </div>

          </HashRouter>
      </div>
    );

};

export default App;