import React from 'react';
import { connect } from 'react-redux';

import plitApi from '../api/plitApi';
import { trySignIn, trySignOut} from "../actions";

//TODO currently we are logging in but we need to check if we are logged in with a another api call.

class Welcome extends React.Component {


//TODO refactor with try catch if it doesnt work
    /*
    checkLoggedIn= async () => {
        console.log('is the user logged in?');

        return await plitApi.get('/api/checkLoggedIn');
    };

    login = async (username, password) => {
        const cred = {
            username: username,
            password: password
        };
            const response = await plitApi.post('/api/login',cred);
            console.log(response);
            /*
        try {
            const response = await plitApi.post('/api/login', cred);
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    };
    */
getCred = () => {
    const credentials = {
        username: 'MAnager',
        password: 'admin'
    };
    return credentials;
};

    componentDidMount() {
        const cred = this.getCred();
        this.props.trySignIn(cred);
        //this.checkLoggedIn();
    }


    render() {
        return(
            <div>
                <h1>Welcome</h1>
            </div>
        );
    }
}

const mapStateToProps= state => {
  return {isSignedIn: state.isSignedIn, user: state.user };
};


export default connect(mapStateToProps, {trySignOut, trySignIn})(Welcome);