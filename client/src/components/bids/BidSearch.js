import React from 'react';
import {Form, Field} from 'react-final-form';
import {connect} from 'react-redux';
import { searchBids } from '../../actions/index';

import { Button } from 'semantic-ui-react';


class BidSearch extends React.Component {

    renderInput = ({input, label}) => {
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
      //alert(JSON.stringify(formValues));
      this.props.searchBids(formValues);
    };

 render() {
     return (
           <Form
           onSubmit={this.onSubmit}
           render = {({handleSubmit}) => (

               <form onSubmit={handleSubmit}>
                   <div>
                    <Field name = "search" component = {this.renderInput} label="Search for a Bid" />
                   </div>
                   <button className = "ui button primary">Search</button>
               </form>

               )}
               />
     );
 }
}

export default connect(null, {searchBids})(BidSearch);