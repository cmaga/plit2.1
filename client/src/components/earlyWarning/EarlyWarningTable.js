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
  ideaList = (matchingItem) => {
    {
      this.props.forestArray.map(po => {
        const match2 = this.props.earlyWarningArray.find(
            item => po.Project_ID === matchingItem.Project_ID && (po.Executing_Department === "Vehicle Maintenance" || po.Executing_Department === "Vehicle Engineering")
        );

        return (

            <tr key={po._id}>
              {!match2 && <td>{po.Executing_Department}</td>}
            </tr>
        );
      })
    }
  };
  ideaList2 = () => {
    //console.log(this.state.compositeArray);
    let storedId='XD';
    let check = false;
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
            {this.props.forestArray.map(po => {
              //I'm not sure if find can be used this way. Basically I'm looking for Project_ID's from props array
              //that do not match in the state array.
              //you can ignore Executing Department its just additional filtering
              let matchingItem = this.state.compositeArray.find(
                  item => po.Project_ID !== item.Project_ID && (po.Executing_Department ==="Vehicle Maintenance" || po.Executing_Department === "Vehicle Engineering")
              );


              //console.log(matchingItem);
              //check if what we're showing is unique because a lot of stuff gets repeated since Project ids have several copies or something
              if (matchingItem  && matchingItem.Project_ID === storedId) {
                //console.log(`comparison of ${matchingItem.Project_ID} and ${storedId} came back with check true`);
                  check = true;
              }
              if(matchingItem && matchingItem.Project_ID !== storedId) {
                //console.log(`comparison of ${matchingItem.Project_ID} came back false with ${storedId}`);
                storedId = matchingItem.Project_ID;
                check = false;
              }



              return (

                  <tr key={po._id}>
                    {matchingItem && !check &&<td>{po.Executing_Department}</td>}
                    {matchingItem && !check && <td>{po.Project_ID}</td>}
                    {matchingItem && !check && <td>{po.Project_Name}</td>}
                    {matchingItem && !check && <td>{po.Director}</td>}
                    {matchingItem && !check && <td>{po.Project_Manager}</td>}

                    {matchingItem && !check && <td>{matchingItem.WO_Num}</td>}
                    {matchingItem && !check && <td>{matchingItem.Req_ID}</td>}
                    {matchingItem && !check && <td>{this.formatDate(matchingItem.Req_Created_Date)}</td>}
                    {matchingItem && !check && <td>{this.formatDate(matchingItem.Req_Approval_Date)}</td>}
                    {matchingItem && !check && <td>{matchingItem.PO_No}</td>}
                    {matchingItem && !check && <td>{this.formatDate(matchingItem.PO_Date)}</td>}
                    {matchingItem && !check && <td>{this.formatDate(matchingItem.Date_Approved)}</td>}
                    {matchingItem && !check && <td>{matchingItem.Req_Descr}</td>}
                    {matchingItem && !check && <td>{matchingItem.Buyer}</td>}
                    {matchingItem && !check && <td>{matchingItem.Business_Unit}</td>}
                    {matchingItem && !check && <td>{matchingItem.HOLD_STATUS}</td>}
                    {matchingItem && !check && <td>{matchingItem.Out_to_bid}</td>}
                    {matchingItem && !check && <td>{matchingItem.Req_Status}</td>}
                    {matchingItem && !check && <td>{matchingItem.Req_Dflt_Tble_Buyer}</td>}
                  </tr>
              );
            })}
            </tbody>
          </table>
        </div>
    );
  };

  ideaList3 = () => {
    //filter method creates an ew array with all the elements that pass the test implemented by the provided function

    //some tests whether at least one element in the array passes the test implemented by the provided function. And it returns a boolean value.

    //map creates a new array with the results of calling a provided function on every element in the calling array

    //reduce executes a reducer function that is provided on each element of the array resulting a single output value.

    //TODO filter forest by VE/VM first
    console.log(this.state.compositeArray);
    let result = this.props.forestArray.filter(f => {

      return !this.state.compositeArray.some(c => {
        return (f.Project_ID === c.Project_ID && (f.Executing_Department ==="Vehicle Maintenance" || f.Executing_Department === "Vehicle Engineering"));
      });
    });

    console.log(result);
  };


  renderEarlyWarningTable() {
    let count = 0;
    let composite = [];
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
            {this.props.forestArray.map(po => {
              const matchingItem = this.props.earlyWarningArray.find(
                item => po.wo_nbr === item.WO_Num && (po.Executing_Department ==="Vehicle Maintenance" || po.Executing_Department === "Vehicle Engineering")
              );

              //let composite = [];

              if(matchingItem) {
                //let count = 0;
                composite[count]=matchingItem;
                //console.log(composite);
                this.state.compositeArray[count] = matchingItem;
                this.state.compositeArray[count].Executing_Department = po.Executing_Department;
                this.state.compositeArray[count].Project_ID = po.Project_ID;
                this.state.compositeArray[count].Project_Name = po.Project_Manager;
                this.state.compositeArray[count].Project_Manager = po.Project_Manager;

                count = count + 1;
                //console.log(this.state.compositeArray);
                //console.log(count);
              }


              return (

                <tr key={po._id}>
                  {matchingItem && <td>{po.Executing_Department}</td>}
                  {matchingItem && <td>{po.Project_ID}</td>}
                  {matchingItem && <td>{po.Project_Name}</td>}
                  {matchingItem && <td>{po.Director}</td>}
                  {matchingItem && <td>{po.Project_Manager}</td>}

                  {matchingItem && <td>{matchingItem.WO_Num}</td>}
                  {matchingItem && <td>{matchingItem.Req_ID}</td>}
                  {matchingItem && <td>{this.formatDate(matchingItem.Req_Created_Date)}</td>}
                  {matchingItem && <td>{this.formatDate(matchingItem.Req_Approval_Date)}</td>}
                  {matchingItem && <td>{matchingItem.PO_No}</td>}
                  {matchingItem && <td>{this.formatDate(matchingItem.PO_Date)}</td>}
                  {matchingItem && <td>{this.formatDate(matchingItem.Date_Approved)}</td>}
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
  /*
  table2Render = () => {
    return (
        <div style={{ overflow: "auto" }}>
          <table className="ui single line table">

        <tbody>
        {this.props.forestArray.find(
            object => object.Project_ID ===
        )}
        </tbody>
    )
  };
            */
  render() {
    return (
        <div>
          {this.renderEarlyWarningTable()}
          {this.ideaList2()}
          {this.ideaList3()}
        </div>
    )
  }
}
export default EarlyWarningTable;
