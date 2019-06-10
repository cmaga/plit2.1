import React from "react";
import fns from "date-fns"; //like lodash for dates
import _ from "lodash";

class EarlyWarningTable extends React.Component {
    state = {compositeArray: []};

    buildCompositeArray3 = () => {
        let count = 0;
        let composite = [];

        console.log(this.props.forestArray);
        console.log(this.props.earlyWarningArray);

        this.props.forestArray.forEach(forest => {

            const earlyMatch = this.props.earlyWarningArray.filter(
                //intentionally comparing using == instead of === because we are comparing a string to a number
                item => forest.wo_nbr == item.WO_Num && (forest.Executing_Department === "Vehicle Maintenance" || forest.Executing_Department === "Vehicle Engineering" || forest.Executing_Department === "Safety")
            );

            if (earlyMatch.length > 0) {
                //setState is not used here on purpose to many state changes caused react to throw errors. So we assign state this way without forcing a rerender.
                earlyMatch.forEach( Match => {
                    this.state.compositeArray[count] = Match;

                    this.state.compositeArray[count].Project_ID = forest.Project_ID;
                    this.state.compositeArray[count].Executing_Department = forest.Executing_Department;
                    this.state.compositeArray[count].Project_Name = forest.Project_Name;
                    this.state.compositeArray[count].Director = forest.Director;
                    this.state.compositeArray[count].Project_Manager = forest.Project_Manager;

                    if (Match.PO_No === null) this.state.compositeArray[count].PO_No = "";

                    count++;
                });

            }

        });
    };


    removeCopiesFromCompositeArray = () => {
        for( let i = 0; i < this.state.compositeArray.length; i++) {

            //case for array start
            if (i === 0) {
                for (let k = 1; k < this.state.compositeArray.length; k++) {
                    if (
                        _.isEqual
                        (
                            _.omit(this.state.compositeArray[i], ['_id']),
                            _.omit(this.state.compositeArray[k], ['_id'])
                        )
                    ) {
                        this.state.compositeArray.splice(i, 1);
                    }
                }
            } else if (i === this.state.compositeArray.length - 1) { //case for end of array
                for (let k = 0; k < this.state.compositeArray.length - 1; k++) {
                    if (
                        _.isEqual
                        (
                            _.omit(this.state.compositeArray[i], ['_id']),
                            _.omit(this.state.compositeArray[k], ['_id'])
                        )
                    ) {
                        this.state.compositeArray.splice(i, 1);
                    }
                }
            } else { //all other cases
                //check if the current object is equal to the next object in the array (assumes that ordering has already happened all all copied objects are next to each other
                for (let j = 0; j < i; j++) {
                    if (
                        _.isEqual
                        (
                            _.omit(this.state.compositeArray[i], ['_id']),
                            _.omit(this.state.compositeArray[j], ['_id'])
                        )
                    ) {
                        this.state.compositeArray.splice(i, 1);
                        i--;
                    }
                }

                for (let k = i + 1; k < this.state.compositeArray.length; k++) {
                    if (
                        _.isEqual
                        (
                            _.omit(this.state.compositeArray[i], ['_id']),
                            _.omit(this.state.compositeArray[k], ['_id'])
                        )
                    ) {
                        this.state.compositeArray.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    };
    formatDate = a => {
        if (a !== null && a !== undefined) {
            let input, monthNames, day, month, year;
            input = a.split("T")[0].split("-");
            day = input[2];
            month = input[1];
            year = input[0];
            monthNames = "January,February,March,April,May,June,July,August,September,October,November,December";
            monthNames = monthNames.split(",");
            return monthNames[Number(month) - 1] + " " + day + ", " + year;
        } return null;
    };

    durationCalculation = reqApprv => {
        //subtract today - req approval date
        if (reqApprv !== null) {
            const today = new Date();
            return fns.differenceInDays(today, reqApprv);
        } return null;
    };

    //this is the "compare" passed to the sort method so that it will work with objects instead of just arrays.
    //this function may appear as not being used but it is
    compareValues(key, order='asc') {
        return function(a, b) {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
            let comparison = a[key].localeCompare(b[key], undefined, {'numeric': true});

            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    //Sorts by Vehicle engineering and then vehicle maintenance.
    sortComposite = () => {
        this.state.compositeArray.sort(this.compareValues('Executing_Department'));
        //console.log(`sorted array ${this.state.compositeArray}`);
    };

//idea list is the list of Po's with no requisitions: since there is no other information for them they are technically just ideas.
    ideaList = () => {
        const uniquePOArray = [];
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
                        const matchBool = this.state.compositeArray.some(
                            composite => composite.Project_ID === forest.Project_ID
                        );
                        //console.log(`${matchBool}`);

                        //search array for the current step
                        //check true when found
                        const check = uniquePOArray.find(id => id === forest.Project_ID);
                        //add the current step id to the array of unique po's if it wasn't found in the array
                        if (!check) uniquePOArray.push(forest.Project_ID);

                        return (
                            <tr key={Math.random()}>
                                {!matchBool && !check && (forest.Executing_Department === "Vehicle Maintenance" || forest.Executing_Department === "Vehicle Engineering") && <td>{forest.Executing_Department}</td>}
                                {!matchBool && !check && (forest.Executing_Department === "Vehicle Maintenance" || forest.Executing_Department === "Vehicle Engineering") && <td>{forest.Project_ID}</td>}
                                {!matchBool && !check && (forest.Executing_Department === "Vehicle Maintenance" || forest.Executing_Department === "Vehicle Engineering") && <td>{forest.Project_Name}</td>}
                                {!matchBool && !check && (forest.Executing_Department === "Vehicle Maintenance" || forest.Executing_Department === "Vehicle Engineering") && <td>{forest.Director}</td>}
                                {!matchBool && !check && (forest.Executing_Department === "Vehicle Maintenance" || forest.Executing_Department === "Vehicle Engineering") && <td>{forest.Project_Manager}</td>}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    };


    renderEarlyWarningTableWithoutPO = () => {
        let storedId = "XD";
        let color = "";
        return (
            <div style={{ overflow: "auto" }}>
                <table className="ui fixed single line compact table">
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
                    {this.state.compositeArray.map(matchingItem => {
                        if (matchingItem.Project_ID !== storedId && matchingItem.PO_No === "") {
                            storedId = matchingItem.Project_ID;
                            //switch color tagsi
                            if(color==="active") {
                                color = "";
                            }else {
                                color = "active";
                            }
                        }
                        if (matchingItem.Project_ID === storedId) {
                            console.log(`${matchingItem.Project_ID} matched with ${storedId} so color did not switch`);
                        }

                        return (

                            <tr key={Math.random()} className={color}>
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Executing_Department}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_ID}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_Name}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Director}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_Manager}</td>}

                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.WO_Num}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Req_ID}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(matchingItem.Req_Created_Date)}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(matchingItem.Req_Approval_Date)}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.PO_No}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.PO_Date}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Date_Approved}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Req_Descr}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Buyer}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Business_Unit}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.HOLD_STATUS}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Out_to_bid}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Req_Status}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Req_Dflt_Tble_Buyer}</td>}
                                {matchingItem.PO_No === "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.durationCalculation(matchingItem.Req_Approval_Date)}</td>}



                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    };

    renderEarlyWarningTableWithPO = () => {
        let storedId = "XD";
        let color = "";
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
                    {this.state.compositeArray.map(matchingItem => {
                        if (matchingItem.Project_ID !== storedId) {
                            storedId = matchingItem.Project_ID;
                            if(color==="active") {
                                color = "";
                            }else {
                                color = "active";
                            }
                        }

                        return (

                            <tr key={Math.random()} className = {color}>
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Executing_Department}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_ID}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_Name}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Director}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Project_Manager}</td>}

                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.WO_Num}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Req_ID}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(matchingItem.Req_Created_Date)}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(matchingItem.Req_Approval_Date)}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.PO_No}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(matchingItem.PO_Date)}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.formatDate(matchingItem.Date_Approved)}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Req_Descr}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Buyer}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Business_Unit}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.HOLD_STATUS}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Out_to_bid}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Req_Status}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{matchingItem.Req_Dflt_Tble_Buyer}</td>}
                                {matchingItem && matchingItem.PO_No !== "" && (matchingItem.Executing_Department === "Vehicle Engineering" || matchingItem.Executing_Department==="Vehicle Maintenance")  && <td>{this.durationCalculation(matchingItem.Req_Approval_Date)}</td>}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    };
//these po's are outside of vehicle maintenance and vehicle engineering we received them via pdf and they're hard coded into this array. They were sent via a pdf.
    renderEarlyWarningTablePDF() {
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
                {this.buildCompositeArray3()}
                {this.removeCopiesFromCompositeArray()}
                {this.sortComposite()}

                <h3>Without POs</h3>
                {this.renderEarlyWarningTableWithoutPO()}

                <h3>With POs</h3>
                {this.renderEarlyWarningTableWithPO()}

                <h3>Requisitions with no PO</h3>
                {this.ideaList()}

                <h3>Work orders from PDF</h3>
                {this.renderEarlyWarningTablePDF()}
            </div>
        )
    }
}
export default EarlyWarningTable;
