import React from 'react';
import {connect} from 'react-redux';

import {bidCreate} from '../../actions/index'
import BidForm from './BidForm';

class BidCreate extends React.Component {



    normalizeString = (string) => {
        //format of date must be "11/23/2019 5:32 PM"
        const d = new Date(string);
        const ned = d.toJSON();
        const stringDate = `${ned}`;
        return stringDate;
    };

    onSubmit = (formValues) => {
        //call the action creator to create bid
        formValues.Requested_Dttm = this.normalizeString(formValues.Requested_Dttm);
        this.props.bidCreate(formValues);
        this.setState({fireRedirect: true});
    };

    render() {
        return(
            <div className="ui container">
            <h3>Create a Bid</h3>
                <BidForm
                    onSubmit={this.onSubmit}
                />
            </div>


        );
    }
}

export default connect(null, {bidCreate})(BidCreate);