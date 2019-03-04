import React from 'react';
import {HashRouter, Route} from 'react-router-dom';

import Welcome from './Welcome';
import Header from './Header'; //TODO



const App = () => {
    return (
        <div className="ui container">
            <HashRouter>
                <div>
                    <Header />
                    <Route path = "/" exact component={Welcome} />
                </div>
            </HashRouter>
        </div>
    );
};

    export default App;