import React from 'react';
import {Link} from 'react-router-dom';
import {Image} from 'semantic-ui-react';

import LoginButton from "./LoginButton";
import TabForHeader from './header/Tabs';

const Header = () => {
    //if user clicks on bids or intranet update the state of the redux store
    return (
        <div className="ui secondary pointing menu">

            <Link to="/" className="item">
                    <Image src = 'https://perq.mbta.com/img/MBTA_logo_black.png' size = 'small'/>
            </Link>
            <div className = "item">
                <TabForHeader tabName="tools" />

                <TabForHeader tabName="intranet" />
            </div>

            <div className = "right floated item">
            <Link to="/login" className = "right menu">
                <LoginButton/>
            </Link>
            </div>

        </div>
    );
};

export default Header;
