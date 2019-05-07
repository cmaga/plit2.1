import React from 'react';
import plitApi from '../../api/plitApi';

import EarlyWarningTable from './EarlyWarningTable';

class Report extends React.Component {
    state = {Forest: [], FMIS: []};

    //function to make an api call

    getForestExcel = async () => {
      const response = await plitApi.get('/api/excelForest');

      this.setState({Forest: response.data});
    };

    getEarlyWarningExcel = async () => {
       const response = await plitApi.get('/api/early');

       this.setState({FMIS: response.data});
    };



    componentDidMount() {
        this.getForestExcel();

        this.getEarlyWarningExcel();
    }

    componentDidUpdate() {

    }

    render() {
      return (
          <div>

              <h1>report</h1>

              <EarlyWarningTable forestArray={this.state.Forest} earlyWarningArray={this.state.FMIS} />
          </div>
      );
  }
}

export default Report;