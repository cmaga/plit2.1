import React from 'react';
import {connect} from 'react-redux';
import {Dropdown, Button} from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';

import {bidDelete} from '../../actions/index'

class Options extends React.Component {
    state = {value: ''};
  componentDidMount() {
    //check if user is admin
  }

  componentDidUpdate() {
      //when the state updates redirect based on that state to the correct page
      if (this.state.value === 'edit') {
          return <Redirect to='/' />
          console.log(this.state.value);
      }
  }

    checkAdmin = () => {
    if (this.props.role==="Admin") {

    }
  };

  handleChange = (e, {value}) => this.setState({value});

  options = () => {
      return(
      [
      { key: 'edit', icon: 'edit', text: 'Edit Bid', value: 'edit' },
      { key: 'delete', icon: 'delete', text: 'Remove Bid', value: 'delete' },
          ]
  );
    };

  dropdownLogic = (id) => {
      if (this.state.value === 'edit') {
            const path = `/bid/edit/${id}`;
          return <Redirect to={path} />
      }

      if (this.state.value === 'delete') {
            this.props.bidDelete(this.props.bidId);
      }
  };

  render() {
    return (
        <div>
            <Button.Group color='teal'>
            <Dropdown options={this.options()} floating button className='icon' value={this.state.value} onChange={this.handleChange} />
                {this.dropdownLogic(this.props.bidId)}
            </Button.Group>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {role: state.auth.user.role};
};
export default connect(mapStateToProps, {bidDelete})(Options);