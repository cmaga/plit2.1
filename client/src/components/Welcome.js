import React from 'react';
import { connect } from 'react-redux';
import plitApi from '../api/plitApi';

import { trySignIn, trySignOut} from "../actions";

//TODO currently we are logging in but we need to check if we are logged in with a another api call.

class Welcome extends React.Component {
    state = { user: {}};


    gc = async (username, password) => {
        const cred = {
            username: username,
            password: password
        };

        return await plitApi.post('/api/login', cred);
    };

    componentDidMount() {
        console.log(this.gc('MAnager', 'admin'));
    }


    render() {
        return(
            <div>
                <h1>Welcome</h1>
            </div>
        );
    }
}
/*
const mapStateToProps= state => {
  return {isSignedIn: state.auth.isSignedIn, user: state.auth.user };
};
*/
export default Welcome; //connect(null, {trySignOut, trySignIn})(Welcome);