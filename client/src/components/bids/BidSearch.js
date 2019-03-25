import React from 'react';

import {Form, Field} from 'react-final-form';
import {connect} from 'react-redux';
import { searchBids } from '../../actions/index';

class BidSearch extends React.Component {

    renderInput = ({input}) => {
      return (
          <div className="ui right aligned search">
              <div className="ui icon input">
              <input {...input} type="text" placeholder="Search Bids..." className = "prompt"/>
                  <i className = "search icon"/>
              </div>
          </div>
      )  ;
    };

    onSubmit = (formValues) => {
      this.props.searchBids(formValues);
    };

 render() {
     return (
           <Form
           onSubmit={this.onSubmit}
           initialValues={{search: ""}}
           render = {({handleSubmit}) => (

               <form onSubmit={handleSubmit}>
                       <div className = "inline">
                            <Field name = "search" component = {this.renderInput} label="Search for a Bid" />
                            <button className = "ui button primary">Search</button>
                       </div>

               </form>

               )}
               />
     );
 }
}

export default connect(null, {searchBids})(BidSearch);