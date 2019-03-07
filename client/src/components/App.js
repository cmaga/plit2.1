import React from 'react';
import {HashRouter, Route} from 'react-router-dom';

import Home from './Home';
import Welcome from './Welcome';
import Header from './Header';
import Bar from "./SideBar";



const App = () => {
    return (
        <div>
            <HashRouter>
                <div>
                    <Header />
                    <Route path = "/" exact component={Bar} />
                    <Route path = "/login" exact component={Welcome} />
                </div>
            </HashRouter>
        </div>
    );
};

    export default App;