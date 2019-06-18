import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {getContracts} from '../../actions';
import MainBid from './MainContract';
import Options from './Options';

class Contracts extends React.Component {

    componentDidMount() {
        this.props.getContracts();
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
                    <tbody>{this.props.contracts.map((contract) => {
                        return (
                            <tr key={contract._id}>
                                <td>{contract.Description}</td>
                                <td>{contract.Contract_Num}</td>
                                <td><Options bidId={contract._id} /></td>


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

    const filterContracts = (array, query) => {
        return array.filter(contract => contract.Description && contract.Description.toLowerCase().includes(query.toLowerCase()));
    };
    let contractsUnfiltered = Object.values(state.contracts);

    const mapHelper = () => {
        //the state is initialized as a string but if you backspace on the search the form gets updated to be an empty object which is why that's checked for
        if ((state.search.search !== "") && (_.isEmpty(state.search.search) === false)) {
            return (
                filterContracts(contractsUnfiltered, state.search.search.search)
            );
        } else {
            console.log('search logic failed');
            return contractsUnfiltered;
        }
    };

    return {
        contracts: mapHelper(),
        isSignedIn: state.auth.isSignedIn,
        user: state.auth.user,
    };
};
export default connect(mapStateToProps, {getContracts})(Contracts);