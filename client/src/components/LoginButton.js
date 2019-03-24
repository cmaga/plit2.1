import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import {checkLoginStatus, trySignOut} from "../actions";



class LoginButton extends React.Component {
    componentDidMount() {
        this.props.checkLoginStatus(); //automatically updates state based on if we are logged in on server side
    }


    handleLogin = () => {
        //route to login page
        return <Redirect to="/login" />;
    };
    handleLogout = () => {
        //actually log the user on the server.
        this.props.trySignOut();
    };

    renderLogic=()=> {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <div>
                    <button
                        className="negative ui button"
                        onClick={this.handleLogout}
                    >
                        Logout
                    </button>
                </div>
            );
        } else {
            return (
                <button
                    className="positive ui button"
                    onClick={this.handleLogin}
                >
                    Login
                </button>
            );
        }
    };


    render() {
        return <div>{this.renderLogic()}</div>;

    }
}
 const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
};
export default connect(mapStateToProps,{checkLoginStatus, trySignOut})(LoginButton);