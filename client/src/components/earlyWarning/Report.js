import React from "react";
import plitApi from "../../api/plitApi";

import EarlyWarningTable from "./EarlyWarningTable";
import UploadExcelButton from "./UploadExcelButton";

class Report extends React.Component {
  state = { Forest: [], FMIS: [] };

  //function to make an api call

  getForestExcel = async () => {
    const response = await plitApi.get("/api/excelForest");

    this.setState({ Forest: response.data });
  };

  getEarlyWarningExcel = async () => {
    const response = await plitApi.get("/api/early");

    this.setState({ FMIS: response.data });
  };

  componentDidMount() {
    this.getForestExcel();

    this.getEarlyWarningExcel();
  }
  render() {
    return (
      <div>
        <h1>Early Warning Report</h1>
          <UploadExcelButton/>

        <EarlyWarningTable
          forestArray={this.state.Forest}
          earlyWarningArray={this.state.FMIS}
        />
      </div>
    );
  }
}
export default Report;
