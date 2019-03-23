import React from 'react';
import {connect} from 'react-redux';

import {bidList}from '../../actions';
import AddBidButton from './AddBidButton';
import Options from './Options';
import BidSearch from "./BidSearch";

//TODO change bk name
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
            <BidSearch/>
            <AddBidButton/>
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

    const filterBids = (array, query) => {
        console.log(query);
        console.log(typeof(query));
        const filteredArray = array.filter(bid => bid.Proj_Name && bid.Proj_Name.toLowerCase().includes(query.toLowerCase()));

        console.log(filteredArray);
        return filteredArray;

    };
    let bidsUnfiltered = Object.values(state.bids);

    console.log(bidsUnfiltered);
    //console.log(`this is the query term: ${state.bids.search.search}`);



    const mapHelper = () => {
        if (state.bids.search !== '') {
            //console.log(filterBids(bidsUnfiltered, state.bids.search));
            return (
                //console.log(bidsUnfiltered.filter(bid => bid.Proj_Name === state.search));
                filterBids(bidsUnfiltered, state.bids.search.search)
            );
        } else {
            return bidsUnfiltered;
        }
    };



  return {
      bids: mapHelper(),
      isSignedIn: state.auth.isSignedIn,
      user: state.auth.user,
      search: state.bids.search
  };
};
export default connect(mapStateToProps, {bidList})(Bids);