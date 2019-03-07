//this welcome paged acts as a log in page and welcomes new users.


import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import plitApi from '../api/plitApi';
import { trySignIn, trySignOut, checkLoginStatus} from "../actions";

//TODO currently we are logging in but we need to check if we are logged in with a another api call.

class Welcome extends React.Component {
state = { username: '', password: '' };

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


getCred = () => {
    const credentials = {
        username: 'MAnager',
        password: 'admin'
    };
    return credentials;
};
*/
    componentDidMount() {
        this.props.checkLoginStatus();
        this.checkLoggedIn();
    }

    checkLoggedIn=()=>{
      if (this.props.isSignedIn === null) {
          return <div>Please sign in</div>;
      } else if (this.props.isSignedIn) {
          return <Redirect to='/' />;

      } else {
          return null;
      }
    };

    loginForm() {
        return(
            <div>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="six wide required field">
                        <label>Username</label>
                        <input
                            value={this.state.username}
                            type="text"
                            onChange={e => this.setState({ username: e.target.value })}
                            />
                    </div>

                    <div className="six wide required field">
                        <label>Password</label>
                        <input
                            value = {this.state.password}
                            type ="password"
                            onChange = {e => this.setState({password: e.target.value })}
                            />
                    </div>

                    <button type="submit" className="ui button primary">Submit</button>
                </form>
            </div>
        );
    }

    handleSubmit = (event) => {
      //set what is in the input field as the credentials that is passed to the action that makes the api request
       event.preventDefault();
       this.props.trySignIn(this.state);
    };


    render() {

        return(
            <div className = "ui container">
                <h1>Welcome</h1>
                <h2>signed in:</h2>
                <h3>{this.checkLoggedIn()}</h3>
                <div>{this.loginForm()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {isSignedIn: state.auth.isSignedIn, user: state.auth.user };
};


export default connect(mapStateToProps, {trySignOut, trySignIn, checkLoginStatus})(Welcome);