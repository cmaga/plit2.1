import React from "react";

import fns from "date-fns"; //like lodash for dates

class EarlyWarningTable extends React.Component {
  state = {compositeArray: []};

  formatDate = string => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };
  durationCalculation = reqApprv => {
    //subtract today - req approval date
    const today = new Date();
    let result = fns.differenceInDays(today, reqApprv);

    return result;
  };

  compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
      let comparison = a[key].localeCompare(b[key]);

      return (
          (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  sortComposite = () => {
    this.state.compositeArray.sort(this.compareValues('PO_No'));
    console.log(`sorted array ${this.state.compositeArray}`);
  };


  ideaList() {

    let storedId="X9";
    let check = true;
    let uniquePOIdeaArray = [];
    //console.log(this.state.compositeArray);
    return (
        <div style={{ overflow: "auto" }}>
          <table className="ui single line table">
            <thead>
            <tr>
              <th> Executing Department</th>
              <th> Project_ID</th>
              <th> Project_Name</th>
              <th>Director</th>
              <th>Project_Manager</th>
            </tr>
            </thead>

            <tbody>
            {this.props.forestArray.map(forest => {

              //for current forestArray element names forest check if there is some Project ID that matches in the composite array
              //if it is found return true else false
              //also only trim by ve vm
              const matchBool = this.state.compositeArray.some(
                composite => composite.Project_ID === forest.Project_ID
              );

              //filter to keep the same project Id's from showing up several times
              /*
                if (storedId === forest.Project_ID) {
                  check = false;
                }
                if (storedId !== forest.Project_ID) {
                  console.log(`check is true for ${storedId} and ${forest.Project_ID} meaning they are not equal and should be shown`);
                  check = true;
                }
                */
                // TODO create a set from the array and check the set with find before rendering XD

                //check if the array already has the POID
                check = uniquePOIdeaArray.some(x => x === forest.Project_ID);
                if (!check) uniquePOIdeaArray.push(forest.Project_ID);
                //console.log(uniquePOIdeaArray);

              //if add else dont add

                storedId = forest.Project_ID;
                return (
                  <tr key={forest._id}>
                    {!matchBool && !check && (forest.Executing_Department === "Vehicle Maintenance") && <td>{forest.Executing_Department}</td>}
                    {!matchBool && !check && (forest.Executing_Department === "Vehicle Maintenance") && <td>{forest.Project_ID}</td>}
                    {!matchBool && !check && (forest.Executing_Department === "Vehicle Maintenance") && <td>{forest.Project_Name}</td>}
                    {!matchBool && !check && (forest.Executing_Department === "Vehicle Maintenance") && <td>{forest.Director}</td>}
                    {!matchBool && !check && (forest.Executing_Department === "Vehicle Maintenance") && <td>{forest.Project_Manager}</td>}


                  </tr>
                      );
            })}
            </tbody>
          </table>
        </div>
      );
  };

  renderEarlyWarningTableWithoutPO = () => {
    let count = 0;
    let composite = [];
    return (
      <div style={{ overflow: "auto" }}>
        <table className="ui striped fixed single line compact table">
          <thead>
            <tr>
              <th className="1 wide"> Executing Department</th>
              <th> Project_ID</th>
              <th className="two wide"> Project_Name</th>
              <th>Director</th>
              <th>Project_Manager</th>
              <th>WO_No</th>
              <th>Req_ID</th>
              <th>Req_Created_Date</th>
              <th>Req_Approval_Date</th>
              <th>PO_No</th>
              <th>PO_Created_Date</th>
              <th>PO_Approval_Date</th>
              <th>Req_Descr</th>
              <th>Buyer_Line</th>
              <th>Unit</th>
              <th>Hold status</th>
              <th>Out-to-bid</th>
              <th>Status</th>
              <th>Buyer_Header</th>
              <th>Duration</th>

            </tr>
          </thead>

          <tbody>
            {this.props.earlyWarningArray.map(early => {

              const matchingItem = this.props.forestArray.find(
                  //intentionally comparing using == instead of === because we are comparing a string to a number
                item => item.wo_nbr == early.WO_Num && (item.Executing_Department ==="Vehicle Maintenance" || item.Executing_Department === "Vehicle Engineering" || item.Executing_Department === "Safety")
              );



              if(matchingItem) {
                //let count = 0;
                composite[count]=matchingItem;
                //console.log(composite);
                this.state.compositeArray[count] = matchingItem;
                this.state.compositeArray[count].WO_Num = early.WO_Num;
                this.state.compositeArray[count].Req_ID = early.Req_ID;
                this.state.compositeArray[count].Req_Created_Date = early.Req_Created_Date;
                this.state.compositeArray[count].Req_Approval_Date= early.Req_Approval_Date;
                this.state.compositeArray[count].PO_No = early.PO_No;
                this.state.compositeArray[count].PO_Date = early.PO_Date;
                this.state.compositeArray[count].Date_Approved = early.Date_Approved;
                this.state.compositeArray[count].Req_Descr = early.Req_Descr;
                this.state.compositeArray[count].Buyer = early.Buyer;
                this.state.compositeArray[count].Business_Unit = early.Business_Unit;
                this.state.compositeArray[count].HOLD_STATUS = early.HOLD_STATUS;
                this.state.compositeArray[count].Out_to_bid = early.Out_to_bid;
                this.state.compositeArray[count].Req_Status = early.Req_Status;
                this.state.compositeArray[count].Req_Dflt_Tble_Buyer = early.Req_Dflt_Tble_Buyer;
                this.state.compositeArray[count].Req_Approval_Date= early.Req_Approval_Date;

                //this line may affect dates that show up since null is no longer passed
                if(early.PO_No === null) this.state.compositeArray[count].PO_No = "";
                count++;
              }

              console.log(this.state.compositeArray);
              console.log(count);
              return (

                <tr key={early._id}>
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Executing_Department}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_ID}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_Name}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Director}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_Manager}</td>}

                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.WO_Num}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Req_ID}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(early.Req_Created_Date)}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(early.Req_Approval_Date)}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.PO_No}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.PO_Date}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Date_Approved}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Req_Descr}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Buyer}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Business_Unit}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.HOLD_STATUS}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Out_to_bid}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Req_Status}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Req_Dflt_Tble_Buyer}</td>}
                  {matchingItem && matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.durationCalculation(early.Req_Approval_Date)}</td>}



                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  renderEarlyWarningTableWithPO = () => {
    let count = 0;
    let composite = [];
    return (
        <div style={{ overflow: "auto" }}>
          <table className="ui striped fixed single line compact table">
            <thead>
            <tr>
              <th className="1 wide"> Executing Department</th>
              <th> Project_ID</th>
              <th className="two wide"> Project_Name</th>
              <th>Director</th>
              <th>Project_Manager</th>
              <th>WO_No</th>
              <th>Req_ID</th>
              <th>Req_Created_Date</th>
              <th>Req_Approval_Date</th>
              <th>PO_No</th>
              <th>PO_Created_Date</th>
              <th>PO_Approval_Date</th>
              <th>Req_Descr</th>
              <th>Buyer_Line</th>
              <th>Unit</th>
              <th>Hold status</th>
              <th>Out-to-bid</th>
              <th>Status</th>
              <th>Buyer_Header</th>
              <th>Duration</th>

            </tr>
            </thead>

            <tbody>
            {this.props.earlyWarningArray.map(early => {

              const matchingItem = this.props.forestArray.find(
                  //intentionally comparing using == instead of === because we are comparing a string to a number
                  item => item.wo_nbr == early.WO_Num && (item.Executing_Department ==="Vehicle Maintenance" || item.Executing_Department === "Vehicle Engineering" || item.Executing_Department === "Safety")
              );




              return (

                  <tr key={early._id}>
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Executing_Department}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_ID}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_Name}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Director}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_Manager}</td>}

                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.WO_Num}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Req_ID}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(early.Req_Created_Date)}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(early.Req_Approval_Date)}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.PO_No}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(early.PO_Date)}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(early.Date_Approved)}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Req_Descr}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Buyer}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Business_Unit}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.HOLD_STATUS}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Out_to_bid}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Req_Status}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{early.Req_Dflt_Tble_Buyer}</td>}
                    {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.durationCalculation(early.Req_Approval_Date)}</td>}



                  </tr>
              );
            })}
            </tbody>
          </table>
        </div>
    );
  };
//these po's are outside of vehicle maintenance and vehicle engineering we received them via pdf and they're hard coded into this array.
  renderEarlyWarningTablePDF() {
    let count = 0;
    let composite = [];
    let hardCodedWOArray = [{wo_nbr: 301572},
      {wo_nbr: 201574},
     { wo_nbr: 301598},
     { wo_nbr: 301869},
     { wo_nbr: 301595},
     { wo_nbr: 301596},
     { wo_nbr: 301596},
     { wo_nbr: 301599},
     { wo_nbr: 301600},
     { wo_nbr: 301870},
     { wo_nbr: 301874},
     { wo_nbr: 300070},
     { wo_nbr: 301575},
     { wo_nbr: 301576},
     { wo_nbr: 301579},
     { wo_nbr: 301580},
     { wo_nbr: 301871},
    ];
    return (
        <div style={{ overflow: "auto" }}>
          <table className="ui striped fixed single line compact table">
            <thead>
            <tr>

              <th>WO_No</th>
              <th className="1 wide"> Executing Department</th>
              <th> Project_ID</th>
              <th className="two wide"> Project_Name</th>
              <th>Director</th>
              <th>Project_Manager</th>
              <th>Req_ID</th>
              <th>Req_Created_Date</th>
              <th>Req_Approval_Date</th>
              <th>PO_No</th>
              <th>PO_Created_Date</th>
              <th>PO_Approval_Date</th>
              <th>Req_Descr</th>
              <th>Buyer_Line</th>
              <th>Unit</th>
              <th>Hold status</th>
              <th>Out-to-bid</th>
              <th>Status</th>
              <th>Buyer_Header</th>
              <th>Duration</th>

            </tr>
            </thead>

            <tbody>

            {hardCodedWOArray.map(pdf => {

              const matchingItem = this.state.compositeArray.find(
                  item => pdf.wo_nbr === item.WO_Num
              );

              //if(matchingItem) console.log(`${pdf.wo_nbr} and ${item.WO_Num}`);



              return (

                  <tr key={Math.random()}>


                    <td>{pdf.wo_nbr}</td>

                    {matchingItem && <td>{matchingItem.Executing_Department}</td>}
                    {matchingItem && <td>{matchingItem.Project_ID}</td>}
                    {matchingItem && <td>{matchingItem.Project_Name}</td>}
                    {matchingItem && <td>{matchingItem.Director}</td>}
                    {matchingItem && <td>{matchingItem.Project_Manager}</td>}

                    {matchingItem && <td>{matchingItem.Req_ID}</td>}
                    {matchingItem && <td>{this.formatDate(matchingItem.Req_Created_Date)}</td>}
                    {matchingItem && <td>{this.formatDate(matchingItem.Req_Approval_Date)}</td>}
                    {matchingItem && <td>{matchingItem.PO_No}</td>}
                    {matchingItem && <td>{this.formatDate(matchingItem.PO_Date)}</td>}
                    {matchingItem && <td>{this.formatDate(pdf.Date_Approved)}</td>}
                    {matchingItem && <td>{matchingItem.Req_Descr}</td>}
                    {matchingItem && <td>{matchingItem.Buyer}</td>}
                    {matchingItem && <td>{matchingItem.Business_Unit}</td>}
                    {matchingItem && <td>{matchingItem.HOLD_STATUS}</td>}
                    {matchingItem && <td>{matchingItem.Out_to_bid}</td>}
                    {matchingItem && <td>{matchingItem.Req_Status}</td>}
                    {matchingItem && <td>{matchingItem.Req_Dflt_Tble_Buyer}</td>}
                    {matchingItem && <td>{this.durationCalculation(matchingItem.Req_Approval_Date)}</td>}



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
          <h3>Without POs</h3>
          {this.renderEarlyWarningTableWithoutPO()}
          {this.sortComposite()}
          <h3>With POs</h3>
          {this.renderEarlyWarningTableWithPO()}
          <h3>PO with no Req</h3>
          {this.ideaList()}
          <h3>Work orders from PDF</h3>
          {this.renderEarlyWarningTablePDF()}
        </div>
    )
  }
}
export default EarlyWarningTable;
