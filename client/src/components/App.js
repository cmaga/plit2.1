import React from 'react';
import {HashRouter, Route} from 'react-router-dom';

import Home from './Home';
import Welcome from './Welcome';
import Header from './Header';
import Bar from "./SideBar";
import PrivateRoute from './authentication/PrivateRoute';
import Bids from './bids/Bids';


const App = () => {
    return (
        <div>
            <HashRouter>
                <div>
                    <Header />
                    <PrivateRoute path="/" component={Bar} />
                    <Route path = "/login" exact component={Welcome} />
                    <PrivateRoute path="/bids" component={Bids} />

                </div>
            </HashRouter>
        </div>
    );
};

    export default App;