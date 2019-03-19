import React from 'react';
import {connect} from 'react-redux';
import {Form, Field} from 'react-final-form';

import BidForm from './BidForm';
import {editBid, bidList} from '../../actions/index';

class BidEdit extends React.Component {

    //TODO get the component to work on its own, try fetching a single bid or the entire bid list
    //we tried bid list in cdm already
    componentDidMount() {
        this.props.bidList();
    }
    formatDate = (string) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        console.log(string);
        return new Date(string).toLocaleDateString([], options);
    };
    normalizeString = (string) => {
        //formate of date must be "11/23/2019 5:32 PM"
        const d = new Date(string);
        console.log(d);
        const ned = d.toJSON();
        console.log(ned);
        const stringDate = `${ned}`;
        console.log(stringDate);
        return stringDate;
    };

    onSubmit = formValues => {
        formValues.Requested_Dttm = this.normalizeString(formValues.Requested_Dttm);
        this.props.editBid(formValues);
    };

  render() {
      if (this.props.bids.length !== 0) {
          console.log(this.props.bids.length);
          return (
              <div className="ui container">
                  <h3> Edit a bid</h3>
                  <BidForm
                      initialValues={
                          {
                              Buyer: this.props.bid.Buyer,
                              Proj_Name: this.props.bid.Proj_Name,
                              Req_ID: this.props.bid.Req_ID,
                              Fund_Code: this.props.bid.Fund_Code,
                              Bid_Type: this.props.bid.Bid_Type,
                              Requested_Dttm: this.formatDate(this.props.bid.Requested_Dttm),

                          }}

                      onSubmit={this.onSubmit}
                  />
              </div>
          );
      }
          return <div>Loading</div>;

  }
}

const mapStateToProps = (state, ownProps) => {
  return { bids: Object.values(state.bids), bid: state.bids[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {editBid, bidList})(BidEdit);