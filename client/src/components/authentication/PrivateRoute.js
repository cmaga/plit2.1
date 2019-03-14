/* This component is responsible for recirecting users to the log in page if they are not signed in
it also contains the logic for the sidebar since in semantic-ui-react the content has to be placed within
special syntax. Creating a component would force you to pass components as content into the sidebar component.
That is also the way in which private routing is done therefore they were combined.
*/

import React, {useEffect} from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';

import {checkLoginStatus} from "../../actions";


class PrivateRoute extends React.Component {


componentDidMount() {
    this.props.checkLoginStatus();
}

//methods and state for the sidebar
    state = { visible: true }; 

    handleHideClick = () => this.setState({ visible: false });
    handleShowClick = () => this.setState({ visible: true });
    handleSidebarHide = () => this.setState({ visible: true });





    viewLogic = () => {
        if (this.props.tabState === 'tools') {
            console.log('TOOLS');
            return this.toolsView();
        } else if (this.props.tabState === 'intranet') {
            console.log('intra');
            return this.intranetView();
        } else {
            return null;
        }
    };

    toolsView = () => {
        return(
            <div>
                <Menu.Item as='a'>
                    <Icon name='home' />
                    Home
                </Menu.Item>
                <Menu.Item as='a'>
                    <Icon name='gamepad' />
                    Bids
                </Menu.Item>
                <Menu.Item as='a'>
                    <Icon name='camera' />
                    Channels
                </Menu.Item>
            </div>

        );
    };

    intranetView = () => {
        return(
            <div>
                <Menu.Item as='a'>
                    <Icon name='home' />
                    Nothing here yet stay tuned
                </Menu.Item>

            </div>
        );
    };


    render() {

        //...rest seperates the component prop from the other props by calling the other props rest instead
        const {component: Component, ...rest} = this.props;

        const renderRoute = props => {
            if(rest.isSignedIn || rest.isSignedIn === null) {
                return (

                    <div style={{minHeight: '100vh'}}>
                        <Button.Group>
                            <Button disabled={this.state.visible} onClick={this.handleShowClick}>
                                Show sidebar
                            </Button>
                            <Button disabled={!this.state.visible} onClick={this.handleHideClick}>
                                Hide sidebar
                            </Button>
                        </Button.Group>

                        <Sidebar.Pushable>
                            <Sidebar
                                as={Menu}
                                animation='overlay'
                                icon='labeled'
                                inverted
                                onHide={this.handleSidebarHide}
                                vertical
                                visible={this.state.visible}
                                width='thin'
                            >
                                <div>
                                    {this.viewLogic()}
                                </div>

                            </Sidebar>

                            <Sidebar.Pusher>


                                <Component {...props}/>

                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                    </div>
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
    return {isSignedIn: state.auth.isSignedIn, tabState: state.tab.tab}
};

export default connect(mapStateToProps, {checkLoginStatus})(PrivateRoute);