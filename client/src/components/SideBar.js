
import React, { Component } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
import {connect} from 'react-redux';

import Home from './Home';
import Bids from './bids/Bids';

class Bar extends Component {
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
        const { visible } = this.state;

        return (
            <div style={{minHeight: '100vh'}}>
                <Button.Group>
                    <Button disabled={visible} onClick={this.handleShowClick}>
                        Show sidebar
                    </Button>
                    <Button disabled={!visible} onClick={this.handleHideClick}>
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
                        visible={visible}
                        width='wide'
                    >
                        <div>
                            {this.viewLogic()}
                        </div>

                    </Sidebar>

                    <Sidebar.Pusher>


                            <Bids />


                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {tabState: state.tab.tab};
};


export default connect(mapStateToProps)(Bar);

