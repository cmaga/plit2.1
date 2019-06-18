import React from 'react';

import {Form, Field} from 'react-final-form';
import {connect} from 'react-redux';
import { search } from '../../actions/index';

class Search extends React.Component {

    renderInput = ({input}) => {
      return (
          <div className="ui right aligned search">
              <div className="ui icon input">
              <input {...input} type="text" placeholder="Search..." className = "prompt"/>
                  <i className = "search icon"/>
              </div>
          </div>
      )  ;
    };

    onSubmit = (formValues) => {
      this.props.search(formValues);
    };

 render() {
     return (
           <Form
           onSubmit={this.onSubmit}
           initialValues={{search: ""}}
           render = {({handleSubmit}) => (

               <form onSubmit={handleSubmit}>
                       <div className = "inline">
                            <Field name = "search" component = {this.renderInput} label="Search" />
                            <button className = "ui button primary">Search</button>
                       </div>

               </form>

               )}
               />
     );
 }
}

export default connect(null, {search})(Search);