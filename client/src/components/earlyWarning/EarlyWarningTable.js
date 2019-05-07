import React from 'react';

import fns from 'date-fns'; //lodash for dates



class EarlyWarningTable extends React.Component {
    //state = {dummyStat: 0};

    matching = (wo) => {
        //check if the work order match.
        this.props.forestArray.map((item) => {
            if (item.wo_nbr === wo) {
                console.log('match found');

                //this.setState({dummyStat: 1});
                return (
                    <h1>hi</h1>

                );
            } else {
                return <td>null</td>;
            }
        })
    };
    formatDate = (string) => {
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    };
    durationCalculation = (reqApprv) => {
      //subtract today - req approval date
        const today = new Date();
        let result = fns.differenceInDays(
            today,
            reqApprv
        );

        return result;
    };

    renderEarlyWarningTable() {
        //console.log(this.props.earlyWarningArray[0]);
        //const thing = this.props.earlyWarningArray[0];
        //console.log(thing.WO_Num);

            return (
                <div style={{overflow: 'auto'}}>


                    <table className="ui single line table">
                        <thead>
                        <tr>

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
                            <th> Executing Department</th>
                            <th> Project_ID</th>
                            <th> Project_Name</th>
                            <th>Director</th>
                            <th>Project_Manager</th>
                        </tr>
                        </thead>


                        <tbody>
                        {this.props.earlyWarningArray.map(po => {
                            const matchingItem = this.props.forestArray.find(
                                item => item.wo_nbr === po.WO_Num
                            );
                            return (
                                <tr key={po._id}>


                                    <td>{po.WO_Num}</td>
                                    <td>{po.Req_ID}</td>
                                    <td>{this.formatDate(po.Req_Created_Date)}</td>
                                    <td>{this.formatDate(po.Req_Approval_Date)}</td>
                                    <td>{po.PO_No}</td>
                                    <td>{this.formatDate(po.PO_Date)}</td>
                                    <td>{this.formatDate(po.Date_Approved)}</td>
                                    <td>{po.Req_Descr}</td>
                                    <td>{po.Buyer}</td>
                                    <td>{po.Business_Unit}</td>
                                    <td>{po.HOLD_STATUS}</td>
                                    <td>{po.Out_to_bid}</td>
                                    <td>{po.Req_Status}</td>
                                    <td>{po.Req_Dflt_Tble_Buyer}</td>
                                    <td>{this.durationCalculation(po.Req_Approval_Date)}</td>

                                    {matchingItem && <td>{matchingItem.Executing_Department}</td>}
                                    {matchingItem && <td>{matchingItem.Project_ID}</td>}
                                    {matchingItem && <td>{matchingItem.Proj_Name}</td>}
                                    {matchingItem && <td>{matchingItem.Director}</td>}
                                    {matchingItem && <td>{matchingItem.Project_Manager}</td>}
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
                {this.renderEarlyWarningTable()}
            </div>
        )
    }
}
/*


 */

export default EarlyWarningTable;