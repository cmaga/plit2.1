import React from 'react';
import {HashRouter, Route, Link} from 'react-router-dom';

import Home from './Home';
import Welcome from './Welcome';
import MyHeader from './Header';
import PrivateRoute from './authentication/PrivateRoute';
import Bids from './bids/Bids';


//imports for the sideBar
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {connect} from 'react-redux';





class App extends React.Component {

    //sidebar helper methods
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
                    <Link to="/home" className="home icon">
                        Home
                    </Link>
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

    hideIfLoggingin = () => {

    };

    render() {
        return (
            <div>
                <HashRouter>
                    <div>



                        <MyHeader/>

                        <Route path="/login" exact component={Welcome}/>


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
                                    animation='push'
                                    icon='labeled'
                                    inverted
                                    onHide={this.handleSidebarHide}
                                    vertical
                                    visible={this.state.visible}
                                    width='wide'
                                >
                                    <div>
                                        {this.viewLogic()}
                                    </div>

                                </Sidebar>

                                <Sidebar.Pusher>

                                    <Header as='h3'>Application Content</Header>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                                    <PrivateRoute path="/home" component={Home} />
                                    <PrivateRoute path="/bids" component={Bids}/>

                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                        </div>




                    </div>
                </HashRouter>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {tabState: state.tab.tab};
};


export default connect(mapStateToProps)(App);