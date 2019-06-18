import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {bidList} from '../../actions';
import MainBid from './MainContract';
import Options from './Options';

class ContractsList extends React.Component {

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