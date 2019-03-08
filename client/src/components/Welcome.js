//this welcome paged acts as a log in page and welcomes new users.


import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { trySignIn, trySignOut, checkLoginStatus} from "../actions";


class Welcome extends React.Component {
state = { username: '', password: '' };


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