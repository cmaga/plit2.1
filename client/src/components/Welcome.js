import React from 'react';
import { connect } from 'react-redux';
import { trySignIn, trySignOut, changeAuth } from "../actions";


class Welcome extends React.Component {
    render() {
        return(
            <div>
                <h1>Welcome</h1>
            </div>
        );
    }
}
export default connect(null, {trySignOut, trySignIn, changeAuth})(Welcome);