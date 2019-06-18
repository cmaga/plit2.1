import React from 'react';

import AddBidButton from './AddContractButton';
import Search from '../bids/Search';

const MainBid = () => {

    return (
        <div className="ui placeholder segment">
            <div className="ui two column stackable center aligned grid">
                <div className="ui vertical divider">Or</div>
                <div className="middle aligned row">
                    <div className="column">
                        <div className="ui icon header">
                            <i className="search icon"></i>
                            Find
                        </div>
                        <div className="field">
                            <div className="ui search">
                                <div className="ui icon input">
                                    <Search />
                                </div>
                                <div className="results"></div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui icon header">
                            <i className="world icon"></i>
                            Create
                        </div>
                        <AddBidButton />
                    </div>
                </div>
            </div>
        </div>
        );
};

export default MainBid;