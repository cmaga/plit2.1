// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, {useEffect} from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import {checkLoginStatus} from "../../actions";

class PrivateRoute extends React.Component {


componentDidMount() {
    this.props.checkLoginStatus();
}


    render() {

        //...rest seperates the component prop from the other props by calling the other props rest instead
        const {component: Component, ...rest} = this.props;

        const renderRoute = props => {
            if(rest.isSignedIn || rest.isSignedIn === null) {
                return (
                    <Component {...props}/>
                );
            }

            const to = {
                pathname: '/login',
                state: {from: props.location} //given by react-router (also gives param)
            };
            return (
                <Redirect to = {to} />
            );

        };

        return (
            <Route {...rest} render={renderRoute}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
};

export default connect(mapStateToProps, {checkLoginStatus})(PrivateRoute);