import React from 'react';
import { connect } from 'react-redux';

import {tab} from '../../actions/index';
//import { Tab } from 'semantic-ui-react';

/*
const panes = [
    {menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}> Tab 1 content</Tab.Pane> },
    {menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}> Tab 2 content</Tab.Pane>},
    {menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}> Tab 3 content</Tab.Pane>}
];
*/

class TabForHeader extends React.Component {
//tab name passed down as props


    selectTab = () => {
        //if the the tab stored is equal to the tabName then add active to the string in className
        if (this.props.tabState === this.props.tabName) {
            return 'active item';
        } else {
            return 'item';
        }
    };

    renderTab = () => {
      return(
        <div className={this.selectTab()}>{this.props.tabName}</div>
      );
    };

    handleClick = () => {
      //call action creator to update the redux store to the name of what was clicked on
        this.props.tab(this.props.tabName);
    };

    render() {
        return (
            <div onClick={this.handleClick}>
                {this.renderTab()}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {tabState: state.tab.tab};
};

export default connect(mapStateToProps, {tab})(TabForHeader);

