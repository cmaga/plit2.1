import React from 'react';
import {Link} from 'react-router-dom';
import LoginButton from "./LoginButton";
import TabForHeader from './header/Tabs';

const MyHeader = () => {
    //if user clicks on bids or intranet update the state of the redux store
    return (
        <div className="ui secondary pointing menu container">
            <Link to="/home" className="item">
                PLIT
            </Link>

            <TabForHeader tabName="tools" />

            <TabForHeader tabName="intranet" />

            <Link to="/login" className = "right menu">
                <LoginButton/>
            </Link>

        </div>
    );
};

export default MyHeader;
