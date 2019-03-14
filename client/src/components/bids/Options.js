import React from 'react';
import {connect} from 'react-redux';
import {Dropdown, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Options extends React.Component {
    state = {value: ''};
  componentDidMount() {
    //check if user is admin
  }

  checkAdmin = () => {
    if (this.props.role==="Admin") {

    }
  };

  handleChange = (e, {value}) => this.setState({value});

  options = () => {
      return(
      [
      { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
      { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
          ]
  );
    };

  dropdownLogic = () => {
    if (this.state.value==='edit') {
        console.log('we know we are should be editing');
    } else if (this.state.value === 'delete') {
        console.log('we should be deleting')
    }
  };

  render() {
    return (
        <div>
            <Button.Group color='teal'>
            <Dropdown options={this.options()} floating button className='icon' value={this.state.value} onChange={this.handleChange} />
            </Button.Group>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {role: state.auth.user.role};
};
export default connect(mapStateToProps)(Options);