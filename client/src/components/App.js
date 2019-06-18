import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Welcome from './Welcome';
import Home from './Home';
import PrivateRoute from './authentication/PrivateRoute';
import Header from './Header';
import Bids from './bids/Bids';
import BidEdit from './bids/BidEdit';
import BidCreate from './bids/BidCreate';
import Report from './earlyWarning/Report';
import Contracts from './contracts/Contracts'

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
                      <PrivateRoute path="/bid/edit/:id" exact component = {BidEdit}/>
                      <PrivateRoute path="/bid/add" exact component = {BidCreate}/>

                      <PrivateRoute path="/contracts" exact component = {Contracts} />

                      <Route path="/earlywarning" exact component={Report}/>
                  </Switch>
              </div>

          </HashRouter>
      </div>
    );

};

export default App;