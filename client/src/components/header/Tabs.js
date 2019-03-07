import React from 'react';
//import { Tab } from 'semantic-ui-react';

/*
const panes = [
    {menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}> Tab 1 content</Tab.Pane> },
    {menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}> Tab 2 content</Tab.Pane>},
    {menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}> Tab 3 content</Tab.Pane>}
];
*/

class TabForHeader extends React.Component {

    renderTab = () => {
      return(
        <div className="active item">{this.props.tabName}</div>
      );
    };

    handleClick = () => {
      //call action creator to update the redux store to the name of what was clicked on
    };

    render() {
        return (
            <div onClick=>
                {this.renderTab()}
            </div>
        );
    }
}

export default TabForHeader;

