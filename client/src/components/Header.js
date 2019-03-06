import React from 'react';
import {Link} from 'react-router-dom';
import LoginButton from "./LoginButton";

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                PLIT
            </Link>
            <Link to="/login" className = "right menu">
                <LoginButton/>
            </Link>

        </div>
    );
};

export default Header;
