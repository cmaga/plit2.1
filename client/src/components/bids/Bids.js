import React from 'react';
import {connect} from 'react-redux';

import {bidList}from '../../actions';
import Options from './Options';


class Bids extends React.Component {

    componentDidMount() {
        //render the list
        this.props.bidList();
    }

    formatDate = (string) => {
      const options = {year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(string).toLocaleDateString([], options);
    };

    renderAdmin(bid) {

    }


    renderList() {

        return (
        <div className="ui container">
            <table className="ui single line table">
                <thead>
                <tr>
                    <th> ID</th>
                    <th> Title</th>
                    <th> Requested Date</th>
                </tr>
                </thead>
                <tbody>{this.props.bids.map((bid) => {
                    return (
                        <tr key={bid._id}>
                            <td>{bid.Bid_ID}</td>
                            <td>{bid.Proj_Name}</td>
                            <td>{this.formatDate(bid.Requested_Dttm)}</td>
                            <td><Options/></td>


                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
        );
    }

    renderCreate() {
    }



    render() {
       return (
           <div>
               {this.renderList()}
           </div>
       );
    }
}

const mapStateToProps = state => {
  return {
      bids: Object.values(state.bids),
      isSignedIn: state.auth.isSignedIn,
      user: state.auth.user
  };
};
export default connect(mapStateToProps, {bidList})(Bids);