import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {bidList} from '../../actions';
import MainBid from './MainBid';
import Options from './Options';

class Bids extends React.Component {

    componentDidMount() {
        this.props.bidList();
    }

    formatDate = (string) => {
      const options = {year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(string).toLocaleDateString([], options);
    };



    renderList() {

        return (
        <div className="ui container">
            <MainBid/>


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
                            <td><Options bidId={bid._id} /></td>


                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
        );
    }



    render() {
       return (
           <div>
               {this.renderList()}
           </div>
       );
    }
}

//filtering happens here for the search bar.
const mapStateToProps = state => {

    const filterBids = (array, query) => {
        return array.filter(bid => bid.Proj_Name && bid.Proj_Name.toLowerCase().includes(query.toLowerCase()));
    };
    let bidsUnfiltered = Object.values(state.bids);

    const mapHelper = () => {
        //the state is initialized as a string but if you backspace on the search the form gets updated to be an empty object which is why that's checked for
        if ((state.search.search !== "") && (_.isEmpty(state.search.search) === false)) {
            return (
                filterBids(bidsUnfiltered, state.search.search.search)
            );
        } else {
            console.log('search logic failed');
            return bidsUnfiltered;
        }
    };

  return {
      bids: mapHelper(),
      isSignedIn: state.auth.isSignedIn,
      user: state.auth.user,
  };
};
export default connect(mapStateToProps, {bidList})(Bids);