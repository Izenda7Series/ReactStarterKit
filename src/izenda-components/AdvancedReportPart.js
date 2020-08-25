import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';

class AdvancedReportPart extends Component {
    constructor(props) {
        super(props);
        this.state = { pValue: '' };
        this.izIntegrate = new IzendaIntegrate();
    }
    handleChange(event) {
        this.setState({ pValue: event.target.pValue });
    }
    componentDidMount() {
        this.updateResultReportPart();
        this.displayPart(1);
    }
    updateResultReportPart() {
        let overridingFilterValue = {
            p1value: this.state.pValue
        }
        let reportPartId = "[your_report_part_id]";
        this.izIntegrate.UpdateResultReportPart(reportPartId, overridingFilterValue, "update-result");
    }
    displayPart(partNumber) {
        this.selectedPart = partNumber;
        let reportPartId = "[your_report_part_id]";
        switch (partNumber) {
            case 1: {
                reportPartId = "[your_1st_report_part_id]";
                break;
            }
            case 2: {
                reportPartId = "[your_2nd_report_part_id]";
                break;
            }
            case 3: {
                reportPartId = "[your_3rd_report_part_id]";
                break;
            }
            default:
                reportPartId = "[your_default_report_part_id]"
                break;
        }
        this.izIntegrate.RenderSingleReportPart(reportPartId, "update-alone");
    }
    render() {
        return (
            <div>
                <div className="loader" id="reportPartLoader"> </div>
                <h3>Report Part - Update Result Sample</h3>
                <h4>This is an example of how integrated instances could use different filter controls to pass in filter values to report parts</h4>
                <div className="row">
                    <div className="col-md-12">
                        <input className="pValue-control" id="p1value" value={this.state.pValue} onChange={this.handleChange} />{/*ex: Country = Austria*/}
                        <button className="btn btn-primary" id="update-report-part-result" onClick={this.updateResultReportPart}>Update Result</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 report-part-container" id="update-result">
                    </div>
                </div>
                <div className="container-fluid">
                    <h3>Report Parts - Update Alone Sample</h3>
                    <h4>This is an example of how report parts can be changed within the same container</h4>
                    <ul className="nav nav-tabs">
                        <li id="part1"> <a href onClick={this.displayPart(1)}> Part #1</a></li>
                        <li id="part2"> <a href onClick={this.displayPart(2)}> Part #2</a></li>
                        <li id="part3"> <a href onClick={this.displayPart(3)}> Part #3</a></li>
                    </ul>
                    <br />
                    <div className="report-part-container" id="update-alone" />
                </div>
            </div>
        );
    }
}

export default AdvancedReportPart;