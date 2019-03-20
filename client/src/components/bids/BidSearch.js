import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux';


class BidSearch extends Component {
    componentWillMount() {
        this.resetComponent()
    }

    componentDidUpdate() {
        console.log(this.state.results);
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, { result }) => this.setState({ value: result.Proj_Name });

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.Proj_Name);

            this.setState({
                isLoading: false,
                results: _.filter(this.props.bids, isMatch),
            })
        }, 300)
    };

    renderLogic = () => {
        const { isLoading, value, results } = this.state;
                if (results) {
                return (
                    <div>
                <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
                    results={results.map = result => result._id}
                    value={value}
                />
                    </div>
                );
            } else {
                    return null;
                }
    };

    render() {


        return (


            this.renderLogic()

        );
    }
}

const mapStateToProps = (state) => {
  return {
      bids: Object.values(state.bids)
  };
};
export default connect(mapStateToProps)(BidSearch);